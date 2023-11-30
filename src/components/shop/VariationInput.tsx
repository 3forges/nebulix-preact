import { useEffect } from 'preact/compat'

function VariationInput(props: any) {
  
  let btn
  const message = { value: null }
  const setValue = () => {
    if (!btn.value) return
    btn.value.setAttribute(props.option, message.value)
  }
  useEffect( () => {
    btn.value = document.querySelector("#add-to-card");
  })
  
  return(
    <>
      Valid INPUT
      <input
        type="text"
        placeholder="..."
        class="p-2"
        v-model="message"
        //@input={setValue()}
      />
    </>
  )
}
