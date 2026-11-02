import { useState } from "react"
import { motion, AnimatePresence, useReducedMotion } from "motion/react"
import { Star, Flower2, Sparkles, Heart, Feather, ChevronDown } from "lucide-react"

import { notes } from "../data/appreciation.js"
import SectionHeading from "../components/SectionHeading.jsx"

const ORNAMENTOS = {
  star: Star,
  flower: Flower2,
  sparkles: Sparkles,
  ribbon: Feather,
  heart: Heart,
}

/**
 * SECCIÓN 3 — Cosas que quizás no te digo.
 * Notas de papel sobre un escritorio; cada una se despliega sola.
 */
export default function Appreciation({ site }) {
  const reduce = useReducedMotion()
  const [abierta, setAbierta] = useState(null)

  const ROTACIONES = [-1.8, 1.4, -1.2, 2, -1.5]

  return (
    <section id="agradecimiento" className="papel-oscuro relative py-20 sm:py-28 lg:py-32">
      <div className="px-4 sm:px-8">
        <SectionHeading
          kicker="sección iii"
          titulo={site.tituloAgradecimiento}
          subtitulo={site.subtituloAgradecimiento}
        />

        {/* escritorio de notas: grillas pequeñas y desalineadas a propósito */}
        <div className="mx-auto mt-12 grid max-w-3xl grid-cols-1 gap-7 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-9 lg:grid-cols-3">
          {notes.map((nota, i) => {
            const Ornamento = ORNAMENTOS[nota.ornamento] ?? Star
            const abiertaId = abierta === nota.id
            return (
              <motion.article
                key={nota.id}
                className={`papel-carta pila-papel relative min-w-0 rounded-[3px] ${
                  i === 0 ? "sm:col-span-2 lg:col-span-1 lg:mt-6" : ""
                }`}
                style={{ transform: `rotate(${ROTACIONES[i]}deg)` }}
                initial={reduce ? false : { opacity: 0, y: 28, rotate: ROTACIONES[i] * 2 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-30px", amount: 0.3 }}
                transition={{ duration: 0.7, delay: (i % 3) * 0.12, ease: [0.22, 1, 0.36, 1] }}
                whileHover={reduce ? undefined : { rotate: 0, y: -5 }}
              >
                <span
                  className={`cinta -top-2.5 h-[20px] w-[70px] ${i % 2 ? "cinta-oliva" : "cinta-rosa"}`}
                  style={{
                    left: i % 2 ? "-18px" : "50%",
                    right: i % 2 ? "auto" : "auto",
                    transform: `translateX(${i % 2 ? "0" : "-50%"}) rotate(${i % 2 ? -12 : 3}deg)`,
                  }}
                />

                <button
                  onClick={() => setAbierta(abierta ? null : nota.id)}
                  className="block w-full cursor-pointer px-5 pb-5 pt-6 text-left"
                  aria-expanded={abiertaId}
                  aria-controls={`nota-${nota.id}`}
                >
                  <Ornamento size={17} className="text-rosa" strokeWidth={1.6} aria-hidden="true" />
                  <h3 className="mt-2 font-serif text-2xl font-semibold leading-tight text-cafe">
                    {nota.titulo}
                  </h3>
                  {abiertaId && nota.hint && (
                    <span className="mt-1 block font-serif text-sm italic text-cafe/50">
                      {nota.hint}
                    </span>
                  )}
                  <span className="font-hand mt-2 block text-[15px] text-cafe/55">
                    {abiertaId ? "tocar para guardar" : "tocar para abrir"}
                    <ChevronDown
                      size={14}
                      className="ml-1 inline align-[-2px]"
                      style={{
                        transform: abiertaId ? "rotate(180deg)" : "none",
                        transition: "transform .3s",
                      }}
                      aria-hidden="true"
                    />
                  </span>
                </button>

                <AnimatePresence initial={false}>
                  {abiertaId && (
                    <motion.div
                      id={`nota-${nota.id}`}
                      key="msg"
                      initial={reduce ? { height: 0 } : { height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0, transition: { duration: 0.25 } }}
                      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 pb-6">
                        <span className="cuerda mb-4 block w-full opacity-60" />
                        <p className="font-body text-[15px] leading-[1.75] text-tinta/90">
                          {nota.mensaje}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
