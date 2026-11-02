import { motion, useReducedMotion } from "motion/react"

/**
 * Sobre de papel con solapa, sello de cera y una carta adentro.
 * `abriendo`: dispara la animación de apertura.
 */
export default function Envelope({ nombre, inicial, abriendo }) {
  const reduce = useReducedMotion()

  return (
    <div className="sobre-escena relative mx-auto w-[min(86vw,390px)]">
      <motion.div
        className="sobre relative aspect-[10/7] w-full"
        animate={
          reduce
            ? {}
            : abriendo
              ? { rotate: [0, -1.5, 1, 0], scale: [1, 1.04, 1.1], y: [0, -6, -26] }
              : { rotate: -1.2 }
        }
        transition={{ duration: reduce ? 0.4 : 1.4, ease: "easeInOut" }}
      >
        {/* sombra del sobre */}
        <motion.div
          className="absolute inset-4 rounded-[6px] bg-cafe/10 blur-lg"
          animate={abriendo ? { opacity: 0.5, scale: 1.06 } : { opacity: 1 }}
          transition={{ duration: 1.2 }}
        />

        {/* cuerpo trasero del sobre */}
        <div className="absolute inset-0 rounded-[7px] bg-gradient-to-b from-arena to-[#cbb28f] shadow-inner" />

        {/* carta dentro del sobre */}
        <motion.div
          className="papel-carta absolute bottom-[8%] left-[7%] right-[7%] top-[10%] z-10 rounded-[3px] pila-papel"
          initial={false}
          animate={
            abriendo
              ? {
                  y: "-112%",
                  rotate: -3.5,
                  scale: 1.06,
                  transition: { delay: 0.55, duration: 1.1, ease: [0.22, 1, 0.36, 1] },
                }
              : { y: "6%" }
          }
        >
          <div className="flex h-full flex-col items-center justify-center px-4 text-center">
            <span className="font-hand text-lg text-cafe/60">Para</span>
            <span className="font-serif text-3xl font-semibold text-cafe sm:text-4xl">
              {nombre}
            </span>
            <span className="mx-auto mt-3 max-w-[20ch] font-hand text-[15px] leading-snug text-rosa sm:text-base">
              un pedacito de nuestra historia
            </span>
            <div className="mt-4 flex items-center gap-2 text-cafe/50">
              <span className="h-px w-8 bg-cafe/30" />
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M12 2l2.4 6.9H22l-5.8 4.4 2.2 7-6.4-4.6-6.4 4.6 2.2-7L4 8.9h7.6z" opacity="0.55" />
              </svg>
              <span className="h-px w-8 bg-cafe/30" />
            </div>
          </div>
        </motion.div>

        {/* bolsillo frontal del sobre */}
        <div className="absolute inset-0 z-20 overflow-hidden rounded-[7px]">
          <div className="absolute inset-0 bg-gradient-to-b from-[#e4d2b4] to-[#d0bb97]" />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to bottom right, transparent 49.6%, rgba(117,78,59,0.10) 50%, transparent 52%)",
            }}
          />
          <div
            className="absolute bottom-0 left-0 h-[64%] w-[70%]"
            style={{
              clipPath: "polygon(0 0, 100% 100%, 0 100%)",
              background: "linear-gradient(135deg, #dfcdaa 0%, #cdb48d 100%)",
              boxShadow: "-2px -2px 6px rgba(74,53,39,0.16)",
            }}
          />
          <div
            className="absolute bottom-0 right-0 h-[64%] w-[70%]"
            style={{
              clipPath: "polygon(100% 0, 0 100%, 100% 100%)",
              background: "linear-gradient(-135deg, #e2d1b0 0%, #d1b98f 100%)",
              boxShadow: "2px -2px 6px rgba(74,53,39,0.16)",
            }}
          />
          <div
            className="absolute bottom-0 left-0 h-[26%] w-full"
            style={{
              clipPath: "polygon(0 100%, 100% 100%, 50% 0)",
              background: "linear-gradient(to top, #d8c49e 60%, #dccbA7)",
              boxShadow: "0 -3px 7px rgba(74,53,39,0.18)",
            }}
          />
        </div>

        {/* solapa superior */}
        <motion.div
          className="solapa absolute inset-x-0 top-0 h-[56%]"
          style={{ zIndex: abriendo ? 0 : 30 }}
          initial={false}
          animate={abriendo ? { rotateX: -180 } : { rotateX: 0 }}
          transition={{ duration: reduce ? 0.35 : 0.95, ease: "easeInOut" }}
        >
          <div
            className="h-full w-full"
            style={{
              clipPath: "polygon(0 0, 100% 0, 50% 100%)",
              background: "linear-gradient(to bottom, #d3bd99 0%, #c7ad87 100%)",
              boxShadow: "0 3px 8px rgba(74,53,39,0.22)",
            }}
          />
        </motion.div>

        {/* sello de cera */}
        <motion.div
          className="sello absolute left-1/2 top-[41%] z-40 -translate-x-1/2 -translate-y-1/2"
          initial={false}
          animate={abriendo ? { scale: 0, rotate: 24, opacity: 0 } : { scale: 1, rotate: 0 }}
          transition={{ duration: 0.5, ease: "easeIn" }}
        >
          <span
            className="font-serif text-3xl font-bold"
            style={{ textShadow: "0 1px 2px rgba(46,22,14,0.6)" }}
          >
            {inicial}
          </span>
        </motion.div>
      </motion.div>
    </div>
  )
}
