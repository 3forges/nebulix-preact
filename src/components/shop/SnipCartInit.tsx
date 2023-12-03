import { useEffect, useState, useRef } from 'preact/compat'
import '/public/snipcart.css'

interface propsType {
  snipcartKey: String,
}

export function SnipCartInit(props: propsType) {

  let scripLoaded = false;

  function LoadJS() {
    let script = document.createElement("script");
    script.type = "text/javascript";
    script.src = "https://cdn.snipcart.com/themes/v3.7.1/default/snipcart.js";
    script.onload = () => {
      scripLoaded = true
      console.log("snipcart cdn script imported ", scripLoaded)
    }
    
    if (!scripLoaded) {
      document.head.appendChild(script);
      // script.addEventListener("error", (e) => { console.log("SC error: ", e.error) })
    }
  }

  useEffect(() => {
    const headChilds = Array.from(document.head.children).filter((item) => { 
      if (item.nodeName == "SCRIPT" ){ 
        return(item) 
      }}).filter( (item) => { if (item.src == "https://cdn.snipcart.com/themes/v3.7.1/default/snipcart.js") return item})
    
    if (headChilds.length === 0) {
    //if (!window.Snipcart) {
      console.log("snipcart cdn script not present") 
      setTimeout(() => {
        LoadJS();
        scripLoaded = true;
      }, 2500);
    }else{
      console.log("snipcart cdn script present")
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
      >
        <div id="content"></div>
      </div>
    </>
  )
}
