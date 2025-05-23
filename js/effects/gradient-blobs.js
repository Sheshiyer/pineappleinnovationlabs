/**
 * Gradient Blobs Effect
 * Creates animated gradient blobs that move across the screen
 * with 40% opacity as specified
 */

class GradientBlobs {
  constructor(options = {}) {
    // Default options
    this.options = {
      count: options.count || 7,           // Increased number of blobs
      opacity: options.opacity || 0.4,     // Opacity of blobs (40% as requested)
      minSize: options.minSize || 400,     // Increased minimum blob size in pixels
      maxSize: options.maxSize || 1000,    // Increased maximum blob size in pixels
      minDuration: options.minDuration || 12, // Faster minimum animation duration in seconds
      maxDuration: options.maxDuration || 30, // Faster maximum animation duration in seconds
      colors: options.colors || [          // Gradient colors with more vibrant options
        ['#ffb870', '#ff8c42'],            // Orange (from site's color scheme)
        ['#8a6f4d', '#5a4a3a'],           // Brown (from site's color scheme)
        ['#f8f5f0', '#d9d0c7'],           // Light (from site's color scheme)
        ['#1a1714', '#3a332e'],           // Dark (from site's color scheme)
        ['#ff6b6b', '#ff8e8e'],           // Red (added for more vibrancy)
        ['#6b88ff', '#a2b9ff']            // Blue (added for more vibrancy)
      ],
      zIndex: options.zIndex || -1,        // z-index for the blob container (behind content but above background)
      ...options
    };

    this.container = null;
    this.blobs = [];
    this.init();
  }

  /**
   * Initialize the gradient blobs
   */
  init() {
    // Create container for blobs
    this.container = document.createElement('div');
    this.container.className = 'gradient-blobs-container';
    
    // Style the container
    Object.assign(this.container.style, {
      position: 'fixed',
      top: '0',
      left: '0',
      width: '100vw',
      height: '100vh',
      overflow: 'hidden',
      pointerEvents: 'none',
      zIndex: this.options.zIndex.toString()
    });
    
    // Add to DOM as the first child of body to be behind content but visible
    document.body.prepend(this.container);
    
    // Create blobs
    this.createBlobs();
    
    // Handle window resize
    window.addEventListener('resize', this.handleResize.bind(this));
  }

  /**
   * Create the gradient blob elements
   */
  createBlobs() {
    for (let i = 0; i < this.options.count; i++) {
      // Create blob element
      const blob = document.createElement('div');
      blob.className = 'gradient-blob';
      
      // Generate random properties for this blob
      const size = this.getRandomValue(this.options.minSize, this.options.maxSize);
      const colorPair = this.options.colors[Math.floor(Math.random() * this.options.colors.length)];
      const angle = Math.floor(Math.random() * 360);
      
      // Style the blob
      Object.assign(blob.style, {
        position: 'absolute',
        borderRadius: '50%',
        width: `${size}px`,
        height: `${size}px`,
        opacity: this.options.opacity.toString(),
        background: `linear-gradient(${angle}deg, ${colorPair[0]}, ${colorPair[1]})`,
        filter: 'blur(80px)',
        willChange: 'transform',
        transform: 'translate3d(0, 0, 0)' // Force GPU acceleration
      });
      
      // Add to container
      this.container.appendChild(blob);
      
      // Store blob reference
      this.blobs.push({
        element: blob,
        size: size
      });
      
      // Position and animate the blob
      this.positionBlob(i);
      this.animateBlob(i);
    }
  }

  /**
   * Position a blob randomly on the screen
   * @param {number} index - The blob index
   */
  positionBlob(index) {
    const blob = this.blobs[index];
    const { innerWidth, innerHeight } = window;
    
    // Random position that ensures blob is partially visible
    const left = this.getRandomValue(-blob.size / 2, innerWidth - blob.size / 2);
    const top = this.getRandomValue(-blob.size / 2, innerHeight - blob.size / 2);
    
    // Apply position
    blob.element.style.left = `${left}px`;
    blob.element.style.top = `${top}px`;
  }

  /**
   * Animate a blob with random movement
   * @param {number} index - The blob index
   */
  animateBlob(index) {
    const blob = this.blobs[index];
    const { innerWidth, innerHeight } = window;
    
    // Random destination that ensures blob is partially visible
    const destX = this.getRandomValue(-blob.size / 2, innerWidth - blob.size / 2);
    const destY = this.getRandomValue(-blob.size / 2, innerHeight - blob.size / 2);
    
    // Random duration
    const duration = this.getRandomValue(this.options.minDuration, this.options.maxDuration);
    
    // Random rotation
    const rotation = this.getRandomValue(-45, 45);
    
    // Random scale variation for pulsing effect
    const scaleStart = this.getRandomValue(0.9, 1.1);
    const scaleEnd = this.getRandomValue(0.9, 1.1);
    
    // Create animation timeline with GSAP
    const tl = gsap.timeline({
      onComplete: () => {
        // Reset position without animation
        gsap.set(blob.element, {
          x: 0,
          y: 0
        });
        
        // Update actual position
        blob.element.style.left = `${destX}px`;
        blob.element.style.top = `${destY}px`;
        
        // Continue with new animation
        this.animateBlob(index);
      }
    });
    
    // Main movement animation
    tl.to(blob.element, {
      x: destX - parseInt(blob.element.style.left),
      y: destY - parseInt(blob.element.style.top),
      rotation: rotation,
      duration: duration,
      ease: 'sine.inOut'
    });
    
    // Add subtle pulsing and filter animations
    tl.to(blob.element, {
      scale: scaleEnd,
      filter: `blur(${this.getRandomValue(60, 100)}px)`,
      duration: duration / 2,
      ease: 'sine.inOut',
      repeat: 1,
      yoyo: true
    }, 0);
    
    // Add subtle opacity variation
    tl.to(blob.element, {
      opacity: this.getRandomValue(this.options.opacity * 0.7, this.options.opacity * 1.3),
      duration: duration / 3,
      ease: 'sine.inOut',
      repeat: 2,
      yoyo: true
    }, 0);
    
    // Randomly change the gradient angle during animation for some blobs
    if (Math.random() > 0.5) {
      const colorPair = this.options.colors[Math.floor(Math.random() * this.options.colors.length)];
      const startAngle = parseInt(blob.element.style.background.match(/\d+/)[0]) || 0;
      const endAngle = startAngle + this.getRandomValue(-180, 180);
      
      tl.to(blob.element, {
        background: `linear-gradient(${endAngle}deg, ${colorPair[0]}, ${colorPair[1]})`,
        duration: duration,
        ease: 'sine.inOut'
      }, 0);
    }
  }

  /**
   * Get a random value between min and max
   * @param {number} min - Minimum value
   * @param {number} max - Maximum value
   * @returns {number} Random value
   */
  getRandomValue(min, max) {
    return Math.random() * (max - min) + min;
  }

  /**
   * Handle window resize
   */
  handleResize() {
    // Reposition blobs on window resize
    this.blobs.forEach((blob, index) => {
      // Stop current animation
      gsap.killTweensOf(blob.element);
      
      // Reposition and restart animation
      this.positionBlob(index);
      this.animateBlob(index);
    });
  }

  /**
   * Clean up resources
   */
  destroy() {
    // Stop all animations
    this.blobs.forEach(blob => {
      gsap.killTweensOf(blob.element);
    });
    
    // Remove container
    if (this.container && this.container.parentNode) {
      this.container.parentNode.removeChild(this.container);
    }
    
    // Remove event listener
    window.removeEventListener('resize', this.handleResize);
  }
}

export default GradientBlobs;
