import React from 'react'
import Styles from './styles.module.scss'

type Props = {
  active: boolean
}

const Loader = ({ active = false }: Props) => {
  return (
    <div
      id='loader-spinner'
      aria-hidden="true"
    >
      {active && (
        <div className={Styles.loader}></div>
      )}
    </div>
  )
}

export default Loader