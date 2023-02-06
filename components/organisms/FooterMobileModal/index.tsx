import React from 'react';

import Button from "@/components/atoms/Button";
import Styles from './styles.module.scss';

import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';



function FooterMobileModal() {
  const [checkedButton, SetCheckedButton] = React.useState<string>('comprar')

  return (
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
              text="Vender"
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
              text="Comprar"
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
              text="Vender"
              size={22}
            />
          </>
        )}
      </div>
    </div>
  )
}

export default FooterMobileModal;