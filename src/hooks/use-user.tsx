import React, { createContext, useContext, ReactNode } from 'react'
import { api } from '../service/api'
import { ChangePasswordDto } from '../dtos/changePassword'
import { useAuth } from './use-auth'

interface UserContext {
    getUser(): Promise<any | undefined>
    requestPasswordReset(email: string): Promise<number | undefined>
    ChangePassword(data: ChangePasswordDto): Promise<number | undefined>
}

interface Props {
    children: ReactNode
}

const UserContext = createContext({} as UserContext)

export function UserProvider({ children }: Props) {
    // hook
    const { token } = useAuth()
    // State

    async function getUser() {
        try {
            const response = await api.get('users/me', {
                headers: {
                    authorization: `Bearer ${token}`,
                },
            })
            console.log(response.data)
            return response
        } catch (error) {
            // localStorage.removeItem('@sttigma:token')
            return undefined
        }
    }

    async function requestPasswordReset(email: string) {
        try {
            const response = await api.post('/users/forgot-password', {
                email,
            })
            console.log(response.data)
            return response.status
        } catch (error) {
            return undefined
        }
    }

    async function ChangePassword(data: ChangePasswordDto) {
        try {
            const response = await api.post('/users/reset-password', data)
            console.log(response.data)
            return response.status
        } catch (error) {
            return undefined
        }
    }

    return (
        <UserContext.Provider
            value={{ requestPasswordReset, ChangePassword, getUser }}
        >
            {children}
        </UserContext.Provider>
    )
}

export function useUser(): UserContext {
    const context = useContext(UserContext)
    if (!context) {
        throw new Error('useUser must be used within a Provider')
    }
    return context
}
