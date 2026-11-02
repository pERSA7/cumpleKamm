import { useEffect, useState } from "react"
import { motion } from "motion/react"

/**
 * Navegación discreta: puntitos laterales con progreso.
 * En pantalla chica se anclan abajo a la derecha, en escritorio
 * flotan como fichas de un margen de página.
 */
export default function NavDots({ secciones, navegarA }) {
  const [activa, setActiva] = useState(secciones[0]?.id)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entradas) => {
        entradas.forEach((e) => {
          if (e.isIntersecting) setActiva(e.target.id)
        })
      },
      { rootMargin: "-45% 0px -45% 0px" },
    )
    secciones.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [secciones])

  return (
    <nav
      aria-label="Secciones del regalo"
      className="fixed right-2.5 top-1/2 z-40 -translate-y-1/2 sm:right-5"
    >
      <ul className="flex flex-col items-center gap-1.5 rounded-full border border-cafe/15 bg-crema/70 py-2 pl-2.5 pr-2 shadow-[0_4px_18px_rgba(74,53,39,0.18)] backdrop-blur-[3px]">
        {secciones.map(({ id, etiqueta }) => {
          const activaSec = activa === id
          return (
            <li key={id} className="group relative">
              <button
                onClick={() => navegarA(id)}
                aria-label={etiqueta}
                aria-current={activaSec ? "true" : undefined}
                className="flex h-6 w-6 items-center justify-center"
              >
                <motion.span
                  className="block rounded-full"
                  animate={{
                    scale: activaSec ? 1 : 0.62,
                    backgroundColor: activaSec ? "#754E3B" : "#B99D7C",
                  }}
                  transition={{ type: "spring", stiffness: 380, damping: 22 }}
                  style={{ width: 8, height: 8 }}
                />
              </button>
              {/* etiqueta al pasar el mouse en escritorio */}
              <span className="pointer-events-none absolute right-8 top-1/2 hidden -translate-y-1/2 whitespace-nowrap rounded bg-cafe px-2 py-1 font-serif text-[12px] tracking-wide text-crema opacity-0 shadow transition group-hover:opacity-100 sm:block">
                {etiqueta}
              </span>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
