# The Elephant Lodge — Website

A 7‑page website for The Elephant Lodge (Sedimothole, Seleteng, Ga‑Mphahlele, Limpopo): **Home, Accommodation & Monthly Rental, Functions, Conference, Gallery, About, Contact.**

Plain HTML/CSS/JS — no build tools, no frameworks. Open `index.html` in a browser to preview it right now.

```
site/
├── index.html            Home
├── accommodation.html    Accommodation & Monthly Rental
├── functions.html        Function venue
├── conference.html       Conference facility
├── gallery.html          Photo gallery (filterable, with lightbox)
├── about.html            About the lodge
├── contact.html          Contact + enquiry form
├── 404.html               Not-found page
├── css/style.css         All styling
├── js/main.js             Nav, gallery filter/lightbox, form handling
├── images/                 All lodge photos + logo
├── robots.txt
└── sitemap.xml
```

---

## 1. Making the contact form work (important)

The enquiry form on `contact.html` needs somewhere to send its emails, because a static site (no server) can't send email on its own. The easiest free option is **Formspree**:

1. Go to https://formspree.io and create a free account with **info@theelephantlodge.co.za**.
2. Create a new form. Formspree gives you an endpoint like `https://formspree.io/f/abcd1234`.
3. Open `contact.html`, find this line:
   ```html
   <form id="enquiry-form" action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
   ```
4. Replace `YOUR_FORM_ID` with your real ID (e.g. `abcd1234`).
5. Confirm the verification email Formspree sends to info@theelephantlodge.co.za.

That's it — every enquiry submitted on the site will now arrive in that inbox. The free Formspree plan covers 50 submissions/month, which is enough for most small lodges; upgrade later if you need more.

**Alternative:** if you'd rather not use a third‑party form service, remove the JavaScript form handling in `js/main.js` and let the `<form>` submit as a plain `mailto:info@theelephantlodge.co.za` — but note mailto links depend on the visitor having a desktop email client configured, so Formspree (or a similar service like Web3Forms or EmailJS) is more reliable.

---

## 2. Hosting for free on GitHub Pages

1. Create a free GitHub account at https://github.com if you don't have one.
2. Create a new repository, e.g. `elephant-lodge-website` (make it Public).
3. Upload every file and folder from this project into the repository:
   - On github.com, open the repo → **Add file → Upload files** → drag in everything (keep the `css/`, `js/`, `images/` folders).
   - Or, if you're comfortable with git:
     ```bash
     git init
     git remote add origin https://github.com/YOUR-USERNAME/elephant-lodge-website.git
     git add .
     git commit -m "Launch The Elephant Lodge website"
     git branch -M main
     git push -u origin main
     ```
4. In the repository, go to **Settings → Pages**.
5. Under **Build and deployment → Source**, choose **Deploy from a branch**, branch `main`, folder `/ (root)`. Save.
6. GitHub will give you a live URL, e.g. `https://YOUR-USERNAME.github.io/elephant-lodge-website/`.

### Using your own domain (theelephantlodge.co.za)
1. At your domain registrar, add a **CNAME** record pointing `www` to `YOUR-USERNAME.github.io`, and/or **A records** for the root domain pointing to GitHub Pages' IPs (GitHub's Pages docs list the current IPs — search "GitHub Pages custom domain A records").
2. In the repo, add a file named `CNAME` (no extension) containing just: `theelephantlodge.co.za`
3. In **Settings → Pages**, enter the custom domain and enable **Enforce HTTPS** once it's verified.
4. Update the `<link rel="canonical">`, Open Graph `og:url`/`og:image`, `sitemap.xml`, and `robots.txt` if your final domain differs from `theelephantlodge.co.za`.

---

## 3. Getting Google to index the site

