# She Can Foundation Website
## "Empowering Her Journey"

This is a premium, high-fidelity single-page website built for the **She Can Foundation** using pure HTML5, CSS3, and modular Vanilla JavaScript. The site implements a narrative-driven scrolling experience built around the core concept: "Empowering Her Journey".

---

## 🚀 Key Features

1. **Interactive Empowerment Journey Timeline:** A scroll-triggered interactive SVG pathway showcasing the 5 stages of a woman's empowerment journey (Education, Awareness, Skills, Confidence, Leadership).
2. **Program Showcase:** Interactive grid displaying the foundation's 7 key focus areas with expand-in-place modal overlays for progressive disclosure.
3. **Featured Initiative Spotlight:** A bold, contrasting section dedicated to highlighting the *Menstrual Hygiene & Period Poverty* campaign with key impact numbers.
4. **Impact Stories Carousel:** A responsive, swipe-supporting slider sharing narrative journeys of real program beneficiaries.
5. **Interactive Engagement Selector:** A dynamic "How Can You Help?" tabbed selector targeting volunteers, awareness advocates, and corporate/individual partners.
6. **Low-Friction Volunteer Signup:** Highly contrast-driven volunteer section with validated email capture, client-side safety checks, and animation-based submission responses.
7. **Premium BEM-based Styling:** Curated warm terracotta/saffron branding with deep forest teal and sand accents (no CSS frameworks), rendering elegant typographic contrast using serif (`Playfair Display`, `Lora`) and sans-serif (`DM Sans`) fonts.
8. **AA-Grade Accessibility:** Compliant with WCAG 2.1 Level AA standards (including full keyboard navigation, focus indicators, modal traps, and aria labels).

---

## 📁 File Structure

```
she-can/
├── index.html           # Main semantic entry point
├── css/
│   ├── base.css         # Reset styles, design variables, and typography tokens
│   ├── layout.css       # Grid system, container boundaries, and spacing utility
│   ├── components.css   # Buttons, cards, modals, tags, and notification classes
│   ├── sections.css     # Styling for page sections (Navigation, Timeline, About, etc.)
│   ├── animations.css   # Keyframes and active transition rules
│   └── responsive.css   # Mobile-first breakpoint modifications
├── js/
│   ├── main.js          # Initialization hub
│   ├── nav.js           # Scroll-aware navigation bar & scrollspy highlight behavior
│   ├── timeline.js      # IntersectionObserver SVG timeline progression
│   ├── carousel.js      # Story slider (click navigation + drag/swipe capabilities)
│   ├── tabs.js          # Switch logic for engagement panels
│   ├── countup.js       # Animated numbers counter logic
│   └── form.js          # Email sign-up client verification and API hook fallback
└── assets/
    ├── images/          # Generated web-optimized image assets
    └── icons/           # Custom SVG timeline indicator shapes
```

---

## 🛠️ Tech Stack & Setup

- **Markup:** HTML5 (Semantic and ARIA standard)
- **Styling:** CSS3 (Variables, CSS Grid, Flexbox, BEM methodology)
- **Scripting:** Vanilla ES6 Javascript (Modular, zero framework dependencies)
- **Libraries (CDN):**
  - **AOS (Animate on Scroll):** Smooth scrolling card fade-ins
  - **Font Awesome 6:** Consistent icon representations
  - **Google Fonts:** Playfair Display, DM Sans, Lora families

Website - https://6a19558049a7155d8fe67bcb--melodic-croquembouche-56f216.netlify.app/
