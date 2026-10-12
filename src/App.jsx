import React, { useState, useEffect } from 'react';
import { GopuramOpening } from './components/GopuramOpening';
import { AmbientParticles } from './components/AmbientParticles';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { DivineBlessing } from './components/DivineBlessing';
import { Welcome } from './components/Welcome';
import { EventTimeline } from './components/EventTimeline';
import { RsvpForm } from './components/RsvpForm';
import { SuccessModal } from './components/SuccessModal';
import { AdminDashboard } from './components/AdminDashboard';
import { AudioPlayer } from './components/AudioPlayer';
import { Footer } from './components/Footer';

export function App() {
  const [preselectedEventId, setPreselectedEventId] = useState(null);
  const [successSubmissionData, setSuccessSubmissionData] = useState(null);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);
  const [isGopuramOpen, setIsGopuramOpen] = useState(true);

  // Check URL pathname or hash for admin shortcut
  useEffect(() => {
    if (window.location.pathname === '/admin' || window.location.hash === '#admin') {
      setIsAdminModalOpen(true);
      setIsGopuramOpen(false);
    }
  }, []);

  // Lock body scroll when Temple Gopuram gateway is open
  useEffect(() => {
    if (isGopuramOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isGopuramOpen]);

  const handlePreselectEvent = (eventId) => {
    setPreselectedEventId(eventId);
  };

  const handleRsvpSuccess = (submissionData) => {
    setSuccessSubmissionData(submissionData);
    setIsSuccessModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#240609] text-[#FFF6D8] flex flex-col font-sans selection:bg-[#C9922F] selection:text-[#2A0B0E] relative overflow-x-hidden">
      {/* 0. Full Immersive Wedding Background Canvas (Deep royal silk, Nilavilakku, Banana leaf & Jasmine petals) */}
      <div 
        className="fixed inset-0 z-0 pointer-events-none overflow-hidden" 
        aria-hidden="true"
      >
        {/* Background Image Layer */}
        <div 
          className="absolute inset-0 bg-cover bg-center sm:bg-top bg-no-repeat transition-transform duration-1000 ease-out"
          style={{ 
            backgroundImage: `url('/images/wedding-bg.jpg')`,
            backgroundColor: '#240609',
          }}
        />
        {/* Atmospheric Rich Tint Overlay ensuring optimal contrast & reading clarity across all content */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#180406]/55 via-[#2A080C]/25 to-[#160405]/70" />
        {/* Soft Vignette for Seamless Edge Bleed across ultra-wide monitors */}
        <div className="absolute inset-0 shadow-[inset_0_0_120px_rgba(15,2,4,0.75)]" />
      </div>

      {/* 1. Ambient Floating Golden Embers & Jasmine Flower Petals Layer */}
      <div className="relative z-10 pointer-events-none">
        <AmbientParticles />
      </div>

      {/* 2. Majestic Temple Tower (Gopuram) Gateway Reveal Experience */}
      <GopuramOpening
        isOpen={isGopuramOpen}
        onComplete={() => setIsGopuramOpen(false)}
        onSkip={() => setIsGopuramOpen(false)}
      />

      {/* 3. Fixed Luxury Navigation Header */}
      <Navbar
        onOpenAdmin={() => setIsAdminModalOpen(true)}
        onReplayGopuram={() => setIsGopuramOpen(true)}
      />

      <main className="flex-1 relative z-20">
        {/* 4. Hero Section with Prominent Couple Names (Yaswanth & Mrudula) & Live Countdown */}
        <Hero />

        {/* 5. Auspicious Divine Blessings - Subtle Sacred Emblem Logo Insert */}
        <DivineBlessing />

        {/* 6. Welcome Message & Family Blessings in Paper-Cut Card (Single Couple Portrait) */}
        <Welcome />

        {/* 7. Five Wedding Celebration Event Cards with Themed Illustrations */}
        <EventTimeline onSelectEventRsvp={handlePreselectEvent} />

        {/* 8. Multi-Event RSVP Form with 5 Separate Event Options */}
        <RsvpForm
          preselectedEventId={preselectedEventId}
          onSuccessSubmission={handleRsvpSuccess}
        />
      </main>

      {/* 9. Footer with Non-Breaking Y & M Royal Seal Emblem */}
      <Footer />

      {/* 10. Success Confirmation Modal */}
      <SuccessModal
        isOpen={isSuccessModalOpen}
        onClose={() => setIsSuccessModalOpen(false)}
        submissionData={successSubmissionData}
      />

      {/* 11. Private Couple Admin Dashboard Modal */}
      <AdminDashboard
        isOpen={isAdminModalOpen}
        onClose={() => setIsAdminModalOpen(false)}
      />

      {/* 12. Ambient Indian Wedding Instrumental Audio Player */}
      <AudioPlayer />
    </div>
  );
}

export default App;
