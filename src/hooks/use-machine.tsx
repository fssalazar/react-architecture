/* eslint-disable no-param-reassign */
import React, { createContext, useContext, useState, ReactNode } from 'react'
import { HandleMachineDto } from '../dtos/handleMachine'
import { Machine } from '../entities/machine'
import { api } from '../service/api'
import { useAuth } from './use-auth'

interface MachineContext {
    getMachines(
        limit?: number,
        offset?: number,
        search?: string
    ): Promise<{ count: number; machines: Machine[] } | undefined>
    machines: Machine[]
    count?: number
    createMachine(data: HandleMachineDto): Promise<Machine | undefined>
    deleteMachine(id: string): Promise<boolean | undefined>
}

interface Props {
    children: ReactNode
}

const MachineContext = createContext({} as MachineContext)

export function MachineProvider({ children }: Props) {
    // hooks
    const { token } = useAuth()
    // state
    const [machines, setMachines] = useState<Machine[]>([])
    const [count, setCount] = useState<number>()

    async function getMachines(
        limit?: number,
        offset?: number,
        search?: string
    ) {
        try {
            if (!limit) {
                limit = 10
            }
            if (!offset) {
                offset = 0
            }
            const response = await api.get<{
                count: number
                machines: Machine[]
            }>('/machines', {
                headers: {
                    authorization: `Bearer ${token}`,
                },
                params: {
                    limit,
                    offset,
                    search_string: search,
                },
            })
            setMachines(response.data.machines)
            setCount(response.data.count)
            console.log(response.data)

            return response.data
        } catch (error) {
            return undefined
        }
    }
    async function createMachine(data: HandleMachineDto) {
        try {
            const response = await api.post<Machine>('/machines', data, {
                headers: {
                    authorization: `Bearer ${token}`,
                },
            })
            console.log(data)
            return response.data
        } catch (error) {
            return undefined
        }
    }

    async function deleteMachine(id: string) {
        try {
            const response = await api.delete(`/machines/${id}`, {
                headers: {
                    authorization: `Bearer ${token}`,
                },
            })
            setMachines((state) => {
                const index = state.findIndex((s) => s.id === id)
                if (index !== undefined) {
                    state.slice(index, 1)
                }
                return state
            })
            console.log(response.data)
            return true
        } catch (error) {
            return undefined
        }
    }

    return (
        <MachineContext.Provider
            value={{
                getMachines,
                createMachine,
                machines,
                count,
                deleteMachine,
            }}
        >
            {children}
        </MachineContext.Provider>
    )
}

export function useMachine(): MachineContext {
    const context = useContext(MachineContext)
    if (!context) {
        throw new Error('useMachine must be used within a Provider')
    }
    return context
}
