// Initializes smooth scrolling with Lenis and integrates it with GSAP's ScrollTrigger.
// Function to set up smooth scrolling.
const initSmoothScrolling = () => {
  // Detect if the device is mobile
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || 
                   window.innerWidth < 768;
  
  // Initialize Lenis with different settings based on device type
  const lenis = new Lenis({ 
    lerp: isMobile ? 0.08 : 0.15,      // Lower lerp value for mobile for less aggressive smoothing
    smoothWheel: !isMobile,            // Disable smooth wheel on mobile
    smoothTouch: true,                 // Enable smooth touch for all devices
    touchMultiplier: isMobile ? 1.5 : 1 // Adjust touch sensitivity for mobile
  });
  
  // Make lenis instance globally accessible
  window.lenis = lenis;
  
  // Sync ScrollTrigger with Lenis' scroll updates.
  lenis.on('scroll', ScrollTrigger.update);
  
  // Ensure GSAP animations are in sync with Lenis' scroll frame updates.
  gsap.ticker.add(time => {
    lenis.raf(time * 1000); // Convert GSAP's time to milliseconds for Lenis.
  });
  
  // Adjust lag smoothing based on device
  if (isMobile) {
    gsap.ticker.lagSmoothing(false); // Disable lag smoothing completely on mobile
  } else {
    gsap.ticker.lagSmoothing(0);     // Standard setting for desktop
  }
  
  // Add event listener for orientation change on mobile
  if (isMobile) {
    window.addEventListener('orientationchange', () => {
      // Refresh ScrollTrigger after orientation change
      setTimeout(() => {
        ScrollTrigger.refresh(true);
      }, 200);
    });
  }
};

// Activate the smooth scrolling feature.
initSmoothScrolling();
