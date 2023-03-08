import React from 'react'

type Props = {
  media: string,
  size: number,
  children: any,
  className?: string
  flex?: string;
  margin?: string;
  minWidth?: string;
  maxWidth?: string;
  justifyContent?: string;
}

const Column = ({ media, className, size, children, flex, margin, minWidth, maxWidth, justifyContent }: Props) => {
  return (
    <div style={{ maxWidth: maxWidth, margin: `${margin || '10px 0'}`, flex: `${flex}`, justifyContent: justifyContent, minWidth: `${minWidth}`}} className={`col-${media}-${size} ${className}`}>
      {children}
    </div>
  )
}

export default Column