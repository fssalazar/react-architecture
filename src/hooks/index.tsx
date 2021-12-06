import React, { ReactNode } from 'react'
import { AuthProvider } from './use-auth'
import { UserProvider } from './use-user'
import { CategoryProvider } from './useCategory'

interface AppProvideProps {
    children: ReactNode
}

export function AppProvider({ children }: AppProvideProps) {
    return (
        <AuthProvider>
            <UserProvider>
                <CategoryProvider>{children}</CategoryProvider>
            </UserProvider>
        </AuthProvider>
    )
}
