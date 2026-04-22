/**
 * supabase-config.js — Afrix Properties & Management Group
 * =========================================================
 * Central Supabase configuration loaded on every page via:
 *   <script src="supabase-config.js"></script>
 *
 * HOW TO SET UP:
 *  1. Go to https://supabase.com → New Project
 *  2. Project Settings → API
 *  3. Copy "Project URL" → paste into SUPABASE_URL below
 *  4. Copy "anon public" key → paste into SUPABASE_ANON_KEY below
 *
 * DATA FLOW:
 *  Browser → supabase-config.js (creates client) →
 *  SupabaseClient → calls .from('table').select() etc. →
 *  Supabase cloud DB → returns JSON → page renders it
 *
 * Developer: Ibratech | 0544823484
 */

// ─── STEP 1: Replace these two values with YOUR Supabase project credentials ───
const SUPABASE_URL  = 'https://rjltkhuvvekixqzedwjj.supabase.co';  // ← paste your URL here
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJqbHRraHV2dmVraXhxemVkd2pqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzY4MTM4MzMsImV4cCI6MjA5MjM4OTgzM30.7rmxAmkpGGkuhhiJgVp5LAMdtOrRD-mgbVxVUi90Nsc';         // ← paste your anon key here
// ─────────────────────────────────────────────────────────────────────────────────

// ─── WhatsApp number (change if number changes) ───
const AFRIX_WA = '233539484203';
const AFRIX_WA_LINK = `https://wa.me/${AFRIX_WA}`;

// ─── Load Supabase JS from CDN (no npm needed) ───
// This must run before any page script that uses `window.sb`
(function loadSupabase() {
  if (window.supabase) {
    window.sb = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
    return;
  }
  const script = document.createElement('script');
  script.src = 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2';
  script.onload = () => {
    window.sb = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
    // Fire custom event so pages know Supabase is ready
    document.dispatchEvent(new Event('supabase:ready'));
  };
  script.onerror = () => console.error('[Afrix] Failed to load Supabase SDK. Check internet connection.');
  document.head.appendChild(script);
})();

// ─── HELPER: Wait for Supabase to be ready, then run callback ───
window.onSbReady = function(cb) {
  if (window.sb) { cb(window.sb); return; }
  document.addEventListener('supabase:ready', () => cb(window.sb), { once: true });
};

// ─── HELPER: Format price nicely ───
window.formatPrice = function(price, period) {
  if (!price) return 'Price on request';
  const formatted = 'GHS ' + Number(price).toLocaleString();
  const periods = { per_month: '/mo', per_night: '/night', total: '' };
  return formatted + (periods[period] || '');
};

// ─── HELPER: Show a toast notification ───
window.showToast = function(msg, type = 'success') {
  const existing = document.getElementById('afrix-toast');
  if (existing) existing.remove();
  const toast = document.createElement('div');
  toast.id = 'afrix-toast';
  const colors = { success: '#16a34a', error: '#dc2626', info: '#0B1E33' };
  toast.style.cssText = `
    position:fixed; bottom:100px; right:24px; z-index:99999;
    background:${colors[type] || colors.info}; color:#fff;
    padding:14px 20px; border-radius:12px; font-size:.875rem;
    font-family:'Poppins',sans-serif; font-weight:500;
    box-shadow:0 8px 24px rgba(0,0,0,.2); max-width:320px;
    animation:toastIn .3s ease;
  `;
  const styleEl = document.createElement('style');
  styleEl.textContent = '@keyframes toastIn{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}';
  document.head.appendChild(styleEl);
  toast.textContent = msg;
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 4000);
};

