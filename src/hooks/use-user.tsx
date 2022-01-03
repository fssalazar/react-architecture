/* eslint-disable no-param-reassign */
import React, { createContext, useContext, ReactNode, useState } from 'react'
import { api } from '../service/api'
import { ChangePasswordDto } from '../dtos/changePassword'
import { useAuth } from './use-auth'
import { Template } from '../entities/template'
import { HandleUserDto } from '../dtos/handleUser'
import { GeneralUser } from '../entities/generalUser'

interface UserContext {
    getUser(): Promise<any | undefined>
    requestPasswordReset(email: string): Promise<number | undefined>
    ChangePassword(data: ChangePasswordDto): Promise<number | undefined>
    getTemplates(): Promise<number | undefined>
    createTemplate(data: Template): Promise<number | undefined>
    editTemplate(data: Template, id: string): Promise<number | undefined>
    deleteTemplate(id: string): Promise<number | undefined>
    getUsers(limit?: number, offset?: number): Promise<number | undefined>
    createUser(data: HandleUserDto): Promise<number | undefined>
    chooseUserToEdit(params: GeneralUser | undefined): void
    userToEdit?: GeneralUser
    templates: Template[]
    users: GeneralUser[]
}

interface Props {
    children: ReactNode
}

const UserContext = createContext({} as UserContext)

export function UserProvider({ children }: Props) {
    // hook
    const { token } = useAuth()
    const [templates, setTemplates] = useState<Template[]>([])
    const [users, setUsers] = useState<GeneralUser[]>([])

    // State
    const [userToEdit, setUserToEdit] = useState<GeneralUser>()

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
            setTemplates([response.data, ...templates])
            return response.status
        } catch (error) {
            return undefined
        }
    }

    async function editTemplate(data: Template, id: string) {
        const editTemplateData: Template = {
            label: data.label,
            permissions: data.permissions,
        }
        try {
            const response = await api.patch(
                `/users/templates/${id}`,
                editTemplateData,
                {
                    headers: {
                        authorization: `Bearer ${token}`,
                    },
                }
            )
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
    async function deleteTemplate(id: string) {
        try {
            const response = await api.delete(`/users/templates/${id}`, {
                headers: {
                    authorization: `Bearer ${token}`,
                },
            })
            setTemplates((state) => {
                const index = templates.findIndex((t) => t.id === id)
                if (index) {
                    state.slice(index, 1)
                }
                return [...state]
            })
            return response.status
        } catch (error) {
            return undefined
        }
    }

    async function getUsers() {
        try {
            const response = await api.get<GeneralUser[]>('users', {
                headers: {
                    authorization: `Bearer ${token}`,
                },
            })
            setUsers(response.data)
            return response.status
        } catch (error) {
            // localStorage.removeItem('@sttigma:token')
            return undefined
        }
    }

    async function createUser(data: HandleUserDto) {
        try {
            const response = await api.post('users', data, {
                headers: {
                    authorization: `Bearer ${token}`,
                },
            })
            console.log(response.data)
            return response.status
        } catch (error) {
            // localStorage.removeItem('@sttigma:token')
            return undefined
        }
    }

    function chooseUserToEdit(params: GeneralUser | undefined) {
        setUserToEdit(params)
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
                deleteTemplate,
                getUsers,
                createUser,
                chooseUserToEdit,
                userToEdit,
                templates,
                users,
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
