import React from 'react'
import Styles from './styles.module.scss'

const Copyright = () => {
  return (
    <div className={Styles.copyright}>
        <hr />
        <p className={Styles.copyright__text}>
            CoinLivre&copy; 2022. Todos os direitos reservados.    
        </p> 
    </div>
  )
}

export default Copyright