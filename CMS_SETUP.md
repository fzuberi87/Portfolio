# Portfolio build plan

This project is a static portfolio with a lightweight Git-based CMS. The visual system is documented in [design.md](./design.md); the editable content lives in `content/site.json` and `content/projects.json`.

## Step 1 — Replace the starter content

Open `/admin/` locally or edit the JSON files directly. Replace the sample projects with your real work, then add cover images in the CMS when they are ready.

The project model is intentionally small:

- title
- discipline
- short description
- year
- tags
- visual theme / accent color
- optional cover image or external project URL
- featured / published status

## Step 2 — Connect the CMS

The admin UI is configured for Decap CMS with Netlify Git Gateway. When the site is hosted on Netlify:

1. Create a Netlify site from this repository.
2. Enable Netlify Identity.
3. Enable Git Gateway under Identity → Services.
4. Invite your editor email under Identity → Identity members.
5. Open `/admin/` on the deployed site and sign in.

This keeps editing simple: sign in, edit projects, upload media, and publish. No custom database or application server is needed for the portfolio.

## Step 3 — Publish safely

Before the domain changes:

1. Preview the site on the temporary Netlify URL.
2. Check the homepage at desktop and mobile widths.
3. Add the final LinkedIn URL and contact email in Site settings.
4. Upload final project media and confirm every project has useful alt text or a meaningful title.
5. Confirm HTTPS is active on the temporary URL.

## Step 4 — Point `faizzuberi.com`

The domain should be connected only after the temporary deployment is verified. In Netlify, add `faizzuberi.com` as a custom domain and follow the DNS instructions it provides. Usually this means:

- apex domain: use the nameservers Netlify provides, or its prescribed A records
- `www`: use the prescribed CNAME target

The exact records are account-specific, so do not copy generic values from this file. DNS changes can take time to propagate. Keep the old Squarespace records available until the new site is confirmed live.

## Current implementation

- No build step or dependency installation is required.
- Run locally with `python3 -m http.server 4173`, then visit `http://localhost:4173`.
- The site uses plain HTML, CSS, and JavaScript so it is fast, portable, and easy to host.
- The CMS editor is available at `/admin/` after Git Gateway is configured.
- The sample artwork is CSS-generated so the site has a complete visual shell before final project media is supplied.
