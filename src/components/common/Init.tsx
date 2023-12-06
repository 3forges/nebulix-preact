import { useEffect } from 'preact/compat'
import { showContact } from "@src/store"
import { contact_dialog_html_elt_id } from "./config"
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
      const pos = window.scrollY
      const delta = pos - prevPos
      const scrollDirection = Math.sign(delta) === -1
      const isBottom =
        pos + window.innerHeight > document.body.offsetHeight - 100
      const isTop = pos < 100;

      if (delta < -15 || delta > 15) {
        isScrollingUp = scrollDirection;
      }

      flip("data-is-scrolling-up", isScrollingUp);
      flip("data-is-bottom", isBottom);
      flip("data-is-top", isTop);

      prevPos = pos;
    }, 20)

    window.addEventListener("scroll", () => scrollHandler, { passive: true })
    /* PARALLAX ANIMATIONS */
    const parallaxReveal = document.querySelectorAll(".nebulix-parallax")
    if (!document.documentElement.dataset.ios) {
      parallaxReveal.forEach((el) => {
        const img = el.querySelector(".parallax")

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
        )
      })
    }

    /*
      ContactDialog inits
    */
    /* CONTACT BUTTON OPEN MODAL */
    const contactButtons = document.querySelectorAll(`[href='#${contact_dialog_html_elt_id}']`)
    console.log(` [Init.tsx] - contactButtons : `, contactButtons[0])
    /* CONTACTFORM BUTTON CLOSE MODAL */
    const closeDialog = document.getElementById('closePestoContactModalBtn')

    closeDialog?.addEventListener("click", () => { 
      console.log("click")
      document.getElementById(`${contact_dialog_html_elt_id}`)?.classList.toggle("invisible")
    })

    contactButtons.forEach((el) => {
      el.addEventListener("click", (e) => {
        const contactdialog = document.getElementById(`${contact_dialog_html_elt_id}`)
        contactdialog?.classList.toggle("invisible")
      
        console.log(` [Init.tsx] - click CONTACT EVENT >> contactdialog.style.display = ${JSON.stringify({display: `[${contactdialog?.style.display}]`})}`)
      })
    })
  }, [])

  return (
    <>
      <div class="hide hidden"></div>
    </>
  )
}
