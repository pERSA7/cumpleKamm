import { useState } from "react"
import { AnimatePresence, motion, useReducedMotion } from "motion/react"
import { Sparkles, X } from "lucide-react"

/**
 * El pequeño sobre final: un clic y aparece el mensaje secreto.
 */
export default function SecretLetter({ title = "Un último secreto", lines = [] }) {
  const reduce = useReducedMotion()
  const [open, setOpen] = useState(false)

  return (
    <div className="mx-auto w-fit">
      <AnimatePresence mode="wait">
        {!open ? (
          <motion.button
            key="sobre"
            onClick={() => setOpen(true)}
            className="group relative block w-[min(74vw,300px)] cursor-pointer"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            exit={{ opacity: 0, y: -12, scale: 0.96 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            whileHover={reduce ? undefined : { scale: 1.04, y: -4 }}
            whileTap={{ scale: 0.97 }}
            aria-label="Abrir el mensaje secreto"
          >
            <div
              className="relative aspect-[7/5] w-full pila-papel"
              style={{
                borderRadius: "3px",
                background: "linear-gradient(180deg, #E8D9BC 0%, #d9c5a5 75%, #d0ba92 100%)",
              }}
            >
              <div
                className="absolute inset-0"
                style={{
                  clipPath: "polygon(0 100%, 100% 100%, 50% 32%)",
                  background: "linear-gradient(to top, #d8c49e 55%, #dccbA7)",
                  boxShadow: "0 -2px 5px rgba(74,53,39,0.15)",
                }}
              />
              <div
                className="absolute inset-x-0 top-0 h-[58%]"
                style={{
                  clipPath: "polygon(0 0, 100% 0, 50% 100%)",
                  background: "linear-gradient(to bottom, #dbc9a4 0%, #ccb184 100%)",
                  boxShadow: "0 2px 6px rgba(74,53,39,0.18)",
                }}
              />
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2">
                <span className="font-hand text-2xl text-cafe/85">{title}</span>
              </div>
            </div>
            <div className="sello absolute left-1/2 top-[46%] h-14 w-14 -translate-x-1/2 -translate-y-1/2 transition-transform group-hover:scale-105">
              <span className="font-serif text-2xl font-bold">✦</span>
            </div>
          </motion.button>
        ) : (
          <motion.div
            key="mensaje"
            className="papel-carta relative w-[min(88vw,420px)] p-6 pila-papel sm:p-8"
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 30, rotate: 1.5, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, rotate: -0.6, scale: 1 }}
            transition={{ type: "spring", stiffness: 160, damping: 20 }}
          >
            <span className="cinta cinta-rosa -top-3 left-1/2 h-[20px] w-[76px] -translate-x-1/2 rotate-2" />
            <button
              onClick={() => setOpen(false)}
              className="absolute right-3 top-3 text-cafe/40 transition hover:text-cafe"
              aria-label="Guardar el mensaje"
            >
              <X size={18} />
            </button>
            <div className="text-center">
              <Sparkles size={18} className="mx-auto text-rosa" aria-hidden="true" />
            </div>
            {lines.map((line, i) => (
              <motion.p
                key={i}
                className="mt-3 text-center font-hand text-[1.22rem] leading-snug text-cafe sm:text-2xl"
                initial={reduce ? false : { opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + i * 0.55, duration: 0.6 }}
              >
                {line}
              </motion.p>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
