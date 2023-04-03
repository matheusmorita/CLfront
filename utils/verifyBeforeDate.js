import dayjs from "dayjs";

export const verifyBeforeDate = (date) => {
    const today = dayjs()
    const inputDate = dayjs(date)
    
    return inputDate.isBefore(today, 'day')
}