import { Address } from './address'

export interface PointOfSale {
    id: string
    ownerId: string
    label: string
    manager?: string
    phoneNumber?: string
    address?: Address
}
