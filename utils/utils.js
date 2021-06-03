const hidePhone = (str) => {
    if (str === 'NoLoginData') {
        return ''
    } else if (str && str > 8) {
        const arr = str.split('')
        return arr
            .map((m, idx) => {
                if (idx > 2 && idx < 7) {
                    return '*'
                } else {
                    return m
                }
            })
            .join('')
    } else {
        return str
    }
}
module.exports = {
    hidePhone
}