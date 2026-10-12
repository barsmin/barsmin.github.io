(() => {
  "use strict";

  // The CV is built from the live content of index.html, so it is always up to date:
  // edit the text on the home page and the CV changes with it.
  // Only these two details belong to the CV alone — edit them here.
  const PHONE = { label: "phone", text: "+40 754 577 311", href: "tel:+40754577311" };
  const ADDRESS = { label: "address", text: "Bucharest, Romania" };

  const A4_WIDTH_PX = 210 * 96 / 25.4;
  const root = document.getElementById("sheets");

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


  // 3. Build page 1: intro, contact, skills / tools / education / credentials, and the experience heading
  const buildFirstSheet = (site) => {
    const sheet = el("section", "sheet");

    // intro
    const titleLines = [
      site.querySelector(".hero__title > span").textContent.trim(),
      JSON.parse(site.querySelector("[data-typed]").dataset.typed)[0],
    ];
    const photo = site.querySelector(".hero__photo");

    const head = el("header", "cv-head");
    const intro = el("div", "cv-intro");
    const title = el("h1", "cv-title");
    title.append(el("span"), el("span", "accent"));
    title.children[0].textContent = titleLines[0];
    title.children[1].textContent = titleLines[1];
    intro.append(title, el("p", "cv-lead", site.querySelector(".hero__lead").innerHTML));

    const figure = el("figure", "cv-photo");
    const hello = el("figcaption", "cv-photo__hello");
    hello.textContent = site.querySelector(".hero__hello").textContent.trim();
    const image = el("img");
    image.src = photo.getAttribute("src");
    image.alt = photo.getAttribute("alt") || "";
    image.width = 300;
    image.height = 306;
    figure.append(hello, el("div", "cv-photo__tail"), image);
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
      side.append(copy);
    });
    const main = el("div", "cv-main");
    const heading = site.querySelector(".experience > .heading");
    main.append(document.importNode(heading, true));
    cols.append(side, main);

    sheet.append(head, contact, cols);
    return sheet;
  };

  const newContinuationSheet = () => {
    const sheet = el("section", "sheet");
    const cols = el("div", "cv-cols cv-cols--wide");
    cols.append(el("div", "cv-main"));
    sheet.append(cols);
    return sheet;
  };


  // 4. Pour the jobs into the pages: when one doesn't fit, it starts the next page
  const overflows = (sheet) => {
    const cols = sheet.querySelector(".cv-cols");
    return cols.scrollHeight > cols.clientHeight + 1;
  };

  const paginate = (sheets, jobs) => {
    let sheet = sheets[0];
    let main = sheet.querySelector(".cv-main");

    jobs.forEach((job) => {
      main.append(job);
      const alone = main.querySelectorAll(".job").length === 1;
      if (overflows(sheet) && !alone) {
        sheet = newContinuationSheet();
        sheets.push(sheet);
        root.append(sheet);
        main = sheet.querySelector(".cv-main");
        main.append(job);
      }
    });

    sheets.forEach((s, i) => s.setAttribute("aria-label", "CV, page " + (i + 1) + " of " + sheets.length));
    if (overflows(sheets[0])) console.warn("[cv] The first page's left column is too long for one page.");
  };


  // 5. Screen only: shrink the pages to fit narrow screens
  const fit = () => {
    const room = document.documentElement.clientWidth - 24;
    root.style.setProperty("--fit", Math.min(1, room / A4_WIDTH_PX).toFixed(4));
  };


  const printCv = () => window.print();
  document.querySelector("[data-print]").addEventListener("click", printCv);


  (async () => {
    try {
      const site = await loadSite();

      const first = buildFirstSheet(site);
      root.replaceChildren(first);

      await Promise.all([
        document.fonts ? document.fonts.ready : Promise.resolve(),
        ...[...first.querySelectorAll("img")].map((img) => img.decode().catch(() => {})),
      ]);

      const jobs = [...site.querySelectorAll(".experience .job")].map((job) => document.importNode(job, true));
      paginate([first], jobs);

      fit();
      window.addEventListener("resize", fit);
      document.documentElement.setAttribute("data-cv-ready", "");

      // Opened from the "download cv" button: show the print / save-as-PDF dialog straight away
      if (location.hash === "#print") setTimeout(printCv, 300);
    } catch (error) {
      console.error("[cv]", error);
      root.replaceChildren(el("p", "cv-message", 'The CV could not be built. Please go <a href="index.html">back to the site</a> and try again.'));
    }
  })();
})();
