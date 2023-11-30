import { useEffect } from "preact/compat"
import { useStore } from "@nanostores/vue";
import { productExtraPrice, productVariations } from "@src/store";

export function VariationButton(props: any) {
  let btn

  const $productVariations = JSON.parse(JSON.stringify(useStore(productVariations)));
  const active = () => {
    return $productVariations.value.some((product) => product.id === props.id);
  };

  /*
  watch($productVariations, (value) => {
    const total = value.reduce((accumulator, currentObject) => {
      return accumulator + currentObject.price;
    }, 0);
  
    productExtraPrice.set(total);
  });
  */

  useEffect(() => {
    btn.value = document.querySelector("#add-to-card")
  }, [])

  useEffect(() => {
    const total = $productVariations.reduce((accumulator, currentObject) => {
      return accumulator + currentObject.price;
    }, 0);
  
    productExtraPrice.set(total);
  }, [$productVariations])

  function addOrRemoveProduct(object) {
    let arr = JSON.parse(JSON.stringify($productVariations.value));
    const existingGroupIndex = arr.findIndex((obj) => obj.group === props.group);
    const existingIndex = arr.findIndex((obj) => obj.id === props.id);
  
    if (existingGroupIndex !== -1 && existingIndex === -1) {
      arr[existingGroupIndex] = object;
      btn.value.setAttribute(props.option, object.value);
      productVariations.set(arr);
      return;
    }
  
    if (existingIndex !== -1) {
      arr.splice(existingIndex, 1);
      btn.value.removeAttribute(props.option);
      productVariations.set(arr);
      return;
    }
  
    arr.push(object);
    btn.value.setAttribute(props.option, object.value);
    productVariations.set(arr);
    return;
  }

  const setValue = () => {
    if (!btn.value) return;
  
    addOrRemoveProduct({
      hasImage: props.hasImage,
      value: props.value,
      price: props.price,
      group: props.group,
      id: props.id,
      //hasImage: false,
    });
  };

  return(
    <>
      Variation Button Here
      <button
        class="`${className} ${
          active ? 'bg-primary bg-opacity-10 hover:text-light' : 'border-0'
        }`"
        onClick={setValue}
      >
        <slot />
      </button>
    </>
  )
}
