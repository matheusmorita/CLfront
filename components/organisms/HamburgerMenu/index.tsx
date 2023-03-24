import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState } from 'react';

import styles from './styles.module.scss';

// Atualizando github

interface MenuInterface {
  openLink: boolean;
  setopenLink: any;
  menuItemIsOpen: boolean;
  setMenuItemIsOpen: any;
  setOpenOverlay: any
}

const HamburgerMenu = ({openLink, setopenLink, menuItemIsOpen, setMenuItemIsOpen, setOpenOverlay}: MenuInterface) => {
  const router = useRouter();
  const { locale } = router;

  const routes: Array<any> = [
    { name: "Início", path: "/", disabled: false },
    { name: "Tokens", path: "#", disabled: true },
    { name: "News", path: "#", disabled: true },
  ]

  return (
    <div className={styles.hamburgerMenu}>
      <div className={`${styles.menuButton} ${openLink ? styles.open : ''}`} onClick={() => {
        setopenLink(!openLink)
        setMenuItemIsOpen(false)
        setOpenOverlay(true)
        if (openLink) {
          setOpenOverlay(false)
        }
        // if (isOpen) {
        //   return setIsOpen(false)
        // }
        // return setIsOpen(true)
      }}>
        <span></span>
        <span></span>
        <span></span>
      </div>
      <ul className={`${styles.menuItems} ${openLink ? styles.open : ''}`}>
        {routes.map((item, i) => (
        <Link className={styles.menuItems__itemMenu} key={`${item} - ${i}`} locale={locale} href={item.path}>{item.name}</Link>
        ))}
      </ul>
    </div>
  );
};

export default HamburgerMenu;
