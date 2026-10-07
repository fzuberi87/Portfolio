document.documentElement.classList.add("js");

const escapeHTML = (value = "") => String(value).replace(/[&<>'"]/g, (character) => ({
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  "'": "&#39;",
  '"': "&quot;",
}[character]));

const slugify = (value = "") => String(value).toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
const safeColor = (value, fallback = "#d4ddaa") => /^#[0-9a-f]{6}$/i.test(value || "") ? value : fallback;

const artThemes = new Set(["orbit", "signal", "lattice", "field", "blank"]);

const fallbackAssetPath = (source = "") => {
  if (!source.endsWith(".webp")) return source;
  if (source === "media/projects/allie/cover.webp") return "media/projects/allie/cover.png";
  if (source === "media/projects/creamwala/uniform.webp") return "media/projects/creamwala/uniform.png";
  if (source.startsWith("media/projects/redfin-renovations/")) return source.replace(/\.webp$/i, ".png");
  if (source.startsWith("media/projects/allie/")) return source.replace(/\.webp$/i, ".png");
  return source.replace(/\.webp$/i, ".jpg");
};

function renderArt(project, extraClass = "") {
  const theme = artThemes.has(project.theme) ? project.theme : "orbit";
  const label = project.artLabel || project.title;
  const accent = safeColor(project.accent);
  if (project.cover) {
    const isFeatured = extraClass.includes("featured-art");
    const fallback = fallbackAssetPath(project.cover);
    return `<div class="project-art image-art ${theme} ${extraClass}" style="--art-bg:${accent}"><img src="${escapeHTML(project.cover)}" alt="${escapeHTML(project.title)} project artwork" loading="${isFeatured ? "eager" : "lazy"}"${isFeatured ? ' fetchpriority="high"' : ""} decoding="async" onerror="this.onerror=null;this.src='${escapeHTML(fallback)}'" /></div>`;
  }
  return `<div class="project-art ${theme} ${extraClass}" style="--art-bg:${accent};--art-ink:${theme === "signal" ? "#f4e9f4" : "#10110f"}"><span class="art-word">${escapeHTML(label)}</span></div>`;
}

function renderIndex(projects) {
  const index = document.querySelector("#project-index");
  index.innerHTML = projects.map((project) => `
    <a href="case-${encodeURIComponent(project.slug)}.html" data-project-link="${escapeHTML(project.slug)}">
      <span class="index-title">${escapeHTML(project.indexTitle || project.title)}</span>
      <span class="index-descriptor">${escapeHTML(project.indexIntro || project.description)}</span>
    </a>
  `).join("");
}

function renderFeatured(project, count, index = 0) {
  const featured = document.querySelector("#featured-project");
  const accent = safeColor(project.accent);
  featured.className = `featured-card featured-theme-${artThemes.has(project.theme) ? project.theme : "orbit"} reveal is-visible`;
  featured.style.background = accent;
  featured.setAttribute("aria-label", `Selected work ${index + 1} of ${count}: ${project.title}`);
  featured.innerHTML = `
    <a class="featured-link" href="case-${encodeURIComponent(project.slug)}.html" aria-label="View ${escapeHTML(project.title)} case study">
      ${renderArt(project, "featured-art")}
    </a>
    <div class="featured-copy">
      <span class="eyebrow">${escapeHTML(project.discipline)}</span>
      <h1><a href="case-${encodeURIComponent(project.slug)}.html">${escapeHTML(project.title)}</a></h1>
      <p>${escapeHTML(project.description)}</p>
    </div>
    <div class="featured-controls" aria-label="Selected work carousel controls">
      <button class="featured-control" type="button" data-featured-direction="prev" aria-label="Previous project">←</button>
      <button class="featured-control" type="button" data-featured-direction="next" aria-label="Next project">→</button>
    </div>
    <div class="featured-progress" aria-hidden="true"><span></span></div>
  `;
  document.querySelector("#featured-current").textContent = String(index + 1).padStart(2, "0");
  document.querySelector("#project-count").textContent = String(count).padStart(2, "0");
}

function renderProjects(projects) {
  const grid = document.querySelector("#project-grid");
  grid.innerHTML = projects.map((project, index) => `
    <a id="project-${escapeHTML(project.slug)}" class="project-card reveal" href="case-${encodeURIComponent(project.slug)}.html" style="--card-accent:${safeColor(project.accent)}">
      <div class="project-media">
        ${renderArt(project)}
        <div class="card-tags" aria-label="Project categories">
          ${(project.tags || []).slice(0, 3).map((tag) => `<span>${escapeHTML(tag)}</span>`).join("")}
        </div>
      </div>
      <div class="card-copy">
        <span class="card-title">${escapeHTML(project.title)}${project.year ? ` <span class="card-year">/ ${escapeHTML(project.year)}</span>` : ""}</span>
        <p class="card-description">${escapeHTML(project.description)}</p>
      </div>
    </a>
  `).join("");
  grid.querySelectorAll(".project-card").forEach((card, index) => {
    card.style.transitionDelay = `${Math.min(index * 45, 180)}ms`;
  });
}

