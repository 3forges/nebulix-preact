export function ColorSwitch() {
   
const toggleDark = () => {
  const theme =
    localStorage.getItem("color-scheme") === "dark" ? "light" : "dark";

  localStorage.setItem("color-scheme", theme);
  const doc = document.querySelector("html")
  if (doc) doc.dataset.theme = theme;
};

return (
  <>
    <button 
      onClick={toggleDark}
      class="grid h-full place-items-center"
    >
      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" viewBox="0 0 24 24">
        <path
          fill="currentColor"
          d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2S2 6.477 2 12s4.477 10 10 10Zm0-1.5v-17a8.5 8.5 0 0 1 0 17Z"
        />
      </svg>
      <label sr-only>color switch</label>
    </button>
  </>
)
}
