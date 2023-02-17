import React from 'react'
import Styles from './styles.module.scss'

type Props = {
  data: Array<any>
}

// subindo pra CL-251

const Projecard = ({ data }: Props) => {
  return (
    <div className={Styles.projecard}>
      <div className={Styles.projecard__picture} />
      <div className={Styles.projecard__info}>
        <div className={Styles.info}>
          <h1 className={Styles.info__title}>Nome do projeto<span>#acronym</span></h1>
          <p className={Styles.info__tiny}>Emitido por <b>GDN INNOVATION</b></p>
          {/* Progress component */}
          <div className={Styles.progress}>
            <div className={Styles.progress__values}>
              <span>R$ 217.563.232,11</span>
              <span>R$ 302.562.132,18</span>
            </div>
            <div className={Styles.progress__bar} />
          </div>
        </div>
      </div>
      <div className={Styles.projecard__data}>
        <div className={Styles.data}>
          <h1 className={Styles.data__title}>
            {data[0].title}
          </h1>
          <span className={Styles.data__value}>
            {data[0].value}<span>/unds</span>
          </span>
        </div>
        <div className={Styles.data}>
          <h1 className={Styles.data__title}>
            {data[1].title}
          </h1>
          <span className={Styles.data__value}>
            <span>{data[1].value}</span>
          </span>
        </div>
        <div className={Styles.data}>
          <h1 className={Styles.data__title}>
            {data[2].title}
          </h1>
          <span className={Styles.data__value}>
            <span>{data[2].value}</span>
          </span>
        </div>
      </div>
    </div>
  )
}

export default Projecard