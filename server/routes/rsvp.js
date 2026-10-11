import express from 'express';
import { db } from '../db.js';
import { emailService } from '../email.js';

export const rsvpRouter = express.Router();

// Simple in-memory rate limiting map (IP -> timestamps)
const rateLimitMap = new Map();

function isRateLimited(ip) {
  const now = Date.now();
  const windowMs = 15 * 60 * 1000; // 15 minutes
  const maxRequests = 10; // max 10 submissions per 15 minutes

  const timestamps = rateLimitMap.get(ip) || [];
  const validTimestamps = timestamps.filter((t) => now - t < windowMs);

  if (validTimestamps.length >= maxRequests) {
    return true;
  }

  validTimestamps.push(now);
  rateLimitMap.set(ip, validTimestamps);
  return false;
}

/**
 * POST /api/rsvp
 * Submit and record an RSVP
 */
rsvpRouter.post('/', async (req, res) => {
  try {
    const clientIp = req.headers['x-forwarded-for'] || req.socket.remoteAddress || '127.0.0.1';

    if (isRateLimited(clientIp)) {
      return res.status(429).json({
        error: 'Too many submissions. Please wait a few moments before trying again.',
      });
    }

    const {
      guest_name,
      guest_email,
      phone_number,
      attendance_status,
      attendees_count,
      additional_guests,
      selected_events,
      dietary_requirements,
      special_requests,
    } = req.body;

    // --- Server-side Validations ---
    if (!guest_name || typeof guest_name !== 'string' || guest_name.trim().length < 2) {
      return res.status(400).json({ error: 'Please provide your full name (minimum 2 characters).' });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!guest_email || typeof guest_email !== 'string' || !emailRegex.test(guest_email.trim())) {
      return res.status(400).json({ error: 'Please provide a valid email address.' });
    }

    if (!attendance_status || !['attending', 'declined'].includes(attendance_status)) {
      return res.status(400).json({ error: 'Please indicate whether you will be joining us.' });
    }

    const isAttending = attendance_status === 'attending';

    if (isAttending) {
      const count = parseInt(attendees_count, 10);
      if (isNaN(count) || count < 1 || count > 20) {
        return res.status(400).json({ error: 'Please enter a valid number of attendees (1 to 20).' });
      }

      if (!Array.isArray(selected_events) || selected_events.length === 0) {
        return res.status(400).json({ error: 'Please select at least one celebration event you will attend.' });
      }
    }

    // Prepare payload
    const rsvpData = {
      guest_name: guest_name.trim(),
      guest_email: guest_email.trim(),
      phone_number: phone_number ? String(phone_number).trim() : '',
      attendance_status,
      attendees_count: isAttending ? parseInt(attendees_count, 10) : 0,
      additional_guests: additional_guests ? String(additional_guests).trim() : '',
      selected_events: isAttending && Array.isArray(selected_events) ? selected_events : [],
      dietary_requirements: dietary_requirements ? String(dietary_requirements).trim() : '',
      special_requests: special_requests ? String(special_requests).trim() : '',
      ip_address: String(clientIp),
    };

    // 1. Save to persistent database
    const savedRecord = await db.saveRsvp(rsvpData);

    // 2. Dispatch email notification in background (never fail the RSVP response if email fails)
    emailService.sendRsvpNotifications(savedRecord).catch((err) => {
      console.error('[RSVP Route] Email sending failed in background:', err.message);
    });

    return res.status(201).json({
      success: true,
      message: 'RSVP saved successfully',
      data: {
        id: savedRecord.id,
        guest_name: savedRecord.guest_name,
        attendance_status: savedRecord.attendance_status,
      },
    });
  } catch (err) {
    console.error('[RSVP Route] Unexpected server error:', err);
    return res.status(500).json({
      error: 'An unexpected server error occurred while processing your RSVP. Please try again.',
    });
  }
});
