import Button from "@/components/atoms/Button";
import Styles from './styles.module.scss';
import React from 'react'

function HeaderModal() {
  const [checkedButton, SetCheckedButton] = React.useState<string>('comprar')
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
        <b>SALDO: R$00,00</b>
      </div>
    </>
  )
}

export default HeaderModal;