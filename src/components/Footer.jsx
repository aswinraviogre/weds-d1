import React from 'react';
import { Heart } from 'lucide-react';
import { weddingConfig } from '../config/weddingConfig';

export function Footer() {
  const { footer, couple } = weddingConfig;

  return (
    <footer className="bg-[#180406]/95 backdrop-blur-md text-paper border-t border-brass/50 pt-16 pb-12 px-4 sm:px-6 lg:px-8 text-center relative overflow-hidden">
      {/* Decorative Gopuram Watermark in background */}
      <div className="absolute inset-0 opacity-5 pointer-events-none flex items-center justify-center">
        <img
          src="/images/gopuram.png"
          alt=""
          className="w-96 h-96 object-contain filter invert"
        />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center">
        {/* Couple's Monogram Royal Seal - Single-Line Non-Breaking Horizontal Layout */}
        <div className="inline-flex items-center justify-center px-6 py-2 rounded-full border border-brass/70 bg-gradient-to-r from-maroon-deep via-maroon-rich to-maroon-deep text-brass-glow mb-6 shadow-[0_10px_30px_rgba(0,0,0,0.8),0_0_20px_rgba(201,146,47,0.3)] whitespace-nowrap">
          <span className="font-serif text-2xl font-bold tracking-wider text-brass-glow">
            Y
          </span>
          <span className="font-pinyon text-2xl text-brass mx-2 select-none">
            &amp;
          </span>
          <span className="font-serif text-2xl font-bold tracking-wider text-brass-glow">
            M
          </span>
        </div>

        {/* Footer Couple Names */}
        <h3 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold mb-2 tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-[#FFFDF0] via-[#FFD77D] to-[#D49E35] filter drop-shadow-[0_4px_12px_rgba(0,0,0,0.9)]">
          {footer.line1}
        </h3>
        <p className="text-sm sm:text-base uppercase tracking-[0.25em] text-brass-soft font-semibold mb-4">
          {footer.line2}
        </p>

        <div className="w-20 h-0.5 bg-gradient-to-r from-transparent via-brass to-transparent mx-auto mb-6" />

        <p className="font-serif italic text-lg sm:text-xl text-paper/85 max-w-lg mb-8 font-light">
          "{footer.blessing}"
        </p>

        {/* Auspicious Vedic Blessing in English */}
        <p className="text-xs uppercase tracking-[0.2em] text-brass-soft/80 mb-8 font-serif">
          {footer.traditionText}
        </p>

        {/* Bottom copyright / venue credit */}
        <div className="pt-8 border-t border-brass/20 w-full text-xs text-paper/60 flex flex-col sm:flex-row items-center justify-between gap-3">
          <span>Sahvana Ranch (Gunter, TX) &amp; Lotus Spring Ranch (McKinney, TX)</span>
          <span className="flex items-center space-x-1">
            <span>Crafted with</span>
            <Heart className="w-3.5 h-3.5 text-brass fill-brass inline" />
            <span>for Yaswanth &amp; Mrudula</span>
          </span>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
