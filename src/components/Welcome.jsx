import React from 'react';
import { Sparkles } from 'lucide-react';
import { weddingConfig } from '../config/weddingConfig';

export function Welcome() {
  const { welcome, couple } = weddingConfig;

  return (
    <section id="welcome" className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 bg-ivory-100/70 relative">
      <div className="max-w-6xl mx-auto">
        {/* Luxury Framed Card */}
        <div className="luxury-border-card rounded-3xl p-6 sm:p-10 lg:p-12 relative overflow-hidden bg-cream-light shadow-luxury">
          {/* Ornamental Indian corner flourishes */}
          <div className="corner-ornament corner-tl" />
          <div className="corner-ornament corner-tr" />
          <div className="corner-ornament corner-bl" />
          <div className="corner-ornament corner-br" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Couple Grand Portrait with Royal Arch Frame */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative group max-w-sm w-full">
                {/* Ornate Gold Frame with Arch Top */}
                <div className="relative rounded-t-[140px] rounded-b-2xl overflow-hidden border-2 border-gold-rich p-1.5 bg-gradient-to-b from-gold-100 via-gold-rich/30 to-gold-200 shadow-2xl">
                  <div className="rounded-t-[132px] rounded-b-xl overflow-hidden aspect-[3/4] relative bg-stone-100">
                    <img
                      src="/images/couple_traditional_portrait.jpg"
                      alt={`${couple.fullName} Wedding Portrait`}
                      loading="lazy"
                      className="w-full h-full object-cover object-top transform group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-maroon-950/40 via-transparent to-transparent pointer-events-none" />
                  </div>
                </div>

                {/* Floating Gold Monogram Badge */}
                <div className="absolute -bottom-3.5 left-1/2 -translate-x-1/2 bg-cream-light/95 backdrop-blur-md px-5 py-1.5 rounded-full border border-gold-rich shadow-md whitespace-nowrap z-10">
                  <span className="font-serif text-xs uppercase tracking-[0.25em] font-bold text-maroon-royal">
                    Yaswanth &amp; Lakshmi Mrudula
                  </span>
                </div>
              </div>
            </div>

            {/* Welcome Text Content */}
            <div className="lg:col-span-7 text-center lg:text-left pt-6 lg:pt-0">
              {/* Central Top Motif */}
              <div className="flex justify-center lg:justify-start mb-4">
                <div className="w-10 h-10 rounded-full border border-gold-300 flex items-center justify-center bg-gold-50 shadow-xs">
                  <Sparkles className="w-5 h-5 text-gold-rich" />
                </div>
              </div>

              <span className="text-xs uppercase tracking-[0.3em] text-gold-deep font-semibold block mb-2">
                {welcome.subtitle}
              </span>

              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-maroon-royal mb-4 leading-tight">
                {welcome.title}
              </h2>

              <div className="w-20 h-0.5 bg-gold-rich mb-6 mx-auto lg:mx-0" />

              {/* Exact Required Welcome Message with Elegant Line Breaks */}
              <div className="space-y-4 text-stone-700 font-sans text-base sm:text-lg leading-relaxed">
                <p className="italic font-serif text-stone-800 text-lg sm:text-xl md:text-2xl leading-relaxed">
                  "With the blessings of our families and the love of those closest to our hearts, we invite you to join us as we begin our journey together."
                </p>
                <p className="text-stone-600 leading-relaxed font-light text-sm sm:text-base">
                  From joyful celebrations and cherished traditions to the moment we say 'I do,' we would be delighted to have you with us for these special days.
                </p>
                <p className="font-medium text-maroon-800 tracking-wide text-sm sm:text-base">
                  Your presence will make our celebration even more meaningful.
                </p>
              </div>

              {/* Couple's Monogram Signature */}
              <div className="mt-8 pt-6 border-t border-gold-200/70 flex flex-col items-center lg:items-start">
                <div className="font-script text-3xl sm:text-4xl text-gold-deep">
                  Yaswanth &amp; Lakshmi Mrudula
                </div>
                <div className="flex items-center space-x-2 mt-2 text-xs uppercase tracking-widest text-stone-500">
                  <span>Sahvana Ranch</span>
                  <span className="text-gold-rich">•</span>
                  <span>Lotus Spring Ranch</span>
                  <span className="text-gold-rich">•</span>
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
