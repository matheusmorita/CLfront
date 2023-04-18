import React from 'react';

import Styles from './styles.module.scss';

interface Props {
    text: string;
    className?: string;
    position?: any;
}

export default function Status ({text, className, position='absolute'} : Props) {
    return (
        <span style={{position}} className={`${Styles.spanStatus} ${className}`}>{text}</span>
    )
}