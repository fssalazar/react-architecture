/* eslint-disable import/no-unresolved */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable react/no-array-index-key */
/* eslint-disable no-param-reassign */
import React, { useEffect, useState } from 'react'
import { FiBox, FiDollarSign, FiGift, FiList, FiUser } from 'react-icons/fi'
import { Button } from '../../components/Button'
import { MainContainer } from '../../container/MainContainer'
import { useMachine } from '../../hooks/use-machine'
import { HandleMachine } from '../../modals/HandleMachine'
import { RoutesName } from '../../routes'
import {
    BoxCard,
    BoxesInformation,
    EventCard,
    EventsContainer,
    GeneralInformarionContainer,
    MachineInfoContainer,
} from './styles'
import green from '../../assets/green.png'

export function MachineInfoPage() {
    // hooks
    const { deleteMachine, getMachine, machine } = useMachine()
    // state
    const [busy, setBusy] = useState(false)
    const [openEditMachine, setOpenEditMachine] = useState(false)

    // params
    const params = window.location.search.split('?')[1]

    useEffect(() => {
        setBusy(true)
        ;(async () => {
            await getMachine(params)
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
                <GeneralInformarionContainer>
                    <div className="f18-700-dark title">Informações gerais</div>
                    <div className="general-info-content">
                        <div className="general-info">
                            <div className="object">
                                <div className="object-title">
                                    <FiList />
                                    <h2 className="f14-700-dark">Modelo</h2>
                                </div>
                                <div className="object-info">
                                    <p className="f14-700-gray">Mega plush</p>
                                </div>
                            </div>
                            <div className="object">
                                <div className="object-title">
                                    <FiUser />
                                    <h2 className="f14-700-dark">
                                        Ponto de venda
                                    </h2>
                                </div>
                                <div className="object-info">
                                    <p className="f14-700-gray">
                                        Shopping Boa Vista
                                    </p>
                                </div>
                            </div>
                            <div className="object">
                                <div className="object-title">
                                    <FiUser />
                                    <h2 className="f14-700-dark">Operador</h2>
                                </div>
                                <div className="object-info">
                                    <p className="f14-700-gray">
                                        Leandro da Silva
                                    </p>
                                </div>
                            </div>
                            <div className="object">
                                <div className="object-title">
                                    <FiDollarSign />
                                    <h2 className="f14-700-dark">
                                        Valor da jogada
                                    </h2>
                                </div>
                                <div className="object-info">
                                    <p className="f14-700-gray">R$ 10,00</p>
                                </div>
                            </div>
                            <div className="object">
                                <div className="object-title">
                                    <FiGift />
                                    <h2 className="f14-700-dark">Prêmio</h2>
                                </div>
                                <div className="object-info">
                                    <p className="f14-700-gray">Pelúcia 20cm</p>
                                </div>
                            </div>
                            <div className="object">
                                <div className="object-title">
                                    <FiBox />
                                    <h2 className="f14-700-dark">
                                        Estoque mínimo
                                    </h2>
                                </div>
                                <div className="object-info">
                                    <p className="f14-700-gray">20</p>
                                </div>
                            </div>
                        </div>
                        <div className="machine-info">
                            <div className="telemetry-operator">
                                <div className="telemetry-card">
                                    <img src={green} alt="" />
                                    <div className="telemetry-info">
                                        <h1 className="f18-700-dark">
                                            STG-245
                                        </h1>
                                        <h2 className="f12-700-dark">
                                            29 JUN 2021 16:24
                                        </h2>
                                        <p className="f12-500-gray">
                                            Última conexão
                                        </p>
                                    </div>
                                </div>
                                <div className="operator-card">
                                    <img src={green} alt="" />
                                    <div className="operator-info">
                                        <h1 className="f18-700-dark">
                                            Rodrigo A. Seixas
                                        </h1>
                                        <h2 className="f12-700-dark">
                                            29 JUN 2021 16:24 (12 dias)
                                        </h2>
                                        <p className="f12-500-gray">
                                            Última coleta
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="buttons">
                                <Button
                                    text="Realizar coleta"
                                    type="button"
                                    buttonType="FILLED"
                                    color="SECONDARY"
                                    onClick={() => console.log('a')}
                                />
                                <Button
                                    text="Enviar crédito remoto"
                                    type="button"
                                    buttonType="FILLED"
                                    color="SECONDARY"
                                    onClick={() => console.log('a')}
                                />
                                <Button
                                    text="Retirar do pdv"
                                    type="button"
                                    buttonType="FILLED"
                                    color="SECONDARY"
                                    onClick={() => console.log('a')}
                                />
                            </div>
                        </div>
                    </div>
                </GeneralInformarionContainer>
                <BoxesInformation>
                    <BoxCard>
                        <h1 className="f16-700-dark center">Cabine 1</h1>
                        <div className="data-info">
                            <div className="data-info-object">
                                <h2 className="f14-700-dark">Coletável</h2>
                                <h3
                                    className="f14-700-dark"
                                    style={{ color: 'green' }}
                                >
                                    R$ 220
                                </h3>
                            </div>
                            <div className="data-info-object">
                                <h2 className="f14-700-dark">Vendas</h2>
                                <h3
                                    className="f14-700-dark"
                                    style={{ color: 'red' }}
                                >
                                    14
                                </h3>
                            </div>
                            <div className="data-info-object">
                                <h2 className="f14-700-dark">Preço médio</h2>
                                <h3 className="f14-700-dark">R$ 22,18</h3>
                            </div>
                        </div>
                        <div className="stock-container">
                            <div className="buttons">
                                <Button
                                    text="Abastecer"
                                    type="button"
                                    buttonType="FILLED"
                                    color="SECONDARY"
                                    onClick={() => console.log('a')}
                                />
                                <Button
                                    text="Retirar"
                                    type="button"
                                    buttonType="FILLED"
                                    color="SECONDARY"
                                    onClick={() => console.log('a')}
                                />
                                <Button
                                    text="Corrigir"
                                    type="button"
                                    buttonType="FILLED"
                                    color="SECONDARY"
                                    onClick={() => console.log('a')}
                                />
                            </div>
                            <div className="stock-info">
                                <h1 className="stock-title">36</h1>
                                <p className="f12-500-gray">Estoque</p>
                            </div>
                        </div>
                    </BoxCard>
                </BoxesInformation>
                <EventsContainer>
                    <div className="history-events">
                        <div className="title">
                            <h1>Histórico de eventos</h1>
                            <button type="button">Ver todos</button>
                        </div>
                        <EventCard>
                            <div className="event-info-container">
                                <img src={green} alt="" />
                                <div className="event-info">
                                    <h1 className="f18-700-dark">Cabine 1</h1>
                                    <h2 className="f14-400-dark">R$ 2,00</h2>
                                    <p className="f14-400-gray">Crédito</p>
                                </div>
                            </div>
                            <div className="event-data">
                                <h1 className="f14-700-gray">Alexandre Dias</h1>
                                <h2 className="f14-400-dark">
                                    Motivo: dinheiro travado.
                                </h2>
                                <p className="f12-500-gray">
                                    08 NOV 2022 22:34
                                </p>
                            </div>
                        </EventCard>
                        <EventCard>
                            <div className="event-info-container">
                                <img src={green} alt="" />
                                <div className="event-info">
                                    <h1 className="f18-700-dark">Cabine 1</h1>
                                    <h2 className="f14-400-dark">R$ 2,00</h2>
                                    <p className="f14-400-gray">Crédito</p>
                                </div>
                            </div>
                            <div className="event-data">
                                <h1 className="f14-700-gray">Alexandre Dias</h1>
                                <h2 className="f14-400-dark">
                                    Motivo: dinheiro travado.
                                </h2>
                                <p className="f12-500-gray">
                                    08 NOV 2022 22:34
                                </p>
                            </div>
                        </EventCard>
                        <EventCard>
                            <div className="event-info-container">
                                <img src={green} alt="" />
                                <div className="event-info">
                                    <h1 className="f18-700-dark">Cabine 1</h1>
                                    <h2 className="f14-400-dark">R$ 2,00</h2>
                                    <p className="f14-400-gray">Crédito</p>
                                </div>
                            </div>
                            <div className="event-data">
                                <h1 className="f14-700-gray">Alexandre Dias</h1>
                                <h2 className="f14-400-dark">
                                    Motivo: dinheiro travado.
                                </h2>
                                <p className="f12-500-gray">
                                    08 NOV 2022 22:34
                                </p>
                            </div>
                        </EventCard>
                        <EventCard>
                            <div className="event-info-container">
                                <img src={green} alt="" />
                                <div className="event-info">
                                    <h1 className="f18-700-dark">Cabine 1</h1>
                                    <h2 className="f14-400-dark">R$ 2,00</h2>
                                    <p className="f14-400-gray">Crédito</p>
                                </div>
                            </div>
                            <div className="event-data">
                                <h1 className="f14-700-gray">Alexandre Dias</h1>
                                <h2 className="f14-400-dark">
                                    Motivo: dinheiro travado.
                                </h2>
                                <p className="f12-500-gray">
                                    08 NOV 2022 22:34
                                </p>
                            </div>
                        </EventCard>
                        <EventCard>
                            <div className="event-info-container">
                                <img src={green} alt="" />
                                <div className="event-info">
                                    <h1 className="f18-700-dark">Cabine 1</h1>
                                    <h2 className="f14-400-dark">R$ 2,00</h2>
                                    <p className="f14-400-gray">Crédito</p>
                                </div>
                            </div>
                            <div className="event-data">
                                <h1 className="f14-700-gray">Alexandre Dias</h1>
                                <h2 className="f14-400-dark">
                                    Motivo: dinheiro travado.
                                </h2>
                                <p className="f12-500-gray">
                                    08 NOV 2022 22:34
                                </p>
                            </div>
                        </EventCard>
                        <EventCard>
                            <div className="event-info-container">
                                <img src={green} alt="" />
                                <div className="event-info">
                                    <h1 className="f18-700-dark">Cabine 1</h1>
                                    <h2 className="f14-400-dark">R$ 2,00</h2>
                                    <p className="f14-400-gray">Crédito</p>
                                </div>
                            </div>
                            <div className="event-data">
                                <h1 className="f14-700-gray">Alexandre Dias</h1>
                                <h2 className="f14-400-dark">
                                    Motivo: dinheiro travado.
                                </h2>
                                <p className="f12-500-gray">
                                    08 NOV 2022 22:34
                                </p>
                            </div>
                        </EventCard>
                    </div>
                    <div className="logs-events">
                        <div className="title">
                            <h1>Logs</h1>
                            <button type="button">Ver todos</button>
                        </div>
                        <EventCard>
                            <div className="event-info-container">
                                <img src={green} alt="" />
                                <div className="event-info">
                                    <h1 className="f18-700-dark">Cabine 1</h1>
                                    <h2 className="f14-400-dark">R$ 2,00</h2>
                                    <p className="f14-400-gray">Crédito</p>
                                </div>
                            </div>
                            <div className="event-data">
                                <h1 className="f14-700-gray">Alexandre Dias</h1>
                                <h2 className="f14-400-dark">
                                    Motivo: dinheiro travado.
                                </h2>
                                <p className="f12-500-gray">
                                    08 NOV 2022 22:34
                                </p>
                            </div>
                        </EventCard>
                        <EventCard>
                            <div className="event-info-container">
                                <img src={green} alt="" />
                                <div className="event-info">
                                    <h1 className="f18-700-dark">Cabine 1</h1>
                                    <h2 className="f14-400-dark">R$ 2,00</h2>
                                    <p className="f14-400-gray">Crédito</p>
                                </div>
                            </div>
                            <div className="event-data">
                                <h1 className="f14-700-gray">Alexandre Dias</h1>
                                <h2 className="f14-400-dark">
                                    Motivo: dinheiro travado.
                                </h2>
                                <p className="f12-500-gray">
                                    08 NOV 2022 22:34
                                </p>
                            </div>
                        </EventCard>
                        <EventCard>
                            <div className="event-info-container">
                                <img src={green} alt="" />
                                <div className="event-info">
                                    <h1 className="f18-700-dark">Cabine 1</h1>
                                    <h2 className="f14-400-dark">R$ 2,00</h2>
                                    <p className="f14-400-gray">Crédito</p>
                                </div>
                            </div>
                            <div className="event-data">
                                <h1 className="f14-700-gray">Alexandre Dias</h1>
                                <h2 className="f14-400-dark">
                                    Motivo: dinheiro travado.
                                </h2>
                                <p className="f12-500-gray">
                                    08 NOV 2022 22:34
                                </p>
                            </div>
                        </EventCard>
                        <EventCard>
                            <div className="event-info-container">
                                <img src={green} alt="" />
                                <div className="event-info">
                                    <h1 className="f18-700-dark">Cabine 1</h1>
                                    <h2 className="f14-400-dark">R$ 2,00</h2>
                                    <p className="f14-400-gray">Crédito</p>
                                </div>
                            </div>
                            <div className="event-data">
                                <h1 className="f14-700-gray">Alexandre Dias</h1>
                                <h2 className="f14-400-dark">
                                    Motivo: dinheiro travado.
                                </h2>
                                <p className="f12-500-gray">
                                    08 NOV 2022 22:34
                                </p>
                            </div>
                        </EventCard>
                        <EventCard>
                            <div className="event-info-container">
                                <img src={green} alt="" />
                                <div className="event-info">
                                    <h1 className="f18-700-dark">Cabine 1</h1>
                                    <h2 className="f14-400-dark">R$ 2,00</h2>
                                    <p className="f14-400-gray">Crédito</p>
                                </div>
                            </div>
                            <div className="event-data">
                                <h1 className="f14-700-gray">Alexandre Dias</h1>
                                <h2 className="f14-400-dark">
                                    Motivo: dinheiro travado.
                                </h2>
                                <p className="f12-500-gray">
                                    08 NOV 2022 22:34
                                </p>
                            </div>
                        </EventCard>
                        <EventCard>
                            <div className="event-info-container">
                                <img src={green} alt="" />
                                <div className="event-info">
                                    <h1 className="f18-700-dark">Cabine 1</h1>
                                    <h2 className="f14-400-dark">R$ 2,00</h2>
                                    <p className="f14-400-gray">Crédito</p>
                                </div>
                            </div>
                            <div className="event-data">
                                <h1 className="f14-700-gray">Alexandre Dias</h1>
                                <h2 className="f14-400-dark">
                                    Motivo: dinheiro travado.
                                </h2>
                                <p className="f12-500-gray">
                                    08 NOV 2022 22:34
                                </p>
                            </div>
                        </EventCard>
                    </div>
                </EventsContainer>
                <div className="delete-btn">
                    <Button
                        text="Deletar Máquina"
                        type="button"
                        buttonType="FILLED"
                        color="WARNING"
                        onClick={async () => {
                            await deleteMachine(params)
                        }}
                    />
                </div>
            </MachineInfoContainer>
            {openEditMachine && (
                <HandleMachine
                    isOpen={openEditMachine}
                    onRequestClose={() => setOpenEditMachine(false)}
                    machine={machine}
                />
            )}
        </MainContainer>
    )
}
