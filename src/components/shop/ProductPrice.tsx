import { useEffect } from 'preact/compat'
import { productExtraPrice, productVariations } from "@src/store";
import { formatPrice } from "@util/toLocale";

interface PropsType {
  price: number,
  offer: number,
}

function ProductPrice(props: PropsType ) {
  console.log("ProductPrice.tsx props: ", props)

  // const { Price, offer } = props
  const Price = () => {
    return formatPrice(productExtraPrice.value + props.price);
  }
  
  const OfferPrice = () => {
    return formatPrice(productExtraPrice.value + props.offer);
  }

  useEffect(() => {
    /* CLEAR STATE */
    productExtraPrice.set(0);
    productVariations.set([]);
  }, [])

  return(
    <>PRODUCT PRICE HERE
      <div class="grid gap-0 text-right leading-none">
        <span class={ props.offer > 0 ? 'muted text-xs text-danger line-through' : ''}>
          { props.price }
        </span>
        <span v-if={ props.offer > 0}>{ OfferPrice }</span>
      </div>
    </>
  )
}
