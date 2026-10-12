import React from 'react';

export function DivineBlessing() {
  return (
    <section
      id="divine-blessings"
      className="scroll-mt-24 py-8 sm:py-10 px-4 bg-ambient-temple flex flex-col items-center justify-center relative overflow-hidden"
    >
      {/* Subtle divine golden aura in background */}
      <div className="absolute w-48 sm:w-64 h-48 sm:h-64 rounded-full bg-brass/10 blur-[80px] pointer-events-none" />

      {/* Decorative top brass ornament separator */}
      <div className="flex items-center justify-center space-x-3 mb-4 w-full max-w-xs opacity-75 pointer-events-none">
        <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-brass to-brass-deep" />
        <div className="flex items-center space-x-1">
          <div className="w-1.5 h-1.5 rotate-45 bg-brass" />
          <div className="w-2 h-2 rotate-45 border border-brass bg-brass-soft" />
          <div className="w-1.5 h-1.5 rotate-45 bg-brass" />
        </div>
        <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent via-brass to-brass-deep" />
      </div>

      {/* Small Sacred Medallion / Logo Insert */}
      <div className="relative group flex flex-col items-center">
        {/* Soft hovering aura */}
        <div className="absolute -inset-2 rounded-full bg-brass-glow/20 blur-md opacity-70 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

        {/* Outer Carved Brass Ring Emblem */}
        <div className="relative w-20 h-20 sm:w-22 sm:h-22 rounded-full p-[3px] shadow-[0_10px_25px_rgba(0,0,0,0.7),0_0_20px_rgba(201,146,47,0.3)] transition-transform duration-500 group-hover:scale-105 bg-gradient-to-tr from-brass-deep via-brass-glow to-brass">
          {/* Inner Auspicious Maroon Velvet Ring */}
          <div className="w-full h-full rounded-full p-1 bg-gradient-to-b from-maroon-night to-maroon-deep flex items-center justify-center border border-brass/40 overflow-hidden">
            <img
              src="/images/divine_blessings.png"
              alt="Lord Shirdi Sai Baba Divine Blessings"
              loading="lazy"
              className="w-full h-full object-contain filter drop-shadow-[0_2px_6px_rgba(255,255,255,0.15)]"
            />
          </div>
        </div>

        {/* Sacred Caption in English */}
        <div className="mt-3 text-center">
          <p className="text-[11px] sm:text-xs font-serif text-brass-soft tracking-[0.25em] uppercase font-medium drop-shadow-[0_2px_8px_rgba(0,0,0,0.85)]">
            With the Divine Blessings of Lord Shirdi Sai Baba
          </p>
        </div>
      </div>

      {/* Decorative bottom brass ornament separator */}
      <div className="flex items-center justify-center space-x-3 mt-4 w-full max-w-xs opacity-75 pointer-events-none">
        <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-brass to-brass-deep" />
        <div className="flex items-center space-x-1">
          <div className="w-1.5 h-1.5 rotate-45 bg-brass" />
          <div className="w-2 h-2 rotate-45 border border-brass bg-brass-soft" />
          <div className="w-1.5 h-1.5 rotate-45 bg-brass" />
        </div>
        <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent via-brass to-brass-deep" />
      </div>
    </section>
  );
}

export default DivineBlessing;