// ─── DATABASE SCHEMA (reference only — run in Supabase SQL Editor) ───
/*
  ════════════════════════════════════════════════════════════
  SUPABASE SQL — Run these in Supabase → SQL Editor → New Query
  ════════════════════════════════════════════════════════════

  -- 1. PROPERTIES TABLE
  CREATE TABLE properties (
    id          uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    title       text NOT NULL,
    description text,
    price       numeric NOT NULL DEFAULT 0,
    price_period text DEFAULT 'total',   -- total | per_month | per_night
    location    text NOT NULL,
    city        text DEFAULT 'accra',
    type        text NOT NULL,           -- villa | apartment | house | office | land | townhouse | penthouse
    listing_type text NOT NULL,          -- buy | rent | short_stay | airbnb | long_term
    bedrooms    integer DEFAULT 0,
    bathrooms   integer DEFAULT 0,
    size        numeric,
    features    jsonb DEFAULT '[]',      -- ["Pool","Security","Parking"]
    images      jsonb DEFAULT '[]',      -- ["https://...url1","https://...url2"]
    featured    boolean DEFAULT false,
    status      text DEFAULT 'active',   -- active | pending | sold | rented
    created_at  timestamptz DEFAULT now(),
    updated_at  timestamptz DEFAULT now()
  );

  -- 2. LEADS TABLE (all form submissions)
  CREATE TABLE leads (
    id          uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    name        text,
    phone       text,
    email       text,
    subject     text,
    message     text,
    lead_type   text DEFAULT 'general',  -- general | inquiry | listing | management | diaspora
    property_id uuid REFERENCES properties(id) ON DELETE SET NULL,
    status      text DEFAULT 'new',      -- new | contacted | closed
    created_at  timestamptz DEFAULT now()
  );

  -- 3. PROPERTY SUBMISSIONS (sell requests from public)
  CREATE TABLE property_submissions (
    id            uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    owner_name    text,
    phone         text,
    email         text,
    listing_type  text,
    property_type text,
    address       text,
    price         text,
    bedrooms      text,
    description   text,
    status        text DEFAULT 'pending', -- pending | approved | rejected
    created_at    timestamptz DEFAULT now()
  );

  -- 4. MANAGEMENT REQUESTS
  CREATE TABLE management_requests (
    id               uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    name             text,
    phone            text,
    email            text,
    property_address text,
    property_type    text,
    message          text,
    status           text DEFAULT 'new',
    created_at       timestamptz DEFAULT now()
  );

  -- 5. SITE CONTENT (CMS)
  CREATE TABLE site_content (
    id        uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    page      text NOT NULL,
    section   text NOT NULL,
    title     text,
    content   text,
    updated_at timestamptz DEFAULT now(),
    UNIQUE(page, section)
  );

  -- Insert default content rows
  INSERT INTO site_content (page, section, title, content) VALUES
    ('home','hero_title','Professional Property Solutions You Can Trust','We make buying, selling, renting and managing property in Ghana easy and stress-free.'),
    ('home','hero_sub','','Ghana''s #1 trusted real estate partner — Managing Value. Building Trust.'),
    ('home','stats_properties','500+','Properties Listed'),
    ('home','stats_years','12+','Years Experience'),
    ('home','stats_satisfaction','98%','Client Satisfaction'),
    ('about','story_title','Ghana''s Most Trusted Property Partner',''),
    ('about','story_text','Afrix Properties & Management Group was founded with a mission to make real estate in Ghana accessible, transparent and rewarding for everyone.','');

  -- 6. MEDIA LIBRARY
  CREATE TABLE media (
    id         uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    filename   text,
    url        text NOT NULL,
    bucket     text DEFAULT 'property-images',
    size       integer,
    created_at timestamptz DEFAULT now()
  );

  -- ── ROW LEVEL SECURITY (RLS) ──
  -- Enable RLS on all tables
  ALTER TABLE properties ENABLE ROW LEVEL SECURITY;
  ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
  ALTER TABLE property_submissions ENABLE ROW LEVEL SECURITY;
  ALTER TABLE management_requests ENABLE ROW LEVEL SECURITY;
  ALTER TABLE site_content ENABLE ROW LEVEL SECURITY;
  ALTER TABLE media ENABLE ROW LEVEL SECURITY;

  -- PUBLIC can read active properties and site_content
  CREATE POLICY "Public read active properties"
    ON properties FOR SELECT USING (status = 'active');

  CREATE POLICY "Public read site_content"
    ON site_content FOR SELECT USING (true);

  -- PUBLIC can INSERT leads, submissions, management requests
  CREATE POLICY "Public insert leads"
    ON leads FOR INSERT WITH CHECK (true);

  CREATE POLICY "Public insert submissions"
    ON property_submissions FOR INSERT WITH CHECK (true);

  CREATE POLICY "Public insert management requests"
    ON management_requests FOR INSERT WITH CHECK (true);

  -- AUTHENTICATED (admin) can do everything
  CREATE POLICY "Admin full access properties"
    ON properties FOR ALL USING (auth.role() = 'authenticated');

  CREATE POLICY "Admin full access leads"
    ON leads FOR ALL USING (auth.role() = 'authenticated');

  CREATE POLICY "Admin full access submissions"
    ON property_submissions FOR ALL USING (auth.role() = 'authenticated');

  CREATE POLICY "Admin full access management"
    ON management_requests FOR ALL USING (auth.role() = 'authenticated');

  CREATE POLICY "Admin full access content"
    ON site_content FOR ALL USING (auth.role() = 'authenticated');

  CREATE POLICY "Admin full access media"
    ON media FOR ALL USING (auth.role() = 'authenticated');

  -- ── STORAGE BUCKET ──
  -- In Supabase Dashboard → Storage → New Bucket
  -- Name: property-images
  -- Public: YES (check the toggle)

  -- Storage policy (allow admin uploads)
  CREATE POLICY "Admin upload images"
    ON storage.objects FOR INSERT
    WITH CHECK (bucket_id = 'property-images' AND auth.role() = 'authenticated');

  CREATE POLICY "Public read images"
    ON storage.objects FOR SELECT
    USING (bucket_id = 'property-images');
*/