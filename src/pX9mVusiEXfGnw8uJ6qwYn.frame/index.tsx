import React from 'react'
import { ChevronRight } from 'lucide-react'

export const viewport = { width: 736, height: 1040 }

export const args = {
  when: 'March 25 — 6PM',
  city: 'Moscow',
  host: 'OPG.Designers',
  volume: '[Vol.2]',
  brand: 'aic.',
  body:
    'Неотъемлемой частью дизайна как процесса, и деятельности дизайнера продукта в целом, является забота о людях и умение поставить себя на место другого человека. Создавая уникальный и неповторимый опыт, мы развиваем эмпатию к людям, которые отличаются от нас и которые делают вещи, отличные от тех, что делаем мы. Мы преодолеваем ограниченность нашего мышления, которая характерна для всех нас, как бы сильно мы это ни отрицали.',
}

export const argTypes = {
  when: { control: 'text' },
  city: { control: 'text' },
  host: { control: 'text' },
  volume: { control: 'text' },
  brand: { control: 'text' },
  body: { control: 'text' },
}

type Props = Partial<typeof args> & { onOpen?: () => void }

const IRIS =
  'https://cdn.magicpatterns.com/patterns/generated-images/e042096d-2809-4670-8081-68126a791948.jpg'

export default function EyeOnDesignPoster(props: Props) {
  const { when, city, host, volume, brand, body, onOpen } = { ...args, ...props }
  return (
    <main className="flex min-h-full w-full justify-center bg-black">
      <div className="relative aspect-[736/1040] w-full max-w-[736px] overflow-hidden bg-black text-white [container-type:inline-size]">
        {/* Iris, cropped so the pupil sits on the left edge */}
        <img
          src={IRIS}
          alt="Macro of a blue iris with rust flecks"
          className="pointer-events-none absolute left-[-82cqw] top-[-23.8cqw] w-[189cqw] max-w-none"
        />

        {/* Event details */}
        <div className="absolute left-[3.8cqw] top-[3.4cqw] font-bebas text-[4.6cqw] uppercase leading-[0.86]">
          <p>{when}</p>
          <p>{city}</p>
          <p>{host}</p>
        </div>

        {/* Title */}
        <h1 className="absolute left-[50.5cqw] top-[2.2cqw] origin-top-left scale-x-[0.58] font-bebas text-[29.5cqw] font-normal uppercase leading-[0.855]">
          <span className="block">Eye</span>
          <span className="block">On</span>
          <span className="block">Design</span>
          <span className="mt-[2.4cqw] block text-[14.6cqw] leading-none">{volume}</span>
        </h1>

        {/* Brand card */}
        <button
          type="button"
          onClick={onOpen}
          className="absolute left-[3.8cqw] top-[123.4cqw] h-[14.2cqw] w-[37.7cqw] rounded-[1.9cqw] border-[0.22cqw] border-white/90 text-left transition-colors duration-150 ease-out hover:bg-white/10"
        >
          <span className="absolute left-[2.2cqw] top-[1.6cqw] font-instrument text-[4cqw] italic leading-none">
            {brand}
          </span>
          <ChevronRight className="absolute bottom-[2.1cqw] right-[2.4cqw] size-[2.4cqw]" strokeWidth={1.5} />
        </button>

        {/* Manifesto */}
        <p className="absolute left-[50.3cqw] top-[123.3cqw] w-[40.4cqw] font-inter text-[1.32cqw] leading-[1.8cqw]">
          {body}
        </p>
      </div>
    </main>
  )
}
