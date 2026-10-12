import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import crypto from 'crypto';
import { createClient } from '@supabase/supabase-js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_DIR = path.join(__dirname, '..', 'data');
const LOCAL_DB_FILE = path.join(DATA_DIR, 'wedding_rsvps.json');

// Ensure local data directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

// Ensure local db file exists
if (!fs.existsSync(LOCAL_DB_FILE)) {
  fs.writeFileSync(LOCAL_DB_FILE, JSON.stringify([], null, 2), 'utf-8');
}

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
  console.log('[Database] Supabase credentials not found. Using local persistent storage at:', LOCAL_DB_FILE);
}

// Helper for reading local JSON store
function readLocalStore() {
  try {
    const raw = fs.readFileSync(LOCAL_DB_FILE, 'utf-8');
    return JSON.parse(raw);
  } catch (err) {
    console.error('[Database] Error reading local store:', err);
    return [];
  }
}

// Helper for writing local JSON store atomically
function writeLocalStore(records) {
  try {
    const tempFile = `${LOCAL_DB_FILE}.tmp`;
    fs.writeFileSync(tempFile, JSON.stringify(records, null, 2), 'utf-8');
    fs.renameSync(tempFile, LOCAL_DB_FILE);
    return true;
  } catch (err) {
    console.error('[Database] Error writing local store:', err);
    return false;
  }
}

export const db = {
  isCloud: isSupabaseConfigured,

  /**
   * Save a new RSVP record
   */
  async saveRsvp(rsvpData) {
    const record = {
      id: crypto.randomUUID(),
      guest_name: rsvpData.guest_name.trim(),
      guest_email: rsvpData.guest_email.trim().toLowerCase(),
      phone_number: rsvpData.phone_number ? rsvpData.phone_number.trim() : '',
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
          // Also sync to local backup
          const current = readLocalStore();
          current.unshift(record);
          writeLocalStore(current);
          return record;
        }
      } catch (err) {
        console.warn('[Database] Exception on Supabase insert:', err.message);
      }
    }

    // Default or fallback: Save to local persistent JSON file
    const records = readLocalStore();
    records.unshift(record);
    writeLocalStore(records);
    console.log('[Database] Saved RSVP to local database:', record.id, record.guest_name);
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
      mehendi_sangeeth: 0,
      haldi_pelli: 0,
      wedding_ceremony: 0,
    };

    for (const rsvp of rsvps) {
      if (rsvp.attendance_status === 'attending') {
        attendingSubmissions++;
        const count = parseInt(rsvp.attendees_count, 10) || 1;
        totalExpectedAttendees += count;

        if (Array.isArray(rsvp.selected_events)) {
          const accountedEvents = new Set();
          for (const evId of rsvp.selected_events) {
            let normalizedId = evId;
            if (evId === 'mehendi' || evId === 'sangeeth') {
              normalizedId = 'mehendi_sangeeth';
            } else if (evId === 'haldi' || evId === 'pelli_ceremony' || evId === 'haldi_pelli') {
              normalizedId = 'haldi_pelli';
            }
            if (eventCounts[normalizedId] !== undefined && !accountedEvents.has(normalizedId)) {
              accountedEvents.add(normalizedId);
              eventCounts[normalizedId] += count;
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
