-- =========================================================================
-- Supabase PostgreSQL Schema for Yaswanth Sai & Lakshmi Mrudula Wedding RSVP
-- =========================================================================

-- Create RSVP table
CREATE TABLE IF NOT EXISTS public.rsvps (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    guest_name TEXT NOT NULL,
    guest_email TEXT NOT NULL,
    phone_number TEXT,
    attendance_status TEXT NOT NULL CHECK (attendance_status IN ('attending', 'declined')),
    attendees_count INTEGER NOT NULL DEFAULT 1 CHECK (attendees_count >= 0),
    additional_guests TEXT,
    selected_events JSONB DEFAULT '[]'::jsonb,
    dietary_requirements TEXT,
    special_requests TEXT,
    ip_address TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Index for searching and filtering
CREATE INDEX IF NOT EXISTS idx_rsvps_email ON public.rsvps(guest_email);
CREATE INDEX IF NOT EXISTS idx_rsvps_status ON public.rsvps(attendance_status);
CREATE INDEX IF NOT EXISTS idx_rsvps_created_at ON public.rsvps(created_at DESC);

-- Enable Row Level Security (RLS)
ALTER TABLE public.rsvps ENABLE ROW LEVEL SECURITY;

-- Security Policy:
-- Public (anonymous visitors) can INSERT their RSVP via the web form.
CREATE POLICY "Enable public insert for RSVPs" ON public.rsvps
    FOR INSERT 
    WITH CHECK (true);

-- Security Policy:
-- Public visitors CANNOT select, update, or delete guest records.
-- Only the service_role (backend server) or authenticated admin can read or manage RSVPs.
CREATE POLICY "Restrict read to service role and authenticated admins" ON public.rsvps
    FOR SELECT
    USING (auth.role() = 'service_role' OR auth.role() = 'authenticated');

CREATE POLICY "Restrict delete to service role" ON public.rsvps
    FOR DELETE
    USING (auth.role() = 'service_role');
