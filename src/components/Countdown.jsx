import React, { useState, useEffect } from 'react';
import { Sparkles, Heart } from 'lucide-react';
import { weddingConfig } from '../config/weddingConfig';

export function Countdown({ onExploreClick }) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isCompleted: false,
  });

  useEffect(() => {
    // Target time: November 21, 2026 at 11:05 AM in America/Chicago (CST = UTC-6)
    const targetTimeMs = new Date(weddingConfig.countdown.targetIso).getTime();

    const calculateTime = () => {
      const nowMs = Date.now();
      const difference = targetTimeMs - nowMs;

      if (difference <= 0) {
        setTimeLeft({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
          isCompleted: true,
        });
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeLeft({
        days,
        hours,
        minutes,
        seconds,
        isCompleted: false,
      });
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const timeUnits = [
    { label: 'Days', value: timeLeft.days },
    { label: 'Hours', value: timeLeft.hours },
    { label: 'Minutes', value: timeLeft.minutes },
    { label: 'Seconds', value: timeLeft.seconds },
  ];

  if (timeLeft.isCompleted) {
    return (
      <div className="w-full max-w-xl mx-auto p-6 rounded-2xl bg-cream-light/95 border-2 border-gold-rich shadow-luxury text-center">
        <div className="inline-flex items-center justify-center p-3 bg-maroon-50 rounded-full mb-3 text-maroon-royal">
          <Heart className="w-8 h-8 fill-maroon-royal animate-pulse" />
        </div>
        <h3 className="font-serif text-3xl font-bold text-maroon-royal tracking-wide mb-2">
          The Celebrations Have Begun!
        </h3>
        <p className="text-stone-700 text-base">
          Yaswanth &amp; Lakshmi Mrudula are getting married today! Wishing them a lifetime of love and blessings.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="text-center mb-4">
        <span className="inline-flex items-center space-x-1.5 text-xs font-semibold uppercase tracking-[0.25em] text-gold-deep">
          <Sparkles className="w-3.5 h-3.5 text-gold-rich" />
          <span>Counting Down to the Muhurtham</span>
          <Sparkles className="w-3.5 h-3.5 text-gold-rich" />
        </span>
      </div>

      <div className="grid grid-cols-4 gap-2.5 sm:gap-4">
        {timeUnits.map((unit) => (
          <div
            key={unit.label}
            className="group relative bg-cream-light/90 backdrop-blur-sm border border-gold-200/80 rounded-xl p-3 sm:p-5 text-center shadow-sm hover:border-gold-rich transition-all duration-300"
          >
            {/* Corner gold accents */}
            <div className="absolute top-1 left-1 w-2 h-2 border-t border-l border-gold-rich/50" />
            <div className="absolute top-1 right-1 w-2 h-2 border-t border-r border-gold-rich/50" />
            <div className="absolute bottom-1 left-1 w-2 h-2 border-b border-l border-gold-rich/50" />
            <div className="absolute bottom-1 right-1 w-2 h-2 border-b border-r border-gold-rich/50" />

            <div className="font-serif text-2xl sm:text-4xl md:text-5xl font-bold text-maroon-royal tracking-tight group-hover:text-gold-deep transition-colors">
              {String(unit.value).padStart(2, '0')}
            </div>
            <div className="text-[10px] sm:text-xs uppercase tracking-widest text-stone-500 font-medium mt-1">
              {unit.label}
            </div>
          </div>
        ))}
      </div>

      <div className="text-center mt-3">
        <span className="text-[11px] text-stone-500 italic tracking-wide">
          November 21, 2026 • 11:05 AM Central Time (America/Chicago)
        </span>
      </div>
    </div>
  );
}
