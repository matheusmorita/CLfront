import React from 'react'
import Styles from './styles.module.scss'

type Props = {
  active: boolean,
  absolute: boolean,
  style?: React.CSSProperties
}

const Loader = ({ active = false, absolute = true, style }: Props) => {
  const handlePosition = () => {
    return absolute ? Styles.absolute : null
  }

  return (
    <div
      id='loader-spinner'
      aria-hidden="true"
      className={Styles.holder}
    >
      {active && (
        <div style={style} className={`${Styles.loader} ${handlePosition()}`}></div>
      )}
    </div>
  )
}

export default Loader