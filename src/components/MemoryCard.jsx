import Polaroid from "./Polaroid.jsx"

/**
 * A Polaroid + caption + optional date, ready to place inside
 * the scrapbook collage.
 */
export default function MemoryCard({ memory, wide, rotate, tapeSide, onOpen, priority }) {
  return (
    <Polaroid
      src={memory.src}
      alt={memory.caption}
      wide={wide || memory.type === "video"}
      video={memory.type === "video"}
      tapeSide={tapeSide}
      onOpen={onOpen}
      priority={priority}
    >
      <figcaption className="px-1 pt-2 text-center">
        <span
          className="font-hand inline-block leading-tight text-cafe"
          style={{ transform: `rotate(${rotate * 0.18}deg)`, fontSize: "1.05rem" }}
        >
          {memory.caption}
        </span>
        {memory.fecha && (
          <span className="mt-0.5 block font-serif text-[11px] uppercase tracking-[0.18em] text-cafe/45">
            {memory.fecha}
          </span>
        )}
      </figcaption>
    </Polaroid>
  )
}
