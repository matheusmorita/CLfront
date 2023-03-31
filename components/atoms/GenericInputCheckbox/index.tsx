import React from 'react';

//styles
import Styles from './styles.module.scss';

interface Props {
    id: string;
    text?: string;
}

export default function GenericInputCheckbox({id, text}: Props) {
    return (
        <label htmlFor={id} className={Styles.styleLabelRent}>
            <input id={id} type='checkbox' />
            <span>{text}</span>
        </label>
    )
}