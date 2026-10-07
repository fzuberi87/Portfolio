// Regenerate static case studies after changing content or the project renderer.
// Run: node build-case-studies.cjs
const fs = require('node:fs');
const vm = require('node:vm');
const projects = JSON.parse(fs.readFileSync('content/projects.json', 'utf8')).projects.filter(p => p.published !== false);
const markdown = fs.readFileSync('content/Portfolio Case Studies (Rewritten).md', 'utf8');
const template = fs.readFileSync('project.html', 'utf8');
const renderer = fs.readFileSync('project.js', 'utf8').replace(/init\(\);\s*$/, 'await init();');
const escape = s => String(s || '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
(async () => {
  for (const project of projects) {
    const container = { innerHTML: '', dataset: {} };
    const document = { querySelector: () => container, querySelectorAll: () => [] };
    const context = { document, URLSearchParams, window: { location: { search: `?slug=${project.slug}` } }, fetch: async url => ({ ok: true, json: async () => ({projects}), text: async () => markdown }) };
    await vm.runInNewContext(`(async () => {${renderer}})()`, context);
    if (!container.innerHTML.includes('class="case-story"')) throw new Error(`Rendering failed: ${project.slug}`);
    const html = template.replace('<title>Project — Faiz Zuberi</title>', `<title>${escape(project.title)} — Faiz Zuberi</title>\n    <meta name="description" content="${escape(project.description)}" />\n    <link rel="canonical" href="https://faizzuberi.com/case-${project.slug}.html" />`)
      .replace(/<div id="project-detail" class="project-detail">[\s\S]*?\n      <footer/, `<div id="project-detail" class="project-detail" data-static="true">${container.innerHTML}\n      </div>\n      <footer`);
    fs.writeFileSync(`case-${project.slug}.html`, html);
  }
  const links = projects.map(p => `<a href="case-${p.slug}.html"><span class="index-title">${escape(p.title)}</span><span class="index-descriptor">${escape(p.description)}</span></a>`).join('\n');
  const summaries = projects.map(p => `<section class="case-section"><div class="case-section-heading"><h2><a href="case-${p.slug}.html">${escape(p.title)}</a></h2></div><div class="case-section-copy"><p>${escape(p.description)}</p><a class="text-link" href="case-${p.slug}.html">Read the full case study</a></div></section>`).join('\n');
  fs.writeFileSync('project.html', template.replace(/<div id="project-detail" class="project-detail">[\s\S]*?\n      <footer/, `<div id="project-detail" class="project-detail">\n<h1>Selected case studies</h1>\n${summaries}\n</div>\n      <footer`));
  let index = fs.readFileSync('index.html', 'utf8').replace(/(<nav id="project-index"[^>]*>)[\s\S]*?(<\/nav>)/, `$1\n${links}\n$2`);
  index = index.replace(/<noscript>[\s\S]*?<\/noscript>/, '');
  // Keep project discovery available even when scripts do not run.
  index = index.replace(/(<div id="project-grid" class="project-grid">)[\s\S]*?(\n          <\/div>)/, `$1\n${summaries}$2`);
  fs.writeFileSync('index.html', index);
  console.log(`Generated ${projects.length} complete static case studies.`);
})().catch(error => { console.error(error); process.exitCode = 1; });
