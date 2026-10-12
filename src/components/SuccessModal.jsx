import React, { useEffect } from 'react';
import { Heart, Sparkles, Check, X } from 'lucide-react';
import confetti from 'canvas-confetti';
import { weddingConfig } from '../config/weddingConfig';

export function SuccessModal({ isOpen, onClose, submissionData }) {
  const { rsvpConfirmation, couple } = weddingConfig;

  useEffect(() => {
    if (isOpen) {
      // Fire celebratory confetti in brass gold, temple maroon, and champagne colors
      try {
        confetti({
          particleCount: 90,
          spread: 80,
          origin: { y: 0.6 },
          colors: ['#C9922F', '#7B1F2B', '#FFCF5C', '#1F6B4A', '#FFF6D8'],
        });
      } catch (err) {
        // Safe fallback if canvas not available
      }
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-maroon-night/85 backdrop-blur-md animate-fade-in">
      <div
        className="relative w-full max-w-lg paper-cut-card bg-paper rounded-3xl p-8 sm:p-12 text-center border-2 border-brass shadow-2xl text-ink"
        role="dialog"
        aria-modal="true"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-ink/50 hover:text-ink rounded-full hover:bg-paper-warm transition-colors cursor-pointer"
          aria-label="Close confirmation dialog"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Indian corner ornaments */}
        <div className="corner-ornament corner-tl" />
        <div className="corner-ornament corner-tr" />
        <div className="corner-ornament corner-bl" />
        <div className="corner-ornament corner-br" />

        {/* Central Icon */}
        <div className="w-16 h-16 rounded-full bg-paper-warm border-2 border-brass flex items-center justify-center mx-auto mb-6 text-maroon-deep shadow-sm">
          <Heart className="w-8 h-8 fill-maroon-temple text-maroon-temple animate-pulse" />
        </div>

        {/* Exact Required Title */}
        <h3 className="font-serif text-2xl sm:text-3xl font-bold text-maroon-deep mb-2">
          {rsvpConfirmation.title}
        </h3>

        {/* Exact Required Subtitle */}
        <p className="text-sm font-semibold uppercase tracking-widest text-maroon-temple mb-4">
          {rsvpConfirmation.subtitle}
        </p>

        <div className="w-16 h-0.5 bg-brass mx-auto mb-6" />

        {/* Exact Required Body */}
        <p className="text-ink/85 text-base sm:text-lg leading-relaxed mb-6 font-light">
          {rsvpConfirmation.body}
        </p>

        {/* Guest acknowledgment tag */}
        {submissionData && (
          <div className="inline-block px-4 py-1.5 rounded-full bg-paper-warm border border-brass/40 text-xs text-ink/75 mb-6">
            Response recorded for <strong className="text-maroon-deep">{submissionData.guest_name}</strong>
          </div>
        )}

        {/* Exact Signature */}
        <div className="font-script text-3xl sm:text-4xl text-maroon-deep mb-8">
          Yaswanth &amp; Mrudula
        </div>

        <div>
          <button
            onClick={onClose}
            className="px-8 py-3 rounded-full bg-maroon-temple hover:bg-maroon-deep text-paper text-xs uppercase tracking-widest font-semibold transition-all shadow-md border border-brass/50 cursor-pointer"
          >
            Return to Invitation
          </button>
        </div>
      </div>
    </div>
  );
}
