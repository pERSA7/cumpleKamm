import { useEffect, useRef, useState } from "react"
import { motion, AnimatePresence } from "motion/react"
import { Music, VolumeX } from "lucide-react"

/**
 * Boton fijo para reproducir/pausar la música de fondo.
 * Nunca arranca sola: únicamente con un clic del usuario.
 * Colocá tu canción en public/music/cancion.mp3
 */
export default function MusicPlayer() {
  const audioRef = useRef(null)
  const [playing, setPlaying] = useState(false)
  const [noDisponible, setNoDisponible] = useState(true)

  useEffect(() => {
    audioRef.current = new Audio("/music/cancion.mp3")
    audioRef.current.loop = true
    audioRef.current.volume = 0.55

    const a = audioRef.current
    const puede = () => setNoDisponible(false)
    // el archivo aun no existe: lo informamos amablemente
    a.addEventListener("canplay", puede)
    a.addEventListener("error", () => setNoDisponible(true))
    a.load()
    a.preload = "auto"

    return () => {
      a.pause()
      a.removeEventListener("canplay", puede)
      a.src = ""
    }
  }, [])

  const toggle = async () => {
    const a = audioRef.current
    if (!a || noDisponible) return
    if (playing) {
      a.pause()
      setPlaying(false)
    } else {
      try {
        await a.play()
        setPlaying(true)
      } catch {
        setPlaying(false)
      }
    }
  }

  return (
    <AnimatePresence>
      <motion.button
        onClick={toggle}
        className="fixed bottom-4 left-4 z-40 grid h-11 w-11 items-center justify-center rounded-full text-cafe"
        style={{
          backgroundColor: "rgba(243,233,216,0.92)",
          boxShadow: "0 2px 10px rgba(74,53,39,0.35)",
          backdropFilter: "blur(4px)",
        }}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: noDisponible ? 0.45 : 1, y: 0 }}
        whileTap={noDisponible ? undefined : { scale: 0.94 }}
        aria-label={noDisponible ? "No hay música" : playing ? "Pausar música" : "Reproducir música"}
        title={
          noDisponible
            ? "Agregá audio en public/music/cancion.mp3"
            : playing
              ? "Pausar la música"
              : "Poner la música"
        }
      >
        {playing ? (
          <>
            <Music size={18} />
            {/* barras llegando, sutiles y tranquilas */}
            <motion.span
              className="sr-only"
              animate={{ opacity: [0.8, 0.4, 0.8] }}
              transition={{ repeat: Infinity, duration: 2 }}
            />
          </>
        ) : (
          <VolumeX size={18} />
        )}
        {/* tres barritas manuscritas como indicador sutil */}
        <span
          className="pointer-events-none absolute -bottom-1 left-1/2 flex -translate-x-1/2 gap-[3px]"
          aria-hidden="true"
        >
          {[0, 1, 2].map((i) => (
            <motion.span
              key={i}
              className="w-[2px] rounded bg-cafe/70"
              animate={playing ? { height: [4, 8, 4] } : { height: 3 }}
              transition={{ repeat: Infinity, duration: 0.9 + 0.15 * i, ease: "easeInOut" }}
            />
          ))}
        </span>
      </motion.button>
    </AnimatePresence>
  )
}
