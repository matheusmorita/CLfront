import React from 'react';
import Slider from 'react-slick';

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import Styles from './styles.module.scss';
import Carrossel from '@/components/organisms/Carrosel';
import Head from 'next/head';

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
            <Head>
                <script src="https://web-button.mati.io/button.js" defer></script>
            </Head>

            <mati-button
                clientId={process.env.NEXT_PUBLIC_CLIENT_ID}
                flowId={process.env.NEXT_PUBLIC_CLIENT_ID}
                color="#00EE8D"
                metadata={`{"user_id":"${process.env.NEXT_PUBLIC_USER_ID}"}`}
            />
            {/* <mati-button
                clientId="5c94e3c401ddc6001be83c07"
                flowId="5ebec108872d4e001b83ee9b"
                color="#00EE8D"
                metadata='{"user_id":"1234778"}'
            /> */}
            {/* <h2> Multiple items </h2>
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
            </Carrossel> */}
        </div>
    );
}