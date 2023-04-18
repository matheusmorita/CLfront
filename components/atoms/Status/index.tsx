import React from 'react';

import Styles from './styles.module.scss';

interface Props {
    text: string;
    className?: string;
}

export default function Status ({text, className} : Props) {
    return (
        <span className={`${Styles.spanStatus} ${className}`}>{text}</span>
    )
}