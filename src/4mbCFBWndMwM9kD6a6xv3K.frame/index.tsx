import React from 'react'

export const args = {
  headline: 'Focus',
  tagline: 'See Life in',
  description: 'From diagnosis to treatment — we help you regain sharp, comfortable, and confident vision',
  cta: 'Book Appointment',
}

export const argTypes = {
  headline: { control: 'text' },
  tagline: { control: 'text' },
  description: { control: 'text' },
  cta: { control: 'text' },
}

type Props = Partial<typeof args> & { onBook?: () => void }

const IRIS =
  'https://cdn.magicpatterns.com/patterns/generated-images/f01d87d1-466a-4a08-85fd-cba036f31984.jpg'

const NAV = ['About', 'Services', 'Specialists', 'Technology', 'FAQ']

export default function OculisLanding(props: Props) {
  const { headline, tagline, description, cta, onBook } = { ...args, ...props }
  return (
    <main className="relative flex h-screen w-full flex-col overflow-hidden bg-black font-inter text-white">
      {/* Header */}
      <header className="relative z-10 flex items-center justify-between px-6 pt-7 sm:px-11 sm:pt-8">
        <a href="#" className="flex items-center font-josefin text-[17px] font-light tracking-[0.12em] text-white/90">
          <span className="relative mr-[1px] inline-flex size-[15px] items-center justify-center rounded-full border border-white/90">
            <span className="size-[3px] rounded-full bg-white/90" />
          </span>
          CULIS
        </a>
        <nav className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-[30px] md:flex">
          {NAV.map((item) => (
            <a
              key={item}
              href="#"
              className="text-[14px] text-white/90 transition-colors duration-150 ease-out hover:text-white/60"
            >
              {item}
            </a>
          ))}
        </nav>
        <a href="#" className="text-[14px] text-white/90 transition-colors duration-150 ease-out hover:text-white/60">
          Contacts
        </a>
      </header>

      {/* Hero */}
      <section className="flex flex-1 flex-col items-center justify-center gap-8 px-6 pb-8 lg:grid lg:grid-cols-[1fr_auto_1fr] lg:gap-0 lg:px-11 lg:pb-0">
        {/* Left copy */}
        <div className="order-2 flex max-w-[360px] flex-col items-center text-center lg:order-none lg:max-w-[230px] lg:items-start lg:-translate-y-[2px] lg:self-center lg:text-left">
          <p className="whitespace-nowrap font-marcellus text-[40px] leading-none text-white/45 blur-[3px] select-none" aria-hidden>
            {tagline}
          </p>
          <p className="mt-5 text-[14px] leading-[1.25] text-white/75 lg:text-justify">{description}</p>
        </div>

        {/* Iris */}
        <div className="relative order-1 aspect-square w-[min(82vw,52vh,680px)] lg:order-none lg:w-[min(53vw,78vh,680px)]">
          <img
            src={IRIS}
            alt="Macro of a green and gold iris"
            className="absolute inset-[-6%] size-[112%] max-w-none object-cover [mask-image:radial-gradient(circle,#000_64%,transparent_70%)]"
          />
          <h1 className="absolute inset-0 flex items-center justify-center pt-[0.12em] font-josefin text-[clamp(28px,4vw,46px)] font-light uppercase tracking-[0.06em] text-white">
            {headline}
          </h1>
        </div>

        {/* Right copy */}
        <div className="order-3 flex flex-col items-center lg:order-none lg:items-end lg:self-center">
          <p className="hidden whitespace-nowrap font-marcellus text-[40px] leading-none text-white/45 blur-[3px] select-none lg:block" aria-hidden>
            {tagline}
          </p>
          <button
            type="button"
            onClick={onBook}
            className="mt-0 h-[40px] w-[220px] rounded-full bg-[#ececec] text-[14px] text-black transition-colors duration-150 ease-out hover:bg-white lg:mt-[22px]"
          >
            {cta}
          </button>
        </div>
      </section>
    </main>
  )
}
