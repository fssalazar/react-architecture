export interface handlePointOfSaleDto {
    id?: string
    label: string
    manager?: string
    phoneNumber?: string
    address?: {
        zipCode: string
        state: string
        city: string
        neighborhood: string
        street: string
        number: string
    }
}
