import React, { useRef } from 'react'
import { motion, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion'
import { ArrowDownRight, ArrowUpRight } from 'lucide-react'

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

const FEATHER = '[mask-image:radial-gradient(circle_closest-side,#000_78%,transparent_97%)]'
const EASE = 'cubic-bezier(0.23, 1, 0.32, 1)'

const WORKS = [
  { src: LIGHT, name: 'Nebbia', year: '2021', tone: 'bg-[#d9d9d9] text-[#141414]' },
  { src: RUST, name: 'Brace', year: '2022', tone: 'bg-[#0b0b0b] text-[#d9d9d9]' },
  { src: GOLD, name: 'Oro', year: '2024', tone: 'bg-[#0b0b0b] text-[#d9d9d9]' },
]

export default function ContattoLanding(props: Props) {
  const { title, date, venue, credit, verse, cta, onReserve } = { ...args, ...props }
  const reduce = useReducedMotion()
  const track = useRef<HTMLDivElement>(null)

  // Scroll: the iris grows until the pupil swallows the screen
  const { scrollYProgress } = useScroll({ target: track, offset: ['start start', 'end end'] })
  const scale = useTransform(scrollYProgress, [0, 0.8], [1, reduce ? 1 : 16], { clamp: true })
  const paper = useTransform(scrollYProgress, [0.35, 0.65], ['#d9d9d9', '#000000'])
  const inkOut = useTransform(scrollYProgress, [0, 0.25], [1, 0])
  const titleY = useTransform(scrollYProgress, [0, 0.3], [0, reduce ? 0 : 120])
  const dark = useTransform(scrollYProgress, [0.6, 0.85], [0, 1])

  // Pointer: the eye follows you
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const sx = useSpring(mx, { stiffness: 90, damping: 18 })
  const sy = useSpring(my, { stiffness: 90, damping: 18 })
  const tx = useTransform(sx, (v) => v * 28)
  const ty = useTransform(sy, (v) => v * 28)

  return (
    <div
      className="w-full bg-[#d9d9d9] font-didact text-[#141414]"
      onPointerMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect()
        mx.set((e.clientX - r.left) / r.width - 0.5)
        my.set(Math.min(1, Math.max(-1, (e.clientY - r.top) / 900 - 0.5)))
      }}
    >
      {/* HERO — scroll track */}
      <div ref={track} className="relative h-[2000px]">
        <motion.section style={{ backgroundColor: paper }} className="sticky top-0 h-[820px] overflow-hidden">
          {/* Top bar */}
          <motion.header style={{ opacity: inkOut }} className="absolute inset-x-0 top-0 z-20 flex items-start justify-between gap-6 px-6 pt-8 sm:px-12 sm:pt-10">
            <p className="max-w-[260px] text-[13px] leading-[1.6] sm:text-[15px]">{verse}</p>
            <div className="flex flex-col items-end text-right">
              <p className="font-spartan text-[13px] font-bold sm:text-[15px]">{credit}</p>
              <p className="mt-4 font-bodoni text-[56px] leading-none tracking-[-0.02em] sm:text-[84px]">{date}</p>
              <p className="mt-3 text-[13px] sm:text-[15px]">{venue}</p>
            </div>
          </motion.header>

          {/* Iris */}
          <motion.div style={{ x: tx, y: ty }} className="absolute left-1/2 top-[56%] z-0 aspect-square w-[min(150vw,860px)] -translate-x-1/2 -translate-y-1/2">
            <motion.img
              src={LIGHT}
              alt="Iride azzurra in macro"
              style={{ scale }}
              initial={reduce ? false : { opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
              className={`size-full max-w-none ${FEATHER}`}
            />
          </motion.div>

          {/* Title — sits across the iris like the poster */}
          <motion.h1
            style={{ y: titleY, opacity: inkOut }}
            className="pointer-events-none absolute inset-x-0 bottom-[44px] z-10 text-center font-bodoni text-[clamp(88px,22vw,268px)] leading-[0.82] tracking-[-0.02em] sm:bottom-[30px]"
          >
            {title}
          </motion.h1>

          <motion.p style={{ opacity: inkOut }} className="absolute bottom-6 left-6 z-20 flex items-center gap-2 text-[13px] sm:left-12">
            Scorri <ArrowDownRight className="size-4" strokeWidth={1.5} />
          </motion.p>

          {/* Revealed once inside the pupil */}
          <motion.div style={{ opacity: dark }} className="absolute inset-0 z-10 flex flex-col items-center justify-center px-6 text-center text-[#d9d9d9]">
            <p className="font-bodoni text-[clamp(36px,7vw,92px)] leading-[1.02] tracking-[-0.02em]">
              Dentro lo sguardo,
              <br />
              <span className="italic">il mondo si ferma.</span>
            </p>
          </motion.div>
        </motion.section>
      </div>

      {/* EXHIBITION */}
      <section className="bg-black px-6 pb-28 pt-12 text-[#d9d9d9] sm:px-12">
        <div className="mx-auto grid max-w-[1200px] gap-12 lg:grid-cols-[1.1fr_1fr] lg:gap-20">
          <h2 className="font-bodoni text-[clamp(44px,6.4vw,92px)] leading-[0.98] tracking-[-0.02em]">
            Una mostra
            <br />
            che ti guarda
            <br />
            <span className="italic text-white/55">negli occhi.</span>
          </h2>
          <div className="flex flex-col justify-end gap-10">
            <p className="max-w-[460px] text-[17px] leading-[1.7] text-white/75">
              Trentadue ritratti d'iride, ingranditi fino a diventare paesaggi. Ogni fotografia è un incontro: nessuna
              maschera, nessuna distanza, solo il momento in cui due sguardi si riconoscono.
            </p>
            <dl className="grid grid-cols-2 border-t border-white/20 text-[15px]">
              {[
                ['Quando', date],
                ['Dove', venue],
                ['Fotografie', 'Olivia Wilson'],
                ['Ingresso', 'Libero'],
              ].map(([k, v]) => (
                <div key={k} className="border-b border-white/20 py-4 pr-4">
                  <dt className="text-white/50">{k}</dt>
                  <dd className="mt-1 font-bodoni text-[26px] leading-tight">{v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* WORKS */}
      <section className="bg-black px-6 pb-28 sm:px-12">
        <div className="mx-auto max-w-[1200px]">
          <div className="mb-8 flex items-end justify-between border-t border-white/20 pt-6 text-[#d9d9d9]">
            <h3 className="font-bodoni text-[32px] tracking-[-0.01em] sm:text-[44px]">Opere scelte</h3>
            <p className="text-[14px] text-white/50">03 / 32</p>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {WORKS.map((w, i) => (
              <motion.figure
                key={w.name}
                initial={reduce ? false : { opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.28, delay: i * 0.05, ease: [0.23, 1, 0.32, 1] }}
                className={`group flex flex-col overflow-hidden ${w.tone}`}
              >
                <div className="aspect-square overflow-hidden">
                  <img
                    src={w.src}
                    alt={`Iride — ${w.name}`}
                    style={{ transitionTimingFunction: EASE }}
                    className="size-full scale-[1.02] object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                </div>
                <figcaption className="mt-auto flex items-baseline justify-between px-5 py-4">
                  <span className="font-bodoni text-[28px] leading-none">{w.name}</span>
                  <span className="text-[14px] opacity-60">{w.year}</span>
                </figcaption>
              </motion.figure>
            ))}
          </div>
        </div>
      </section>

      {/* CLOSING — back to paper */}
      <section className="relative overflow-hidden px-6 pb-10 pt-24 sm:px-12">
        <div className="mx-auto flex max-w-[1200px] flex-col items-center text-center">
          <p className="max-w-[480px] text-[16px] leading-[1.7]">{verse}</p>
          <button
            type="button"
            onClick={onReserve}
            style={{ transitionTimingFunction: EASE }}
            className="group mt-10 inline-flex h-14 items-center gap-3 rounded-full bg-[#141414] pl-8 pr-6 text-[16px] text-[#d9d9d9] transition-transform duration-150 hover:bg-black active:scale-[0.97]"
          >
            {cta}
            <ArrowUpRight className="size-5 transition-transform duration-150 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" strokeWidth={1.5} />
          </button>
          <p className="mt-24 font-bodoni text-[clamp(88px,24vw,320px)] leading-[0.8] tracking-[-0.02em]">{title}</p>
        </div>
        <div className="mx-auto mt-10 flex max-w-[1200px] flex-wrap justify-between gap-2 border-t border-[#141414]/20 pt-5 text-[13px]">
          <span>{venue}</span>
          <span>{credit}</span>
          <span>{date}</span>
        </div>
      </section>
    </div>
  )
}
