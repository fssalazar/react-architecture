import React, { ReactNode } from 'react'
import { AuthProvider } from './use-auth'
import { MachineProvider } from './use-machine'
import { UserProvider } from './use-user'
import { CategoryProvider } from './useCategory'
import { PointOfSaleProvider } from './usePointOfSale'
import { TelemetryProvider } from './useTelemetry'

interface AppProvideProps {
    children: ReactNode
}

export function AppProvider({ children }: AppProvideProps) {
    return (
        <AuthProvider>
            <UserProvider>
                <CategoryProvider>
                    <PointOfSaleProvider>
                        <TelemetryProvider>
                            <MachineProvider>{children}</MachineProvider>
                        </TelemetryProvider>
                    </PointOfSaleProvider>
                </CategoryProvider>
            </UserProvider>
        </AuthProvider>
    )
}
