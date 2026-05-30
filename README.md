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

1. **Create a repo** on GitHub (e.g. `rajasik-website`), public.
2. **Push these files** from this folder:

   ```bash
   git init
   git add .
   git commit -m "Rajasik Restaurant website"
   git branch -M main
   git remote add origin https://github.com/<your-username>/<your-repo>.git
   git push -u origin main
   ```

3. On GitHub: **Settings → Pages → Build and deployment**
   - Source: **Deploy from a branch**
   - Branch: **main** · Folder: **/ (root)** → **Save**
4. Wait ~1 minute. Your site is live at
   `https://<your-username>.github.io/<your-repo>/`

### 🌐 Use your custom domain `rajasikrestaurant.in`

1. In **Settings → Pages → Custom domain**, enter `rajasikrestaurant.in` and Save
   (this creates a `CNAME` file in the repo).
2. At your domain registrar, add DNS records pointing to GitHub Pages:

   | Type  | Name | Value |
   |-------|------|-------|
   | A     | @    | `185.199.108.153` |
   | A     | @    | `185.199.109.153` |
   | A     | @    | `185.199.110.153` |
   | A     | @    | `185.199.111.153` |
   | CNAME | www  | `<your-username>.github.io` |

3. Back in Pages, tick **Enforce HTTPS** once the certificate is issued.

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
