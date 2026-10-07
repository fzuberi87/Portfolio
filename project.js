const escapeHTML = (value = "") => String(value).replace(/[&<>'"]/g, (character) => ({
  "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;",
}[character]));

const params = new URLSearchParams(window.location.search);
const slug = params.get("slug");

const inlineMarkdown = (value = "") => {
  const images = [];
  const source = String(value).replace(/!\[([^\]]*)\]\(([^)]+)\)/g, (_, alt, src) => {
    const token = `@@IMAGE_${images.length}@@`;
    images.push(`<img class="rich-inline-image" src="${escapeHTML(src)}" alt="${escapeHTML(alt)}" loading="lazy" decoding="async" />`);
    return token;
  });
  return images.reduce((html, image, index) => html.replace(`@@IMAGE_${index}@@`, image), escapeHTML(source)
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.+?)\*/g, "<em>$1</em>")
    .replace(/`(.+?)`/g, "<code>$1</code>"));
};

function renderRichText(value = "") {
  const lines = String(value).trim().split(/\r?\n/);
  const output = [];
  let paragraph = [];
  let listType = null;
  let listItems = [];
  let quote = [];
  const flushParagraph = () => { if (paragraph.length) output.push(`<p>${inlineMarkdown(paragraph.join(" "))}</p>`); paragraph = []; };
  const flushList = () => { if (listItems.length) output.push(`<ul>${listItems.map((item) => `<li>${inlineMarkdown(item)}</li>`).join("")}</ul>`); listItems = []; listType = null; };
  const flushQuote = () => {
    if (!quote.length) return;
    const quoteIsList = quote.every((item) => /^(?:\*|\d+\.)\s+/.test(item));
    if (quoteIsList) {
      output.push(`<ul>${quote.map((item) => `<li>${inlineMarkdown(item.replace(/^(?:\*|\d+\.)\s+/, ""))}</li>`).join("")}</ul>`);
    } else {
      output.push(`<blockquote>${quote.map((item) => `<p>${inlineMarkdown(item)}</p>`).join("")}</blockquote>`);
    }
    quote = [];
  };
  lines.forEach((line) => {
    const trimmed = line.trim();
    if (!trimmed) { flushParagraph(); flushList(); flushQuote(); }
    else if (/^>\s?/.test(trimmed)) { flushParagraph(); flushList(); quote.push(trimmed.replace(/^>\s?/, "")); }
    else if (/^[-*]\s+/.test(trimmed)) { flushParagraph(); flushQuote(); if (listType && listType !== "ul") flushList(); listType = "ul"; listItems.push(trimmed.replace(/^[-*]\s+/, "")); }
    else if (/^\d+\.\s+/.test(trimmed)) { flushParagraph(); flushQuote(); if (listType && listType !== "ol") flushList(); listType = "ol"; listItems.push(trimmed.replace(/^\d+\.\s+/, "")); }
    else { flushList(); flushQuote(); paragraph.push(trimmed); }
  });
  flushParagraph(); flushList(); flushQuote();
  return output.join("");
}

