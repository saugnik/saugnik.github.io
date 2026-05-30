# 🍽️ Rajasik Restaurant & Banquet — Website

A fast, fully static website (plain **HTML + CSS + JavaScript**, no build step) for
**Rajasik Restaurant & Banquet**, Rishra, Kolkata. Designed to be hosted free on
**GitHub Pages**.

> A royal feast of flavours — multi-cuisine dining, Friday live music & grand banquets.

## ✨ Features

- **Premium single-page design** — maroon & gold "royal" theme, elegant typography
- **Sticky navbar** with scrollspy + mobile hamburger menu
- **Animated hero** with live counters (years, dishes, guests, rating)
- **Interactive menu** with category tabs (Tandoor, North Indian, Chinese, Continental, Breads & Rice, Desserts) and veg / non-veg markers
- **Chef's specials**, **banquet/events** section, **gallery with lightbox**, and **guest reviews**
- **Reservation form** that opens **WhatsApp** with all details pre-filled (no backend needed)
- **Google Maps** embed, click-to-call, scroll reveal animations, back-to-top & WhatsApp floating buttons
- Fully **responsive** + respects `prefers-reduced-motion` + graceful image fallbacks

## 📁 Structure

```
rajasikrestaurant/
├── index.html        # all page markup
├── css/style.css     # all styling (design system + responsive)
├── js/script.js      # menu, gallery, nav, animations, reservation → WhatsApp
├── .nojekyll         # tells GitHub Pages to serve files as-is
├── .gitignore
└── README.md
```

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
| Phone / WhatsApp number | `index.html` (search `9830180548`) and `WHATSAPP` in `js/script.js` |
| Menu items & prices | `MENU` object in `js/script.js` |
| Gallery photos | `GALLERY` array in `js/script.js` |
| Address / hours / email | `index.html` (contact & reserve sections) |
| Colours & fonts | `:root` variables at the top of `css/style.css` |
| Food / hero photos | `data-img="..."` attributes in `index.html` |

### About the photos
Images use free **Unsplash** CDN URLs as tasteful placeholders. For the real launch,
swap them with the restaurant's own photos — upload your images into an `images/`
folder and replace the `data-img` URLs (and the `GALLERY` array) with paths like
`images/butter-chicken.jpg`.

---

© Rajasik Restaurant & Banquet, Rishra, Kolkata. Built as a static site for GitHub Pages.
