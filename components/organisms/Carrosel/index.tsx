import React, { ReactNode } from 'react';

import Slider from "react-slick";

// styles
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Styles from './styles.module.scss';

interface Props {
  children: ReactNode
}

export default function Carrossel({ children }: Props) {

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
  };
  return (
    <Slider className={Styles.carousel} {...settings}>
      {children}
    </Slider>
  )
}
