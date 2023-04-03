import DivisionBar from "@/components/atoms/Division"
import React from "react"

//styles
import Styles from './styles.module.scss'

//components

import CloseIcon from '@mui/icons-material/Close';

interface Props {
    text: string
}

export default function Document ({text}: Props) {
    return (
        <span className={Styles.documentCardStyle}>
            {text} | <CloseIcon />
        </span>
    )
}