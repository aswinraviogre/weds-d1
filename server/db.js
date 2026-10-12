import fs from 'fs';
import path from 'path';
import os from 'os';
import { fileURLToPath } from 'url';
import crypto from 'crypto';
import { createClient } from '@supabase/supabase-js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_DIR = path.join(__dirname, '..', 'data');
const LOCAL_DB_FILE = path.join(DATA_DIR, 'wedding_rsvps.json');
const TMP_DB_FILE = path.join(os.tmpdir(), 'wedding_rsvps.json');

// Check if local project data directory is writable (writable locally, read-only on Vercel)
let isLocalDirWritable = false;
try {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
  if (!fs.existsSync(LOCAL_DB_FILE)) {
    fs.writeFileSync(LOCAL_DB_FILE, JSON.stringify([], null, 2), 'utf-8');
  }
  fs.accessSync(DATA_DIR, fs.constants.W_OK);
  isLocalDirWritable = true;
} catch {
  isLocalDirWritable = false;
}

// In-memory cache across serverless warm requests
globalThis.__weddingRsvpsCache = globalThis.__weddingRsvpsCache || null;

// Check Supabase credentials
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY;
const isSupabaseConfigured = Boolean(supabaseUrl && supabaseKey);

let supabase = null;
if (isSupabaseConfigured) {
  try {
    supabase = createClient(supabaseUrl, supabaseKey, {
      auth: { persistSession: false },
    });
    console.log('[Database] Initialized with Supabase Cloud at', supabaseUrl);
  } catch (err) {
    console.error('[Database] Failed to initialize Supabase client:', err.message);
    supabase = null;
  }
} else {
  console.log('[Database] Supabase credentials not found. Using local/tmp persistent storage.');
}

// Helper for reading local JSON store
function readLocalStore() {
  if (Array.isArray(globalThis.__weddingRsvpsCache)) {
    return [...globalThis.__weddingRsvpsCache];
  }

  let records = [];

  // 1. Try reading from TMP_DB_FILE (where serverless writes persist across invocations)
  if (fs.existsSync(TMP_DB_FILE)) {
    try {
      const raw = fs.readFileSync(TMP_DB_FILE, 'utf-8');
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        records = parsed;
      }
    } catch (err) {
      console.warn('[Database] Warning reading TMP store:', err.message);
    }
  }

  // 2. If TMP store is empty or does not exist, read from bundled LOCAL_DB_FILE
  if (records.length === 0 && fs.existsSync(LOCAL_DB_FILE)) {
    try {
      const raw = fs.readFileSync(LOCAL_DB_FILE, 'utf-8');
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) {
        records = parsed;
      }
    } catch (err) {
      console.warn('[Database] Warning reading bundled store:', err.message);
    }
  }

  globalThis.__weddingRsvpsCache = records;
  return records;
}

// Helper for writing local JSON store atomically
function writeLocalStore(records) {
  globalThis.__weddingRsvpsCache = records;
  let wroteSuccessfully = false;

  // 1. Always write to TMP_DB_FILE (guaranteed writable in Vercel serverless Lambda & local)
  try {
    const tempTmpFile = `${TMP_DB_FILE}.${Date.now()}.tmp`;
    fs.writeFileSync(tempTmpFile, JSON.stringify(records, null, 2), 'utf-8');
    fs.renameSync(tempTmpFile, TMP_DB_FILE);
    wroteSuccessfully = true;
  } catch (err) {
    console.warn('[Database] Warning writing to TMP store:', err.message);
  }

  // 2. If local project directory is writable (e.g. local dev), also write to LOCAL_DB_FILE
  if (isLocalDirWritable) {
    try {
      const tempLocalFile = `${LOCAL_DB_FILE}.${Date.now()}.tmp`;
      fs.writeFileSync(tempLocalFile, JSON.stringify(records, null, 2), 'utf-8');
      fs.renameSync(tempLocalFile, LOCAL_DB_FILE);
      wroteSuccessfully = true;
    } catch {
      // Read-only filesystem is expected in serverless environments
    }
  }

  return wroteSuccessfully;
}

