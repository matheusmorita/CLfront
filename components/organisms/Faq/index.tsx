import React from 'react'
import Flip from '@/molecules/Flip'
import { useTranslation } from 'react-i18next'
import UserContext from '@/context/UserContext'

type Props = {
  data: any
}

const Faq = ({ data }: Props) => {
  const { t } = useTranslation();

  const { locale } = React.useContext(UserContext)

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
            ask={locale === 'en-US' ? t(item.ask) : item.ask}  
            answer={locale === 'en-US' ? t(item.answer) : item.answer}
            className="my-3"
            key={index}
          />
        ))
      }
    </div>
  )
}

export default Faq