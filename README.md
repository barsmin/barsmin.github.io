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

## Photo not showing?

Open `https://<your-username>.github.io/<repo>/assets/images/profile.png` directly in the browser.
If that address gives a 404, the file isn't where the site looks for it. Check:

- The file is inside the **`assets/images/`** folder, not in the repository root.
- The name is exactly **`profile.png`** (lowercase). On Windows, turn on *View → File name extensions*: a file that looks like `profile.png` may really be `profile.png.png`.
- The file is committed and pushed. GitHub Pages needs about a minute to update, then hard-refresh with Ctrl+Shift+R (Cmd+Shift+R on Mac).

If the photo can't be found, the page shows a visible note with the expected path and prints the full URL in the browser console (F12).

## Typewriter text

The three phrases under "Experienced Storyteller &" are in `index.html`, in the `data-typed` attribute.
Speeds (writing, erasing, how long a phrase stays, the blinking pause) are in the `TIMING` block at the top of the typewriter section in `js/main.js`.

## Hover and scroll effects

- Tool names, experience blocks and the buttons react to the mouse (only on devices that can hover). They live in section 12b of `css/styles.css`.
  - **Tools:** the name slides 8px to the right.
  - **Experience:** the block opens 36px above and below its text (no colour change), as in the Figma hover example. Change `padding-block: 48px` in `.job:hover` (12px normal + 36px extra) to make it more or less.
  - **Buttons** (download cv, show certification, let's get started): the icon moves 4px closer to the label. **Back to top:** the arrow lifts 6px.
- Blocks rise in softly while you scroll. To include a new block, put `data-reveal-group` on its container: every direct child is revealed. Speed and distance are in section 12b (`@keyframes reveal`).
- Visitors with "reduce motion" turned on get none of the animations.

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
assets/icons/     SVGs exported from Figma (logo.svg = full logo, logo-mobile.svg = small "ba" mark used on phones)
favicon.svg       browser-tab icon (the "ba" mark); apple-touch-icon.png is the iPhone home-screen version
assets/images/    profile.png (you add)
assets/cv/        cosmin-cv.pdf (you add)
```

Colours, fonts and sizes live in the `:root` block at the top of `css/styles.css`.
