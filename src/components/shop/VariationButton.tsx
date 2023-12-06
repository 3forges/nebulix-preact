import React, { useEffect } from "preact/compat"
import { productExtraPrice, productVariations } from "@src/store";
/* ALERTE !!! */
import { useStore } from "@nanostores/vue";

export function VariationButton(props: any) {
  let btn

  const ProductVariations = Array.of(JSON.parse(JSON.stringify(useStore(productVariations))));
  const active = () => {
    return ProductVariations.some((product) => product.id === props.id);
  };

  useEffect(() => {
    btn = document.querySelector("#add-to-card")
  }, [])

  useEffect(() => {
    const total = ProductVariations.reduce((accumulator, currentObject) => {
      return accumulator + currentObject.price;
    }, 0);
  
    productExtraPrice.set(total);
  }, [ProductVariations])

  function addOrRemoveProduct(object) {
    let arr = JSON.parse(JSON.stringify(ProductVariations));
    const existingGroupIndex = arr.findIndex((obj) => obj.group === props.group);
    const existingIndex = arr.findIndex((obj) => obj.id === props.id);
  
    if (existingGroupIndex !== -1 && existingIndex === -1) {
      arr[existingGroupIndex] = object;
      btn.setAttribute(props.option, object.value);
      productVariations.set(arr);
      return;
    }
  
    if (existingIndex !== -1) {
      arr.splice(existingIndex, 1);
      btn.removeAttribute(props.option);
      productVariations.set(arr);
      return;
    }
  
    arr.push(object);
    btn.setAttribute(props.option, object.value);
    productVariations.set(arr);
    return;
  }

  const setValue = () => {
    if (!btn) return;
  
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
      <button
        class="`${className} ${
          active ? 'bg-primary-950 bg-opacity-10 hover:text-light' : 'border-0'
        }`"
        onClick={setValue}
      >
        { props.thumbnail }
      </button>
    </>
  )
}
