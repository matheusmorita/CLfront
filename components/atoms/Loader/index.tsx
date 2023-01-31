import React from 'react'
import Styles from './styles.module.scss'

type Props = {
  active: boolean,
  absolute: boolean
}

const Loader = ({ active = false, absolute = true }: Props) => {
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
        <div className={`${Styles.loader} ${handlePosition()}`}></div>
      )}
    </div>
  )
}

export default Loader