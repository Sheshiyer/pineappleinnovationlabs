import { preloadImages } from './utils.js';
import initEffects from './effects/effects.js';

// Initialize effects
let effectsInstances;

// Function to animate the header (frame)
const animateFrame = () => {
  const frame = document.querySelector('.frame'); 
  const frameTitle = frame.querySelector('.frame__title');
  
  gsap.timeline({
    defaults: {
      ease: 'none'
    },
    scrollTrigger: {
      trigger: frame,
      start: 'clamp(top bottom)', 
      end: 'bottom top',
      scrub: true
    }
  })
  .to(frame, {
    yPercent: 35,
    scale: 0.95,
    startAt: { filter: 'brightness(100%)' },
    filter: 'brightness(30%)'
  })
  .to(frameTitle, {
    xPercent: -80
  }, 0);
};

// Function to animate the first grid
const animateFirstGrid = () => {
  const grid = document.querySelector('[data-grid-first]');
  const gridImages = grid.querySelectorAll('.grid__img');

  gsap.timeline({
    defaults: {
      ease: 'sine'
    },
    scrollTrigger: {
      trigger: grid,
      start: 'center center',
      end: '+=250%',
      pin: grid.parentNode,
      scrub: 0.5,
    }
  })
  .from(gridImages, {
    stagger: 0.07,
    y: () => gsap.utils.random(window.innerHeight, window.innerHeight * 1.8)
  })
  // text content
  .from(grid.parentNode.querySelector('.content__title'), {
    duration: 1.2,
    ease: 'power4',
    yPercent: 180,
    autoAlpha: 0
  }, 0.8);
};

// Function to animate the second grid
const animateSecondGrid = () => {
  const grid = document.querySelector('[data-grid-second]');
  const gridImages = grid.querySelectorAll('.grid__img');
  const middleIndex = Math.floor(gridImages.length / 2);

  gsap.timeline({
    defaults: {
      ease: 'power3'
    },
    scrollTrigger: {
      trigger: grid,
      start: 'center center',
      end: '+=250%',
      pin: grid.parentNode,
      scrub: 0.5,
    }
  })
  .from(gridImages, {
    stagger: {
      amount: 0.3,
      from: 'center'
    },
    y: window.innerHeight,
    transformOrigin: '50% 0%',
    rotation: pos => {
      const distanceFromCenter = Math.abs(pos - middleIndex);
      return pos < middleIndex ? distanceFromCenter * 3 : distanceFromCenter * -3;
    },
  })
  // text content
  .from(grid.querySelectorAll('.grid__item'), {
    stagger: {
      amount: 0.3,
      from: 'center'
    },
    yPercent: 100,
    autoAlpha: 0
  }, 0);
};

// Function to animate the third grid
const animateThirdGrid = () => {
  const grid = document.querySelector('[data-grid-third]');
  const gridImages = grid.querySelectorAll('.grid__img');

  gsap.timeline({
    defaults: {
      ease: 'power3'
    },
    scrollTrigger: {
      trigger: grid,
      start: 'center center',
      end: '+=200%',
      pin: grid.parentNode,
      scrub: 0.2,
    }
  })
  .from(gridImages, {
    stagger: 0.06,
    y: window.innerHeight,
    rotation: () => gsap.utils.random(-15,15),
    transformOrigin: '50% 0%'
  })
  .fromTo(gridImages, {
    filter: 'brightness(100%)'
  }, {
    ease: 'none',
    stagger: 0.06,
    filter: pos => pos < gridImages.length-1 ? 'brightness(20%)' : 'brightness(100%)'
  }, 0)
  // text content
  .from(grid.querySelectorAll('.grid__item'), {
    xPercent: pos => pos%2 ? 100 : -100,
    autoAlpha: 0
  }, 0.06*gridImages.length);
};

/**
 * Calculates the initial translation and 3D rotation of an element, moving and rotating it further away from the center of the screen.
 * The rotation and Z-axis translation are proportional to the distance from the center, with elements near the center rotating less and moving less in Z.
 * 
 * @param {Element} element - The DOM element to calculate the translation and rotation for
 * @param {Number} offsetDistance - The distance by which the element will be moved away from the center (default: 250px)
 * @param {Number} maxRotation - The maximum rotation in degrees for farthest elements (default: 300 degrees)
 * @param {Number} maxZTranslation - The maximum Z-axis translation in pixels for farthest elements (default: 2000px)
 * @returns {Object} The x, y, z translation and rotateX, rotateY values as {x, y, z, rotateX, rotateY}
 */
