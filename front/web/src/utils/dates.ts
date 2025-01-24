import { format } from 'date-fns'


export const DATE_FORMAT = "dd.MM.yyyy"
export const TIME_FORMAT = "hh:mm:ss"
export const DATETIME_FORMAT = `${DATE_FORMAT} ${TIME_FORMAT}` 

export const dtf = (datetime: string): string => {
    return format(new Date(datetime), DATETIME_FORMAT)
}

export const tf = (datetime: string): string => {
    return format(new Date(datetime), TIME_FORMAT)
}

export const df = (datetime: string): string => {
    return format(new Date(datetime), DATE_FORMAT)
}