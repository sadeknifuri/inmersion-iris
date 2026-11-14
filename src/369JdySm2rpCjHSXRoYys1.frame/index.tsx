import React from 'react'
import { motion, useMotionTemplate, useMotionValue, useReducedMotion, useSpring, useTransform } from 'framer-motion'
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

const LIGHT = 'https://cdn.magicpatterns.com/patterns/generated-images/e87858e2-f2ca-4a4b-ab7b-3dcc1ae1c32d.jpg'
const HAZEL = 'https://cdn.magicpatterns.com/patterns/generated-images/f076ea9f-e098-49e5-9c65-a46ad1473a13.jpg'
const GREY = 'https://cdn.magicpatterns.com/patterns/generated-images/ae30ea16-e11a-42f6-b20f-733fd0156dc4.jpg'
const VIOLET = 'https://cdn.magicpatterns.com/patterns/generated-images/3c8b64fd-3b39-4a25-8e8f-5b5425be08dd.jpg'
const PORTRAIT = 'https://cdn.magicpatterns.com/patterns/generated-images/c8b66263-4b90-4e40-847c-205313fcaffa.jpg'

const EASE = 'cubic-bezier(0.23, 1, 0.32, 1)'
const FEATHER = '[mask-image:radial-gradient(circle_closest-side,#000_78%,transparent_97%)]'
const LENS = 170

const ZOOMS = [
  { mag: '×1', scale: 1, pos: '50% 50%', note: "L'occhio intero" },
  { mag: '×4', scale: 4, pos: '62% 38%', note: 'Il bordo della pupilla' },
  { mag: '×12', scale: 12, pos: '64% 36%', note: 'Una sola fibra' },
]

const WORKS = [
  { src: LIGHT, name: 'Nebbia', year: '2021', mag: '×6' },
  { src: HAZEL, name: 'Brace', year: '2022', mag: '×9' },
  { src: GREY, name: 'Finestra', year: '2023', mag: '×4' },
  { src: VIOLET, name: 'Notte', year: '2024', mag: '×11' },
]

