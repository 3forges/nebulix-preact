import React, { useEffect, useRef, useState } from "preact/compat"
import style from './CartButton.module.css'
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
  children: any;
}


export function CartButton({ children, label = `default label of card button`, option = `pesto`, value = `pesto`}: CartButtonProps) {
 
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
        console.log(" - Snipcart.store.subscribe - count: ", count)
        setShoppingState(Snipcart.store.getState());
      });
    });
    btn.current.setAttribute(`${option}`, `${value}`); 
  }, []);

  const afterCartCounterTw = `` // `absolute -right-2 top-0 grid h-4 w-4 place-items-center rounded-full border-2 border-current bg-opacity-70 font-bold md:top-1` 
  return (
    <>
      {/* <transition name="fade"> */}
          <button
          aria-label="label"
          class={`${!isCartEmpty()?``:`disabled`} ${afterCartCounterTw} ${style.cartBtn} grid h-full place-items-center`}
          onClick={openCart}
          ref={btn}
          data-count={count.value}
        >
          {React.Children.map(children, child => {
            return <>{child}</>
          })}

        </button>
        
      {/* </transition> */}

      <div class="hidden">
        { `${JSON.stringify(shoppingState, null, 4)}` }
      </div>
    </>
  )
}
