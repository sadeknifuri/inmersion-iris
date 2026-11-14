import React, { useRef } from 'react'
import { motion, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'

export const args = {
  title: 'contatto',
  date: '3.7.14',
  venue: 'Studio Shodwe',
  credit: 'Fotografie: Olivia Wilson',
  verse: "Nell'attimo catturato, il contatto si fa eterno: uno sguardo profondo nelle pieghe dell'anima.",
  cta: 'Riserva il tuo posto',
}

export const argTypes = {
  title: { control: 'text' },
  date: { control: 'text' },
  venue: { control: 'text' },
  credit: { control: 'text' },
  verse: { control: 'text' },
  cta: { control: 'text' },
}

type Props = Partial<typeof args> & { onReserve?: () => void }

const GREY = 'https://cdn.magicpatterns.com/patterns/generated-images/ae30ea16-e11a-42f6-b20f-733fd0156dc4.jpg'
const LIGHT = 'https://cdn.magicpatterns.com/patterns/generated-images/e87858e2-f2ca-4a4b-ab7b-3dcc1ae1c32d.jpg'
const HAZEL = 'https://cdn.magicpatterns.com/patterns/generated-images/f076ea9f-e098-49e5-9c65-a46ad1473a13.jpg'
const VIOLET = 'https://cdn.magicpatterns.com/patterns/generated-images/3c8b64fd-3b39-4a25-8e8f-5b5425be08dd.jpg'

const EASE = 'cubic-bezier(0.23, 1, 0.32, 1)'
const BLADES = [0, 1, 2, 3, 4, 5, 6, 7]
const STOPS = ['f/22', 'f/16', 'f/11', 'f/8', 'f/5.6', 'f/4', 'f/2.8', 'f/2', 'f/1.4']

const WORKS = [
  { src: LIGHT, name: 'Nebbia', stop: 'f/2.8 · 1/250' },
  { src: HAZEL, name: 'Brace', stop: 'f/4 · 1/125' },
  { src: VIOLET, name: 'Notte', stop: 'f/1.4 · 1/60' },
]

export default function Diaframma(props: Props) {
  const { title, date, venue, credit, verse, cta, onReserve } = { ...args, ...props }
  const reduce = useReducedMotion()
  const track = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({ target: track, offset: ['start start', 'end end'] })
  const p = useSpring(scrollYProgress, { stiffness: 140, damping: 28, mass: 0.4 })

  // The aperture opens from a pinhole to wide open
  const radius = useTransform(p, [0, 0.75], [reduce ? 1100 : 70, 1100])
  const spin = useTransform(p, [0, 0.75], [0, reduce ? 0 : 38])
  const irisScale = useTransform(p, [0, 0.8], [reduce ? 1 : 1.35, 1])
  const stop = useTransform(p, (v) => STOPS[Math.min(STOPS.length - 1, Math.floor(Math.min(1, v / 0.75) * (STOPS.length - 1)))])
  const frameNo = useTransform(p, (v) => String(Math.round(v * 36)).padStart(2, '0'))
  const veil = useTransform(p, [0.7, 0.95], [0, 1])
  const hudOut = useTransform(p, [0.6, 0.8], [1, 0])

  // The lens drifts toward the pointer
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const sx = useSpring(mx, { stiffness: 80, damping: 18 })
  const sy = useSpring(my, { stiffness: 80, damping: 18 })
  const tx = useTransform(sx, (v) => v * 36)
  const ty = useTransform(sy, (v) => v * 36)

  return (
    <div
      className="w-full bg-[#0a0a0a] font-didact text-[#e6e4df]"
      onPointerMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect()
        mx.set((e.clientX - r.left) / r.width - 0.5)
        my.set(Math.min(1, Math.max(-1, (e.clientY - r.top) / 900 - 0.5)))
      }}
    >
      {/* HERO — the shutter */}
      <div ref={track} className="relative h-[2200px]">
        <section className="sticky top-0 h-[820px] overflow-hidden bg-black">
          {/* The photograph behind the blades */}
          <motion.div style={{ x: tx, y: ty }} className="absolute inset-0 flex items-center justify-center">
            <motion.img
              src={GREY}
              alt="Iride grigia in macro con il riflesso di una finestra"
              style={{ scale: irisScale }}
              className="h-[130%] max-w-none object-cover"
            />
          </motion.div>

          {/* Aperture blades */}
          <motion.div style={{ rotate: spin }} className="pointer-events-none absolute left-1/2 top-1/2 z-10 size-0">
            {BLADES.map((i) => (
              <div key={i} className="absolute left-0 top-0 size-0" style={{ transform: `rotate(${i * 45}deg)` }}>
                <motion.div
                  style={{ x: radius }}
                  className="absolute left-0 top-[-260px] h-[2600px] w-[2600px] border-l border-t border-[#3a3a38] bg-[#141413] shadow-[-18px_0_40px_rgba(0,0,0,0.65)]"
                />
              </div>
            ))}
          </motion.div>

          {/* Viewfinder HUD */}
          <motion.div style={{ opacity: hudOut }} className="pointer-events-none absolute inset-0 z-20">
            <div className="absolute left-6 top-6 size-10 border-l border-t border-[#e6e4df]/70 sm:left-10 sm:top-10" />
            <div className="absolute right-6 top-6 size-10 border-r border-t border-[#e6e4df]/70 sm:right-10 sm:top-10" />
            <div className="absolute bottom-6 left-6 size-10 border-b border-l border-[#e6e4df]/70 sm:bottom-10 sm:left-10" />
            <div className="absolute bottom-6 right-6 size-10 border-b border-r border-[#e6e4df]/70 sm:bottom-10 sm:right-10" />
            <div className="absolute left-1/2 top-1/2 h-6 w-px -translate-x-1/2 -translate-y-1/2 bg-[#e6e4df]/60" />
            <div className="absolute left-1/2 top-1/2 h-px w-6 -translate-x-1/2 -translate-y-1/2 bg-[#e6e4df]/60" />

            <div className="absolute inset-x-0 top-14 flex items-start justify-between px-12 font-plex text-[12px] uppercase tracking-[0.14em] sm:top-20 sm:px-20">
              <span>{venue}</span>
              <span className="tabular-nums">
                <motion.span>{stop}</motion.span> · 1/125 · ISO 400
              </span>
            </div>

            <div className="absolute inset-x-0 bottom-14 flex items-end justify-between gap-6 px-12 sm:bottom-20 sm:px-20">
              <h1 className="font-bodoni text-[clamp(72px,16vw,208px)] leading-[0.8] tracking-[-0.03em] text-white mix-blend-difference">
                {title}
              </h1>
              <div className="hidden shrink-0 text-right font-plex text-[12px] uppercase tracking-[0.14em] sm:block">
                <p className="tabular-nums">
                  Fotogramma <motion.span>{frameNo}</motion.span>/36
                </p>
                <p className="mt-2 font-bodoni text-[40px] normal-case leading-none tracking-[-0.02em]">{date}</p>
              </div>
            </div>
          </motion.div>

          {/* Fully exposed */}
          <motion.div
            style={{ opacity: veil }}
            className="absolute inset-0 z-30 flex flex-col items-center justify-center bg-black/55 px-6 text-center"
          >
            <p className="font-plex text-[12px] uppercase tracking-[0.2em] text-[#e6e4df]/70">Esposizione completa</p>
            <p className="mt-6 max-w-[900px] font-bodoni text-[clamp(36px,6.4vw,88px)] leading-[1.02] tracking-[-0.02em]">
              Un istante aperto,
              <br />
              <span className="italic">un volto per sempre.</span>
            </p>
          </motion.div>
        </section>
      </div>

      {/* EXHIBITION */}
      <section className="px-6 pb-28 pt-24 sm:px-12">
        <div className="mx-auto grid max-w-[1200px] gap-12 lg:grid-cols-[1.2fr_1fr] lg:gap-20">
          <h2 className="font-bodoni text-[clamp(44px,6.4vw,96px)] leading-[0.96] tracking-[-0.02em]">
            Trentadue scatti,
            <br />
            <span className="italic text-[#e6e4df]/55">un solo sguardo.</span>
          </h2>
          <div className="flex flex-col justify-end gap-10">
            <p className="max-w-[460px] text-[17px] leading-[1.7] text-[#e6e4df]/75">{verse}</p>
            <dl className="grid grid-cols-2 border-t border-[#e6e4df]/20 text-[15px]">
              {[
                ['Quando', date],
                ['Dove', venue],
                ['Fotografie', credit.replace('Fotografie: ', '')],
                ['Ingresso', 'Libero'],
              ].map(([k, v]) => (
                <div key={k} className="border-b border-[#e6e4df]/20 py-4 pr-4">
                  <dt className="font-plex text-[11px] uppercase tracking-[0.16em] text-[#e6e4df]/50">{k}</dt>
                  <dd className="mt-2 font-bodoni text-[26px] leading-tight">{v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* WORKS — each one opens as it enters */}
      <section className="px-6 pb-32 sm:px-12">
        <div className="mx-auto max-w-[1200px]">
          <div className="mb-14 flex items-end justify-between border-t border-[#e6e4df]/20 pt-6">
            <h3 className="font-bodoni text-[32px] tracking-[-0.01em] sm:text-[44px]">Opere scelte</h3>
            <p className="font-plex text-[12px] uppercase tracking-[0.16em] text-[#e6e4df]/50">3 di 32</p>
          </div>
          <div className="grid gap-14 md:grid-cols-3 md:gap-8">
            {WORKS.map((w, i) => (
              <figure key={w.name} className="flex flex-col items-center">
                <motion.div
                  initial={reduce ? false : { clipPath: 'circle(8% at 50% 50%)' }}
                  whileInView={{ clipPath: 'circle(50% at 50% 50%)' }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{ duration: 0.3, delay: i * 0.06, ease: [0.23, 1, 0.32, 1] }}
                  className="aspect-square w-full max-w-[360px] overflow-hidden rounded-full bg-black"
                >
                  <img src={w.src} alt={`Iride — ${w.name}`} className="size-full scale-[1.15] object-cover" />
                </motion.div>
                <figcaption className="mt-6 flex w-full max-w-[360px] items-baseline justify-between border-t border-[#e6e4df]/20 pt-4">
                  <span className="font-bodoni text-[28px] leading-none">{w.name}</span>
                  <span className="font-plex text-[12px] uppercase tracking-[0.12em] text-[#e6e4df]/55">{w.stop}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* CLOSING */}
      <section className="bg-[#e6e4df] px-6 pb-10 pt-24 text-[#0a0a0a] sm:px-12">
        <div className="mx-auto flex max-w-[1200px] flex-col items-center text-center">
          <p className="font-plex text-[12px] uppercase tracking-[0.2em] text-[#0a0a0a]/60">Ultimo fotogramma · 36/36</p>
          <p className="mt-6 max-w-[760px] font-bodoni text-[clamp(32px,4.6vw,60px)] leading-[1.05] tracking-[-0.02em]">
            Mettiti davanti all'obiettivo.
          </p>
          <button
            type="button"
            onClick={onReserve}
            style={{ transitionTimingFunction: EASE }}
            className="group mt-10 inline-flex h-14 items-center gap-3 whitespace-nowrap rounded-full bg-[#0a0a0a] pl-8 pr-6 text-[16px] text-[#e6e4df] transition-transform duration-150 active:scale-[0.97]"
          >
            {cta}
            <ArrowUpRight
              style={{ transitionTimingFunction: EASE }}
              className="size-5 transition-transform duration-150 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              strokeWidth={1.5}
            />
          </button>
          <p className="mt-24 font-bodoni text-[clamp(88px,24vw,320px)] leading-[0.8] tracking-[-0.03em]">{title}</p>
        </div>
        <div className="mx-auto mt-10 flex max-w-[1200px] flex-wrap justify-between gap-2 border-t border-[#0a0a0a]/20 pt-5 font-plex text-[12px] uppercase tracking-[0.12em]">
          <span>{venue}</span>
          <span>{credit}</span>
          <span>{date}</span>
        </div>
      </section>
    </div>
  )
}
