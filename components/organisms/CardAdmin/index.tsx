import React from "react";

// assets
import backgroundImage from '../../../assets/img/backgroundInvestidor.png';
import logoImage from '@/assets/img/logo.png';

//styles 
import Styles from './styles.module.scss';
import Image from "next/image";

interface CardProps {
  title: string;
  background: any;
}

export function CardAdmin({ title, background }: CardProps) {
  return (
    <main
      className={`${Styles.main}`}
    >
      <Image
        alt="Imagem respectiva do card"
        width={400}
        src={background}
        className={Styles.backgroundImage}
      />
      <h3 className={Styles.main__h3}>{title}</h3>
    </main>
  )
}