import { useEffect, useState, useRef } from 'preact/compat'

interface propsType {
  snipcartKey: String,
}

export function SnipCartInit(props: propsType) {

  const shop = null
  let scripLoaded = false;
  // const pointer = usePointer();
  let styleSrc = "";
  let count = 0;
  const style = useRef(null)

  function LoadJS() {
    let script = document.createElement("script");
    script.type = "text/javascript";
    script.src = "https://cdn.snipcart.com/themes/v3.7.1/default/snipcart.js";
    if (!scripLoaded) {
      document.head.appendChild(script);
    }
  }
  
  function loadCSS() {
    if (!scripLoaded) {
      styleSrc = "/snipcart.css";
    }
  }
  
  useEffect(() => {
    if (!window.Snipcart) {
      setTimeout(() => {
        LoadJS();
        loadCSS();
        scripLoaded = true;
      }, 2500);
    }
  })

  const stop = () => { //watchEffect(() => {
    count++;
    if 
      (count > 1 )
      /*
      && pointer.y.value) ||
      pointer.x.value ||
      pointer.isInside.value ||
      pointer.pointerType.value ||
      pointer.pressure.value ||
      pointer.tiltX.value ||
      pointer.twist.value ||
      pointer.width.value ||
      pointer.pointerId.value ||
      pointer.tiltY.value
      ) 
      */
      {
        LoadJS();
        loadCSS();
        scripLoaded = true;
        stop();
      }
  }


  return (
    <>
      <div
        ref={shop}
        hidden
        data-config-load-css="false"
        id="snipcart"
        data-api-key="props.snipcartKey"
        data-config-modal-style="side"
      ></div>
      <link ref={style} type="text/css" rel="stylesheet" href={styleSrc} />
    </>
  )
}
