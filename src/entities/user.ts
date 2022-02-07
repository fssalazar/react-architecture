export interface User {
    email: string
    id: string
    isActive: true
    lastAccess: string
    type: 'OWNER' | 'EMPLOYEE'
}
