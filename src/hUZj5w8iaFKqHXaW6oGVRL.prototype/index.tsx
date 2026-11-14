import React, { useState } from 'react'

import ContattoLanding from '../pKCpDNNaUZgUbYhVd9SmLZ.frame'
import ContattoPoster from '../hjLakiRZurRcfgHz7dtNxG.frame'
import EyeOnDesignPoster from '../pX9mVusiEXfGnw8uJ6qwYn.frame'
import OculisLanding from '../4mbCFBWndMwM9kD6a6xv3K.frame'

const LANDING = 'pKCpDNNaUZgUbYhVd9SmLZ'
const CONTATTO = 'hjLakiRZurRcfgHz7dtNxG'
const EYE_ON_DESIGN = 'pX9mVusiEXfGnw8uJ6qwYn'
const OCULIS = '4mbCFBWndMwM9kD6a6xv3K'

/** The size every frame draws at, unless one exports its own. */
export const viewport = 'web'

type Props = { start?: string }

export default function Prototype(props: Props) {
  const [step, setStep] = useState(() => props.start ?? LANDING)

  if (step === LANDING) {
    return <ContattoLanding onReserve={() => setStep(CONTATTO)} />
  }
  if (step === EYE_ON_DESIGN) {
    return <EyeOnDesignPoster onOpen={() => setStep(OCULIS)} />
  }
  if (step === OCULIS) {
    return <OculisLanding onBook={() => setStep(CONTATTO)} />
  }
  return (
    <div onClick={() => setStep(EYE_ON_DESIGN)} className="h-full cursor-pointer">
      <ContattoPoster />
    </div>
  )
}
