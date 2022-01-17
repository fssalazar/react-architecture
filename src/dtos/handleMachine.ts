import { Box } from '../entities/category'

export interface HandleMachineDto {
    label: string
    telemetryId: string
    operatorId?: string
    pointOfSaleId?: string
    productId?: string
    categoryId: string
    boxes: Box[]
    minStock: number
    gamePrice: number
}
