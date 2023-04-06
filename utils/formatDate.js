import dayjs from "dayjs"

export const formatDate = (date) => {
    if (dayjs(date).isValid()) {
        const formated = dayjs(date).subtract(-3, 'hour').format('DD/MM/YYYY - HH:mm:ss')
        return formated
    }
}

export const formatOnlyDate = (date) => {
    if (dayjs(date).isValid()) {
        const formated = dayjs(date).subtract(-3, 'hour').format('DD/MM/YYYY')
        return formated
    }
}

export const formatOnlyDateTimeStamp = (date) => {
    if (dayjs(date).isValid()) {
        const formated = dayjs(date).unix()
        console.log(formated)
        return formated
    }
}

export const formatDateProjecard = (date) => {
    if (dayjs(date).isValid()) {
        const formated = dayjs(date).format('DD/MM/YYYY - HH:mm:ss')
        return formated
    }
}