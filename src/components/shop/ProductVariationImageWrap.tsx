import { useStore } from "@nanostores/vue";
import { productVariations } from "@src/store";

interface Props {
  id: string
}

export function ProductVariationImageWrap(props: any) {

  const className = "z-50";
  const $productVariations = JSON.parse(JSON.stringify(useStore(productVariations)));
  const active = () => {
    return $productVariations.some((product) => product.id === props.id);
  }
  
  /*
  watch($productVariations, (value, oldValue) => {
    if (oldValue && oldValue.some((product) => product.id === props.id)) {
      className.value = "-z-10";
    } else {
      className.value = "z-50";
    }
  });
  */

  return(
    <>
      <div
        class={`${className} product-image col-start-1 row-start-1 h-full w-full`}
        v-show={active}
      >
        {props.productImage}
      </div>
    </>
  )
}
