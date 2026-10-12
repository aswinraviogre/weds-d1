import React, { useState, useEffect } from 'react';
import { EnvelopeOpening } from './components/EnvelopeOpening';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { DivineBlessing } from './components/DivineBlessing';
import { Welcome } from './components/Welcome';
import { EventTimeline } from './components/EventTimeline';
import { OurStory } from './components/OurStory';
import { Gallery } from './components/Gallery';
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
  const [isEnvelopeOpen, setIsEnvelopeOpen] = useState(true);

  // Check URL pathname or hash for admin shortcut
  useEffect(() => {
    if (window.location.pathname === '/admin' || window.location.hash === '#admin') {
      setIsAdminModalOpen(true);
      setIsEnvelopeOpen(false);
    }
  }, []);

  // Lock body scroll when royal envelope is open
  useEffect(() => {
    if (isEnvelopeOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isEnvelopeOpen]);

  const handlePreselectEvent = (eventId) => {
    setPreselectedEventId(eventId);
  };

  const handleRsvpSuccess = (submissionData) => {
    setSuccessSubmissionData(submissionData);
    setIsSuccessModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-ivory-50 text-stone-800 flex flex-col font-sans selection:bg-gold-200 selection:text-maroon-900">
      {/* Royal 3D Wedding Envelope Opening Experience */}
      <EnvelopeOpening
        isOpen={isEnvelopeOpen}
        onComplete={() => setIsEnvelopeOpen(false)}
        onSkip={() => setIsEnvelopeOpen(false)}
      />

      {/* Fixed Luxury Navigation Header */}
      <Navbar
        onOpenAdmin={() => setIsAdminModalOpen(true)}
        onReplayEnvelope={() => setIsEnvelopeOpen(true)}
      />

      <main className="flex-1">
        {/* 1. Hero Section with Prominent Couple Names & Live Countdown */}
        <Hero />

        {/* Auspicious Divine Blessings in Golden Frame */}
        <DivineBlessing />

        {/* 2. Welcome Message & Family Blessings */}
        <Welcome />

        {/* 3. Three Wedding Celebration Event Cards with Maps, ICS & RSVP Triggers */}
        <EventTimeline onSelectEventRsvp={handlePreselectEvent} />

        {/* 4. Our Story Section */}
        <OurStory />

        {/* 5. Photo Gallery with Fullscreen Lightbox */}
        <Gallery />

        {/* 6. Multi-Event RSVP Form */}
        <RsvpForm
          preselectedEventId={preselectedEventId}
          onSuccessSubmission={handleRsvpSuccess}
        />
      </main>

      {/* 7. Footer */}
      <Footer />

      {/* 8. Success Confirmation Modal (Confetti + Romantic Blessings) */}
      <SuccessModal
        isOpen={isSuccessModalOpen}
        onClose={() => setIsSuccessModalOpen(false)}
        submissionData={successSubmissionData}
      />

      {/* 9. Private Couple Admin Dashboard Modal */}
      <AdminDashboard
        isOpen={isAdminModalOpen}
        onClose={() => setIsAdminModalOpen(false)}
      />

      {/* 10. Ambient Indian Wedding Instrumental Audio Player */}
      <AudioPlayer />
    </div>
  );
}

export default App;
