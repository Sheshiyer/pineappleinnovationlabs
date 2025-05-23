# Pineapple Innovation Labs - OnScrollLayoutFormations

A modern, scroll-based website for Pineapple Innovation Labs featuring dynamic grid animations, accessibility features, and voice command navigation.

## Overview

This website showcases Pineapple Innovation Labs' digital transformation services through an engaging, scroll-driven experience. As users scroll through the site, content sections transition with fluid animations – images reposition into new grid formations, and text emerges contextually.

The site follows a linear narrative flow:
- Intro → About → Vision → Process → Collaborations → Future → Contact

## Features

- **Dynamic Grid Animations**: Custom grid-driven animations where images and text rearrange as the user scrolls
- **Smooth Scrolling**: Fluid scrolling experience using Lenis
- **Voice Navigation**: Optional voice command functionality for hands-free navigation
- **Accessibility**: Skip links, ARIA attributes, keyboard navigation, and reduced motion support
- **Responsive Design**: Adapts to different screen sizes and devices

## Technologies Used

- **HTML5/CSS3**: Modern semantic markup and styling
- **JavaScript**: Vanilla JS for core functionality
- **GSAP & ScrollTrigger**: For scroll-based animations
- **Lenis**: For smooth scrolling
- **Web Speech API**: For voice command functionality

## Getting Started

### Prerequisites

- A modern web browser (Chrome, Firefox, Safari, Edge)
- Local web server (optional, for development)

### Installation

1. Clone the repository:
   ```
   git clone [repository-url]
   ```

2. Navigate to the project directory:
   ```
   cd OnScrollLayoutFormations
   ```

3. Open `index.html` in your browser or serve it using a local web server.

### Development

To modify the website:

1. Edit `index.html` to update content and structure
2. Modify `css/base.css` to change styling
3. Update animations in `js/index.js`
4. Adjust voice commands in `js/voice-input.js`

## Voice Commands

The website includes voice command functionality as a supplementary navigation method. To use it:

1. Click the microphone icon in the bottom right corner (or press Alt+V)
2. Speak one of the following commands:
   - "Go to [section]" (e.g., "Go to About", "Go to Contact")
   - "Next section" or "Scroll down"
   - "Previous section" or "Scroll up"
   - "Help" or "What can I say"

## Accessibility

This website includes several accessibility features:

- Skip link for keyboard users
- ARIA roles and attributes
- Keyboard navigation support
- Reduced motion support (respects `prefers-reduced-motion` setting)
- Focus management for interactive elements

## Future Enhancements

See [todo.md](todo.md) for a list of planned enhancements and pending tasks.

## License

This project is licensed under the terms of the license included in the repository.

## Credits

- Original ScrollFormation template concept
- GSAP animation library
- Lenis smooth scrolling library
- Web Speech API for voice recognition
