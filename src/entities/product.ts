export enum ProductStockType {
    MACHINE = 'MACHINE',
    EMPLOYEE = 'EMPLOYEE',
    FACTORY = 'FACTORY',
}

export interface Stock {
    quantity: number
    referenceId: string
    type: ProductStockType
}

export interface Product {
    id: string
    label: string
    ownerId: string
    externalId?: string
    // photo?: Photo
    isActive: boolean
    quantity: number
    stock: Stock[]
}
