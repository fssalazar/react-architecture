import { CategoryType, CounterType } from './category'
import { GeneralUser } from './generalUser'
import { Machine } from './machine'
import { PointOfSale } from './pointOfSale'

export enum CollectionType {
    complete = 'COMPLETE',
    simple = 'SIMPLE',
}

export interface Collection {
    id: string
    type: CollectionType
    isOnline: boolean
    observations: string
    review: {
        employeeId: string
        datetime: Date
        observations: string
        amountCollected: number
    }
    createdAt: Date
    previousCollectionId: string
    employeeId: string
    employee: GeneralUser
    machineId: string
    machine: Machine
    telemetryId: string
    pointOfSaleId: string
    pointOfSale: PointOfSale
    ownerId: string
    photos: []
    geolocation: {
        lat: number
        long: number
    }
    boxes: {
        id: string
        label: string
        counters: [
            {
                pin: number
                counterType: CounterType
                mechanicalCount: number
                digitalCount: number
                telemetryCount: number
            }
        ]
    }[]
}
