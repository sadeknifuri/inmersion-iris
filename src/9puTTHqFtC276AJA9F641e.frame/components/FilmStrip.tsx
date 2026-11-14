import React from 'react'
import { motion, MotionValue, useMotionTemplate, useTransform } from 'framer-motion'

type Props = {
  images: string[]
  progress: MotionValue<number>
  start: number
  shift: number
  dir: number
  tilt: number
  delay: number
  marked?: number
  reduce: boolean
}

/** One 35mm strip on the light table: negatives that develop into prints as `progress` runs. */
export function FilmStrip({ images, progress, start, shift, dir, tilt, delay, marked, reduce }: Props) {
  const x = useTransform(progress, [0, 1], [dir < 0 ? 0 : -260, reduce ? (dir < 0 ? 0 : -260) : dir < 0 ? -260 : 0])
  const d = useTransform(progress, [0.1 + delay, 0.45 + delay], [reduce ? 1 : 0, 1], { clamp: true })
  const inv = useTransform(d, (v) => 1 - v)
  const grey = useTransform(d, (v) => 1 - v * 0.85)
  const filter = useMotionTemplate`invert(${inv}) grayscale(${grey}) contrast(1.1)`
  const draw = useTransform(progress, [0.55, 0.75], [reduce ? 1 : 0, 1], { clamp: true })

  const frames = Array.from({ length: 8 }, (_, i) => images[(i + shift) % images.length])

  return (
    <motion.div style={{ x, rotate: tilt }} className="relative -ml-16 w-max shrink-0 bg-[#1b1714] px-3">
      <Sprockets />
      <div className="flex gap-2">
        {frames.map((src, i) => (
          <div key={i} className="relative">
            <motion.img
              src={src}
              alt=""
              style={{ filter }}
              className="aspect-[3/2] w-[160px] object-cover sm:w-[210px]"
            />
            <p className="mt-1 font-plex text-[9px] tracking-[0.2em] text-[#e0a24a]">
              {start + i} <span className="ml-2">{start + i}A</span>
              {i % 3 === 0 && <span className="ml-3">CONTATTO 400</span>}
            </p>
            {marked === i && (
              <svg viewBox="0 0 260 170" className="pointer-events-none absolute -inset-x-6 -inset-y-5 h-[calc(100%+40px)] w-[calc(100%+48px)] overflow-visible">
                <motion.path
                  d="M30 70 C 28 18, 210 4, 238 60 C 262 112, 150 160, 60 146 C 8 136, 6 92, 52 46"
                  fill="none"
                  stroke="#ff3b2f"
                  strokeWidth={5}
                  strokeLinecap="round"
                  style={{ pathLength: draw }}
                />
              </svg>
            )}
          </div>
        ))}
      </div>
      <Sprockets />
    </motion.div>
  )
}

function Sprockets() {
  return (
    <div className="flex gap-[10px] py-1.5">
      {Array.from({ length: 64 }, (_, i) => (
        <span key={i} className="h-2 w-3 shrink-0 rounded-[2px] bg-[#0d0b0a]" />
      ))}
    </div>
  )
}
