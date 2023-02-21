import React from 'react'
import Flip from '@/molecules/Flip'
import { useTranslation } from 'react-i18next'
import UserContext from '@/context/UserContext'

type Props = {
  data: any
}

const Faq = ({ data }: Props) => {
  const [languageBrowser, setLanguageBrowser] = React.useState<string>();

  const { t } = useTranslation();

  const { locale } = React.useContext(UserContext)

  React.useEffect(() => {
    const language = window.navigator.language
    setLanguageBrowser(language)
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
            ask={languageBrowser !== 'pt-BR' ? t(item.ask) : item.ask}  
            answer={languageBrowser !== 'pt-BR' ? t(item.answer) : item.answer}
            className="my-3"
            key={index}
          />
        ))
      }
    </div>
  )
}

export default Faq