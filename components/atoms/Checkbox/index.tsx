import React from 'react'

import i18next from '@/src/i18n'

interface CheckboxInterface {
  onClick?: any;
}

const Checkbox = ({onClick}: CheckboxInterface) => {
  const [languageBrowser, setLanguageBrowser] = React.useState<string>();

  React.useEffect(() => {
    const language = window.navigator.language
    setLanguageBrowser(language)
  }, [])
  return (
    <div className="form-check my-3">
      <input
        className="form-check-input"
        type="checkbox"
        onChange={() => {}}
        id="flexCheckDefault"
        onClick={onClick}
      />
      <label
        className="form-check-label text-start"
        htmlFor="flexCheckDefault"
      >
        {languageBrowser !== 'pt-BR' ? i18next.t('Eu li e concordo com os termos de uso de dados, política de privacidade e cookies.') : 'Eu li e concordo com os termos de uso de dados, política de privacidade e cookies.'}
      </label>
    </div>
  )
}

export default Checkbox