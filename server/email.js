import { Resend } from 'resend';

const resendApiKey = process.env.RESEND_API_KEY;
const senderEmail = process.env.SENDER_EMAIL || 'onboarding@resend.dev';
const notificationEmail = process.env.NOTIFICATION_EMAIL || 'aswinravi70@gmail.com';

let resendClient = null;
if (resendApiKey) {
  try {
    resendClient = new Resend(resendApiKey);
    console.log('[Email] Resend client initialized successfully.');
  } catch (err) {
    console.warn('[Email] Failed to initialize Resend:', err.message);
  }
} else {
  console.log('[Email] RESEND_API_KEY not set. Operating in local preview logging mode.');
}

const eventDisplayNames = {
  mehendi_sangeeth: 'Mehendi & Sangeeth — Nov 19, 2026 (5:30 PM onwards) at Sahvana Ranch',
  mehendi: 'Mehendi — Nov 19, 2026 (5:30 PM–8:00 PM) at Sahvana Ranch',
  sangeeth: 'Sangeeth — Nov 19, 2026 (8:00 PM onwards) at Sahvana Ranch',
  haldi_pelli: 'Haldi and Pelli Kuturu & Pelli Koduku — Nov 20, 2026 (10:30 AM onwards) at Sahvana Ranch',
  haldi: 'Haldi and Pelli Kuturu & Pelli Koduku — Nov 20, 2026 (10:30 AM) at Sahvana Ranch',
  pelli_ceremony: 'Haldi and Pelli Kuturu & Pelli Koduku — Nov 20, 2026 (2:00 PM) at Sahvana Ranch',
  wedding_ceremony: 'Wedding Ceremony — Nov 21, 2026 (11:05 AM) at Lotus Spring Ranch',
};

/**
 * Generate luxury HTML email template for the couple
 */
