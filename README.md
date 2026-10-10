# My Resume Portfolio

A responsive resume / portfolio site (plain HTML, CSS and JavaScript) hosted on GitHub Pages.

## Editing

* **Text and links (profile, skills, experience, education, contact):** edit `index.html`
* **Colors and fonts:** edit the variables at the top of `assets/css/styles.css`
* **Photo:** replace `assets/img/perfil.png` (transparent PNG, about 500 x 800 px works best)
* **Page title / favicon:** `<title>` in `index.html` and `assets/img/favicon.png`

## Adding your projects

Every project is one entry in `assets/js/projects.js`. It becomes a card in the **Projects** tab
(cover photo + short description) and its own page that opens in a new browser tab.

1. Upload your photos, e.g. into a new folder `assets/img/my-project/`.
2. Open `assets/js/projects.js`, copy one entry, paste it after the last one (keep the comma between
entries) and edit the title, short description and photo paths. The first photo is the card cover.
3. Delete the sample projects when you're done. Commit, and the site updates in a minute or two.

Tip: resize photos to about 1600 px wide (and under \~500 KB each) before uploading, so pages load fast.

