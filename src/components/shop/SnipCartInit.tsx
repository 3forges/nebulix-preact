import { useEffect, useState, useRef } from 'preact/compat'
import '/public/snipcart.css'
// @import '/public/snipcart.css';

interface propsType {
  snipcartKey: String,
}

export function SnipCartInit(props: propsType) {

  let scripLoaded = false;

  function LoadJS() {
    let script = document.createElement("script");
    script.type = "text/javascript";
    script.src = "https://cdn.snipcart.com/themes/v3.7.1/default/snipcart.js";
    if (!scripLoaded) {
      document.head.appendChild(script);
    }
  }
  
 
  useEffect(() => {
    if (!window.Snipcart) {
      setTimeout(() => {
        LoadJS();
        scripLoaded = true;
      }, 2500);
    }
  })

  return (
    <>
      <div
        hidden
        data-config-load-css="false"
        id="snipcart"
        data-api-key={props.snipcartKey}
        data-config-modal-style="side"
      ></div>
    </>
  )
}
