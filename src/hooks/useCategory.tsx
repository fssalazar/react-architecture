import React, { createContext, useContext, ReactNode, useState } from 'react'
import { api } from '../service/api'
import { ChangePasswordDto } from '../dtos/changePassword'
import { useAuth } from './use-auth'
import { CounterType } from '../entities/category'
import { CreateCategoryDto } from '../dtos/createCategory'

interface CategoryContext {
    getCounterTypes(): Promise<CounterType[] | undefined>
    createCategory(data: CreateCategoryDto): Promise<void | undefined>
    counterTypes: CounterType[]
}

interface Props {
    children: ReactNode
}

const CategoryContext = createContext({} as CategoryContext)

export function CategoryProvider({ children }: Props) {
    // hook
    const { token } = useAuth()
    // State
    const [counterTypes, setCounterTypes] = useState<CounterType[]>([])

    async function getCounterTypes() {
        try {
            const response = await api.get<CounterType[]>('counter-types', {
                headers: {
                    authorization: `Bearer ${token}`,
                },
            })
            setCounterTypes(response.data)
            console.log(response.data)
            return response.data
        } catch (error) {
            // localStorage.removeItem('@sttigma:token')
            return undefined
        }
    }

    async function createCategory(data: CreateCategoryDto) {
        try {
            const response = await api.post('categories', data, {
                headers: {
                    authorization: `Bearer ${token}`,
                },
            })
            console.log(response.data)
            return response.data
        } catch (error) {
            // localStorage.removeItem('@sttigma:token')
            return undefined
        }
    }

    return (
        <CategoryContext.Provider
            value={{ counterTypes, getCounterTypes, createCategory }}
        >
            {children}
        </CategoryContext.Provider>
    )
}

export function useCategory(): CategoryContext {
    const context = useContext(CategoryContext)
    if (!context) {
        throw new Error('useCategory must be used within a Provider')
    }
    return context
}
