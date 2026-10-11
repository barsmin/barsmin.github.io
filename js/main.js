(() => {
  "use strict";

  // 1. Footer year — always current
  const year = document.querySelector("[data-year]");
  if (year) year.textContent = new Date().getFullYear();

  // 2. Hide images that haven't been uploaded yet (e.g. assets/images/profile.png)
  document.querySelectorAll("img[data-optional]").forEach((img) => {
    const hide = () => { img.hidden = true; };
    if (img.complete && img.naturalWidth === 0) hide();
    else img.addEventListener("error", hide, { once: true });
  });

  // 3. Layout-grid overlay: press "G" (or open the page with ?grid) to compare against Figma
  let guides = null;

  const toggleGrid = () => {
    if (!guides) {
      guides = document.createElement("div");
      guides.className = "guides";
      guides.setAttribute("aria-hidden", "true");
      guides.innerHTML = '<div class="container grid">' + "<i></i>".repeat(8) + "</div>";
      document.body.append(guides);
      return;
    }
    guides.hidden = !guides.hidden;
  };

  document.addEventListener("keydown", (e) => {
    if (e.key.toLowerCase() !== "g" || e.metaKey || e.ctrlKey || e.altKey) return;
    if (/^(input|textarea|select)$/i.test(e.target.tagName)) return;
    toggleGrid();
  });

  if (new URLSearchParams(location.search).has("grid")) toggleGrid();
})();
