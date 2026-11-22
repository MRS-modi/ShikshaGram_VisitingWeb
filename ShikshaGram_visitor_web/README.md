# ShikshaGram promotional website

**Tagline:** Where technology meets education

## What's included
- Responsive promotional landing page
- Larger, accessible typography and saffron/navy/green identity
- Light/dark mode toggle (remembers preference when browser storage is available)
- Product-style dashboard visual
- Feature sections, auto-sliding animated workflow carousel with pause/play controls, role cards, CTA and FAQs
- Interactive browser simulator with role switching, attendance interactions, resource cards, performance preview, and scripted AI concept demo
- Mobile navigation and subtle scroll reveal effects
- Larger, more visible header/footer logo with readable tagline
- Finalized ShikshaGram logo asset

## Run locally
1. Extract the ZIP.
2. Open this folder in VS Code.
3. Run `index.html` with the Live Server extension, or open it directly in a modern browser.
4. Internet is only needed for Google Fonts. The site otherwise runs locally.

## Important demo limitations
The simulator uses fictional sample data and runs in the browser. The “AI assistant” is a scripted demonstration, not a connected AI model. No real student data is collected or stored. Authentication, database, uploads, messaging, and production AI require backend integration.

## Files
- `index.html`
- `styles.css`
- `script.js`
- `assets/shikshagram-logo.png`


## Corrected polish update
- Restored the original Version 2 website layout and sections.
- Kept the original approved ShikshaGram logo artwork (`assets/shikshagram-logo.png`); no replacement icon was introduced.
- Increased the header/footer logo size and improved tagline readability.
- Added restrained CSS 3D motion to the existing dashboard preview without rebuilding the page or removing the AI simulator, theme toggle, or workflow carousel.


## Final brand update
- Selected logo option 2 (horizontal logo) from the user's provided logo showcase.
- The horizontal lockup includes the icon, ShikshaGram wordmark, and official tagline.
- Increased header and footer logo display size and retained the existing site structure, AI demo, theme toggle, and workflow carousel.
- Kept subtle 3D motion on the existing dashboard rather than replacing the site's layout.


## V4 update
- Transparent light-mode and dark-mode horizontal logo variants; JavaScript switches the logo when the theme changes.
- Added platform details cards and a human-led learning / privacy principles section.
- Expanded AI simulator outputs with practical steps and teacher-review guidance.
- Clearly labels the AI demo as scripted example content, not a live AI model.
- Expanded product explanation while preserving the existing layout, workflow carousel, theme toggle, and demo interactions.

## V5: Comprehensive Responsive & UX Polish (Mobile, Tablet, Laptop)
- **Universal Responsiveness**: Full layout adaptation across mobile (320px–539px), phablet/small tablet (540px–767px), tablet portrait & landscape (768px–1023px), laptops (1024px–1200px), and large desktops (>1200px).
- **Dynamic Theme-Aware Logos**: Properly utilizes transparent RGBA logo assets (`assets/shikshagram-logo-light.png` and `assets/shikshagram-logo-dark.png`) that smoothly switch when changing between Light and Dark modes, removing artificial white bounding boxes.
- **Mobile Navigation Drawer**: Accessible hamburger menu with backdrop overlay, scroll lock, keyboard Escape trap, and quick mobile CTA button.
- **ScrollSpy Navigation**: Automatically highlights active navigation links as the user scrolls through the page.
- **Workflow Carousel Upgrades**: Added previous (`‹`) and next (`›`) controls, pause/play toggle, and touch swipe gestures (`touchstart`/`touchend`) for mobile and tablet users.
- **Adaptive Simulator Layout**: Responsive simulator architecture that transforms into an intuitive horizontal tab navigation on mobile and tablet devices, stacking attendance and AI assistant widgets to prevent content crowding.
- **Modern Toast Notifications**: Replaced browser `alert()` popups in the study materials demo with non-intrusive floating toast notifications.
- **Floating Back-to-Top Button**: Smooth scroll back to top button on longer screens and mobile viewports.
- **Accessibility & Motion Compliance**: Proper ARIA attributes, minimum 44px touch targets on mobile, and full `@media (prefers-reduced-motion)` support.
