import React from 'react';
import { Sparkles } from 'lucide-react';
import { weddingConfig } from '../config/weddingConfig';

export function Welcome() {
  const { welcome, couple } = weddingConfig;

  return (
    <section id="welcome" className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 bg-ambient-temple relative">
      <div className="max-w-6xl mx-auto">
        {/* Feathered Royal Background Welcome Card */}
        <div className="relative rounded-3xl p-6 sm:p-10 lg:p-12 overflow-hidden bg-gradient-to-br from-[#1C0508]/85 via-[#26080D]/80 to-[#180406]/90 backdrop-blur-md border border-brass/35 shadow-[0_0_50px_15px_rgba(18,3,6,0.65),0_20px_50px_rgba(10,2,4,0.75)] transition-all duration-500">
          {/* Soft inner radial vignette feathering */}
          <div className="absolute inset-0 bg-radial from-transparent via-[#1A0407]/15 to-[#120204]/50 pointer-events-none rounded-3xl" />

          {/* Ornamental Indian corner flourishes */}
          <div className="corner-ornament corner-tl" />
          <div className="corner-ornament corner-tr" />
          <div className="corner-ornament corner-bl" />
          <div className="corner-ornament corner-br" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center relative z-10">
            {/* Couple Grand Portrait with Temple Arch Frame */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative group max-w-sm w-full">
                {/* Ornate Brass Frame with Arch Top */}
                <div className="relative rounded-t-[140px] rounded-b-2xl overflow-hidden border-2 border-brass/80 p-2.5 bg-gradient-to-b from-brass-soft via-brass to-brass-deep shadow-[0_15px_35px_rgba(20,3,5,0.6)]">
                  <div className="rounded-t-[132px] rounded-b-xl overflow-hidden aspect-[3/4] relative bg-stone-900">
                    <img
                      src="/images/couple_festive_home.jpg?v=3"
                      alt={`${couple.fullName} Wedding Portrait`}
                      loading="lazy"
                      className="w-full h-full object-cover object-top transform group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-maroon-deep/60 via-transparent to-maroon-deep/10 pointer-events-none" />
                  </div>
                </div>

                {/* Floating Brass Monogram Badge */}
                <div className="absolute -bottom-3.5 left-1/2 -translate-x-1/2 bg-[#160305]/95 backdrop-blur-md px-5 py-1.5 rounded-full border border-brass/80 shadow-md whitespace-nowrap z-10">
                  <span className="font-serif text-xs uppercase tracking-[0.25em] font-bold text-[#FFD77D]">
                    Yaswanth &amp; Mrudula
                  </span>
                </div>
              </div>
            </div>

            {/* Welcome Text Content in Radiant Gold & Warm Ivory */}
            <div className="lg:col-span-7 text-center lg:text-left pt-6 lg:pt-0">
              {/* Central Top Motif */}
              <div className="flex justify-center lg:justify-start mb-4">
                <div className="w-10 h-10 rounded-full border border-brass/50 flex items-center justify-center bg-[#24060A]/85 shadow-xs">
                  <Sparkles className="w-5 h-5 text-[#FFD77D]" />
                </div>
              </div>

              <span className="text-xs uppercase tracking-[0.3em] text-[#FFD77D] font-semibold block mb-2 drop-shadow-[0_1px_4px_rgba(0,0,0,0.8)]">
                {welcome.subtitle}
              </span>

              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold mb-4 leading-tight text-transparent bg-clip-text bg-gradient-to-b from-[#FFFDF0] via-[#FFD77D] to-[#D49E35] filter drop-shadow-[0_2px_10px_rgba(0,0,0,0.85)]">
                {welcome.title}
              </h2>

              <div className="w-20 h-0.5 bg-gradient-to-r from-transparent via-brass to-transparent mb-6 mx-auto lg:mx-0" />

              {/* Exact Welcome Message with Elegant Line Breaks */}
              <div className="space-y-4 font-sans text-base sm:text-lg leading-relaxed">
                <p className="italic font-serif text-[#FFE29A] text-lg sm:text-xl md:text-2xl leading-relaxed drop-shadow-[0_1px_4px_rgba(0,0,0,0.8)]">
                  "With the blessings of our families and the love of those closest to our hearts, we invite you to join us as we begin our journey together."
                </p>
                <p className="text-[#FFF6D8]/90 leading-relaxed font-light text-sm sm:text-base drop-shadow-[0_1px_4px_rgba(0,0,0,0.7)]">
From joyful celebrations to beautiful moments shared with our loved ones, we would be delighted to have you join us and be part of our special day.                </p>
                <p className="font-medium text-[#FFCF5C] tracking-wide text-sm sm:text-base drop-shadow-[0_1px_4px_rgba(0,0,0,0.7)]">
                </p>
              </div>

              {/* Couple's Calligraphy Signature */}
              <div className="mt-8 pt-6 border-t border-brass/30 flex flex-col items-center lg:items-start">
                <div className="font-script text-3xl sm:text-4xl text-[#FFD77D] drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
                  Yaswanth &amp; Mrudula
                </div>
                <div className="flex items-center space-x-2 mt-2 text-xs uppercase tracking-widest text-[#FFF6D8]/75">
                  <span>Sahvana Ranch</span>
                  <span className="text-brass">•</span>
                  <span>Lotus Spring Ranch</span>
                  <span className="text-brass">•</span>
                  <span>Texas</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
