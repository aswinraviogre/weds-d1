import React, { useState, useRef } from 'react';
import { Sparkles, ChevronRight, ArrowRight } from 'lucide-react';
import confetti from 'canvas-confetti';
import { weddingConfig } from '../config/weddingConfig';

export function EnvelopeOpening({ isOpen, onComplete, onSkip }) {
  // animationStage: 'sealed' | 'opening' | 'revealed' | 'entering'
  const [animationStage, setAnimationStage] = useState('sealed');
  const { couple } = weddingConfig;
  const isEnteringRef = useRef(false);

  if (!isOpen) return null;

  const triggerEnterSite = () => {
    if (isEnteringRef.current) return;
    try {
      window.dispatchEvent(new CustomEvent('start-wedding-audio'));
    } catch (e) {}
    isEnteringRef.current = true;
    setAnimationStage('entering');
    setTimeout(() => {
      if (onComplete) onComplete();
    }, 600);
  };

  const handleOpenEnvelope = () => {
    try {
      window.dispatchEvent(new CustomEvent('start-wedding-audio'));
    } catch (e) {}
    if (animationStage !== 'sealed') {
      // If already opening/revealed, a tap enters immediately
      triggerEnterSite();
      return;
    }

    setAnimationStage('opening');

    // Royal celebratory confetti
    try {
      confetti({
        particleCount: 95,
        spread: 95,
        origin: { y: 0.5 },
        colors: ['#D4AF37', '#F5DEB3', '#5A1827', '#FAF6EB'],
      });
    } catch (e) {}

    // Step 1: Flap flips open and card glides up
    setTimeout(() => {
      setAnimationStage('revealed');
    }, 400);

    // Step 2: Smooth cinematic single-click auto-transition directly into website!
    // No second click needed — unseals, presents the invitation, and enters smoothly.
    setTimeout(() => {
      triggerEnterSite();
    }, 1500);
  };

  return (
    <div
      onClick={animationStage !== 'sealed' ? triggerEnterSite : undefined}
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-between py-5 px-4 sm:px-8 select-none overflow-y-auto transition-all duration-700 ${
        animationStage === 'entering' ? 'opacity-0 scale-105 pointer-events-none' : 'opacity-100 scale-100'
      }`}
      style={{
        background: 'radial-gradient(ellipse at 50% 35%, #2A0910 0%, #150307 60%, #0A0103 100%)',
      }}
    >
      {/* Subtle ambient lighting */}
      <div className="absolute inset-0 pointer-events-none opacity-30">
        <div className="absolute top-1/4 left-1/3 w-80 h-80 rounded-full bg-gold-rich/10 blur-[120px]" />
        <div className="absolute bottom-1/3 right-1/3 w-96 h-96 rounded-full bg-maroon-royal/20 blur-[130px]" />
      </div>

      {/* Top Bar: Hashtag and Skip Button */}
      <div className="w-full max-w-4xl flex items-center justify-between z-50 shrink-0">
        <span className="font-serif text-xs tracking-widest uppercase text-gold-champagne/80 font-semibold">
          {couple.hashtag}
        </span>

        <button
          onClick={() => {
            try {
              window.dispatchEvent(new CustomEvent('start-wedding-audio'));
            } catch (e) {}
            if (onSkip) onSkip();
          }}
          className="inline-flex items-center space-x-1.5 px-4 py-1.5 rounded-full border border-gold-rich/40 bg-black/40 hover:bg-gold-rich/20 text-gold-champagne hover:text-white text-xs uppercase tracking-widest font-semibold transition-all backdrop-blur-md shadow-md cursor-pointer"
        >
          <span>Skip to Website</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Main Envelope Stage */}
      <div
        className={`relative z-10 w-full max-w-[460px] sm:max-w-[490px] my-auto flex flex-col items-center envelope-stage-container ${
          animationStage === 'revealed' || animationStage === 'entering' ? 'translate-y-8 sm:translate-y-10' : 'translate-y-0'
        }`}
      >
        {/* Vedic Blessing Heading */}
        <div className="text-center mb-4 shrink-0">
          <div className="inline-block px-4 py-1 rounded-full bg-gold-950/70 border border-gold-rich/40 mb-1.5">
            <span className="text-xs font-serif italic text-gold-champagne tracking-widest">
              || श्री गणेशाय नमः ||
            </span>
          </div>
          <p className="text-[11px] uppercase tracking-[0.3em] text-gold-champagne/90 font-semibold">
            Royal Wedding Invitation
          </p>
        </div>

        {/* 3D Realistic Royal Wedding Envelope Container */}
        <div className="relative w-full aspect-[1.54] flex items-center justify-center perspective-envelope">
          {/* 1. Envelope Back Wall & Interior Lining */}
          <div
            className="absolute inset-0 rounded-2xl border-2 border-gold-rich/70 shadow-[0_25px_60px_rgba(0,0,0,0.85)] z-10 overflow-hidden"
            style={{
              background: 'linear-gradient(145deg, #3B0913 0%, #22030A 100%)',
            }}
          >
            {/* Interior gold damask liner (revealed inside the envelope throat when opened) */}
            <svg viewBox="0 0 500 324" className="w-full h-full" preserveAspectRatio="none">
              <defs>
                <pattern id="innerBackMandala" width="48" height="48" patternUnits="userSpaceOnUse">
                  <rect width="48" height="48" fill="#3B0913" />
                  <circle cx="24" cy="24" r="14" fill="none" stroke="#D4AF37" strokeWidth="0.75" opacity="0.4" />
                  <circle cx="24" cy="24" r="7" fill="none" stroke="#E5C992" strokeWidth="0.5" opacity="0.45" />
                  <path d="M24 10 C26 17 31 22 38 24 C31 26 26 31 24 38 C22 31 17 26 10 24 C17 22 22 17 24 10 Z" fill="#D4AF37" opacity="0.22" />
                  <circle cx="0" cy="0" r="10" fill="none" stroke="#D4AF37" strokeWidth="0.6" opacity="0.35" />
                  <circle cx="48" cy="0" r="10" fill="none" stroke="#D4AF37" strokeWidth="0.6" opacity="0.35" />
                  <circle cx="0" cy="48" r="10" fill="none" stroke="#D4AF37" strokeWidth="0.6" opacity="0.35" />
                  <circle cx="48" cy="48" r="10" fill="none" stroke="#D4AF37" strokeWidth="0.6" opacity="0.35" />
                </pattern>
              </defs>
              <rect
                x="0"
                y="0"
                width="500"
                height="175"
                fill="url(#innerBackMandala)"
                opacity={animationStage === 'sealed' ? '0' : '1'}
                className="transition-opacity duration-500"
              />
              <line
                x1="0"
                y1="175"
                x2="500"
                y2="175"
                stroke="#D4AF37"
                strokeWidth="1"
                opacity={animationStage === 'sealed' ? '0' : '0.5'}
                className="transition-opacity duration-500"
              />
            </svg>
            <div className="absolute inset-2 border border-gold-rich/30 rounded-xl pointer-events-none" />
          </div>

          {/* 2. The Royal Invitation Letter Card (Glides up out of the pocket) */}
          <div
            onClick={triggerEnterSite}
            className={`absolute inset-x-3.5 top-2.5 bottom-2.5 rounded-xl border-2 border-gold-rich p-4 sm:p-5 flex flex-col items-center justify-between text-center invitation-inner-card ${
              animationStage === 'revealed' || animationStage === 'entering'
                ? '-translate-y-[52%] opacity-100 scale-[1.02] shadow-[0_30px_70px_rgba(0,0,0,0.95),0_0_40px_rgba(212,175,55,0.35)] z-40 cursor-pointer'
                : 'translate-y-0 opacity-0 pointer-events-none z-15'
            }`}
            style={{
              background: 'linear-gradient(180deg, #FFFEFA 0%, #F9F5EA 100%)',
            }}
          >
            {/* Corner ornaments on card */}
            <div className="corner-ornament corner-tl" />
            <div className="corner-ornament corner-tr" />
            <div className="corner-ornament corner-bl" />
            <div className="corner-ornament corner-br" />

            {/* Inner subtle gold border */}
            <div className="absolute inset-2 border border-gold-champagne/40 rounded-lg pointer-events-none" />

            {/* Card Content */}
            <div className="pt-0.5 relative z-10">
              <span className="text-[10px] uppercase tracking-[0.25em] text-gold-deep font-semibold block mb-0.5">
                || श्री गणेशाय नमः ||
              </span>
              <p className="text-[10px] sm:text-xs uppercase tracking-[0.2em] text-stone-500 font-medium">
                Together with our families
              </p>
              <h2 className="font-serif text-xl sm:text-2xl md:text-3xl font-bold text-maroon-royal mt-1 leading-tight">
                Yaswanth Sai &amp; Lakshmi Mrudula
              </h2>
              <div className="w-12 h-0.5 bg-gold-rich mx-auto my-1.5" />
              <p className="font-serif italic text-stone-700 text-xs sm:text-sm">
                Joyfully invite you to celebrate their wedding
              </p>
            </div>

            {/* Date & Venue Box */}
            <div className="w-full py-2 px-3 rounded-xl bg-gold-50/80 border border-gold-200/90 my-1 text-center relative z-10 shadow-xs">
              <span className="text-xs font-serif font-bold text-maroon-royal block">
                November 19–21, 2026 • Texas, USA
              </span>
              <span className="text-[10.5px] text-stone-600 block mt-0.5 font-medium">
                Sahvana Ranch &amp; Lotus Spring Ranch
              </span>
            </div>

            {/* Dynamic Status / Action Pill on Card */}
            <div className="w-full py-2.5 px-4 rounded-full bg-gradient-to-r from-maroon-900 via-maroon-royal to-maroon-900 text-gold-100 border border-gold-rich/80 flex items-center justify-center space-x-2 shadow-md relative z-10">
              <Sparkles className="w-3.5 h-3.5 text-gold-champagne animate-pulse" />
              <span className="font-serif text-xs uppercase tracking-[0.2em] font-bold">
                Entering Wedding Website...
              </span>
              <ArrowRight className="w-3.5 h-3.5 text-gold-champagne" />
            </div>
          </div>

          {/* 3. The Front Pocket & Shoulders (Covers entire lower & side envelope) */}
          <div className="absolute inset-0 z-30 pointer-events-none">
            <svg
              viewBox="0 0 500 324"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full h-full drop-shadow-[0_-4px_12px_rgba(0,0,0,0.5)]"
              preserveAspectRatio="none"
            >
              <defs>
                {/* Pocket Maroon Gradient */}
                <linearGradient id="bodyPocketGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#4A101C" />
                  <stop offset="45%" stopColor="#3C0B15" />
                  <stop offset="100%" stopColor="#25040A" />
                </linearGradient>

                {/* Gold Piping Gradient */}
                <linearGradient id="bodyGoldPiping" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#FFF2B2" />
                  <stop offset="30%" stopColor="#D4AF37" />
                  <stop offset="60%" stopColor="#FAF0C5" />
                  <stop offset="100%" stopColor="#8A6014" />
                </linearGradient>
              </defs>

              {/* Left Shoulder Fold (Behind flap, covers upper left) */}
              <path
                d="M 0 0 L 160 160 L 0 324 Z"
                fill="#3F0A15"
              />

              {/* Right Shoulder Fold (Behind flap, covers upper right) */}
              <path
                d="M 500 0 L 340 160 L 500 324 Z"
                fill="#3B0913"
              />

              {/* Front Pocket: Folds up from bottom, top V-edge dips gently at center */}
              <path
                d="M 0 160 L 250 145 L 500 160 L 500 324 L 0 324 Z"
                fill="url(#bodyPocketGrad)"
              />

              {/* Gold Piping along the Pocket Top V-Edge */}
              <path
                d="M 0 160 L 250 145 L 500 160"
                stroke="url(#bodyGoldPiping)"
                strokeWidth="2"
              />

              {/* Decorative Stitched Gold Line below the edge */}
              <path
                d="M 12 170 L 250 156 L 488 170"
                stroke="#E5C992"
                strokeWidth="1"
                strokeDasharray="5 4"
                opacity="0.75"
              />
            </svg>

            {/* Front Pocket Typography (Comfortably located in lower half, below seal) */}
            <div className="absolute inset-x-0 bottom-4 sm:bottom-5.5 text-center px-4">
              <span className="text-[9.5px] sm:text-[10px] uppercase tracking-[0.25em] text-gold-champagne/90 font-semibold block mb-1">
                Auspicious Wedding Celebrations
              </span>
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-ivory-50 tracking-wide leading-tight drop-shadow-xs">
                Yaswanth Sai &amp; Lakshmi Mrudula
              </h3>
              <div className="w-12 h-0.5 bg-gold-rich mx-auto my-1.5 opacity-90" />
              <p className="text-[10px] sm:text-[11px] text-gold-champagne/90 tracking-wider uppercase font-medium">
                November 19–21, 2026 • Texas, USA
              </p>
            </div>
          </div>

          {/* 4. Top Triangular Flap (3D: Smoothly flips UPWARD in 3D when opened) */}
          <div
            className={`absolute top-0 inset-x-0 h-full envelope-flap-3d ${
              animationStage !== 'sealed' ? 'flap-open' : ''
            } z-35 pointer-events-none`}
          >
            <svg
              viewBox="0 0 500 324"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full h-full drop-shadow-[0_12px_22px_rgba(0,0,0,0.7)]"
              preserveAspectRatio="none"
            >
              <defs>
                <linearGradient id="flapFrontGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#5E1624" />
                  <stop offset="60%" stopColor="#480F1B" />
                  <stop offset="100%" stopColor="#350812" />
                </linearGradient>

                <linearGradient id="flapGoldBorder" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#FFF2B2" />
                  <stop offset="35%" stopColor="#D4AF37" />
                  <stop offset="70%" stopColor="#FAF0C5" />
                  <stop offset="100%" stopColor="#8A6014" />
                </linearGradient>
              </defs>

              {/* Triangular Flap Body */}
              <path
                d="M 0 0 L 250 165 L 500 0 Z"
                fill="url(#flapFrontGrad)"
              />

              {/* Gold Foil Border along V-Flap */}
              <path
                d="M 0 0 L 250 165 L 500 0"
                stroke="url(#flapGoldBorder)"
                strokeWidth="2.5"
              />

              {/* Inner Decorative Stitched Gold Line */}
              <path
                d="M 16 3 L 250 152 L 484 3"
                stroke="#E5C992"
                strokeWidth="1.2"
                strokeDasharray="5 3"
                opacity="0.85"
              />
            </svg>
          </div>

          {/* 5. Authentic Royal 3D Gold Wax Seal (LOCKED 100% IN MATHEMATICAL CENTER) */}
          {/* Note: Outer container handles left-1/2 -translate-x-1/2 positioning so CSS keyframes never displace it! */}
          <div
            onClick={handleOpenEnvelope}
            className={`absolute top-[51%] left-1/2 -translate-x-1/2 -translate-y-1/2 z-40 cursor-pointer transition-all duration-300 ${
              animationStage !== 'sealed'
                ? 'scale-0 opacity-0 pointer-events-none'
                : 'hover:scale-105'
            }`}
            title="Click royal wax seal to open invitation"
          >
            <div className="w-[74px] h-[74px] sm:w-[80px] sm:h-[80px] rounded-full flex items-center justify-center relative seal-pulse-animation">
              <svg
                viewBox="0 0 100 100"
                className="w-full h-full drop-shadow-[0_8px_20px_rgba(0,0,0,0.7)]"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  {/* Radial Metallic Gold Gradient */}
                  <radialGradient id="sealGoldRadial" cx="36%" cy="32%" r="65%">
                    <stop offset="0%" stopColor="#FFF7D6" />
                    <stop offset="25%" stopColor="#F5D061" />
                    <stop offset="55%" stopColor="#D4AF37" />
                    <stop offset="85%" stopColor="#9E7822" />
                    <stop offset="100%" stopColor="#5E430B" />
                  </radialGradient>

                  {/* Rim Bevel Gradient */}
                  <linearGradient id="sealRimGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#FFEAA7" />
                    <stop offset="50%" stopColor="#D4AF37" />
                    <stop offset="100%" stopColor="#4A3408" />
                  </linearGradient>

                  {/* Recessed Coin Gradient */}
                  <radialGradient id="sealCoinGrad" cx="42%" cy="40%" r="58%">
                    <stop offset="0%" stopColor="#FAF0C5" />
                    <stop offset="40%" stopColor="#E5C365" />
                    <stop offset="80%" stopColor="#BF9526" />
                    <stop offset="100%" stopColor="#7A560F" />
                  </radialGradient>
                </defs>

                {/* Stamped Molten Outer Wax Lip */}
                <path
                  d="M50 3 C64 2, 75 6, 84 15 C93 24, 97 35, 97 49 C98 63, 93 75, 84 84 C75 93, 63 98, 49 97 C35 98, 23 93, 14 84 C6 75, 2 63, 3 49 C2 35, 7 24, 16 15 C25 6, 37 2, 50 3 Z"
                  fill="url(#sealGoldRadial)"
                  stroke="url(#sealRimGrad)"
                  strokeWidth="2.5"
                />

                {/* Subtle Organic Shading */}
                <circle cx="50" cy="50" r="41.5" fill="none" stroke="#FFEBB0" strokeWidth="1" opacity="0.6" />
                <circle cx="50" cy="50" r="40.5" fill="none" stroke="#4A3408" strokeWidth="1.2" opacity="0.4" />

                {/* Recessed Coin Center */}
                <circle cx="50" cy="50" r="35.5" fill="url(#sealCoinGrad)" stroke="#D4AF37" strokeWidth="1" />

                {/* Beaded Dashed Concentric Ring */}
                <circle
                  cx="50"
                  cy="50"
                  r="31.5"
                  fill="none"
                  stroke="#5A1827"
                  strokeWidth="1.2"
                  strokeDasharray="2.5 2.5"
                  opacity="0.65"
                />

                {/* Inner Hairline Ring */}
                <circle
                  cx="50"
                  cy="50"
                  r="28"
                  fill="none"
                  stroke="#5A1827"
                  strokeWidth="0.75"
                  opacity="0.45"
                />

                {/* Royal Couple Monogram "Y & M" */}
                <text
                  x="50"
                  y="47"
                  textAnchor="middle"
                  dominantBaseline="central"
                  fontFamily="'Cinzel', 'Cormorant Garamond', serif"
                  fontWeight="700"
                  fontSize="18"
                  fill="#5A1827"
                  letterSpacing="1.2"
                  style={{ filter: 'drop-shadow(0 1px 1px rgba(255,255,255,0.4))' }}
                >
                  Y&amp;M
                </text>

                {/* Traditional Decorative Motif / Knot */}
                <path
                  d="M42 54.5 Q50 52.5 58 54.5 Q50 56.5 42 54.5 Z"
                  fill="#5A1827"
                  opacity="0.7"
                />
                <circle cx="50" cy="54.5" r="1.2" fill="#5A1827" />

                {/* "SHUBH VIVAH" Subtitle */}
                <text
                  x="50"
                  y="64.5"
                  textAnchor="middle"
                  dominantBaseline="central"
                  fontFamily="'Outfit', sans-serif"
                  fontWeight="700"
                  fontSize="6.6"
                  fill="#5A1827"
                  letterSpacing="2.2"
                  opacity="0.85"
                >
                  SHUBH VIVAH
                </text>
              </svg>
            </div>
          </div>
        </div>

        {/* Bottom Interactive Prompt & Action Controls */}
        <div className="mt-7 text-center shrink-0">
          {animationStage === 'sealed' ? (
            <button
              onClick={handleOpenEnvelope}
              className="group relative inline-flex items-center space-x-3 px-8 py-3.5 rounded-full overflow-hidden transition-all duration-300 transform hover:-translate-y-0.5 shadow-[0_10px_30px_rgba(0,0,0,0.6),0_0_20px_rgba(212,175,55,0.25)] hover:shadow-[0_15px_40px_rgba(0,0,0,0.8),0_0_30px_rgba(212,175,55,0.45)] cursor-pointer border border-gold-200/90 mx-auto"
              style={{
                background: 'linear-gradient(135deg, #ECC878 0%, #D4AF37 35%, #F7E5A9 65%, #AA7B1E 100%)',
              }}
            >
              {/* Shimmer light sweep */}
              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full duration-1000 bg-gradient-to-r from-transparent via-white/40 to-transparent transition-transform pointer-events-none" />

              <Sparkles className="w-4 h-4 text-maroon-900 shrink-0 group-hover:rotate-45 transition-transform" />
              <span className="font-serif text-sm tracking-[0.22em] uppercase font-bold text-maroon-950">
                Open Royal Invitation
              </span>
              <ArrowRight className="w-4 h-4 text-maroon-900 shrink-0 group-hover:translate-x-1.5 transition-transform" />
            </button>
          ) : (
            <div className="inline-flex items-center space-x-2 px-6 py-2 rounded-full border border-gold-rich/50 bg-black/40 backdrop-blur-md text-gold-champagne text-xs uppercase tracking-[0.2em] font-semibold animate-pulse">
              <Sparkles className="w-3.5 h-3.5 text-gold-rich" />
              <span>Unfolding Celebrations...</span>
            </div>
          )}

          <p className="text-[11px] text-gold-champagne/75 mt-2.5 font-light tracking-wide">
            {animationStage === 'sealed'
              ? 'Click the royal wax seal or button above to unseal your invitation'
              : 'Entering Yaswanth Sai & Lakshmi Mrudula wedding celebrations'}
          </p>
        </div>
      </div>

      {/* Subtle bottom footer text */}
      <div className="text-[10px] text-gold-champagne/50 tracking-widest uppercase font-serif shrink-0">
        Yaswanth Sai &amp; Lakshmi Mrudula • November 2026
      </div>
    </div>
  );
}
