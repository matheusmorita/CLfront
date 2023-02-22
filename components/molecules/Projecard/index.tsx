import { margin } from '@mui/system';
import React from 'react'
import Styles from './styles.module.scss'


type Props = {
  data: Array<any>
  name?: string;
  montante?: string;
  emissor?: string;
  acronimo?: string;
  src?: string;
}



const Projecard = ({ data, name, montante, emissor, acronimo, src }: Props) => {
  const [windowWidth, setWindowWidth] = React.useState<number>(0)

  React.useEffect(() => {
    setWindowWidth(window.innerWidth)
  }, [])

  return (
    <div className={Styles.projecard}>
      {windowWidth >= 992 ? (
        <div
        style={{
          background: acronimo ? (
            `linear-gradient(to right, transparent, #000), url(${src})`
          ) : '',
          position: 'absolute',
          backgroundSize: acronimo ? '' : 'cover',
          width: acronimo ? '20%' : '15%',
          height: '100%',
          left: '0',
          top: '0'
        }}
        className={Styles.projecard__picture}
      />
      ) : (
        <div
        style={{
          background: acronimo ? (
            `linear-gradient(to bottom, transparent, #000), url(${src})`
          ) : '',
          position: 'absolute',
          backgroundSize: 'cover',
          width: acronimo ? '100%' : '18%',
          height: acronimo ? '100px' : '110px',
          left: acronimo ? '0' : '43%',
          top: '0'
        }}
        className={Styles.projecard__picture}
      />
      )}
      
      <div className={Styles.projecard__info}>
        <div className={Styles.info}>
          <h1 className={Styles.info__title}>{name}<span>#{acronimo || 'CNLT'}</span></h1>
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
            Quantidade
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