function parseCaseStudyDocument(markdown = "", sourceHeading = "") {
  const block = markdown.split(/\n# ---\s*\n/).find((item) => item.includes(`**${sourceHeading}**`) || item.includes(`# ${sourceHeading}`));
  if (!block) return null;
  const lines = block.split(/\r?\n/);
  const titleIndex = lines.findIndex((line) => /^#\s+/.test(line));
  const subtitle = titleIndex >= 0 ? (lines[titleIndex + 2] || "").replace(/^\*|\*$/g, "").trim() : "";
  const sections = [];
  let current = null;
  lines.slice(Math.max(titleIndex + 1, 0)).forEach((line) => {
    const heading = line.match(/^###\s+\*?\*?(.+?)\*?\*?\s*$/);
    if (heading) { if (current) sections.push(current); current = { heading: heading[1].trim(), body: "" }; }
    else if (current) current.body += `${line}\n`;
  });
  if (current) sections.push(current);
  return { subtitle, sections: sections.map((section) => ({ ...section, body: section.body.trim() })) };
}

async function init() {
  const container = document.querySelector("#project-detail");
  try {
    const [response, sourceResponse] = await Promise.all([
      fetch("content/projects.json?v=20261005-3"),
      fetch("content/Portfolio Case Studies (Rewritten).md?v=20261005-4"),
    ]);
    if (!response.ok || !sourceResponse.ok) throw new Error("Project content could not be loaded.");
    const [payload, sourceMarkdown] = await Promise.all([response.json(), sourceResponse.text()]);
    const project = (payload.projects || []).find((item) => item.slug === slug && item.published !== false);
    if (!project) throw new Error("That project is not available.");

    const source = parseCaseStudyDocument(sourceMarkdown, project.sourceHeading || project.title);
    const content = source || { subtitle: project.description, sections: project.sections || [] };

    document.title = `${project.title} — Faiz Zuberi`;
    const sections = content.sections.length ? content.sections : project.sections || [];
    const projectDescription = content.subtitle || project.description;
    const gallery = project.gallery || [];
    const renderImage = (image, index, extraClass = "") => `
      <figure class="project-visual ${extraClass}">
        <img src="${escapeHTML(image)}" alt="${escapeHTML(project.title)} detail ${index + 1}" loading="lazy" decoding="async" />
      </figure>
    `;
    const renderComparison = (comparison) => comparison ? `
      <figure class="project-visual project-visual--comparison">
        <div class="theme-compare" data-theme-compare style="--compare-position: 50%">
          <img class="theme-compare-image theme-compare-image--dark" src="${escapeHTML(comparison.dark)}" alt="${escapeHTML(project.title)} interface in dark mode" loading="lazy" decoding="async" />
          <div class="theme-compare-overlay">
            <img class="theme-compare-image theme-compare-image--light" src="${escapeHTML(comparison.light)}" alt="${escapeHTML(project.title)} interface in light mode" loading="lazy" decoding="async" />
          </div>
          <div class="theme-compare-divider" aria-hidden="true"><span>↔</span></div>
          <input class="theme-compare-range" type="range" min="0" max="100" value="50" aria-label="Compare light and dark mode" />
        </div>
        <figcaption>${escapeHTML(comparison.label || "Light and dark mode")} <span>Drag to compare</span></figcaption>
      </figure>
    ` : "";
    const story = sections.map((section, index) => `
      <section id="case-section-${index + 1}" class="case-section">
        <div class="case-section-heading">
          <span>${String(index + 1).padStart(2, "0")}</span>
          <h2>${escapeHTML(section.heading)}</h2>
        </div>
        <div class="case-section-copy">
          ${section.subheading ? `<h3>${escapeHTML(section.subheading)}</h3>` : ""}
          <div class="rich-copy">${renderRichText(section.body)}</div>
          ${section.quote ? `<blockquote>“${escapeHTML(section.quote)}”</blockquote>` : ""}
        </div>
        ${(() => {
          const sectionImages = project.sectionImages?.[section.heading] || (section.image ? [section.image] : gallery[index + 1] ? [gallery[index + 1]] : []);
          return sectionImages.map((image, imageIndex) => renderImage(image, index + imageIndex + 1)).join("");
        })()}
      </section>
    `).join("");
    const leadImage = gallery[0] ? renderImage(gallery[0], 0, "project-visual--lead") : "";
    const hero = project.hero || project.cover
      ? `<img src="${escapeHTML(project.hero || project.cover)}" alt="${escapeHTML(project.title)}" loading="eager" fetchpriority="high" decoding="async" />`
      : `<div class="project-hero-placeholder" style="--placeholder-bg:${escapeHTML(project.accent || "#c8d89e")}"><span>${escapeHTML(project.artLabel || project.title)}</span></div>`;
    container.innerHTML = `
      <div class="project-hero">
        <div class="project-hero-copy">
          <div class="project-hero-meta">${project.year ? `<span>${escapeHTML(project.year)}</span>` : ""}<span>${escapeHTML(project.discipline)}</span></div>
          <h1>${escapeHTML(project.title)}</h1>
          <p>${escapeHTML(projectDescription)}</p>
        </div>
        ${hero}
      </div>
      ${renderComparison(project.comparison)}
      ${leadImage}
      <div class="case-story">${story}</div>
      ${project.outcome ? `<section class="project-outcome"><span>Outcome</span><h2>${escapeHTML(project.outcome)}</h2></section>` : ""}
    `;
    document.querySelectorAll("[data-theme-compare]").forEach((compare) => {
      const range = compare.querySelector(".theme-compare-range");
      const updatePosition = (value) => compare.style.setProperty("--compare-position", `${value}%`);
      range.addEventListener("input", (event) => updatePosition(event.target.value));
      updatePosition(range.value);
    });
  } catch (error) {
    container.innerHTML = `<p class="loading-note">${escapeHTML(error.message)}</p><a class="text-link" href="index.html#work">Return to work</a>`;
  }
}

init();
