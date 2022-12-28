import React from 'react'
import Styles from './styles.module.scss'
import IonIcon from '@reacticons/ionicons';

type Props = {
  id?: string,
  text?: string,
  className?: string,
  hidden?: boolean,
  size?: number,
  width?: number,
  height?: number,
  color?: string,
  weight?: string | number,
  iconColor?: any,
  iconSize?: any,
  iconName: any,
}

const Category = ({ id, className, text, hidden, width, color, size, height, weight, iconName, iconSize, iconColor }: Props) => {
  return (
    <h1
      id={id}
      aria-hidden={hidden}
      className={`${Styles.category} ${className}`}
      style={{
        maxWidth: `${width}ch`,
        color: color,
        fontSize: `${size}px`,
        fontWeight: weight,
        lineHeight: `${height}px`
      }}
    >
      <IonIcon
        name={iconName}
        size={iconSize}
        className={Styles.icon}
        style={{
          stroke: iconColor,
          fill: iconColor
        }}
      />
      {text}
    </h1>
  )
}

export default Category