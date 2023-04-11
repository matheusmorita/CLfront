import React from "react";

// assets
import backgroundImage from '../../../assets/img/backgroundInvestidor.png';
import logoImage from '@/assets/img/logo.png';

//styles 
import Styles from './styles.module.scss';
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

interface CardProps {
  title: string;
  background: any;
}

export function CardAdmin({ title, background }: CardProps) {
  const [backgroundIMG, setBackgroundIMG] = React.useState<any>();

  const router = useRouter();
  const { locale } = router;

  return (
    <main
      className={`${Styles.main}`}
      style={{
        backgroundImage: `url(${background})`,
        backgroundSize: 'cover',
      }}
    >
      <div
        style={{display: 'flex'}}
      >
        {/* <Image
          alt="Imagem respectiva do card"
          width={380}
          height={100}
          src={background}
          className={Styles.backgroundImage}
          style={{
            backgroundImage: `url(${background})`
          }}
        /> */}
        <h3 className={Styles.main__h3}>{title}</h3>
      </div>
    </main>
  )
}