# barsmin — portfolio

Static site (plain HTML + CSS + a little JS) built from the Figma wireframe.
No build step, so it works as-is on GitHub Pages: https://barsmin.github.io/

## Still to fill in

| What | Where | Notes |
|---|---|---|
| Instagram link | `index.html` (search for `TODO`) | Still opens instagram.com's home page. Once it's your profile URL it also appears in the CV's contact strip. |
| Projects page | `projects.html` | Placeholder only — the Figma file doesn't include this page yet. |

## Profile photo

The photo exists in three formats in `assets/images/`: `profile.avif` (~20 KB), `profile.webp` (~30 KB) and `profile.png` (~45 KB, a smaller fallback for very old browsers). The page uses a `<picture>` tag, so every browser downloads only the smallest one it understands (the old PNG was 160 KB).

The CV uses its own photo, `profile-cv.webp` (~18 KB): you alone, without the lime shape, in black and white.

The three site files are the same image with a transparent background (720 px wide; the PNG fallback 480 px). To change the photo, send the new PNG (transparent background, at least ~1200 px wide) and re-export all of them (or send it to me and I'll do it), otherwise browsers will keep showing the old one from the first format they support. The photo area on the page is 300×306 px (about 478 px wide on tablets), so 720 px is already sharp on phones and retina screens.

Photo not showing? Open `https://barsmin.github.io/assets/images/profile.png` directly. If that is a 404, check that the files are inside `assets/images/`, named exactly like above (on Windows turn on *View → File name extensions*) and pushed. GitHub Pages needs about a minute, then hard-refresh (Ctrl/Cmd + Shift + R).

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

## CV

The "download cv" button opens `cv.html` in a new tab, which shows the print / save-as-PDF dialog straight away (the "save as PDF / print" button on that page opens it again, and "back to site" returns to the home page). In the dialog choose **Save as PDF** or a printer.

The CV is a **black-and-white, ink-friendly, single A4 page** in the site's style (same fonts and grid lines; white paper, black text, the photo and icons in black and white). It has no logo, menu, buttons or footer. It is built live from the content of `index.html` (title, intro, photo, skills, tools, education, credentials and every job), so editing the text on the home page updates the CV. Nothing else to maintain.

- **One page:** `js/cv.js` shrinks the text and spacing of the two columns (down to 70% of the nominal size, set at the top of the file) until everything fits. Add a lot more content and the text gets smaller; only past that limit does the last job move to a second page (the browser console says so).
- **Paper:** made for A4. The page is as wide as the paper allows (never wider than A4), so it also stays one page when a phone's print dialog adds its own margins. On another paper size, such as US Letter, or with uneven margins, the page can run onto a second sheet: choose **Fit to page** (or a scale under 100%) in the print options. If the colours or the speech-bubble lines are missing, tick **Background graphics**.
- **Phone and address** exist only in the CV: edit `PHONE` and `ADDRESS` at the top of `js/cv.js`.
- **Contact strip:** phone, address, email, website, and every profile in the site's social row that has a real URL (a link that still points at a site's home page is left out).
- **Look:** sizes, spacing and the ink colour are in `css/cv.css` (the `.sheet__page` block; lengths are in "CV pixels", 794 per page width, so they scale with the paper).
- The page is marked `noindex` so search engines don't list your phone number, but anyone with the link can still open it.
- The file name suggested when saving comes from the page title in `cv.html`.

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
cv.html               the CV (printable, built from index.html)
projects.html         placeholder page
css/styles.css        tokens → base → components → breakpoints → motion
css/cv.css            the CV: white A4 sheet, scaling and print rules (self-contained)
js/main.js            footer year, contact button, typewriter, scroll reveal
js/cv.js              builds the CV from index.html; phone and address live here
assets/icons/         SVGs exported from Figma (logo.svg = full logo, logo-mobile.svg = small "ba" mark used on phones)
assets/images/        profile.avif / .webp / .png (site photo in three formats), profile-cv.webp (CV photo)
favicon.svg           browser-tab icon (the "ba" mark)
apple-touch-icon.png  iPhone home-screen icon
```

Colours, fonts and sizes live in the `:root` block at the top of `css/styles.css`.
