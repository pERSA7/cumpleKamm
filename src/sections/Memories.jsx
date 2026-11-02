import { useState } from "react"
import { motion, useReducedMotion } from "motion/react"

import { memories } from "../data/memories.js"
import SectionHeading from "../components/SectionHeading.jsx"
import MemoryCard from "../components/MemoryCard.jsx"
import PhotoModal from "../components/PhotoModal.jsx"

// recorridos orgánicos por polaroid (grados) — levemente distintas entre sí
const ROTACIONES = [-2.6, 1.8, -1.1, 2.6, -3.2, 1.4, -2.2, 2.0, -1.6, 3, -2.8, 1.2, -1.9, 2.8, -1.3, 2.2, -3, 1.6, -2.4, 1, -1.5]

// desvíos verticales sutiles para que la grilla no sea perfecta
const DESVIOS = [14, -10, 18, 0, 10, -14, 6, -4, 16, -8, 12, -16, 8, -6, 14, -12, 4, 10, -14, 0, 9]

// índices de las fotos horizontales (para mostrarlas en formato 4:3)
const HORIZONTALES = [1, 5, 10, 13, 16]

/**
 * SECCIÓN 2 — Nuestro pequeño universo.
 * Scrapbook: polaroids pegadas con cinta, anotaciones a mano, montaje irregular.
 */
export default function Memories({ site, navegarA }) {
  const reduce = useReducedMotion()
  const [indice, setIndice] = useState(null)

  const abrirRecuerdo = (i) => setIndice(i)
  const cerrar = () => setIndice(null)

  return (
    <section id="memorias" className="relative pb-16 pt-20 sm:pb-24 sm:pt-28 lg:pb-32">
      <div className="px-4 sm:px-8">
        <SectionHeading
          kicker="sección ii"
          titulo={site.tituloMemorias}
          subtitulo={site.subtituloMemorias}
        />

        {/* el mural de recuerdos */}
        <div className="mx-auto mt-12 flex w-fit max-w-full flex-wrap items-start justify-center gap-x-4 gap-y-7 sm:gap-x-7 sm:gap-y-10">
          {memories.map((m, i) => {
            const ancho = m.type === "video" || HORIZONTALES.includes(i)
              ? "w-[190px] sm:w-[240px]"
              : "w-[158px] sm:w-[196px]"
            return (
              <motion.div
                key={m.src + i}
                className={ancho}
                style={{
                  transform: `rotate(${ROTACIONES[i]}deg) translateY(${reduce ? 0 : DESVIOS[i]}px)`,
                }}
              >
                <MemoryCard
                  memory={m}
                  wide={HORIZONTALES.includes(i) && m.type !== "video"}
                  rotate={ROTACIONES[i]}
                  tapeSide={i % 2 ? "left" : "right"}
                  onOpen={() => abrirRecuerdo(i)}
                  priority={i < 3}
                />
              </motion.div>
            )
          })}
        </div>

        {/* nota al pie de la sección */}
        <motion.p
          className="font-hand mx-auto mt-14 max-w-[34ch] px-6 text-center text-lg text-cafe/70 sm:text-xl"
          initial={reduce ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          Tocá una foto y la miramos de cerca — hay más recuerdos de los que entran acá.
        </motion.p>
      </div>

      <PhotoModal
        selected={indice === null ? null : memories[indice]}
        onClose={cerrar}
        onPrev={() => setIndice((i) => (i - 1 + memories.length) % memories.length)}
        onNext={() => setIndice((i) => (i + 1) % memories.length)}
      />
    </section>
  )
}
