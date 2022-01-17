export interface GeneralUser {
    id: string
    email: string
    firstName: string
    lastName: string
    permissions: {
        accessOperationalInfo: boolean
        fixMachineStock: boolean
        fixOwnerStock: boolean
        generateReports: boolean
        listCategories: boolean
        listCollections: boolean
        listInventory: boolean
        listMachines: boolean
        listPointsOfSale: boolean
        listTelemetries: boolean
        listUsers: boolean
        manageCategories: boolean
        manageCollections: boolean
        manageMachines: boolean
        managePointsOfSale: boolean
        manageUsers: boolean
        operateMachineStock: boolean
        operateOwnerStock: boolean
        remoteCredit: boolean
        templateId: string
        label: string
    }
    lastAccess?: Date
    type: string
}
