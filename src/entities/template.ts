export interface Template {
    id?: string
    label: string
    permissions: {
        listMachines: boolean
        manageMachines: boolean
        operateMachineStock: boolean
        fixMachineStock: boolean
        remoteCredit: boolean
        listPointsOfSale: boolean
        managePointsOfSale: boolean
        listCategories: boolean
        manageCategories: boolean
        listTelemetries: boolean
        operateOwnerStock: boolean
        fixOwnerStock: boolean
        listInventory: boolean
        generateReports: boolean
        accessOperationalInfo: boolean
        listUsers: boolean
        manageUsers: boolean
        listCollections: boolean
        manageCollections: boolean
        // -----------
        manageProducts: boolean
    }
}
