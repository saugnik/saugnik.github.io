/* ===================================================================
   Rajasik Restaurant & Banquet — shared interactions (multipage)
   Loaded on every page; each block self-guards so it only runs where
   the relevant markup exists.
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

  const CAT_LABEL = {
    tandoor: "Tandoor & Starters",
    northindian: "North Indian",
    chinese: "Chinese & Sichuan",
    continental: "Continental",
    breads: "Breads & Rice",
    desserts: "Desserts",
  };
  const CAT_ICON = {
    tandoor: "fa-fire-burner",
    northindian: "fa-bowl-food",
    chinese: "fa-pepper-hot",
    continental: "fa-utensils",
    breads: "fa-bread-slice",
    desserts: "fa-stroopwafel",
  };

  function itemHTML([name, type, price, desc, badge], i) {
    const dot = `<span class="mitem__dot mitem__dot--${type === "veg" ? "veg" : "non"}"><i class="fa-solid fa-circle"></i></span>`;
    const tag = badge ? `<span class="mitem__badge">${badge}</span>` : "";
    const sub = desc ? `<div class="mitem__desc">${desc}</div>` : "";
    return `
      <div class="mitem" style="animation-delay:${(i % 6) * 50}ms">
        <div class="mitem__main">
          <div class="mitem__name">${dot}${name} ${tag}</div>${sub}
        </div>
        <span class="mitem__lead"></span>
        <span class="mitem__price">₹${price}</span>
      </div>`;
  }

  /* ---------- Tabbed menu (home / any page with #menuGrid) ---------- */
  const grid = $("#menuGrid");
  if (grid) {
    const renderMenu = (cat) => { grid.innerHTML = MENU[cat].map(itemHTML).join(""); };
    renderMenu("tandoor");
    $$(".menu__tab").forEach((tab) => {
      tab.addEventListener("click", () => {
        $$(".menu__tab").forEach((t) => { t.classList.remove("active"); t.setAttribute("aria-selected", "false"); });
        tab.classList.add("active");
        tab.setAttribute("aria-selected", "true");
        renderMenu(tab.dataset.cat);
      });
    });
  }

  /* ---------- Full menu (menu page with #menuFull) ---------- */
  const full = $("#menuFull");
  if (full) {
    full.innerHTML = Object.keys(MENU).map((cat) => `
      <section class="menu-cat" id="cat-${cat}">
        <h3 class="menu-cat__title"><i class="fa-solid ${CAT_ICON[cat]}"></i> ${CAT_LABEL[cat]}</h3>
        <div class="menu__grid">${MENU[cat].map(itemHTML).join("")}</div>
      </section>`).join("");

    // Category chips highlight the section currently in view
    const chips = $$("#menuNav a");
    if (chips.length) {
      const chipMap = {};
      chips.forEach((a) => (chipMap[a.getAttribute("href").slice(1)] = a));
      const catObs = new IntersectionObserver((entries) => {
        entries.forEach((en) => {
          if (en.isIntersecting) {
            chips.forEach((a) => a.classList.remove("active"));
            chipMap[en.target.id]?.classList.add("active");
          }
        });
      }, { rootMargin: "-30% 0px -60% 0px" });
      $$(".menu-cat").forEach((s) => catObs.observe(s));
    }
  }

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
      `<button class="gitem ${mod ? "gitem--" + mod : ""}" data-full="${url}" aria-label="View photo">
         <span class="gitem__img" data-img="${url}"></span>
       </button>`
    ).join("");
    $$("#galleryGrid [data-img]").forEach((el) => {
      el.style.backgroundImage = `url("${el.getAttribute("data-img")}")`;
    });
  }

  /* ---------- Lightbox ---------- */
  const lb = $("#lightbox"), lbImg = $("#lightboxImg");
  if (lb && lbImg) {
    const closeLb = () => { lb.classList.remove("open"); lb.setAttribute("aria-hidden", "true"); };
    $$(".gitem").forEach((g) =>
      g.addEventListener("click", () => {
        lbImg.src = g.dataset.full;
        lb.classList.add("open");
        lb.setAttribute("aria-hidden", "false");
      })
    );
    lb.addEventListener("click", (e) => {
      if (e.target === lb || e.target.classList.contains("lightbox__close")) closeLb();
    });
    document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeLb(); });
  }

  /* ---------- Mobile nav (drawer + backdrop + scroll lock) ---------- */
  const toggle = $("#navToggle"), links = $("#navLinks"), backdrop = $("#navBackdrop");
  if (toggle && links) {
    const setNav = (open) => {
      links.classList.toggle("open", open);
      toggle.classList.toggle("open", open);
      toggle.setAttribute("aria-expanded", String(open));
      document.body.classList.toggle("nav-open", open);
      if (backdrop) backdrop.classList.toggle("show", open);
    };
    toggle.addEventListener("click", () => setNav(!links.classList.contains("open")));
    if (backdrop) backdrop.addEventListener("click", () => setNav(false));
    $$("#navLinks a").forEach((a) => a.addEventListener("click", () => setNav(false)));
    document.addEventListener("keydown", (e) => { if (e.key === "Escape") setNav(false); });
  }

  /* ---------- Sticky nav + back-to-top ---------- */
  const nav = $("#nav"), backTop = $("#backTop");
  const onScroll = () => {
    const y = window.scrollY;
    if (nav) nav.classList.toggle("scrolled", y > 30);
    if (backTop) backTop.classList.toggle("show", y > 600);
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
  if (backTop) backTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));

  /* ---------- Reveal on scroll + animated counters ----------
     Both use IntersectionObserver. As a safety net, if the observer can't
     run (no support, or the tab is opened in the background where the
     observer won't report intersections) we jump straight to the final
     state so content is never left invisible / stuck at zero. */
  const reveals  = $$(".reveal");
  const counters = $$("[data-count]");

  // Reveal with no animation — used when the observer can't run (e.g. a
  // background tab), where there's nothing to animate anyway.
  const showReveals = () => reveals.forEach((el) => { el.style.transition = "none"; el.classList.add("in"); });
  const setCounterFinal = (el) => {
    const target = parseFloat(el.dataset.count);
    const decimals = parseInt(el.dataset.decimal || "0", 10);
    const suffix = el.dataset.suffix || "";
    el.textContent = (decimals ? target.toFixed(decimals) : target.toLocaleString("en-IN")) + suffix;
  };
  const animateCounter = (el) => {
    const target = parseFloat(el.dataset.count);
    const decimals = parseInt(el.dataset.decimal || "0", 10);
    const suffix = el.dataset.suffix || "";
    const dur = 1600; let start = null;
    const step = (ts) => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / dur, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      const val = target * eased;
      el.textContent = (decimals ? val.toFixed(decimals) : Math.floor(val).toLocaleString("en-IN")) + suffix;
      if (p < 1) requestAnimationFrame(step);
      else setCounterFinal(el);
    };
    requestAnimationFrame(step);
  };

  if (!("IntersectionObserver" in window) || document.hidden) {
    showReveals();
    counters.forEach(setCounterFinal);
  } else {
    const revObs = new IntersectionObserver((entries, obs) => {
      entries.forEach((en) => {
        if (en.isIntersecting) { en.target.classList.add("in"); obs.unobserve(en.target); }
      });
    }, { threshold: 0.12 });
    reveals.forEach((el) => revObs.observe(el));

    const cObs = new IntersectionObserver((entries, obs) => {
      entries.forEach((en) => {
        if (!en.isIntersecting) return;
        animateCounter(en.target);
        obs.unobserve(en.target);
      });
    }, { threshold: 0.5 });
    counters.forEach((c) => cObs.observe(c));

    // Failsafe: if observers stalled shortly after load, force the final state.
    window.addEventListener("load", () => setTimeout(() => {
      if (reveals.length && !document.querySelector(".reveal.in")) showReveals();
      counters.forEach((el) => { if (el.textContent.trim() === "0") setCounterFinal(el); });
    }, 1400));
  }

  /* ---------- Reservation → WhatsApp ---------- */
  const form = $("#reserveForm");
  if (form) {
    const dateEl = $("#rDate");
    if (dateEl) dateEl.min = new Date().toISOString().split("T")[0];

    // Pre-select enquiry type from URL (?type=banquet) e.g. from the Banquet page
    const typeParam = new URLSearchParams(location.search).get("type");
    const typeEl = $("#rType");
    if (typeParam && typeEl) {
      const want = typeParam.toLowerCase();
      [...typeEl.options].forEach((o) => {
        if (o.value.toLowerCase().includes(want)) typeEl.value = o.value;
      });
    }

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

      const name = $("#rName").value.trim();
      const msg =
        `*New Reservation — Rajasik Restaurant*%0A%0A` +
        `👤 Name: ${encodeURIComponent(name)}%0A` +
        `📞 Phone: ${encodeURIComponent($("#rPhone").value.trim())}%0A` +
        `📅 Date: ${$("#rDate").value}%0A` +
        `⏰ Time: ${$("#rTime").value}%0A` +
        `👥 Guests: ${$("#rGuests").value}%0A` +
        `🍽️ Type: ${encodeURIComponent($("#rType").value)}` +
        ($("#rMsg").value.trim() ? `%0A📝 Note: ${encodeURIComponent($("#rMsg").value.trim())}` : "");

      window.open(`https://wa.me/${WHATSAPP}?text=${msg}`, "_blank");
    });

    $$("#reserveForm input, #reserveForm select").forEach((f) =>
      f.addEventListener("input", () => f.classList.remove("invalid"))
    );
  }

  /* ---------- Footer year ---------- */
  const yr = $("#year");
  if (yr) yr.textContent = new Date().getFullYear();
})();
