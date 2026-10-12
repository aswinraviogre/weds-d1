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

  // Listen to custom Gopuram / envelope events & manage browser lifecycle
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
        if (wasPlayingBeforeHiddenRef.current && !userMutedRef.current) {
          wasPlayingBeforeHiddenRef.current = false;
          playAudio();
        }
      }
    };

    window.addEventListener('start-wedding-audio', handleStartEvent);
    window.addEventListener('stop-wedding-audio', handleStopEvent);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      window.removeEventListener('start-wedding-audio', handleStartEvent);
      window.removeEventListener('stop-wedding-audio', handleStopEvent);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  return (
    <>
      {/* HTML5 Audio element */}
      <audio
        ref={audioRef}
        src="/audio/wedding_music.mp3"
        loop
        preload="auto"
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onEnded={() => {
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
          className={`group flex items-center space-x-2.5 px-4 py-2.5 rounded-full border shadow-temple transition-all duration-300 cursor-pointer backdrop-blur-md ${
            isPlaying
              ? 'bg-maroon-night/95 text-brass-glow border-brass ring-2 ring-brass/40 shadow-[0_10px_25px_rgba(42,11,14,0.7),0_0_15px_rgba(201,146,47,0.3)]'
              : 'bg-maroon-deep/90 text-paper/80 hover:text-brass-glow border-brass/40 hover:border-brass'
          }`}
          title={isPlaying ? 'Click to Mute Wedding Music' : 'Click to Play Wedding Music'}
          aria-label={isPlaying ? 'Mute wedding music' : 'Play wedding music'}
        >
          {isPlaying ? (
            <>
              <Volume2 className="w-4 h-4 text-brass-glow animate-pulse shrink-0" />
              <span className="text-[11px] font-semibold tracking-wider uppercase pr-1 font-serif text-paper">
                Music Playing
              </span>
              {/* Animated Equalizer Waves */}
              <span className="flex space-x-0.5 items-end h-3 shrink-0">
                <span className="w-0.5 bg-brass-glow rounded-full animate-[pulse_0.8s_ease-in-out_infinite] h-2" />
                <span className="w-0.5 bg-brass-glow rounded-full animate-[pulse_1.2s_ease-in-out_infinite_0.2s] h-3" />
                <span className="w-0.5 bg-brass-glow rounded-full animate-[pulse_0.6s_ease-in-out_infinite_0.4s] h-1.5" />
                <span className="w-0.5 bg-brass-glow rounded-full animate-[pulse_1.0s_ease-in-out_infinite_0.1s] h-2.5" />
              </span>
            </>
          ) : (
            <>
              <VolumeX className="w-4 h-4 text-paper/60 group-hover:text-brass shrink-0 transition-colors" />
              <span className="text-[11px] font-medium tracking-wider uppercase pr-1 text-paper/80 group-hover:text-brass-glow font-serif">
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
