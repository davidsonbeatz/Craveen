# Craveen - Official Artist Website

## Overview
This is a professional landing page for Craveen (Davidson Danson), a versatile musician who blends different genres to create a unique musical style. The website is designed to showcase his music, videos, and provide contact information for fans and potential collaborators.

## Features
- Responsive design that works on all devices (desktop, tablet, mobile)
- Modern, sleek UI with animations and transitions
- Sections for About, Music, Videos, Gallery, and Contact
- Social media integration
- Contact form for fan engagement
- Smooth scrolling navigation
- Mobile-friendly navigation menu

## File Structure
```
├── index.html          # Main HTML file
├── css/
│   └── style.css       # Main stylesheet
├── js/
│   └── script.js       # JavaScript functionality
├── images/
│   └── hero-bg.svg     # Hero section background
└── README.md           # This file
```

## Customization Guide

### Updating Content
1. **Personal Information**: Edit the text in the HTML file to update Craveen's bio, music descriptions, etc.
2. **Social Media Links**: Update the href attributes in the social media icon links to point to Craveen's actual profiles.
3. **Music and Videos**: Replace the placeholder content with actual music tracks and videos.
4. **Contact Information**: Update the email addresses in the contact section.

### Adding Images
1. Replace the SVG placeholders with actual images of Craveen, album artwork, and gallery photos.
2. For the hero background, replace the SVG with a high-quality photograph or keep the current abstract design.

### Changing Colors
The color scheme can be easily modified by changing the CSS variables at the top of the style.css file:

```css
:root {
    --primary-color: #6200ea;
    --secondary-color: #3700b3;
    --accent-color: #bb86fc;
    --text-color: #ffffff;
    --dark-bg: #121212;
    --darker-bg: #0a0a0a;
    --light-bg: #1e1e1e;
    --lighter-bg: #2d2d2d;
}
```

## Contact Form Integration
The contact form is currently set up for demonstration purposes. To make it functional:

1. Create a server-side script to handle form submissions (PHP, Node.js, etc.)
2. Update the JavaScript in script.js to send the form data to your server
3. Implement email notifications or database storage for the submitted messages

## Browser Compatibility
The website is compatible with all modern browsers including:
- Chrome
- Firefox
- Safari
- Edge

## Credits
- Font Awesome for icons
- Google Fonts for typography (Montserrat and Poppins)

## License
All rights reserved. This website is for the exclusive use of Craveen (Davidson Danson).