/**
 * Text Animations
 * Handles on-page view animations for text in each section
 * and GSAP scroll-triggered text animations for titles
 */

class TextAnimations {
  constructor(options = {}) {
    // Default options
    this.options = {
      titleSelector: options.titleSelector || '.content__title-main, h2, h4',
      paragraphSelector: options.paragraphSelector || '.content__text, p:not(.type-tiny)',
      smallTextSelector: options.smallTextSelector || '.type-tiny',
      staggerAmount: options.staggerAmount || 0.05,
      animationDuration: options.animationDuration || 1.2,
      ease: options.ease || 'power3.out',
      ...options
    };

    // Store references to animated elements
    this.animatedElements = [];
    
    // Initialize
    this.init();
  }

  /**
   * Initialize text animations
   */
  init() {
    // Wait for DOM to be fully loaded
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => this.setupAnimations());
    } else {
      this.setupAnimations();
    }
  }

  /**
   * Set up all text animations
   */
  setupAnimations() {
    // Set up title animations
    this.setupTitleAnimations();
    
    // Set up paragraph animations
    this.setupParagraphAnimations();
    
    // Set up small text animations
    this.setupSmallTextAnimations();
  }

  /**
   * Set up animations for title elements
   */
  setupTitleAnimations() {
    const titles = document.querySelectorAll(this.options.titleSelector);
    
    titles.forEach(title => {
      // Skip if already processed
      if (title.classList.contains('text-animated')) return;
      
      // Mark as processed
      title.classList.add('text-animated');
      
      // Add perspective container for 3D effects
      title.classList.add('perspective-container');
      
      // Split text into words for animation
      const words = this.splitTextIntoSpans(title, 'word');
      
      // Determine animation style based on title type
      const isMainTitle = title.classList.contains('content__title-main');
      
      // Create animation
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: title,
          start: 'top bottom-=100',
          end: 'bottom center',
          toggleActions: 'play none none none',
          once: false,
          scrub: isMainTitle ? 0.3 : false // Add scrub for main titles
        }
      });
      
      // Add fill masks to words for main titles
      if (isMainTitle) {
        words.forEach(word => {
          // Create a mask element for the fill effect
          const mask = document.createElement('span');
          mask.className = 'text-fill-mask';
          
          // Add the mask to the word
          word.style.position = 'relative';
          word.appendChild(mask);
        });
      }
      
      if (isMainTitle) {
        // More dramatic animation for main titles with fill effect
        tl.fromTo(words, {
          opacity: 0,
          y: 60,
          rotateX: 45,
          scale: 0.8,
          transformOrigin: '0% 50% -50'
        }, {
          opacity: 1,
          y: 0,
          rotateX: 0,
          scale: 1,
          duration: this.options.animationDuration * 1.2,
          stagger: this.options.staggerAmount * 1.5,
          ease: 'expo.out'
        });
        
        // Animate the fill masks with a staggered effect
        tl.fromTo(title.querySelectorAll('.text-fill-mask'), {
          scaleX: 0
        }, {
          scaleX: 1,
          duration: this.options.animationDuration * 1.5,
          stagger: this.options.staggerAmount * 2,
          ease: 'power1.inOut'
        }, '<0.3');
        
        // Add subtle follow-up animation for emphasis
        tl.to(words, {
          color: 'var(--color-link)',
          duration: 0.4,
          stagger: this.options.staggerAmount,
          ease: 'power1.inOut',
          yoyo: true,
          repeat: 1
        }, `>-${this.options.animationDuration * 0.5}`);
      } else {
        // Standard animation for regular titles
        tl.fromTo(words, {
          opacity: 0,
          y: 30,
          rotateX: 20,
          transformOrigin: '0% 50% -50'
        }, {
          opacity: 1,
          y: 0,
          rotateX: 0,
          duration: this.options.animationDuration,
          stagger: this.options.staggerAmount,
          ease: this.options.ease
        });
      }
      
      // Store reference
      this.animatedElements.push({
        element: title,
        timeline: tl
      });
    });
  }

  /**
   * Set up animations for paragraph elements
   */
  setupParagraphAnimations() {
    const paragraphs = document.querySelectorAll(this.options.paragraphSelector);
    
    paragraphs.forEach(paragraph => {
      // Skip if already processed
      if (paragraph.classList.contains('text-animated')) return;
      
      // Mark as processed
      paragraph.classList.add('text-animated');
      
      // Split text into lines for animation
      const lines = this.splitTextIntoSpans(paragraph, 'line');
      
      // Create animation
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: paragraph,
          start: 'top bottom-=100', // Start earlier
          end: 'bottom center+=50', // End a bit later
          toggleActions: 'play none none none',
          once: false,
          scrub: 0.2 // Add smooth scrubbing effect for opacity fill
        }
      });
      
      // Determine if this is a content__text paragraph for special treatment
      const isContentText = paragraph.classList.contains('content__text');
      
      // Add line masks for opacity fill effect only in black sections
      const isBlackSection = paragraph.closest('.content--padded') && 
                            !paragraph.closest('.content--padded').classList.contains('content--full');
      
      if (isBlackSection) {
        lines.forEach(line => {
          // Create a mask element for the fill effect
          const mask = document.createElement('span');
          mask.className = 'text-fill-mask';
          
          // Add the mask to the line
          line.style.position = 'relative';
          line.style.display = 'inline-block';
          line.appendChild(mask);
        });
      }
      
      if (isContentText) {
        // Enhanced animation for main content text with opacity fill effect
        
        // First animate the lines into view
        tl.fromTo(lines, {
          opacity: 0,
          y: 30,
          rotateX: 5,
          transformOrigin: '0% 50% 0'
        }, {
          opacity: 1,
          y: 0,
          rotateX: 0,
          duration: this.options.animationDuration * 0.9,
          stagger: this.options.staggerAmount * 1.2,
          ease: 'power2.out'
        });
        
        // Then animate the fill masks one by one
        tl.fromTo(paragraph.querySelectorAll('.text-fill-mask'), {
          scaleX: 0
        }, {
          scaleX: 1,
          duration: this.options.animationDuration * 1.5,
          stagger: this.options.staggerAmount * 1.5,
          ease: 'power1.inOut'
        }, '<0.2');
        
        // Add subtle follow-up animation for emphasis on first line only
        if (lines.length > 0) {
          tl.fromTo(lines[0], {
            textShadow: '0 0 0 rgba(255,184,112,0)'
          }, {
            textShadow: '0 0 10px rgba(255,184,112,0.3)',
            duration: 1.2,
            ease: 'power1.inOut',
            yoyo: true,
            repeat: 1
          }, `>-${this.options.animationDuration * 0.3}`);
        }
      } else {
        // Enhanced animation for regular paragraphs with opacity fill effect
        tl.fromTo(lines, {
          opacity: 0,
          y: 20
        }, {
          opacity: 1,
          y: 0,
          duration: this.options.animationDuration * 0.8,
          stagger: this.options.staggerAmount,
          ease: this.options.ease
        });
        
        // Animate the fill masks with a slight delay
        tl.fromTo(paragraph.querySelectorAll('.text-fill-mask'), {
          scaleX: 0
        }, {
          scaleX: 1,
          duration: this.options.animationDuration,
          stagger: this.options.staggerAmount,
          ease: 'power1.inOut'
        }, '<0.1');
      }
      
      // Store reference
      this.animatedElements.push({
        element: paragraph,
        timeline: tl
      });
    });
  }

  /**
   * Set up animations for small text elements
   */
  setupSmallTextAnimations() {
    const smallTexts = document.querySelectorAll(this.options.smallTextSelector);
    
    smallTexts.forEach(text => {
      // Skip if already processed
      if (text.classList.contains('text-animated')) return;
      
      // Mark as processed
      text.classList.add('text-animated');
      
      // Create a mask element for the fill effect
      const mask = document.createElement('span');
      mask.className = 'text-fill-mask';
      
      // Add the mask to the text
      text.style.position = 'relative';
      text.appendChild(mask);
      
      // Create animation
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: text,
          start: 'top bottom-=80',
          end: 'bottom center',
          toggleActions: 'play none none none',
          scrub: 0.1 // Add smooth scrubbing effect for opacity fill
        }
      });
      
      // Animate the small text
      tl.fromTo(text, {
        opacity: 0,
        y: 15
      }, {
        opacity: 1,
        y: 0,
        duration: this.options.animationDuration * 0.6,
        ease: this.options.ease
      });
      
      // Animate the fill mask
      tl.fromTo(mask, {
        scaleX: 0
      }, {
        scaleX: 1,
        duration: this.options.animationDuration * 0.8,
        ease: 'power1.inOut'
      }, '<0.1');
      
      // Store reference
      this.animatedElements.push({
        element: text,
        timeline: tl
      });
    });
  }

  /**
   * Split text into spans for animation
   * @param {HTMLElement} element - The element containing text to split
   * @param {string} splitType - The type of split ('char', 'word', or 'line')
   * @returns {Array} Array of created span elements
   */
  splitTextIntoSpans(element, splitType = 'word') {
    // Store original content for accessibility
    const originalHTML = element.innerHTML;
    element.setAttribute('data-original-text', originalHTML);
    
    // Create a wrapper to maintain original element structure
    const wrapper = document.createElement('div');
    wrapper.innerHTML = originalHTML;
    
    // Process based on split type
    if (splitType === 'char') {
      // Process text nodes to split into characters
      this.processTextNodes(wrapper, node => {
        const text = node.nodeValue;
        const fragment = document.createDocumentFragment();
        
        [...text].forEach(char => {
          if (char === ' ') {
            fragment.appendChild(document.createTextNode(' '));
          } else {
            const span = document.createElement('span');
            span.className = 'split-char';
            span.textContent = char;
            fragment.appendChild(span);
          }
        });
        
        return fragment;
      });
      
      // Replace original content
      element.innerHTML = wrapper.innerHTML;
      return element.querySelectorAll('.split-char');
      
    } else if (splitType === 'word') {
      // Process text nodes to split into words
      this.processTextNodes(wrapper, node => {
        const text = node.nodeValue;
        const words = text.split(/\s+/);
        const fragment = document.createDocumentFragment();
        
        words.forEach((word, i) => {
          if (word === '') return;
          
          const span = document.createElement('span');
          span.className = 'split-word';
          span.textContent = word;
          fragment.appendChild(span);
          
          // Add space after word (except last word)
          if (i < words.length - 1 || text.endsWith(' ')) {
            fragment.appendChild(document.createTextNode(' '));
          }
        });
        
        return fragment;
      });
      
      // Replace original content
      element.innerHTML = wrapper.innerHTML;
      return element.querySelectorAll('.split-word');
      
    } else if (splitType === 'line') {
      // For line splitting, use a more reliable approach
      
      // First split into words to prepare for line detection
      this.splitTextIntoSpans(element, 'word');
      
      // Create a temporary container to measure lines
      const tempContainer = document.createElement('div');
      tempContainer.style.position = 'absolute';
      tempContainer.style.visibility = 'hidden';
      tempContainer.style.width = getComputedStyle(element).width;
      tempContainer.style.fontSize = getComputedStyle(element).fontSize;
      tempContainer.style.fontFamily = getComputedStyle(element).fontFamily;
      tempContainer.style.lineHeight = getComputedStyle(element).lineHeight;
      tempContainer.style.letterSpacing = getComputedStyle(element).letterSpacing;
      tempContainer.style.whiteSpace = getComputedStyle(element).whiteSpace;
      tempContainer.innerHTML = element.innerHTML;
      document.body.appendChild(tempContainer);
      
      // Get all word spans
      const wordSpans = tempContainer.querySelectorAll('.split-word');
      
      // Group words into lines
      const lines = [];
      let currentLine = [];
      let lastTop = -1;
      
      wordSpans.forEach(span => {
        const rect = span.getBoundingClientRect();
        
        if (lastTop !== -1 && rect.top > lastTop + 2) { // New line detected (with small tolerance)
          if (currentLine.length > 0) {
            lines.push(currentLine);
            currentLine = [];
          }
        }
        
        currentLine.push(span.textContent);
        lastTop = rect.top;
      });
      
      // Add the last line
      if (currentLine.length > 0) {
        lines.push(currentLine);
      }
      
      // Remove the temporary container
      document.body.removeChild(tempContainer);
      
      // Create spans for each line
      element.innerHTML = lines.map(line => {
        return `<span class="split-line">${line.join(' ')}</span>`;
      }).join('');
      
      return element.querySelectorAll('.split-line');
    }
    
    // Default fallback
    return [];
  }
  
  /**
   * Process text nodes within an element
   * @param {Node} node - The node to process
   * @param {Function} processor - Function to process text nodes
   */
  processTextNodes(node, processor) {
    // If this is a text node, process it
    if (node.nodeType === Node.TEXT_NODE) {
      const replacement = processor(node);
      if (replacement && node.parentNode) {
        node.parentNode.replaceChild(replacement, node);
      }
      return;
    }
    
    // Skip script and style elements
    if (node.nodeName === 'SCRIPT' || node.nodeName === 'STYLE') {
      return;
    }
    
    // Process child nodes (make a copy of the children array to avoid live collection issues)
    const children = Array.from(node.childNodes);
    children.forEach(child => this.processTextNodes(child, processor));
  }

  /**
   * Refresh animations (useful after content changes)
   */
  refresh() {
    // Kill existing animations
    this.animatedElements.forEach(item => {
      if (item.timeline) {
        item.timeline.kill();
      }
    });
    
    // Clear references
    this.animatedElements = [];
    
    // Remove animation markers
    document.querySelectorAll('.text-animated').forEach(el => {
      el.classList.remove('text-animated');
    });
    
    // Restore original text
    document.querySelectorAll('[data-original-text]').forEach(el => {
      el.innerHTML = el.getAttribute('data-original-text');
      el.removeAttribute('data-original-text');
    });
    
    // Set up animations again
    this.setupAnimations();
  }

  /**
   * Clean up resources
   */
  destroy() {
    // Kill all animations
    this.animatedElements.forEach(item => {
      if (item.timeline) {
        item.timeline.kill();
      }
    });
    
    // Restore original text
    document.querySelectorAll('[data-original-text]').forEach(el => {
      el.innerHTML = el.getAttribute('data-original-text');
      el.removeAttribute('data-original-text');
    });
  }
}

export default TextAnimations;
