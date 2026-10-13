-- =========================================================================
-- Supabase PostgreSQL Schema for Yaswanth Sai & Lakshmi Mrudula Wedding RSVP
-- =========================================================================

-- Create RSVP table
CREATE TABLE IF NOT EXISTS public.rsvps (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    guest_name TEXT NOT NULL,
    guest_email TEXT NOT NULL,
    phone_number TEXT CHECK (phone_number IS NULL OR phone_number ~ '^\+?[0-9\s\-().]{7,25}$'),
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
DROP POLICY IF EXISTS "Enable public insert for RSVPs" ON public.rsvps;
CREATE POLICY "Enable public insert for RSVPs" ON public.rsvps
    FOR INSERT 
    WITH CHECK (true);

-- Security Policy:
-- Allow reading records (protected at the backend API layer by ADMIN_PASSCODE)
DROP POLICY IF EXISTS "Restrict read to service role and authenticated admins" ON public.rsvps;
DROP POLICY IF EXISTS "Enable read for RSVPs" ON public.rsvps;
CREATE POLICY "Enable read for RSVPs" ON public.rsvps
    FOR SELECT
    USING (true);

-- Security Policy:
-- Allow deleting records (protected at the backend API layer by ADMIN_PASSCODE)
DROP POLICY IF EXISTS "Restrict delete to service role" ON public.rsvps;
DROP POLICY IF EXISTS "Enable delete for RSVPs" ON public.rsvps;
CREATE POLICY "Enable delete for RSVPs" ON public.rsvps
    FOR DELETE
    USING (true);
