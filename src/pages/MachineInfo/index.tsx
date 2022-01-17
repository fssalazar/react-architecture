/* eslint-disable import/no-unresolved */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable react/no-array-index-key */
/* eslint-disable no-param-reassign */
import React, { useEffect, useState } from 'react'
import { Button } from '../../components/Button'
import { MainContainer } from '../../container/MainContainer'
import { Machine } from '../../entities/machine'
import { useMachine } from '../../hooks/use-machine'
import { HandleMachine } from '../../modals/HandleMachine'
import { RoutesName } from '../../routes'
import { MachineInfoContainer } from './styles'

export function MachineInfoPage() {
    // hooks
    const { deleteMachine } = useMachine()
    // state
    const [busy, setBusy] = useState(false)
    const [openEditMachine, setOpenEditMachine] = useState(false)

    // params
    const params = window.location.search.split('?')[1]

    useEffect(() => {
        setBusy(true)
        ;(async () => {
            setBusy(false)
        })()
    }, [])

    return (
        <MainContainer
            path={[
                { label: 'Máquinas', path: RoutesName.machines },
                { label: '/ 15948', path: RoutesName.singleMachine },
            ]}
            title="Maquina B"
            active="machines"
            busy={busy}
            btnLabel="Editar máquina"
            callback={() => setOpenEditMachine(true)}
        >
            <MachineInfoContainer>
                <Button
                    text="Deletar Máquina"
                    type="button"
                    buttonType="FILLED"
                    color="WARNING"
                    onClick={async () => {
                        await deleteMachine(
                            '37f1db45-3871-49ad-a554-e704c8d9548c'
                        )
                    }}
                />
            </MachineInfoContainer>
            {openEditMachine && (
                <HandleMachine
                    isOpen={openEditMachine}
                    onRequestClose={() => setOpenEditMachine(false)}
                />
            )}
        </MainContainer>
    )
}
