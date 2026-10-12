import React, { useState, useEffect } from 'react';
import {
  Check,
  CheckCircle2,
  XCircle,
  Users,
  Mail,
  User,
  Phone,
  Utensils,
  MessageSquare,
  Sparkles,
  AlertCircle,
  Loader2,
} from 'lucide-react';
import { weddingConfig } from '../config/weddingConfig';

export function RsvpForm({ preselectedEventId, onSuccessSubmission }) {
  const { events } = weddingConfig;

  // Form State
  const [formData, setFormData] = useState({
    guest_name: '',
    guest_email: '',
    phone_number: '',
    attendance_status: 'attending', // 'attending' | 'declined'
    attendees_count: 1,
    additional_guests: '',
    selected_events: [],
    dietary_requirements: '',
    special_requests: '',
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverError, setServerError] = useState('');

  // Handle external preselection from event card click
  useEffect(() => {
    if (preselectedEventId) {
      setFormData((prev) => {
        const currentEvents = new Set(prev.selected_events);
        currentEvents.add(preselectedEventId);
        return {
          ...prev,
          attendance_status: 'attending',
          selected_events: Array.from(currentEvents),
        };
      });

      // Clear event error if present
      setErrors((prev) => {
        const next = { ...prev };
        delete next.selected_events;
        return next;
      });
    }
  }, [preselectedEventId]);

  // Event Checkbox Toggle
  const toggleEvent = (eventId) => {
    setFormData((prev) => {
      const exists = prev.selected_events.includes(eventId);
      const nextEvents = exists
        ? prev.selected_events.filter((id) => id !== eventId)
        : [...prev.selected_events, eventId];

      return { ...prev, selected_events: nextEvents };
    });

    if (errors.selected_events) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next.selected_events;
        return next;
      });
    }
  };

  // Form Validation
  const validateForm = () => {
    const errs = {};

    // Validate email format ONLY IF provided
    if (formData.guest_email && formData.guest_email.trim().length > 0) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.guest_email.trim())) {
        errs.guest_email = 'Please provide a valid email address.';
      }
    }

    // Optional phone validation: if provided, must match valid international pattern
    if (formData.phone_number && formData.phone_number.trim().length > 0) {
      const cleanPhone = formData.phone_number.trim();
      const phoneRegex = /^\+?[0-9\s\-().]{7,25}$/;
      const digitsOnly = cleanPhone.replace(/\D/g, '');
      if (!phoneRegex.test(cleanPhone) || digitsOnly.length < 7 || digitsOnly.length > 15) {
        errs.phone_number = 'Please enter a valid phone number (e.g. +1 (555) 123-4567 or +91 98765 43210).';
      }
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  // Submission Handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError('');

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const payload = {
        ...formData,
        guest_name: formData.guest_name.trim() || 'Valued Guest',
        guest_email: formData.guest_email.trim(),
        phone_number: formData.phone_number.trim() ? formData.phone_number.trim() : null,
        attendees_count: isAttending ? (parseInt(formData.attendees_count, 10) || 1) : 0,
      };

      const response = await fetch('/api/rsvp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.error || 'Failed to submit RSVP. Please try again.');
      }

      const confirmedRecord = result.data || {
        ...payload,
        id: `local-${Date.now()}`,
        created_at: new Date().toISOString(),
      };

      // Save client-side backup in localStorage
      try {
        const clientSaved = JSON.parse(localStorage.getItem('wedding_client_rsvps') || '[]');
        clientSaved.unshift({
          ...confirmedRecord,
          _pendingSync: false,
        });
        localStorage.setItem('wedding_client_rsvps', JSON.stringify(clientSaved.slice(0, 50)));
      } catch (e) {}

      // Trigger instant real-time sync across components and open tabs
      try {
        window.dispatchEvent(
          new CustomEvent('wedding-rsvp-updated', { detail: confirmedRecord })
        );
        localStorage.setItem('wedding_last_rsvp_sync', Date.now().toString());
        if (typeof BroadcastChannel !== 'undefined') {
          const channel = new BroadcastChannel('wedding_rsvp_channel');
          channel.postMessage({ type: 'RSVP_SUBMITTED', data: confirmedRecord });
          channel.close();
        }
      } catch (e) {}

      // Successful submission callback
      if (onSuccessSubmission) {
        onSuccessSubmission({
          guest_name: payload.guest_name,
          attendance_status: payload.attendance_status,
        });
      }

      // Reset form
      setFormData({
        guest_name: '',
        guest_email: '',
        phone_number: '',
        attendance_status: 'attending',
        attendees_count: 1,
        additional_guests: '',
        selected_events: [],
        dietary_requirements: '',
        special_requests: '',
      });
      setErrors({});
    } catch (err) {
      console.error('RSVP Submission Error:', err);
      setServerError(err.message || 'A network error occurred. Your details were kept intact.');

      // Zero-data-loss fallback: Save locally as pending-sync so response is never lost
      try {
        const clientSaved = JSON.parse(localStorage.getItem('wedding_client_rsvps') || '[]');
        const pendingRecord = {
          ...formData,
          guest_name: formData.guest_name.trim() || 'Valued Guest',
          guest_email: formData.guest_email.trim(),
          phone_number: formData.phone_number.trim() ? formData.phone_number.trim() : null,
          attendees_count: isAttending ? (parseInt(formData.attendees_count, 10) || 1) : 0,
          id: `pending-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
          created_at: new Date().toISOString(),
          _pendingSync: true,
        };
        clientSaved.unshift(pendingRecord);
        localStorage.setItem('wedding_client_rsvps', JSON.stringify(clientSaved.slice(0, 50)));
      } catch (e) {}
    } finally {
      setIsSubmitting(false);
    }
  };

  const isAttending = formData.attendance_status === 'attending';

  return (
    <section id="rsvp" className="py-24 px-4 sm:px-6 lg:px-8 bg-ambient-temple relative">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center space-x-2 px-5 py-1.5 rounded-full bg-maroon-night/90 border border-brass/55 text-brass-soft text-xs font-semibold uppercase tracking-[0.2em] mb-4 shadow-sm backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-brass" />
            <span>Celebrate With Us</span>
            <Sparkles className="w-3.5 h-3.5 text-brass" />
          </div>
          <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold mb-3 text-transparent bg-clip-text bg-gradient-to-b from-[#FFFDF0] via-[#FFD77D] to-[#D49E35] filter drop-shadow-[0_4px_14px_rgba(0,0,0,0.9)]">
            Wedding RSVP
          </h2>
          <div className="w-20 h-0.5 bg-gradient-to-r from-transparent via-brass to-transparent mx-auto mb-4" />
          <p className="text-paper/95 text-sm sm:text-base font-light drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
            Kindly respond by October 2026. Please let us know which celebrations you will be attending so we can welcome you warmly.
          </p>
        </div>

        {/* Server Error Alert Banner */}
        {serverError && (
          <div className="mb-8 p-4 rounded-xl bg-red-950/70 border border-red-500 text-red-200 flex items-start space-x-3 text-sm">
            <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold block text-red-300">Submission Error</span>
              <span>{serverError}</span>
            </div>
          </div>
        )}

        {/* Form Container in Paper-Cut Card Aesthetic */}
        <form
          onSubmit={handleSubmit}
          noValidate
          className="paper-cut-card rounded-3xl p-6 sm:p-10 md:p-12 relative shadow-[0_25px_60px_-15px_rgba(15,3,5,0.85),0_0_35px_rgba(201,146,47,0.18)] border border-brass/45 bg-paper text-ink"
        >
          {/* Traditional corner flourishes */}
          <div className="corner-ornament corner-tl" />
          <div className="corner-ornament corner-tr" />
          <div className="corner-ornament corner-bl" />
          <div className="corner-ornament corner-br" />

          {/* Section 1: Attendance Decision */}
          <div className="mb-10 text-center">
            <label className="block font-serif text-2xl sm:text-3xl font-bold text-maroon-deep mb-2">
              Will you be joining us for the celebrations?
            </label>
            <p className="text-xs uppercase tracking-widest text-maroon-temple font-semibold mb-6">
              Please choose your response
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-lg mx-auto">
              {/* Option A: Joyfully Accept */}
              <button
                type="button"
                onClick={() => {
                  setFormData((prev) => ({ ...prev, attendance_status: 'attending' }));
                  setErrors((prev) => {
                    const next = { ...prev };
                    delete next.attendance_status;
                    return next;
                  });
                }}
                className={`flex items-center justify-center space-x-3 p-4 rounded-2xl border-2 transition-all duration-200 text-left cursor-pointer ${
                  isAttending
                    ? 'border-leaf bg-leaf/10 text-leaf-deep shadow-sm ring-2 ring-leaf/25'
                    : 'border-brass/30 hover:border-brass bg-paper-parchment text-ink/80'
                }`}
              >
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center border ${
                    isAttending ? 'bg-leaf border-leaf text-white' : 'border-brass/40'
                  }`}
                >
                  {isAttending && <Check className="w-4 h-4 stroke-[3]" />}
                </div>
                <div className="font-serif text-lg font-bold">Joyfully Accept</div>
              </button>

              {/* Option B: Regretfully Decline */}
              <button
                type="button"
                onClick={() => {
                  setFormData((prev) => ({
                    ...prev,
                    attendance_status: 'declined',
                    selected_events: [],
                    attendees_count: 0,
                  }));
                  setErrors({});
                }}
                className={`flex items-center justify-center space-x-3 p-4 rounded-2xl border-2 transition-all duration-200 text-left cursor-pointer ${
                  !isAttending
                    ? 'border-maroon-temple bg-maroon-temple/10 text-maroon-deep shadow-sm ring-2 ring-maroon-temple/25'
                    : 'border-brass/30 hover:border-brass bg-paper-parchment text-ink/80'
                }`}
              >
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center border ${
                    !isAttending ? 'bg-maroon-temple border-maroon-temple text-white' : 'border-brass/40'
                  }`}
                >
                  {!isAttending && <Check className="w-4 h-4 stroke-[3]" />}
                </div>
                <div className="font-serif text-lg font-bold">Regretfully Decline</div>
              </button>
            </div>
          </div>

          {/* Section 2: Guest Contact Information */}
          <div className="space-y-6 pt-6 border-t border-brass/25 mb-10">
            <h3 className="font-serif text-2xl font-bold text-maroon-deep">
              Guest Information
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Full Name */}
              <div>
                <label className="block text-xs uppercase tracking-wider text-ink/85 font-semibold mb-2">
                  Full Name <span className="text-ink/50 font-normal">(Optional)</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-brass-deep">
                    <User className="w-4 h-4" />
                  </div>
                  <input
                    type="text"
                    placeholder="e.g. Ramesh Kumar"
                    value={formData.guest_name}
                    onChange={(e) => {
                      setFormData({ ...formData, guest_name: e.target.value });
                      if (errors.guest_name) {
                        setErrors({ ...errors, guest_name: null });
                      }
                    }}
                    className={`w-full pl-10 pr-4 py-3 rounded-xl border bg-paper-parchment focus:outline-none focus:ring-2 transition-all text-sm text-ink ${
                      errors.guest_name
                        ? 'border-red-400 focus:ring-red-200'
                        : 'border-brass/40 focus:border-brass focus:ring-brass/20'
                    }`}
                  />
                </div>
                {errors.guest_name && (
                  <p className="text-xs text-red-600 mt-1.5 flex items-center space-x-1">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0 inline" />
                    <span>{errors.guest_name}</span>
                  </p>
                )}
              </div>

              {/* Email Address */}
              <div>
                <label className="block text-xs uppercase tracking-wider text-ink/85 font-semibold mb-2">
                  Email Address <span className="text-ink/50 font-normal">(Optional)</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-brass-deep">
                    <Mail className="w-4 h-4" />
                  </div>
                  <input
                    type="email"
                    placeholder="e.g. guest@example.com"
                    value={formData.guest_email}
                    onChange={(e) => {
                      setFormData({ ...formData, guest_email: e.target.value });
                      if (errors.guest_email) {
                        setErrors({ ...errors, guest_email: null });
                      }
                    }}
                    className={`w-full pl-10 pr-4 py-3 rounded-xl border bg-paper-parchment focus:outline-none focus:ring-2 transition-all text-sm text-ink ${
                      errors.guest_email
                        ? 'border-red-400 focus:ring-red-200'
                        : 'border-brass/40 focus:border-brass focus:ring-brass/20'
                    }`}
                  />
                </div>
                {errors.guest_email && (
                  <p className="text-xs text-red-600 mt-1.5 flex items-center space-x-1">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0 inline" />
                    <span>{errors.guest_email}</span>
                  </p>
                )}
              </div>

              {/* Phone Number (Optional) */}
              <div>
                <label className="block text-xs uppercase tracking-wider text-ink/85 font-semibold mb-2">
                  Phone Number <span className="text-ink/50 font-normal">(Optional)</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-brass-deep">
                    <Phone className="w-4 h-4" />
                  </div>
                  <input
                    type="tel"
                    placeholder="e.g. +1 (555) 123-4567"
                    value={formData.phone_number}
                    onChange={(e) => {
                      setFormData({ ...formData, phone_number: e.target.value });
                      if (errors.phone_number) {
                        setErrors({ ...errors, phone_number: null });
                      }
                    }}
                    className={`w-full pl-10 pr-4 py-3 rounded-xl border bg-paper-parchment focus:outline-none focus:ring-2 transition-all text-sm text-ink ${
                      errors.phone_number
                        ? 'border-red-400 focus:ring-red-200'
                        : 'border-brass/40 focus:border-brass focus:ring-brass/20'
                    }`}
                  />
                </div>
                {errors.phone_number && (
                  <p className="text-xs text-red-600 mt-1.5 flex items-center space-x-1">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0 inline" />
                    <span>{errors.phone_number}</span>
                  </p>
                )}
              </div>

              {/* Number of Attendees (Only when attending) */}
              {isAttending && (
                <div>
                  <label className="block text-xs uppercase tracking-wider text-ink/85 font-semibold mb-2">
                    Total Number of Attendees <span className="text-ink/50 font-normal">(Optional)</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-brass-deep">
                      <Users className="w-4 h-4" />
                    </div>
                    <input
                      type="number"
                      min="1"
                      max="20"
                      value={formData.attendees_count}
                      onChange={(e) => {
                        const val = parseInt(e.target.value, 10) || 1;
                        setFormData({ ...formData, attendees_count: val });
                        if (errors.attendees_count) {
                          setErrors({ ...errors, attendees_count: null });
                        }
                      }}
                      className="w-full pl-10 pr-4 py-3 rounded-xl border border-brass/40 bg-paper-parchment focus:outline-none focus:border-brass focus:ring-2 focus:ring-brass/20 transition-all text-sm font-semibold text-ink"
                    />
                  </div>
                  {errors.attendees_count && (
                    <p className="text-xs text-red-600 mt-1.5 flex items-center space-x-1">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0 inline" />
                      <span>{errors.attendees_count}</span>
                    </p>
                  )}
                </div>
              )}
            </div>

            {/* Additional Guest Names */}
            {isAttending && (
              <div>
                <label className="block text-xs uppercase tracking-wider text-ink/85 font-semibold mb-2">
                  Names of Additional Guests in Your Party <span className="text-ink/50 font-normal">(Optional)</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. Priya Kumar, Arjun Kumar"
                  value={formData.additional_guests}
                  onChange={(e) => setFormData({ ...formData, additional_guests: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-brass/40 bg-paper-parchment focus:outline-none focus:border-brass focus:ring-2 focus:ring-brass/20 transition-all text-sm text-ink"
                />
              </div>
            )}
          </div>

          {/* Section 3: Event Selection Checkboxes (Only when attending) */}
          {isAttending && (
            <div className="space-y-6 pt-6 border-t border-brass/25 mb-10">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                <div>
                  <h3 className="font-serif text-2xl font-bold text-maroon-deep">
                    Select Celebrations to Attend
                  </h3>
                  <p className="text-xs text-ink/65 font-light mt-0.5">
                    Select any combination of events you will be joining.
                  </p>
                </div>
                <div className="flex items-center space-x-3 mt-1 sm:mt-0">
                  <button
                    type="button"
                    onClick={() => {
                      if (formData.selected_events.length === events.length) {
                        setFormData((prev) => ({ ...prev, selected_events: [] }));
                      } else {
                        setFormData((prev) => ({ ...prev, selected_events: events.map((e) => e.id) }));
                      }
                    }}
                    className="text-xs uppercase tracking-wider font-semibold text-maroon-temple hover:text-brass-deep transition-colors underline cursor-pointer"
                  >
                    {formData.selected_events.length === events.length ? 'Clear All' : 'Select All 5 Events'}
                  </button>
                  <span className="text-xs text-maroon-temple font-semibold uppercase tracking-wider">
                    ({formData.selected_events.length} of {events.length} Selected)
                  </span>
                </div>
              </div>

              {errors.selected_events && (
                <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700 flex items-center space-x-2">
                  <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
                  <span>{errors.selected_events}</span>
                </div>
              )}

              {/* Event Checkbox Cards */}
              <div className="space-y-3">
                {events.map((event) => {
                  const isChecked = formData.selected_events.includes(event.id);

                  return (
                    <div
                      key={event.id}
                      onClick={() => toggleEvent(event.id)}
                      className={`cursor-pointer rounded-2xl p-4 sm:p-5 border-2 transition-all duration-200 flex items-start space-x-4 ${
                        isChecked
                          ? 'border-brass bg-paper-warm shadow-xs ring-1 ring-brass/30'
                          : 'border-brass/30 hover:border-brass bg-paper-parchment/60'
                      }`}
                    >
                      {/* Checkbox box */}
                      <div
                        className={`w-6 h-6 rounded-lg flex items-center justify-center shrink-0 mt-1 border transition-colors ${
                          isChecked
                            ? 'bg-maroon-deep border-maroon-deep text-brass-glow'
                            : 'border-brass/40 bg-paper'
                        }`}
                      >
                        {isChecked && <Check className="w-4 h-4 stroke-[3]" />}
                      </div>

                      <div className="flex-1">
                        <div className="flex flex-wrap items-center gap-2 mb-1">
                          <h4 className="font-serif text-lg sm:text-xl font-bold text-maroon-deep">
                            {event.title}
                          </h4>
                          {event.isMainEvent && (
                            <span className="text-[10px] uppercase font-semibold px-2 py-0.5 rounded-full bg-maroon-temple/15 text-maroon-deep border border-maroon-temple/30">
                              Main Ceremony
                            </span>
                          )}
                        </div>

                        <div className="text-xs text-ink/75 space-y-0.5 sm:space-y-0 sm:flex sm:items-center sm:space-x-3">
                          <span className="font-semibold text-ink">{event.dateLabel}</span>
                          <span className="hidden sm:inline text-brass">•</span>
                          <span>{event.time}</span>
                          <span className="hidden sm:inline text-brass">•</span>
                          <span className="text-ink/65">{event.venue}</span>
                        </div>
                        {event.scheduleNote && (
                          <div className="text-[11px] text-maroon-temple font-medium mt-1">
                            {event.scheduleNote}
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Section 4: Dietary & Special Requests */}
          <div className="space-y-6 pt-6 border-t border-brass/25 mb-10">
            <h3 className="font-serif text-2xl font-bold text-maroon-deep">
              Preferences &amp; Message
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Dietary Requirements */}
              <div>
                <label className="block text-xs uppercase tracking-wider text-ink/85 font-semibold mb-2">
                  Dietary Requirements <span className="text-ink/50 font-normal">(Optional)</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-brass-deep">
                    <Utensils className="w-4 h-4" />
                  </div>
                  <input
                    type="text"
                    placeholder="e.g. Vegetarian, Vegan, Nut allergy, Jain food"
                    value={formData.dietary_requirements}
                    onChange={(e) => setFormData({ ...formData, dietary_requirements: e.target.value })}
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-brass/40 bg-paper-parchment focus:outline-none focus:border-brass focus:ring-2 focus:ring-brass/20 transition-all text-sm text-ink"
                  />
                </div>
              </div>

              {/* Special Requests or Message for Couple */}
              <div>
                <label className="block text-xs uppercase tracking-wider text-ink/85 font-semibold mb-2">
                  Warm Wishes / Message for the Couple <span className="text-ink/50 font-normal">(Optional)</span>
                </label>
                <div className="relative">
                  <div className="absolute top-3 left-3.5 pointer-events-none text-brass-deep">
                    <MessageSquare className="w-4 h-4" />
                  </div>
                  <textarea
                    rows={2}
                    placeholder="Share your love, blessings, or special song request!"
                    value={formData.special_requests}
                    onChange={(e) => setFormData({ ...formData, special_requests: e.target.value })}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-brass/40 bg-paper-parchment focus:outline-none focus:border-brass focus:ring-2 focus:ring-brass/20 transition-all text-sm text-ink resize-none"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Submit Action Button */}
          <div className="text-center pt-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full sm:w-auto min-w-[280px] px-10 py-4 rounded-full text-sm font-bold uppercase tracking-widest transition-all duration-300 shadow-temple cursor-pointer ${
                isSubmitting
                  ? 'bg-stone-300 text-stone-500 cursor-not-allowed'
                  : 'bg-maroon-temple hover:bg-maroon-deep text-paper hover:shadow-luxury-hover border border-brass/50 transform hover:-translate-y-0.5'
              }`}
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center space-x-2">
                  <Loader2 className="w-4 h-4 animate-spin text-brass-glow" />
                  <span>Submitting RSVP...</span>
                </span>
              ) : (
                <span className="flex items-center justify-center space-x-2">
                  <Sparkles className="w-4 h-4 text-brass-glow" />
                  <span>CONFIRM MY RSVP</span>
                  <Sparkles className="w-4 h-4 text-brass-glow" />
                </span>
              )}
            </button>
            <p className="text-[11px] text-ink/65 mt-3 italic">
              Your response will be recorded securely and confirmed via email.
            </p>
          </div>
        </form>
      </div>
    </section>
  );
}
