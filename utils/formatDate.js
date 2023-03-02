import dayjs from "dayjs"

export const formatDate = (date) => {
    if (dayjs(date).isValid()) {
        const formated = dayjs(date).subtract(-3, 'hour').format('DD/MM/YYYY - HH:mm:ss')
        return formated
    }
}