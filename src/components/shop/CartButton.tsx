import { useEffect, useRef, useState } from "preact/compat"
import "./CartButton.module.css"
export interface Shopping {
  value?: any;
}

export interface CartCount {
  value: number;
}


export interface CartButtonProps {
  label?: String;
  value?: string;
  option?: string;
}


export function CartButton({ label = `default label of card button`, option = `pesto`, value = `pesto`}: CartButtonProps) {
 
  const btn = useRef(null)
  const [count, setCount] = useState<CartCount>({
    value: 0
  })
  const [shoppingState, setShoppingState] = useState<Shopping>({
    value: {}
  })
  /*
  const setValue = () => {
    if (!btn) return;
    btn.setAttribute(props.option, message.value);
  };
  */
  //if (!!window.Snipcart)
  //const SnipcartService = window.Snipcart?
  const openCart = () => {
    console.log(` invoke [openCart]`);
    if (window.Snipcart) {
      window.Snipcart.api.theme.cart.open();
    }
  };
  const isCartEmpty = (): boolean => {
    return count.value>0
  }
  useEffect(() => {
    document.addEventListener("snipcart.ready", () => {
      Snipcart.store.subscribe(() => {
        // count.value = Snipcart.store.getState().cart.items.count;
        setCount({
          value: Snipcart.store.getState().cart.items.count,
        })
        shoppingState.value = Snipcart.store.getState();
      });
    });
    btn.current.setAttribute(`${option}`, `${value}`);
  }, []);

  return (
    <>
      {/* </><transition name="fade"> */}
          <button
          aria-label="label"
          class={`${!isCartEmpty()?``:`disabled`} cart-btn grid h-full place-items-center`}
          onClick={openCart}
          ref={btn}
          data-count={count.value}
        >
          <slot />
          CartButton
        </button>
        
      {///* </transition> */
      }

      <div class="hidden">
        { `${JSON.stringify(shoppingState, null, 4)}` }
      </div>
    </>
  )
}
