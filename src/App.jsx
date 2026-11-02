import { useState, useEffect, useCallback } from "react"
import { AnimatePresence } from "motion/react"

import { site, secciones } from "./data/site.js"
import Welcome from "./sections/Welcome.jsx"
import Memories from "./sections/Memories.jsx"
import Appreciation from "./sections/Appreciation.jsx"
import MainLetter from "./sections/MainLetter.jsx"
import BirthdayEnding from "./sections/BirthdayEnding.jsx"
import MusicPlayer from "./components/MusicPlayer.jsx"
import NavDots from "./components/NavDots.jsx"

export default function App() {
  const [abriendo, setAbriendo] = useState(false) // animación del sobre en curso
  const [abierto, setAbierto] = useState(
    () => new URLSearchParams(window.location.search).has("abrir"), // atajo de prueba: /?abrir
  )

  useEffect(() => {
    document.body.style.overflow = abierto ? "" : "hidden"
    return () => {
      document.body.style.overflow = ""
    }
  }, [abierto])

  const navegarA = useCallback((id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" })
  }, [])

  const handleAbrir = useCallback(() => {
    setAbriendo(true)
  }, [])

  const handleSobreAbierto = useCallback(() => {
    setAbierto(true)
    window.setTimeout(() => {
      navegarA("memorias")
    }, 1100)
  }, [navegarA])

  return (
    <div className="papel vineta min-h-screen">
      <AnimatePresence>
        {!abierto && (
          <Welcome
            key="welcome"
            site={site}
            abriendo={abriendo}
            onOpen={handleAbrir}
            onOpened={handleSobreAbierto}
          />
        )}
      </AnimatePresence>

      {abierto && (
        <>
          <main className="relative">
            <Memories site={site} navegarA={navegarA} />
            <Appreciation site={site} />
            <MainLetter site={site} />
            <BirthdayEnding site={site} />
          </main>

          <NavDots secciones={secciones.slice(1)} navegarA={navegarA} />
          <MusicPlayer />
        </>
      )}
    </div>
  )
}
