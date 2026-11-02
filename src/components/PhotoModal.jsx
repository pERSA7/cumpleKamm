import { useEffect } from "react"
import { AnimatePresence, motion, useReducedMotion } from "motion/react"
import { X } from "lucide-react"

/**
 * Modal lightbox para mostrar una foto (o video) ampliada,
 * con su caption y navegación entre recuerdos.
 */
export default function PhotoModal({ selected, onClose, onPrev, onNext }) {
  const reduce = useReducedMotion()

  useEffect(() => {
    if (!selected) return
    document.body.style.overflow = "hidden"
    const onKey = (e) => {
      if (e.key === "Escape") onClose()
      if (e.key === "ArrowLeft") onPrev?.()
      if (e.key === "ArrowRight") onNext?.()
    }
    window.addEventListener("keydown", onKey)
    return () => {
      document.body.style.overflow = ""
      window.removeEventListener("keydown", onKey)
    }
  }, [selected, onClose, onPrev, onNext])

  return (
    <AnimatePresence>
      {selected && (
        <motion.div
          className="fixed inset-0 z-50 grid place-items-center p-3 sm:p-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label={selected.caption}
        >
          <div className="absolute inset-0 bg-cafe-oscuro/80 backdrop-blur-[3px]" />

          <motion.div
            key={selected.src}
            className="relative z-10 flex max-h-[92dvh] w-fit max-w-[94vw] flex-col"
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 46, rotate: -2, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, rotate: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.96, transition: { duration: 0.22 } }}
            transition={{ type: "spring", stiffness: 210, damping: 24 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="polaroid p-3 pb-4 sm:p-4 sm:pb-5">
              <div className="max-h-[64dvh] relative overflow-hidden bg-black/20 sm:max-h-[70dvh]">
                {selected.type === "video" ? (
                  <video
                    src={selected.src}
                    controls
                    loop
                    autoPlay
                    playsInline
                    className="max-h-[64dvh] w-auto sm:max-h-[70dvh]"
                  />
                ) : (
                  <img
                    src={selected.src}
                    alt={selected.caption}
                    className="max-h-[64dvh] w-auto max-w-[86vw] object-contain sm:max-h-[70dvh]"
                  />
                )}
              </div>
              <div className="px-2 pt-3 text-center">
                <span className="font-hand text-xl text-cafe sm:text-2xl">{selected.caption}</span>
              </div>
            </div>

            {/* botones de navegación */}
            <div className="mt-4 flex items-center justify-center gap-6 text-crema/90">
              <button
                onClick={onPrev}
                className="font-serif text-lg tracking-wide opacity-80 transition hover:opacity-100"
                aria-label="Recuerdo anterior"
              >
                ← anterior
              </button>
              <button
                onClick={onClose}
                className="grid h-11 w-11 place-items-center rounded-full border border-crema/50 transition hover:bg-crema/10"
                aria-label="Cerrar"
              >
                <X size={20} />
              </button>
              <button
                onClick={onNext}
                className="font-serif text-lg tracking-wide opacity-80 transition hover:opacity-100"
                aria-label="Recuerdo siguiente"
              >
                siguiente →
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
