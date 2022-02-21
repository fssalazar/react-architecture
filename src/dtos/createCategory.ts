import { CategoryType } from '../entities/category'

export interface CreateCategoryDto {
    label: string
    type: CategoryType
    boxes: {
        label: string
        counters: {
            counterTypeId: string
            pin: number
            isDigital: boolean
            isMechanical: boolean
        }[]
    }[]
}
