import type { APIContext } from "astro"

export async function PageFindUI({}: APIContext) {
  return {
    body: 'export const search = () => {return {results: []}}'
  }
}