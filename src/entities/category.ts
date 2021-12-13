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
    sharedSupply: boolean
    sharedVault: boolean
    boxes: Box[]
}
