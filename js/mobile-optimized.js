// Mobile optimization script

// Detect if the device is mobile
const isMobile = () => {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || 
         window.innerWidth < 768;
};

// Optimize smooth scrolling for mobile
const optimizeSmoothScrolling = () => {
  if (isMobile()) {
    // If Lenis is already initialized, get the instance
    const lenisInstance = window.lenis;
    
    if (lenisInstance) {
      // Adjust Lenis settings for mobile
      lenisInstance.options.lerp = 0.08; // Lower lerp value for less aggressive smoothing
      lenisInstance.options.smoothWheel = false; // Disable smooth wheel on mobile
      lenisInstance.options.smoothTouch = true; // Enable smooth touch
      lenisInstance.options.touchMultiplier = 1.5; // Adjust touch sensitivity
    }
    
    // Optimize GSAP animations for mobile
    gsap.ticker.lagSmoothing(false); // Disable lag smoothing completely on mobile
    
    // Disable pinning on mobile for better performance
    const pinSpacer = document.querySelectorAll('.pin-spacer');
    if (pinSpacer) {
      pinSpacer.forEach(spacer => {
        // Remove pin-spacer styling
        const content = spacer.querySelector(':scope > *:not(.pin-spacer)');
        if (content) {
          content.style.transform = 'none';
          content.style.position = 'relative';
          content.style.top = '0';
          content.style.left = '0';
        }
      });
    }
    
    // Refresh ScrollTrigger to apply changes
    ScrollTrigger.refresh(true);
  }
};

// Optimize grid animations for mobile
const optimizeGridAnimations = () => {
  if (isMobile()) {
    // Get all grid elements
    const grids = document.querySelectorAll('.grid');
    
    grids.forEach(grid => {
      // Remove transform styles that might cause layout issues
      const gridImages = grid.querySelectorAll('.grid__img');
      gridImages.forEach(img => {
        img.style.transform = 'none';
        img.style.position = 'relative';
        img.style.opacity = '1';
        img.style.visibility = 'visible';
      });
      
      // Disable 3D effects on mobile
      grid.style.perspective = 'none';
    });
    
    // Simplify animations for better performance
    const simplifyScrollTriggers = () => {
      ScrollTrigger.getAll().forEach(trigger => {
        // Modify existing ScrollTrigger instances
        if (trigger.pin) {
          // Disable pinning on mobile
          trigger.disable();
          trigger.kill();
        }
      });
    };
    
    // Call after a short delay to ensure all ScrollTriggers are created
    setTimeout(simplifyScrollTriggers, 500);
  }
};

// Fix viewport issues on mobile
const fixViewportIssues = () => {
  // Fix the visual viewport issues on mobile
  const setViewportHeight = () => {
    // Set a CSS variable with the viewport height
    document.documentElement.style.setProperty('--vh', `${window.innerHeight * 0.01}px`);
  };
  
  // Set on initial load
  setViewportHeight();
  
  // Update on resize
  window.addEventListener('resize', setViewportHeight);
  
  // Update on orientation change
  window.addEventListener('orientationchange', () => {
    // Small delay to ensure the browser has updated the viewport dimensions
    setTimeout(setViewportHeight, 100);
  });
};

// Improve touch interactions
const improveTouchInteractions = () => {
  if (isMobile()) {
    // Add touch-specific classes
    document.body.classList.add('is-touch-device');
    
    // Increase touch target sizes
    const touchTargets = document.querySelectorAll('a, button, .service-expand-btn, .cta-button');
    touchTargets.forEach(target => {
      target.style.minHeight = '44px';
      target.style.minWidth = '44px';
      target.style.padding = '12px';
    });
    
    // Improve scrolling on touch devices
    document.addEventListener('touchmove', (e) => {
      // Allow default scrolling behavior
    }, { passive: true });
  }
};

// Initialize all mobile optimizations
const initMobileOptimizations = () => {
  optimizeSmoothScrolling();
  optimizeGridAnimations();
  fixViewportIssues();
  improveTouchInteractions();
  
  // Log that mobile optimizations have been applied
  if (isMobile()) {
    console.log('Mobile optimizations applied');
  }
};

// Run optimizations after page load
window.addEventListener('DOMContentLoaded', initMobileOptimizations);

// Also run after a short delay to catch any dynamically created elements
setTimeout(initMobileOptimizations, 1000);
