import Button from "@/components/atoms/Button";
import Styles from './styles.module.scss';
import React from 'react'

import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';

function HeaderModal() {
  const [checkedButton, SetCheckedButton] = React.useState<string>('comprar')
  const [hiddenBalance, setHiddenBalance] = React.useState<boolean>(true)

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
                text="Comprar"
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
                text="Vender"
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
                text="Comprar"
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
                text="Vender"
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
                <b>SALDO: R$00,00</b>
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