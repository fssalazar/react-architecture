import { ProductStockType } from '../entities/product'

export interface TransferProductDto {
    from: {
        type: ProductStockType
        id?: string
    }
    to: {
        type: ProductStockType
        id?: string
    }
    quantity: number
}
