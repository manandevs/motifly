/**
 * Every photo used on the landing page, in one place so they're easy to swap.
 * Files live in /public/landing, pre-cropped to their display shape at 2x.
 * All are from Unsplash (free to use under the Unsplash License); the source photo ID is noted on each.
 */
export const landingImages = {
  // unsplash.com/photos/givcN8x9B7k
  heroChip: { src: "/landing/hero-chip.jpg", alt: "Woman holding a bunch of pink roses" },
  strip: [
    // unsplash.com/photos/cFufeCC4y8U
    { src: "/landing/strip-1-pink-roses.jpg", alt: "Woman holding pink roses in front of her face" },
    // unsplash.com/photos/lT8eFqDQVuA
    { src: "/landing/strip-2-wavy-hair.jpg", alt: "Portrait of a woman with long wavy hair" },
    // unsplash.com/photos/cVEP3GTNVNI
    { src: "/landing/strip-3-warm-portrait.jpg", alt: "Portrait of a woman in warm light" },
    // unsplash.com/photos/Kt8eGw8_S8Y
    { src: "/landing/strip-4-dark-suit.jpg", alt: "Man in a dark suit in low light" },
  ],
  // unsplash.com/photos/u9xSgKlBpYQ
  featureCard: { src: "/landing/feature-card.jpg", alt: "Woman in a red dress on salt flats at sunset" },
  // unsplash.com/photos/GX8KBbVmC6c
  howItWorks: { src: "/landing/how-it-works.jpg", alt: "Woman looking at books between library shelves" },
  // unsplash.com/photos/C4lIb1qWte8
  privacy: { src: "/landing/privacy.jpg", alt: "Woman holding red roses in front of her face" },
} as const;
