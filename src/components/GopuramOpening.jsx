import React, { useState, useRef } from 'react';
import { Sparkles, ChevronRight } from 'lucide-react';
import confetti from 'canvas-confetti';
import { weddingConfig } from '../config/weddingConfig';

/**
 * GopuramOpening:
 * Authentic South Indian Temple Tower (Gopuram) Gateway Reveal Experience.
 * Displays the sacred unopened temple gopuram which smoothly splits down the center
 * in 3D perspective to unveil the divine wedding invitation ("OUR WEDDING INVITATION").
 */
export function GopuramOpening({ isOpen, onComplete, onSkip }) {
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
    }, 700);
  };

  const handleOpenGopuram = () => {
    try {
      window.dispatchEvent(new CustomEvent('start-wedding-audio'));
    } catch (e) {}

    if (animationStage !== 'sealed') {
      triggerEnterSite();
      return;
    }

    setAnimationStage('opening');

    // Royal celebratory golden confetti shower
    try {
      confetti({
        particleCount: 95,
        spread: 100,
        origin: { y: 0.55 },
        colors: ['#C9922F', '#FFCF5C', '#7B1F2B', '#FFF6D8', '#1F6B4A'],
      });
    } catch (e) {}

    // Door parts open and unveiled state activates
    setTimeout(() => {
      setAnimationStage('revealed');
    }, 350);

    // Effortless transition into main wedding celebration after admiring the unveiled gateway
    setTimeout(() => {
      triggerEnterSite();
    }, 1800);
  };

  const isDoorsOpen = animationStage === 'revealed' || animationStage === 'entering';

  return (
    <div
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-between py-3 sm:py-5 px-3 sm:px-6 select-none overflow-hidden transition-all duration-700 bg-[#1D0407] ${
        animationStage === 'entering' ? 'opacity-0 scale-105 pointer-events-none' : 'opacity-100 scale-100'
      }`}
    >
      {/* Background Wedding Texture smoothly revealing as temple doors part open */}
      <div 
        className={`absolute inset-0 bg-cover bg-center sm:bg-top bg-no-repeat transition-opacity duration-1000 pointer-events-none ${
          isDoorsOpen ? 'opacity-35' : 'opacity-15'
        }`}
        style={{ backgroundImage: `url('/images/wedding-bg.jpg')` }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[#180406]/80 via-[#2A080C]/40 to-[#180406]/85 pointer-events-none" />

      {/* Decorative Jasmine Flower Garlands on left and right borders */}
      <div className="absolute top-0 left-1 sm:left-4 md:left-8 w-10 sm:w-16 h-72 sm:h-96 pointer-events-none opacity-85 z-20">
        <img
          src="/images/jasmine-strand.png"
          alt=""
          className="w-full h-full object-contain object-top filter drop-shadow-md animate-lamp-flicker"
        />
      </div>
      <div className="absolute top-0 right-1 sm:right-4 md:right-8 w-10 sm:w-16 h-72 sm:h-96 pointer-events-none opacity-85 z-20">
        <img
          src="/images/jasmine-strand.png"
          alt=""
          className="w-full h-full object-contain object-top filter drop-shadow-md animate-lamp-flicker"
        />
      </div>

      {/* Radiant Divine Sanctum Lighting */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[580px] h-[580px] rounded-full bg-brass/15 blur-[140px]" />
        <div className="absolute bottom-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full bg-maroon-temple/30 blur-[130px]" />
      </div>

      {/* Top Bar: Hashtag, Sacred Inscription and Skip Button */}
      <div className="w-full max-w-5xl flex items-center justify-between z-50 shrink-0 pt-1 sm:pt-2 px-2 sm:px-4">
        {/* Hashtag */}
        <div className="flex items-center space-x-2">
          <span className="font-serif text-[11px] sm:text-xs tracking-[0.2em] uppercase text-brass-soft font-semibold">
            {couple.hashtag || '#YASHWEDSMUDULA'}
          </span>
        </div>

        {/* Sacred Inscription Pill */}
        <div className="hidden xs:inline-flex items-center space-x-2 px-3 sm:px-5 py-1 rounded-full bg-maroon-night/90 border border-brass/60 text-brass text-[10px] sm:text-xs font-serif tracking-[0.2em] shadow-sm">
          <span>॥ శ్రీ రామ చంద్ర స్వామి కృప కటాక్షം ॥</span>
        </div>

        {/* Skip Button */}
        <button
          onClick={() => {
            try {
              window.dispatchEvent(new CustomEvent('start-wedding-audio'));
            } catch (e) {}
            if (onSkip) onSkip();
          }}
          className="inline-flex items-center space-x-1.5 px-3.5 sm:px-4 py-1 sm:py-1.5 rounded-full border border-brass/60 bg-maroon-night/85 hover:bg-brass/20 text-paper hover:text-white text-[10px] sm:text-xs uppercase tracking-widest font-semibold transition-all backdrop-blur-md shadow-md cursor-pointer"
        >
          <span>Skip to Invitation</span>
          <ChevronRight className="w-3.5 h-3.5 text-brass" />
        </button>
      </div>

      {/* Main Temple Gateway Stage (Fully fills screen on mobile, 16:9 on desktop) */}
      <div 
        onClick={!isDoorsOpen ? handleOpenGopuram : triggerEnterSite}
        className="relative z-30 w-full max-w-4xl h-[56vh] min-h-[400px] max-h-[560px] sm:h-auto sm:min-h-0 sm:max-h-none sm:aspect-[16/9] my-auto flex items-center justify-center cursor-pointer select-none group overflow-hidden sm:overflow-visible"
      >
        {/* Layer 1: Divine Radiant Backlight when doors part */}
        <div
          className={`absolute inset-0 bg-radial from-brass/40 via-maroon-temple/25 to-transparent rounded-3xl transition-opacity duration-1000 pointer-events-none ${
            isDoorsOpen ? 'opacity-100' : 'opacity-0'
          }`}
        />

        {/* Layer 2: The Unveiled Open Temple Stage ("OUR WEDDING INVITATION") */}
        <div className="absolute inset-0 flex items-center justify-center w-full h-full pointer-events-none">
          <img
            src="/images/temple_gopuram_open.jpg"
            alt="Our Wedding Invitation - Yash & Mrudula"
            className="w-full h-full object-cover sm:object-contain object-center filter drop-shadow-[0_15px_40px_rgba(0,0,0,0.85)]"
          />
        </div>

        {/* Layer 3: The Intact Temple Gopuram Split Doors in 3D Perspective */}
        {/* Left Split Door (Left 50%) */}
        <div
          className="absolute inset-0 pointer-events-none origin-left transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)]"
          style={{
            clipPath: 'polygon(0 0, 50% 0, 50% 100%, 0 100%)',
            transform: isDoorsOpen ? 'perspective(1200px) rotateY(-80deg) translateX(-10%)' : 'none',
            opacity: isDoorsOpen ? 0 : 1,
          }}
        >
          <img
            src="/images/temple_closed_matched.jpg"
            alt="Temple Gopuram Left"
            className="w-full h-full object-cover sm:object-contain object-center filter drop-shadow-[0_15px_40px_rgba(0,0,0,0.85)]"
          />
          {/* 3D Depth Shadow on Door Pivot */}
          <div 
            className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/60 transition-opacity duration-1000"
            style={{ opacity: isDoorsOpen ? 0.9 : 0 }}
          />
        </div>

        {/* Right Split Door (Right 50%) */}
        <div
          className="absolute inset-0 pointer-events-none origin-right transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)]"
          style={{
            clipPath: 'polygon(50% 0, 100% 0, 100% 100%, 50% 100%)',
            transform: isDoorsOpen ? 'perspective(1200px) rotateY(80deg) translateX(10%)' : 'none',
            opacity: isDoorsOpen ? 0 : 1,
          }}
        >
          <img
            src="/images/temple_closed_matched.jpg"
            alt="Temple Gopuram Right"
            className="w-full h-full object-cover sm:object-contain object-center filter drop-shadow-[0_15px_40px_rgba(0,0,0,0.85)]"
          />
          {/* 3D Depth Shadow on Door Pivot */}
          <div 
            className="absolute inset-0 bg-gradient-to-l from-black/40 via-transparent to-black/60 transition-opacity duration-1000"
            style={{ opacity: isDoorsOpen ? 0.9 : 0 }}
          />
        </div>
      </div>

      {/* Bottom Bar: Touch to Unveil Invitation with Ornamental Divider Flourishes */}
      <div className="w-full max-w-lg flex items-center justify-center pb-2 sm:pb-4 px-4 z-50 shrink-0">
        <div className="flex items-center justify-center space-x-2.5 sm:space-x-4 w-full">
          {/* Left Flourish Line */}
          <div className="h-[1px] flex-1 max-w-[60px] sm:max-w-[100px] bg-gradient-to-r from-transparent via-brass/50 to-brass" />
          <div className="w-1.5 h-1.5 rotate-45 border border-brass bg-brass-glow/40" />

          {/* Interactive Button */}
          <button
            onClick={!isDoorsOpen ? handleOpenGopuram : triggerEnterSite}
            className="group px-5 sm:px-8 py-2 sm:py-2.5 rounded-full border border-brass/80 bg-gradient-to-r from-maroon-night via-[#2B080D] to-maroon-night hover:border-brass text-brass-soft hover:text-white text-[11px] sm:text-xs font-serif tracking-[0.22em] uppercase transition-all duration-300 shadow-[0_0_20px_rgba(201,146,47,0.3)] flex items-center space-x-2 cursor-pointer active:scale-98"
          >
            <Sparkles className="w-3.5 h-3.5 text-brass-glow animate-pulse group-hover:rotate-45 transition-transform" />
            <span>{isDoorsOpen ? 'Enter Wedding Celebration' : 'Touch to Unveil Invitation'}</span>
            {isDoorsOpen && <ChevronRight className="w-3.5 h-3.5 text-brass-glow ml-1" />}
          </button>

          {/* Right Flourish Line */}
          <div className="w-1.5 h-1.5 rotate-45 border border-brass bg-brass-glow/40" />
          <div className="h-[1px] flex-1 max-w-[60px] sm:max-w-[100px] bg-gradient-to-l from-transparent via-brass/50 to-brass" />
        </div>
      </div>
    </div>
  );
}

export default GopuramOpening;
