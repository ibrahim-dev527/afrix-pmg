# 🏠 Afrix Properties & Management Group
### Managing Value. Building Trust.

A complete, dynamic real estate platform built with HTML/CSS/JS + Supabase backend.

---

## ⚡ Quick Start

1. Open `supabase-config.js` — paste your Supabase URL and anon key
2. Run the SQL script from `setup.html` in Supabase SQL Editor
3. Create a `property-images` storage bucket in Supabase (set to Public)
4. Create an admin user in Supabase Auth
5. Open `admin.html` — log in and add your first property
6. Deploy the entire folder to Netlify or your web host

**Full step-by-step guide → open `setup.html` in your browser**

---

## 📁 File Structure

```
afrix/
├── index.html              Home page (hero, search, featured properties)
├── properties.html         Property listings + 7 category tabs + Supabase
├── property-details.html   Single property page (dynamic by ?id=)
├── services.html           Services overview page
├── about.html              About us, team, values
├── faq.html                FAQ with accordion + category tabs
├── contact.html            3 forms → Supabase + WhatsApp
├── property-management.html  Property management + pricing plans
├── diaspora.html           Diaspora investment services
├── admin.html              ⭐ CMS Dashboard (login required)
├── setup.html              ⭐ Step-by-step Supabase setup guide
│
├── supabase-config.js      ⭐ EDIT THIS — paste API keys here
├── chatbot.js              Floating chatbot with 25+ Q&A answers
├── shared.js               Shared JS (navbar, swiper, scroll reveal)
├── shared.css              Shared CSS (all common styles)
│
├── images/
│   └── logo.png            Replace with your actual logo
└── README.md               This file
```

---

## 🗄️ Supabase Tables

| Table | Purpose |
|-------|---------|
| `properties` | All property listings |
| `leads` | Contact form submissions |
| `property_submissions` | Public property sell requests |
| `management_requests` | Property management requests |
| `site_content` | Editable website text (CMS) |
| `media` | Image library |

---

## 🔐 Admin Dashboard (admin.html)

**Features:**
- Secure login via Supabase Auth
- Properties Manager — add/edit/delete with image upload
- Sell Submissions — approve or reject public listings
- Management Requests — view landlord requests
- Leads Manager — all contact forms with WhatsApp quick-reply
- Content Manager — edit homepage/about text without code
- Media Library — upload images, copy URLs

**How to access:**
1. Open `admin.html`
2. Log in with your Supabase Auth credentials
3. Manage everything from the dashboard

---

## 🔑 Connecting Supabase

Open `supabase-config.js` and replace lines 18–19:

```js
const SUPABASE_URL      = 'https://YOUR_PROJECT_ID.supabase.co';
const SUPABASE_ANON_KEY = 'YOUR_ANON_PUBLIC_KEY_HERE';
```

Get these from: Supabase → Project Settings → API

---

## 🏘️ Adding Properties

**Via Admin Dashboard (recommended):**
1. Open `admin.html` → Log in
2. Click "Add Property"
3. Fill in all details, upload images
4. Click "Save Property"
5. Property appears live on the website immediately

**Via Supabase directly:**
```sql
INSERT INTO properties (title, price, listing_type, type, location, city, bedrooms, bathrooms, images, status)
VALUES ('My Property', 500000, 'buy', 'villa', 'East Legon', 'accra', 4, 3, '["https://url.com/img.jpg"]', 'active');
```

---

## 🎨 Customisation

### Change Brand Colors
Edit CSS variables at the top of `shared.css`:
```css
:root {
  --gold:  #C4922A;  /* Change accent color */
  --navy:  #0B1E33;  /* Change primary dark color */
}
```

### Change WhatsApp Number
In `supabase-config.js`:
```js
const AFRIX_WA = '233XXXXXXXXX'; // Ghana format, no + sign
```
Then use Find & Replace across all HTML files for `233539484203`.

### Add a New Property Type
1. Add `<option value="studio">Studio</option>` to filter dropdowns
2. Add the same to admin.html property form
3. Set `type: "studio"` on relevant properties

### Update Category Tabs
Edit the `#catTabs` section in `properties.html`:
```html
<button class="cat-tab" data-cat="airbnb">🛎 Airbnb</button>
```

---

## 📲 WhatsApp Integration

All buttons open pre-filled WhatsApp messages. Format:
```
https://wa.me/233539484203?text=Prefilled%20message%20here
```

Forms save to Supabase AND open WhatsApp simultaneously.

---

## 🚀 Deployment

### Netlify (Free, Recommended)
1. Go to netlify.com → Sign up
2. "Add new site" → "Deploy manually"
3. Drag & drop the `afrix/` folder
4. Done! Site is live at `xxx.netlify.app`

### Custom Domain
- Netlify: Site Settings → Domain management → Add domain
- Update `og:url` and `og:image` tags to use your full domain

---

## 🤖 Chatbot

`chatbot.js` includes:
- 6 categories: Buying, Renting, Selling, Management, Diaspora, General
- 25+ predefined Q&A answers
- Keyword matching for free-text questions
- WhatsApp fallback for unknown questions: "I'm not sure I understand. Please contact us on WhatsApp."

To add new answers: edit the `FAQ_DB` array in `chatbot.js`.

---

## 👨‍💻 Developer

**Website built by Ibratech**
- WhatsApp: [0544823484](https://wa.me/233544823484?text=Hello%20Ibratech,%20I%20want%20a%20real%20estate%20website%20like%20Afrix)
- Call: 0544823484

For support, customisations or new features — message Ibratech on WhatsApp.

---

*© 2024 Afrix Properties & Management Group*
