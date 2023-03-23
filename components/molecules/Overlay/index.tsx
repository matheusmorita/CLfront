import React from 'react'

import Styles from './styles.module.scss';
  
const Overlay = () => {
    return (
    <main onClick={() => alert('vc clicou bobinho!')} className={Styles.mainOverlay}>
    </main>
    )
}
  
export default Overlay;