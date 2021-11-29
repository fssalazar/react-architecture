/* eslint-disable no-param-reassign */
/* eslint-disable react/require-default-props */
import React, { useState } from 'react'
import ModalContainer from 'react-modal'
import { FiInfo } from 'react-icons/fi'
import { RiArrowUpSLine } from 'react-icons/ri'

import { CreateCategorySteps } from '../../components/CreateCategorySteps'
import { CreateCategoryContent } from './styles'
import CategoryImg from '../../assets/example1.png'
import { Button } from '../../components/Button'
import { SmallSelectInput } from '../../components/SmallSelectInput'

interface Props {
    isOpen: boolean
    onRequestClose: () => void
}

export function CreateCategory({ isOpen, onRequestClose }: Props) {
    const [step, setStep] = useState<'ONE' | 'TWO' | 'THREE' | 'FOUR'>('ONE')

    return (
        <ModalContainer
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            overlayClassName="react-modal-overlay"
            className="react-modal-content"
        >
            <button
                className="close"
                type="button"
                onClick={() => onRequestClose()}
            >
                X
            </button>
            <CreateCategoryContent>
                <CreateCategorySteps
                    step={step}
                    title="Criar categoria"
                    subtitle="A sua máquina pertence a alguma dessas categorias ?"
                />
                {/* ---------------------- STEP ONE -------------------- */}
                {step === 'ONE' && (
                    <div className="choose-type">
                        <div className="category-types">
                            <button type="button" className="category-type">
                                <div className="title">
                                    <h2 className="f14-700-dark">Grua Única</h2>
                                    <FiInfo />
                                </div>
                                <div className="img">
                                    <img src={CategoryImg} alt="" />
                                </div>
                            </button>
                            <button type="button" className="category-type">
                                <div className="title">
                                    <h2 className="f14-700-dark">
                                        Multiplas gruas
                                    </h2>
                                    <FiInfo />
                                </div>
                                <div className="img">
                                    <img src={CategoryImg} alt="" />
                                </div>
                            </button>
                            <button type="button" className="category-type">
                                <div className="title">
                                    <h2 className="f14-700-dark">
                                        Multiplos estoques
                                    </h2>
                                    <FiInfo />
                                </div>
                                <div className="img">
                                    <img src={CategoryImg} alt="" />
                                </div>
                            </button>
                            <button type="button" className="category-type">
                                <div className="title">
                                    <h2 className="f14-700-dark">Sem saída</h2>
                                    <FiInfo />
                                </div>
                                <div className="img">
                                    <img src={CategoryImg} alt="" />
                                </div>
                            </button>
                            <button type="button" className="category-type">
                                <div className="title">
                                    <h2 className="f14-700-dark">
                                        Criar uma nova
                                    </h2>
                                    <FiInfo />
                                </div>
                                <div className="img">
                                    <img src={CategoryImg} alt="" />
                                </div>
                            </button>
                        </div>
                        <div className="action-btns">
                            <Button
                                type="button"
                                buttonType="TEXT"
                                color="WARNING"
                                text="Cancelar"
                            />
                            <Button
                                type="button"
                                buttonType="FILLED"
                                color="SECONDARY"
                                text="Próximo"
                                onClick={() => setStep('TWO')}
                            />
                        </div>
                    </div>
                )}
                {/* ----------------------  STEP TWO ------------------- */}
                {step === 'TWO' && (
                    <div className="build-category">
                        <div className="category-box">
                            <div className="header">
                                <div className="title">
                                    <h1 className="f16-700-dark">1. Cabine</h1>
                                </div>
                                <button type="button">
                                    <RiArrowUpSLine />
                                </button>
                            </div>
                            <div className="category-content">
                                <div className="titles">
                                    <h1 className="f14-500-gray ">Contador</h1>
                                    <h1 className="f14-500-gray ">
                                        Telemetria
                                    </h1>
                                    <h1 className="f14-500-gray ">Digital</h1>
                                    <h1 className="f14-500-gray ">Analógico</h1>
                                </div>
                                <div className="category-form">
                                    <SmallSelectInput
                                        name="noteiro"
                                        options={[
                                            {
                                                label: 'Noteiro (Entrada)',
                                                value: '123',
                                            },
                                        ]}
                                    />
                                    <SmallSelectInput
                                        name="premio"
                                        options={[
                                            {
                                                label: 'Prêmio (Saída)',
                                                value: '123',
                                            },
                                        ]}
                                    />
                                    <div className="type-input">
                                        <input type="checkbox" />
                                    </div>
                                    <div className="type-input">
                                        <input type="checkbox" />
                                    </div>
                                </div>
                                <div className="category-form">
                                    <SmallSelectInput
                                        name="noteiro"
                                        options={[
                                            {
                                                label: 'Noteiro (Entrada)',
                                                value: '123',
                                            },
                                        ]}
                                    />
                                    <SmallSelectInput
                                        name="premio"
                                        options={[
                                            {
                                                label: 'Prêmio (Saída)',
                                                value: '123',
                                            },
                                        ]}
                                    />
                                    <div className="type-input">
                                        <input type="checkbox" />
                                    </div>
                                    <div className="type-input">
                                        <input type="checkbox" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="action-btns">
                            <Button
                                type="button"
                                buttonType="TEXT"
                                color="WARNING"
                                text="Cancelar"
                            />
                            <div className="step-btns">
                                <Button
                                    type="button"
                                    buttonType="TEXT"
                                    color="PRIMARY"
                                    text="Anterior"
                                    onClick={() => setStep('TWO')}
                                />
                                <Button
                                    type="button"
                                    buttonType="FILLED"
                                    color="SECONDARY"
                                    text="Próximo"
                                    onClick={() => setStep('THREE')}
                                />
                            </div>
                        </div>
                    </div>
                )}
                {/* ----------------------  STEP THREE ------------------- */}
                <div className="category-config">
                    <h1>
                        O estoque na máquina é compartilhado entre as cabines?
                    </h1>
                    <div className="action-config">
                        <label htmlFor="sharedSupply">
                            SIM
                            <input type="checkbox" id="sharedSupply" />
                        </label>
                        <label htmlFor="unSharedSupply">
                            NÃO
                            <input type="checkbox" id="unSharedSupply" />
                        </label>
                    </div>
                </div>
            </CreateCategoryContent>
        </ModalContainer>
    )
}
