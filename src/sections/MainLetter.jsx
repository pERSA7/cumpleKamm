import { motion, useReducedMotion } from "motion/react"
import { Flower2 } from "lucide-react"

import { letter } from "../data/letter.js"
import SectionHeading from "../components/SectionHeading.jsx"

/**
 * SECCIÓN 4 — Una carta para vos.
 * Hoja antigua, lectura cómoda, casi sin animación: que se sienta una carta.
 */
export default function MainLetter({ site }) {
  const reduce = useReducedMotion()

  return (
    <section id="carta" className="papel relative py-20 sm:py-28 lg:py-32">
      <div className="px-4 sm:px-8">
        <SectionHeading
          kicker="sección iv"
          titulo={site.tituloCarta}
          subtitulo="Para leer con tiempo, en cualquier lugar tranquilo."
        />

        {/* la hoja de la carta */}
        <motion.div
          className="papel-carta relative mx-auto mt-14 max-w-[620px] pila-papel"
          initial={reduce ? false : { opacity: 0, y: 34, rotate: 1.4 }}
          whileInView={{ opacity: 1, y: 0, rotate: -0.35 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* hoja apilada debajo, para que se lea “álmulo de papeles” */}
          <div
            aria-hidden="true"
            className="absolute inset-0 -z-10 -rotate-2 bg-[#E7D9BC]/80"
            style={{ borderRadius: 2 }}
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 -z-20 rotate-1.5 bg-[#DECBA5]/70"
            style={{ borderRadius: 2 }}
          />

          <div className="px-6 pb-14 pt-10 sm:px-14 sm:pb-16 sm:pt-12">
            {/* membrete */}
            <div className="flex items-center justify-center gap-2 text-rosa/80">
              <span className="cuerda w-10" />
              <Flower2 size={16} strokeWidth={1.4} aria-hidden="true" />
              <span className="cuerda w-10" />
            </div>

            <h3 className="font-hand mt-5 text-center text-3xl text-cafe sm:text-4xl">
              {letter.saludo}
            </h3>

            <div className="mx-auto mt-9 max-w-[54ch] space-y-6 font-body text-[15.5px] leading-[1.85] text-tinta sm:text-[17px]">
              {letter.parrafos.map((p, i) => (
                <motion.p
                  key={i}
                  initial={reduce ? false : { opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
                  className={i === 0 ? "indent-6" : "indent-6"}
                >
                  {p}
                </motion.p>
              ))}

              {/* cierre y firma */}
              <motion.div
                initial={reduce ? false : { opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                {letter.firma && (
                  <p className="pt-2 text-right font-hand text-2xl text-cafe">{letter.firma}</p>
                )}
                <p className="font-hand mt-1 text-right text-[1.5rem] leading-none text-rosa">
                  {letter.nombreFirma}
                </p>
                <div className="mt-6 flex items-center justify-center gap-2 text-cafe/40">
                  <span className="cuerda w-12" />
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M12 2l2.4 6.9H22l-5.8 4.4 2.2 7-6.4-4.6-6.4 4.6 2.2-7L4 8.9h7.6z" opacity=".5" />
                  </svg>
                  <span className="cuerda w-12" />
                </div>
              </motion.div>
            </div>
          </div>

          {/* cinta de esquina */}
          <span
            aria-hidden="true"
            className="cinta cinta-oliva absolute -left-5 top-8 h-[20px] w-[64px]"
            style={{ transform: "rotate(-9deg)" }}
          />
          <span
            aria-hidden="true"
            className="cinta cinta-rosa absolute -right-4 bottom-10 h-[20px] w-[58px]"
            style={{ transform: "rotate(8deg)" }}
          />
        </motion.div>
      </div>
    </section>
  )
}
