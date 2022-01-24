import React from 'react'
import { useHistory } from 'react-router-dom'
import { Machine } from '../../entities/machine'
import { RoutesName } from '../../routes'
import { SingleMachineContainer } from './styles'

interface Props {
    machine: Machine
}

export function SingleMachine({ machine }: Props) {
    const history = useHistory()

    return (
        <SingleMachineContainer
            type="button"
            style={{
                gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 0.5fr',
            }}
            onClick={() =>
                history.push(`${RoutesName.singleMachine}?${machine.id}`)
            }
        >
            <h1 className="f14-700-dark">{machine.label}</h1>
            <h1 className="f12-600-gray ">{machine.category.label}</h1>
            <h1 className="f12-600-gray ">{`STG - ${
                machine.telemetry ? machine.telemetry.id : ''
            }`}</h1>
            <h1 className="f12-600-gray ">{`${machine.operator?.firstName} ${machine.operator?.lastName}`}</h1>
            <h1 className="f12-600-gray ">{machine.pointOfSale?.label}</h1>
            <h1 className="f12-600-gray center">31 JUL 2021</h1>
            <h1 className="f12-600-gray center">$710.68</h1>
            <h1 className="f12-600-gray center">14</h1>
            <h1 className="f12-600-gray ">-</h1>
        </SingleMachineContainer>
    )
}