1. Once live, go to **Google Search Console** (https://search.google.com/search-console) and add your domain/URL as a property.
2. Verify ownership (Search Console will guide you — usually a DNS TXT record or an HTML file upload).
3. Submit `sitemap.xml` under **Sitemaps** (enter `sitemap.xml`).
4. Use **URL Inspection** → **Request Indexing** for the homepage to speed things up.
5. Keep `robots.txt` and `sitemap.xml` as-is (already included) — they tell Google the site is open to crawling and list every page.
6. The site already includes page titles, meta descriptions, Open Graph tags, and `LodgingBusiness` structured data (JSON‑LD) on the homepage — all of this helps Google understand and rank the business correctly, and can help it appear as a rich result.
7. Also claim/verify the business on **Google Business Profile** (business.google.com) using the same name, address and phone number as this site — consistency between the two significantly helps local search ranking.

---

## 4. Editing content

Everything is plain HTML — open any `.html` file in a text editor (VS Code, Notepad++, etc.) and edit the text directly. Key things you'll likely change over time:

- **Prices** — search each page for "R800", "R850", "R950" and the `<table class="price-table">` in `accommodation.html`.
- **Phone / WhatsApp / email** — these appear in the header, footer, and contact page of every file. Search-and-replace `082 646 0634`, `27692486657` (WhatsApp number in international format, no `+` or spaces), and `info@theelephantlodge.co.za` across all files if any of these change.
- **Photos** — add new files into `images/`, then reference them as `<img src="images/your-file.jpg" alt="...">`. Always fill in a meaningful `alt` description — this matters for both accessibility and Google Images search.
- **Gallery captions/categories** — in `gallery.html`, each photo has `data-cat="accommodation|functions|conference|grounds"` which drives the filter buttons.

---

## 5. Getting a WordPress‑editable version

This project is static HTML, which is the fastest, cheapest and most SEO‑friendly way to host a small business site — but if you'd prefer a drag‑and‑drop WordPress editing experience, you have two good paths:

**Option A — Fastest: rebuild the pages with a WordPress page builder**
1. Get WordPress hosting (e.g. SiteGround, Hostinger, or WordPress.com Business plan) and install WordPress (most hosts do this in one click).
2. Install a visual page builder plugin — **Elementor** (free tier is enough) is the most common choice.
3. Create 7 pages matching this site: Home, Accommodation, Functions, Conference, Gallery, About, Contact — and set them as Pages, not Posts, in WordPress's menu system (**Appearance → Menus**) to match this site's navigation.
4. Upload all photos from the `images/` folder into the WordPress **Media Library**, then rebuild each section using Elementor's Hero, Image Gallery, and Form widgets — using the text copy already written in these HTML files as your content source.
5. Use the free **Contact Form 7** or **WPForms** plugin for the enquiry form, and set its "Send To" address to `info@theelephantlodge.co.za`.
6. Install the free **Yoast SEO** or **Rank Math** plugin and paste in the page titles/meta descriptions already written in each HTML file's `<title>` and `<meta name="description">` tags.

**Option B — Keep this exact design in WordPress (for a developer)**
1. Install WordPress and a starter/blank theme (e.g. "Understrap" or "GeneratePress").
2. Copy `css/style.css` into the theme's stylesheet (or enqueue it as an additional stylesheet via `functions.php`).
3. Convert `index.html`, `accommodation.html`, etc. into WordPress page templates (`page-accommodation.php`, etc.), replacing the shared header/footer HTML with WordPress's `get_header()` / `get_footer()` calls, and wrapping page-specific content in the WordPress loop.
4. Upload the `images/` folder contents to the Media Library and swap `<img src="images/...">` for WordPress image tags/shortcodes.
5. Recreate the enquiry form with Contact Form 7 or WPForms, keeping the same field names for consistency.

Either option lets you use this HTML/CSS as the visual and content reference so the WordPress version looks identical to what's been built here.

---

## 6. Business details used throughout the site

- **Name:** The Elephant Lodge
- **Address:** Seleteng, D153 Sedimothole, Ga‑Mphahlele, Limpopo, 0737, South Africa
- **Phone:** 082 646 0634
- **WhatsApp:** 069 248 6657
- **Email:** info@theelephantlodge.co.za
- **Facebook:** facebook.com/profile.php?id=61555060270359
- **Google rating:** 3.8 / 5 from 17 reviews
- **Overnight rates:** R800 – R950 per night (indicative)
