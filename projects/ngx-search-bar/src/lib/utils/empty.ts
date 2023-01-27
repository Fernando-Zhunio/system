export function empty(m: unknown) {
    const isEmpty = Boolean(!m) || m == ''
    if (isEmpty) return isEmpty
    if (typeof m === 'object' && Object.keys(m!).length === 0) {
        return true
    }
    return false
}
