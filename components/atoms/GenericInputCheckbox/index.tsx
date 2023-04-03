import React from 'react';

//styles
import Styles from './styles.module.scss';

interface Props {
    id: string;
    text?: string;
    checked?: boolean;
    onChange?: any
}

export default function GenericInputCheckbox({id, text, checked, onChange}: Props) {
    return (
        <label htmlFor={id} className={Styles.styleLabelRent}>
            <input onChange={onChange} checked={checked} id={id} type='checkbox' />
            <span>{text}</span>
        </label>
    )
}