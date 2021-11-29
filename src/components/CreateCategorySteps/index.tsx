import React from 'react'
import { CreateCategoryStepsContainer } from './styles'

interface Props {
    step: 'ONE' | 'TWO' | 'THREE' | 'FOUR'
    title: string
    subtitle: string
}

export function CreateCategorySteps({ step, title, subtitle }: Props) {
    return (
        <CreateCategoryStepsContainer>
            <div className="step-head">
                <h1 className="f24-700-primary-gray step-title">{title}</h1>
                <p className="f16-400-primary-gray">
                    Complete todos as etapas para criar a categoria
                </p>
            </div>
            <div className="steps">
                <div className="step-config">
                    <div
                        className={`step ${
                            (step === 'ONE' ||
                                step === 'TWO' ||
                                step === 'THREE' ||
                                step === 'FOUR') &&
                            'active'
                        }`}
                    >
                        <div className="divider" />
                        <div className="step-number">1</div>
                        <div className="divider" />
                    </div>
                    <div className="step-name">
                        <p className="f12-500-gray">Selecione o modelo</p>
                    </div>
                </div>
                <div className="step-config">
                    <div
                        className={`step ${
                            (step === 'TWO' ||
                                step === 'THREE' ||
                                step === 'FOUR') &&
                            'active'
                        }`}
                    >
                        <div className="divider" />
                        <div className="step-number">2</div>
                        <div className="divider" />
                    </div>
                    <div className="step-name">
                        <p className="f12-500-gray">Adicione os contadores</p>
                    </div>
                </div>
                <div className="step-config">
                    <div
                        className={`step ${
                            (step === 'THREE' || step === 'FOUR') && 'active'
                        }`}
                    >
                        <div className="divider" />
                        <div className="step-number">3</div>
                        <div className="divider" />
                    </div>
                    <div className="step-name">
                        <p className="f12-500-gray">Preencha os detalhes</p>
                    </div>
                </div>
                <div className="step-config">
                    <div className={`step ${step === 'FOUR' && 'active'}`}>
                        <div className="divider" />
                        <div className="step-number">4</div>
                        <div className="divider" />
                    </div>
                    <div className="step-name">
                        <p className="f12-500-gray">Informe o nome</p>
                    </div>
                </div>
            </div>
            <div className="sub-title">
                <h2 className="f14-700-dark">{subtitle}</h2>
            </div>
        </CreateCategoryStepsContainer>
    )
}
