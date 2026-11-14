import React from 'react'

export const viewport = { width: 736, height: 1040 }

export const args = {
  title: 'contatto',
  credit: 'Fotografie: Olivia Wilson',
  date: '3.7.14',
  venue: 'Studio Shodwe',
  verse: "Nell'attimo catturato,\nil contatto si fa eterno:\nuno sguardo profondo\nnelle pieghe dell'anima.",
}

export const argTypes = {
  title: { control: 'text' },
  credit: { control: 'text' },
  date: { control: 'text' },
  venue: { control: 'text' },
  verse: { control: 'text' },
}

type Props = Partial<typeof args>

const IRIS =
  'https://cdn.magicpatterns.com/patterns/generated-images/e87858e2-f2ca-4a4b-ab7b-3dcc1ae1c32d.jpg'

export default function ContattoPoster(props: Props) {
  const { title, credit, date, venue, verse } = { ...args, ...props }
  return (
    <main className="flex min-h-full w-full justify-center bg-[#d9d9d9]">
      <div className="relative aspect-[736/1040] w-full max-w-[736px] overflow-hidden bg-[#d9d9d9] text-[#141414] [container-type:inline-size]">
        {/* Iris, feathered into the paper */}
        <img
          src={IRIS}
          alt="Close-up of a blue iris"
          className="absolute left-[-0.6cqw] top-[26.5cqw] w-[101cqw] [mask-image:radial-gradient(circle,#000_36%,transparent_41%)]"
        />

        {/* Verse */}
        <p className="absolute left-[9.9cqw] top-[10.2cqw] whitespace-pre-line font-didact text-[2.3cqw] leading-[3.55cqw]">
          {verse}
        </p>

        {/* Credit, date, venue */}
        <div className="absolute right-[10cqw] top-[10.2cqw] flex flex-col items-end">
          <p className="font-spartan text-[2.35cqw] font-bold leading-[3.55cqw]">{credit}</p>
          <p className="mt-[4.2cqw] font-bodoni text-[8.2cqw] leading-none tracking-[-0.02em]">{date}</p>
          <p className="mt-[3.6cqw] font-didact text-[2.3cqw] leading-none">{venue}</p>
        </div>

        {/* Title */}
        <h1 className="absolute inset-x-0 top-[101.5cqw] text-center font-bodoni text-[17cqw] font-normal leading-none tracking-[-0.01em]">
          {title}
        </h1>
      </div>
    </main>
  )
}
