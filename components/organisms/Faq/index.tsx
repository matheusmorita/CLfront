import React from 'react'
import Flip from '@/molecules/Flip'
import UserContext from '@/context/UserContext'

type Props = {
  data: any
}

const Faq = ({ data }: Props) => {
  React.useEffect(() => {
  // const beforePath = localStorage.getItem('beforePath')
  // router.push(`${beforePath}`)
  })

  return (
    <div
      id='faq-cards'
      aria-label='Ficou alguma dúvida?'
    >
      {
        data &&
        data.map((item: { ask: string; answer: string }, index: number) => (
          <Flip
            id={`${index + 1}`}
            ask={item.ask}  
            answer={item.answer}
            className="my-3"
            key={index}
          />
        ))
      }
    </div>
  )
}

export default Faq