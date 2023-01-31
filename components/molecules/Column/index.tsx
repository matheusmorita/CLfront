import React from 'react'

type Props = {
  media: string,
  size: number,
  children: any,
  className?: string
}

const Column = ({ media, className, size, children }: Props) => {
  return (
    <div style={{margin: '10px 0'}} className={`col-${media}-${size} ${className}`}>
      {children}
    </div>
  )
}

export default Column