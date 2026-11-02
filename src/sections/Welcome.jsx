import { useEffect } from "react"
import { motion, useReducedMotion } from "motion/react"
import { Sparkles } from "lucide-react"

import Envelope from "../components/Envelope.jsx"

/**
 * SECCIÓN 1 — La invitación.
 * Pantalla completa: sobre, sellos, flores y botón de apertura.
 * Al abrirse, levanta `onOpened` para desbloquear el resto del regalo.
 */
export default function Welcome({ site, abriendo, onOpen, onOpened }) {
  const reduce = useReducedMotion()

  useEffect(() => {
    if (!abriendo) return
    const t = window.setTimeout(() => onOpened?.(), reduce ? 400 : 2700)
    return () => window.clearTimeout(t)
  }, [abriendo, onOpened, reduce])

  return (
    <motion.section
      id="invitacion"
      className="fixed inset-0 z-50 flex min-h-dvh flex-col items-center justify-center overflow-hidden papel"
      exit={{ opacity: 0, scale: 1.06, filter: "blur(6px)" }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
    >
      {/* bordes de página envejecida */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 46%, rgba(249,242,228,0.65) 0%, transparent 46%), linear-gradient(180deg, rgba(74,53,39,0.12), transparent 16%, transparent 84%, rgba(74,53,39,0.14))",
        }}
      />
      {/* sello postal pegoteado arriba a la derecha */}
      <motion.div
        aria-hidden="true"
        className="absolute right-6 top-6 hidden font-serif text-[11px] uppercase tracking-[0.28em] text-cafe/45 sm:block"
        initial={reduce ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 1 }}
      >
        con cariño
      </motion.div>

      {/* flores de papel en las esquinas */}
      <motion.div
        aria-hidden="true"
        className="absolute -left-7 top-[22%] -rotate-12 text-oliva/60"
        initial={reduce ? false : { opacity: 0, x: -22 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.4, duration: 1 }}
      >
        <svg width="110" height="110" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1.1">
          <path d="M50 98 V55" strokeLinecap="round" />
          <path d="M50 55 C36 48, 30 36, 34 22 C42 28, 48 40, 50 55 Z" fill="currentColor" opacity="0.28" />
          <path d="M50 58 C58 50, 68 46, 80 48 C72 58, 60 62, 50 58 Z" fill="currentColor" opacity="0.2" />
          <path d="M50 72 C40 68, 32 68, 24 74 C32 78, 42 78, 50 72 Z" fill="currentColor" opacity="0.18" />
        </svg>
      </motion.div>
      <motion.div
        aria-hidden="true"
        className="absolute -right-6 bottom-[18%] rotate-[24deg] text-rosa/55"
        initial={reduce ? false : { opacity: 0, x: 22 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.55, duration: 1 }}
      >
        <svg width="96" height="96" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1.1">
          <path d="M64 4 C58 22, 58 40, 70 60 C78 50, 80 30, 76 16 C74 8, 70 4, 64 4 Z" fill="currentColor" opacity="0.25" />
          <path d="M70 60 C62 66, 54 66, 46 62" strokeLinecap="round" />
        </svg>
      </motion.div>

      {/* estrellitas dispersas */}
      <svg aria-hidden="true" className="pointer-events-none absolute inset-0 h-full w-full text-cafe/25">
        {[
          [12, 16, 7],
          [85, 12, 9],
          [20, 78, 8],
          [90, 64, 6],
          [50, 90, 7],
          [74, 84, 6],
          [30, 9, 6],
          [8, 52, 5],
          [93, 40, 7],
        ].map(([x, y, s], i) => (
          <motion.path
            key={i}
            transform={`translate(${x * 10 - 5}, ${y * 10 - 5})`}
            d="M0 -4 L1.1 -1.1 L4 0 L1.1 1.1 L0 4 L-1.1 1.1 L-4 0 L-1.1 -1.1 Z"
            fill="currentColor"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0.25, 0.55, 0.25] }}
            transition={{ repeat: Infinity, duration: 3.4 + i * 0.35, delay: i * 0.3 }}
          />
        ))}
      </svg>

      <Envelope nombre={site.nombre} inicial={site.inicialSello} abriendo={abriendo} />

      {/* frase introductoria + botón */}
      <motion.p
        className="mt-10 max-w-[30ch] px-6 text-center font-hand text-[1.35rem] leading-snug text-cafe/85 sm:text-[1.6rem]"
        animate={abriendo ? { opacity: 0, y: -10 } : { opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {site.fraseIntro}
      </motion.p>

      <motion.button
        onClick={onOpen}
        className="group mt-5 rounded-[3px] border border-cafe/40 px-8 py-3 font-serif text-lg tracking-[0.14em] text-cafe transition disabled:cursor-wait"
        style={{ backgroundColor: "rgba(249,242,228,0.55)" }}
        animate={abriendo ? { opacity: 0, y: 14 } : { opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        disabled={abriendo}
        whileHover={reduce ? undefined : { scale: 1.04, borderColor: "rgba(117,78,59,0.7)" }}
        whileTap={{ scale: 0.97 }}
      >
        {site.textoBoton}
        <span className="mx-auto mt-1 block h-[2px] w-0 bg-cafe/50 transition-all duration-500 group-hover:w-full" />
      </motion.button>

      {/* pie discreto */}
      <motion.span
        className="absolute bottom-5 font-serif text-[11px] uppercase tracking-[0.3em] text-cafe/40"
        animate={abriendo ? { opacity: 0 } : { opacity: 1 }}
      >
        <Sparkles size={11} className="mr-1 inline align-[-2px]" aria-hidden="true" />
        abierto con calma, para vos
      </motion.span>
    </motion.section>
  )
}
