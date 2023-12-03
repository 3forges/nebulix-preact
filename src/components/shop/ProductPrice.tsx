import { useEffect } from 'preact/compat'
import { productExtraPrice, productVariations } from "@src/store";
import { formatPrice } from "@util/toLocale";

interface PropsType {
  price: number,
  offer: number,
}

export function ProductPrice(props: PropsType ) {
  console.log("ProductPrice.tsx props: ", props)

  // const { Price, offer } = props
  const Price = formatPrice(props.price);
  const OfferPrice = formatPrice(props.offer);

  useEffect(() => {
    /* CLEAR STATE */
    productExtraPrice.set(0);
    productVariations.set([]);
  }, [])

  return(
    <>
      <div class="grid gap-0 text-right leading-none">
        <span class={ props.offer > 0 ? 'muted text-xs text-warning line-through' : ''}>
          { Price }
        </span>
        { props.offer > 0 && <span>{ OfferPrice }</span> }
      </div>
    </>
  )
}
