import { Category } from './category'
import { GeneralUser } from './generalUser'
import { PointOfSale } from './pointOfSale'
import { Telemetry } from './telemetry'

export interface Machine {
    id: string
    label: string
    telemetry: Telemetry
    operator?: GeneralUser
    pointOfSale?: PointOfSale
    category: Category
    gamePrice?: number
    isActive: boolean
    minStock: number
}
