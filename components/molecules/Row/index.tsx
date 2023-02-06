import React from 'react'

type Props = {
  children: any,
  className: string,
}

const Row = ({ children, className }: Props) => {
  return (
    <div className={`row ${className}`}>
      {children}
    </div>
  )
}

export default Row