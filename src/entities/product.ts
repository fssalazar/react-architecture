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
    externalId?: string
    photoUrl: string
    isActive: boolean
    quantity: number
    stock: Stock[]
    machineStock: {
        category: string
        label: string
        minStock: number
        stock: number
    }[]
    userStock: {
        name: string
        photoUrl: string
        stock: number
        userTemplateLabel: string
    }[]
    totalStock: number
}
