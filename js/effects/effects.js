/**
 * Main Effects Module
 * Imports and initializes all visual effects
 */

import NoiseOverlay from './noise-overlay.js';
import GradientBlobs from './gradient-blobs.js';
import TextAnimations from './text-animations.js';

/**
 * Initialize all visual effects
 * @param {Object} options - Configuration options
 */
const initEffects = (options = {}) => {
  // Default options
  const defaultOptions = {
    noise: {
      enabled: true,
      opacity: 0.25,      // Increased opacity for better visibility
      speed: 0.8,         // Increased speed for more dynamic movement
      fps: 24,            // Frames per second (film-like grain)
      grayscale: true,    // Use grayscale noise
      size: 2,            // Increased size of noise particles
      dynamicDensity: true // Dynamic grain density
    },
    blobs: {
      enabled: true,
      count: 7,           // Increased number of blobs
      opacity: 0.4,       // 40% as requested
      minSize: 400,       // Increased minimum blob size
      maxSize: 1000,      // Increased maximum blob size
      minDuration: 12,    // Faster minimum animation duration
      maxDuration: 30,    // Faster maximum animation duration
      colors: [           // Gradient colors with more vibrant options
        ['#ffb870', '#ff8c42'],            // Orange (from site's color scheme)
        ['#8a6f4d', '#5a4a3a'],           // Brown (from site's color scheme)
        ['#f8f5f0', '#d9d0c7'],           // Light (from site's color scheme)
        ['#1a1714', '#3a332e'],           // Dark (from site's color scheme)
        ['#ff6b6b', '#ff8e8e'],           // Red (added for more vibrancy)
        ['#6b88ff', '#a2b9ff']            // Blue (added for more vibrancy)
      ],
      zIndex: -1          // Behind content but above background
    },
    textAnimations: {
      enabled: true,
      titleSelector: '.content__title-main, h2, h4',
      paragraphSelector: '.content__text, p:not(.type-tiny)',
      smallTextSelector: '.type-tiny',
      staggerAmount: 0.05,
      animationDuration: 1.2,
      ease: 'power3.out'
    }
  };

  // Merge user options with defaults
  const mergedOptions = {
    noise: { ...defaultOptions.noise, ...(options.noise || {}) },
    blobs: { ...defaultOptions.blobs, ...(options.blobs || {}) },
    textAnimations: { ...defaultOptions.textAnimations, ...(options.textAnimations || {}) }
  };

  // Store instances
  const instances = {};

  // Initialize noise overlay
  if (mergedOptions.noise.enabled) {
    instances.noiseOverlay = new NoiseOverlay(mergedOptions.noise);
  }

  // Initialize gradient blobs
  if (mergedOptions.blobs.enabled) {
    instances.gradientBlobs = new GradientBlobs(mergedOptions.blobs);
  }

  // Initialize text animations
  if (mergedOptions.textAnimations.enabled) {
    instances.textAnimations = new TextAnimations(mergedOptions.textAnimations);
  }

  // Return instances for potential external control
  return instances;
};

export default initEffects;
