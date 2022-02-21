export enum CategoryType {
    SINGLE_BOX_SINGLE_STOCK = 'SINGLE_BOX_SINGLE_STOCK',
    SINGLE_BOX_MULTIPLE_STOCKS = 'SINGLE_BOX_MULTIPLE_STOCKS',
    MULTIPLE_BOXES_SINGLE_STOCK = 'MULTIPLE_BOXES_SINGLE_STOCK',
    MULTIPLE_BOXES_MULTIPLE_STOCKS = 'MULTIPLE_BOXES_MULTIPLE_STOCKS',
    NO_PRIZE = 'NO_PRIZE',
}

export interface CounterType {
    id?: string
    label: string
    type: string
}

export interface Counter {
    pin: number
    isDigital: boolean
    isMechanical: boolean
    counterType?: CounterType
    counterTypeId?: string
    id?: string
}

export interface Box {
    id: string
    label: string
    counters: Counter[]
}

export interface Category {
    id: string
    label: string
    type: CategoryType
    boxes: Box[]
}
