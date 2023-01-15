import React from 'react'
import Image from 'next/image'
import Styles from './styles.module.scss'
import Blocklize from '@/assets/img/blocklize.webp'

const Copyright = () => {
  return (
    <div className={Styles.copyright}>
      <hr />
      <p className={Styles.copyright__text}>
        CoinLivre&copy; 2022. Todos os direitos reservados.
      </p>
      <p className={Styles.copyright__developer}>
        Desenvolvido por&nbsp;
        <a
          href="https://blocklize.io"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
          src={Blocklize}
          width={100}
          height={undefined}
          alt="Logo da BLocklize"
        />
        </a>
      </p>
    </div>
  )
}

export default Copyright