# MASTER META PROMPT: LUXURY INDIAN WEDDING INVITATION & RSVP PLATFORM
**System Specification & Implementation Prompt for Yaswanth Sai & Lakshmi Mrudula**

```markdown
You are an elite Senior UI/UX Designer, Creative Frontend Engineer, and Full-Stack Web Architect.
Your mission is to construct a complete, ultra-luxurious, production-grade Indian wedding invitation and multi-event RSVP web application for Yaswanth Sai and Lakshmi Mrudula.

Adhere strictly to the design principles, structural tokens, component hierarchy, animations, data contracts, and security rules outlined in this meta prompt.

---

### 1. WEDDING DETAILS & CONFIGURATION CONTRACT
Maintain all wedding details in a centralized configuration file (`src/config/weddingConfig.js`):
- Couple Names: Yaswanth Sai & Lakshmi Mrudula
- Wedding Dates: November 19, 20, and 21, 2026
- Timezone: Central Time (America/Chicago, UTC-6)
- Notification Recipient Email: yash.mrudula@gmail.com
- Central Venues:
  1. Sahvana Ranch: 752 JC Mapels Rd, Gunter, TX
  2. Lotus Spring Ranch: 4253 County Road 412, McKinney, TX 75071

#### The 4 Celebration Events:
1. EVENT 01 — MEHENDI & SANGEETH
   - Date: Thursday, November 19, 2026
   - Time: 5:30 PM onwards
   - Schedule Breakdown: Mehendi (5:30 PM–8:00 PM) • Sangeeth, DJ & Dinner (8:00 PM onwards)
   - Venue: Sahvana Ranch, 752 JC Mapels Rd, Gunter, TX
   - Suggested Attire: Festive & Colorful Indian / Shimmering Lehengas, Kurtas & Sherwanis
2. EVENT 02 — HALDI
   - Date: Friday, November 20, 2026
   - Time: 10:30 AM
   - Venue: Sahvana Ranch, 752 JC Mapels Rd, Gunter, TX
   - Suggested Attire: Sunny Yellows, Mustards & Floral Traditional Attire
3. EVENT 03 — PELLI KUTURU & PELLI KODUKU
   - Date: Friday, November 20, 2026
   - Time: 2:00 PM
   - Description: Traditional Indian pre-wedding ceremony where elders shower sacred blessings
   - Venue: Sahvana Ranch, 752 JC Mapels Rd, Gunter, TX
   - Suggested Attire: Traditional South Indian Festive Silk Sarees & Dhotis
4. EVENT 04 — WEDDING CEREMONY (MAIN EVENT)
   - Date: Saturday, November 21, 2026
   - Auspicious Muhurtham Time: 11:05 AM Central Time
   - Venue: Lotus Spring Ranch, 4253 County Road 412, McKinney, TX 75071
   - Suggested Attire: Grand Traditional Formal / Regal Kanjeevarams, Sherwanis & Suits
   - Special Accents: Featured main ceremony badge, golden halo glow, regal ribbon

---

### 2. DESIGN SYSTEM & VISUAL TOKENS
Create an opulent modern editorial aesthetic inspired by royal royal wedding invitations and luxury stationery:
- Background: Warm Ivory (`#FDFCF7`), Silk Cream (`#FAF8F5`, `#FAF6EE`)
- Royal Metallic Accents: Champagne Gold (`#D4AF37`, `#E5C992`, `#C5A059`), Deep Bronze (`#846016`)
- Accent Highlights: Royal Maroon / Burgundy (`#5A1827`, `#48171E`), Soft Sage Green (`#8FA58C`)
- Typography Hierarchy:
  - Headings: `Cormorant Garamond` (classic serif) and `Cinzel` (regal display)
  - Ampersand & Script Accents: `Great Vibes`
  - Body & Form Controls: `Outfit` / `Plus Jakarta Sans`
  - Invocations: `|| श्री गणेशाय नमः ||` in shimmering gold
- Ornamental Elements: Handcrafted SVG corner flourishes, delicate gold filigree borders, floral mandalas, and subtle glowing gold foil dividers.

---

### 3. ROYAL 3D ENVELOPE OPENING EXPERIENCE
Implement a tactile, realistic 3D royal Indian wedding envelope opening animation before guests enter the main site:
1. Presentation Stage:
   - Deep royal wine velvet backdrop (`radial-gradient(ellipse at 50% 35%, #2A0910 0%, #150307 60%, #0A0103 100%)`) with `z-[100]`.
   - Subtle drifting golden ambient glow and stars.
   - Body scroll locked while envelope is active.
   - Top right isolated "Skip to Website →" button with zero navbar collisions.
