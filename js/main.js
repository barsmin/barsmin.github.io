(() => {
  "use strict";

  // 1. Footer year — always current
  const year = document.querySelector("[data-year]");
  if (year) year.textContent = new Date().getFullYear();


  // 2. Profile photo
  //    If assets/images/profile.png is not found it tries a few common alternatives
  //    (GitHub Pages is case-sensitive, and Windows can hide a ".png.png" double extension),
  //    then shows a visible note with the expected path instead of failing silently.
  const photo = document.querySelector(".hero__photo");
  if (photo) {
    const dir = "assets/images/";
    const candidates = [
      dir + "profile.png",
      dir + "Profile.png",
      dir + "profile.PNG",
      dir + "profile.png.png",
      dir + "profile%202.png",            // Figma's default export name for the "profile 2" layer
      dir + "profile.jpg",
      dir + "profile.jpeg",
      dir + "profile.webp",
      "profile.png",                      // uploaded to the repository root by mistake
    ];
    let attempt = 0;

    const onError = () => {
      attempt += 1;
      if (attempt < candidates.length) {
        photo.src = candidates[attempt];
        return;
      }
      const expected = new URL(candidates[0], location.href).href;
      console.warn("[portfolio] Profile photo not found. Expected it at: " + expected);
      const note = document.createElement("p");
      note.className = "hero__missing";
      note.textContent = "photo not found — add " + candidates[0];
      photo.replaceWith(note);
    };

    photo.addEventListener("error", onError);
    if (photo.complete && photo.naturalWidth === 0) onError();   // it already failed before this script ran
  }


  // 3. Typewriter: writes a phrase, holds it, erases it, blinks for a moment, then writes the next one
  const typed = document.querySelector("[data-typed]");
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (typed && !reduceMotion) {
    // All times in milliseconds — change these to make it faster or slower
    const TIMING = {
      type: 90,      // per character while writing (a little random jitter is added)
      erase: 45,     // per character while erasing
      hold: 2600,    // a finished phrase stays on screen (cursor blinking)
      pause: 1000,   // empty line with the cursor blinking, before the next phrase starts
    };

    const phrases = JSON.parse(typed.dataset.typed);
    const text = typed.querySelector(".typed__text");
    const caret = typed.querySelector(".caret");
    const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

    // Invisible copies of every phrase reserve the space, so the layout never jumps
    phrases.forEach((phrase) => {
      const sizer = document.createElement("span");
      sizer.className = "typed__sizer";
      sizer.setAttribute("aria-hidden", "true");
      sizer.textContent = phrase + "|";
      typed.append(sizer);
    });

    const run = async () => {
      let index = 0;
      await wait(TIMING.hold);                         // the first phrase is already on screen

      for (;;) {
        // erase the current phrase
        caret.classList.add("is-typing");
        for (let n = phrases[index].length - 1; n >= 0; n--) {
          text.textContent = phrases[index].slice(0, n);
          await wait(TIMING.erase);
        }

        // empty line: the cursor blinks
        caret.classList.remove("is-typing");
        await wait(TIMING.pause);

        // write the next phrase
        index = (index + 1) % phrases.length;
        caret.classList.add("is-typing");
        for (let n = 1; n <= phrases[index].length; n++) {
          text.textContent = phrases[index].slice(0, n);
          await wait(TIMING.type + Math.random() * 40 - 20);
        }

        // finished: the cursor blinks while the phrase is on screen
        caret.classList.remove("is-typing");
        await wait(TIMING.hold);
      }
    };

    run();
  }


  // 4. Layout-grid overlay: press "G" (or open the page with ?grid) to compare against Figma
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
