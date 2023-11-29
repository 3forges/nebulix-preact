import { useEffect, useRef } from "preact/compat"
import "CarButton.module.css"
const props = defineProps({
  label: String,
});

export function CarButton(props) {
 
  const btn = useRef(null)
  const count = 0
  const shoppingState = null
  /*
  const setValue = () => {
    if (!btn) return;
    btn.setAttribute(props.option, message.value);
  };
  */
  
  const openCart = () => {
    if (window.Snipcart) {
      window.Snipcart.api.theme.cart.open();
    }
  };
  
  useEffect(() => {
    document.addEventListener("snipcart.ready", () => {
      Snipcart.store.subscribe(() => {
        count.value = Snipcart.store.getState().cart.items.count;
        shoppingState.value = Snipcart.store.getState();
      });
    });
    btn.current.optionsetAttribute(props.option, message.value);
  }, []);

  return (
    <>
      {/* </><transition name="fade"> */}
        <button
          aria-label="label"
          class="cart-btn grid h-full place-items-center"
          onClick={openCart}
          ref={btn}
          data-count={count}
          v-if={`${count} > 0`}
        >
          <slot />
        </button>
      {/* </transition> */}

      <div class="hidden">
        { shoppingState }
      </div>
    </>
  )
}
