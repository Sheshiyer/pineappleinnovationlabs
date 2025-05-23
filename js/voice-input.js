/**
 * Voice Input Module for Pineapple Innovation Labs
 * 
 * This module provides voice command functionality as a supplementary
 * navigation method. It uses the Web Speech API for voice recognition.
 */

class VoiceInput {
  constructor() {
    // Initialize properties
    this.isListening = false;
    this.recognition = null;
    this.micButton = null;
    this.feedbackElement = null;
    this.sections = ['intro', 'about', 'vision', 'process', 'collaborations', 'future', 'contact'];
    
    // Check if browser supports speech recognition
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      console.warn('Voice input is not supported in this browser.');
      return;
    }
    
    // Create speech recognition instance
    this.recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    this.recognition.continuous = false;
    this.recognition.interimResults = false;
    this.recognition.lang = 'en-US';
    
    // Set up event handlers
    this.recognition.onresult = this.handleResult.bind(this);
    this.recognition.onerror = this.handleError.bind(this);
    this.recognition.onend = this.handleEnd.bind(this);
    
    // Create UI elements
    this.createUI();
    
    // Bind events
    this.bindEvents();
  }
  
  /**
   * Creates the UI elements for voice input
   */
  createUI() {
    // Create microphone button
    this.micButton = document.createElement('button');
    this.micButton.className = 'voice-input-button';
    this.micButton.setAttribute('aria-label', 'Activate voice commands');
    this.micButton.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"></path><path d="M19 10v2a7 7 0 0 1-14 0v-2"></path><line x1="12" x2="12" y1="19" y2="22"></line></svg>';
    
    // Create feedback element
    this.feedbackElement = document.createElement('div');
    this.feedbackElement.className = 'voice-feedback';
    this.feedbackElement.textContent = 'Voice commands inactive';
    this.feedbackElement.style.display = 'none';
    
    // Create container for voice UI
    const voiceContainer = document.createElement('div');
    voiceContainer.className = 'voice-container';
    voiceContainer.appendChild(this.micButton);
    voiceContainer.appendChild(this.feedbackElement);
    
    // Add to document
    document.body.appendChild(voiceContainer);
    
    // Add styles
    this.addStyles();
  }
  
  /**
   * Adds CSS styles for voice input UI
   */
  addStyles() {
    const styleEl = document.createElement('style');
    styleEl.textContent = `
      .voice-container {
        position: fixed;
        bottom: 20px;
        right: 20px;
        z-index: 1000;
        display: flex;
        flex-direction: column;
        align-items: flex-end;
      }
      
      .voice-input-button {
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background-color: var(--color-bg-frame);
        color: var(--color-text);
        border: none;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
        transition: all 0.3s ease;
      }
      
      .voice-input-button:hover {
        transform: scale(1.05);
      }
      
      .voice-input-button.active {
        background-color: var(--color-link);
        animation: pulse 1.5s infinite;
      }
      
      .voice-feedback {
        background-color: rgba(26, 23, 20, 0.8);
        color: var(--color-text);
        padding: 8px 12px;
        border-radius: 4px;
        margin-bottom: 10px;
        font-size: 14px;
        max-width: 250px;
        text-align: center;
      }
      
      @keyframes pulse {
        0% {
          box-shadow: 0 0 0 0 rgba(255, 184, 112, 0.7);
        }
        70% {
          box-shadow: 0 0 0 10px rgba(255, 184, 112, 0);
        }
        100% {
          box-shadow: 0 0 0 0 rgba(255, 184, 112, 0);
        }
      }
      
      @media (max-width: 768px) {
        .voice-container {
          bottom: 10px;
          right: 10px;
        }
        
        .voice-input-button {
          width: 40px;
          height: 40px;
        }
      }
    `;
    document.head.appendChild(styleEl);
  }
  
  /**
   * Binds event listeners
   */
  bindEvents() {
    this.micButton.addEventListener('click', this.toggleListening.bind(this));
    
    // Add keyboard shortcut (Alt+V)
    document.addEventListener('keydown', (e) => {
      if (e.altKey && e.key === 'v') {
        this.toggleListening();
      }
    });
  }
  
  /**
   * Toggles the listening state
   */
  toggleListening() {
    if (this.isListening) {
      this.stopListening();
    } else {
      this.startListening();
    }
  }
  
  /**
   * Starts the voice recognition
   */
  startListening() {
    if (!this.recognition) return;
    
    try {
      this.recognition.start();
      this.isListening = true;
      this.micButton.classList.add('active');
      this.feedbackElement.textContent = 'Listening...';
      this.feedbackElement.style.display = 'block';
      
      // Show available commands after a short delay
      setTimeout(() => {
        if (this.isListening) {
          this.feedbackElement.innerHTML = 'Listening...<br><small>Try: "go to about", "next section", "scroll down"</small>';
        }
      }, 2000);
    } catch (error) {
      console.error('Error starting voice recognition:', error);
    }
  }
  
  /**
   * Stops the voice recognition
   */
  stopListening() {
    if (!this.recognition) return;
    
    try {
      this.recognition.stop();
      this.isListening = false;
      this.micButton.classList.remove('active');
      
      // Hide feedback after a delay
      setTimeout(() => {
        this.feedbackElement.style.display = 'none';
      }, 1500);
    } catch (error) {
      console.error('Error stopping voice recognition:', error);
    }
  }
  
  /**
   * Handles the recognition result
   * @param {SpeechRecognitionEvent} event - The recognition event
   */
  handleResult(event) {
    const last = event.results.length - 1;
    const command = event.results[last][0].transcript.toLowerCase().trim();
    
    this.feedbackElement.textContent = `Command: "${command}"`;
    
    // Process the command
    this.processCommand(command);
    
    // Stop listening after processing a command
    setTimeout(() => {
      this.stopListening();
    }, 1500);
  }
  
  /**
   * Processes a voice command
   * @param {string} command - The voice command
   */
  processCommand(command) {
    // Navigation commands
    if (command.includes('go to') || command.includes('navigate to')) {
      // Extract section name
      let sectionName = command.replace('go to', '').replace('navigate to', '').trim();
      
      // Find matching section
      const section = this.sections.find(s => sectionName.includes(s));
      if (section) {
        this.navigateToSection(section);
        return;
      }
    }
    
    // Scroll commands
    if (command.includes('scroll down') || command.includes('next section')) {
      this.scrollDown();
      return;
    }
    
    if (command.includes('scroll up') || command.includes('previous section')) {
      this.scrollUp();
      return;
    }
    
    // Help command
    if (command.includes('help') || command.includes('what can i say')) {
      this.showHelp();
      return;
    }
    
    // Command not recognized
    this.feedbackElement.textContent = 'Command not recognized. Try again.';
  }
  
  /**
   * Navigates to a specific section
   * @param {string} sectionId - The section ID
   */
  navigateToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
      this.feedbackElement.textContent = `Navigating to ${sectionId}`;
    } else {
      this.feedbackElement.textContent = `Section ${sectionId} not found`;
    }
  }
  
  /**
   * Scrolls down one viewport height
   */
  scrollDown() {
    window.scrollBy({
      top: window.innerHeight * 0.8,
      behavior: 'smooth'
    });
    this.feedbackElement.textContent = 'Scrolling down';
  }
  
  /**
   * Scrolls up one viewport height
   */
  scrollUp() {
    window.scrollBy({
      top: -window.innerHeight * 0.8,
      behavior: 'smooth'
    });
    this.feedbackElement.textContent = 'Scrolling up';
  }
  
  /**
   * Shows help information
   */
  showHelp() {
    this.feedbackElement.innerHTML = `
      <strong>Available commands:</strong><br>
      "Go to [section]" - Navigate to a section<br>
      "Next section" - Scroll down<br>
      "Previous section" - Scroll up<br>
      "Help" - Show this help
    `;
    this.feedbackElement.style.display = 'block';
    
    // Keep help visible for longer
    setTimeout(() => {
      if (!this.isListening) {
        this.feedbackElement.style.display = 'none';
      }
    }, 5000);
  }
  
  /**
   * Handles recognition errors
   * @param {SpeechRecognitionError} event - The error event
   */
  handleError(event) {
    console.error('Speech recognition error:', event.error);
    this.feedbackElement.textContent = `Error: ${event.error}`;
    this.stopListening();
  }
  
  /**
   * Handles recognition end
   */
  handleEnd() {
    if (this.isListening) {
      this.isListening = false;
      this.micButton.classList.remove('active');
    }
  }
}

// Initialize voice input when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  // Wait a bit to ensure other scripts have loaded
  setTimeout(() => {
    const voiceInput = new VoiceInput();
  }, 1000);
});
