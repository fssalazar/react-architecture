import React from 'react'

import green from '../../assets/green.png'
import { Telemetry } from '../../entities/telemetry'
import { useTelemetry } from '../../hooks/useTelemetry'
import { SingleTelemetryContainer } from './styles'

interface Props {
    telemetry: Telemetry
}

export function SingleTelemetry({ telemetry }: Props) {
    // hooks
    const { chooseTelemetry } = useTelemetry()
    return (
        <SingleTelemetryContainer
            type="button"
            style={{ gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr' }}
            onClick={() => chooseTelemetry(telemetry)}
        >
            <h1 className="f14-700-dark">{`STG-${telemetry.id}`}</h1>
            <button
                type="button"
                className="machine-bnt"
                onClick={() => console.log('b')}
            >
                DH3-003
            </button>
            <h1 className="f12-600-gray ">WIFI</h1>
            <h1 className="f12-600-gray ">06 MAI 2021 às 11:53</h1>
            <div className="status">
                <img src={green} alt="" />
            </div>
        </SingleTelemetryContainer>
    )
}
