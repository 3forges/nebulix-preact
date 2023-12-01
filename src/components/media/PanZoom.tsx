import Panzoom from "@panzoom/panzoom"
import { useRef, useEffect } from 'preact/compat'

interface propsType {
  alt: String,
}

export function PanZoom(props: any) {
  const zoom = useRef(null)
  const container = useRef(null)
  let panzoom
  console.log(props.panzoomin)
  useEffect(() => {
    if (zoom.current) {
      panzoom = Panzoom(zoom.current, {
        maxScale: 5,
        minScale: 0.8,
        overflow: "hidden",
      })
      console.log("effect", panzoom)
    }
  },[])
  return (
    <>
      <div
        ref={container}
        class="z-20 grid h-full max-h-screen w-full place-items-center justify-center overflow-hidden"
      >
        <div onWheel={(e) => { e.preventDefault(); panzoom.zoomWithWheel(e)}}>
          <div ref={zoom} class="max-w-screen relative max-h-screen overflow-hidden">
            { props.panzoomin }
          </div>
        </div>
      </div>
    </>
  )
}
