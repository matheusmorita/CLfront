import React from 'react'
import Styles from './styles.module.scss'

type Props = {
  data: Array<any>
  name?: string;
  montante?: string;
  emissor?: string;
}

const Projecard = ({ data, name, montante, emissor }: Props) => {
  console.log()
  return (
    <div className={Styles.projecard}>
      <div
        style={{
          // background: ` linear-gradient(to right, transparent, #000), url(${src})`,
          backgroundSize: 'cover',
          position: 'absolute',
          width: '9%',
          height: '100%',
          left: '4%'

          // width: id !== 'CNLT-0' ? '25%' : '18%',
          // height: id !== 'CNLT-0' ? '' : '100%',
          // left: id !== 'CNLT-0' ? 0 : 10,
          // top: id !== 'CNLT-0' ? 0 : -5,
        }}
        className={Styles.projecard__picture}
      />
      <div className={Styles.projecard__info}>
        <div className={Styles.info}>
          <h1 className={Styles.info__title}>{name}<span>#acronym</span></h1>
          {name?.toLowerCase().includes('coinlivre') ? '' : (
            <p className={Styles.info__tiny}>Emitido por <b>{emissor}</b></p>
          )}

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
            Qtde.
          </h1>
          <span className={Styles.data__value}>
            {montante}<span>/unds</span>
          </span>
        </div>
        {/* <div className={Styles.data}>
          <h1 className={Styles.data__title}>
            {data[1].title}
          </h1>
          <span className={Styles.data__value}>
            <span>{data[1].value}</span>
          </span>
        </div> */}
        {/* <div className={Styles.data}>
          <h1 className={Styles.data__title}>
            {data[2].title}
          </h1>
          <span className={Styles.data__value}>
            <span>{data[2].value}</span>
          </span>
        </div> */}
      </div>
    </div>
  )
}

export default Projecard