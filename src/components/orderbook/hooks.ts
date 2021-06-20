import { useEffect, useState } from "react"

export const useMediaQuery = (query: string) => {
  const mediaMatch = window.matchMedia(query)
  const [matches, setMatches]: [boolean, any] = useState(mediaMatch.matches)

  useEffect(() => {
    const handler: any = (e: Element) => setMatches(e.matches)
    mediaMatch.addEventListener("change", handler)
    return () => mediaMatch.removeEventListener("change", handler)
  })

  return matches
}
