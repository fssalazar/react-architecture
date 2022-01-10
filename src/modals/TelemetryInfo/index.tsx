/* eslint-disable no-param-reassign */
/* eslint-disable react/require-default-props */
import React from 'react'
import ModalContainer from 'react-modal'
import green from '../../assets/green.png'
import { Button } from '../../components/Button'
import { Telemetry } from '../../entities/telemetry'
import { TelemetryContainer } from './styles'

interface Props {
    isOpen: boolean
    onRequestClose: () => void
    telemetry: Telemetry
}

export function TelemetryInfo({ isOpen, onRequestClose, telemetry }: Props) {
    const isWifi = false
    return (
        <ModalContainer
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            overlayClassName="react-modal-overlay"
            className="react-modal-telemetry-content "
        >
            <button
                className="close"
                type="button"
                onClick={() => onRequestClose()}
            >
                X
            </button>
            <TelemetryContainer>
                <div className="header">
                    <h1 className="title">STG-325</h1>
                    <div className="status">
                        <img src={green} alt="" />
                    </div>
                </div>
                <div className="form-content">
                    <div className="row">
                        <div className="label-title">
                            <h2 className="f14-400-dark">DJG-83G803</h2>
                            <p className="f12-600-gray">Máquina</p>
                        </div>
                        <div className="label-title">
                            <h2 className="f14-400-dark">06 MAI 2021 11:53</h2>
                            <p className="f12-600-gray">Última comunicação</p>
                        </div>
                    </div>
                    {isWifi ? (
                        <div className="row">
                            <div className="label-title">
                                <h2 className="f14-400-dark">Abelha Azul</h2>
                                <p className="f12-600-gray">WiFi</p>
                            </div>
                        </div>
                    ) : (
                        <div className="row">
                            <div className="label-title">
                                <h2 className="f14-400-dark">voxter.com</h2>
                                <p className="f12-600-gray">APN</p>
                            </div>
                            <div className="label-title">
                                <h2 className="f14-400-dark">algar</h2>
                                <p className="f12-600-gray">Usuário</p>
                            </div>
                            <div className="label-title">
                                <h2 className="f14-400-dark">algar</h2>
                                <p className="f12-600-gray">Senha</p>
                            </div>
                            <div className="label-title">
                                <h2 className="f14-400-dark">1212</h2>
                                <p className="f12-600-gray">PIN</p>
                            </div>
                        </div>
                    )}
                    <div className="row">
                        <div className="label-title">
                            <h2 className="f14-400-dark">
                                {telemetry.iccCode}
                            </h2>
                            <p className="f12-600-gray">ICC-ID</p>
                        </div>
                    </div>
                    <div className="row">
                        <div className="label-title">
                            <h2 className="f14-400-dark">
                                {telemetry.imeiCode}
                            </h2>
                            <p className="f12-600-gray">IMEI</p>
                        </div>
                        <div className="label-title">
                            <h2 className="f14-400-dark">v1.0.3</h2>
                            <p className="f12-600-gray">Versão Firmware</p>
                        </div>
                    </div>
                </div>
                <Button
                    text="Fechar"
                    type="button"
                    buttonType="TEXT"
                    color="WARNING"
                    onClick={() => onRequestClose()}
                />
            </TelemetryContainer>
        </ModalContainer>
    )
}
