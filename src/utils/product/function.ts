import { Product, ProductStockType } from '../../entities/product'

export function totalProductInStock(product: Product) {
    let temp = 0
    product.stock.forEach((s) => {
        if (s.type === ProductStockType.FACTORY) {
            temp += s.quantity
        }
    })
    return temp
}

export function totalProductInMachine(product: Product) {
    let temp = 0
    product.stock.forEach((s) => {
        if (s.type === ProductStockType.MACHINE) {
            temp += s.quantity
        }
    })
    return temp
}

export function totalProductInEmployee(product: Product) {
    let temp = 0
    product.stock.forEach((s) => {
        if (s.type === ProductStockType.EMPLOYEE) {
            temp += s.quantity
        }
    })
    return temp
}
