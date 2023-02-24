import React from 'react'
import Button from "@/components/atoms/Button";
import Styles from './styles.module.scss';

import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';

import i18next from '@/src/i18n';

interface HeaderModalInterface {
  balance: number;
}

function HeaderModal({ balance }: HeaderModalInterface) {
  const [checkedButton, SetCheckedButton] = React.useState<string>('comprar')
  const [hiddenBalance, setHiddenBalance] = React.useState<boolean>(true)
  const [languageBrowser, setLanguageBrowser] = React.useState<string>();

  React.useEffect(() => {
    const language = window.navigator.language
    setLanguageBrowser(language)
  }, []);

  return (
    <>
      <div className={Styles.items}>
        <div className={Styles.buttons}>
          {checkedButton === 'comprar' ? (
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
                text={languageBrowser !== 'pt-BR' ? i18next.t("Comprar") : "Comprar"} 
                size={18}
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
                text={languageBrowser !== 'pt-BR' ? i18next.t("Vender") : "Vender"} 
                size={18}
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
                text={languageBrowser !== 'pt-BR' ? i18next.t("Comprar") : "Comprar"} 
                size={18}
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
                text={languageBrowser !== 'pt-BR' ? i18next.t("Vender") : "Vender"} 
                size={18}
              />
            </>
          )}

        </div>
        <div className={Styles.balanceValue}>
          <button
            style={{border: 'none'}}
            onClick={(e: React.FormEvent<EventTarget>) => {
              e.preventDefault();
              setHiddenBalance(!hiddenBalance)
            }}
          >
            { hiddenBalance ? (
            <div className={Styles.balanceValue}>
              <div style={{gap: '0px', display: 'flex', alignItems: 'center'}}>
                <FiberManualRecordIcon />
                <FiberManualRecordIcon />
                <FiberManualRecordIcon />
                <FiberManualRecordIcon />
              </div>
              <VisibilityOffIcon color="success" />
            </div> ): (
              <div className={Styles.balanceValue}>
                <b style={{fontSize: '20px'}}>CNLT <b style={{color: '#00EE8D'}}>{balance}</b></b>
                <RemoveRedEyeIcon />
              </div>
            )}
            
          </button>
        </div>
      </div>
    </>
  )
}

export default HeaderModal;