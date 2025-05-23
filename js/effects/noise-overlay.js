/**
 * Noise Overlay Effect
 * Creates an animated noise/grain texture overlay for the entire website background
 */

class NoiseOverlay {
  constructor(options = {}) {
    // Default options
    this.options = {
      opacity: options.opacity || 0.25,      // Increased opacity for better visibility
      speed: options.speed || 0.8,           // Increased speed for more dynamic movement
      fps: options.fps || 24,                // Frames per second (film-like grain)
      grayscale: options.grayscale || true,  // Use grayscale noise
      size: options.size || 2,               // Increased size of noise particles
      dynamicDensity: options.dynamicDensity || true, // Dynamic grain density
      ...options
    };

    this.canvas = null;
    this.ctx = null;
    this.animationId = null;
    this.lastFrame = 0;
    this.frameInterval = 1000 / this.options.fps;
    this.time = 0; // Time counter for dynamic effects
    this.densityVariation = 0; // For dynamic density changes

    this.init();
  }

  /**
   * Initialize the noise overlay
   */
  init() {
    // Create canvas element
    this.canvas = document.createElement('canvas');
    this.canvas.className = 'noise-overlay';
    this.ctx = this.canvas.getContext('2d', { alpha: true });

    // Style the canvas
    Object.assign(this.canvas.style, {
      position: 'fixed',
      top: '0',
      left: '0',
      width: '100vw',
      height: '100vh',
      pointerEvents: 'none',
      zIndex: '1',
      opacity: this.options.opacity.toString(),
      mixBlendMode: 'overlay'
    });

    // Add to DOM as the first child of body to be behind all content
    document.body.insertBefore(this.canvas, document.body.firstChild);

    // Set canvas dimensions
    this.resizeCanvas();

    // Start animation
    this.animate();

    // Handle window resize
    window.addEventListener('resize', this.resizeCanvas.bind(this));
  }

  /**
   * Resize canvas to match window dimensions
   * Uses a lower resolution for better performance
   */
  resizeCanvas() {
    const scale = 0.5; // Downscale for performance
    this.canvas.width = window.innerWidth * scale;
    this.canvas.height = window.innerHeight * scale;
  }

  /**
   * Generate noise on the canvas
   */
  generateNoise() {
    const { width, height } = this.canvas;
    const imageData = this.ctx.createImageData(width, height);
    const data = imageData.data;
    
    // Update time for dynamic effects
    this.time += this.options.speed * 0.01;
    
    // Calculate dynamic density variation (oscillates between 0.05 and 0.3)
    if (this.options.dynamicDensity) {
      this.densityVariation = 0.175 + Math.sin(this.time) * 0.125;
    } else {
      this.densityVariation = 0.15; // Default static density
    }
    
    // Generate random noise with dynamic properties
    for (let i = 0; i < data.length; i += 4) {
      // Apply dynamic density - skip some pixels based on density variation
      if (Math.random() > this.densityVariation) {
        continue;
      }
      
      // Random value for noise with slight variation based on position and time
      const x = (i / 4) % width;
      const y = Math.floor((i / 4) / width);
      const timeFactor = Math.sin(this.time + x * 0.01 + y * 0.01) * 20;
      
      // Add some variation to the noise value
      const value = Math.floor(Math.random() * 256 + timeFactor) % 256;
      
      // Apply noise with size factor
      if (i % (4 * this.options.size) === 0) {
        // Set RGB values (grayscale or color)
        data[i] = this.options.grayscale ? value : Math.floor(Math.random() * 256);     // R
        data[i + 1] = this.options.grayscale ? value : Math.floor(Math.random() * 256); // G
        data[i + 2] = this.options.grayscale ? value : Math.floor(Math.random() * 256); // B
        
        // Dynamic alpha for more pronounced grain effect
        const alphaVariation = Math.sin(x * 0.05 + this.time) * 0.1 + 0.8;
        data[i + 3] = Math.random() > 0.05 ? 255 : 0; // More visible grain
        
        // Apply the same noise to adjacent pixels based on size
        for (let s = 1; s < this.options.size && i + (s * 4) < data.length; s++) {
          data[i + (s * 4)] = data[i];
          data[i + (s * 4) + 1] = data[i + 1];
          data[i + (s * 4) + 2] = data[i + 2];
          data[i + (s * 4) + 3] = data[i + 3];
        }
      }
    }
    
    this.ctx.putImageData(imageData, 0, 0);
  }

  /**
   * Animation loop
   */
  animate(timestamp = 0) {
    this.animationId = requestAnimationFrame(this.animate.bind(this));
    
    // Throttle to desired FPS
    if (timestamp - this.lastFrame < this.frameInterval) return;
    
    this.lastFrame = timestamp;
    
    // Clear canvas and generate new noise
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.generateNoise();
  }

  /**
   * Stop the animation
   */
  destroy() {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
    }
    
    if (this.canvas && this.canvas.parentNode) {
      this.canvas.parentNode.removeChild(this.canvas);
    }
    
    window.removeEventListener('resize', this.resizeCanvas);
  }
}

export default NoiseOverlay;
