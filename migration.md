cd src && ls -R | grep .vue 
* ColorSwitch.vue
  src/layouts/Header.astro
- ContactDialog.vue 
  src/layouts/BaseLayout.astro
- Init.vue 
  src/layouts/BaseLayout.astro
- Intersecting.vue => 
  src/components/block/Features.astro
  src/components/block/ImageGallery.astro
  src/components/block/RecentItems.astro
  src/components/block/RecentItems.astro
  src/components/block/RichText.astro
  src/components/block/ShopCategories.astro
  src/components/block/ShopProducts.astro
  src/components/block/TextImage.astro
  src/components/mdx/MdxIframe.astro
  src/components/mdx/MdxImg.astro
  src/components/mdx/MdxWrapper.astro
  src/components/menu/MenuList.astro
  src/layouts/PageLayoutArchive.astro
* Loading.vue
  src/components/common/ContactDialog.vue
  src/components/newsletter/Newsletter.vue
- PageFind.vue
  src/components/common/PageFind.astro
PanZoom.vue
  src/pages/images/[slug].astro
Youtube.vue 
* ImageNav.vue
  src/pages/images/[slug].astro
* NavMobile.vue
  src/components/Header.astro
* Newsletter.vue
  src/components/Footer.astro
CartButton.vue
  src/components/Header.astro
  src/pages/images/[slug].astro
ProductPrice.vue
  src/components/shop/AddToCart.astro
ProductVariationImageWrap.vue
  src/layouts/ProductLayoutSplit.astro
SnipCartInit.vue
  src/layouts/BaseLayout.astro
  src/pages/images/[slug].astro
VariationButton.vue
  src/components/shop/ProductVariations.astro
VariationInput.vue
  src/components/shop/ProductVariations.astro 


## some lighthouse report 
* shop
  * muted text-xs text-danger line-throught
    * => Background and foreground colors do not have a sufficient contrast ratio.
* menu
  * button aria-label="Sulphur Dioxide"
    * => Background and foreground colors do not have a sufficient contrast ratio.