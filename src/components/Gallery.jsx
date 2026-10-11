import React, { useState } from 'react';
import { Sparkles, X, ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react';
import { weddingConfig } from '../config/weddingConfig';

export function Gallery() {
  const { galleryImages } = weddingConfig;
  const [activeImageIndex, setActiveImageIndex] = useState(null);

  const openLightbox = (index) => {
    setActiveImageIndex(index);
  };

  const closeLightbox = () => {
    setActiveImageIndex(null);
  };

  const prevImage = (e) => {
    e.stopPropagation();
    setActiveImageIndex((prev) => (prev > 0 ? prev - 1 : galleryImages.length - 1));
  };

  const nextImage = (e) => {
    e.stopPropagation();
    setActiveImageIndex((prev) => (prev < galleryImages.length - 1 ? prev + 1 : 0));
  };

  return (
    <section id="gallery" className="py-24 px-4 sm:px-6 lg:px-8 bg-ivory-50 relative">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 px-4 py-1 rounded-full bg-gold-100 border border-gold-300 text-gold-deep text-xs font-semibold uppercase tracking-[0.2em] mb-4">
            <Sparkles className="w-3.5 h-3.5 text-gold-rich" />
            <span>Captured Moments</span>
          </div>
          <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold text-maroon-royal mb-3">
            Photo Gallery
          </h2>
          <div className="w-20 h-0.5 bg-gold-rich mx-auto mb-4" />
          <p className="text-stone-600 text-sm sm:text-base font-light">
            Glimpses of love, laughter, and timeless celebrations as we count down to our wedding day.
          </p>
        </div>

        {/* Responsive Image Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {galleryImages.map((img, idx) => (
            <div
              key={img.id}
              onClick={() => openLightbox(idx)}
              className="group relative cursor-pointer overflow-hidden rounded-2xl luxury-border-card bg-cream-light aspect-[3/4] shadow-md hover:shadow-2xl transition-all"
            >
              <img
                src={img.url}
                alt={img.caption}
                loading="lazy"
                className="w-full h-full object-cover object-top transform group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-maroon-900/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-4">
                <div className="bg-cream-light/90 backdrop-blur-md px-4 py-2 rounded-full border border-gold-rich text-center transform translate-y-2 group-hover:translate-y-0 transition-transform">
                  <div className="flex items-center space-x-1.5 text-xs font-serif font-bold text-maroon-royal">
                    <ZoomIn className="w-3.5 h-3.5 text-gold-deep" />
                    <span>View Photo</span>
                  </div>
                </div>
              </div>

              {/* Caption pill */}
              <div className="absolute bottom-3 left-3 bg-stone-900/70 backdrop-blur-sm px-3 py-1 rounded-full text-[11px] text-stone-200">
                {img.tag}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Fullscreen Lightbox Modal */}
      {activeImageIndex !== null && (
        <div
          onClick={closeLightbox}
          className="fixed inset-0 z-50 bg-stone-950/90 backdrop-blur-md flex items-center justify-center p-4"
        >
          {/* Close button */}
          <button
            onClick={closeLightbox}
            className="absolute top-6 right-6 p-2 text-stone-300 hover:text-white bg-stone-800/60 rounded-full transition-colors z-10"
            aria-label="Close photo viewer"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Previous image */}
          <button
            onClick={prevImage}
            className="absolute left-4 sm:left-8 p-3 text-stone-300 hover:text-white bg-stone-800/60 rounded-full transition-colors z-10"
            aria-label="Previous photo"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Current Image */}
          <div
            onClick={(e) => e.stopPropagation()}
            className="max-w-4xl max-h-[85vh] flex flex-col items-center"
          >
            <img
              src={galleryImages[activeImageIndex].url}
              alt={galleryImages[activeImageIndex].caption}
              className="max-h-[75vh] w-auto max-w-full rounded-xl object-contain border border-gold-rich/40 shadow-2xl"
            />
            <p className="font-serif text-lg text-cream-light mt-4 tracking-wide text-center">
              {galleryImages[activeImageIndex].caption}
            </p>
          </div>

          {/* Next image */}
          <button
            onClick={nextImage}
            className="absolute right-4 sm:right-8 p-3 text-stone-300 hover:text-white bg-stone-800/60 rounded-full transition-colors z-10"
            aria-label="Next photo"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      )}
    </section>
  );
}
