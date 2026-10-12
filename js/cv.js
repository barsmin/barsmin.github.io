(() => {
  "use strict";

  // The CV is built from the live content of index.html, so it is always up to date:
  // edit the text on the home page and the CV changes with it.
  // Only these two details belong to the CV alone — edit them here.
  const PHONE = { label: "phone", text: "+40 754 577 311", href: "tel:+40754577311" };
  const ADDRESS = { label: "address", text: "Bucharest, Romania" };

  // Everything must fit on ONE page: the text and spacing of the columns shrink (never below K_MIN)
  // until it does. Only if even that is not enough do the last jobs move to a second page.
  const K_MAX = 1;
  const K_MIN = 0.7;
  const BOTTOM_ROOM = 22;           // free space kept under the last block, in "CV pixels" (794 per page width)
  const SHEET_PX = 794;

  const root = document.getElementById("sheets");
  const sheets = [];

  const el = (tag, className, html) => {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (html != null) node.innerHTML = html;
    return node;
  };

  // "https://www.linkedin.com/in/barsmin/?x=1" -> "linkedin.com/in/barsmin"
  const shortUrl = (url) => (url.host.replace(/^www\./, "") + url.pathname).replace(/\/$/, "");


  // 1. Read the home page
  const loadSite = async () => {
    const response = await fetch("index.html");
    if (!response.ok) throw new Error("index.html: " + response.status);
    return new DOMParser().parseFromString(await response.text(), "text/html");
  };


  // 2. Contact details: the two CV-only ones, then the email and profiles from the home page
  const contactItems = (site) => {
    const items = [PHONE, ADDRESS];

    const mail = site.querySelector("[data-compose]");
    if (mail) {
      const address = new URL(mail.getAttribute("href")).pathname;
      items.push({ label: "email", text: address, href: "mailto:" + address });
    }

    const home = new URL("./", location.href);
    items.push({ label: "web", text: shortUrl(home) || home.host, href: home.href });

    site.querySelectorAll(".social a[aria-label]").forEach((link) => {
      const url = new URL(link.getAttribute("href"), location.href);
      if (url.pathname.replace(/\//g, "") === "") return;       // still the site's home page: not a real profile yet
      items.push({ label: link.getAttribute("aria-label").toLowerCase(), text: shortUrl(url), href: url.href });
    });
    return items;
  };


  // 3. Pages
  const newSheet = () => {
    const sheet = el("section", "sheet");
    const page = el("div", "sheet__page");
    sheet.append(page);
    root.append(sheet);
    sheets.push(sheet);
    return { sheet, page };
  };

  // Page 1: intro, contact, skills / tools / education / credentials, and the experience
  const buildFirstSheet = (site) => {
    const { sheet, page } = newSheet();

    // intro
    const photo = site.querySelector(".hero__photo");
    const head = el("header", "cv-head");
    const intro = el("div", "cv-intro");
    const title = el("h1", "cv-title");
    title.append(el("span"), el("span", "accent"));
    title.children[0].textContent = site.querySelector(".hero__title > span").textContent.trim();
    title.children[1].textContent = JSON.parse(site.querySelector("[data-typed]").dataset.typed)[0];
    intro.append(title, el("p", "cv-lead", site.querySelector(".hero__lead").innerHTML));

    const figure = el("figure", "cv-photo");
    const hello = el("figcaption", "cv-photo__hello");
    hello.textContent = site.querySelector(".hero__hello").textContent.trim();
    // the same <picture> as the site (AVIF / WebP / PNG), so the small files are used here too
    const picture = document.importNode(photo.closest("picture") || photo, true);
    const image = picture.matches("img") ? picture : picture.querySelector("img");
    image.removeAttribute("class");
    image.removeAttribute("fetchpriority");
    image.alt = photo.getAttribute("alt") || "";
    image.width = 300;
    image.height = 262;
    figure.append(hello, el("div", "cv-photo__tail"), picture);
    head.append(intro, figure);

    // contact
    const contact = el("div", "cv-contact");
    const list = el("ul");
    contactItems(site).forEach((item) => {
      const row = el("li");
      const label = el("span", "cv-contact__label");
      label.textContent = item.label;
      const value = item.href ? el("a") : el("span");
      value.textContent = item.text;
      if (item.href) value.href = item.href;
      row.append(label, value);
      list.append(row);
    });
    contact.append(list);

    // columns
    const cols = el("div", "cv-cols");
    const side = el("aside", "cv-side");
    side.setAttribute("aria-label", "Skills, tools, education and credentials");
    site.querySelectorAll(".sidebar > .card").forEach((card) => {
      const copy = document.importNode(card, true);
      copy.removeAttribute("data-reveal-group");
      copy.querySelectorAll(".btn").forEach((button) => button.remove());   // no buttons on paper
      side.append(copy);
    });
    const main = el("div", "cv-main");
    main.append(document.importNode(site.querySelector(".experience > .heading"), true));
    cols.append(side, main);

    page.append(head, contact, cols);
    return sheet;
  };

  // Extra page: only used if so much is added to the site that one page can't hold it
  const newContinuationSheet = () => {
    const { sheet, page } = newSheet();
    const cols = el("div", "cv-cols cv-cols--wide");
    cols.append(el("div", "cv-main"));
    page.append(cols);
    return sheet;
  };


  // 4. Fit: the space left under the last block of the columns, in "CV pixels"
  const room = (sheet) => {
    const cols = sheet.querySelector(".cv-cols");
    let bottom = 0;
    [...cols.children].forEach((column) => {
      const last = column.lastElementChild;
      if (last) bottom = Math.max(bottom, last.getBoundingClientRect().bottom);
    });
    return (cols.getBoundingClientRect().bottom - bottom) / (sheet.getBoundingClientRect().width / SHEET_PX);
  };

  // Finds the largest text scale at which everything fits. Measured at the real A4 size, whatever the screen,
  // so the result is the same on a phone and on a desktop. Returns false if even the smallest scale doesn't fit.
  const fitSheet = (sheet) => {
    const page = sheet.firstElementChild;
    const widthBefore = sheet.style.width;
    sheet.style.width = "210mm";

    const fits = (k) => {
      page.style.setProperty("--k", k);
      return room(sheet) >= BOTTOM_ROOM;
    };

    let k = K_MAX;
    let ok = fits(K_MAX);
    if (!ok) {
      ok = fits(K_MIN);
      k = K_MIN;
      if (ok) {
        let low = K_MIN, high = K_MAX;
        for (let i = 0; i < 14; i++) {
          const mid = (low + high) / 2;
          if (fits(mid)) low = mid; else high = mid;
        }
        k = low;
      }
    }
    page.style.setProperty("--k", k.toFixed(3));
    sheet.style.width = widthBefore;
    return ok;
  };

  const jobsOf = (sheet) => sheet.querySelectorAll(".cv-main .job");

  const layout = () => {
    for (let i = 0; i < sheets.length; i++) {
      while (!fitSheet(sheets[i]) && jobsOf(sheets[i]).length > 1) {
        console.warn("[cv] Too much content for one page: the last job moves to the next page.");
        const jobs = jobsOf(sheets[i]);
        if (!sheets[i + 1]) newContinuationSheet();
        sheets[i + 1].querySelector(".cv-main").prepend(jobs[jobs.length - 1]);
      }
    }
    sheets.forEach((sheet, i) => sheet.setAttribute("aria-label", "CV, page " + (i + 1) + " of " + sheets.length));
  };


  // 5. Fonts and photo must be ready before measuring (the web fonts change the line lengths)
  const assetsReady = async (sheet) => {
    const loads = [];
    if (document.fonts) {
      ['400 10px "Inter Tight"', '700 10px "Inter Tight"', '400 10px "Space Grotesk"', '700 10px "Space Grotesk"']
        .forEach((font) => loads.push(document.fonts.load(font, "Aa—’&").catch(() => [])));
    }
    sheet.querySelectorAll("img").forEach((img) => loads.push(img.decode().catch(() => {})));
    await Promise.race([Promise.all(loads), new Promise((resolve) => setTimeout(resolve, 3500))]);
    if (document.fonts) await document.fonts.ready;
  };


  const printCv = () => window.print();
  document.querySelector("[data-print]").addEventListener("click", printCv);


  (async () => {
    try {
      const site = await loadSite();

      root.replaceChildren();
      const first = buildFirstSheet(site);
      const main = first.querySelector(".cv-main");
      site.querySelectorAll(".experience .job").forEach((job) => main.append(document.importNode(job, true)));

      await assetsReady(first);
      layout();

      // a late font would change the line lengths: fit again
      if (document.fonts) document.fonts.addEventListener("loadingdone", () => sheets.forEach(fitSheet));

      document.documentElement.setAttribute("data-cv-ready", "");

      // Opened from the "download cv" button: show the print / save-as-PDF dialog straight away
      if (location.hash === "#print") setTimeout(printCv, 300);
    } catch (error) {
      console.error("[cv]", error);
      root.replaceChildren(el("p", "cv-message", 'The CV could not be built. Please go <a href="index.html">back to the site</a> and try again.'));
    }
  })();
})();
