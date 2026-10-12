import React from 'react';

export function DivineBlessing() {
  return (
    <section
      id="divine-blessings"
      className="scroll-mt-24 py-10 sm:py-14 px-4 bg-gradient-to-b from-ivory-50 via-cream-light to-ivory-100 flex flex-col items-center justify-center relative overflow-hidden"
    >
      {/* Divine ambient golden aura in background */}
      <div className="absolute w-72 sm:w-[420px] h-72 sm:h-[420px] rounded-full bg-gold-rich/15 blur-[90px] pointer-events-none" />

      {/* Decorative top gold ornament separator */}
      <div className="flex items-center justify-center space-x-3 mb-6 w-full max-w-xs opacity-80 pointer-events-none">
        <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-gold-rich to-gold-deep" />
        <div className="flex items-center space-x-1">
          <div className="w-1.5 h-1.5 rotate-45 bg-gold-rich" />
          <div className="w-2.5 h-2.5 rotate-45 border border-gold-rich bg-gold-200" />
          <div className="w-1.5 h-1.5 rotate-45 bg-gold-rich" />
        </div>
        <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent via-gold-rich to-gold-deep" />
      </div>

      {/* Centered Ornate Royal Golden Frame */}
      <div className="relative group max-w-[270px] sm:max-w-[310px] md:max-w-[330px] w-full mx-auto flex flex-col items-center">
        {/* Soft floating divine back-glow */}
        <div className="absolute -inset-3 rounded-[30px] bg-gradient-to-tr from-gold-600/35 via-gold-200/55 to-gold-500/35 blur-xl opacity-75 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

        {/* Outer Heavy Carved Gold Frame */}
        <div
          className="relative w-full rounded-[24px] p-2.5 sm:p-3.5 shadow-[0_20px_50px_rgba(42,9,16,0.22),0_0_35px_rgba(212,175,55,0.35)] transition-all duration-500 group-hover:shadow-[0_25px_60px_rgba(42,9,16,0.28),0_0_45px_rgba(212,175,55,0.5)] group-hover:-translate-y-1"
          style={{
            background: 'linear-gradient(135deg, #FFE082 0%, #D4AF37 20%, #FFF8D6 40%, #B8860B 70%, #ECC878 90%, #8A6014 100%)',
          }}
        >
          {/* Inner Frame Inset 1: Deep Royal Maroon Velvet Layer */}
          <div
            className="rounded-[16px] p-1.5 sm:p-2 shadow-inner relative"
            style={{
              background: 'linear-gradient(160deg, #420A14 0%, #29040C 100%)',
            }}
          >
            {/* Ornate Gold Filigree Corner Accents (Inside the frame) */}
            <div className="absolute top-2.5 left-2.5 w-3.5 h-3.5 border-t-2 border-l-2 border-gold-champagne/90 rounded-tl-sm pointer-events-none z-10" />
            <div className="absolute top-2.5 right-2.5 w-3.5 h-3.5 border-t-2 border-r-2 border-gold-champagne/90 rounded-tr-sm pointer-events-none z-10" />
            <div className="absolute bottom-2.5 left-2.5 w-3.5 h-3.5 border-b-2 border-l-2 border-gold-champagne/90 rounded-bl-sm pointer-events-none z-10" />
            <div className="absolute bottom-2.5 right-2.5 w-3.5 h-3.5 border-b-2 border-r-2 border-gold-champagne/90 rounded-br-sm pointer-events-none z-10" />

            {/* Inner Frame Inset 2: Fine Gold Beaded Border */}
            <div
              className="rounded-[12px] p-1 sm:p-1.5 relative"
              style={{
                background: 'linear-gradient(135deg, #ECC878 0%, #D4AF37 40%, #FFF2B2 70%, #9E7822 100%)',
              }}
            >
              {/* Photo Enclosure with Black Velvet Matting */}
              <div className="rounded-[8px] overflow-hidden bg-black aspect-[4/5] flex items-center justify-center relative shadow-[inset_0_4px_16px_rgba(0,0,0,0.95)]">
                <img
                  src="/images/divine_blessings.png"
                  alt="Divine Blessings of Lord Shirdi Sai Baba & Master"
                  loading="lazy"
                  className="w-full h-full object-contain filter drop-shadow-[0_4px_12px_rgba(255,255,255,0.06)] transform transition-transform duration-700 group-hover:scale-[1.03]"
                />

                {/* Subtle soft spiritual light highlight */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-white/10 pointer-events-none" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative bottom gold ornament separator */}
      <div className="flex items-center justify-center space-x-3 mt-6 w-full max-w-xs opacity-80 pointer-events-none">
        <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-gold-rich to-gold-deep" />
        <div className="flex items-center space-x-1">
          <div className="w-1.5 h-1.5 rotate-45 bg-gold-rich" />
          <div className="w-2.5 h-2.5 rotate-45 border border-gold-rich bg-gold-200" />
          <div className="w-1.5 h-1.5 rotate-45 bg-gold-rich" />
        </div>
        <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent via-gold-rich to-gold-deep" />
      </div>
    </section>
  );
}

export default DivineBlessing;
