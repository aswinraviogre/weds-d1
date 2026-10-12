/**
 * Google Sheets Web App Integration Service
 * Couple: Yaswanth Sai & Lakshmi Mrudula
 * Deployment ID: AKfycbywwYLX9rusWin3N_bIyM5F-WvN4D4g3nDiw7gstKwsH-XlZb8NvNIF1S-0HtxlRkpssw
 */

export const googleSheetsService = {
  getEndpointUrl() {
    return (
      process.env.GOOGLE_SHEETS_WEB_APP_URL ||
      process.env.GOOGLE_SHEET_URL ||
      'https://script.google.com/macros/s/AKfycbywwYLX9rusWin3N_bIyM5F-WvN4D4g3nDiw7gstKwsH-XlZb8NvNIF1S-0HtxlRkpssw/exec'
    );
  },

  /**
   * Push RSVP record to Google Sheets Web App
   * @param {Object} rsvp The saved RSVP record
   */
  async pushRsvp(rsvp) {
    const url = this.getEndpointUrl();
    if (!url) {
      console.warn('[Google Sheets] GOOGLE_SHEETS_WEB_APP_URL not configured. Skipping sheet sync.');
      return { success: false, reason: 'URL not set' };
    }

    // Ensure events is ALWAYS an array so line 11 (events.join) in Google Apps Script never fails
    const eventsArray = Array.isArray(rsvp.selected_events)
      ? rsvp.selected_events
      : [];

    const payload = {
      id: rsvp.id,
      timestamp: rsvp.created_at || new Date().toISOString(),
      created_at: rsvp.created_at || new Date().toISOString(),
      guest_name: rsvp.guest_name,
      name: rsvp.guest_name,
      guest_email: rsvp.guest_email || '',
      email: rsvp.guest_email || '',
      phone_number: rsvp.phone_number || '',
      phone: rsvp.phone_number || '',
      attendance_status: rsvp.attendance_status,
      status: rsvp.attendance_status,
      attendees_count: rsvp.attendees_count,
      attendees: rsvp.attendees_count,
      additional_guests: rsvp.additional_guests || '',
      events: eventsArray,
      selected_events: eventsArray,
      dietary_requirements: rsvp.dietary_requirements || '',
      dietary: rsvp.dietary_requirements || '',
      special_requests: rsvp.special_requests || '',
      message: rsvp.special_requests || '',
      notes: rsvp.special_requests || '',
      ip_address: rsvp.ip_address || '',
    };

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const responseText = await response.text();
      let parsed = null;
      try {
        parsed = JSON.parse(responseText);
      } catch {
        // May return text or redirect HTML
      }

      console.log(
        '[Google Sheets] RSVP pushed successfully:',
        rsvp.id,
        parsed?.status || responseText.slice(0, 80)
      );
      return { success: true, response: parsed || responseText };
    } catch (err) {
      console.error('[Google Sheets] Failed to push RSVP to Google Sheets:', err.message);
      return { success: false, error: err.message };
    }
  },
};
