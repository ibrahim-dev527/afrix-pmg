# 🏠 Afrix Properties & Management Group — Website Documentation

**Tagline:** Managing Value. Building Trust.  
**Developer:** Ibratech | WhatsApp: 0544823484  
**Client:** 0539484203 | lotsuibrahim2@gmail.com

---

## Table of Contents

1. [Project Overview](#1-project-overview)
2. [File Structure](#2-file-structure)
3. [How to Open & Deploy](#3-how-to-open--deploy)
4. [Design System — Colors, Fonts & Variables](#4-design-system)
5. [Page-by-Page Guide](#5-page-by-page-guide)
6. [How to Add & Edit Properties](#6-how-to-add--edit-properties)
7. [Changing Contact Info & WhatsApp](#7-changing-contact-info--whatsapp)
8. [How the Search Works](#8-how-the-search-works)
9. [How the Chatbot Works](#9-how-the-chatbot-works)
10. [How the Contact Forms Work](#10-how-the-contact-forms-work)
11. [Animations & Scroll Reveal](#11-animations--scroll-reveal)
12. [SEO & Meta Tags](#12-seo--meta-tags)
13. [Adding a Real Logo / Favicon](#13-adding-logo--favicon)
14. [Mobile Responsiveness](#14-mobile-responsiveness)
15. [Common Customisations](#15-common-customisations)
16. [Deploying to the Internet](#16-deploying-to-the-internet)
17. [Troubleshooting](#17-troubleshooting)

---

## 1. Project Overview

This is a complete, multi-page real estate website built with pure HTML, CSS, and
JavaScript — no frameworks needed. It is designed to:

- Showcase property listings for Afrix Properties & Management Group
- Generate leads via WhatsApp (every form and button routes to WhatsApp)
- Work as a fully deployable frontend website (upload to any web host)
- Be mobile-friendly and look professional on all screen sizes

Tech Stack:
- HTML5 (9 separate pages)
- CSS3 (inside style tags per page)
- Vanilla JavaScript (inside script tags)
- chatbot.js — shared chatbot loaded on all pages
- Google Fonts (Poppins + Playfair Display — loaded via CDN)
- Font Awesome 6.5 (icons — loaded via CDN)
- Unsplash (property images via URL — no local images needed)

---

## 2. File Structure

```
afrix/
|
|-- index.html                <- Home page (loader, hero swiper, search, properties)
|-- properties.html           <- All properties with filter system
|-- property-details.html     <- Single property page (loaded dynamically by ID)
|-- services.html             <- Services overview
|-- about.html                <- About us, team, values, stats
|-- faq.html                  <- Accordion FAQ with category tabs
|-- contact.html              <- 3 forms: General, Inquiry, Listing
|-- property-management.html  <- Property management page with pricing plans
|-- diaspora.html             <- Diaspora investment service page
|
|-- chatbot.js                <- Shared chatbot widget (included on every page)
|
|-- images/                   <- Folder for your logo and local images
|   |-- logo.png              <- Replace this with your actual logo file
|
|-- README.md                 <- This documentation file
```

IMPORTANT: All pages share the same navbar and footer HTML. Since this is pure
HTML (no templating engine), if you update the navbar on one page, you must
manually update it on all other pages too.

---

## 3. How to Open & Deploy

### Viewing Locally (on your computer)

1. Download / unzip the entire afrix/ folder to your computer
2. Open index.html in any modern browser (Chrome, Firefox, Edge, Safari)
3. All pages link to each other via relative paths — no server needed

Note: Google Fonts and Font Awesome icons require an internet connection.
If you're offline, the site will fall back to system fonts and show missing icons.

### Deploying Online

OPTION A — Netlify (Free, easiest, recommended)
1. Go to netlify.com and create a free account
2. Click "Add new site" → "Deploy manually"
3. Drag and drop your entire afrix/ folder onto the upload area
4. Your site goes live instantly with a URL like: afrix-pmg.netlify.app
5. To add your own domain: Site Settings → Domain management → Add custom domain

OPTION B — GitHub Pages (Free)
1. Create a GitHub account and a new repository
2. Upload all project files to the repository
3. Go to Settings → Pages → Source: main branch → Save
4. Site goes live at: yourusername.github.io/repository-name

OPTION C — Traditional Web Hosting (cPanel / Plesk)
1. Log in to your hosting control panel
2. Open File Manager → Navigate to the public_html folder
3. Upload all files from the afrix/ folder
4. Your site is live at your domain

---

## 4. Design System

All colors, fonts and spacing are controlled by CSS Variables at the top of each
page's style block. Changing one variable updates every element that uses it.

```css
:root {
  /* BRAND COLORS — Edit these to retheme the whole site */
  --gold:        #C4922A;   /* Primary gold accent */
  --gold-light:  #E8B84B;   /* Lighter gold for gradients */
  --gold-pale:   #F9EDD0;   /* Very light gold for backgrounds */
  --gold-dark:   #9B7420;   /* Dark gold for text */
  --navy:        #0B1E33;   /* Dark navy — navbar, footer, buttons */
  --navy-mid:    #162D47;   /* Slightly lighter navy for gradients */

  /* NEUTRAL COLORS */
  --white:       #FFFFFF;
  --cream:       #F9F8F5;   /* Off-white background for most sections */
  --gray-200:    #E8E6E0;   /* Border color */
  --gray-400:    #9E9B94;   /* Placeholder text */
  --gray-600:    #5C5A55;   /* Body/secondary text */
  --gray-900:    #1C1C1C;   /* Main text color */

  /* SHADOWS */
  --shadow-sm:   0 2px 8px rgba(0,0,0,0.06);
  --shadow:      0 6px 24px rgba(0,0,0,0.09);
  --shadow-lg:   0 16px 48px rgba(0,0,0,0.14);

  /* SHAPE */
  --radius:      12px;       /* Standard card border radius */
  --radius-lg:   20px;       /* Large cards */
  --radius-pill: 50px;       /* Pill-shaped buttons */

  /* ANIMATION */
  --transition:  all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

  /* LAYOUT */
  --nav-h:       76px;       /* Navbar height */
}
```

Fonts used:
- Playfair Display — headings, hero titles, section titles
- Poppins — all body text, buttons, labels, navigation

To change fonts: update the Google Fonts link in each page's head section,
and update the font-family in the body CSS rule.

---

## 5. Page-by-Page Guide

### index.html — Home Page

| Section | Where to Edit |
|---|---|
| Page loader (2.5s animation) | #page-loader div + JS setTimeout at bottom |
| Hero slides (3 slides) | .hero-slide divs inside #heroSwiper |
| Slide images | img src= inside each .hero-image-main |
| Slide text/buttons | .hero-text content inside each .hero-slide |
| Search bar options | #s-type, #s-location, #s-price, #s-beds selects |
| Featured properties (4 cards) | PROPERTIES array in the script section |
| Stats numbers | .stats-grid — edit .stat-item-num values |
| Services cards | .services-grid section — 6 service cards |
| Testimonials | .testimonials-grid — 3 testimonial cards |
| CTA buttons | .cta-section |

### properties.html — Property Listings

| Section | Where to Edit |
|---|---|
| All property listings | PROPERTIES array in script section |
| Filter dropdowns | #f-status, #f-type, #f-location, #f-beds, #f-price |
| Results per page | const PER_PAGE = 8 (change number) |
| Sidebar card | .sidebar-card div at the bottom of the sidebar |

### property-details.html — Single Property

This page is dynamic. It reads ?id=N from the URL to display the matching property.
Example: property-details.html?id=3 shows the property with id: 3.

The PROPERTIES array here must be kept in sync with properties.html.
Both files must have the same property objects.

### services.html — Services Page

Each .service-hero-card is one service. Edit title, description, image, and the
WhatsApp link (href) inside each card.

### about.html — About Page

- Edit the company story in .story-text paragraphs
- Update team members in .team-grid — each .team-card is one person
- Stats numbers are hardcoded in .stats-section — update manually

### faq.html — FAQ Page

FAQs are in 6 category groups:
- cat-buying, cat-renting, cat-selling, cat-management, cat-diaspora, cat-general

To add a new FAQ:
1. Find the correct category group (e.g. id="cat-buying")
2. Copy one .faq-item block
3. Paste it at the end of that group
4. Update the question text in .faq-question and answer in .faq-answer p

### property-management.html — Management Page

- Edit the 6 included service cards in .included-grid
- Edit the 3 pricing plan cards in .plans-grid
- Edit the 5-step process in .process-steps

### diaspora.html — Diaspora Services

- Edit the country flags strip at the top (.flags-strip)
- Edit the 6 benefit cards in .benefits-grid
- Edit the 4-step process in .process-grid
- Edit the 3 testimonials in .testimonials-grid

### contact.html — Contact Page

Contains 3 form tabs that switch between:
1. General Enquiry form
2. Property Inquiry form
3. List My Property form

All 3 forms send data to WhatsApp as a prefilled message.
See section 10 for how the forms work.

---

## 6. How to Add & Edit Properties

The PROPERTIES array stores all listing data. It lives in two files:
- properties.html (listings page)
- property-details.html (detail page — needs all 3 images)

Both must be kept in sync.

### Property object structure:

```javascript
{
  id: 13,                        // Unique ID — increment from the last one
  title: "4-Bed House",          // Name shown on property card
  type: "house",                 // villa | apartment | house | townhouse
                                 // penthouse | office | land
  status: "sale",                // "sale" or "rent"
  price: 1500000,                // Number only — for rent: monthly amount
  location: "Tema, Ghana",       // Display location string
  city: "tema",                  // Filter key: accra | tema | kumasi | takoradi
  bedrooms: 4,                   // Number (use 0 for land/offices)
  bathrooms: 3,                  // Number
  size: 250,                     // Floor area in square metres
  image: "https://images.unsplash.com/photo-XXXX?w=600&h=450&fit=crop",
  // For property-details.html, also add:
  images: [
    "https://...main-image...",  // [0] Main gallery image
    "https://...thumb-1...",     // [1] Top thumbnail
    "https://...thumb-2...",     // [2] Bottom thumbnail
  ],
  description: "Full description of the property...",
  features: ["Pool", "Security", "Generator", "Parking"]
}
```

### Steps to add a new property:

1. Find a property photo on unsplash.com, copy the URL, add ?w=600&h=450&fit=crop&q=80

2. Open properties.html in a text editor

3. Scroll down to find: const PROPERTIES = [

4. Copy an existing property object (from { to },)

5. Paste it after the last object and update all fields

6. Make sure the id is unique (next number after the last one)

7. Open property-details.html and add the same object to its PROPERTIES array,
   but also include the images: [] array with 3 image URLs

8. Save both files and test in the browser

### To remove/hide a property:

Option A (delete): Remove the entire { ... }, object from both files.

Option B (hide without deleting):
Add hidden: true to the object, then add this line to the filter function in
properties.html:
  if (p.hidden) return false;

---

## 7. Changing Contact Info & WhatsApp

### Business WhatsApp Number

To change from 233539484203 to a new number:

Step 1 — In chatbot.js, find and update:
  const WHATSAPP_NUMBER = "233539484203";

Step 2 — In all HTML files, use Find & Replace (VS Code: Ctrl+H or Cmd+H):
  Find:    233539484203
  Replace: your new number (international format, no + sign)

WhatsApp format: country code + number, no spaces, no + sign
Ghana example: 233 + 0XXXXXXXXX (drop the leading 0) = 233XXXXXXXXX
UK example:    447XXXXXXXXX
US example:    1XXXXXXXXXX

### Business Email

In all HTML files, use Find & Replace:
  Find:    lotsuibrahim2@gmail.com
  Replace: your new email address

### Business Phone (clickable)

In all HTML files, use Find & Replace:
  Find:    0539484203
  Replace: your new phone number
Also update the tel: links:
  Find:    href="tel:0539484203"
  Replace: href="tel:YOURNUMBER"

### Developer Credit (Ibratech)

Each page footer contains:
  Website built by Ibratech · 0544823484

To update: search for 233544823484 and 0544823484 and replace with new numbers.

---

## 8. How the Search Works

The search bar on index.html collects dropdown values and redirects to
properties.html with URL query parameters:

```javascript
function handleSearch() {
  const type     = document.getElementById('s-type').value;
  const location = document.getElementById('s-location').value;
  const price    = document.getElementById('s-price').value;
  const beds     = document.getElementById('s-beds').value;
  const status   = activeTab; // "buy" or "rent"

  // Build URL: properties.html?type=apartment&location=accra&status=rent
  const params = new URLSearchParams();
  if (type)     params.set('type', type);
  if (location) params.set('location', location);
  if (price)    params.set('maxPrice', price);
  if (beds)     params.set('beds', beds);
  if (status !== 'manage') params.set('status', status);

  window.location.href = 'properties.html?' + params.toString();
}
```

On properties.html, applyURLParams() reads these params and pre-fills the
filter dropdowns, then calls applyFilters() to filter the PROPERTIES array.

### To add a new location to the search:

1. Add an option to index.html search dropdown:
   <option value="tamale">Tamale</option>

2. Add the same option to properties.html filter dropdown:
   <option value="tamale">Tamale</option>

3. Set city: "tamale" on any properties in that location in the PROPERTIES array

---

## 9. How the Chatbot Works

chatbot.js is a self-contained floating chat widget. It is loaded on every page:
  <script src="chatbot.js"></script>

How it works:
1. Page loads → buildChatbot() injects the chat button and widget HTML into body
2. User clicks the gold chat button → widget opens
3. Greeting message appears on first open
4. Quick reply buttons let users pick a topic
5. Each topic maps to a response in the chatResponses object
6. A "Chat on WhatsApp" bar is always visible at the bottom

### To add a new quick reply button:

In chatbot.js, find the quickReplies array:

```javascript
const quickReplies = [
  { label: "🏠 Browse Properties", action: "properties" },
  // Add your new button here:
  { label: "🏢 Commercial Spaces", action: "commercial" },
];
```

Then add a matching response in chatResponses:

```javascript
commercial: {
  text: "We have great commercial office spaces available.",
  action: { label: "Browse Commercial", href: "properties.html?type=office" },
  whatsapp: "Hello Afrix, I'm looking for commercial office space.",
}
```

---

## 10. How the Contact Forms Work

All 3 contact forms on contact.html work without a backend server.
They collect form data and open WhatsApp with a pre-filled message.

How it works step by step:
1. User fills in the form
2. User clicks the submit button
3. JavaScript reads all field values with document.getElementById('id').value
4. Values are combined into a single message string
5. The string is URL-encoded (encodeURIComponent)
6. window.open() opens WhatsApp: https://wa.me/NUMBER?text=ENCODED_MESSAGE
7. WhatsApp opens on user's device with the message pre-written
8. User presses Send to start the conversation

Example:
```javascript
function submitGeneral() {
  const name  = document.getElementById('g-fname').value;
  const phone = document.getElementById('g-phone').value;
  const msg   = document.getElementById('g-msg').value;

  if (!name || !phone || !msg) {
    alert('Please fill in all required fields.');
    return;
  }

  const text = 'Hello Afrix,\n\nName: ' + name + '\nPhone: ' + phone + '\n\n' + msg;
  window.open('https://wa.me/233539484203?text=' + encodeURIComponent(text), '_blank');
}
```

---

## 11. Animations & Scroll Reveal

### Scroll Reveal Animation

Add class="reveal" to any element you want to animate in on scroll.
Add class="reveal-delay-1" (or -2, -3) to stagger the animation.

```html
<div class="reveal">Animates when it enters the viewport</div>
<div class="reveal reveal-delay-1">Animates 0.1s after the first</div>
<div class="reveal reveal-delay-2">Animates 0.2s after the first</div>
```

The animation is powered by IntersectionObserver — no external library needed.
Elements start invisible (opacity 0, 30px below) and slide up into view.

To disable on a specific element, remove the reveal class.

### Hero Swiper

The home page hero auto-advances every 5 seconds. To change speed:
Find this line in index.html script section:
  autoTimer = setInterval(() => goToSlide(current + 1), 5000);
Change 5000 to any millisecond value (3000 = 3 seconds, 7000 = 7 seconds).

To add a 4th hero slide:
1. Copy one of the existing .hero-slide divs
2. Change the content and image
3. Add a new swiper dot: <button class="swiper-dot" data-dot="3"></button>
4. Update the JS: slides.length will automatically pick up the new slide

---

## 12. SEO & Meta Tags

Each page has its own SEO tags in the head section:

```html
<title>Page Title | Afrix PMG</title>
<meta name="description" content="Page description for Google search..." />

<!-- Open Graph: controls how links look when shared on WhatsApp, Facebook -->
<meta property="og:title"       content="Page Title | Afrix PMG" />
<meta property="og:description" content="Short description..." />
<meta property="og:image"       content="https://your-image-url.jpg" />
<meta property="og:url"         content="https://yourdomain.com/page.html" />
```

After deployment, update og:url on every page to your real domain.
og:image should be 1200x630px for best results on social media previews.

---

## 13. Adding Logo & Favicon

The favicon is set in each page's head:
  <link rel="icon" href="images/logo.png" type="image/png" />

To add your logo:
1. Create an images/ folder inside the afrix/ project folder (already exists)
2. Save your logo as logo.png (512x512px PNG with transparent background is ideal)
3. The favicon will appear in browser tabs automatically

To add an image logo to the navbar (currently text-based):
Find this block in each page's navbar:
  <a href="index.html" class="nav-logo">
    <div class="logo-icon"><i class="fas fa-building"></i></div>
    Afrix<span class="accent">PMG</span>
  </a>

Replace with:
  <a href="index.html" class="nav-logo">
    <img src="images/logo.png" alt="Afrix PMG Logo" style="height:38px;width:auto" />
  </a>

---

## 14. Mobile Responsiveness

The site uses CSS media queries for responsive layout:

Breakpoints:
- max-width: 1024px — Tablet: 2-column grids, sidebars may hide
- max-width: 768px  — Mobile: hamburger menu, all grids single column

The hamburger menu is toggled by:
  document.getElementById('hamburger').addEventListener('click', function() {
    document.getElementById('navLinks').classList.toggle('open');
    this.classList.toggle('open');
  });

To test on mobile without a phone:
1. Open Chrome DevTools (press F12)
2. Click the Toggle Device Toolbar icon (looks like a phone/tablet)
3. Select a device from the dropdown to simulate it

---

## 15. Common Customisations

### Change accent color from gold to green:
In :root on any page, update:
  --gold:       #16a34a;
  --gold-light: #22c55e;
  --gold-pale:  #dcfce7;
  --gold-dark:  #15803d;

### Add a new page (e.g. blog.html):
1. Copy about.html as a template
2. Rename to blog.html
3. Update <title> and meta description
4. Change the active nav link class to blog.html
5. Add <li><a href="blog.html">Blog</a></li> to the navbar on EVERY page

### Add a new property type (e.g. Studio):
1. Add <option value="studio">Studio</option> to index.html search dropdown
2. Add same option to properties.html filter dropdown
3. Set type: "studio" on relevant properties in the PROPERTIES array

### Update social media links:
In each footer, find the social buttons and replace href="#" with real URLs:
  <a href="https://www.facebook.com/afrixproperties" class="social-btn">...</a>
  <a href="https://www.instagram.com/afrixproperties" class="social-btn">...</a>

### Add real property images (instead of Unsplash):
1. Upload your photos to a hosting service (Cloudinary, imgbb, or your web host)
2. Get the public URL of each image
3. Replace the Unsplash URLs in the PROPERTIES array with your own URLs
Recommended sizes: 600x450px for thumbnails, 900x600px for detail page

---

## 16. Deploying to the Internet

### Netlify (Recommended — Free)

1. Go to app.netlify.com → Sign up free with email or GitHub
2. Click "Add new site" → "Deploy manually"
3. Drag and drop the entire afrix/ folder onto the upload area
4. Site goes live in seconds at a URL like: wonderful-name-123.netlify.app
5. Custom domain: Site Settings → Domain management → Add custom domain

### After deployment — update og:url:
On every page, change:
  <meta property="og:url" content="https://afrixproperties.com/index.html" />
to your actual live URL.

### HTTPS / SSL:
Netlify provides free SSL certificates automatically. Your site will be
accessible at https:// without any extra configuration.

---

## 17. Troubleshooting

PROBLEM: Chatbot not appearing
SOLUTION: Check chatbot.js is in the same folder as the HTML files.
          Check the script tag at the bottom of body: <script src="chatbot.js"></script>

PROBLEM: WhatsApp link not opening
SOLUTION: Number must be in international format: 233XXXXXXXXX
          No + sign, no spaces, no hyphens.

PROBLEM: Images not loading
SOLUTION: Unsplash URLs require internet. If offline, images won't show.
          Consider downloading and hosting images locally.

PROBLEM: Property details page shows "Property Not Found"
SOLUTION: The id in the URL (?id=N) must match an id in the PROPERTIES array
          inside property-details.html. Check both match exactly.

PROBLEM: Search not filtering correctly
SOLUTION: The city field in PROPERTIES must exactly match the dropdown value.
          Use lowercase: "accra" not "Accra". Same for type field.

PROBLEM: Page is showing wrong active nav link
SOLUTION: Add class="active" to the <a> tag that matches the current page
          in the navbar <ul class="nav-links">. Remove it from others.

PROBLEM: Fonts not loading
SOLUTION: Google Fonts requires internet connection. The link in the head is:
          https://fonts.googleapis.com/css2?family=Poppins...
          Offline = system fonts used instead. This is normal.

PROBLEM: Page loader never disappears
SOLUTION: The loader hides 2.4 seconds after window.load fires. If images fail
          to load, the event may be delayed. This is rare when deployed online.

PROBLEM: Footer links go to wrong pages
SOLUTION: Make sure all href values use relative paths: "about.html" not
          "/about.html" (no leading slash) when opening files directly.

---

Developer Contact:
- WhatsApp: https://wa.me/233544823484
- Call: 0544823484

For custom features, new pages, integrations, or support — message Ibratech.

Last updated: 2026 | Afrix Properties & Management Group
Managing Value. Building Trust.