import React from 'react';
import { Heart, Sparkles } from 'lucide-react';
import { weddingConfig } from '../config/weddingConfig';

export function Footer() {
  const { footer, couple } = weddingConfig;

  return (
    <footer className="bg-maroon-royal text-ivory-50 border-t-2 border-gold-rich pt-16 pb-12 px-4 sm:px-6 lg:px-8 text-center relative overflow-hidden">
      {/* Decorative floral watermark */}
      <div className="absolute inset-0 opacity-5 pointer-events-none flex items-center justify-center">
        <svg viewBox="0 0 400 400" className="w-[600px] h-[600px] text-gold-rich" fill="currentColor">
          <circle cx="200" cy="200" r="150" />
        </svg>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center">
        {/* Couple's Monogram Emblem */}
        <div className="w-14 h-14 rounded-full border border-gold-rich flex items-center justify-center bg-maroon-800 text-gold-champagne mb-6 shadow-md">
          <span className="font-serif text-xl font-bold tracking-widest">
            {couple.monogram}
          </span>
        </div>

        {/* Exact Required Footer Text */}
        <h3 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-ivory-50 mb-2 tracking-tight">
          {footer.line1}
        </h3>
        <p className="text-sm sm:text-base uppercase tracking-[0.25em] text-gold-champagne font-semibold mb-4">
          {footer.line2}
        </p>

        <div className="w-20 h-0.5 bg-gold-rich mx-auto mb-6" />

        <p className="font-serif italic text-lg sm:text-xl text-stone-200 max-w-lg mb-8 font-light">
          "{footer.blessing}"
        </p>

        {/* Vedic Blessing */}
        <p className="text-xs uppercase tracking-[0.2em] text-gold-champagne/80 mb-8">
          {footer.traditionText}
        </p>

        {/* Bottom copyright / venue credit */}
        <div className="pt-8 border-t border-maroon-800/80 w-full text-xs text-stone-300 flex flex-col sm:flex-row items-center justify-between gap-3">
          <span>Sahvana Ranch (Gunter, TX) &amp; Lotus Spring Ranch (McKinney, TX)</span>
          <span className="flex items-center space-x-1">
            <span>Crafted with</span>
            <Heart className="w-3.5 h-3.5 text-gold-rich fill-gold-rich inline" />
            <span>for Yaswanth &amp; Lakshmi</span>
          </span>
        </div>
      </div>
    </footer>
  );
}
