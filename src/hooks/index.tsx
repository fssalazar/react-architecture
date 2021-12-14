import React, { ReactNode } from 'react'
import { AuthProvider } from './use-auth'
import { UserProvider } from './use-user'
import { CategoryProvider } from './useCategory'
import { PointOfSaleProvider } from './usePointOfSale'

interface AppProvideProps {
    children: ReactNode
}

export function AppProvider({ children }: AppProvideProps) {
    return (
        <AuthProvider>
            <UserProvider>
                <CategoryProvider>
                    <PointOfSaleProvider>{children}</PointOfSaleProvider>
                </CategoryProvider>
            </UserProvider>
        </AuthProvider>
    )
}
