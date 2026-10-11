import React from 'react';
import { Heart, Sparkles } from 'lucide-react';
import { weddingConfig } from '../config/weddingConfig';

export function OurStory() {
  const { ourStory, couple } = weddingConfig;

  return (
    <section id="story" className="py-24 px-4 sm:px-6 lg:px-8 bg-ivory-100/50 relative">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 px-4 py-1 rounded-full bg-gold-100 border border-gold-300 text-gold-deep text-xs font-semibold uppercase tracking-[0.2em] mb-4">
            <Heart className="w-3.5 h-3.5 fill-gold-rich text-gold-rich" />
            <span>How Our Forever Began</span>
          </div>
          <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold text-maroon-royal mb-3">
            Our Story
          </h2>
          <div className="w-20 h-0.5 bg-gold-rich mx-auto mb-4" />
          <p className="text-stone-600 text-sm sm:text-base font-light">
            Every love story is beautiful, but ours is our favorite. Here are a few cherished chapters along our path to forever.
          </p>
        </div>

        {/* Story Timeline Chapters */}
        <div className="space-y-16">
          {ourStory.map((item, index) => {
            const isEven = index % 2 === 0;

            return (
              <div
                key={item.chapter}
                className={`flex flex-col lg:flex-row items-center gap-8 lg:gap-14 ${
                  isEven ? '' : 'lg:flex-row-reverse'
                }`}
              >
                {/* Image Placeholder */}
                <div className="w-full lg:w-1/2">
                  <div className="relative rounded-3xl overflow-hidden luxury-border-card group max-w-lg mx-auto">
                    <img
                      src={item.image}
                      alt={item.title}
                      loading="lazy"
                      className="w-full h-80 sm:h-96 object-cover object-top transform group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-stone-900/20 group-hover:bg-transparent transition-colors" />
                    <div className="absolute top-4 left-4 bg-cream-light/90 px-3 py-1 rounded-full border border-gold-200 text-xs font-serif font-bold text-maroon-royal">
                      {item.year}
                    </div>
                  </div>
                </div>

                {/* Narrative Text */}
                <div className="w-full lg:w-1/2 text-center lg:text-left">
                  <span className="text-xs uppercase tracking-[0.25em] text-gold-deep font-semibold block mb-2">
                    {item.chapter}
                  </span>
                  <h3 className="font-serif text-3xl sm:text-4xl font-bold text-maroon-royal mb-4">
                    {item.title}
                  </h3>
                  <div className={`w-12 h-0.5 bg-gold-champagne mb-4 ${isEven ? 'mx-auto lg:mx-0' : 'mx-auto lg:mx-0'}`} />
                  <p className="text-stone-600 text-base sm:text-lg leading-relaxed font-light">
                    {item.snippet}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