const calculateInitialTransform = (element, offsetDistance = 250, maxRotation = 300, maxZTranslation = 2000) => {
  const viewportCenter = { width: window.innerWidth / 2, height: window.innerHeight / 2 };
  const elementCenter = { 
    x: element.offsetLeft + element.offsetWidth / 2, 
    y: element.offsetTop + element.offsetHeight / 2 
  };

  // Calculate the angle between the center of the element and the center of the viewport
  const angle = Math.atan2(Math.abs(viewportCenter.height - elementCenter.y), Math.abs(viewportCenter.width - elementCenter.x));

  // Calculate the x and y translation based on the angle and distance
  const translateX = Math.abs(Math.cos(angle) * offsetDistance);
  const translateY = Math.abs(Math.sin(angle) * offsetDistance);

  // Calculate the maximum possible distance from the center (diagonal of the viewport)
  const maxDistance = Math.sqrt(Math.pow(viewportCenter.width, 2) + Math.pow(viewportCenter.height, 2));

  // Calculate the current distance from the center
  const currentDistance = Math.sqrt(Math.pow(viewportCenter.width - elementCenter.x, 2) + Math.pow(viewportCenter.height - elementCenter.y, 2));

  // Scale rotation and Z-translation based on distance from the center (closer elements rotate/translate less, farther ones rotate/translate more)
  const distanceFactor = currentDistance / maxDistance;

  // Calculate the rotation values based on the position relative to the center
  const rotationX = ((elementCenter.y < viewportCenter.height ? -1 : 1) * (translateY / offsetDistance) * maxRotation * distanceFactor);
  const rotationY = ((elementCenter.x < viewportCenter.width ? 1 : -1) * (translateX / offsetDistance) * maxRotation * distanceFactor);

  // Calculate the Z-axis translation (depth) based on the distance from the center
  const translateZ = maxZTranslation * distanceFactor;

  // Determine direction based on position relative to the viewport center
  return {
    x: elementCenter.x < viewportCenter.width ? -translateX : translateX,
    y: elementCenter.y < viewportCenter.height ? -translateY : translateY,
    z: translateZ,
    rotateX: rotationX,
    rotateY: rotationY
  };
};

// Function to animate the fourth grid
const animateFourthGrid = () => {
  const grid = document.querySelector('[data-grid-fourth]');
  const gridImages = grid.querySelectorAll('.grid__img');

  gsap.timeline({
    defaults: {
      ease: 'expo'
    },
    scrollTrigger: {
      trigger: grid,
      start: 'center center',
      end: '+=200%',
      pin: grid.parentNode,
      scrub: 0.2,
    }
  })
  .set(grid, {perspective: 1000}) // Add perspective for 3D effect
  .fromTo(gridImages, {
    // Define the starting position based on the pre-calculated translation, rotation, and Z-axis translation values
    x: (_, el) => calculateInitialTransform(el).x,
    y: (_, el) => calculateInitialTransform(el).y,
    z: (_, el) => calculateInitialTransform(el).z, // Z-axis translation
    rotateX: (_, el) => calculateInitialTransform(el).rotateX*.5,
    rotateY: (_, el) => calculateInitialTransform(el).rotateY,
    autoAlpha: 0,
    scale: 0.7,
  }, {
    // Animate the images to their original position and remove transform
    x: 0,
    y: 0,
    z: 0,
    rotateX: 0,
    rotateY: 0,
    autoAlpha: 1,
    scale: 1,
    stagger: {
      amount: 0.2,
      from: 'center',
      grid: [4, 9]
    }
  });
};


// Function to animate the fourth grid
const animateFifthGrid = () => {
  const grid = document.querySelector('[data-grid-fifth]');
  const gridImages = grid.querySelectorAll('.grid__img');
  
  gsap.timeline({
    defaults: {
      ease: 'sine'
    },
    scrollTrigger: {
      trigger: grid,
      start: 'center center',
      end: '+=250%',
      pin: grid.parentNode,
      scrub: 0.3,
    }
  })
  .set(grid, {perspective: 1000})
  .from(gridImages, {
    stagger: {
      amount: 0.4,
      from: 'random',
      grid: [4,9]
    },
    y: window.innerHeight,
    rotationX: -70,
    transformOrigin: '50% 0%',
    z: -900,
    autoAlpha: 0
  });
};