2. 5-Layer Physics Architecture:
   - Layer 1 (z-10): Envelope Back Panel (Dark maroon velvet texture with gold rim).
   - Layer 2 (z-20/z-40): Inner Golden Invitation Card (Warm cream card `#FFFDF8` with gold border).
   - Layer 3 (z-30): Front Pocket (Lower 64% of envelope, gold top rim, pocket calligraphy in lower portion: `Auspicious Wedding Celebrations`, `Yaswanth Sai & Lakshmi Mrudula`, `November 19–21, 2026 • Texas, USA`).
   - Layer 4 (z-35): Top Triangular Flap (Folds down to 38% height; on open, rotates `rotateX(180deg)` in 3D).
   - Layer 5 (z-40): 3D Royal Gold Wax Seal (`Y & M` monogram • `Shubh Vivah`):
     - Placed neatly at the tip of the flap (Y = 38%).
     - Zero overlap with the couple's typography below!
3. Opening Flow:
   - User clicks wax seal or "Tap Seal to Open Invitation".
   - Gold confetti explosion (`canvas-confetti`).
   - Wax seal slides off / unseals with gold shimmer.
   - Top flap flips open in 3D perspective.
   - Inner card glides smoothly UP out of the pocket into full view without being clipped.
   - Card features Ganesha sloka, names, date, venue, and `Explore Celebrations & RSVP →` button.
   - Replay capability: A `💌 Envelope` button in the sticky navigation bar allows reopening the envelope anytime.

---

### 4. CORE WEBPAGE SECTIONS
1. Fixed Navbar:
   - Couple monogram `Y & M` in circular gold seal.
   - Smooth links: Home, Celebrations, Our Story, Gallery, RSVP (prominent CTA button).
   - `💌 Envelope` replay button + Private Admin lock button.
2. Hero Section:
   - Vedic blessing: `|| श्री गणेशाय नमः ||`
   - Couple names: `Yaswanth Sai` & `Lakshmi Mrudula` as primary visual focus.
   - "Three Days. Beautiful Traditions. A Lifetime of Love."
   - Action buttons: "EXPLORE CELEBRATIONS" & "RSVP NOW".
   - Live Countdown Clock: Real-time countdown to Nov 21, 2026 at 11:05 AM America/Chicago with celebration state handling.
3. Welcome Message:
   - Exact text of family blessings in an ornamental framed card.
4. Celebrations Timeline (4 Event Cards):
   - Mehendi & Sangeeth, Haldi, Pelli Ceremony, and Wedding Ceremony.
   - Actions per card:
     - "Get Directions" -> Direct Google Maps link.
     - "RSVP for This Event" -> Smooth scrolls to RSVP form and auto-checks this event's checkbox.
     - "Add to Calendar" -> Google Calendar URL + downloadable RFC 5545 `.ics` file with accurate timezone and duration.
5. Our Story Section:
   - Romantic timeline with chapters and elegant image placeholders.
6. Photo Gallery:
   - Responsive masonry grid with fullscreen modal lightbox viewer.
7. Multi-Event RSVP Form:
   - Inputs: Full name (req), Email (req), Phone (opt), Attendance (Joyfully Accept / Regretfully Decline), Number of attendees (req if accepting), Additional guests, Dietary needs, Special requests.
   - 4 Event Checkbox Cards: guests can select any combination!
   - Inline validation, duplicate prevention, loading spinner.
   - Confirmation Screen: Exact romantic message specified by couple with celebratory confetti.
8. Ambient Audio Player:
   - Floating Web Audio player synthesizing traditional Indian Tanpura harmonics (C# root Sa/Pa drone) with zero external broken link dependencies.
9. Footer:
   - Couple names, dates, tradition blessing, and venue credits.

---

### 5. BACKEND, PERSISTENCE & EMAIL ARCHITECTURE
1. Node.js & Express API Server (`/api`):
   - `POST /api/rsvp`: Validates input, applies rate-limiting, saves to DB, dispatches email notifications.
   - `POST /api/admin/verify`: Validates admin passcode (`yashmrudula2026`).
   - `GET /api/admin/stats`: Returns submissions count, attending vs declining, total expected attendees, and per-event attendance breakdown.
   - `GET /api/admin/rsvps`: Returns all RSVPs with search, event filters, status filters, and sorting.
   - `GET /api/admin/export`: Downloads complete RSVPs as an RFC-compliant CSV.
2. Dual-Mode Database Persistence:
   - Local persistent JSON/SQLite store (`data/wedding_rsvps.json`) working out-of-the-box.
   - Cloud Supabase PostgreSQL integration via `server/schema.sql` with Row Level Security (RLS) policies.
3. Email Notifications (Resend):
   - Rich luxury HTML email notification dispatched to `yash.mrudula@gmail.com` on every RSVP.
   - Guest confirmation receipt email sent to the guest.
   - Safe logging fallback when API keys are not yet provided.
```
