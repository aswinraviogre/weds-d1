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

    // --- Server-side Validations & Data Normalization ---
    // Guests can submit with any combination of details; no field is strictly mandatory.
    const cleanName =
      guest_name && typeof guest_name === 'string' && guest_name.trim().length > 0
        ? guest_name.trim()
        : 'Valued Guest';

    const cleanEmail =
      guest_email && typeof guest_email === 'string' && guest_email.trim().length > 0
        ? guest_email.trim()
        : '';

    // Only validate email pattern IF an email was actually provided
    if (cleanEmail.length > 0) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(cleanEmail)) {
        return res.status(400).json({ error: 'Please provide a valid email address.' });
      }
    }

    const effectiveStatus = attendance_status === 'declined' ? 'declined' : 'attending';
    const isAttending = effectiveStatus === 'attending';

    let count = 1;
    if (isAttending && attendees_count !== undefined && attendees_count !== null && attendees_count !== '') {
      const parsedCount = parseInt(attendees_count, 10);
      if (!isNaN(parsedCount) && parsedCount >= 1 && parsedCount <= 50) {
        count = parsedCount;
      }
    } else if (!isAttending) {
      count = 0;
    }

    // --- Phone Number Validation & Data Casting ---
    let validatedPhone = null;
    if (phone_number !== undefined && phone_number !== null) {
      const cleanPhone = String(phone_number).trim();
      if (cleanPhone.length > 0) {
        // Accepts optional '+' followed by digits, spaces, hyphens, dots, and parentheses
        const phoneRegex = /^\+?[0-9\s\-().]{7,25}$/;
        const digitsOnly = cleanPhone.replace(/\D/g, '');

        if (!phoneRegex.test(cleanPhone) || digitsOnly.length < 7 || digitsOnly.length > 15) {
          return res.status(400).json({
            error: 'Please enter a valid phone number (e.g. +1 (555) 123-4567 or +91 98765 43210).',
          });
        }
        validatedPhone = cleanPhone;
      }
    }

    // Prepare payload
    const rsvpData = {
      guest_name: cleanName,
      guest_email: cleanEmail,
      phone_number: validatedPhone,
      attendance_status: effectiveStatus,
      attendees_count: count,
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
