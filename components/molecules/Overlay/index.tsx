import React from 'react'

import Styles from './styles.module.scss';

interface MenuInterface {
  isOpen: boolean;
  setIsOpen: any;
  setMenuItemIsOpen?: any;
  setopenLink?: any;
}

const Overlay = ({ 
  isOpen,
  setIsOpen, 
  setMenuItemIsOpen,
  setopenLink,
}: MenuInterface) => {
  return (
    <main onClick={() => {
      setIsOpen(!isOpen)
      setMenuItemIsOpen(false)
      setopenLink(false)
    }} className={Styles.mainOverlay}>
    </main>
  )
}

export default Overlay;