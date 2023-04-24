import dayjs from "dayjs"

export const formatDate = (date) => {
    if (dayjs(date).isValid()) {
        const formated = dayjs(date).subtract(-3, 'hour').format('DD/MM/YYYY - HH:mm:ss')
        return formated
    }
}

export const formatOnlyDate = (date) => {
    if (dayjs(date).isValid()) {
        return dayjs(date).format('DD/MM/YYYY')
    }
}

export const formatOnlyDateUnix = (date) => {
    const unixDate = dayjs.unix(date)
    if (dayjs(unixDate).isValid()) {
        return unixDate.format('DD/MM/YYYY')
    }
    return dayjs(date).subtract(-1, 'day').format('DD/MM/YYYY')
}

export const formatOnlyDateTimeStamp = (date) => {
    if (dayjs(date).isValid()) {
        const formated = dayjs(date).unix()
        return formated
    }
}

export const formatDateProjecard = (date) => {
    if (dayjs(date).isValid()) {
        const formated = dayjs(date).format('DD/MM/YYYY - HH:mm:ss')
        return formated
    }
}