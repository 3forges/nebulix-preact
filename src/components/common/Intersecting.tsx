import React, { useCallback, useEffect, useState } from "preact/compat";

/**
 * 
 * ---THE IDEA
 * 
 * Ok, so the idea of Intersecting.vue, is 
 * to detect if a component is in the viewport, using
 * new browsers feature named "IntersectionObserver"
 * - 
 * https://vueuse.org/core/useIntersectionObserver/
 * https://stackoverflow.com/questions/45514676/react-check-if-element-is-visible-in-dom
 * 
 */
// useInViewport
export interface IntersectingRender {
  isInViewport: boolean;
  ref: React.RefCallback<HTMLElement>;
}
export const Intersecting = (): IntersectingRender {
  const [isInViewport, setIsInViewport] = useState(false);
  const [refElement, setRefElement] = useState<HTMLElement | null>(null);

  const setRef = useCallback((node: HTMLElement | null) => {
    if (node !== null) {
      setRefElement(node);
    }
  }, []);

  useEffect(() => {
    if (refElement && !isInViewport) {
      const observer = new IntersectionObserver(
        ([entry]) => entry.isIntersecting && setIsInViewport(true)
      );
      observer.observe(refElement);

      return () => {
        observer.disconnect();
      };
    }
  }, [isInViewport, refElement]);

  return { isInViewport, ref: setRef };
}

/**
 * Usage
 * - 
 *  [SomeReactComponent.tsx]
 * - 
 */
/*
import { useInViewport } from "../layout/useInViewport";

export function SomeReactComponent() {
    const { isInViewport, ref } = useInViewport();

    return (
        <>
            <h3>A component which only renders content if it is in the current user viewport</h3>

            <section ref={ref}>{isInViewport && (<ComponentContentOnlyLoadedIfItIsInViewport />)}</section>
        </>
    );
}*/