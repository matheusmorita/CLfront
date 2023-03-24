import React from 'react';

import Button from "@/components/atoms/Button";
import Styles from './styles.module.scss';

import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';

import i8next from '@/src/i18n'

function FooterMobileModal() {
  const [checkedButton, SetCheckedButton] = React.useState<string>('comprar')
  const [languageBrowser, setLanguageBrowser] = React.useState<string>();

  React.useEffect(() => {
    const language = window.navigator.language
    setLanguageBrowser(language)
  }, []);

  return (
    <div className={Styles.items}>
      <div className={Styles.buttons}>
        <div className={Styles.spanStyle}>
          <b style={{ color: '#00EE8D', textAlign: 'center', fontSize: '20px', padding: '10px' }}>Disponível somente para compras atualmente.</b>
        </div>
        {/* {checkedButton === 'comprar' ? (
          <>
            <Button
              id="buy"
              hidden={false}
              className={Styles.buttonSelected}
              onClick={(e: React.FormEvent<EventTarget>) => {
                e.preventDefault();
                SetCheckedButton('comprar')
              }}
              label="buy button"
              text={languageBrowser !== 'pt-BR' ? i8next.t("Comprar") : "Comprar"}
              size={22}
            />
            <Button
              id="sell"
              hidden={false}
              className={Styles.buttonUnselected}
              onClick={(e: React.FormEvent<EventTarget>) => {
                e.preventDefault();
                SetCheckedButton('vender')
              }}
              label="sell button"
              text={languageBrowser !== 'pt-BR' ? i8next.t("Vender") : "Vender"}
              size={22}
            />
          </>
        ) : (
          <>
            <Button
              id="buy"
              hidden={false}
              className={Styles.buttonUnselected}
              onClick={(e: React.FormEvent<EventTarget>) => {
                e.preventDefault();
                SetCheckedButton('comprar')
              }}
              label="buy button"
              text={languageBrowser !== 'pt-BR' ? i8next.t("Comprar") : "Comprar"}
              size={22}
            />
            <Button
              id="sell"
              hidden={false}
              className={Styles.buttonSelected}
              onClick={(e: React.FormEvent<EventTarget>) => {
                e.preventDefault();
                SetCheckedButton('vender')
              }}
              label="sell button"
              text={languageBrowser !== 'pt-BR' ? i8next.t("Vender") : "Vender"}
              size={22}
            />
          </>
        )} */}
      </div>
    </div>
  )
}

export default FooterMobileModal;