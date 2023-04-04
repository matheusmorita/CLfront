import React from 'react';

//styles
import Styles from './styles.module.scss';

interface Props {
    id: string;
    text?: string;
    checked?: boolean;
    onChange?: any
    disabled?: boolean;
}

export default function GenericInputCheckbox({id, text, checked, onChange, disabled}: Props) {
    return (
        <label htmlFor={id} className={Styles.styleLabelRent}>
            <input disabled={disabled} onChange={onChange} checked={checked} id={id} type='checkbox' />
            <span >{text}</span>
        </label>
    )
}