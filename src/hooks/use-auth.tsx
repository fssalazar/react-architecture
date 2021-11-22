import React, { createContext, useContext, useState, ReactNode } from 'react'
import { LoginDto } from '../dtos/login'
import { api } from '../service/api'

interface AuthContext {
    token?: string
    login(data: LoginDto): Promise<number | undefined>
    logout(): void
}

interface Props {
    children: ReactNode
}

const AuthContext = createContext({} as AuthContext)

export function AuthProvider({ children }: Props) {
    // State
    const [token, setToken] = useState<string | undefined>(() => {
        return localStorage.getItem('@ada:token') || undefined
    })

    async function login(data: LoginDto) {
        try {
            const signupData: LoginDto = {
                email: data.email.toLowerCase(),
                password: data.password,
            }
            const response = await api.post<{ token: string }>(
                '/users/auth',
                signupData
            )
            localStorage.setItem('@ada:token', response.data.token)
            setToken(response.data.token)
            return response.status
        } catch (error) {
            return undefined
        }
    }

    function logout() {
        setToken(undefined)
        window.location.reload()
        localStorage.removeItem('@ada:token')
    }

    return (
        <AuthContext.Provider
            value={{
                login,
                logout,
                token,
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth(): AuthContext {
    const context = useContext(AuthContext)
    if (!context) {
        throw new Error('useAuth must be used within a Provider')
    }
    return context
}
