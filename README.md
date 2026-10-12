# barsmin — portfolio

Static site (plain HTML + CSS + a little JS) built from the Figma wireframe.
No build step, so it works as-is on GitHub Pages: https://barsmin.github.io/

## Still to fill in

| What | Where | Notes |
|---|---|---|
| CV | `assets/cv/cosmin-cv.pdf` | The "download cv" button points here (or change its `href` in `index.html`). |
| Social profiles | `index.html` (search for `TODO`) | Instagram, Dribbble and LinkedIn currently open the sites' home pages. |
| Projects page | `projects.html` | Placeholder only — the Figma file doesn't include this page yet. |

## Profile photo

The photo is `assets/images/profile.png` (export the **profile 2** layer from Figma as PNG @2x, keep the transparent background). To change it, replace that file with the same name.

Photo not showing? Open `https://barsmin.github.io/assets/images/profile.png` directly. If that is a 404, check that the file is inside `assets/images/`, is named exactly `profile.png` (on Windows turn on *View → File name extensions*: it may really be `profile.png.png`) and is pushed. GitHub Pages needs about a minute, then hard-refresh (Ctrl/Cmd + Shift + R).

## Typewriter text

The three phrases under "Experienced Storyteller &" are in `index.html`, in the `data-typed` attribute.
Speeds (writing, erasing, how long a phrase stays, the blinking pause) are in the `TIMING` block at the top of the typewriter section in `js/main.js`.

## Pointer, hover and scroll effects

All of these live in section 12b of `css/styles.css`.

- **Pointer:** a plain arrow everywhere (never the text cursor), and the hand on links and buttons.
- **Skills and tools:** the name slides 8px to the right on hover.
- **Experience:** the hovered block opens 36px above and below its text (no colour change) while the other blocks close in by the same total, so nothing below it ever moves. Change `--job-open` (top of `.experience`) to make it more or less. It is set up for up to 8 jobs; the script counts them for you. The lines sit between jobs only (none above the first).
- **Buttons** (download cv, show certification, let's get started): the icon moves 4px closer to the label. **Back to top:** the arrow lifts 6px. No colour change.
- **Scroll:** blocks rise in softly as they enter the screen. To include a new block, put `data-reveal-group` on its container: every direct child is revealed. Speed and distance are in `@keyframes reveal`.
- Hover effects only run on devices with a mouse. Visitors with "reduce motion" turned on get none of the animations.

## Contact button

"let's get started" is a normal `mailto:` link (phones open their mail app). On a computer, `js/main.js` swaps it for a Gmail compose window in a new tab, because many computers have no mail app set up. To use `mailto:` everywhere, delete section 2 of `js/main.js`.

## Publish on GitHub Pages

1. Create a new repository on GitHub (name it `<your-username>.github.io` to get `https://<your-username>.github.io`, or any name to get `https://<your-username>.github.io/<repo-name>/`).
2. Upload everything in this folder to the repository (**Add file → Upload files**, or `git push`). `index.html` must be at the root.
3. **Settings → Pages → Build and deployment → Source: Deploy from a branch → Branch: `main` / `(root)` → Save.**
4. Wait ~1 minute and open the URL shown at the top of the Pages settings.

All paths are relative, so the site works both at the root and in a sub-folder URL.
(If you move to a different address, update the `canonical` and `og:url` lines in the `<head>` of both pages.)

## Layout system

| Breakpoint | Columns | Margins | Gutter |
|---|---|---|---|
| Desktop ≥ 1200px | 8 | 80px | 24px |
| Tablet 900–1199px | 6 | 80px → shrinks to 48px | 24px |
| Mobile < 900px | stacked (2-col grid) | 45.5px on a 393px phone | 24px |

## Structure

```
index.html            home page
projects.html         placeholder page
css/styles.css        tokens → base → components → breakpoints → motion
js/main.js            footer year, contact button, typewriter, scroll reveal
assets/icons/         SVGs exported from Figma (logo.svg = full logo, logo-mobile.svg = small "ba" mark used on phones)
assets/images/        profile.png
assets/cv/            cosmin-cv.pdf (you add)
favicon.svg           browser-tab icon (the "ba" mark)
apple-touch-icon.png  iPhone home-screen icon
```

Colours, fonts and sizes live in the `:root` block at the top of `css/styles.css`.
