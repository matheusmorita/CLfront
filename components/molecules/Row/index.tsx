import React from 'react'

type Props = {
  children: any,
  className?: string,
  justifyContent?: string,
}

const Row = ({ children, className, justifyContent }: Props) => {
  return (
    <div style={{justifyContent: justifyContent}} className={`row ${className}`}>
      {children}
    </div>
  )
}

export default Row