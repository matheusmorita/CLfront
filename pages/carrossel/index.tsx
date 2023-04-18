import React from 'react';
import Slider from 'react-slick';

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import Styles from './styles.module.scss';
import Carrossel from '@/components/organisms/Carrosel';

export default function carrossel() {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 3
    };
    return (
        <div>
            <h2> Multiple items </h2>
            <Carrossel {...settings}>
                <div>
                    <div style={{background: '#5f9ea0', margin: '2%', height: '450px', width: '240px'}} className={Styles.card}>1</div>
                </div>
                <div>
                    <div style={{background: '#5f9ea0', margin: '2%', height: '450px', width: '240px'}} className={Styles.card}>2</div>
                </div>
                <div>
                    <div style={{background: '#5f9ea0', margin: '2%', height: '450px', width: '240px'}} className={Styles.card}>3</div>
                </div>
                <div>
                    <div style={{background: '#5f9ea0', margin: '2%', height: '450px', width: '240px'}} className={Styles.card}>4</div>
                </div>
                <div>
                    <div style={{background: '#5f9ea0', margin: '2%', height: '450px', width: '240px'}} className={Styles.card}>5</div>
                </div>
            </Carrossel>
        </div>
    );
}