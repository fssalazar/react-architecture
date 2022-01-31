/* eslint-disable no-param-reassign */
import React, { createContext, useContext, useState, ReactNode } from 'react'
import { toast } from 'react-toastify'
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
    machine?: Machine
    count?: number
    createMachine(data: HandleMachineDto): Promise<Machine | undefined>
    deleteMachine(id: string): Promise<boolean | undefined>
    getMachine(id: string): Promise<Machine | undefined>
    editMachine(
        data: HandleMachineDto,
        id: string
    ): Promise<Machine | undefined>
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
    const [machine, setMachine] = useState<Machine>()

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
        } catch (error: any) {
            // localStorage.removeItem('@sttigma:token')
            const e: string = error.response.data.details.pt
            toast.warning(e)
            return undefined
        }
    }

    async function getMachine(id: string) {
        try {
            const response = await api.get<Machine>(`/machines/${id}`, {
                headers: {
                    authorization: `Bearer ${token}`,
                },
            })
            setMachine(response.data)
            console.log(response.data)
            return response.data
        } catch (error: any) {
            // localStorage.removeItem('@sttigma:token')
            const e: string = error.response.data.details.pt
            toast.warning(e)
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
            setMachines([response.data, ...machines])
            return response.data
        } catch (error: any) {
            // localStorage.removeItem('@sttigma:token')
            const e: string = error.response.data.details.pt
            toast.warning(e)
            return undefined
        }
    }

    async function editMachine(data: HandleMachineDto, id: string) {
        try {
            const response = await api.patch<Machine>(`/machines/${id}`, data, {
                headers: {
                    authorization: `Bearer ${token}`,
                },
            })
            setMachine(response.data)
            return response.data
        } catch (error: any) {
            // localStorage.removeItem('@sttigma:token')
            const e: string = error.response.data.details.pt
            toast.warning(e)
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
        } catch (error: any) {
            // localStorage.removeItem('@sttigma:token')
            const e: string = error.response.data.details.pt
            toast.warning(e)
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
                getMachine,
                machine,
                deleteMachine,
                editMachine,
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