export default function Lente(props: Props) {
  const { title, date, venue, credit, verse, cta, onReserve } = { ...args, ...props }
  const reduce = useReducedMotion()

  // The lens rests over the pupil until the pointer picks it up
  const px = useMotionValue(640)
  const py = useMotionValue(470)
  const lx = useSpring(px, { stiffness: reduce ? 1000 : 260, damping: 30 })
  const ly = useSpring(py, { stiffness: reduce ? 1000 : 260, damping: 30 })
  const clip = useMotionTemplate`circle(${LENS}px at ${lx}px ${ly}px)`
  const origin = useMotionTemplate`${lx}px ${ly}px`
  const ringX = useTransform(lx, (v) => v - LENS)
  const ringY = useTransform(ly, (v) => v - LENS)

  return (
    <div className="w-full bg-[#dedbd4] font-didact text-[#151515]">
      {/* HERO — the lens */}
      <section
        className="relative h-[820px] cursor-none overflow-hidden"
        onPointerMove={(e) => {
          const r = e.currentTarget.getBoundingClientRect()
          px.set(e.clientX - r.left)
          py.set(e.clientY - r.top)
        }}
      >
        {/* Base layer: silver print */}
        <div className="absolute inset-0">
          <img
            src={LIGHT}
            alt="Iride in macro, stampata in bianco e nero"
            className={`absolute left-1/2 top-[57%] aspect-square w-[min(150vw,860px)] max-w-none -translate-x-1/2 -translate-y-1/2 contrast-125 grayscale ${FEATHER}`}
          />
          <h1 className="absolute inset-x-0 bottom-[36px] text-center font-bodoni text-[clamp(88px,22vw,268px)] leading-[0.82] tracking-[-0.03em]">
            {title}
          </h1>
        </div>

        {/* Top layer: through the glass — colour, magnified */}
        <motion.div style={{ clipPath: clip }} className="pointer-events-none absolute inset-0 bg-[#e9e6df]">
          <motion.div style={{ scale: 1.8, transformOrigin: origin }} className="absolute inset-0">
            <img
              src={LIGHT}
              alt=""
              className={`absolute left-1/2 top-[57%] aspect-square w-[min(150vw,860px)] max-w-none -translate-x-1/2 -translate-y-1/2 saturate-150 ${FEATHER}`}
            />
            <p className="absolute inset-x-0 bottom-[36px] text-center font-instrument text-[clamp(88px,22vw,268px)] italic leading-[0.82] tracking-[-0.02em] text-[#10285e]">
              {title}
            </p>
          </motion.div>
        </motion.div>

        {/* Lens ring */}
        <motion.div
          style={{ x: ringX, y: ringY, width: LENS * 2, height: LENS * 2 }}
          className="pointer-events-none absolute left-0 top-0 rounded-full border border-[#151515] shadow-[0_30px_60px_rgba(21,21,21,0.18)]"
        >
          <div className="absolute inset-[6px] rounded-full border border-[#151515]/25" />
          <span className="absolute -right-2 top-1/2 -translate-y-1/2 translate-x-full rounded-full bg-[#151515] px-2.5 py-1 font-plex text-[11px] text-[#dedbd4]">
            ×1.8
          </span>
        </motion.div>

        {/* Masthead */}
        <header className="pointer-events-none absolute inset-x-0 top-0 flex items-start justify-between gap-6 px-6 pt-8 sm:px-12 sm:pt-10">
          <p className="max-w-[260px] text-[13px] leading-[1.6] sm:text-[15px]">{verse}</p>
          <div className="flex flex-col items-end text-right">
            <p className="font-spartan text-[13px] font-bold sm:text-[15px]">{credit}</p>
            <p className="mt-4 font-bodoni text-[56px] leading-none tracking-[-0.02em] sm:text-[84px]">{date}</p>
            <p className="mt-3 text-[13px] sm:text-[15px]">{venue}</p>
          </div>
        </header>
        <p className="pointer-events-none absolute bottom-6 left-6 font-plex text-[11px] uppercase tracking-[0.16em] text-[#151515]/60 sm:left-12">
          Muovi la lente
        </p>
      </section>

      {/* MAGNIFICATIONS */}
      <section className="bg-[#151515] px-6 py-24 text-[#dedbd4] sm:px-12">
        <div className="mx-auto max-w-[1200px]">
          <div className="grid gap-10 lg:grid-cols-[1fr_1.4fr] lg:items-end">
            <h2 className="font-bodoni text-[clamp(44px,6vw,88px)] leading-[0.96] tracking-[-0.02em]">
              Più ti avvicini,
              <br />
              <span className="font-instrument italic text-[#dedbd4]/60">più ti guarda.</span>
            </h2>
            <p className="max-w-[480px] text-[17px] leading-[1.7] text-[#dedbd4]/70 lg:justify-self-end">
              Trentadue iridi fotografate a distanza di un respiro, poi ingrandite fino a dodici volte. A ogni scala
              l'occhio diventa un altro paesaggio: un pianeta, una costa, una foresta di fibre.
            </p>
          </div>

          <div className="mt-16 grid gap-4 sm:grid-cols-3">
            {ZOOMS.map((z, i) => (
              <motion.figure
                key={z.mag}
                initial={reduce ? false : { opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.28, delay: i * 0.06, ease: [0.23, 1, 0.32, 1] }}
                className="flex flex-col"
              >
                <div className="aspect-[3/4] overflow-hidden bg-black">
                  <img
                    src={HAZEL}
                    alt={`Iride nocciola, ingrandimento ${z.mag}`}
                    style={{ transform: `scale(${z.scale})`, transformOrigin: z.pos }}
                    className="size-full object-cover"
                  />
                </div>
                <figcaption className="flex items-baseline justify-between border-b border-[#dedbd4]/20 py-4">
                  <span className="font-bodoni text-[44px] leading-none tracking-[-0.02em]">{z.mag}</span>
                  <span className="text-[14px] text-[#dedbd4]/60">{z.note}</span>
                </figcaption>
              </motion.figure>
            ))}
          </div>
        </div>
      </section>

      {/* WORKS — an index, the way a museum catalogue reads */}
      <section className="px-6 py-24 sm:px-12">
        <div className="mx-auto grid max-w-[1200px] gap-12 lg:grid-cols-[1fr_1.3fr] lg:gap-20">
          <div className="flex flex-col">
            <img src={PORTRAIT} alt="Ritratto ravvicinato di un occhio, stampa ai sali d'argento" className="aspect-[4/5] w-full object-cover" />
            <p className="mt-4 text-[14px] text-[#151515]/60">{credit}, 2024</p>
          </div>
          <div className="flex flex-col">
            <h3 className="font-bodoni text-[32px] tracking-[-0.01em] sm:text-[44px]">Opere scelte</h3>
            <ol className="mt-8 border-t border-[#151515]">
              {WORKS.map((w) => (
                <li key={w.name} className="grid grid-cols-[64px_1fr_auto] items-center gap-5 border-b border-[#151515]/20 py-4 sm:grid-cols-[88px_1fr_auto_auto] sm:gap-8">
                  <img src={w.src} alt={`Iride — ${w.name}`} className="aspect-square w-full rounded-full object-cover" />
                  <span className="font-bodoni text-[30px] leading-none tracking-[-0.01em] sm:text-[40px]">{w.name}</span>
                  <span className="hidden font-plex text-[12px] text-[#151515]/60 sm:block">{w.mag}</span>
                  <span className="text-[14px] tabular-nums text-[#151515]/60">{w.year}</span>
                </li>
              ))}
            </ol>
            <dl className="mt-auto grid grid-cols-2 gap-y-6 pt-12 text-[15px]">
              {[
                ['Quando', date],
                ['Dove', venue],
                ['Opere', '32 ritratti'],
                ['Ingresso', 'Libero'],
              ].map(([k, v]) => (
                <div key={k}>
                  <dt className="text-[#151515]/55">{k}</dt>
                  <dd className="mt-1 font-bodoni text-[26px] leading-tight">{v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* CLOSING */}
      <section className="border-t border-[#151515]/20 px-6 pb-10 pt-24 sm:px-12">
        <div className="mx-auto flex max-w-[1200px] flex-col items-center text-center">
          <p className="max-w-[640px] font-instrument text-[clamp(30px,4vw,48px)] italic leading-[1.1]">
            Guardare da vicino è già un modo di toccare.
          </p>
          <button
            type="button"
            onClick={onReserve}
            style={{ transitionTimingFunction: EASE }}
            className="group mt-10 inline-flex h-14 items-center gap-3 whitespace-nowrap rounded-full bg-[#151515] pl-8 pr-6 text-[16px] text-[#dedbd4] transition-transform duration-150 active:scale-[0.97]"
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
        <div className="mx-auto mt-10 flex max-w-[1200px] flex-wrap justify-between gap-2 border-t border-[#151515]/20 pt-5 text-[13px]">
          <span>{venue}</span>
          <span>{credit}</span>
          <span>{date}</span>
        </div>
      </section>
    </div>
  )
}
