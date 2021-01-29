export function isPlainObject(target: object): boolean {
    if (Object.prototype.toString.call(target).slice(8, -1) === 'Object') {
        return true
    }
    return false
}

export function isArray(target: Array<any>) {
    return Array.isArray(target)
}