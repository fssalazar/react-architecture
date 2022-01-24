/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable no-param-reassign */
import React, { createContext, useContext, ReactNode, useState } from 'react'
import { api } from '../service/api'
import { useAuth } from './use-auth'
import { Telemetry } from '../entities/telemetry'

interface TelemetryContext {
    getTelemetries(
        limit?: number,
        offset?: number,
        search?: string,
        inUse?: boolean
    ): Promise<{ count: number; telemetries: Telemetry[] } | undefined>
    telemetry?: Telemetry
    count?: number
    chooseTelemetry(telemetry?: Telemetry): void
    telemetries: Telemetry[]
}

interface Props {
    children: ReactNode
}

const TelemetryContext = createContext({} as TelemetryContext)

export function TelemetryProvider({ children }: Props) {
    // hook
    const { token } = useAuth()
    // State
    const [telemetries, setTelemetries] = useState<Telemetry[]>([])
    const [telemetry, setTelemetry] = useState<Telemetry>()
    const [count, setCount] = useState<number>()

    async function getTelemetries(
        limit?: number,
        offset?: number,
        search?: string,
        inUse?: boolean
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
                telemetries: Telemetry[]
            }>('/telemetries', {
                headers: {
                    authorization: `Bearer ${token}`,
                },
                params: {
                    limit,
                    offset,
                    search_string: search,
                    in_use: inUse === undefined ? undefined : inUse,
                },
            })
            setCount(response.data.count)
            setTelemetries(response.data.telemetries)
            return response.data
        } catch (error) {
            // localStorage.removeItem('@sttigma:token')
            return undefined
        }
    }

    function chooseTelemetry(telemetry?: Telemetry) {
        if (telemetry) {
            setTelemetry(telemetry)
        } else {
            setTelemetry(undefined)
        }
    }

    return (
        <TelemetryContext.Provider
            value={{
                getTelemetries,
                telemetry,
                count,
                chooseTelemetry,
                telemetries,
            }}
        >
            {children}
        </TelemetryContext.Provider>
    )
}

export function useTelemetry(): TelemetryContext {
    const context = useContext(TelemetryContext)
    if (!context) {
        throw new Error('useTelemetry must be used within a Provider')
    }
    return context
}