// Function to animate the sixth grid
const animateSixthGrid = () => {
  const grid = document.querySelector('[data-grid-sixth]');
  const gridImages = grid.querySelectorAll('.grid__img');
  
  gsap.timeline({
    defaults: {
      ease: 'none'
    },
    scrollTrigger: {
      trigger: grid,
      start: 'center center',
      end: '+=200%',
      pin: grid.parentNode,
      scrub: 0.5,
    }
  })
  .from(gridImages, {
    stagger: {
      amount: 0.03,
      from: 'edges',
      grid: [3,3]
    },
    scale: 0.7,
    autoAlpha: 0
  })
  .from(grid, {
    scale: .7,
    skewY: 5,
  }, 0);
};

// Function to animate the seventh grid
const animateSeventhGrid = () => {
  const grid = document.querySelector('[data-grid-seventh]');
  if (!grid) return; // Safety check in case the grid doesn't exist
  
  const gridImages = grid.querySelectorAll('.grid__img');
  const contentTitle = grid.parentNode.querySelector('.content__title');
  
  gsap.timeline({
    defaults: {
      ease: 'power1'
    },
    scrollTrigger: {
      trigger: grid,
      start: 'center center',
      end: '+=200%',
      pin: grid.parentNode,
      scrub: 0.5,
    }
  })
  .fromTo(gridImages, {
    y: window.innerHeight,
    autoAlpha: 0,
    scale: 0.8,
    rotation: () => gsap.utils.random(-20, 20)
  }, {
    stagger: 0.08,
    y: 0,
    autoAlpha: 1,
    scale: 1,
    rotation: 0
  })
  // Animate the content title
  .from(contentTitle, {
    y: 100,
    autoAlpha: 0,
    duration: 1.2,
    ease: 'power4'
  }, 0.5);
};

// Function to animate the eighth grid
const animateEighthGrid = () => {
  const grid = document.querySelector('[data-grid-eighth]');
  const gridImages = grid.querySelectorAll('.grid__img');
  
  gsap.timeline({
    defaults: {
      ease: 'expo'
    },
    scrollTrigger: {
      trigger: grid,
      start: 'center center',
      end: '+=250%',
      pin: grid.parentNode,
      scrub: true,
    }
  })
  .set(grid, {perspective: 2000})
  .from(gridImages, {
    stagger: {
      amount: 0.8,
      from: 'start'
    },
    rotationY: 65,
    transformOrigin: '0% 50%',
    z: -200,
    yPercent: 10 
  })
  .from(gridImages, {
    stagger: {
      amount: 0.8,
      from: 'start'
    },
    duration: 0.2,
    autoAlpha: 0
  }, 0);
};

// Function to animate the ninth grid
const animateNinthGrid = () => {
  const grid = document.querySelector('[data-grid-ninth]');
  const gridImages = grid.querySelectorAll('.grid__img');
  
  gsap.timeline({
    defaults: {
      ease: 'power3'
    },
    scrollTrigger: {
      trigger: grid,
      start: 'center center',
      end: '+=200%',
      pin: grid.parentNode,
      scrub: true,
    }
  })
  .from(gridImages, {
    transformOrigin: '100% -450%',
    stagger: 0.07,
    scaleX: 1.05,
    skewX: 15,
    xPercent: 50,
    rotation: -10,
    autoAlpha: 0
  });
};

// Service section interactions
const initServiceSection = () => {
  // Get all service expand buttons
  const expandButtons = document.querySelectorAll('.service-expand-btn');
  
  // Add click event to each button
  expandButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Get the details element
      const detailsId = button.getAttribute('aria-controls');
      const details = document.getElementById(detailsId);
      
      // Toggle expanded state
      const isExpanded = button.getAttribute('aria-expanded') === 'true';
      button.setAttribute('aria-expanded', !isExpanded);
      
      if (isExpanded) {
        // Hide details
        details.classList.remove('expanded');
        setTimeout(() => {
          details.hidden = true;
        }, 500); // Match the transition duration
        button.textContent = 'Learn more';
      } else {
        // Show details
        details.hidden = false;
        // Trigger reflow to enable animation
        void details.offsetWidth;
        details.classList.add('expanded');
        button.textContent = 'Show less';
      }
    });
  });
  
  // Add scroll animation for service blocks
  const serviceBlocks = document.querySelectorAll('.service-block');
  
  // Create a GSAP timeline for service blocks
  gsap.timeline({
    scrollTrigger: {
      trigger: '.services-grid',
      start: 'top 80%',
      end: 'bottom 60%',
      toggleActions: 'play none none reverse'
    }
  })
  .from(serviceBlocks, {
    y: 50,
    opacity: 0,
    duration: 0.8,
    stagger: 0.2,
    ease: 'power3.out'
  });
};

