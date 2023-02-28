import React from 'react'
import Styles from './styles.module.scss'

type Props = {
  options: Array<string>,
  setState: any
}

const Switch = ({ options, setState }: Props) => {
  const [activeOption, setActiveOption] = React.useState<number>(0)

  const handleActivateOption = (option: number) => {
    setActiveOption(option)
    setState(option)
  }

  const handleActiveClass = (option: number) => {
    return activeOption === option ? Styles.active : undefined
  }

  return (
    <div className={Styles.switch}>
      <div
        onClick={() => { handleActivateOption(0) }}
        className={`${Styles.switch__option} ${handleActiveClass(0)}`}>
        {options[0]}
      </div>
      <div
        onClick={() => { handleActivateOption(1) }}
        className={`${Styles.switch__option} ${handleActiveClass(1)}`}>
        {options[1]}
      </div>
    </div>
  )
}

export default Switch