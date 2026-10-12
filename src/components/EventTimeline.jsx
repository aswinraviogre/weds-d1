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
    <section id="celebrations" className="py-24 px-4 sm:px-6 lg:px-8 bg-ambient-temple relative">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center space-x-2 px-5 py-1.5 rounded-full bg-maroon-night/90 border border-brass/55 text-brass-soft text-xs font-semibold uppercase tracking-[0.25em] mb-4 shadow-sm backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-brass" />
            <span>Five Auspicious Celebrations</span>
            <Sparkles className="w-3.5 h-3.5 text-brass" />
          </div>
          <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-4 text-transparent bg-clip-text bg-gradient-to-b from-[#FFFDF0] via-[#FFD77D] to-[#D49E35] filter drop-shadow-[0_4px_16px_rgba(0,0,0,0.9)]">
            Wedding Celebrations
          </h2>
          <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-brass to-transparent mx-auto mb-6" />
          <p className="text-paper/95 text-base sm:text-lg font-light leading-relaxed drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
            We are honored to celebrate each sacred rite and joyous celebration with our cherished family and friends.
            Please join us for these auspicious moments in Texas.
          </p>
        </div>

        {/* 5 Celebration Event Cards with Themed Illustrations */}
        <div className="space-y-12 sm:space-y-16">
          {events.map((event) => {
            const isMainEvent = event.isMainEvent;
            const isCalendarOpen = activeCalendarMenu === event.id;

            return (
              <div
                key={event.id}
                id={`event-${event.id}`}
                className={`relative rounded-3xl overflow-hidden transition-all duration-500 border border-brass/30 bg-gradient-to-br from-[#1C0508]/80 via-[#26080D]/75 to-[#160305]/85 backdrop-blur-md shadow-[0_0_50px_15px_rgba(18,3,6,0.6),0_20px_50px_rgba(10,2,4,0.75)] hover:shadow-[0_0_60px_20px_rgba(201,146,47,0.2),0_25px_60px_rgba(10,2,4,0.9)] hover:border-brass/50 ${
                  isMainEvent ? 'ring-2 ring-brass/80 shadow-[0_0_60px_20px_rgba(201,146,47,0.25)]' : ''
                }`}
              >
                {/* Soft inner radial vignette feathering */}
                <div className="absolute inset-0 bg-radial from-transparent via-[#180406]/15 to-[#100204]/45 pointer-events-none rounded-3xl" />

                {/* Main event special header ribbon */}
                {isMainEvent && (
                  <div className="relative z-10 bg-gradient-to-r from-maroon-deep via-maroon-temple to-maroon-deep text-brass-glow py-2.5 px-6 text-center border-b border-brass/40 flex items-center justify-center space-x-2 shadow-sm">
                    <Sparkles className="w-4 h-4 text-brass inline" />
                    <span className="text-xs sm:text-sm uppercase tracking-[0.25em] font-serif font-bold text-[#FFD77D]">
                      The Sacred Wedding Muhurtham — Main Event
                    </span>
                    <Sparkles className="w-4 h-4 text-brass inline" />
                  </div>
                )}

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 relative z-10">
                  {/* Event Themed Artwork */}
                  <div className="lg:col-span-5 relative min-h-[260px] sm:min-h-[340px] overflow-hidden group">
                    <img
                      src={event.image}
                      alt={event.title}
                      loading="lazy"
                      className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-maroon-deep/75 via-maroon-deep/20 to-transparent" />
                    {/* Soft wide horizontal gradient bleed into content card on large screens */}
                    <div className="hidden lg:block absolute inset-y-0 right-0 w-28 bg-gradient-to-r from-transparent via-[#1C0508]/65 to-[#1C0508] pointer-events-none z-10" />
                    {/* Soft wide vertical gradient bleed into content card on mobile */}
                    <div className="lg:hidden absolute inset-x-0 bottom-0 h-24 bg-gradient-to-b from-transparent via-[#1C0508]/65 to-[#1C0508] pointer-events-none z-10" />

                    {/* Event Sequence Badge */}
                    <div className="absolute top-4 left-4 bg-[#140305]/95 backdrop-blur-md px-4 py-1 rounded-full border border-brass/80 shadow-md z-20">
                      <span className="font-serif text-xs font-bold text-[#FFD77D] tracking-wider uppercase">
                        Event {event.number}
                      </span>
                    </div>

                    {/* Attire recommendation tag - fully visible on all events */}
                    {event.attire && (
                      <div className="absolute bottom-4 left-4 right-4 bg-[#140305]/95 backdrop-blur-md p-3.5 rounded-xl border border-brass/70 shadow-[0_4px_16px_rgba(0,0,0,0.85)] text-left z-20">
                        <span className="text-[10px] uppercase tracking-widest text-[#FFD77D] font-bold block mb-1">
                          Suggested Attire
                        </span>
                        <span className="text-xs text-[#FFFDF8] font-medium leading-relaxed block">
                          {event.attire}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Event Details Content - Feathered into background with 100% visible text */}
                  <div className="lg:col-span-7 p-6 sm:p-8 md:p-10 flex flex-col justify-between bg-transparent text-[#FFF6D8]">
                    <div>
                      {/* Event Badge & Title */}
                      <div className="flex flex-wrap items-center gap-2 mb-3">
                        <span className={`text-[11px] font-semibold tracking-wider uppercase px-3.5 py-1 rounded-full border shadow-xs ${
                          event.themeAccent === 'emerald'
                            ? 'bg-emerald-950/85 text-emerald-300 border-emerald-500/50'
                            : event.themeAccent === 'indigo'
                            ? 'bg-indigo-950/85 text-indigo-300 border-indigo-500/50'
                            : event.themeAccent === 'amber'
                            ? 'bg-amber-950/85 text-amber-300 border-amber-500/50'
                            : event.themeAccent === 'orange'
                            ? 'bg-orange-950/85 text-orange-300 border-orange-500/50'
                            : 'bg-maroon-900/90 text-[#FFD77D] border-brass/60'
                        }`}>
                          {event.badgeText}
                        </span>
                      </div>

                      <h3 className="font-serif text-3xl sm:text-4xl font-bold mb-1 text-transparent bg-clip-text bg-gradient-to-b from-[#FFFDF0] via-[#FFD77D] to-[#D49E35] filter drop-shadow-[0_2px_8px_rgba(0,0,0,0.85)]">
                        {event.title}
                      </h3>
                      <p className="font-serif italic text-[#FFCF5C] text-lg mb-4 drop-shadow-[0_1px_4px_rgba(0,0,0,0.7)]">
                        {event.subTitle}
                      </p>

                      <p className="text-[#FFF6D8]/90 text-sm sm:text-base leading-relaxed mb-6 font-light drop-shadow-[0_1px_4px_rgba(0,0,0,0.7)]">
                        {event.description}
                      </p>

                      {/* Date, Time & Venue Specs */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-4 border border-brass/35 mb-6 bg-[#130305]/75 rounded-2xl p-4 shadow-inner backdrop-blur-sm">
                        <div className="flex items-start space-x-3">
                          <div className="p-2 rounded-xl bg-[#2A080C] border border-brass/60 text-[#FFD77D] mt-0.5 shadow-xs">
                            <Calendar className="w-4 h-4 text-[#FFD77D]" />
                          </div>
                          <div>
                            <span className="text-[11px] uppercase tracking-wider text-[#E8BD6D] font-semibold block">
                              Date &amp; Day
                            </span>
                            <span className="text-sm font-bold text-[#FFFDF8]">
                              {event.dateLabel}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-start space-x-3">
                          <div className="p-2 rounded-xl bg-[#2A080C] border border-brass/60 text-[#FFD77D] mt-0.5 shadow-xs">
                            <Clock className="w-4 h-4 text-[#FFD77D]" />
                          </div>
                          <div>
                            <span className="text-[11px] uppercase tracking-wider text-[#E8BD6D] font-semibold block">
                              Time (Central Time)
                            </span>
                            <span className="text-sm font-bold text-[#FFFDF8] block">
                              {event.time}
                            </span>
                            {event.scheduleNote && (
                              <span className="text-[11px] text-[#FFCF5C] font-medium block mt-0.5">
                                {event.scheduleNote}
                              </span>
                            )}
                          </div>
                        </div>

                        <div className="sm:col-span-2 flex items-start space-x-3 pt-2 border-t border-brass/25">
                          <div className="p-2 rounded-xl bg-[#2A080C] border border-brass/60 text-[#FFD77D] mt-0.5 shadow-xs">
                            <MapPin className="w-4 h-4 text-[#FFD77D]" />
                          </div>
                          <div>
                            <span className="text-[11px] uppercase tracking-wider text-[#E8BD6D] font-semibold block">
                              Venue &amp; Location
                            </span>
                            <span className="text-sm font-bold text-[#FFFDF8] block">
                              {event.venue}
                            </span>
                            <span className="text-xs text-[#FFF6D8]/80 block mt-0.5">
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
                        className="inline-flex items-center space-x-1.5 px-4 py-2.5 rounded-full border border-brass/60 hover:border-brass bg-[#160305]/90 hover:bg-brass/20 text-[#FFF6D8] text-xs font-semibold tracking-wider uppercase transition-all shadow-sm cursor-pointer"
                      >
                        <MapPin className="w-3.5 h-3.5 text-[#FFD77D]" />
                        <span>Get Directions</span>
                        <ExternalLink className="w-3 h-3 text-[#FFF6D8]/60" />
                      </a>

                      {/* 2. RSVP for This Event */}
                      <button
                        type="button"
                        onClick={() => handleRsvpClick(event.id)}
                        className="inline-flex items-center space-x-1.5 px-5 py-2.5 rounded-full bg-gradient-to-r from-maroon-temple via-[#912433] to-maroon-temple hover:from-maroon-royal hover:to-maroon-deep text-[#FFFDF8] text-xs font-bold tracking-wider uppercase transition-all shadow-md hover:shadow-luxury-hover border border-brass/70 cursor-pointer"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5 text-brass-glow" />
                        <span>RSVP for This Event</span>
                      </button>

                      {/* 3. Add to Calendar Dropdown */}
                      <div className="relative inline-block text-left">
                        <button
                          type="button"
                          onClick={() => setActiveCalendarMenu(isCalendarOpen ? null : event.id)}
                          className="inline-flex items-center space-x-1.5 px-4 py-2.5 rounded-full border border-brass/60 bg-[#160305]/90 hover:bg-brass/20 text-[#FFF6D8] text-xs font-semibold tracking-wider uppercase transition-all shadow-sm cursor-pointer"
                          aria-expanded={isCalendarOpen}
                        >
                          <CalendarPlus className="w-3.5 h-3.5 text-[#FFD77D]" />
                          <span>Add to Calendar</span>
                        </button>

                        {isCalendarOpen && (
                          <div className="absolute right-0 bottom-full mb-2 w-52 rounded-2xl bg-[#160305] text-[#FFF6D8] shadow-[0_15px_35px_rgba(0,0,0,0.85)] border border-brass/60 py-2 z-30">
                            <a
                              href={createGoogleCalendarUrl(event, couple.fullName)}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={() => setActiveCalendarMenu(null)}
                              className="flex items-center space-x-2 px-4 py-2.5 text-xs text-[#FFF6D8] hover:bg-brass/20 transition-colors"
                            >
                              <ExternalLink className="w-3.5 h-3.5 text-[#FFD77D]" />
                              <span>Google Calendar</span>
                            </a>
                            <button
                              type="button"
                              onClick={() => {
                                downloadIcsFile(event, couple.fullName);
                                setActiveCalendarMenu(null);
                              }}
                              className="w-full text-left flex items-center space-x-2 px-4 py-2.5 text-xs text-[#FFF6D8] hover:bg-brass/20 transition-colors border-t border-brass/20 cursor-pointer"
                            >
                              <Download className="w-3.5 h-3.5 text-[#FFD77D]" />
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
