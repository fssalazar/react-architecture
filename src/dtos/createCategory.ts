export interface CreateCategoryDto {
    label: string
    boxes: {
        label: string
        counters: {
            counterTypeId: string
            pin: number
            isDigital: boolean
            isMechanical: boolean
        }[]
    }[]
    sharedSupply: boolean
    sharedVault: boolean
}
