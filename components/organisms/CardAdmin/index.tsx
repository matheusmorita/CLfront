import React from "react";

// assets
import backgroundImage from '../../../assets/img/backgroundEmissor.png';
import logoImage from '@/assets/img/logo.png';

//styles 
import Styles from './styles.module.scss';

interface CardProps {
    title: string;
    background: any;
}

export function CardAdmin({ title, background }: CardProps) {
    return (
        <main style={{
            background: `linear-gradient(to top, $black, transparent),
                url(${background})`,

        }} className={`${Styles.main} ${Styles.background}`}>
            <h3 className={Styles.main__h3}>{title}</h3>
        </main>
    )
}