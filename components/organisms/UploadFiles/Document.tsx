import DivisionBar from "@/components/atoms/Division"
import React from "react"

//styles
import Styles from './styles.module.scss'

//components

import CloseIcon from '@mui/icons-material/Close';

interface Props {
    text: string;
    onClick?: () => void;
    allowClose?: boolean
}

export default function Document ({text, onClick, allowClose}: Props) {
    return (
        <span onClick={onClick} className={Styles.documentCardStyle}>
            {text} {allowClose ? (<CloseIcon />) : ''}
        </span>
    )
}