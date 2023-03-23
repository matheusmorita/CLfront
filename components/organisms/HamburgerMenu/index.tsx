import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState } from 'react';

import styles from './styles.module.scss';

interface MenuInterface {
  isOpen: boolean;
  setIsOpen: any;
}

const HamburgerMenu = ({isOpen, setIsOpen}: MenuInterface) => {
  const router = useRouter();
  const { locale } = router;

  const routes: Array<any> = [
    { name: "Início", path: "/", disabled: false },
    { name: "Tokens", path: "#", disabled: true },
    { name: "News", path: "#", disabled: true },
  ]

  return (
    <div className={styles.hamburgerMenu}>
      <div className={`${styles.menuButton} ${isOpen ? styles.open : ''}`} onClick={() => setIsOpen(!isOpen)}>
        <span></span>
        <span></span>
        <span></span>
      </div>
      <ul className={`${styles.menuItems} ${isOpen ? styles.open : ''}`}>
        {routes.map((item, i) => (
        <Link className={styles.menuItems__itemMenu} key={`${item} - ${i}`} locale={locale} href={item.path}>{item.name}</Link>
        ))}
      </ul>
    </div>
  );
};

export default HamburgerMenu;
