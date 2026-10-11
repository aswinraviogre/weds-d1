import React, { useEffect } from 'react';
import { Heart, Sparkles, Check, X } from 'lucide-react';
import confetti from 'canvas-confetti';
import { weddingConfig } from '../config/weddingConfig';

export function SuccessModal({ isOpen, onClose, submissionData }) {
  const { rsvpConfirmation, couple } = weddingConfig;

  useEffect(() => {
    if (isOpen) {
      // Fire celebratory confetti in gold, maroon, and champagne colors
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#D4AF37', '#5A1827', '#E5C992', '#8FA58C'],
        });
      } catch (err) {
        // Safe fallback if canvas not available
      }
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/70 backdrop-blur-sm animate-fade-in">
      <div
        className="relative w-full max-w-lg bg-cream-light rounded-3xl p-8 sm:p-12 text-center border-2 border-gold-rich shadow-luxury"
        role="dialog"
        aria-modal="true"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-stone-400 hover:text-stone-700 rounded-full hover:bg-gold-50 transition-colors"
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
        <div className="w-16 h-16 rounded-full bg-gold-100/80 border-2 border-gold-rich flex items-center justify-center mx-auto mb-6 text-maroon-royal shadow-sm">
          <Heart className="w-8 h-8 fill-maroon-royal animate-pulse" />
        </div>

        {/* Exact Required Title */}
        <h3 className="font-serif text-2xl sm:text-3xl font-bold text-maroon-royal mb-2">
          {rsvpConfirmation.title}
        </h3>

        {/* Exact Required Subtitle */}
        <p className="text-sm font-semibold uppercase tracking-widest text-gold-deep mb-4">
          {rsvpConfirmation.subtitle}
        </p>

        <div className="w-16 h-0.5 bg-gold-rich mx-auto mb-6" />

        {/* Exact Required Body */}
        <p className="text-stone-700 text-base sm:text-lg leading-relaxed mb-6 font-light">
          {rsvpConfirmation.body}
        </p>

        {/* Guest acknowledgment tag */}
        {submissionData && (
          <div className="inline-block px-4 py-1.5 rounded-full bg-gold-50 border border-gold-200 text-xs text-stone-600 mb-6">
            Response recorded for <strong className="text-maroon-royal">{submissionData.guest_name}</strong>
          </div>
        )}

        {/* Exact Required Signature */}
        <div className="font-script text-3xl sm:text-4xl text-maroon-royal mb-8">
          Yaswanth Sai &amp; Lakshmi Mrudula
        </div>

        <div>
          <button
            onClick={onClose}
            className="px-8 py-3 rounded-full bg-maroon-royal hover:bg-maroon-800 text-ivory-50 text-xs uppercase tracking-widest font-semibold transition-all shadow-md"
          >
            Return to Invitation
          </button>
        </div>
      </div>
    </div>
  );
}
