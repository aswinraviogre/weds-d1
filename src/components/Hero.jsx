import React from 'react';
import { Calendar, MapPin, Sparkles, ChevronDown } from 'lucide-react';
import { weddingConfig } from '../config/weddingConfig';
import { Countdown } from './Countdown';

export function Hero() {
  const { couple, hero } = weddingConfig;

  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col items-center justify-center pt-24 pb-16 px-4 sm:px-6 lg:px-8 text-center overflow-hidden bg-gradient-to-b from-ivory-100 via-cream-light to-ivory-50"
    >
      {/* Decorative Traditional Indian Floral Background Motifs */}
      <div className="absolute top-0 left-0 w-64 h-64 opacity-20 pointer-events-none -translate-x-12 -translate-y-12">
        <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full text-gold-rich">
          <circle cx="100" cy="100" r="80" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" />
          <path d="M100 20 C120 60 160 80 180 100 C160 120 120 140 100 180 C80 140 40 120 20 100 C40 80 80 60 100 20 Z" fill="currentColor" fillOpacity="0.1" stroke="currentColor" strokeWidth="1" />
          <circle cx="100" cy="100" r="40" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      </div>

      <div className="absolute top-0 right-0 w-64 h-64 opacity-20 pointer-events-none translate-x-12 -translate-y-12">
        <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full text-gold-rich">
          <circle cx="100" cy="100" r="80" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" />
          <path d="M100 20 C120 60 160 80 180 100 C160 120 120 140 100 180 C80 140 40 120 20 100 C40 80 80 60 100 20 Z" fill="currentColor" fillOpacity="0.1" stroke="currentColor" strokeWidth="1" />
          <circle cx="100" cy="100" r="40" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      </div>

      {/* Main Luxury Hero Frame */}
      <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center">
        {/* Auspicious Vedic Sanskrit Blessing */}
        <div className="inline-flex items-center space-x-2 px-4 py-1 rounded-full bg-gold-50 border border-gold-200 mb-6">
          <span className="text-xs font-serif italic text-gold-deep tracking-wider">
            || श्री गणेशाय नमः ||
          </span>
        </div>

        {/* Salutation */}
        <p className="font-serif text-lg sm:text-xl md:text-2xl text-stone-600 tracking-widest uppercase mb-3">
          {hero.salutation}
        </p>

        {/* Couple's Names - Primary Visual Focus */}
        <div className="my-3 sm:my-5 flex flex-col items-center max-w-full px-2">
          <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-semibold text-maroon-royal tracking-tight leading-tight text-center">
            Yaswanth Sai
          </h1>
          <div className="flex items-center justify-center my-1 sm:my-2">
            <span className="w-8 sm:w-16 h-[1px] bg-gold-champagne mr-3 sm:mr-4" />
            <span className="font-script text-3xl sm:text-4xl md:text-5xl text-gold-rich font-normal">
              &amp;
            </span>
            <span className="w-8 sm:w-16 h-[1px] bg-gold-champagne ml-3 sm:ml-4" />
          </div>
          <h2 className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-semibold text-maroon-royal tracking-tight leading-tight text-center">
            Lakshmi Mrudula
          </h2>
        </div>

        {/* Invitation Callout */}
        <p className="text-xs sm:text-sm md:text-base font-semibold tracking-[0.25em] uppercase text-gold-deep mt-6 mb-4 max-w-xl">
          {hero.subSalutation}
        </p>

        {/* Date and Location Badges */}
        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-8 my-3 text-stone-700 text-sm sm:text-base font-medium">
          <div className="inline-flex items-center space-x-2 bg-cream-light/80 px-4 py-1.5 rounded-full border border-gold-200 shadow-xs">
            <Calendar className="w-4 h-4 text-gold-deep" />
            <span>{hero.dates}</span>
          </div>
          <div className="inline-flex items-center space-x-2 bg-cream-light/80 px-4 py-1.5 rounded-full border border-gold-200 shadow-xs">
            <MapPin className="w-4 h-4 text-gold-deep" />
            <span>{hero.location}</span>
          </div>
        </div>

        {/* Tagline */}
        <p className="font-serif italic text-lg sm:text-xl text-stone-600 mt-2 mb-8 tracking-wide">
          {hero.tagline}
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full max-w-md mb-12">
          <a
            href="#celebrations"
            className="w-full sm:w-auto px-8 py-3.5 rounded-full border border-gold-rich bg-transparent hover:bg-gold-50 text-stone-800 text-xs sm:text-sm uppercase tracking-widest font-semibold transition-all duration-300 shadow-xs hover:shadow-md"
          >
            EXPLORE CELEBRATIONS
          </a>
          <a
            href="#rsvp"
            className="w-full sm:w-auto px-9 py-3.5 rounded-full bg-maroon-royal hover:bg-maroon-800 text-ivory-50 text-xs sm:text-sm uppercase tracking-widest font-semibold transition-all duration-300 shadow-luxury hover:shadow-luxury-hover border border-gold-rich/40 transform hover:-translate-y-0.5"
          >
            RSVP NOW
          </a>
        </div>

        {/* Live Countdown Clock */}
        <div className="w-full mt-2">
          <Countdown />
        </div>
      </div>

      {/* Down Scroll Indicator */}
      <div className="mt-12 text-stone-400 hover:text-gold-deep transition-colors">
        <a href="#welcome" aria-label="Scroll to welcome message" className="inline-flex flex-col items-center">
          <span className="text-[10px] uppercase tracking-widest text-stone-400 mb-1">Scroll</span>
          <ChevronDown className="w-5 h-5 animate-bounce text-gold-rich" />
        </a>
      </div>
    </section>
  );
}
