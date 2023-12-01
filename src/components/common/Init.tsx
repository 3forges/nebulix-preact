import { useEffect } from 'preact/compat'
import { showContact } from "@src/store"
import {contact_dialog_html_elt_id} from "./config"
export function Init() {
  const width = window.innerWidth
  const shown = false;
  useEffect(() => {
    const root = document.documentElement;
    const html = document.getElementsByTagName("html")[0];
    const start = new Date().getTime();
  
    /* GET TIME TO LOAD PAGE */
    window.onload = function () {
      const end = new Date().getTime();
      const timeTaken = end - start;
      document.documentElement.setAttribute(
        "data-speed",
        `${Math.round(timeTaken / 1000)}`,
      );
    };
    /* CHECK IF IS IOS DEVICE */
    const ua = navigator.userAgent;
    if (/iPad|iPhone|iPod/.test(ua)) {
      document.documentElement.setAttribute("data-ios", "1");
    }
    /* SET SCROLL BEHAVIOR (PAGE VIEW ANIMATIONS + SMOOTH SCROLL IS NOT WORKING ) */
    setTimeout(() => {
      html.style["scroll-behavior"] = "smooth";
    }, 500);
  
    /* SCROLL OBSERVER FOR PAGE */
    let prevPos = 0;
    let isScrollingUp = false;
  
    function flip(attr, state) {
      root.setAttribute(attr, String(state));
    }
  
    const scrollHandler = setTimeout(() => {
      const pos = window.scrollY;
      const delta = pos - prevPos;
      const scrollDirection = Math.sign(delta) === -1;
      const isBottom =
        pos + window.innerHeight > document.body.offsetHeight - 100;
      const isTop = pos < 100;
  
      if (delta < -15 || delta > 15) {
        isScrollingUp = scrollDirection;
      }
  
      flip("data-is-scrolling-up", isScrollingUp);
      flip("data-is-bottom", isBottom);
      flip("data-is-top", isTop);
  
      prevPos = pos;
    }, 20);
  
    window.addEventListener("scroll", () => scrollHandler, { passive: true });
    /* PARALLAX ANIMATIONS */
    const parallaxReveal = document.querySelectorAll(".nebulix-parallax");
    if (!document.documentElement.dataset.ios) {
      parallaxReveal.forEach((el) => {
        const img = el.querySelector(".parallax");
  
        img?.animate(
          {
            transform: ["none", "translateY(30%)"],
          },
          {
            fill: "both",
            timeline: new ViewTimeline({ subject: el }), // ViewTimeline is from the polyfill
            rangeStart: { rangeName: "exit", offset: CSS.percent(5) },
            rangeEnd: { rangeName: "exit", offset: CSS.percent(100) },
          },
        );
      });
    }
  
    /* CONTACT FORM */
    const contactButtons = document.querySelectorAll(`[href='#${contact_dialog_html_elt_id}']`);
    console.log(` [Init.tsx] -`)
    console.log(` [Init.tsx] -`)
    console.log(` [Init.tsx] - contactButtons : `, contactButtons)
    contactButtons.forEach((el) => {
      el.addEventListener("click", (e) => {
        console.log(` [Init.tsx] - click CONTACT EVENT`)
        e.preventDefault();
        const contactdialog = document.getElementById(`${contact_dialog_html_elt_id}`)
        contactdialog?.classList.add(`visible`)
        contactdialog?.classList.remove(`invisible`)
        contactdialog?.classList.toggle(`hidden`)
        contactdialog?.classList.toggle(`overflow-x-hidden`)
        // contactdialog?.style.display = 'block';
        
        // id={`${contact_dialog_html_elt_id}Label`}
        
        /// showContact.set(true); // uses the store we want to get rid of
      });
    });
  }, [])

  return (
    <>
      <div class="hide hidden"></div>
    </>
  )
}

{/*
<script setup>
import { watch, ref, onMounted } from "vue";
import { useWindowSize } from "@vueuse/core";
import { useDebounceFn } from "@vueuse/core";
import { showContact } from "@src/store";
const { width } = useWindowSize();
const shown = ref(false);

onMounted(() => {
  const root = document.documentElement;
  const html = document.getElementsByTagName("html")[0];
  const start = new Date().getTime();

  window.onload = function () {
    const end = new Date().getTime();
    const timeTaken = end - start;
    document.documentElement.setAttribute(
      "data-speed",
      Math.round(timeTaken / 1000),
    );
  };

  const ua = navigator.userAgent;
  if (/iPad|iPhone|iPod/.test(ua)) {
    document.documentElement.setAttribute("data-ios", 1);
  }

  setTimeout(() => {
    html.style["scroll-behavior"] = "smooth";
  }, 500);


  let prevPos = 0;
  let isScrollingUp = false;

  function flip(attr, state) {
    root.setAttribute(attr, String(state));
  }

  const scrollHandler = useDebounceFn(() => {
    const pos = window.scrollY;
    const delta = pos - prevPos;
    const scrollDirection = Math.sign(delta) === -1;
    const isBottom =
      pos + window.innerHeight > document.body.offsetHeight - 100;
    const isTop = pos < 100;

    if (delta < -15 || delta > 15) {
      isScrollingUp = scrollDirection;
    }

    flip("data-is-scrolling-up", isScrollingUp);
    flip("data-is-bottom", isBottom);
    flip("data-is-top", isTop);

    prevPos = pos;
  }, 20);

  window.addEventListener("scroll", () => scrollHandler(), { passive: true });

  const parallaxReveal = document.querySelectorAll(".nebulix-parallax");
  if (!document.documentElement.dataset.ios) {
    parallaxReveal.forEach((el) => {
      const img = el.querySelector(".parallax");

      img.animate(
        {
          transform: ["none", "translateY(30%)"],
        },
        {
          fill: "both",
          timeline: new ViewTimeline({ subject: el }),
          rangeStart: { rangeName: "exit", offset: CSS.percent(5) },
          rangeEnd: { rangeName: "exit", offset: CSS.percent(100) },
        },
      );
    });
  }

  
  const contactButtons = document.querySelectorAll("[href='#contact']");
  contactButtons.forEach((el) => {
    el.addEventListener("click", (e) => {
      e.preventDefault();
      showContact.set(true);
    });
  });
});

watch(width, (val) => {
  if (!shown.value) {
    console.log(
      "%c ♻️🔋+ 🧠👷🏽+ 🗜 = 🚀🍃🌐" +
        "\n%cThis site has a low carbon footprint " +
        "\n%c🪙CREDITS:" +
        "\n%cTheme based on Nebulix 🌌" +
        "\n%cby: https://unfolding.io",
      "font-family:Verdana; font-size: 20px; color: #2A4D47; font-weight:bold; padding: 5px 0; opacity: 0.5; ",
      "font-family:Verdana; font-size: 25px; color: #2A4D47; font-weight:bold; padding: 5px 0; ",
      "font-family:Verdana; font-size:16px; color: #2A4D47; font-weight:bold;  padding: 5px 0; ",
      "font-family:Verdana; font-size:12px; color: #2A4D47; padding: 2px 0; ",
      "font-family:Verdana; font-size:12px; color: #2A4D47; padding: 2px 0; ",
    );
    shown.value = true;
  }
});
</script>
*/}