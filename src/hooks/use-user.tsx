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
    getUsers(
        limit?: number,
        offset?: number,
        search?: string
    ): Promise<number | undefined>
    createUser(data: HandleUserDto): Promise<number | undefined>
    chooseUserToEdit(params: GeneralUser | undefined): void
    editUser(templateId: string, id: string): Promise<number | undefined>
    deleteUser(id: string): Promise<number | undefined>
    userToEdit?: GeneralUser
    templates: Template[]
    users: GeneralUser[]
    count?: number
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
    const [count, setCount] = useState<number>()

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
                if (index !== undefined) {
                    state.slice(index, 1)
                }
                return [...state]
            })
            return response.status
        } catch (error) {
            return undefined
        }
    }

    async function getUsers(limit?: number, offset?: number, search?: string) {
        if (!limit) {
            limit = 10
        }
        if (!offset) {
            offset = 0
        }
        try {
            const response = await api.get<{
                count: number
                users: GeneralUser[]
            }>('users', {
                headers: {
                    authorization: `Bearer ${token}`,
                },
                params: {
                    limit,
                    offset,
                    search_string: search,
                },
            })
            setUsers(response.data.users)
            setCount(response.data.count)
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
            setUsers([...users, response.data])
            return response.status
        } catch (error) {
            // localStorage.removeItem('@sttigma:token')
            return undefined
        }
    }

    async function editUser(templateId: string, id: string) {
        try {
            const response = await api.patch<GeneralUser>(
                `users/${id}`,
                { userTemplateId: templateId },
                {
                    headers: {
                        authorization: `Bearer ${token}`,
                    },
                }
            )
            setUsers((state) => {
                const index = state.findIndex((s) => s.id === id)
                if (index !== undefined) {
                    state[index] = response.data
                }
                return [...state]
            })
            return response.status
        } catch (error) {
            // localStorage.removeItem('@sttigma:token')
            return undefined
        }
    }

    async function deleteUser(id: string) {
        try {
            const response = await api.delete(`/users/${id}`, {
                headers: {
                    authorization: `Bearer ${token}`,
                },
            })
            setUsers((state) => {
                const index = templates.findIndex((t) => t.id === id)
                if (index !== undefined) {
                    state.slice(index, 1)
                }
                return [...state]
            })
            return response.status
        } catch (error) {
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
                editUser,
                deleteUser,
                userToEdit,
                templates,
                users,
                count,
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
