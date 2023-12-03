import React from 'preact/compat'
import "./ImageNav.module.css"

/*
interface propsType {
  translations: Object,
  children: any
};
*/

export function ImageNav(props: any) {
  //console.log("ImageNav props: ", props)
  
  const queryString = window.location.search
  const urlParams = new URLSearchParams(queryString) || ''
  const historyLength = { value: 0 }
  const gallery: any = { value: '' }
  const index = parseInt(urlParams.get("index") || '0');
  const Next = { value: '' }
  const Prev = { value: '' }

  gallery.value = urlParams.get("gallery")
    ? urlParams.get("gallery")?.split(",")
    : [];
  historyLength.value = urlParams.get("history")
    ? parseInt(urlParams.get("history") || '')
    : 1;

  if (index + 1 < gallery.value.length) {
    Next.value = `${gallery.value[index + 1]}?index=${index + 1}&history=${
      historyLength.value + 1
    }&gallery=${urlParams.get("gallery")}`;
  }
  if (index > 0) {
    Prev.value = `${gallery.value[index - 1]}?index=${index - 1}&history=${
      historyLength.value + 1
    }&gallery=${urlParams.get("gallery")}`;
  }
  const closeWindow = () => {
    if (window.history.length < 1) window.location.href = "/";
    history.go(historyLength.value * -1);
  };
  const prev = () => {console.log(Prev)}
  const next = () => {console.log(Next)}

return (
  <>
    <button
      class="fade-in absolute right-0 top-0 z-50 m-4 h-10 w-10"
      onClick={closeWindow}
    >
      {props.close}
    </button>
    <div
      class="fade-in pointer-events-none z-50 w-full"
    >
      <a onClick={prev} class="pointer-events-auto m-4 z-50">
        { props.prev }
      </a>
      <a class="z-20">
        { props.panzoom }
      </a>
      <a onClick={next} class="pointer-events-auto m-4 z-50">
        { props.next }
      </a>
              
    </div>
  </>
)}
