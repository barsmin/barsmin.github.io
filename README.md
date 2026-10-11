# barsmin — portfolio

Static site (plain HTML + CSS + a little JS) built from the Figma wireframe.
No build step, so it works as-is on GitHub Pages.

## Before you publish — 4 things to fill in

| What | Where | Notes |
|---|---|---|
| Profile photo | `assets/images/profile.png` | In Figma select the **profile 2** layer → Export → PNG @2x (keep the transparent background). |
| CV | `assets/cv/cosmin-cv.pdf` | Or change the `href` on the "download cv" button in `index.html`. |
| Links | `index.html` (search for `TODO`) | Email address, Instagram / Dribbble / LinkedIn profiles, certificate URL. |
| Projects page | `projects.html` | Placeholder only — the Figma file doesn't include this page yet. |

## Publish on GitHub Pages

1. Create a new repository on GitHub (name it `<your-username>.github.io` to get `https://<your-username>.github.io`, or any name to get `https://<your-username>.github.io/<repo-name>/`).
2. Upload everything in this folder to the repository (**Add file → Upload files**, or `git push`). `index.html` must be at the root.
3. **Settings → Pages → Build and deployment → Source: Deploy from a branch → Branch: `main` / `(root)` → Save.**
4. Wait ~1 minute and open the URL shown at the top of the Pages settings.

All paths are relative, so the site works both at the root and in a sub-folder URL.

## Layout system

| Breakpoint | Columns | Margins | Gutter |
|---|---|---|---|
| Desktop ≥ 1200px | 8 | 80px | 24px |
| Tablet 900–1199px | 6 | 80px → shrinks to 48px | 24px |
| Mobile < 900px | stacked (2-col grid) | 45.5px on a 393px phone | 24px |

Press **G** on any page (or add `?grid` to the URL) to overlay the column grid and compare with Figma.

## Structure

```
index.html        home page
projects.html     placeholder page
css/styles.css    tokens → base → components → breakpoints
js/main.js        footer year, optional-image fallback, grid overlay
assets/icons/     SVGs exported from Figma
assets/images/    profile.png (you add)
assets/cv/        cosmin-cv.pdf (you add)
```

Colours, fonts and sizes live in the `:root` block at the top of `css/styles.css`.