function createAdminEmailHtml(rsvp) {
  const isAttending = rsvp.attendance_status === 'attending';
  const statusBadge = isAttending
    ? '<span style="background-color: #d1fae5; color: #065f46; padding: 6px 14px; border-radius: 9999px; font-weight: 700; font-size: 14px;">✓ Joyfully Attending</span>'
    : '<span style="background-color: #fee2e2; color: #991b1b; padding: 6px 14px; border-radius: 9999px; font-weight: 700; font-size: 14px;">✕ Regretfully Declined</span>';

  const selectedEventList =
    Array.isArray(rsvp.selected_events) && rsvp.selected_events.length > 0
      ? rsvp.selected_events
          .map((id) => `<li style="margin-bottom: 6px; color: #44403c;"><strong>${eventDisplayNames[id] || id}</strong></li>`)
          .join('')
      : '<li style="color: #78716c; font-style: italic;">No events selected (declined)</li>';

  return `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="utf-8">
    <title>New Wedding RSVP — Yaswanth Sai & Lakshmi Mrudula</title>
  </head>
  <body style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background-color: #fcfbf7; margin: 0; padding: 30px 10px; color: #292524;">
    <table align="center" border="0" cellpadding="0" cellspacing="0" width="600" style="background-color: #ffffff; border: 1px solid #e7dfcf; border-radius: 12px; overflow: hidden; box-shadow: 0 10px 25px rgba(0,0,0,0.05);">
      <!-- Header Banner -->
      <tr>
        <td align="center" style="background-color: #5a1827; padding: 35px 20px; border-bottom: 3px solid #d4af37;">
          <p style="color: #e5c992; font-size: 12px; letter-spacing: 3px; text-transform: uppercase; margin: 0 0 8px 0;">Wedding Invitation RSVP</p>
          <h1 style="color: #ffffff; font-size: 26px; margin: 0; font-weight: 600; letter-spacing: 1px;">Yaswanth Sai & Lakshmi Mrudula</h1>
          <p style="color: #f7f3eb; font-size: 13px; margin: 8px 0 0 0;">November 19–21, 2026 • Texas, USA</p>
        </td>
      </tr>

      <!-- Main Body -->
      <tr>
        <td style="padding: 35px 30px;">
          <div style="text-align: center; margin-bottom: 25px;">
            ${statusBadge}
          </div>

          <h2 style="font-size: 18px; color: #5a1827; border-bottom: 1px solid #f0e6d6; padding-bottom: 10px; margin-top: 0;">Guest Details</h2>
          
          <table width="100%" cellpadding="6" cellspacing="0" style="font-size: 14px; margin-bottom: 20px;">
            <tr>
              <td width="35%" style="color: #78716c;">Guest Name:</td>
              <td style="color: #1c1917; font-weight: 600;">${rsvp.guest_name}</td>
            </tr>
            <tr>
              <td style="color: #78716c;">Email Address:</td>
              <td style="color: #1c1917;">${rsvp.guest_email ? `<a href="mailto:${rsvp.guest_email}" style="color: #a67d1e; text-decoration: none;">${rsvp.guest_email}</a>` : '<em>Not provided</em>'}</td>
            </tr>
            <tr>
              <td style="color: #78716c;">Phone Number:</td>
              <td style="color: #1c1917;">${rsvp.phone_number || '<em>Not provided</em>'}</td>
            </tr>
            <tr>
              <td style="color: #78716c;">Party Size / Attendees:</td>
              <td style="color: #1c1917; font-weight: 600;">${rsvp.attendees_count} ${rsvp.attendees_count === 1 ? 'Guest' : 'Guests'}</td>
            </tr>
            ${
              rsvp.additional_guests
                ? `
            <tr>
              <td style="color: #78716c;">Additional Guests:</td>
              <td style="color: #1c1917;">${rsvp.additional_guests}</td>
            </tr>`
                : ''
            }
          </table>

          <h2 style="font-size: 18px; color: #5a1827; border-bottom: 1px solid #f0e6d6; padding-bottom: 10px; margin-top: 25px;">Selected Celebrations</h2>
          <ul style="padding-left: 20px; font-size: 14px; line-height: 1.6;">
            ${selectedEventList}
          </ul>

          ${
            rsvp.dietary_requirements || rsvp.special_requests
              ? `
          <h2 style="font-size: 18px; color: #5a1827; border-bottom: 1px solid #f0e6d6; padding-bottom: 10px; margin-top: 25px;">Special Notes & Preferences</h2>
          <table width="100%" cellpadding="6" cellspacing="0" style="font-size: 14px;">
            ${
              rsvp.dietary_requirements
                ? `
            <tr>
              <td width="35%" style="color: #78716c; vertical-align: top;">Dietary Needs:</td>
              <td style="color: #1c1917;">${rsvp.dietary_requirements}</td>
            </tr>`
                : ''
            }
            ${
              rsvp.special_requests
                ? `
            <tr>
              <td width="35%" style="color: #78716c; vertical-align: top;">Special Message:</td>
              <td style="color: #1c1917; font-style: italic;">“${rsvp.special_requests}”</td>
            </tr>`
                : ''
            }
          </table>`
              : ''
          }

          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px dashed #e7dfcf; font-size: 12px; color: #a8a29e; text-align: center;">
            Submitted on ${new Date(rsvp.created_at).toLocaleString('en-US', { timeZone: 'America/Chicago' })} Central Time
          </div>
        </td>
      </tr>

      <!-- Footer -->
      <tr>
        <td align="center" style="background-color: #faf7ee; padding: 20px; font-size: 12px; color: #78716c; border-top: 1px solid #e7dfcf;">
          Yaswanth Sai & Lakshmi Mrudula Wedding Celebration Portal • Texas, USA
        </td>
      </tr>
    </table>
  </body>
  </html>
  `;
}

/**
 * Generate guest confirmation receipt HTML
 */
