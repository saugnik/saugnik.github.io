# 🍽️ Rajasik Restaurant & Banquet — Website

A fast, fully static **multipage** website (plain **HTML + CSS + JavaScript**, no build
step) for **Rajasik Restaurant & Banquet**, Rishra, Kolkata. Designed to be hosted free
on **GitHub Pages**.

> A royal feast of flavours — multi-cuisine dining, Friday live music & grand banquets.

## ✨ Features

- **Premium multipage design** — maroon & gold "royal" theme, elegant typography, 6 pages
- **Mobile-first & fully responsive** — hamburger drawer (with backdrop + scroll-lock),
  no horizontal scroll at any width, 16px form inputs (no iOS zoom), compact mobile topbar,
  `svh`-based hero height, horizontally-scrolling menu chips on phones
- **Sticky navbar** with the active page highlighted, switches to a slide-in drawer ≤900px
- **Animated hero** with live counters (years, dishes, guests, rating)
- **Full menu page** — all categories (Tandoor, North Indian, Chinese, Continental,
  Breads & Rice, Desserts) with veg / non-veg markers, generated from one data list
- **Banquet/events page**, **gallery page with lightbox**, **about page**, and guest reviews
- **Reservation form** that opens **WhatsApp** with all details pre-filled (no backend
  needed); the Banquet page's enquiry buttons pre-select the “Banquet / Event” type
- **Google Maps** embed, click-to-call, scroll reveal animations (with a no-JS / hidden-tab
  failsafe so content is never left invisible), back-to-top & WhatsApp floating buttons
- Respects `prefers-reduced-motion` + graceful image fallbacks if a photo fails to load

## 📁 Structure

```
rajasikrestaurant/
├── index.html        # Home — hero, highlights, specials, teasers, CTAs
├── about.html        # About — story, why-us, reviews
├── menu.html         # Menu — full multi-cuisine menu (rendered from js/script.js)
├── banquet.html      # Banquet & Events — capacity, event types, enquiry CTA
├── gallery.html      # Gallery — photo grid + lightbox
├── contact.html      # Contact — reservation form, map, address & hours
├── css/style.css     # all styling (design system + responsive)
├── js/script.js      # menu/gallery data, nav, animations, reservation → WhatsApp
├── .nojekyll         # tells GitHub Pages to serve files as-is
├── .gitignore
└── README.md
```

> **Shared header & footer:** the announcement bar, navbar and footer are repeated as plain
> HTML in each page (no build step / templating). If you change a shared detail — e.g. the
> phone number or a nav link — update it in **every** `*.html` file. The page-specific data
> (menu items, gallery photos, WhatsApp number) lives once in `js/script.js`.

## 🚀 Deploy to GitHub Pages (free)

✅ **Live now at https://saugnik.github.io** — a GitHub user site served from the
`main` branch root.

The custom domain `rajasikrestaurant.in` is **not** switched on yet (the domain doesn't
currently resolve / point at GitHub Pages), so the `CNAME` file was intentionally left
out for now. Add it back via the steps below once DNS is ready.

### Updating the live site

Edit any file, then:

```bash
git add -A && git commit -m "your message" && git push
```

GitHub Pages rebuilds automatically within ~1 minute.

### Step 2 — Point your domain at GitHub

At your registrar for **rajasikrestaurant.in**, add these DNS records:

| Type  | Host / Name | Value |
|-------|-------------|-------|
| A     | `@`         | `185.199.108.153` |
| A     | `@`         | `185.199.109.153` |
| A     | `@`         | `185.199.110.153` |
| A     | `@`         | `185.199.111.153` |
| CNAME | `www`       | `saugnik.github.io` |

Optional (IPv6 / AAAA for `@`): `2606:50c0:8000::153`, `2606:50c0:8001::153`,
`2606:50c0:8002::153`, `2606:50c0:8003::153`.

### Step 3 — Finish

1. In GitHub **Settings → Pages → Custom domain**, enter `rajasikrestaurant.in` and
   Save (this re-creates the `CNAME` file). Wait for the green tick.
2. Tick **Enforce HTTPS** once the TLS certificate is issued (can take up to an hour).
3. Visit **https://rajasikrestaurant.in** 🎉

> DNS changes can take from a few minutes up to 24–48 hours to propagate.

## ✏️ Editing the content

| What | Where |
|------|-------|
| Phone / WhatsApp number | search `9830180548` across **all** `*.html` files, and `WHATSAPP` in `js/script.js` |
| Menu items & prices | `MENU` object in `js/script.js` (drives `menu.html`) |
| Gallery photos | `GALLERY` array in `js/script.js` (drives `gallery.html`) |
| Address / hours / email | `contact.html` (reserve + contact cards) and the footer hours in each page |
| Nav links / footer | repeated in each `*.html` — change them in every file |
| Colours & fonts | `:root` variables at the top of `css/style.css` |
| Food / page-banner photos | `data-img="..."` attributes in the relevant `*.html` page |

### About the photos
Images use free **Unsplash** CDN URLs as tasteful placeholders. For the real launch,
swap them with the restaurant's own photos — upload your images into an `images/`
folder and replace the `data-img` URLs (and the `GALLERY` array) with paths like
`images/butter-chicken.jpg`.

---

© Rajasik Restaurant & Banquet, Rishra, Kolkata. Built as a static site for GitHub Pages.
