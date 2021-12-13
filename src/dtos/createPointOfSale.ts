export interface handlePointOfSaleDto {
    id?: string
    label: string
    manager: string
    rent: number
    isPercentage: boolean
    address: {
        zipCode: string
        state: string
        city: string
        neighborhood: string
        street: string
        number: string
    }
}