// Floating CTA
const initFloatingCTA = () => {
  const floatingCta = document.getElementById('floatingCta');
  
  // Show floating CTA after scrolling past the first section
  window.addEventListener('scroll', () => {
    const scrollPosition = window.scrollY;
    const firstSection = document.querySelector('.content');
    
    if (firstSection && scrollPosition > firstSection.offsetTop + firstSection.offsetHeight) {
      floatingCta.classList.add('visible');
    } else {
      floatingCta.classList.remove('visible');
    }
  });
};

// Contact form handling
const initContactForm = () => {
  const contactForm = document.getElementById('contactForm');
  const formSubmissionMessage = document.getElementById('formSubmissionMessage');
  const closeMessageButton = document.getElementById('closeMessage');
  
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      // Get form data
      const formData = new FormData(contactForm);
      const formDataObj = {};
      formData.forEach((value, key) => {
        formDataObj[key] = value;
      });
      
      // In a real implementation, you would send this data to a server
      // For now, we'll just simulate a successful submission
      console.log('Form submission data:', formDataObj);
      
      // Show success message
      formSubmissionMessage.hidden = false;
      void formSubmissionMessage.offsetWidth; // Trigger reflow
      formSubmissionMessage.classList.add('visible');
      
      // Reset form
      contactForm.reset();
    });
  }
  
  if (closeMessageButton) {
    closeMessageButton.addEventListener('click', () => {
      formSubmissionMessage.classList.remove('visible');
      setTimeout(() => {
        formSubmissionMessage.hidden = true;
      }, 300); // Match transition duration
    });
  }
  
  // Form field animations
  const formFields = document.querySelectorAll('.form-group input, .form-group select, .form-group textarea');
  
  formFields.forEach(field => {
    // Add focus animation
    field.addEventListener('focus', () => {
      field.parentElement.classList.add('focused');
    });
    
    field.addEventListener('blur', () => {
      field.parentElement.classList.remove('focused');
    });
  });
};

// Partners marquee animation
const initPartnersMarquee = () => {
  const marqueeContent = document.querySelectorAll('.marquee-content');
  
  // Add GSAP animation for the marquee
  gsap.to(marqueeContent[1], {
    x: '-100%',
    repeat: -1,
    duration: 30,
    ease: 'linear'
  });
  
  // Add hover effect to pause animation
  const partnersMarquee = document.querySelector('.partners-marquee');
  if (partnersMarquee) {
    partnersMarquee.addEventListener('mouseenter', () => {
      gsap.to(marqueeContent, { timeScale: 0 });
    });
    
    partnersMarquee.addEventListener('mouseleave', () => {
      gsap.to(marqueeContent, { timeScale: 1 });
    });
  }
};

// Testimonials slider
const initTestimonialsSlider = () => {
  const slides = document.querySelectorAll('.testimonial-slide');
  const dots = document.querySelectorAll('.dot');
  const prevButton = document.getElementById('testimonialPrev');
  const nextButton = document.getElementById('testimonialNext');
  let currentSlide = 0;
  
  // Function to show a specific slide
  const showSlide = (index) => {
    // Remove active class from all slides
    slides.forEach(slide => {
      slide.classList.remove('active');
    });
    
    // Remove active class from all dots
    dots.forEach(dot => {
      dot.classList.remove('active');
    });
    
    // Add active class to current slide and dot
    slides[index].classList.add('active');
    dots[index].classList.add('active');
  };
  
  // Initialize the first slide
  showSlide(currentSlide);
  
  // Event listeners for dots
  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      currentSlide = index;
      showSlide(currentSlide);
    });
  });
  
  // Event listener for previous button
  if (prevButton) {
    prevButton.addEventListener('click', () => {
      currentSlide = (currentSlide - 1 + slides.length) % slides.length;
      showSlide(currentSlide);
    });
  }
  
  // Event listener for next button
  if (nextButton) {
    nextButton.addEventListener('click', () => {
      currentSlide = (currentSlide + 1) % slides.length;
      showSlide(currentSlide);
    });
  }
  
  // Auto-advance slides every 5 seconds
  setInterval(() => {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
  }, 5000);
  
  // Add GSAP animations for testimonials
  gsap.from('.testimonial-slide', {
    y: 50,
    opacity: 0,
    duration: 0.8,
    stagger: 0.2,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: '.testimonials-container',
      start: 'top 80%',
      toggleActions: 'play none none none'
    }
  });
};

