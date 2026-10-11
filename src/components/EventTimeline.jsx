import React, { useState } from 'react';
import {
  Calendar,
  Clock,
  MapPin,
  ExternalLink,
  CalendarPlus,
  CheckCircle2,
  Sparkles,
  Download,
} from 'lucide-react';
import { weddingConfig } from '../config/weddingConfig';
import { createGoogleCalendarUrl, downloadIcsFile } from '../utils/calendar';

export function EventTimeline({ onSelectEventRsvp }) {
  const { events, couple } = weddingConfig;
  const [activeCalendarMenu, setActiveCalendarMenu] = useState(null);

  const handleRsvpClick = (eventId) => {
    if (onSelectEventRsvp) {
      onSelectEventRsvp(eventId);
    }
    const rsvpElement = document.getElementById('rsvp');
    if (rsvpElement) {
      rsvpElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="celebrations" className="py-24 px-4 sm:px-6 lg:px-8 bg-ivory-50 relative">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center space-x-2 px-4 py-1 rounded-full bg-gold-100/60 border border-gold-300/60 text-gold-deep text-xs font-semibold uppercase tracking-[0.2em] mb-4">
            <Sparkles className="w-3.5 h-3.5 text-gold-rich" />
            <span>Three Days of Joy &amp; Traditions</span>
          </div>
          <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold text-maroon-royal mb-4 tracking-tight">
            Our Wedding Celebrations
          </h2>
          <div className="w-24 h-0.5 bg-gold-rich mx-auto mb-6" />
          <p className="text-stone-600 text-base sm:text-lg font-light leading-relaxed">
            We are honored to celebrate each sacred rite and joyous celebration with our cherished family and friends.
            Please join us for these auspicious moments in Texas.
          </p>
        </div>

        {/* 5 Event Cards */}
        <div className="space-y-12 sm:space-y-16">
          {events.map((event, index) => {
            const isMainEvent = event.isMainEvent;
            const isCalendarOpen = activeCalendarMenu === event.id;

            return (
              <div
                key={event.id}
                id={`event-${event.id}`}
                className={`relative rounded-3xl overflow-hidden transition-all duration-300 ${
                  isMainEvent
                    ? 'border-2 border-gold-rich bg-cream-light shadow-luxury ceremony-glow'
                    : 'luxury-border-card'
                }`}
              >
                {/* Main event special ribbon */}
                {isMainEvent && (
                  <div className="bg-maroon-royal text-gold-champagne py-2 px-6 text-center border-b border-gold-rich">
                    <span className="text-xs sm:text-sm uppercase tracking-[0.25em] font-semibold flex items-center justify-center space-x-2">
                      <Sparkles className="w-4 h-4 text-gold-rich inline" />
                      <span>The Sacred Wedding Muhurtham — Main Event</span>
                      <Sparkles className="w-4 h-4 text-gold-rich inline" />
                    </span>
                  </div>
                )}

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
                  {/* Event Visual / Image */}
                  <div className="lg:col-span-5 relative min-h-[260px] sm:min-h-[340px] overflow-hidden group">
                    <img
                      src={event.image}
                      alt={event.title}
                      loading="lazy"
                      className="w-full h-full object-cover object-top transform group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-stone-900/60 via-stone-900/10 to-transparent" />

                    {/* Event Sequence Badge */}
                    <div className="absolute top-4 left-4 bg-cream-light/95 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-gold-rich/50 shadow-sm">
                      <span className="font-serif text-sm font-bold text-maroon-royal">
                        Event {event.number}
                      </span>
                    </div>

                    {/* Attire recommendation tag */}
                    {event.attire && (
                      <div className="absolute bottom-4 left-4 right-4 bg-stone-900/80 backdrop-blur-sm p-2.5 rounded-xl border border-stone-700/60 text-left">
                        <span className="text-[10px] uppercase tracking-wider text-gold-champagne font-semibold block">
                          Suggested Attire
                        </span>
                        <span className="text-xs text-stone-200 line-clamp-1">
                          {event.attire}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Event Details Content */}
                  <div className="lg:col-span-7 p-6 sm:p-8 md:p-10 flex flex-col justify-between">
                    <div>
                      {/* Event Badge & Title */}
                      <div className="flex flex-wrap items-center gap-2 mb-3">
                        <span className={`text-[11px] font-semibold tracking-wider uppercase px-3 py-1 rounded-full border ${event.badgeColor}`}>
                          {event.badgeText}
                        </span>
                      </div>

                      <h3 className="font-serif text-3xl sm:text-4xl font-bold text-maroon-royal mb-1">
                        {event.title}
                      </h3>
                      <p className="font-serif italic text-gold-deep text-lg mb-4">
                        {event.subTitle}
                      </p>

                      <p className="text-stone-600 text-sm sm:text-base leading-relaxed mb-6 font-light">
                        {event.description}
                      </p>

                      {/* Date, Time & Venue Specs */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-4 border-y border-gold-200/60 mb-6 bg-gold-50/30 rounded-xl px-4">
                        <div className="flex items-start space-x-3">
                          <div className="p-2 rounded-lg bg-gold-100 text-maroon-royal mt-0.5">
                            <Calendar className="w-4 h-4 text-gold-deep" />
                          </div>
                          <div>
                            <span className="text-[11px] uppercase tracking-wider text-stone-500 font-semibold block">
                              Date &amp; Day
                            </span>
                            <span className="text-sm font-medium text-stone-900">
                              {event.dateLabel}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-start space-x-3">
                          <div className="p-2 rounded-lg bg-gold-100 text-maroon-royal mt-0.5">
                            <Clock className="w-4 h-4 text-gold-deep" />
                          </div>
                          <div>
                            <span className="text-[11px] uppercase tracking-wider text-stone-500 font-semibold block">
                              Time (Central Time)
                            </span>
                            <span className="text-sm font-medium text-stone-900 block">
                              {event.time}
                            </span>
                            {event.scheduleNote && (
                              <span className="text-[11px] text-maroon-800 font-medium block mt-0.5">
                                {event.scheduleNote}
                              </span>
                            )}
                          </div>
                        </div>

                        <div className="sm:col-span-2 flex items-start space-x-3 pt-2">
                          <div className="p-2 rounded-lg bg-gold-100 text-maroon-royal mt-0.5">
                            <MapPin className="w-4 h-4 text-gold-deep" />
                          </div>
                          <div>
                            <span className="text-[11px] uppercase tracking-wider text-stone-500 font-semibold block">
                              Venue &amp; Location
                            </span>
                            <span className="text-sm font-semibold text-stone-900 block">
                              {event.venue}
                            </span>
                            <span className="text-xs text-stone-600">
                              {event.address}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons: Directions, RSVP, Calendar */}
                    <div className="flex flex-wrap items-center gap-3 pt-2">
                      {/* 1. Get Directions */}
                      <a
                        href={event.mapsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center space-x-1.5 px-4 py-2.5 rounded-full border border-stone-300 hover:border-gold-rich bg-white hover:bg-gold-50 text-stone-800 text-xs font-semibold tracking-wider uppercase transition-all shadow-xs"
                      >
                        <MapPin className="w-3.5 h-3.5 text-maroon-royal" />
                        <span>Get Directions</span>
                        <ExternalLink className="w-3 h-3 text-stone-400" />
                      </a>

                      {/* 2. RSVP for This Event */}
                      <button
                        type="button"
                        onClick={() => handleRsvpClick(event.id)}
                        className="inline-flex items-center space-x-1.5 px-5 py-2.5 rounded-full bg-maroon-royal hover:bg-maroon-800 text-ivory-50 text-xs font-semibold tracking-wider uppercase transition-all shadow-xs hover:shadow-md border border-gold-rich/30"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5 text-gold-champagne" />
                        <span>RSVP for This Event</span>
                      </button>

                      {/* 3. Add to Calendar Dropdown */}
                      <div className="relative inline-block text-left">
                        <button
                          type="button"
                          onClick={() => setActiveCalendarMenu(isCalendarOpen ? null : event.id)}
                          className="inline-flex items-center space-x-1.5 px-4 py-2.5 rounded-full border border-gold-300 bg-gold-50/80 hover:bg-gold-100 text-stone-800 text-xs font-semibold tracking-wider uppercase transition-all shadow-xs"
                          aria-expanded={isCalendarOpen}
                        >
                          <CalendarPlus className="w-3.5 h-3.5 text-gold-deep" />
                          <span>Add to Calendar</span>
                        </button>

                        {isCalendarOpen && (
                          <div className="absolute right-0 bottom-full mb-2 w-52 rounded-xl bg-white shadow-xl border border-gold-200 py-1.5 z-20">
                            <a
                              href={createGoogleCalendarUrl(event, couple.fullName)}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={() => setActiveCalendarMenu(null)}
                              className="flex items-center space-x-2 px-4 py-2.5 text-xs text-stone-700 hover:bg-gold-50 hover:text-maroon-royal transition-colors"
                            >
                              <ExternalLink className="w-3.5 h-3.5 text-gold-rich" />
                              <span>Google Calendar</span>
                            </a>
                            <button
                              type="button"
                              onClick={() => {
                                downloadIcsFile(event, couple.fullName);
                                setActiveCalendarMenu(null);
                              }}
                              className="w-full text-left flex items-center space-x-2 px-4 py-2.5 text-xs text-stone-700 hover:bg-gold-50 hover:text-maroon-royal transition-colors border-t border-stone-100"
                            >
                              <Download className="w-3.5 h-3.5 text-gold-rich" />
                              <span>Apple / Outlook (.ics)</span>
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
