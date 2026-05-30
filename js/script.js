/* ===================================================================
   Rajasik Restaurant & Banquet — interactions
   =================================================================== */
(function () {
  "use strict";

  const WHATSAPP = "919830180548"; // restaurant WhatsApp number (no +)
  const $  = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];

  /* ---------- Background images via [data-img] (graceful fallback) ---------- */
  $$("[data-img]").forEach((el) => {
    const url = el.getAttribute("data-img");
    const probe = new Image();
    probe.onload  = () => { el.style.backgroundImage = `url("${url}")`; };
    probe.onerror = () => { el.classList.add("img-fallback"); }; // CSS bg-color remains
    probe.src = url;
  });

  /* ---------- Menu data ---------- */
  const MENU = {
    tandoor: [
      ["Paneer Tikka", "veg", 220, "Char-grilled cottage cheese & bell peppers"],
      ["Chicken Reshmi Kebab", "non", 260, "Silky, creamy char-grilled kebabs", "Bestseller"],
      ["Tandoori Chicken (Half)", "non", 240, "Classic yogurt & spice roast"],
      ["Fish Tikka", "non", 280, "Bekti cubes in mustard-chilli marinade"],
      ["Mutton Seekh Kebab", "non", 290, "Spiced minced mutton skewers"],
      ["Dry Chilli Mushroom", "veg", 170, "Crisp mushrooms tossed in chilli"],
    ],
    northindian: [
      ["Butter Chicken", "non", 280, "Tandoori chicken in tomato-butter gravy", "Bestseller"],
      ["Paneer Butter Masala", "veg", 230, "Cottage cheese in rich makhani"],
      ["Dal Makhani", "veg", 190, "Black lentils, slow-cooked overnight"],
      ["Chicken Tikka Masala", "non", 290, "Smoky tikka in spiced onion gravy"],
      ["Mutton Rogan Josh", "non", 320, "Kashmiri-style aromatic mutton curry"],
      ["Kadai Paneer", "veg", 240, "Paneer & peppers in kadai masala"],
    ],
    chinese: [
      ["Veg Manchurian", "veg", 180, "Veg dumplings in tangy garlic sauce"],
      ["Chilli Chicken", "non", 200, "Indo-Chinese favourite, semi-dry", "Bestseller"],
      ["Schezwan Chicken", "non", 200, "Fiery Sichuan chilli toss"],
      ["Chicken Manchurian", "non", 200, "Saucy, garlicky & moreish"],
      ["Hakka Noodles", "veg", 160, "Wok-tossed noodles & vegetables"],
      ["Schezwan Fried Rice", "veg", 190, "Spicy Sichuan-style fried rice"],
    ],
    continental: [
      ["Penne Alfredo", "veg", 240, "Creamy white-sauce pasta"],
      ["Arrabbiata Pasta", "veg", 230, "Penne in spicy tomato sauce"],
      ["Grilled Chicken Steak", "non", 320, "Herb-grilled chicken, veg & sauce"],
      ["Veg Au Gratin", "veg", 220, "Baked vegetables in cheesy béchamel"],
      ["Fish & Chips", "non", 280, "Crumb-fried fish, fries & tartare"],
    ],
    breads: [
      ["Butter Naan", "veg", 40],
      ["Garlic Naan", "veg", 60],
      ["Laccha Paratha", "veg", 50],
      ["Jeera Rice", "veg", 120],
      ["Veg Pulao", "veg", 150],
      ["Steamed Rice", "veg", 90],
    ],
    desserts: [
      ["Gulab Jamun (2 pcs)", "veg", 80],
      ["Gajar Ka Halwa", "veg", 120],
      ["Sizzling Brownie", "veg", 180, "With hot chocolate & ice cream", "Bestseller"],
      ["Ice Cream Sundae", "veg", 140],
      ["Rasmalai (2 pcs)", "veg", 110],
    ],
  };

  const grid = $("#menuGrid");
  function renderMenu(cat) {
    if (!grid) return;
    grid.innerHTML = MENU[cat]
      .map(([name, type, price, desc, badge], i) => {
        const dot = `<span class="mitem__dot mitem__dot--${type === "veg" ? "veg" : "non"}"><i class="fa-solid fa-circle"></i></span>`;
        const tag = badge ? `<span class="mitem__badge">${badge}</span>` : "";
        const sub = desc ? `<div class="mitem__desc">${desc}</div>` : "";
        return `
        <div class="mitem" style="animation-delay:${i * 50}ms">
          <div class="mitem__main">
            <div class="mitem__name">${dot}${name} ${tag}</div>${sub}
          </div>
          <span class="mitem__lead"></span>
          <span class="mitem__price">₹${price}</span>
        </div>`;
      })
      .join("");
  }
  renderMenu("tandoor");

  $$(".menu__tab").forEach((tab) => {
    tab.addEventListener("click", () => {
      $$(".menu__tab").forEach((t) => t.classList.remove("active"));
      tab.classList.add("active");
      renderMenu(tab.dataset.cat);
    });
  });

  /* ---------- Gallery ---------- */
  const GALLERY = [
    ["https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=800&q=80", "tall"],
    ["https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=800&q=80", ""],
    ["https://images.unsplash.com/photo-1606491956689-2ea866880c84?auto=format&fit=crop&w=800&q=80", ""],
    ["https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1000&q=80", "wide"],
    ["https://images.unsplash.com/photo-1596797038530-2c107229654b?auto=format&fit=crop&w=800&q=80", ""],
    ["https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&w=800&q=80", ""],
    ["https://images.unsplash.com/photo-1542528180-a1208c5169a5?auto=format&fit=crop&w=800&q=80", "tall"],
    ["https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=800&q=80", ""],
  ];
  const gGrid = $("#galleryGrid");
  if (gGrid) {
    gGrid.innerHTML = GALLERY.map(([url, mod]) =>
      `<div class="gitem ${mod ? "gitem--" + mod : ""}" data-full="${url}">
         <div class="gitem__img" data-img="${url}"></div>
       </div>`
    ).join("");
    // load gallery bg images
    $$("#galleryGrid [data-img]").forEach((el) => {
      const url = el.getAttribute("data-img");
      el.style.backgroundImage = `url("${url}")`;
    });
  }

  /* ---------- Lightbox ---------- */
  const lb = $("#lightbox"), lbImg = $("#lightboxImg");
  $$(".gitem").forEach((g) =>
    g.addEventListener("click", () => {
      lbImg.src = g.dataset.full;
      lb.classList.add("open");
      lb.setAttribute("aria-hidden", "false");
    })
  );
  function closeLb() { lb.classList.remove("open"); lb.setAttribute("aria-hidden", "true"); }
  if (lb) {
    lb.addEventListener("click", (e) => { if (e.target === lb || e.target.classList.contains("lightbox__close")) closeLb(); });
    document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeLb(); });
  }

  /* ---------- Mobile nav ---------- */
  const toggle = $("#navToggle"), links = $("#navLinks");
  function closeNav() { toggle.classList.remove("open"); links.classList.remove("open"); toggle.setAttribute("aria-expanded", "false"); }
  toggle.addEventListener("click", () => {
    const open = links.classList.toggle("open");
    toggle.classList.toggle("open", open);
    toggle.setAttribute("aria-expanded", String(open));
  });
  $$("#navLinks a").forEach((a) => a.addEventListener("click", closeNav));

  /* ---------- Sticky nav + back-to-top ---------- */
  const nav = $("#nav"), backTop = $("#backTop");
  function onScroll() {
    const y = window.scrollY;
    nav.classList.toggle("scrolled", y > 30);
    backTop.classList.toggle("show", y > 600);
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
  backTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));

  /* ---------- Scrollspy (active nav link) ---------- */
  const sections = $$("section[id]");
  const navMap = {};
  $$('#navLinks a[href^="#"]').forEach((a) => (navMap[a.getAttribute("href").slice(1)] = a));
  const spy = new IntersectionObserver(
    (entries) => {
      entries.forEach((en) => {
        if (en.isIntersecting) {
          $$("#navLinks a").forEach((a) => a.classList.remove("active"));
          navMap[en.target.id]?.classList.add("active");
        }
      });
    },
    { rootMargin: "-45% 0px -50% 0px" }
  );
  sections.forEach((s) => spy.observe(s));

  /* ---------- Reveal on scroll ---------- */
  const revObs = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((en) => {
        if (en.isIntersecting) { en.target.classList.add("in"); obs.unobserve(en.target); }
      });
    },
    { threshold: 0.12 }
  );
  $$(".reveal").forEach((el) => revObs.observe(el));

  /* ---------- Animated counters ---------- */
  const counters = $$("[data-count]");
  const cObs = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((en) => {
        if (!en.isIntersecting) return;
        const el = en.target;
        const target = parseFloat(el.dataset.count);
        const decimals = parseInt(el.dataset.decimal || "0", 10);
        const suffix = el.dataset.suffix || "";
        const dur = 1600; let start = null;
        function step(ts) {
          if (!start) start = ts;
          const p = Math.min((ts - start) / dur, 1);
          const eased = 1 - Math.pow(1 - p, 3);
          const val = target * eased;
          el.textContent = (decimals ? val.toFixed(decimals) : Math.floor(val).toLocaleString("en-IN")) + suffix;
          if (p < 1) requestAnimationFrame(step);
          else el.textContent = (decimals ? target.toFixed(decimals) : target.toLocaleString("en-IN")) + suffix;
        }
        requestAnimationFrame(step);
        obs.unobserve(el);
      });
    },
    { threshold: 0.5 }
  );
  counters.forEach((c) => cObs.observe(c));

  /* ---------- Reservation → WhatsApp ---------- */
  const form = $("#reserveForm");
  if (form) {
    // prevent selecting past dates
    const dateEl = $("#rDate");
    const today = new Date().toISOString().split("T")[0];
    if (dateEl) dateEl.min = today;

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      let ok = true;
      ["rName", "rPhone", "rDate", "rTime"].forEach((id) => {
        const f = $("#" + id);
        const bad = !f.value.trim();
        f.classList.toggle("invalid", bad);
        if (bad) ok = false;
      });
      const phone = $("#rPhone").value.replace(/\D/g, "");
      if (phone && phone.length < 10) { $("#rPhone").classList.add("invalid"); ok = false; }
      if (!ok) { form.querySelector(".invalid")?.focus(); return; }

      const d = $("#rName").value.trim();
      const msg =
        `*New Reservation — Rajasik Restaurant*%0A%0A` +
        `👤 Name: ${encodeURIComponent(d)}%0A` +
        `📞 Phone: ${encodeURIComponent($("#rPhone").value.trim())}%0A` +
        `📅 Date: ${$("#rDate").value}%0A` +
        `⏰ Time: ${$("#rTime").value}%0A` +
        `👥 Guests: ${$("#rGuests").value}%0A` +
        `🍽️ Type: ${encodeURIComponent($("#rType").value)}` +
        ($("#rMsg").value.trim() ? `%0A📝 Note: ${encodeURIComponent($("#rMsg").value.trim())}` : "");

      window.open(`https://wa.me/${WHATSAPP}?text=${msg}`, "_blank");
    });

    // clear invalid state on input
    $$("#reserveForm input, #reserveForm select").forEach((f) =>
      f.addEventListener("input", () => f.classList.remove("invalid"))
    );
  }

  /* ---------- Footer year ---------- */
  const yr = $("#year");
  if (yr) yr.textContent = new Date().getFullYear();
})();
