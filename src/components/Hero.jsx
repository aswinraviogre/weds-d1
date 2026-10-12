import React from 'react';
import { Calendar, MapPin, Sparkles, ChevronDown } from 'lucide-react';
import { weddingConfig } from '../config/weddingConfig';
import { Countdown } from './Countdown';

export function Hero() {
  const { couple, hero } = weddingConfig;

  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col items-center justify-center pt-28 pb-20 px-4 sm:px-6 lg:px-8 text-center overflow-hidden bg-ambient-temple"
    >
      {/* Decorative Traditional Toran Strand across top */}
      <div className="absolute top-0 left-0 right-0 h-16 sm:h-24 pointer-events-none z-10 flex justify-between items-start opacity-75 overflow-hidden">
        <div className="w-1/2 h-full bg-repeat-x bg-top opacity-60" style={{ backgroundImage: "radial-gradient(circle, #C9922F 2px, transparent 2px)", backgroundSize: "24px 24px" }} />
        <div className="w-1/2 h-full bg-repeat-x bg-top opacity-60" style={{ backgroundImage: "radial-gradient(circle, #C9922F 2px, transparent 2px)", backgroundSize: "24px 24px" }} />
      </div>

      {/* Ambient Diya / Temple Lighting Glow Circles */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[350px] rounded-full bg-brass/10 blur-[140px]" />
        <div className="absolute bottom-1/3 left-1/4 w-80 h-80 rounded-full bg-maroon-temple/20 blur-[130px]" />
      </div>

      {/* Main Luxury Hero Frame */}
      <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center">
        {/* Auspicious Vedic Blessing in English */}
        <div className="inline-flex items-center space-x-2 px-5 py-1.5 rounded-full bg-maroon-night/90 border border-brass/55 mb-6 shadow-md backdrop-blur-md">
          <span className="w-1.5 h-1.5 rounded-full bg-brass-glow animate-ping" />
          <span className="text-xs font-serif text-brass-soft tracking-[0.25em] uppercase font-medium">
            ॥ Sri Ganeshaya Namaha ॥
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-brass-glow animate-ping" />
        </div>

        {/* Salutation */}
        <p className="font-serif text-base sm:text-lg md:text-xl text-paper tracking-[0.25em] uppercase mb-3 font-light drop-shadow-[0_2px_8px_rgba(0,0,0,0.85)]">
          {hero.salutation}
        </p>

        {/* Couple's Names - Primary Visual Focus in Radiant Royal Gold (Full Names on First Page) */}
        <div className="my-2 sm:my-4 flex flex-col items-center max-w-full px-2">
          <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-tight text-center text-transparent bg-clip-text bg-gradient-to-b from-[#FFFDF0] via-[#FFD77D] to-[#D49E35] filter drop-shadow-[0_4px_18px_rgba(0,0,0,0.95)] drop-shadow-[0_0_24px_rgba(201,146,47,0.45)]">
            {couple.groomFull || couple.groom}
          </h1>
          <div className="flex items-center justify-center my-1 sm:my-2">
            <span className="w-10 sm:w-20 h-[1.5px] bg-gradient-to-r from-transparent via-brass-glow to-brass mr-3 sm:mr-4" />
            <span className="font-pinyon text-3xl sm:text-4xl md:text-5xl text-[#FFD77D] filter drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)] font-normal">
              &amp;
            </span>
            <span className="w-10 sm:w-20 h-[1.5px] bg-gradient-to-l from-transparent via-brass-glow to-brass ml-3 sm:mr-4" />
          </div>
          <h2 className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-tight text-center text-transparent bg-clip-text bg-gradient-to-b from-[#FFFDF0] via-[#FFD77D] to-[#D49E35] filter drop-shadow-[0_4px_18px_rgba(0,0,0,0.95)] drop-shadow-[0_0_24px_rgba(201,146,47,0.45)]">
            {couple.brideFull || couple.bride}
          </h2>
        </div>

        {/* Invitation Callout */}
        <p className="text-xs sm:text-sm font-semibold tracking-[0.25em] uppercase text-brass-glow mt-5 mb-4 max-w-xl drop-shadow-[0_2px_8px_rgba(0,0,0,0.85)]">
          {hero.subSalutation}
        </p>

        {/* Date and Location Badges */}
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 my-3 text-paper text-xs sm:text-sm font-medium">
          <div className="inline-flex items-center space-x-2 bg-[#1C0508]/85 px-5 py-2.5 rounded-full border border-brass/55 shadow-[0_4px_16px_rgba(0,0,0,0.6)] backdrop-blur-md">
            <Calendar className="w-4 h-4 text-brass" />
            <span className="tracking-wide">{hero.dates}</span>
          </div>
          <div className="inline-flex items-center space-x-2 bg-[#1C0508]/85 px-5 py-2.5 rounded-full border border-brass/55 shadow-[0_4px_16px_rgba(0,0,0,0.6)] backdrop-blur-md">
            <MapPin className="w-4 h-4 text-brass" />
            <span className="tracking-wide">{hero.location}</span>
          </div>
        </div>

        {/* Tagline */}
        <p className="font-serif italic text-base sm:text-lg text-paper/95 mt-2 mb-8 tracking-wide font-light drop-shadow-[0_2px_8px_rgba(0,0,0,0.85)]">
          {hero.tagline}
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full max-w-md mb-12">
          <a
            href="#celebrations"
            className="w-full sm:w-auto px-8 py-3.5 rounded-full border border-brass/65 bg-[#1C0508]/85 hover:bg-brass/25 text-paper hover:text-white text-xs uppercase tracking-widest font-semibold transition-all duration-300 shadow-[0_4px_16px_rgba(0,0,0,0.5)] hover:shadow-md cursor-pointer backdrop-blur-md"
          >
            EXPLORE CELEBRATIONS
          </a>
          <a
            href="#rsvp"
            className="w-full sm:w-auto px-9 py-3.5 rounded-full bg-gradient-to-r from-maroon-temple via-[#8B202E] to-maroon-temple hover:from-maroon-royal hover:to-maroon-deep text-paper text-xs uppercase tracking-widest font-bold transition-all duration-300 shadow-[0_8px_25px_rgba(123,31,43,0.5)] hover:shadow-luxury-hover border border-brass/70 transform hover:-translate-y-0.5 cursor-pointer"
          >
            RSVP NOW
          </a>
        </div>

        {/* Live Countdown Clock */}
        <div className="w-full max-w-2xl px-2">
          <Countdown />
        </div>
      </div>

      {/* Down Chevron Indicator */}
      <a
        href="#divine-blessing"
        className="mt-14 inline-flex items-center justify-center text-brass-soft/70 hover:text-brass transition-colors animate-bounce cursor-pointer"
        aria-label="Scroll down to blessings"
      >
        <ChevronDown className="w-6 h-6" />
      </a>
    </section>
  );
}
