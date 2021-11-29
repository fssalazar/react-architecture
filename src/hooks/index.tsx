import React, { ReactNode } from 'react'
import { AuthProvider } from './use-auth'
import { UserProvider } from './use-user'

interface AppProvideProps {
    children: ReactNode
}

export function AppProvider({ children }: AppProvideProps) {
    return (
        <AuthProvider>
            <UserProvider>{children}</UserProvider>
        </AuthProvider>
    )
}