function createGuestConfirmationHtml(rsvp) {
  const isAttending = rsvp.attendance_status === 'attending';

  return `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="utf-8">
    <title>RSVP Confirmation — Yaswanth Sai & Lakshmi Mrudula Wedding</title>
  </head>
  <body style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background-color: #fcfbf7; margin: 0; padding: 30px 10px; color: #292524;">
    <table align="center" border="0" cellpadding="0" cellspacing="0" width="600" style="background-color: #ffffff; border: 1px solid #e7dfcf; border-radius: 12px; overflow: hidden;">
      <tr>
        <td align="center" style="background-color: #5a1827; padding: 35px 20px; border-bottom: 3px solid #d4af37;">
          <h1 style="color: #ffffff; font-size: 26px; margin: 0; font-weight: 600;">Yaswanth Sai & Lakshmi Mrudula</h1>
          <p style="color: #e5c992; font-size: 14px; margin: 8px 0 0 0;">November 19–21, 2026 • Texas, USA</p>
        </td>
      </tr>
      <tr>
        <td style="padding: 35px 30px; text-align: center;">
          <h2 style="color: #5a1827; font-size: 22px; margin-top: 0;">Thank You for Being Part of Our Journey!</h2>
          <p style="font-size: 16px; color: #44403c; line-height: 1.6;">
            Dear <strong>${rsvp.guest_name}</strong>,<br/>
            ${
              isAttending
                ? `Your RSVP has been received successfully. We are so happy to share these special moments with you and look forward to celebrating together in Texas!`
                : `Thank you for letting us know. While we will deeply miss your presence at our wedding celebrations, we cherish your love and warm wishes from afar!`
            }
          </p>
          <div style="margin: 30px 0; padding: 20px; background-color: #faf7ee; border-radius: 8px; text-align: left; font-size: 14px;">
            <p style="margin: 0 0 8px 0; color: #78716c;"><strong>Status:</strong> ${isAttending ? 'Joyfully Attending' : 'Regretfully Declined'}</p>
            ${isAttending ? `<p style="margin: 0 0 8px 0; color: #78716c;"><strong>Party Size:</strong> ${rsvp.attendees_count} Attendee(s)</p>` : ''}
            <p style="margin: 0; color: #78716c;"><strong>Confirmation Reference:</strong> ${rsvp.id}</p>
          </div>
          <p style="font-size: 16px; color: #5a1827; font-style: italic; margin-top: 30px;">
            With love,<br/>
            <strong>Yaswanth Sai & Lakshmi Mrudula</strong>
          </p>
        </td>
      </tr>
    </table>
  </body>
  </html>
  `;
}

export const emailService = {
  /**
   * Send notification to couple and confirmation to guest
   */
  async sendRsvpNotifications(rsvp) {
    const isAttending = rsvp.attendance_status === 'attending';
    const statusText = isAttending ? 'ATTENDING' : 'DECLINED';
    const subject = `New Wedding RSVP [${statusText}] — Yaswanth Sai & Lakshmi Mrudula`;

    // 1. Dispatch notification to couple (aswinravi70@gmail.com)
    if (resendClient) {
      try {
        const { data, error } = await resendClient.emails.send({
          from: `Wedding RSVP <${senderEmail}>`,
          to: [notificationEmail],
          subject: subject,
          html: createAdminEmailHtml(rsvp),
        });

        if (error) {
          console.warn('[Email] Resend notification to couple failed:', error);
        } else {
          console.log('[Email] Sent RSVP notification to couple:', data?.id);
        }

        // 2. Dispatch confirmation to guest if valid email
        if (rsvp.guest_email && rsvp.guest_email.includes('@')) {
          try {
            await resendClient.emails.send({
              from: `Yaswanth & Mrudula <${senderEmail}>`,
              to: [rsvp.guest_email],
              subject: `Wedding RSVP Confirmation — Yaswanth Sai & Lakshmi Mrudula`,
              html: createGuestConfirmationHtml(rsvp),
            });
            console.log('[Email] Sent confirmation email to guest:', rsvp.guest_email);
          } catch (guestErr) {
            console.warn('[Email] Guest confirmation delivery issue:', guestErr.message);
          }
        }

        return { sent: true };
      } catch (err) {
        console.error('[Email] Exception while sending email with Resend:', err.message);
        return { sent: false, error: err.message };
      }
    } else {
      // Safe preview mode when RESEND_API_KEY is not set
      console.log('================================================================');
      console.log('📨 [EMAIL NOTIFICATION PREVIEW — SAVED TO LOG]');
      console.log(`To: ${notificationEmail}`);
      console.log(`Subject: ${subject}`);
      console.log(`Guest: ${rsvp.guest_name} <${rsvp.guest_email}>`);
      console.log(`Status: ${rsvp.attendance_status} (${rsvp.attendees_count} guests)`);
      console.log(`Events: ${(rsvp.selected_events || []).join(', ') || 'None'}`);
      if (rsvp.dietary_requirements) console.log(`Dietary: ${rsvp.dietary_requirements}`);
      if (rsvp.special_requests) console.log(`Notes: ${rsvp.special_requests}`);
      console.log('================================================================');

      return { sent: false, mode: 'local_preview' };
    }
  },
};
