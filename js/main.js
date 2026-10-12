(() => {
  "use strict";

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;


  // 1. Footer year — always current
  const year = document.querySelector("[data-year]");
  if (year) year.textContent = new Date().getFullYear();


  // 2. Contact button: on a computer it opens a Gmail compose window, because a plain mailto link
  //    often does nothing useful when no mail app is set up. Phones keep the normal mailto link.
  //    (To use mailto everywhere, delete this block.)
  const compose = document.querySelector("[data-compose]");
  if (compose && window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
    const mailto = new URL(compose.href);
    compose.href = "https://mail.google.com/mail/?" + new URLSearchParams({
      view: "cm",
      fs: "1",
      to: mailto.pathname,
      su: mailto.searchParams.get("subject") || "",
    });
    compose.target = "_blank";
    compose.rel = "noopener noreferrer";
  }


  // 3. Typewriter: writes a phrase, holds it, erases it, blinks for a moment, then writes the next one
  const typed = document.querySelector("[data-typed]");

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


  // 4. Scroll reveal: blocks rise in softly as they enter the screen (the animation itself lives in the CSS)
  if (!reduceMotion && "IntersectionObserver" in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    }, { rootMargin: "0px 0px -6% 0px", threshold: 0.05 });

    document.querySelectorAll("[data-reveal-group] > *").forEach((block) => observer.observe(block));
  } else {
    document.documentElement.classList.remove("js");   // nothing to animate: show everything
  }
  document.documentElement.setAttribute("data-reveal-ready", "");   // tells the page's 4 s safety timer that all is well


  // 5. Sticky header: show its bottom hairline once the page has scrolled
  const header = document.querySelector(".site-header");
  if (header) {
    const onScroll = () => header.classList.toggle("is-stuck", window.scrollY > 0);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }


  // 6. Experience: tell the CSS how many jobs there are, so that when one opens on hover
  //    the others close in by exactly the same total (the page below never moves)
  const experience = document.querySelector(".experience");
  if (experience) experience.style.setProperty("--jobs", experience.querySelectorAll(".job").length);
})();
