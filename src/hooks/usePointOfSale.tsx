/* eslint-disable no-param-reassign */
import React, { createContext, useContext, ReactNode, useState } from 'react'
import { api } from '../service/api'
import { useAuth } from './use-auth'
import { handlePointOfSaleDto } from '../dtos/handlePointOfSale'
import { PointOfSale } from '../entities/pointOfSale'

interface PointOfSaleContext {
    getPointsOfSale(
        limit?: number,
        offset?: number
    ): Promise<{ count: number; pointsOfSale: PointOfSale[] } | undefined>
    createPointOfSale(data: handlePointOfSaleDto): Promise<void | undefined>
    getPointOfSale(id: string): Promise<PointOfSale | undefined>
    editPointOfSale(
        data: handlePointOfSaleDto,
        id: string
    ): Promise<boolean | undefined>
    pointsOfSale: PointOfSale[]
    pointOfSale?: PointOfSale
    count?: number
}

interface Props {
    children: ReactNode
}

const PointOfSaleContext = createContext({} as PointOfSaleContext)

export function PointOfSaleProvider({ children }: Props) {
    // hook
    const { token } = useAuth()
    // State
    const [pointsOfSale, setPointsOfSale] = useState<PointOfSale[]>([])
    const [pointOfSale, setPointOfSale] = useState<PointOfSale>()
    const [count, setCount] = useState<number>()

    async function getPointsOfSale(limit?: number, offset?: number) {
        try {
            if (!limit) {
                limit = 10
            }
            if (!offset) {
                offset = 0
            }

            const response = await api.get<{
                count: number
                pointsOfSale: PointOfSale[]
            }>('points-of-sale', {
                headers: {
                    authorization: `Bearer ${token}`,
                },
                params: {
                    limit,
                    offset,
                },
            })
            setCount(response.data.count)
            setPointsOfSale(response.data.pointsOfSale)
            return response.data
        } catch (error) {
            // localStorage.removeItem('@sttigma:token')
            return undefined
        }
    }

    async function getPointOfSale(id: string) {
        try {
            const response = await api.get<PointOfSale>(
                `points-of-sale/${id}`,
                {
                    headers: {
                        authorization: `Bearer ${token}`,
                    },
                }
            )
            setPointOfSale(response.data)
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
            if (data.manager === '') {
                delete data.manager
            }
            setPointsOfSale([response.data, ...pointsOfSale])
            return response.data
        } catch (error) {
            // localStorage.removeItem('@sttigma:token')
            return undefined
        }
    }

    async function editPointOfSale(data: handlePointOfSaleDto, id: string) {
        try {
            const response = await api.patch(`points-of-sale/${id}`, data, {
                headers: {
                    authorization: `Bearer ${token}`,
                },
            })
            setPointOfSale({
                id,
                label: data.label,
                address: data.address ? data.address : undefined,
                manager: data.manager ? data.manager : undefined,
                phoneNumber: data.phoneNumber ? data.phoneNumber : undefined,
                ownerId: '',
            })
            console.log(response.data)
            return true
        } catch (error) {
            // localStorage.removeItem('@sttigma:token')
            return undefined
        }
    }

    return (
        <PointOfSaleContext.Provider
            value={{
                createPointOfSale,
                getPointsOfSale,
                pointsOfSale,
                count,
                getPointOfSale,
                editPointOfSale,
                pointOfSale,
            }}
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
