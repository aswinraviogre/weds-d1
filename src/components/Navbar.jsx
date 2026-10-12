import React, { useState, useEffect } from 'react';
import { Menu, X, Shield, Heart } from 'lucide-react';
import { weddingConfig } from '../config/weddingConfig';

export function Navbar({ onOpenAdmin, onReplayEnvelope, onReplayGopuram }) {
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
    { name: 'Blessings', href: '#welcome' },
    { name: 'Celebrations', href: '#celebrations' },
    { name: 'RSVP', href: '#rsvp', isHighlight: true },
  ];

  const handleReplay = onReplayGopuram || onReplayEnvelope;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-maroon-night/95 backdrop-blur-md shadow-temple border-b border-brass/35 py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Couple Monogram / Brand */}
          <a
            href="#home"
            className="group flex items-center space-x-2 text-paper focus:outline-none"
            aria-label="Yaswanth & Mrudula Wedding Home"
          >
            <div className="w-10 h-10 shrink-0 rounded-full border border-brass flex items-center justify-center bg-maroon-deep group-hover:bg-maroon-temple transition-colors shadow-xs">
              <span className="font-serif text-xs font-bold text-brass-glow tracking-wider whitespace-nowrap leading-none select-none">
                Y&amp;M
              </span>
            </div>
            <div className="hidden sm:block text-left">
              <span className="block font-serif text-base tracking-wider text-paper font-semibold group-hover:text-brass-glow transition-colors">
                Yaswanth &amp; Mrudula
              </span>
              <span className="block text-[10px] tracking-widest uppercase text-brass-soft">
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
                    ? 'px-5 py-2 rounded-full bg-maroon-temple text-paper hover:bg-maroon-deep shadow-sm border border-brass/50'
                    : 'text-paper/85 hover:text-brass-glow relative py-1 after:content-[""] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1.5px] after:bg-brass hover:after:w-full after:transition-all after:duration-300'
                }`}
              >
                {link.name}
              </a>
            ))}

            {/* Gopuram Gateway Replay Button */}
            <button
              onClick={handleReplay}
              className="inline-flex items-center space-x-1.5 text-xs uppercase tracking-wider text-brass-soft hover:text-brass-glow transition-colors px-3 py-1.5 rounded-full border border-brass/50 hover:border-brass bg-maroon-deep/70 hover:bg-maroon-temple cursor-pointer"
              title="View Sacred Temple Gateway Invitation"
            >
              <span>🛕</span>
              <span className="hidden lg:inline">Temple Gateway</span>
            </button>

            {/* Admin Dashboard shortcut */}
            <button
              onClick={onOpenAdmin}
              className="text-paper/50 hover:text-brass transition-colors p-1.5 rounded-full hover:bg-maroon-deep cursor-pointer"
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
              className="text-xs uppercase tracking-wider font-semibold px-4 py-1.5 rounded-full bg-maroon-temple text-paper shadow-xs border border-brass/40"
            >
              RSVP
            </a>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-paper hover:text-brass focus:outline-none"
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-3 rounded-2xl bg-maroon-night/95 border border-brass/40 backdrop-blur-xl p-4 shadow-2xl animate-fade-in">
            <nav className="flex flex-col space-y-3">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`text-xs uppercase tracking-wider font-medium px-4 py-2.5 rounded-xl transition-colors ${
                    link.isHighlight
                      ? 'bg-maroon-temple text-paper text-center font-bold border border-brass/40'
                      : 'text-paper/85 hover:bg-maroon-deep hover:text-brass-glow'
                  }`}
                >
                  {link.name}
                </a>
              ))}

              <div className="pt-2 border-t border-brass/20 flex items-center justify-between">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    if (handleReplay) handleReplay();
                  }}
                  className="inline-flex items-center space-x-1.5 text-xs text-brass-soft px-3 py-1.5 rounded-full bg-maroon-deep border border-brass/40"
                >
                  <span>🛕</span>
                  <span>Temple Gateway</span>
                </button>

                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    if (onOpenAdmin) onOpenAdmin();
                  }}
                  className="inline-flex items-center space-x-1.5 text-xs text-paper/60 px-3 py-1.5"
                >
                  <Shield className="w-3.5 h-3.5 text-brass" />
                  <span>Admin</span>
                </button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
