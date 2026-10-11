import React, { useState, useEffect } from 'react';
import { Menu, X, Shield, Heart } from 'lucide-react';
import { weddingConfig } from '../config/weddingConfig';

export function Navbar({ onOpenAdmin, onReplayEnvelope, activeSection }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Celebrations', href: '#celebrations' },
    { name: 'Our Story', href: '#story' },
    { name: 'Gallery', href: '#gallery' },
    { name: 'RSVP', href: '#rsvp', isHighlight: true },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-ivory-50/95 backdrop-blur-md shadow-sm border-b border-gold-100 py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Couple Monogram / Brand */}
          <a
            href="#home"
            className="group flex items-center space-x-2 text-stone-900 focus:outline-none"
            aria-label="Yaswanth Sai & Lakshmi Mrudula Wedding Home"
          >
            <div className="w-10 h-10 rounded-full border border-gold-rich flex items-center justify-center bg-cream-light group-hover:bg-gold-50 transition-colors shadow-xs">
              <span className="font-serif text-lg font-bold text-maroon-royal tracking-widest">
                Y&amp;M
              </span>
            </div>
            <div className="hidden sm:block text-left">
              <span className="block font-serif text-base tracking-wider text-stone-900 font-semibold group-hover:text-maroon-800 transition-colors">
                Yaswanth &amp; Lakshmi
              </span>
              <span className="block text-[10px] tracking-widest uppercase text-gold-deep">
                Nov 19–21, 2026 • Texas
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-8" aria-label="Main Navigation">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className={`text-sm tracking-wider uppercase font-medium transition-all duration-200 ${
                  link.isHighlight
                    ? 'px-5 py-2 rounded-full bg-maroon-royal text-ivory-50 hover:bg-maroon-700 shadow-sm border border-gold-rich/40'
                    : 'text-stone-700 hover:text-maroon-800 relative py-1 after:content-[""] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1.5px] after:bg-gold-rich hover:after:w-full after:transition-all after:duration-300'
                }`}
              >
                {link.name}
              </a>
            ))}

            {/* Envelope Replay Button */}
            <button
              onClick={onReplayEnvelope}
              className="inline-flex items-center space-x-1 text-xs uppercase tracking-wider text-gold-deep hover:text-maroon-800 transition-colors px-3 py-1.5 rounded-full border border-gold-300 hover:border-gold-rich bg-gold-50/60 hover:bg-gold-100"
              title="View Royal Invitation Envelope"
            >
              <span>💌</span>
              <span className="hidden lg:inline">Envelope</span>
            </button>

            {/* Admin Dashboard shortcut */}
            <button
              onClick={onOpenAdmin}
              className="text-stone-400 hover:text-gold-deep transition-colors p-1.5 rounded-full hover:bg-gold-50"
              title="Couple Admin Access"
              aria-label="Admin Dashboard Access"
            >
              <Shield className="w-4 h-4" />
            </button>
          </nav>

          {/* Mobile Right Bar (RSVP shortcut + Hamburger) */}
          <div className="flex md:hidden items-center space-x-3">
            <a
              href="#rsvp"
              className="text-xs uppercase tracking-wider font-semibold px-4 py-1.5 rounded-full bg-maroon-royal text-ivory-50 shadow-xs"
            >
              RSVP
            </a>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-md text-stone-700 hover:text-maroon-800 focus:outline-none"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-ivory-50/98 backdrop-blur-lg border-b border-gold-200 px-6 py-6 shadow-xl transition-all">
          <div className="flex flex-col space-y-4">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`text-base tracking-wider uppercase font-medium py-2 ${
                  link.isHighlight
                    ? 'text-center bg-maroon-royal text-white rounded-lg shadow-sm py-2.5'
                    : 'text-stone-800 hover:text-maroon-800 border-b border-stone-100'
                }`}
              >
                {link.name}
              </a>
            ))}
            <div className="pt-2 border-t border-gold-100 flex justify-between items-center text-xs text-stone-500">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAdmin();
                }}
                className="flex items-center space-x-1.5 text-gold-deep hover:text-maroon-800"
              >
                <Shield className="w-3.5 h-3.5" />
                <span>Admin Portal</span>
              </button>
              <span className="flex items-center space-x-1">
                <span>With Love</span>
                <Heart className="w-3 h-3 text-maroon-royal fill-maroon-royal inline" />
              </span>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
