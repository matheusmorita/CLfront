import Button from "@/components/atoms/Button";
import Styles from './styles.module.scss';
import React from 'react'

import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';

function HeaderModalMobile() {
  const [checkedButton, SetCheckedButton] = React.useState<string>('comprar')
  const [hiddenBalance, setHiddenBalance] = React.useState<boolean>(true)

  return (
    <>
      <div className={Styles.items}>
        <b style={{fontWeight: '600'}}>SALDO</b>
        <div className={Styles.balanceValue}>
          <button
            style={{ border: 'none' }}
            onClick={(e: React.FormEvent<EventTarget>) => {
              e.preventDefault();
              setHiddenBalance(!hiddenBalance)
            }}
          >
            {hiddenBalance ? (
              <div className={Styles.balanceValue}>
                <div style={{ gap: '0px', display: 'flex', alignItems: 'center' }}>
                  <FiberManualRecordIcon />
                  <FiberManualRecordIcon />
                  <FiberManualRecordIcon />
                  <FiberManualRecordIcon />
                </div>
                <VisibilityOffIcon color="success" />
              </div>) : (
              <div className={Styles.balanceValue}>
                <b>R$20000,00</b>
                <RemoveRedEyeIcon />
              </div>
            )}

          </button>
        </div>
      </div>
    </>
  )
}

export default HeaderModalMobile;