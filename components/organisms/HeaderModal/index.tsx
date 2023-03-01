import React from 'react'
import Button from "@/components/atoms/Button";
import Styles from './styles.module.scss';

import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';

// languages
import en from '@/public/locales/en/common.json';
import pt from '@/public/locales/pt/common.json';
import { useRouter } from 'next/router';

interface HeaderModalInterface {
  balance: number;
}

function HeaderModal({ balance }: HeaderModalInterface) {
  const [checkedButton, SetCheckedButton] = React.useState<string>('comprar')
  const [hiddenBalance, setHiddenBalance] = React.useState<boolean>(true)
  const [languageBrowser, setLanguageBrowser] = React.useState<string>();

  const router = useRouter();

  const { locale } = router;

  const t = locale === 'en' ? en : pt;
  
  React.useEffect(() => {
    const language = window.navigator.language
    setLanguageBrowser(language)
  }, []);

  return (
    <>
      <div className={Styles.items}>
        <div className={Styles.buttons}>
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
                text={t.buy} 
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
                text={t.sell} 
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
                text={t.buy} 
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
                text={t.sell} 
                size={18}
              />
            </>
          )} */}
          <b style={{color: '#00EE8D'}}>Disponível somente para compras atualmente</b>
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