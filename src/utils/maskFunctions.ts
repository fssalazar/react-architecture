export function phoneFormatter(
    phone: string,
    type: 'INPUT' | 'TO_API' | 'FROM_API'
) {
    if (type === 'INPUT') {
        const formattedString = phone
            .replace(/\D/g, '')
            .replace(/(\d{2})(\d)/, '($1) $2')
            .replace(/(\d{4})(\d)/, '$1-$2')
            .replace(/(\d{4})(-)(\d)(\d{3})(\d)/, '$1$3-$4$5')
            .replace(/(-\d{4})\d+?$/, '$1')
        return formattedString
    }
    if (type === 'TO_API') {
        const formattedString = `+55${phone
            .split('(')
            .join('')
            .split(')')
            .join('')
            .split('-')
            .join('')
            .split(' ')
            .join('')}`

        return formattedString
    }
    const formattedString = phone
        .replace(/\D/g, '')
        .replace(/(\d{1})(\d)/, '')
        .replace(/(\d{2})(\d)/, '($1) $2')
        .replace(/(\d{4})(\d)/, '$1-$2')
        .replace(/(\d{4})(-)(\d)(\d{3})(\d)/, '$1$3-$4$5')
        .replace(/(-\d{4})\d+?$/, '$1')
    return formattedString
}
export function formatCep(value: string) {
    const formattedString = value.replace(/(\d{5})(\d)/, '$1-$2')
    return formattedString
}
export function unFormatCep(value: string) {
    const result = value.replace(/\B(?=(\d{3})+(?!\d))/g, '.')
    return result
}

export function cpfFormatter(
    cpf: string,
    type: 'INPUT' | 'TO_API' | 'FROM_API'
) {
    if (type === 'INPUT') {
        const formattedString = cpf
            .replace(/\D/g, '')
            .replace(/(\d{3})(\d)/, '$1.$2')
            .replace(/(\d{3}).(\d{3})(\d)/, '$1.$2.$3')
            .replace(/(\d{3}).(\d{3}).(\d{3})(\d)/, '$1.$2.$3-$4')
            .replace(/(-\d{2})\d+?$/, '$1')
        return formattedString
    }
    if (type === 'TO_API') {
        const formattedString = cpf
            .replaceAll('.', '')
            .replaceAll('-', '')
            .replaceAll('/', '')

        return formattedString
    }
    return ''
}

export function cnpjFormatter(
    cnpj: string,
    type: 'INPUT' | 'TO_API' | 'FROM_API'
) {
    if (type === 'INPUT') {
        const formattedString = cnpj
            .replace(/\D/g, '')
            .replace(/(\d{2})(\d)/, '$1.$2')
            .replace(/(\d{2}).(\d{3})(\d)/, '$1.$2.$3')
            .replace(/(\d{2}).(\d{3}).(\d{3})(\d)/, '$1.$2.$3/$4')
            .replace(/(\d{4})(\d)/, '$1-$2')
            .replace(/(-\d{2})\d+?$/, '$1')

        return formattedString
    }
    if (type === 'TO_API') {
        const formattedString = cnpj
            .replaceAll('.', '')
            .replaceAll('-', '')
            .replaceAll('/', '')

        return formattedString
    }
    return ''
}

export function creditCardNumberFormatter(value: string) {
    const formattedString = value.replaceAll(' ', '')
    if (
        formattedString[0] + formattedString[1] !== '37' &&
        formattedString[0] + formattedString[1] !== '34' &&
        formattedString[0] + formattedString[1] !== '36'
    ) {
        if (formattedString.length <= 4) {
            return formattedString
        }
        if (formattedString.length <= 8) {
            return `${formattedString.substring(
                0,
                4
            )} ${formattedString.substring(4, formattedString.length)}`
        }
        if (formattedString.length <= 12) {
            return `${formattedString.substring(
                0,
                4
            )} ${formattedString.substring(4, 8)} ${formattedString.substring(
                8,
                formattedString.length
            )}`
        }
        return `${formattedString.substring(0, 4)} ${formattedString.substring(
            4,
            8
        )} ${formattedString.substring(8, 12)} ${formattedString.substring(
            12,
            formattedString.length
        )}`
    }
    if (formattedString.length <= 4) {
        return formattedString
    }
    if (formattedString.length <= 10) {
        return `${formattedString.substring(0, 4)} ${formattedString.substring(
            4,
            formattedString.length
        )}`
    }
    return `${formattedString.substring(0, 4)} ${formattedString.substring(
        4,
        10
    )} ${formattedString.substring(10, formattedString.length)}`
}

export function formatExpiry(value: string) {
    const formattedString = value.replace('/', '')
    if (formattedString.length < 3) {
        return formattedString
    }
    return `${formattedString.substring(0, 2)}/${formattedString.substring(
        2,
        formattedString.length
    )}`
}