// Main initialization function
const init = () => {
  // Reduce scroll distance between sections
  adjustSectionSpacing();
  
  // Animate the header (frame)
  animateFrame();

  // Call animations for each grid based on their data attributes
  animateFirstGrid();
  animateSecondGrid();
  animateThirdGrid();
  animateFourthGrid();
  animateFifthGrid();
  animateSixthGrid();
  
  // Initialize service section interactions
  initServiceSection();
  
  // Initialize floating CTA
  initFloatingCTA();
  
  // Initialize contact form
  initContactForm();
  
  // Initialize partners marquee
  initPartnersMarquee();
  
  // Initialize testimonials slider
  initTestimonialsSlider();
  
  // Initialize our custom effects
  effectsInstances = initEffects({
    // Configure noise effect
    noise: {
      opacity: 0.3,         // Increased opacity for better visibility
      speed: 1.2,           // Faster speed for more dynamic movement
      grayscale: true,
      fps: 24,
      size: 2,              // Larger grain size
      dynamicDensity: true  // Enable dynamic grain density
    },
    // Configure gradient blobs
    blobs: {
      count: 8,             // More blobs for better coverage
      opacity: 0.4,         // 40% as requested
      minSize: 500,         // Larger minimum size
      maxSize: 1200,        // Larger maximum size
      minDuration: 10,      // Faster animation
      maxDuration: 25,      // Faster animation
      zIndex: -1            // Behind content but above background
    },
    // Configure text animations
    textAnimations: {
      staggerAmount: 0.06,  // Slightly more staggered for better visual effect
      animationDuration: 1.4, // Slightly longer duration for smoother animations
      paragraphSelector: '.content__text, p:not(.type-tiny)', // Target all paragraphs
    }
  });
};

/**
 * Adjust spacing between sections to create a more cohesive narrative flow
 * This reduces the scroll distance between sections while maintaining visual separation
 */
const adjustSectionSpacing = () => {
  // Get all content sections
  const sections = document.querySelectorAll('.content');
  
  // Skip the first section (intro)
  for (let i = 1; i < sections.length; i++) {
    const section = sections[i];
    
    // Adjust spacing based on section type
    if (section.classList.contains('content--full')) {
      // Full-width sections (with grids) get no negative margin
      section.style.marginTop = '0';
    } else {
      // Text-focused sections also get no negative margin
      section.style.marginTop = '0';
      
      // Add a subtle visual separator
      const separator = document.createElement('div');
      separator.className = 'section-separator';
      separator.style.height = '1px';
      separator.style.width = '25%';
      separator.style.margin = '0 auto 2rem auto';
      separator.style.background = 'linear-gradient(to right, transparent, var(--color-link), transparent)';
      separator.style.opacity = '0.3';
      
      // Insert at the beginning of the section
      if (section.firstChild) {
        section.insertBefore(separator, section.firstChild);
      } else {
        section.appendChild(separator);
      }
    }
    
    // Update ScrollTrigger for this section
    ScrollTrigger.refresh();
  }
  
  // Narrative connections without the brown highlighting effect
  const narrativeConnections = [
    {from: '#intro', to: '#about', theme: 'identity'},
    {from: '#about', to: '#vision', theme: 'future'},
    {from: '#vision', to: '#process', theme: 'method'},
    {from: '#process', to: '#collaborations', theme: 'partnership'}
  ];
  
  narrativeConnections.forEach(connection => {
    const fromSection = document.querySelector(connection.from);
    const toSection = document.querySelector(connection.to);
    
    if (fromSection && toSection) {
      // Create a visual connection element but don't make it visible
      // This maintains the spacing without the brown highlighting effect
      const connector = document.createElement('div');
      connector.className = 'narrative-connector';
      connector.setAttribute('data-theme', connection.theme);
      connector.style.position = 'relative';
      connector.style.zIndex = '1';
      connector.style.height = '5vh';
      connector.style.marginTop = '0';
      connector.style.marginBottom = '0';
      connector.style.opacity = '0'; // Keep it invisible
      
      // Insert connector between sections
      if (toSection.previousElementSibling !== fromSection) {
        toSection.parentNode.insertBefore(connector, toSection);
      }
      
      // No animation for the connector - this removes the brown highlighting effect
    }
  });
};

// Preload images and initialize animations
preloadImages('.grid__img').then(() => {
  document.body.classList.remove('loading'); // Remove the loading class from the body
  init();
  window.scrollTo(0, 0);
});
