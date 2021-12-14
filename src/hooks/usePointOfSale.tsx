/* eslint-disable no-param-reassign */
import React, { createContext, useContext, ReactNode, useState } from 'react'
import { api } from '../service/api'
import { useAuth } from './use-auth'
import { CounterType } from '../entities/category'
import { CreateCategoryDto } from '../dtos/createCategory'
import { handlePointOfSaleDto } from '../dtos/handlePointOfSale'

interface PointOfSaleContext {
    getPointsOfSale(): Promise<any[] | undefined>
    createPointOfSale(data: handlePointOfSaleDto): Promise<void | undefined>
}

interface Props {
    children: ReactNode
}

const PointOfSaleContext = createContext({} as PointOfSaleContext)

export function PointOfSaleProvider({ children }: Props) {
    // hook
    const { token } = useAuth()
    // State

    async function getPointsOfSale() {
        try {
            const response = await api.get<any[]>('points-of-sale', {
                headers: {
                    authorization: `Bearer ${token}`,
                },
            })
            return response.data
        } catch (error) {
            // localStorage.removeItem('@sttigma:token')
            return undefined
        }
    }

    async function createPointOfSale(data: handlePointOfSaleDto) {
        try {
            const response = await api.post('points-of-sale', data, {
                headers: {
                    authorization: `Bearer ${token}`,
                },
            })
            return response.data
        } catch (error) {
            // localStorage.removeItem('@sttigma:token')
            return undefined
        }
    }

    return (
        <PointOfSaleContext.Provider
            value={{ createPointOfSale, getPointsOfSale }}
        >
            {children}
        </PointOfSaleContext.Provider>
    )
}

export function usePointOfSale(): PointOfSaleContext {
    const context = useContext(PointOfSaleContext)
    if (!context) {
        throw new Error('usePointOfSale must be used within a Provider')
    }
    return context
}
