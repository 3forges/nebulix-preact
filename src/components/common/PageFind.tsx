import { useRef, useEffect, useState } from 'preact/compat'
import s from './PageFind.module.css'
import {PageFindUI} from '../../pages/_pagefind/pagefind-ui.js.ts'
/*
const props = defineProps({
  translations: Object,
});
*/
export function PageFinder(props) {

const [show, setShow] = useState(false)
const search = useRef(null)
const results = []

const [loaded, setLoaded] = useState(false)

  function scriptLoaded() {
    setTimeout(() => {
      new PagefindUI({
        element: "#search",
        resetStyles: false,
        showEmptyFilters: false,
        translations: {
          placeholder: props.translations.search,
          clear_search: props.translations.clear,
        },
      });
    }, 100);
  }
/*
  setTimeout(() => {
      const input = search.current.querySelector(".pagefind-ui__search-input");
      input.focus();
    }, 300);
  }
*/
  function LoadJS() {
    let script = document.createElement("script");
    script.type = "text/javascript";
    script.src = "../../pages/_pagefind/pagefind-ui.js";
    document.head.appendChild(script);
    script.addEventListener("load", scriptLoaded);
  }

  const openSearchUi = async () => {
    if (!loaded) {
      //LoadJS();
      setShow(true);
      setLoaded(true);
    } else {
      setShow(true);
    }
  };

  return (
    <>
      { show &&
        <div
          class={`${s.searchModal} surface-dark ${s.searchScroll} text-left`}
        >
          <div class="container-md py-md">
            <div id="search" ref={search}></div>
          </div>
          <div class="absolute right-0 top-0 inline-block">
            <button class="btn-icon btn-close m-4" onClick={ () =>{ setShow(!show)}}>
              {props.btnClose}
              <label sr-only>translations.close</label>
            </button>
          </div>
        </div>
      }

      <button
        onClick={openSearchUi}
        class="grid h-full place-items-center"
        aria-label="translations.search"
      >
        {props.btnSearch}
      </button>
    </>
  )
}
