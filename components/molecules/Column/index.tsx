import React from 'react'

type Props = {
  media: string,
  size: number,
  children: any,
  className?: string
  flex?: string;
  margin?: string;
}

const Column = ({ media, className, size, children, flex, margin }: Props) => {
  return (
    <div style={{margin: `${margin || '10px 0'}`, flex: `${flex}`,}} className={`col-${media}-${size} ${className}`}>
      {children}
    </div>
  )
}

export default Column