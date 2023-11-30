import Panzoom from "@panzoom/panzoom"
import { useRef, useEffect } from 'preact/compat'

interface propsType {
  alt: String,
}

export function PanZoom(props: propsType) {
  const zoom = useRef(null)
  const container = useRef(null)
  let panzoom

  useEffect(() => {
    console.log("PanZoom.tsx zoom: ", zoom?.current)
    panzoom = Panzoom(zoom?.current?.value, {
      maxScale: 5,
      minScale: 0.8,
      overflow: "visible",
    });
  })
  return (
    <>
      <div
        ref={container}
        class="z-20 grid h-full max-h-screen w-full place-items-center justify-center overflow-hidden"
      >
        <div onWheel={panzoom.zoomWithWheel}>
          <div ref={zoom} class="max-w-screen relative max-h-screen">
            <slot />
          </div>
        </div>
      </div>
    </>
  )
}
