/*
  Ce composant est le menu de navigation
  pour les mobiles, il fournit la modal avec les liens
  après click sur le hamburger-icon
*/

import { useState } from 'preact/compat'
import style from './NavMobile.module.css'

export function NavMobile(props: any) {
  const [show, setShow] = useState<boolean>(false)
  
  const toggleMenu = () => {
    console.log(show)
    setShow(!show);
  };

  return (
    <>
      <button
        aria-label={show ? props.translations.close : props.translations.menu}
        onMouseDown={toggleMenu}
        class={` ${style.navMobileBtn} relative  ml-auto flex  text-primary-700 md:hidden ${
          show ? 'bg-transparent ' : 'bg-blue'
        }`}
      >
        { show && 
          props.close
          ||
          props.menu
        }        
      </button>
      
      <div name="nested">
        { show &&
          <div
            class={`surface-menu ${style.navMobile} fixed inset-0 grid h-full auto-rows-min place-items-center gap-4 px-4 pt-4`}
          >
          <div class="mx-auto max-w-[12rem] pt-10">
            { props.logo }
          </div>
          { props.links }
          { props.social }
        </div>
        }
      </div>
    </>
  )
}

{/*
<style lang="postcss">
.nav-mobile {
  @apply overflow-x-hidden overflow-y-scroll;
  z-index: 999998;
  scrollbar-width: none;
  padding-bottom: calc(2em + env(safe-area-inset-bottom));
  &-btn {
    z-index: 999999;
  }
}

.nested-enter-active,
.nested-leave-active {
  transition: all 0.7s ease-in-out;
}

.nested-leave-active {
  transition-delay: 0.25s;
}
.inner {
  transition-delay: 0.25s;
}

.nested-enter-from,
.nested-leave-to {
  transform: translateX(100%);
  transform-origin: right center;
  opacity: 1;
}

.nested-enter-active .inner,
.nested-leave-active .inner {
  transition: all 0.3s ease-in-out;
}

.nested-enter-active .inner {
  transition-delay: var(--animation-delay, 0.25s);
}

.nested-enter-from .inner,
.nested-leave-to .inner {
  transform: translateX(200px);
  opacity: 0.001;
}
</style>
*/}