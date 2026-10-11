import express from 'express';
import { db } from '../db.js';

export const adminRouter = express.Router();

const ADMIN_PASSCODE = process.env.ADMIN_PASSCODE || 'yashmrudula2026';

// Middleware to authenticate admin requests
function requireAdminAuth(req, res, next) {
  const providedPasscode =
    req.headers['x-admin-passcode'] || req.query.passcode || req.body?.passcode;

  if (!providedPasscode || providedPasscode !== ADMIN_PASSCODE) {
    return res.status(401).json({
      error: 'Unauthorized: Invalid or missing administrator passcode.',
    });
  }
  next();
}

/**
 * POST /api/admin/verify
 * Check if the provided passcode is valid
 */
adminRouter.post('/verify', (req, res) => {
  const { passcode } = req.body;
  if (passcode === ADMIN_PASSCODE) {
    return res.json({ success: true, message: 'Authenticated' });
  }
  return res.status(401).json({ success: false, error: 'Incorrect administrator passcode.' });
});

/**
 * GET /api/admin/stats
 * Aggregate metrics and event attendance counts
 */
adminRouter.get('/stats', requireAdminAuth, async (req, res) => {
  try {
    const stats = await db.getStats();
    return res.json({ success: true, data: stats });
  } catch (err) {
    console.error('[Admin Route] Error fetching stats:', err);
    return res.status(500).json({ error: 'Failed to compute RSVP statistics.' });
  }
});

/**
 * GET /api/admin/rsvps
 * List all RSVPs with optional query filters (search, event, status, sort)
 */
adminRouter.get('/rsvps', requireAdminAuth, async (req, res) => {
  try {
    let rsvps = await db.getAllRsvps();
    const { search, status, event, sort } = req.query;

    // Filter by status (attending | declined)
    if (status && status !== 'all') {
      rsvps = rsvps.filter((r) => r.attendance_status === status);
    }

    // Filter by event ID
    if (event && event !== 'all') {
      rsvps = rsvps.filter(
        (r) => Array.isArray(r.selected_events) && r.selected_events.includes(event)
      );
    }

    // Filter by search string (name, email, phone)
    if (search && typeof search === 'string' && search.trim() !== '') {
      const q = search.trim().toLowerCase();
      rsvps = rsvps.filter(
        (r) =>
          r.guest_name.toLowerCase().includes(q) ||
          r.guest_email.toLowerCase().includes(q) ||
          (r.phone_number && r.phone_number.toLowerCase().includes(q))
      );
    }

    // Sort order (default: newest first)
    if (sort === 'oldest') {
      rsvps.sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
    } else if (sort === 'name') {
      rsvps.sort((a, b) => a.guest_name.localeCompare(b.guest_name));
    } else {
      rsvps.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    }

    return res.json({ success: true, data: rsvps });
  } catch (err) {
    console.error('[Admin Route] Error listing RSVPs:', err);
    return res.status(500).json({ error: 'Failed to retrieve RSVPs.' });
  }
});

/**
 * DELETE /api/admin/rsvps/:id
 * Remove an RSVP entry
 */
adminRouter.delete('/rsvps/:id', requireAdminAuth, async (req, res) => {
  try {
    const { id } = req.params;
    await db.deleteRsvp(id);
    return res.json({ success: true, message: 'RSVP removed successfully.' });
  } catch (err) {
    console.error('[Admin Route] Error deleting RSVP:', err);
    return res.status(500).json({ error: 'Failed to delete RSVP.' });
  }
});

/**
 * GET /api/admin/export
 * Download all RSVPs as a formatted CSV file
 */
adminRouter.get('/export', requireAdminAuth, async (req, res) => {
  try {
    const rsvps = await db.getAllRsvps();

    const headers = [
      'Submission ID',
      'Date & Time (UTC)',
      'Guest Name',
      'Guest Email',
      'Phone Number',
      'Attendance Status',
      'Total Attendees',
      'Additional Guest Names',
      'Selected Events',
      'Dietary Requirements',
      'Special Requests & Notes',
    ];

    const escapeCsv = (str) => {
      if (str === null || str === undefined) return '""';
      const clean = String(str).replace(/"/g, '""');
      return `"${clean}"`;
    };

    const rows = rsvps.map((r) => [
      escapeCsv(r.id),
      escapeCsv(r.created_at),
      escapeCsv(r.guest_name),
      escapeCsv(r.guest_email),
      escapeCsv(r.phone_number),
      escapeCsv(r.attendance_status),
      escapeCsv(r.attendees_count),
      escapeCsv(r.additional_guests),
      escapeCsv(Array.isArray(r.selected_events) ? r.selected_events.join(', ') : ''),
      escapeCsv(r.dietary_requirements),
      escapeCsv(r.special_requests),
    ]);

    const csvContent = [headers.map((h) => `"${h}"`).join(','), ...rows.map((row) => row.join(','))].join('\n');

    res.setHeader('Content-Type', 'text/csv; charset=utf-8');
    res.setHeader('Content-Disposition', 'attachment; filename="wedding_rsvps_yash_mrudula.csv"');
    return res.send(csvContent);
  } catch (err) {
    console.error('[Admin Route] CSV export error:', err);
    return res.status(500).json({ error: 'Failed to generate CSV export.' });
  }
});
