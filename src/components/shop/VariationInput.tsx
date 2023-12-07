import { useEffect } from 'preact/compat'

export function VariationInput(props: any) {
  
  let btn
  const message = { value: null }
  const setValue = (message) => {
    if (!btn) return
    console.log(props.option, message)
    btn.setAttribute(props.option, message)
  }
  useEffect( () => {
    btn= document.querySelector("#add-to-card");
  })
  
  return(
    <>
      <input
        type="text"
        placeholder="..."
        class="p-2"
        v-model="message"
        //@input={setValue()}
        onKeyDown={(e) => {
          //console.log(e.key)
          if (e.key === "Enter") setValue(e.target?.value)
        }}
        onBlur={(e) => {setValue(e.target?.value)}}
      />
    </>
  )
}
