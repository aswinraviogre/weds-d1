import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Music } from 'lucide-react';

export function AudioPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);
  const userMutedRef = useRef(false);
  const wasPlayingBeforeHiddenRef = useRef(false);

  // Play audio safely
  const playAudio = () => {
    if (!audioRef.current) return;
    userMutedRef.current = false;
    audioRef.current.volume = 0.7;
    const playPromise = audioRef.current.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          setIsPlaying(true);
        })
        .catch((err) => {
          console.warn('Audio auto-play waiting for user interaction:', err);
        });
    }
  };

  // Pause audio
  const pauseAudio = () => {
    if (!audioRef.current) return;
    audioRef.current.pause();
    setIsPlaying(false);
  };

  // Toggle Mute / Unmute
  const toggleSound = () => {
    if (isPlaying) {
      userMutedRef.current = true;
      pauseAudio();
    } else {
      userMutedRef.current = false;
      playAudio();
    }
  };

  // Listen to custom envelope events & manage browser lifecycle
  useEffect(() => {
    const handleStartEvent = () => {
      playAudio();
    };

    const handleStopEvent = () => {
      pauseAudio();
    };

    // When the browser/tab is hidden or switched away, pause music so it doesn't play in background
    const handleVisibilityChange = () => {
      if (document.hidden) {
        if (audioRef.current && !audioRef.current.paused) {
          audioRef.current.pause();
          wasPlayingBeforeHiddenRef.current = true;
          setIsPlaying(false);
        }
      } else {
        // If returning to tab and user had not manually muted it, resume playback
        if (wasPlayingBeforeHiddenRef.current && !userMutedRef.current) {
          playAudio();
          wasPlayingBeforeHiddenRef.current = false;
        }
      }
    };

    // When the browser window/tab is closed, terminate audio immediately
    const handleUnload = () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = '';
      }
    };

    window.addEventListener('start-wedding-audio', handleStartEvent);
    window.addEventListener('stop-wedding-audio', handleStopEvent);
    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('beforeunload', handleUnload);
    window.addEventListener('pagehide', handleUnload);

    return () => {
      window.removeEventListener('start-wedding-audio', handleStartEvent);
      window.removeEventListener('stop-wedding-audio', handleStopEvent);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('beforeunload', handleUnload);
      window.removeEventListener('pagehide', handleUnload);
    };
  }, []);

  return (
    <>
      {/* Native HTML5 Audio Element with continuous loop */}
      <audio
        ref={audioRef}
        src="/audio/wedding_music.mp3"
        loop
        preload="auto"
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onEnded={() => {
          // Safeguard fallback for infinite repeat
          if (audioRef.current && !userMutedRef.current) {
            audioRef.current.currentTime = 0;
            audioRef.current.play().catch(() => {});
          }
        }}
      />

      {/* Floating Custom Mute & Unmute Controller */}
      <div className="fixed bottom-6 right-6 z-40">
        <button
          onClick={toggleSound}
          className={`group flex items-center space-x-2.5 px-4 py-2.5 rounded-full border shadow-luxury transition-all duration-300 cursor-pointer ${
            isPlaying
              ? 'bg-maroon-royal text-gold-champagne border-gold-rich ring-2 ring-gold-rich/40 shadow-[0_10px_25px_rgba(90,24,39,0.35),0_0_15px_rgba(212,175,55,0.25)]'
              : 'bg-white/95 backdrop-blur-md text-stone-700 hover:text-maroon-royal border-gold-300 hover:border-gold-rich shadow-md'
          }`}
          title={isPlaying ? 'Click to Mute Wedding Music' : 'Click to Play Wedding Music'}
          aria-label={isPlaying ? 'Mute wedding music' : 'Play wedding music'}
        >
          {isPlaying ? (
            <>
              <Volume2 className="w-4 h-4 text-gold-champagne animate-pulse shrink-0" />
              <span className="text-[11px] font-semibold tracking-wider uppercase pr-1 font-serif">
                Music Playing
              </span>
              {/* Animated Equalizer Waves */}
              <span className="flex space-x-0.5 items-end h-3 shrink-0">
                <span className="w-0.5 bg-gold-champagne rounded-full animate-[pulse_0.8s_ease-in-out_infinite] h-2" />
                <span className="w-0.5 bg-gold-champagne rounded-full animate-[pulse_1.2s_ease-in-out_infinite_0.2s] h-3" />
                <span className="w-0.5 bg-gold-champagne rounded-full animate-[pulse_0.6s_ease-in-out_infinite_0.4s] h-1.5" />
                <span className="w-0.5 bg-gold-champagne rounded-full animate-[pulse_1.0s_ease-in-out_infinite_0.1s] h-2.5" />
              </span>
            </>
          ) : (
            <>
              <VolumeX className="w-4 h-4 text-stone-500 group-hover:text-gold-deep shrink-0 transition-colors" />
              <span className="text-[11px] font-medium tracking-wider uppercase pr-1 text-stone-700 group-hover:text-maroon-royal font-serif">
                Music Muted
              </span>
            </>
          )}
        </button>
      </div>
    </>
  );
}

export default AudioPlayer;