function bindIndex(projects, onSelect) {
  document.querySelectorAll("[data-project-link]").forEach((link) => {
    link.addEventListener("click", () => {
      document.querySelectorAll("[data-project-link]").forEach((item) => item.removeAttribute("aria-current"));
      link.setAttribute("aria-current", "true");
      const selected = projects.find((project) => project.slug === link.dataset.projectLink);
      if (selected) onSelect(projects.indexOf(selected));
    });
  });
}

function setupFeaturedCarousel(projects, initialIndex) {
  const featured = document.querySelector("#featured-project");
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  let currentIndex = initialIndex;
  let suppressClick = false;
  let timer;

  const schedule = () => {
    window.clearTimeout(timer);
    timer = window.setTimeout(() => show(currentIndex + 1), 8000);
  };

  const show = (nextIndex) => {
    const next = (nextIndex + projects.length) % projects.length;
    if (next === currentIndex) return;
    window.clearTimeout(timer);
    const update = () => {
      currentIndex = next;
      renderFeatured(projects[currentIndex], projects.length, currentIndex);
      requestAnimationFrame(() => featured.classList.remove("is-changing"));
      schedule();
    };
    if (reducedMotion) update();
    else {
      featured.classList.add("is-changing");
      window.setTimeout(update, 280);
    }
  };

  schedule();

  featured.addEventListener("click", (event) => {
    if (suppressClick) {
      event.preventDefault();
      event.stopPropagation();
      suppressClick = false;
      return;
    }
    const imageLink = event.target.closest(".featured-link");
    if (imageLink) {
      event.preventDefault();
      window.location.assign(imageLink.href);
      return;
    }
    const control = event.target.closest("[data-featured-direction]");
    if (!control) return;
    event.preventDefault();
    show(currentIndex + (control.dataset.featuredDirection === "prev" ? -1 : 1));
  }, true);

  featured.addEventListener("keydown", (event) => {
    if (event.key === "ArrowLeft") { event.preventDefault(); show(currentIndex - 1); }
    if (event.key === "ArrowRight") { event.preventDefault(); show(currentIndex + 1); }
  });

  let startX = 0;
  let startY = 0;
  featured.addEventListener("pointerdown", (event) => {
    if (event.target.closest("button")) return;
    startX = event.clientX;
    startY = event.clientY;
    featured.setPointerCapture?.(event.pointerId);
  });
  featured.addEventListener("pointerup", (event) => {
    const deltaX = event.clientX - startX;
    const deltaY = event.clientY - startY;
    if (Math.abs(deltaX) > 48 && Math.abs(deltaX) > Math.abs(deltaY)) {
      suppressClick = true;
      show(currentIndex + (deltaX < 0 ? 1 : -1));
      window.setTimeout(() => { suppressClick = false; }, 400);
    }
  });

  return (index) => {
    show(index);
  };
}

function setupReveal() {
  const items = document.querySelectorAll(".reveal");
  if (!("IntersectionObserver" in window) || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    items.forEach((item) => item.classList.add("is-visible"));
    return;
  }
  const observer = new IntersectionObserver((entries, instance) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-visible");
      instance.unobserve(entry.target);
    });
  }, { rootMargin: "0px 0px -10% 0px", threshold: 0.08 });
  items.forEach((item) => observer.observe(item));
}

function setupClock() {
  const clock = document.querySelector("#site-clock");
  const tick = () => {
    clock.textContent = new Intl.DateTimeFormat(undefined, { hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false }).format(new Date());
  };
  tick();
  window.setInterval(tick, 1000);
  document.querySelector("#current-year").textContent = String(new Date().getFullYear());
}

async function init() {
  try {
    const [siteResponse, projectsResponse] = await Promise.all([fetch("content/site.json?v=20260922-5"), fetch("content/projects.json?v=20261006-1")]);
    if (!siteResponse.ok || !projectsResponse.ok) throw new Error("Content files could not be loaded.");
    const [site, projectPayload] = await Promise.all([siteResponse.json(), projectsResponse.json()]);
    const projects = (projectPayload.projects || []).filter((project) => project.published !== false);
    const featured = projects.find((project) => project.featured) || projects[0];
    const featuredIndex = projects.indexOf(featured);
    if (!featured || !projects.length) throw new Error("No published projects found.");

    renderIndex(projects);
    renderFeatured(featured, projects.length, featuredIndex);
    renderProjects(projects);
    const selectFeatured = setupFeaturedCarousel(projects, featuredIndex);
    bindIndex(projects, selectFeatured);
    setupReveal();
    setupClock();

    document.querySelector("#site-intro").textContent = site.intro;
    document.querySelector("#site-location").textContent = "Local time";
    const email = site.email;
    ["#contact-email"].forEach((selector) => {
      const element = document.querySelector(selector);
      if (element) {
        element.href = `mailto:${email}`;
      }
    });
    if (site.linkedin) {
      ["#linkedin-link", "#contact-linkedin"].forEach((selector) => {
        const element = document.querySelector(selector);
        if (!element) return;
        element.href = site.linkedin;
        element.target = "_blank";
        element.rel = "noreferrer";
      });
    }
  } catch (error) {
    document.querySelector("#project-index").innerHTML = `<p class="loading-note">${escapeHTML(error.message)}</p>`;
    document.querySelector("#project-grid").innerHTML = `<p class="loading-note">Add projects in <code>content/projects.json</code> to begin.</p>`;
  }
}

init();
