cd src && ls -R | grep .vue 
* src/components/common/ColorSwitch.vue
  * from src/layouts/Header.astro
  * ok

* src/components/common/ContactDialog.vue 
  * from src/layouts/BaseLayout.astro
  * ok

* src/components/common/Init.vue
  *  L. 71 timeline: new ViewTimeline({ subject: el }),
    *  => ViewTimeline = polyfill from /public/scroll-timeline.js
  *  L. 72 rangeStart: { rangeName: "exit", offset: CSS.percent(5) },
    *  => rangeStart ???
  * from src/layouts/BaseLayout.astro
  * 2 errors
  ok

* - src/components/common/Intersecting.vue
  * src/components/block/Features.astro
  * src/components/block/ImageGallery.astro
  * src/components/block/RecentItems.astro
  * src/components/block/RecentItems.astro
  * src/components/block/RichText.astro
  * src/components/block/ShopCategories.astro
  * src/components/block/ShopProducts.astro
  * src/components/block/TextImage.astro
  * src/components/mdx/MdxIframe.astro
  * src/components/mdx/MdxImg.astro
  * src/components/mdx/MdxWrapper.astro
  * src/components/menu/MenuList.astro
  * src/layouts/PageLayoutArchive.astro
  * => requiere an observer for preact

* src/components/common/Loading.vue
  * src/components/common/ContactDialog.vue
  * src/components/newsletter/Newsletter.vue
  * ok

+/- src/components/common/PageFind.vue
  src/components/common/PageFind.astro
  1 error

* src/components/media/PanZoom.vue
  src/pages/images/[slug].astro
  ok

src/components/media/Youtube.vue
* src/components/navigation/ImageNav.vue
  src/pages/images/[slug].astro
  ok

* src/components/navigation/NavMobile.vue
  src/components/Header.astro
  ok

* src/components/newsletter/Newsletter.vue
  src/components/Footer.astro
  ok

* src/components/shop/CartButton.vue
  src/components/Header.astro
  src/pages/images/[slug].astro
  6 'error/warn'
  ok

* src/components/shop/ProductPrice.vue
  src/components/shop/AddToCart.astro
  2 'error/warn'
  ok

* src/components/shop/ProductVariationImageWrap.vue
  src/layouts/ProductLayoutSplit.astro
  0 error
  L. 17: Watch something weird

* src/components/shop/SnipCartInit.vue
  src/layouts/BaseLayout.astro
  src/pages/images/[slug].astro
  1 'error/warn'
  ok

* src/components/shop/VariationButton.vue
  src/components/shop/ProductVariations.astro
  ok

* src/components/shop/VariationInput.vue
  src/components/shop/ProductVariations.astro 
  ok

## some lighthouse report 
* shop
  * muted text-xs text-danger line-throught
    * => Background and foreground colors do not have a sufficient contrast ratio.
* menu
  * button aria-label="Sulphur Dioxide"
    * => Background and foreground colors do not have a sufficient contrast ratio.

## menu bug

le menu ne reagit plus au scroll
le menu peut disparaitre (une fois la page scrollée)
scrolldown une page + F5
  => la barre apparait puis se retracte


## transition pour ContactDialog