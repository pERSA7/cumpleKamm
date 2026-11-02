import { motion, useReducedMotion } from "motion/react"
import { Sparkles } from "lucide-react"

// La foto especial del cierre. Cambiá este archivo cuando quieras
// y mantené el nombre si no querés tocar el componente.
const FOTO_CIERRE = "/images/memories/foto-10.jpg"

/**
 * SECCIÓN 5 — El cierre.
 * Una foto especial y la felicitación de cumpleaños.
 */
export default function BirthdayEnding({ site }) {
  const reduce = useReducedMotion()

  return (
    <section id="cierre" className="papel-oscuro relative overflow-hidden pb-24 pt-20 text-center sm:mt-0 sm:pb-32 sm:pt-28">
      {/* pequeñas estrellas y confeti de papel */}
      <svg aria-hidden="true" className="pointer-events-none absolute inset-0 h-full w-full text-cafe/20">
        {[
          [10, 12],
          [88, 8],
          [6, 58],
          [92, 46],
          [16, 86],
          [84, 80],
          [50, 10],
        ].map(([x, y], i) => (
          <motion.path
            key={i}
            transform={`translate(${x * 10 - 10}, ${y * 7 - 20}) scale(1.1)`}
            d="M0 -4 L1.1 -1.1 L4 0 L1.1 1.1 L0 4 L-1.1 1.1 L-4 0 L-1.1 -1.1 Z"
            fill="currentColor"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0.2, 0.5, 0.2] }}
            transition={{ repeat: Infinity, duration: 3.2 + i * 0.4, delay: i * 0.25 }}
          />
        ))}
      </svg>

      <div className="relative px-4 sm:px-8">
        {/* foto especial con marco un poco distinto + flores */}
        <motion.div
          className="relative mx-auto w-fit"
          initial={reduce ? false : { opacity: 0, y: 30, rotate: 3 }}
          whileInView={{ opacity: 1, y: 0, rotate: -1.8 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="polaroid rotate-1 px-3 pb-4 pt-3 sm:px-3.5">
            <img
              src={FOTO_CIERRE}
              alt="Un recuerdo especial"
              className="borde-foto max-h-[380px] w-auto max-w-[76vw] object-cover sm:max-h-[420px]"
            />
          </div>
          <span aria-hidden="true" className="cinta cinta-rosa -top-3 left-1/2 h-[22px] w-[80px] -translate-x-1/2 -rotate-3" />
          <svg
            aria-hidden="true"
            className="absolute -right-10 top-1/2 hidden h-24 w-24 text-oliva/50 sm:block"
            viewBox="0 0 100 100"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.4"
          >
            <path d="M6 96 V64" strokeLinecap="round" />
            <path d="M6 64 C-2 54, -4 46, 0 36 C10 42, 12 54, 6 64 Z" fill="currentColor" opacity=".3" />
            <path d="M6 70 C12 62, 20 60, 28 62 C22 70, 12 72, 6 70 Z" fill="currentColor" opacity=".22" />
          </svg>
          <svg
            aria-hidden="true"
            className="absolute -left-12 bottom-4 hidden h-20 w-20 text-rosa/45 sm:block"
            viewBox="0 0 100 100"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.4"
          >
            <path d="M94 94 V66" strokeLinecap="round" />
            <path d="M94 66 C88 58, 86 50, 90 42 C98 48, 100 58, 94 66 Z" fill="currentColor" opacity=".26" />
          </svg>
        </motion.div>

        {/* felicitación */}
        <motion.h2
          className="font-serif mx-auto mt-14 text-[clamp(2.4rem,8vw,4rem)] font-semibold leading-[1.05] text-cafe"
          initial={reduce ? false : { opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.8 }}
        >
          {site.tituloCierre}
        </motion.h2>
        <motion.span
          className="font-hand mx-auto mt-1 block text-2xl text-rosa sm:text-3xl"
          initial={reduce ? false : { opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.25 }}
        >
          {site.nombre}
        </motion.span>

        {/* frase de cierre */}
        <motion.blockquote
          className="mx-auto mt-8 max-w-[38ch] font-body text-[16px] leading-[1.85] text-tinta/90 sm:max-w-[46ch] sm:text-lg"
          initial={reduce ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.15 }}
        >
          «{site.fraseCierre}»
        </motion.blockquote>

        {/* firma */}
        <div className="mt-10">
          <motion.div
            initial={reduce ? false : { opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.35, duration: 0.7 }}
          >
            <Sparkles size={16} className="mx-auto mb-2 text-cafe/60" aria-hidden="true" />
            <span className="font-hand block text-2xl text-cafe sm:text-[1.7rem]">            {site.firma}</span>
          </motion.div>
        </div>

      </div>
    </section>
  )
}
