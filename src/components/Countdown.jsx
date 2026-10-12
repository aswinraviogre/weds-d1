import React, { useState, useEffect } from 'react';
import { Sparkles, Heart } from 'lucide-react';
import { weddingConfig } from '../config/weddingConfig';

export function Countdown() {
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
      <div className="w-full max-w-xl mx-auto p-6 rounded-2xl bg-paper border border-brass shadow-temple text-center">
        <div className="inline-flex items-center justify-center p-3 bg-maroon-50 rounded-full mb-3 text-maroon-temple">
          <Heart className="w-8 h-8 fill-maroon-temple animate-pulse" />
        </div>
        <h3 className="font-serif text-3xl font-bold text-maroon-deep tracking-wide mb-2">
          The Celebrations Have Begun!
        </h3>
        <p className="text-ink text-base">
          Yaswanth &amp; Mrudula are getting married today! Wishing them a lifetime of love and blessings.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="text-center mb-4">
        <span className="inline-flex items-center space-x-2 text-xs font-semibold uppercase tracking-[0.25em] text-brass-soft">
          <Sparkles className="w-3.5 h-3.5 text-brass" />
          <span>Counting Down to the Sacred Muhurtham</span>
          <Sparkles className="w-3.5 h-3.5 text-brass" />
        </span>
      </div>

      <div className="grid grid-cols-4 gap-2.5 sm:gap-4">
        {timeUnits.map((unit) => (
          <div
            key={unit.label}
            className="group relative bg-[#1C0508]/90 backdrop-blur-md border border-brass/55 rounded-2xl p-3 sm:p-5 text-center shadow-[0_12px_28px_rgba(0,0,0,0.65)] hover:border-brass hover:shadow-[0_15px_35px_rgba(201,146,47,0.25)] transition-all duration-300"
          >
            {/* Corner brass accents */}
            <div className="absolute top-1.5 left-1.5 w-2 h-2 border-t border-l border-brass/60" />
            <div className="absolute top-1.5 right-1.5 w-2 h-2 border-t border-r border-brass/60" />
            <div className="absolute bottom-1.5 left-1.5 w-2 h-2 border-b border-l border-brass/60" />
            <div className="absolute bottom-1.5 right-1.5 w-2 h-2 border-b border-r border-brass/60" />

            <div className="font-serif text-2xl sm:text-4xl md:text-5xl font-bold text-brass-glow tracking-tight group-hover:text-[#FFE394] transition-colors drop-shadow-[0_2px_8px_rgba(0,0,0,0.85)]">
              {String(unit.value).padStart(2, '0')}
            </div>
            <div className="text-[10px] sm:text-xs uppercase tracking-widest text-[#FFF6D8]/85 font-medium mt-1">
              {unit.label}
            </div>
          </div>
        ))}
      </div>

      <div className="text-center mt-3">
        <span className="text-[11px] text-brass-soft/80 italic tracking-wide">
          November 21, 2026 • 11:05 AM Central Time (America/Chicago)
        </span>
      </div>
    </div>
  );
}
