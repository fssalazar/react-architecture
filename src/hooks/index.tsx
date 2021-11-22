import React, { ReactNode } from 'react'
import { AuthProvider } from './use-auth'

interface AppProvideProps {
    children: ReactNode
}

export function AppProvider({ children }: AppProvideProps) {
    return <AuthProvider>{children}</AuthProvider>
}
