import React, { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'

import { FilmStrip } from './components/FilmStrip'

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

const LIGHT = 'https://cdn.magicpatterns.com/patterns/generated-images/e87858e2-f2ca-4a4b-ab7b-3dcc1ae1c32d.jpg'
const RUST = 'https://cdn.magicpatterns.com/patterns/generated-images/e042096d-2809-4670-8081-68126a791948.jpg'
const GOLD = 'https://cdn.magicpatterns.com/patterns/generated-images/f01d87d1-466a-4a08-85fd-cba036f31984.jpg'
const HAZEL = 'https://cdn.magicpatterns.com/patterns/generated-images/f076ea9f-e098-49e5-9c65-a46ad1473a13.jpg'
const GREY = 'https://cdn.magicpatterns.com/patterns/generated-images/ae30ea16-e11a-42f6-b20f-733fd0156dc4.jpg'
const VIOLET = 'https://cdn.magicpatterns.com/patterns/generated-images/3c8b64fd-3b39-4a25-8e8f-5b5425be08dd.jpg'
const PORTRAIT = 'https://cdn.magicpatterns.com/patterns/generated-images/c8b66263-4b90-4e40-847c-205313fcaffa.jpg'

const EASE = 'cubic-bezier(0.23, 1, 0.32, 1)'
const ROLL = [LIGHT, PORTRAIT, RUST, GREY, HAZEL, GOLD, VIOLET, LIGHT, HAZEL, PORTRAIT, GREY, RUST]

const STRIPS = [
  { start: 1, shift: 0, dir: -1, tilt: -1.2, delay: 0 },
  { start: 9, shift: 3, dir: 1, tilt: 0.8, delay: 0.08, marked: 3 },
  { start: 17, shift: 6, dir: -1, tilt: -0.4, delay: 0.16 },
  { start: 25, shift: 2, dir: 1, tilt: 1.1, delay: 0.24 },
]

const WORKS = [
  { src: LIGHT, name: 'Nebbia', frame: '04A', note: 'la prima luce' },
  { src: HAZEL, name: 'Brace', frame: '12', note: 'tenere questa' },
  { src: PORTRAIT, name: 'Sguardo', frame: '19A', note: 'stampa 50×70' },
]

export default function Provino(props: Props) {
  const { title, date, venue, credit, verse, cta, onReserve } = { ...args, ...props }
  const reduce = useReducedMotion()
  const track = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({ target: track, offset: ['start start', 'end end'] })
  const p = useSpring(scrollYProgress, { stiffness: 140, damping: 28, mass: 0.4 })
  const titleScale = useTransform(p, [0, 0.8], [1, reduce ? 1 : 0.86])
  const safelight = useTransform(p, [0, 0.55], [0.32, 0])

  return (
    <div className="w-full bg-[#0d0b0a] font-didact text-[#efe9df]">
      {/* HERO — the roll develops as you scroll */}
      <div ref={track} className="relative h-[1900px]">
        <section className="sticky top-0 h-[820px] overflow-hidden">
          <div className="absolute inset-0 flex flex-col justify-center gap-5 py-10 sm:gap-7">
            {STRIPS.map((s) => (
              <FilmStrip key={s.start} images={ROLL} progress={p} reduce={!!reduce} {...s} />
            ))}
          </div>

          {/* Darkroom safelight */}
          <motion.div style={{ opacity: safelight }} className="pointer-events-none absolute inset-0 bg-[#b3160c] mix-blend-multiply" />

          <header className="absolute inset-x-0 top-0 z-10 flex items-start justify-between gap-6 px-6 pt-8 sm:px-12 sm:pt-10">
            <p className="font-plex text-[11px] uppercase tracking-[0.18em] text-[#efe9df]/80">Provino a contatto · rullino 01</p>
            <p className="font-plex text-[11px] uppercase tracking-[0.18em] text-[#efe9df]/80">
              {venue} · {date}
            </p>
          </header>

          <motion.h1
            style={{ scale: titleScale }}
            className="pointer-events-none absolute inset-x-0 top-1/2 z-10 -translate-y-1/2 text-center font-bodoni text-[clamp(88px,22vw,288px)] leading-[0.8] tracking-[-0.03em] text-white mix-blend-difference"
          >
            {title}
          </motion.h1>

          <p className="absolute bottom-6 left-6 z-10 font-grease text-[30px] leading-none text-[#ff4a3d] sm:left-12">
            scorri per sviluppare
          </p>
        </section>
      </div>

      {/* THE PRINT — the chosen frame, on paper */}
      <section className="bg-[#efe9df] px-6 py-24 text-[#16120f] sm:px-12">
        <div className="mx-auto grid max-w-[1200px] items-center gap-14 lg:grid-cols-[1.15fr_1fr] lg:gap-20">
          <motion.figure
            initial={reduce ? false : { opacity: 0, rotate: -3, y: 24 }}
            whileInView={{ opacity: 1, rotate: -1.5, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
            className="relative bg-white p-4 pb-16 shadow-[0_30px_60px_rgba(22,18,15,0.18)] sm:p-6 sm:pb-20"
          >
            <img src={PORTRAIT} alt="La stampa scelta: un occhio in primo piano" className="aspect-[3/2] w-full object-cover" />
            <figcaption className="absolute bottom-4 left-6 right-6 flex items-baseline justify-between sm:bottom-6">
              <span className="font-grease text-[34px] leading-none text-[#c8261c]">fotogramma 12 — sì!</span>
              <span className="font-plex text-[11px] uppercase tracking-[0.14em] text-[#16120f]/55">Gelatina ai sali d'argento</span>
            </figcaption>
            <div className="absolute -top-4 left-1/2 h-8 w-28 -translate-x-1/2 rotate-2 bg-[#e3dccd]/90" />
          </motion.figure>

          <div className="flex flex-col">
            <h2 className="font-bodoni text-[clamp(44px,5.6vw,84px)] leading-[0.96] tracking-[-0.02em]">
              Su trentasei scatti,
              <br />
              <span className="italic text-[#16120f]/55">uno solo resta.</span>
            </h2>
            <p className="mt-8 max-w-[460px] text-[17px] leading-[1.7] text-[#16120f]/75">{verse}</p>
            <dl className="mt-10 grid grid-cols-2 border-t border-[#16120f]/25 text-[15px]">
              {[
                ['Quando', date],
                ['Dove', venue],
                ['Fotografie', credit.replace('Fotografie: ', '')],
                ['Ingresso', 'Libero'],
              ].map(([k, v]) => (
                <div key={k} className="border-b border-[#16120f]/25 py-4 pr-4">
                  <dt className="font-plex text-[11px] uppercase tracking-[0.16em] text-[#16120f]/55">{k}</dt>
                  <dd className="mt-2 font-bodoni text-[26px] leading-tight">{v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* WORKS — selected from the sheet */}
      <section className="px-6 py-24 sm:px-12">
        <div className="mx-auto max-w-[1200px]">
          <div className="mb-10 flex items-end justify-between border-t border-[#efe9df]/20 pt-6">
            <h3 className="font-bodoni text-[32px] tracking-[-0.01em] sm:text-[44px]">Opere scelte</h3>
            <p className="font-plex text-[11px] uppercase tracking-[0.16em] text-[#efe9df]/55">Cerchiate in rosso</p>
          </div>
          <div className="grid gap-10 md:grid-cols-3 md:gap-6">
            {WORKS.map((w, i) => (
              <motion.figure
                key={w.name}
                initial={reduce ? false : { opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.28, delay: i * 0.06, ease: [0.23, 1, 0.32, 1] }}
                className="flex flex-col"
              >
                <div className="bg-[#1b1714] p-3">
                  <img src={w.src} alt={`${w.name}, fotogramma ${w.frame}`} className="aspect-[3/2] w-full object-cover" />
                  <p className="mt-2 font-plex text-[10px] tracking-[0.2em] text-[#e0a24a]">CONTATTO 400 · {w.frame}</p>
                </div>
                <figcaption className="mt-4 flex items-baseline justify-between">
                  <span className="font-bodoni text-[30px] leading-none">{w.name}</span>
                  <span className="font-grease text-[26px] leading-none text-[#ff4a3d]">{w.note}</span>
                </figcaption>
              </motion.figure>
            ))}
          </div>
        </div>
      </section>

      {/* CLOSING */}
      <section className="px-6 pb-10 pt-16 sm:px-12">
        <div className="mx-auto flex max-w-[1200px] flex-col items-center text-center">
          <p className="font-grease text-[40px] leading-none text-[#ff4a3d]">ti aspettiamo in camera oscura</p>
          <button
            type="button"
            onClick={onReserve}
            style={{ transitionTimingFunction: EASE }}
            className="group mt-10 inline-flex h-14 items-center gap-3 whitespace-nowrap rounded-full bg-[#efe9df] pl-8 pr-6 text-[16px] text-[#0d0b0a] transition-transform duration-150 active:scale-[0.97]"
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
        <div className="mx-auto mt-10 flex max-w-[1200px] flex-wrap justify-between gap-2 border-t border-[#efe9df]/20 pt-5 font-plex text-[11px] uppercase tracking-[0.14em] text-[#efe9df]/70">
          <span>{venue}</span>
          <span>{credit}</span>
          <span>{date}</span>
        </div>
      </section>
    </div>
  )
}
