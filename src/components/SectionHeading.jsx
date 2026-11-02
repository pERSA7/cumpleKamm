import { motion, useReducedMotion } from "motion/react"

/**
 * Encabezado de sección: título serif con una cinta manuscrita
 * y flores de papel como ornamento lateral.
 */
export default function SectionHeading({ kicker, titulo, subtitulo }) {
  const reduce = useReducedMotion()

  return (
    <motion.div
      className="relative z-10 mx-auto max-w-2xl text-center"
      initial={reduce ? false : { opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.6 }}
      transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
    >
      {kicker && (
        <span className="font-serif text-[13px] uppercase tracking-[0.3em] text-rosa/90">
          {kicker}
        </span>
      )}
      <h2 className="mt-1 font-serif text-[clamp(2rem,6.5vw,3.2rem)] font-semibold leading-[1.08] text-cafe">
        {titulo}
      </h2>
      {subtitulo && (
        <p className="mx-auto mt-3 max-w-[36ch] font-hand text-lg leading-snug text-cafe/70 sm:text-xl">
          {subtitulo}
        </p>
      )}
      <div className="mt-4 flex items-center justify-center gap-3 text-cafe/45">
        <span className="cuerda w-14 sm:w-20" />
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M12 21s-7.5-4.8-9.7-9.6C1 8.7 2.7 5.5 6 5c2-.3 3.8.8 6 3 2.2-2.2 4-3.3 6-3 3.3.5 5 3.7 3.7 6.4C19.5 16.2 12 21 12 21z" opacity="0.4" />
        </svg>
        <span className="cuerda w-14 sm:w-20" />
      </div>
    </motion.div>
  )
}
