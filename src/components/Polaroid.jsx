import { motion, useReducedMotion } from "motion/react"

/**
 * Foto estilo Polaroid: marco crema, cinta decorativa opcional
 * y la imagen con aspecto fijo (4:5 vertical o 4:3 horizontal).
 */
export default function Polaroid({
  src,
  alt = "",
  wide = false,
  tape = true,
  tapeSide = "left",
  video = false,
  children,
  className = "",
  onOpen,
  priority = false,
}) {
  const reduce = useReducedMotion()

  return (
    <motion.figure
      className={`polaroid relative w-fit cursor-pointer p-2 pb-3 sm:p-2.5 sm:pb-3.5 ${className}`}
      initial={reduce ? false : { opacity: 0, y: 34, rotate: 0 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px", amount: 0.25 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      whileHover={
        reduce
          ? undefined
          : {
              rotate: 0,
              scale: 1.035,
              y: -6,
              zIndex: 10,
              transition: { duration: 0.35, ease: "easeOut" },
            }
      }
      whileTap={{ scale: 0.985 }}
      onClick={onOpen}
      role="button"
      tabIndex={0}
      aria-label={alt ? `Ampliar: ${alt}` : "Ampliar fotografía"}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault()
          onOpen?.()
        }
      }}
    >
      <div
        className={`borde-foto relative overflow-hidden bg-cafe/10 ${
          wide ? "aspect-[4/3]" : "aspect-[4/5]"
        }`}
      >
        {video ? (
          <video
            src={`${src}#t=0.1`}
            muted
            loop
            autoPlay
            playsInline
            preload="auto"
            className="h-full w-full object-cover"
            aria-hidden="true"
          />
        ) : (
          <motion.img
            src={src}
            alt={alt}
            loading={priority ? "eager" : "lazy"}
            className="h-full w-full object-cover"
            whileHover={reduce ? undefined : { scale: 1.05 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          />
        )}
      </div>

      {tape && (
        <span
          className={`cinta ${tapeSide === "left" ? "cinta-oliva" : ""} -top-2.5 h-[22px] w-[74px] sm:w-[88px]`}
          style={{
            left: tapeSide === "left" ? "-20px" : "auto",
            right: tapeSide === "left" ? "auto" : "-20px",
            transform: `rotate(${tapeSide === "left" ? -38 : 38}deg)`,
          }}
        />
      )}

      {children}
    </motion.figure>
  )
}
