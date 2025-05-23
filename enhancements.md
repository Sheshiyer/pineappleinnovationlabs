# Pineapple Innovation Labs - Website Enhancements

This document outlines the enhancements needed to transform the current scroll-based template into a fully functional website for Pineapple Innovation Labs using only plain JavaScript and HTML.

## Table of Contents

1. [Service Section Implementation](#1-service-section-implementation)
2. [Call-to-Action Elements](#2-call-to-action-elements)
3. [Contact Form Implementation](#3-contact-form-implementation)
4. [Partners/Clients Section](#4-partnersclients-section)
5. [Testimonials Section](#5-testimonials-section)
6. [Team Section](#6-team-section)
7. [Footer Enhancement](#7-footer-enhancement)
8. [Navigation Improvements](#8-navigation-improvements)
9. [Performance Considerations](#9-performance-considerations)

---

## 1. Service Section Implementation

Add a dedicated services section based on the services.md content, structured to match the visual style of the site.

### HTML Implementation

Add this section after the "Vision" section:

```html
<section class="content content--padded" id="services">
  <h4 class="type-tiny">Services</h4>
  <p class="content__text">We don't offer services — we solve systemic friction. Pineapple Innovation Labs is a full-spectrum digital transformation partner specializing in systems design, technical implementation, and creative strategy across web, app, AI automation, and modern marketing landscapes.</p>
  
  <div class="services-grid">
    <!-- Service Block 1 -->
    <div class="service-block" data-service="digital-systems">
      <h3 class="service-title">Digital Systems Design</h3>
      <p class="service-tagline">We build scalable infrastructure for digital businesses — clean, composable, and purpose-built.</p>
      <ul class="service-list">
        <li>Web Architecture (Next.js, Jamstack)</li>
        <li>Headless CMS + API-first frameworks</li>
        <li>Design systems & documentation</li>
        <li>UI/UX for responsiveness and accessibility</li>
      </ul>
      <button class="service-expand-btn" aria-expanded="false" aria-controls="digital-systems-details">
        Learn more
      </button>
      <div class="service-details" id="digital-systems-details" hidden>
        <p>Our approach to digital systems design focuses on creating scalable, maintainable infrastructure that grows with your business. We prioritize clean architecture and composable systems that can adapt to changing needs.</p>
      </div>
    </div>
    
    <!-- Service Block 2 -->
    <div class="service-block" data-service="app-development">
      <h3 class="service-title">App Development</h3>
      <p class="service-tagline">Apps that feel invisible until you need them — and indispensable once you do.</p>
      <ul class="service-list">
        <li>Cross-platform builds (React Native, Flutter)</li>
        <li>Progressive Web Apps</li>
        <li>Native integrations</li>
        <li>Microservice-ready backends</li>
      </ul>
      <button class="service-expand-btn" aria-expanded="false" aria-controls="app-development-details">
        Learn more
      </button>
      <div class="service-details" id="app-development-details" hidden>
        <p>We create applications that seamlessly integrate into your users' lives, providing value without friction. Our development process emphasizes performance, usability, and maintainability.</p>
      </div>
    </div>
    
    <!-- Service Block 3 -->
    <div class="service-block" data-service="ai-automation">
      <h3 class="service-title">AI-First Automation & Ops</h3>
      <p class="service-tagline">From daily drudgery to intelligent flow.</p>
      <ul class="service-list">
        <li>Custom AI agent design (internal tools, support bots, assistants)</li>
        <li>Workflow automation (Make, Zapier, n8n)</li>
        <li>Contextual data triggers and automations</li>
        <li>Knowledge base + CRM sync engines</li>
      </ul>
      <button class="service-expand-btn" aria-expanded="false" aria-controls="ai-automation-details">
        Learn more
      </button>
      <div class="service-details" id="ai-automation-details" hidden>
        <p>Our AI-first approach to automation transforms repetitive tasks into intelligent workflows. We design systems that learn and adapt, freeing your team to focus on high-value work.</p>
      </div>
    </div>
    
    <!-- Service Block 4 -->
    <div class="service-block" data-service="brand-growth">
      <h3 class="service-title">Brand & Growth Systems</h3>
      <p class="service-tagline">Marketing that scales with your systems.</p>
      <ul class="service-list">
        <li>Full-funnel strategy (email → CRM → web)</li>
        <li>SEO & technical audit automation</li>
        <li>Performance tracking dashboards</li>
        <li>Storytelling frameworks for positioning</li>
      </ul>
      <button class="service-expand-btn" aria-expanded="false" aria-controls="brand-growth-details">
        Learn more
      </button>
      <div class="service-details" id="brand-growth-details" hidden>
        <p>We build marketing systems that integrate seamlessly with your technical infrastructure. Our approach ensures consistent messaging and data flow throughout the customer journey.</p>
      </div>
    </div>
  </div>
  
  <div class="strategic-integration">
    <h3>Strategic Integration Services</h3>
    <p>We bring the whole system together.</p>
    <ul>
      <li>Platform refactoring & technical audits</li>
      <li>AI workflow orchestration</li>
      <li>Team augmentation / Dev partnership</li>
      <li>Founder-level strategy, no-bullshit approach</li>
    </ul>
  </div>
</section>
```

### CSS Additions

Add these styles to your CSS file:

```css
/* Services Section Styles */
.services-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin: 3rem 0;
}

.service-block {
  background-color: rgba(26, 23, 20, 0.7);
  border: 1px solid var(--color-border);
  border-radius: 8px;
  padding: 2rem;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  position: relative;
  overflow: hidden;
}

.service-block::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 4px;
  background: linear-gradient(to right, var(--color-link), var(--color-link-hover));
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.5s ease;
}

.service-block:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
}

.service-block:hover::before {
  transform: scaleX(1);
}

.service-title {
  font-family: "RishgularModel", sans-serif;
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: var(--color-link);
}

.service-tagline {
  font-style: italic;
  margin-bottom: 1.5rem;
  font-size: 1.1rem;
}

.service-list {
  list-style: none;
  padding: 0;
  margin: 0 0 1.5rem 0;
}

.service-list li {
  padding-left: 1.5rem;
  position: relative;
  margin-bottom: 0.75rem;
}

.service-list li::before {
  content: '•';
  position: absolute;
  left: 0;
  color: var(--color-link);
}

.service-expand-btn {
  background: none;
  border: 1px solid var(--color-link);
  color: var(--color-link);
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  font-family: inherit;
  transition: background-color 0.3s ease, color 0.3s ease;
}

.service-expand-btn:hover {
  background-color: var(--color-link);
  color: var(--color-bg);
}

.service-details {
  margin-top: 1.5rem;
  padding-top: 1.5rem;
  border-top: 1px solid var(--color-border);
  opacity: 0;
  height: 0;
  overflow: hidden;
  transition: opacity 0.5s ease, height 0.5s ease;
}

.service-details.expanded {
  opacity: 1;
  height: auto;
}

.strategic-integration {
  margin-top: 4rem;
  padding: 2rem;
  background-color: rgba(138, 111, 77, 0.2);
  border-radius: 8px;
}

.strategic-integration h3 {
  font-family: "RishgularModel", sans-serif;
  font-size: 1.8rem;
  margin-bottom: 1rem;
  color: var(--color-link);
}

.strategic-integration ul {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
  list-style: none;
  padding: 0;
  margin: 1.5rem 0 0 0;
}

.strategic-integration li {
  padding-left: 1.5rem;
  position: relative;
}

.strategic-integration li::before {
  content: '→';
  position: absolute;
  left: 0;
  color: var(--color-link);
}

@media screen and (max-width: 768px) {
  .services-grid {
    grid-template-columns: 1fr;
  }
  
  .strategic-integration ul {
    grid-template-columns: 1fr;
  }
}
```

### JavaScript for Service Section

Add this JavaScript to handle the service section interactions:

```javascript
// Service section interactions
document.addEventListener('DOMContentLoaded', () => {
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
});
```

---

## 2. Call-to-Action Elements

Add strategic CTAs throughout the site to encourage user engagement.

### Primary CTA in Header

Add this to the header section in index.html:

```html
<div class="frame__cta">
  <a href="#contact" class="cta-button primary">Get in Touch</a>
</div>
```

### Section CTAs

Add these CTAs at the end of key sections:

```html
<!-- After the intro section -->
<div class="cta-container">
  <a href="#services" class="cta-button secondary">Explore Our Services</a>
</div>

<!-- After the services section -->
<div class="cta-container">
  <a href="#process" class="cta-button secondary">Learn About Our Process</a>
</div>

<!-- After the collaborations section -->
<div class="cta-container">
  <a href="#contact" class="cta-button primary">Start a Project</a>
</div>
```

### Floating CTA

Add a floating CTA that appears after scrolling:

```html
<div class="floating-cta" id="floatingCta">
  <a href="#contact" class="cta-button primary">Contact Us</a>
</div>
```

### CSS for CTAs

Add these styles to your CSS file:

```css
/* CTA Styles */
.cta-button {
  display: inline-block;
  padding: 0.8rem 1.5rem;
  border-radius: 4px;
  font-family: "RishgularModel", sans-serif;
  font-size: 1rem;
  text-transform: uppercase;
  letter-spacing: 1px;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  text-decoration: none;
}

.cta-button::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.1);
  transform: translateX(-100%);
  transition: transform 0.3s ease;
}

.cta-button:hover::before {
  transform: translateX(0);
}

.cta-button.primary {
  background-color: var(--color-link);
  color: var(--color-bg);
  border: none;
}

.cta-button.primary:hover {
  background-color: var(--color-link-hover);
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  text-decoration: none;
}

.cta-button.secondary {
  background-color: transparent;
  color: var(--color-link);
  border: 1px solid var(--color-link);
}

.cta-button.secondary:hover {
  background-color: rgba(255, 184, 112, 0.1);
  transform: translateY(-2px);
  text-decoration: none;
}

.cta-container {
  margin: 2rem 0;
  text-align: center;
}

.frame__cta {
  grid-area: cta;
  justify-self: end;
  align-self: center;
}

.floating-cta {
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 100;
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.3s ease, transform 0.3s ease;
  pointer-events: none;
}

.floating-cta.visible {
  opacity: 1;
  transform: translateY(0);
  pointer-events: auto;
}

@media screen and (max-width: 768px) {
  .frame__cta {
    grid-area: cta;
    justify-self: center;
    margin-top: 1rem;
  }
}
```

### JavaScript for Floating CTA

Add this JavaScript to handle the floating CTA:

```javascript
// Floating CTA
document.addEventListener('DOMContentLoaded', () => {
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
});
```

---

## 3. Contact Form Implementation

Add a functional contact form to allow visitors to get in touch.

### HTML Implementation

Add this section before the footer:

```html
<section class="content content--padded" id="contact">
  <h4 class="type-tiny">Contact</h4>
  <p class="content__text">Ready to transform your digital experience? Get in touch with us to discuss your project, ask questions, or learn more about our services.</p>
  
  <div class="contact-container">
    <form id="contactForm" class="contact-form">
      <div class="form-group">
        <label for="name">Name</label>
        <input type="text" id="name" name="name" required>
      </div>
      
      <div class="form-group">
        <label for="email">Email</label>
        <input type="email" id="email" name="email" required>
      </div>
      
      <div class="form-group">
        <label for="company">Company (Optional)</label>
        <input type="text" id="company" name="company">
      </div>
      
      <div class="form-group">
        <label for="service">Service of Interest</label>
        <select id="service" name="service">
          <option value="">Select a service...</option>
          <option value="digital-systems">Digital Systems Design</option>
          <option value="app-development">App Development</option>
          <option value="ai-automation">AI-First Automation & Ops</option>
          <option value="brand-growth">Brand & Growth Systems</option>
          <option value="strategic-integration">Strategic Integration</option>
          <option value="other">Other</option>
        </select>
      </div>
      
      <div class="form-group">
        <label for="message">Message</label>
        <textarea id="message" name="message" rows="5" required></textarea>
      </div>
      
      <div class="form-group">
        <button type="submit" class="cta-button primary">Send Message</button>
      </div>
    </form>
    
    <div class="contact-info">
      <div class="contact-method">
        <h3>Email</h3>
        <p><a href="mailto:hello@pineappleinnovation.com">hello@pineappleinnovation.com</a></p>
      </div>
      
      <div class="contact-method">
        <h3>Location</h3>
        <p>San Francisco, CA</p>
      </div>
      
      <div class="contact-method">
        <h3>Follow Us</h3>
        <div class="social-links">
          <a href="#" aria-label="LinkedIn">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
          </a>
          <a href="#" aria-label="Twitter">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>
          </a>
          <a href="#" aria-label="Instagram">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
          </a>
        </div>
      </div>
    </div>
  </div>
  
  <!-- Form submission message -->
  <div id="formSubmissionMessage" class="form-submission-message" hidden>
    <div class="message-content">
      <h3>Thank You!</h3>
      <p>Your message has been received. We'll get back to you shortly.</p>
      <button id="closeMessage" class="cta-button secondary">Close</button>
    </div>
  </div>
</section>
```

### CSS for Contact Form

Add these styles to your CSS file:

```css
/* Contact Form Styles */
.contact-container {
  display: grid;
  grid-template-columns: 3fr 2fr;
  gap: 3rem;
  margin: 3rem 0;
}

.contact-form {
  background-color: rgba(26, 23, 20, 0.7);
  border: 1px solid var(--color-border);
  border-radius: 8px;
  padding: 2rem;
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
}

.form-group input,
.form-group select,
.form-group textarea {
  width: 100%;
  padding: 0.75rem;
  background-color: rgba(248, 245, 240, 0.1);
  border: 1px solid var(--color-border);
  border-radius: 4px;
  color: var(--color-text);
  font-family: inherit;
  font-size: 1rem;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
}

.form-group input:focus,
.form-group select:focus,
.form-group textarea:focus {
  outline: none;
  border-color: var(--color-link);
  box-shadow: 0 0 0 2px rgba(255, 184, 112, 0.2);
}

.contact-info {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.contact-method {
  margin-bottom: 2rem;
}

.contact-method h3 {
  font-family: "RishgularModel", sans-serif;
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
  color: var(--color-link);
}

.social-links {
  display: flex;
  gap: 1rem;
}

.social-links a {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: rgba(255, 184, 112, 0.1);
  color: var(--color-link);
  transition: all 0.3s ease;
}

.social-links a:hover {
  background-color: var(--color-link);
  color: var(--color-bg);
  transform: translateY(-2px);
}

.form-submission-message {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(26, 23, 20, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.3s ease;
}

.form-submission-message.visible {
  opacity: 1;
  pointer-events: auto;
}

.message-content {
  background-color: var(--color-bg);
  border: 1px solid var(--color-border);
  border-radius: 8px;
  padding: 2rem;
  text-align: center;
  max-width: 500px;
  width: 90%;
}

.message-content h3 {
  font-family: "RishgularModel", sans-serif;
  font-size: 2rem;
  margin-bottom: 1rem;
  color: var(--color-link);
}

@media screen and (max-width: 768px) {
  .contact-container {
    grid-template-columns: 1fr;
  }
  
  .contact-info {
    order: -1;
  }
}
```

### JavaScript for Contact Form

Add this JavaScript to handle the contact form:

```javascript
// Contact form handling
document.addEventListener('DOMContentLoaded', () => {
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
});
```

---

## 4. Partners/Clients Section

Add a logo marquee to showcase partners and clients.

### HTML Implementation

Add this section after the "Collaborations" section:

```html
<section class="content content--padded" id="partners">
  <h4 class="type-tiny">Our Partners</h4>
  <p class="content__text">We're proud to collaborate with forward-thinking organizations across industries. Here are some of the partners we've worked with to create transformative digital experiences.</p>
  
  <div class="partners-marquee">
    <div class="marquee-container">
      <div class="marquee-content">
        <!-- Replace with actual partner logos -->
        <div class="partner-logo">
          <div class="logo-placeholder">Partner 1</div>
        </div>
        <div class="partner-logo">
          <div class="logo-placeholder">Partner 2</div>
        </div>
        <div class="partner-logo">
          <div class="logo-placeholder">Partner 3</div>
        </div>
        <div class="partner-logo">
          <div class="logo-placeholder">Partner 4</div>
        </div>
        <div class="partner-logo">
          <div class="logo-placeholder">Partner 5</div>
        </div>
        <div class="partner-logo">
          <div class="logo-placeholder">Partner 6</div>
        </div>
        <div class="partner-logo">
          <div class="logo-placeholder">Partner 7</div>
        </div>
        <div class="partner-logo">
          <div class="logo-placeholder">Partner 8</div>
        </div>
      </div>
      <div class="marquee-content" aria-hidden="true">
        <!-- Duplicate for continuous scrolling -->
        <div class="partner-logo">
          <div class="logo-placeholder">Partner 1</div>
        </div>
        <div class="partner-logo">
          <div class="logo-placeholder">Partner 2</div>
        </div>
        <div class="partner-logo">
          <div class="logo-placeholder">Partner 3</div>
        </div>
        <div class="partner-logo">
          <div class="logo-placeholder">Partner 4</div>
        </div>
        <div class="partner-logo">
          <div class="logo-placeholder">Partner 5</div>
        </div>
        <div class="partner-logo">
          <div class="logo-placeholder">Partner 6</div>
        </div>
        <div class="partner-logo">
          <div class="logo-placeholder">Partner 7</div>
        </div>
        <div class="partner-logo">
          <div class="logo-placeholder">Partner 8</div>
        </div>
      </div>
    </div>
  </div>
</section>
```

### CSS for Partners Marquee

Add these styles to your CSS file:

```css
/* Partners Marquee Styles */
.partners-marquee {
  margin: 3rem 0;
  overflow: hidden;
  position: relative;
  width: 100%;
}

.marquee-container {
