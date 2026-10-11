/**
 * Central Wedding Configuration
 * Couple: Yaswanth Sai & Lakshmi Mrudula
 * Dates: November 19, 20, and 21, 2026
 * Timezone: America/Chicago (Central Time)
 */

export const weddingConfig = {
  couple: {
    groom: "Yaswanth Sai",
    groomShort: "Yash",
    bride: "Lakshmi Mrudula",
    brideShort: "Mrudula",
    fullName: "Yaswanth Sai & Lakshmi Mrudula",
    monogram: "Y & M",
    hashtag: "#YashWedsMrudula",
    email: "yash.mrudula@gmail.com",
    datesSummary: "November 19–21, 2026",
    locationSummary: "Texas, USA",
    tagline: "Three Days. Beautiful Traditions. A Lifetime of Love.",
  },

  timezone: {
    name: "America/Chicago",
    label: "Central Time (CT)",
    utcOffsetHours: -6, // CST is UTC-6
  },

  countdown: {
    targetIso: "2026-11-21T11:05:00-06:00",
    eventLabel: "Wedding Muhurtham Ceremony",
  },

  welcome: {
    title: "A Celebration of Love & Tradition",
    subtitle: "With the Blessings of Our Families",
    message:
      "With the blessings of our families and the love of those closest to our hearts, we invite you to join us as we begin our journey together.\n\nFrom joyful celebrations and cherished traditions to the moment we say 'I do,' we would be delighted to have you with us for these special days.\n\nYour presence will make our celebration even more meaningful.",
  },

  hero: {
    salutation: "Together with our families",
    subSalutation: "JOYFULLY INVITE YOU TO CELEBRATE THEIR WEDDING",
    dates: "November 19–21, 2026",
    location: "Texas, USA",
    tagline: "Three Days. Beautiful Traditions. A Lifetime of Love.",
  },

  rsvpConfirmation: {
    title: "Thank You for Being Part of Our Journey!",
    subtitle: "Your RSVP has been received successfully.",
    body: "We are so happy to share these special moments with you and look forward to celebrating together.",
    signature: "With love,\nYaswanth Sai & Lakshmi Mrudula",
  },

  footer: {
    line1: "Yaswanth Sai & Lakshmi Mrudula",
    line2: "November 19–21, 2026",
    blessing: "With love, we look forward to celebrating with you.",
    traditionText: "Om Sri Ganeshaya Namaha • Shubh Vivah",
  },

  // 4 Celebration Events with complete details and visual styling
  events: [
    {
      id: "mehendi_sangeeth",
      number: "01",
      title: "Mehendi & Sangeeth",
      subTitle: "Intricate Henna, Musical Extravaganza & Dance Celebration",
      dateLabel: "Thursday, November 19, 2026",
      dateIso: "2026-11-19",
      time: "5:30 PM onwards",
      scheduleNote: "Mehendi: 5:30 PM–8:00 PM • Sangeeth & Dinner: 8:00 PM onwards",
      startIso: "2026-11-19T17:30:00-06:00",
      endIso: "2026-11-19T23:30:00-06:00",
      venue: "Sahvana Ranch",
      address: "752 JC Mapels Rd, Gunter, TX",
      mapQuery: "Sahvana Ranch, 752 JC Mapels Rd, Gunter, TX",
      mapsUrl: "https://www.google.com/maps/search/?api=1&query=752+JC+Mapels+Rd,+Gunter,+TX",
      description: "A magical evening blending the beauty of henna artistry and folk beats, followed by a glamorous high-energy Sangeeth with family dance performances, cocktails, and dancing under the stars.",
      attire: "Festive & Colorful Indian / Shimmering Lehengas, Kurtas & Sherwanis (Teals, Emeralds & Jewel Tones)",
      themeAccent: "emerald",
      badgeColor: "bg-emerald-100 text-emerald-800 border-emerald-300",
      badgeText: "Henna, Music & Dance Celebration",
      image: "/images/couple_festive_home.jpg",
    },
    {
      id: "haldi",
      number: "02",
      title: "Haldi",
      subTitle: "Golden Turmeric Blessings & Splashes",
      dateLabel: "Friday, November 20, 2026",
      dateIso: "2026-11-20",
      time: "10:30 AM",
      startIso: "2026-11-20T10:30:00-06:00",
      endIso: "2026-11-20T13:00:00-06:00",
      venue: "Sahvana Ranch",
      address: "752 JC Mapels Rd, Gunter, TX",
      mapQuery: "Sahvana Ranch, 752 JC Mapels Rd, Gunter, TX",
      mapsUrl: "https://www.google.com/maps/search/?api=1&query=752+JC+Mapels+Rd,+Gunter,+TX",
      description: "A joyful morning of smearing golden turmeric paste on the bride and groom for auspicious blessings, glow, and playful celebrations.",
      attire: "Sunny Yellows, Mustards, & Floral Traditional Attire",
      themeAccent: "amber",
      badgeColor: "bg-amber-100 text-amber-800 border-amber-300",
      badgeText: "Golden Morning Blessings",
      image: "/images/couple_ganesha_puja.jpg",
    },
    {
      id: "pelli_ceremony",
      number: "03",
      title: "Pelli Kuturu & Pelli Koduku",
      subTitle: "Traditional Indian Pre-Wedding Ceremony",
      dateLabel: "Friday, November 20, 2026",
      dateIso: "2026-11-20",
      time: "2:00 PM",
      startIso: "2026-11-20T14:00:00-06:00",
      endIso: "2026-11-20T17:00:00-06:00",
      venue: "Sahvana Ranch",
      address: "752 JC Mapels Rd, Gunter, TX",
      mapQuery: "Sahvana Ranch, 752 JC Mapels Rd, Gunter, TX",
      mapsUrl: "https://www.google.com/maps/search/?api=1&query=752+JC+Mapels+Rd,+Gunter,+TX",
      description: "Traditional Indian pre-wedding ceremony where elders, family, and loved ones shower blessings as the couple prepares for the sacred wedding muhurtham.",
      attire: "Traditional South Indian / Elegant Festive Silk Sarees & Dhotis",
      themeAccent: "sage",
      badgeColor: "bg-stone-100 text-stone-800 border-stone-300",
      badgeText: "Sacred Pre-Wedding Rituals",
      image: "/images/couple_ganesha_puja.jpg",
    },
    {
      id: "wedding_ceremony",
      number: "04",
      title: "Wedding Ceremony",
      subTitle: "The Sacred Muhurtham & Seven Vows",
      dateLabel: "Saturday, November 21, 2026",
      dateIso: "2026-11-21",
      time: "11:05 AM",
      startIso: "2026-11-21T11:05:00-06:00",
      endIso: "2026-11-21T14:30:00-06:00",
      venue: "Lotus Spring Ranch",
      address: "4253 County Road 412, McKinney, TX 75071",
      mapQuery: "Lotus Spring Ranch, 4253 County Road 412, McKinney, TX 75071",
      mapsUrl: "https://www.google.com/maps/search/?api=1&query=4253+County+Road+412,+McKinney,+TX+75071",
      description: "The auspicious Telugu wedding muhurtham at 11:05 AM, Jeelakarra Bellam, Kanyadaan, Mangalsutra dharana, Saptapadi (seven sacred vows around the holy agni), and wedding luncheon feast.",
      attire: "Grand Traditional Indian Formal / Regal Kanjeevarams, Sherwanis & Suits",
      themeAccent: "maroon",
      badgeColor: "bg-maroon-100 text-maroon-800 border-maroon-300 font-semibold",
      badgeText: "Grand Wedding Muhurtham (Main Event)",
      isMainEvent: true,
      image: "/images/couple_traditional_portrait.jpg",
    },
  ],

  ourStory: [
    {
      chapter: "Chapter I",
      title: "When Two Worlds Met",
      year: "The Beginning",
      snippet: "A fateful meeting brought us together. What began with heartfelt conversations soon grew into a companionship rooted in laughter, shared values, and deep understanding.",
      image: "/images/couple_festive_home.jpg",
    },
    {
      chapter: "Chapter II",
      title: "Countless Adventures & Memories",
      year: "Growing Together",
      snippet: "From spontaneous weekend road trips to cheering on favorite sports and celebrating family traditions together, every moment affirmed that we were meant to navigate life hand-in-hand.",
      image: "/images/couple_ganesha_puja.jpg",
    },
    {
      chapter: "Chapter III",
      title: "The Golden Promise",
      year: "The Proposal",
      snippet: "Surrounded by quiet beauty and golden light, Yash asked Lakshmi the most precious question. With tears of joy and full hearts, she joyfully said yes!",
      image: "/images/couple_festive_home.jpg",
    },
    {
      chapter: "Chapter IV",
      title: "Beginning Our Forever",
      year: "November 2026",
      snippet: "Now, surrounded by our beloved family and dearest friends, we are thrilled to exchange sacred vows and step into this new chapter of eternal companionship.",
      image: "/images/couple_traditional_portrait.jpg",
    },
  ],

  galleryImages: [
    {
      id: "img1",
      url: "/images/couple_traditional_portrait.jpg",
      caption: "Yaswanth Sai & Lakshmi Mrudula — Traditional Wedding Grandeur",
      tag: "Wedding Muhurtham",
    },
    {
      id: "img2",
      url: "/images/couple_ganesha_puja.jpg",
      caption: "Sacred Pre-Wedding Puja — Sri Ganesha Blessings",
      tag: "Traditions & Puja",
    },
    {
      id: "img3",
      url: "/images/couple_festive_home.jpg",
      caption: "Cherished Moments Together — Joyful Home Festivities",
      tag: "Celebrations",
    },
  ],
};
