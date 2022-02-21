/* eslint-disable no-param-reassign */
import React, { createContext, useContext, ReactNode, useState } from 'react'
import { toast } from 'react-toastify'
import { api } from '../service/api'
import { useAuth } from './use-auth'
import { Box, Category, CounterType } from '../entities/category'
import { CreateCategoryDto } from '../dtos/createCategory'

interface CategoryContext {
    getCounterTypes(): Promise<CounterType[] | undefined>
    createCategory(data: CreateCategoryDto): Promise<void | undefined>
    getCategories(): Promise<Category[] | undefined>
    editCategory(data: Box[], id: string): Promise<Category | undefined>
    deleteCategory(id: string): Promise<boolean>
    counterTypes: CounterType[]
    categories: Category[]
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
    const [categories, setCategories] = useState<Category[]>([])

    async function getCounterTypes() {
        try {
            const response = await api.get<CounterType[]>('counter-types', {
                headers: {
                    authorization: `Bearer ${token}`,
                },
            })
            setCounterTypes(response.data)
            return response.data
        } catch (error: any) {
            // localStorage.removeItem('@sttigma:token')
            const e: string = error.response.data.details.pt
            toast.warning(e)
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
            setCategories([...categories, response.data])
            return response.data
        } catch (error: any) {
            // localStorage.removeItem('@sttigma:token')
            const e: string = error.response.data.details.pt
            toast.warning(e)
            return undefined
        }
    }
    async function editCategory(data: Box[], id: string) {
        try {
            data.forEach((d) => {
                d.counters.forEach((c) => {
                    c.counterTypeId = c.counterType?.id
                    delete c.counterType
                    delete c.id
                })
            })
            const response = await api.patch(
                `categories/${id}`,
                { boxes: data },
                {
                    headers: {
                        authorization: `Bearer ${token}`,
                    },
                }
            )
            return response.data
        } catch (error: any) {
            // localStorage.removeItem('@sttigma:token')
            const e: string = error.response.data.details.pt
            toast.warning(e)
            return undefined
        }
    }

    async function deleteCategory(id: string) {
        try {
            await api.delete(`categories/${id}`, {
                headers: {
                    authorization: `Bearer ${token}`,
                },
            })
            return true
        } catch (error: any) {
            // localStorage.removeItem('@sttigma:token')
            const e: string = error.response.data.details.pt
            toast.warning(e)
            return false
        }
    }

    async function getCategories() {
        try {
            const response = await api.get('categories', {
                headers: {
                    authorization: `Bearer ${token}`,
                },
            })
            setCategories(response.data)
            console.log(response.data)

            return response.data
        } catch (error: any) {
            // localStorage.removeItem('@sttigma:token')
            const e: string = error.response.data.details.pt
            toast.warning(e)
            return undefined
        }
    }

    return (
        <CategoryContext.Provider
            value={{
                counterTypes,
                categories,
                getCounterTypes,
                editCategory,
                createCategory,
                getCategories,
                deleteCategory,
            }}
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
