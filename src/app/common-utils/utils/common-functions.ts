export function DateFormatUpdate (date?: any) {
    let dateString = !date ? new Date().toLocaleDateString() : new Date(date).toLocaleDateString()
    return dateString.split('/').reverse().join('-')
}

export function DateToMilliSeconds(date: any) {
    return new Date(date).getTime()
}