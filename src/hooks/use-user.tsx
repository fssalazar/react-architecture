/* eslint-disable no-param-reassign */
import React, { createContext, useContext, ReactNode, useState } from 'react'
import { api } from '../service/api'
import { ChangePasswordDto } from '../dtos/changePassword'
import { useAuth } from './use-auth'
import { Template } from '../entities/template'

interface UserContext {
    getUser(): Promise<any | undefined>
    requestPasswordReset(email: string): Promise<number | undefined>
    ChangePassword(data: ChangePasswordDto): Promise<number | undefined>
    getTemplates(): Promise<number | undefined>
    createTemplate(data: Template): Promise<number | undefined>
    editTemplate(data: Template, id: string): Promise<number | undefined>
    templates: Template[]
}

interface Props {
    children: ReactNode
}

const UserContext = createContext({} as UserContext)

export function UserProvider({ children }: Props) {
    // hook
    const { token } = useAuth()
    const [templates, setTemplates] = useState<Template[]>([])
    // State

    async function getUser() {
        try {
            const response = await api.get('users/me', {
                headers: {
                    authorization: `Bearer ${token}`,
                },
            })
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
            return response.status
        } catch (error) {
            return undefined
        }
    }

    async function ChangePassword(data: ChangePasswordDto) {
        try {
            const response = await api.post('/users/reset-password', data)
            return response.status
        } catch (error) {
            return undefined
        }
    }

    async function getTemplates() {
        try {
            const response = await api.get<Template[]>('/users/templates', {
                headers: {
                    authorization: `Bearer ${token}`,
                },
            })
            setTemplates(response.data)
            return response.status
        } catch (error) {
            return undefined
        }
    }

    async function createTemplate(data: Template) {
        try {
            const response = await api.post('/users/templates', data, {
                headers: {
                    authorization: `Bearer ${token}`,
                },
            })
            setTemplates([...response.data])
            return response.status
        } catch (error) {
            return undefined
        }
    }

    async function editTemplate(data: Template, id: string) {
        try {
            const response = await api.patch(`/users/templates/${id}`, data, {
                headers: {
                    authorization: `Bearer ${token}`,
                },
            })
            setTemplates((state) => {
                const index = templates.findIndex((t) => t.id === id)
                if (index) {
                    state[index] = data
                }
                return [...state]
            })
            return response.status
        } catch (error) {
            return undefined
        }
    }

    return (
        <UserContext.Provider
            value={{
                requestPasswordReset,
                ChangePassword,
                getUser,
                getTemplates,
                createTemplate,
                editTemplate,
                templates,
            }}
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
