# NOIR ATELIER

**Bold. Minimal. Modern. Editorial.**

A premium editorial-style website that embodies the essence of a digital fashion magazine through typography dominance, layout precision, and cinematic scroll experiences.

## 🎯 Project Overview

NOIR ATELIER is a high-end fashion and cultural magazine website that prioritizes:

- **Typography as the primary visual element**
- **Layout precision and spatial rhythm**
- **Scroll choreography that feels editorial**
- **Monochrome color discipline**
- **Performance as part of luxury**

## 🏛 Brand Philosophy

> We create spaces where silence speaks louder than words. Where each element is placed with intention, not impulse. Where typography carries emotion and whitespace creates tension.

This is not fashion. This is presence.

## 🛠 Technical Architecture

### Core Technologies
- **Vanilla HTML5** - Semantic structure
- **Custom CSS Architecture** - Modular, maintainable stylesheets
- **GSAP + ScrollTrigger** - Precise scroll animations
- **Lenis** - Premium smooth scrolling
- **No frameworks** - Lightweight, performant codebase

### File Structure
```
NOIR ATELIER/
├── index.html              # Main HTML structure
├── css/
│   ├── normalize.css       # CSS reset and base styles
│   ├── typography.css     # Typography system and scale
│   ├── layout.css         # Grid system and layout components
│   └── animations.css     # Animation classes and effects
├── js/
│   ├── main.js            # Core application logic
│   └── animations.js      # GSAP animation system
└── README.md              # This file
```

## 📐 Design System

### Typography Scale
- **H1 Desktop**: 96-140px (Condensed Bold)
- **H2 Desktop**: 64-88px (Condensed Bold)
- **H3 Desktop**: 40-56px (Condensed Bold)
- **Body Desktop**: 18px (Inter)

### Color System
- **Primary Black**: #0b0b0b
- **Secondary Black**: #111
- **White**: #ffffff

### Grid System
- **12-column layout** (1200-1440px max width)
- **Large outer margins** for breathing room
- **Generous vertical spacing** (120-200px between sections)

## 🎬 Animation Philosophy

Motion serves layout, not the other way around.

### Animation Hierarchy
1. **Primary**: Section transitions
2. **Secondary**: Typography reveals
3. **Micro**: Hover states, subtle zooms

### Timing System
- **Base duration**: 0.8s-1.2s
- **Custom cubic-bezier easing**
- **Sequential staggering** (80ms increments)
- **Calm, measured, never aggressive**

## 📱 Sections Overview

### 1. Hero - Typography Impact
Full viewport height with centered condensed headline and subtle background parallax.

### 2. Statement - Monumental Text
Large bold statement with mask-reveal animations and upward movement on scroll.

### 3. Featured Story - Editorial Layout
Two-column composition with portrait image and content, featuring parallax separation.

### 4. Horizontal Editorial Strip
Full-width horizontal scroll gallery with GSAP-driven motion tied to vertical scroll.

### 5. Manifesto - Bold Declaration
Dark background section with centered text block and soft fade reveals.

### 6. Contact - Minimal Connection
Clean email and Instagram links with underline hover animations only.

## 🎨 Mobile Strategy

### Critical Rules
- **Headlines never cropped**
- **Line breaks manually controlled**
- **Parallax reduced, not removed**
- **Horizontal strip becomes swipe-based**
- **Maintain premium feel, no compression**

### Responsive Breakpoints
- **Desktop**: >1024px
- **Tablet**: 768px-1024px
- **Mobile**: <768px

## ⚡ Performance Features

- **Lazy loading** for all images
- **Optimized animations** with GPU acceleration
- **Reduced motion support** for accessibility
- **Intersection Observer** for viewport detection
- **Debounced scroll events** for smooth performance

## 🚀 Getting Started

### Local Development
1. Clone or download the project
2. Open `index.html` in your browser
3. No build process required - it's vanilla HTML/CSS/JS

### Deployment
Simply upload the entire folder to any web server. The site requires no server-side processing.

### CDN Dependencies
The site uses external CDNs for:
- GSAP (animations)
- Lenis (smooth scroll)
- Google Fonts (typography)

## 🧩 Customization Guide

### Typography
Edit `css/typography.css` to modify:
- Font families
- Typography scale
- Letter spacing
- Line heights

### Colors
Update CSS variables in `css/typography.css`:
```css
:root {
    --color-primary-black: #0b0b0b;
    --color-secondary-black: #111;
    --color-white: #ffffff;
}
```

### Animations
Modify `js/animations.js` for:
- Scroll trigger points
- Animation durations
- Easing functions
- Stagger delays

### Content
Update `index.html` for:
- Text content
- Image URLs
- Section order
- Contact information

## 🏆 Success Criteria

When someone visits NOIR ATELIER, they should think:
> "This feels like a real editorial brand."

Not:
> "This is a developer animation experiment."

The site should feel:
- **Printed**
- **Curated**
- **Composed**
- **Designed with restraint**

## 🔧 Browser Support

- **Modern browsers** (Chrome 90+, Firefox 88+, Safari 14+)
- **Mobile browsers** (iOS Safari 14+, Chrome Mobile 90+)
- **Reduced motion** support for accessibility
- **Touch interactions** optimized for mobile

## 📄 License

This project is proprietary to NOIR ATELIER. All rights reserved.

## 🤝 Contributing

This is a curated editorial experience. Changes should maintain the brand's minimalist philosophy and premium feel.

---

**NOIR ATELIER**  
*The art of presence.*
