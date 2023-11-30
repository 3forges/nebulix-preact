/*
  Ce composant affichera un 'slider' horizontal pour
  afficher les images passé en argument URL (en tout cas en l'etat)
  (image_clickée?index=0&gallery=/images/cosmic_moscow_mule,/images/cosmic-aperol-spritz,/images/cosmic_gin_tonic,/images/cosmic-dark-and-stormy,/images/long-island-iced-tea,/images/cosmic_coctails_1)
*/
import "./ImageNav.module.css"

interface propsType {
  gallery: string[],
  translations: Object,
};

export function ImageNav(props: any) {
  const queryString = window.location.search
  const urlParams = new URLSearchParams(queryString) || ''
  const historyLength = { value: 0 }
  historyLength.value = urlParams.get("history")
    ? parseInt(urlParams.get("history") || '')
    : 1;
  
  const closeWindow = () => {
    if (window.history.length < 1) window.location.href = "/";
    history.go(historyLength.value * -1);
  };

return (
  <>
    bob lookin' for imageNav
    <button
      class="fade-in absolute right-0 top-0 z-50 m-4 h-10 w-10"
      onClick={closeWindow}
    >
      <slot name="close" />
    </button>
    <div
      class="fade-in pointer-events-none absolute bottom-1/2 right-0 z-50 flex w-full justify-between p-2"
    >
      <a
        href="prev"
        v-if="prev"
        class="pointer-events-auto m-4"
      >
        <slot name="prev" />
      </a>
      <a
        v-if="next"
        class="pointer-events-auto m-4 ml-auto"
      >
        <slot name="next"
      /></a>
    </div>
    <slot />
  </>
)}
