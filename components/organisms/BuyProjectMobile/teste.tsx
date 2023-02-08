import Image from "next/image";
import React from "react";

import Styles from './styles.module.scss';

interface testInterface {
  image: string;
}

function Test({ image }: testInterface) {
  return (
       <main className={Styles.cardMobileProject}>
        <Image 
            alt="Project image"
            width={150}
            height={200}
            src={image}
            className={Styles.image}
          />
       </main>
    )
}

export default Test;