export const db = {
  isCloud: isSupabaseConfigured,

  /**
   * Save a new RSVP record
   */
  async saveRsvp(rsvpData) {
    const record = {
      id: crypto.randomUUID(),
      guest_name: (rsvpData.guest_name && String(rsvpData.guest_name).trim()) || 'Valued Guest',
      guest_email: (rsvpData.guest_email && String(rsvpData.guest_email).trim().toLowerCase()) || '',
      phone_number: rsvpData.phone_number && String(rsvpData.phone_number).trim() ? String(rsvpData.phone_number).trim() : null,
      attendance_status: rsvpData.attendance_status, // 'attending' | 'declined'
      attendees_count: rsvpData.attendance_status === 'attending' ? parseInt(rsvpData.attendees_count, 10) || 1 : 0,
      additional_guests: rsvpData.additional_guests ? rsvpData.additional_guests.trim() : '',
      selected_events: Array.isArray(rsvpData.selected_events) ? rsvpData.selected_events : [],
      dietary_requirements: rsvpData.dietary_requirements ? rsvpData.dietary_requirements.trim() : '',
      special_requests: rsvpData.special_requests ? rsvpData.special_requests.trim() : '',
      ip_address: rsvpData.ip_address || 'unknown',
      created_at: new Date().toISOString(),
    };

    // If Supabase is active, persist to cloud PostgreSQL
    if (supabase) {
      try {
        const { data, error } = await supabase.from('rsvps').insert([record]).select().single();
        if (error) {
          console.warn('[Database] Supabase insert failed, falling back to local file store:', error.message);
        } else {
          console.log('[Database] Saved RSVP to Supabase:', data.id);
          const current = readLocalStore();
          current.unshift(record);
          writeLocalStore(current);
          return record;
        }
      } catch (err) {
        console.warn('[Database] Exception on Supabase insert:', err.message);
      }
    }

    // Default or fallback: Save to local persistent JSON file / tmp store
    const records = readLocalStore();
    records.unshift(record);
    writeLocalStore(records);
    console.log('[Database] Saved RSVP to database:', record.id, record.guest_name);
    return record;
  },

  /**
   * Retrieve all RSVPs (Admin only)
   */
  async getAllRsvps() {
    if (supabase) {
      try {
        const { data, error } = await supabase
          .from('rsvps')
          .select('*')
          .order('created_at', { ascending: false });
        if (!error && Array.isArray(data)) {
          return data;
        }
      } catch (err) {
        console.warn('[Database] Supabase fetch error, using local store:', err.message);
      }
    }

    return readLocalStore();
  },

  /**
   * Calculate RSVP summary metrics
   */
  async getStats() {
    const rsvps = await this.getAllRsvps();

    let totalSubmissions = rsvps.length;
    let attendingSubmissions = 0;
    let declinedSubmissions = 0;
    let totalExpectedAttendees = 0;

    const eventCounts = {
      mehendi: 0,
      sangeeth: 0,
      haldi: 0,
      pelli_rituals: 0,
      wedding: 0,
    };

    for (const rsvp of rsvps) {
      if (rsvp.attendance_status === 'attending') {
        attendingSubmissions++;
        const count = parseInt(rsvp.attendees_count, 10) || 1;
        totalExpectedAttendees += count;

        if (Array.isArray(rsvp.selected_events)) {
          const accountedEvents = new Set();
          for (const evId of rsvp.selected_events) {
            // Map legacy IDs if any exist
            let mappedIds = [evId];
            if (evId === 'mehendi_sangeeth') {
              mappedIds = ['mehendi', 'sangeeth'];
            } else if (evId === 'haldi_pelli') {
              mappedIds = ['haldi', 'pelli_rituals'];
            } else if (evId === 'wedding_ceremony') {
              mappedIds = ['wedding'];
            } else if (evId === 'pelli_ceremony') {
              mappedIds = ['pelli_rituals'];
            }

            for (const targetId of mappedIds) {
              if (eventCounts[targetId] !== undefined && !accountedEvents.has(targetId)) {
                accountedEvents.add(targetId);
                eventCounts[targetId] += count;
              }
            }
          }
        }
      } else {
        declinedSubmissions++;
      }
    }

    return {
      totalSubmissions,
      attendingSubmissions,
      declinedSubmissions,
      totalExpectedAttendees,
      eventCounts,
    };
  },

  /**
   * Delete RSVP by ID (Admin only)
   */
  async deleteRsvp(id) {
    if (supabase) {
      try {
        await supabase.from('rsvps').delete().eq('id', id);
      } catch (err) {
        console.warn('[Database] Supabase delete error:', err.message);
      }
    }

    const current = readLocalStore();
    const updated = current.filter((r) => r.id !== id);
    writeLocalStore(updated);
    return true;
  },
};
