import React from 'react'
import Styles from './styles.module.scss'

import i18next from '@/src/i18n'

type Props = {
  options: Array<string>,
  setState: any
}

const Switch = ({ options, setState }: Props) => {
  const [activeOption, setActiveOption] = React.useState<number>(0)
  const [languageBrowser, setLanguageBrowser] = React.useState<string>();

  const handleActivateOption = (option: number) => {
    setActiveOption(option)
    setState(option)
  }

  const handleActiveClass = (option: number) => {
    return activeOption === option ? Styles.active : undefined
  }

  React.useEffect(() => {
    const language = window.navigator.language
    setLanguageBrowser(language)
  }, [])

  return (
    <div className={Styles.switch}>
      <div
        onClick={() => { handleActivateOption(0) }}
        className={`${Styles.switch__option} ${handleActiveClass(0)}`}>
        {languageBrowser !== 'pt-BR' ? i18next.t(options[0]) : options[0]}
      </div>
      <div
        onClick={() => { handleActivateOption(1) }}
        className={`${Styles.switch__option} ${handleActiveClass(1)}`}>
        {languageBrowser !== 'pt-BR' ? i18next.t(options[1]) : options[1]}
      </div>
    </div>
  )
}

export default Switch