import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Music } from 'lucide-react';

export function AudioPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioCtxRef = useRef(null);
  const oscillatorsRef = useRef([]);
  const gainNodeRef = useRef(null);

  const startIndianDrone = () => {
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (!AudioContext) return;

      if (!audioCtxRef.current) {
        audioCtxRef.current = new AudioContext();
      }

      const ctx = audioCtxRef.current;
      if (ctx.state === 'suspended') {
        ctx.resume();
      }

      // Master gain
      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(0.08, ctx.currentTime);
      masterGain.connect(ctx.destination);
      gainNodeRef.current = masterGain;

      // Authentic Indian Tanpura Harmonics (Root Sa = C#3 ~ 138.59 Hz, Pa = G#3 ~ 207.65 Hz)
      const frequencies = [138.59, 207.65, 277.18, 415.3];

      oscillatorsRef.current = frequencies.map((freq, i) => {
        const osc = ctx.createOscillator();
        const oscGain = ctx.createGain();

        osc.type = i % 2 === 0 ? 'sine' : 'triangle';
        osc.frequency.setValueAtTime(freq, ctx.currentTime);

        // Gentle tremolo LFO for natural acoustic resonance
        const lfo = ctx.createOscillator();
        lfo.frequency.setValueAtTime(0.2 + i * 0.1, ctx.currentTime);
        const lfoGain = ctx.createGain();
        lfoGain.gain.setValueAtTime(0.03, ctx.currentTime);
        lfo.connect(oscGain.gain);
        lfo.start();

        oscGain.gain.setValueAtTime(0.25 / frequencies.length, ctx.currentTime);
        osc.connect(oscGain);
        oscGain.connect(masterGain);
        osc.start();

        return { osc, lfo };
      });

      setIsPlaying(true);
    } catch (err) {
      console.warn('Web Audio playback error:', err);
    }
  };

  const stopIndianDrone = () => {
    if (gainNodeRef.current && audioCtxRef.current) {
      gainNodeRef.current.gain.setTargetAtTime(0, audioCtxRef.current.currentTime, 0.5);
    }
    setTimeout(() => {
      oscillatorsRef.current.forEach(({ osc, lfo }) => {
        try {
          osc.stop();
          lfo.stop();
        } catch (e) {}
      });
      oscillatorsRef.current = [];
      setIsPlaying(false);
    }, 600);
  };

  const toggleSound = () => {
    if (isPlaying) {
      stopIndianDrone();
    } else {
      startIndianDrone();
    }
  };

  useEffect(() => {
    return () => {
      stopIndianDrone();
    };
  }, []);

  return (
    <div className="fixed bottom-6 right-6 z-40">
      <button
        onClick={toggleSound}
        className={`group flex items-center space-x-2 px-3.5 py-2.5 rounded-full border shadow-luxury transition-all duration-300 ${
          isPlaying
            ? 'bg-maroon-royal text-gold-champagne border-gold-rich ring-2 ring-gold-rich/30'
            : 'bg-white/90 backdrop-blur-md text-stone-700 hover:text-maroon-royal border-gold-300 hover:border-gold-rich'
        }`}
        title={isPlaying ? 'Mute ambient Indian wedding instrumental' : 'Play ambient Indian wedding instrumental'}
        aria-label="Toggle wedding ambient music"
      >
        {isPlaying ? (
          <>
            <Volume2 className="w-4 h-4 text-gold-champagne animate-pulse" />
            <span className="text-[11px] font-semibold tracking-wider uppercase pr-1">Music On</span>
            <span className="flex space-x-0.5 items-end h-3">
              <span className="w-0.5 bg-gold-champagne animate-pulse h-2" />
              <span className="w-0.5 bg-gold-champagne animate-pulse h-3" />
              <span className="w-0.5 bg-gold-champagne animate-pulse h-1.5" />
            </span>
          </>
        ) : (
          <>
            <VolumeX className="w-4 h-4 text-stone-400 group-hover:text-gold-deep" />
            <span className="text-[11px] font-medium tracking-wider uppercase pr-1 text-stone-600">Ambiance</span>
          </>
        )}
      </button>
    </div>
  );
}
