/* eslint-disable no-unused-expressions */
/* eslint-disable no-plusplus */
/* eslint-disable no-param-reassign */
/* eslint-disable react/require-default-props */
import React, { useEffect, useState } from 'react'
import ModalContainer from 'react-modal'
import { FiInfo, FiXCircle } from 'react-icons/fi'
import { RiArrowUpSLine } from 'react-icons/ri'

import { v4 } from 'uuid'
import { toast } from 'react-toastify'
import { CreateCategorySteps } from '../../components/CreateCategorySteps'
import { CreateCategoryContent } from './styles'
import CategoryImg from '../../assets/example1.png'
import { Button } from '../../components/Button'
import { SmallSelectInput } from '../../components/SmallSelectInput'
import { SimpleInput } from '../../components/SimpleInput'
import CheckImg from '../../assets/check.svg'
import { CreateCategoryDto } from '../../dtos/createCategory'
import { SelectInput } from '../../components/SelectInput'
import { useCategory } from '../../hooks/useCategory'
import { CategoryType } from '../../entities/category'

interface Props {
    isOpen: boolean
    onRequestClose: () => void
}

export function CreateCategory({ isOpen, onRequestClose }: Props) {
    // hooks
    const { counterTypes, getCounterTypes, createCategory } = useCategory()
    // state
    const [step, setStep] = useState<'ONE' | 'TWO' | 'THREE' | 'FOUR' | 'FIVE'>(
        'ONE'
    )
    const [category, setCategory] = useState<CreateCategoryDto>()
    const [typeChosen, setTypeChosen] = useState<
        | 'GRUA'
        | 'MULTI_BOXES'
        | 'MULTI_STOCKS'
        | 'NO_OUT'
        | 'CUSTOM'
        | undefined
    >()

    const pin = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]

    function getPins() {
        category?.boxes.forEach((b) => {
            b.counters.forEach((c) => {
                pin.forEach((p, index) => {
                    if (c.pin === p) {
                        pin.splice(index, 1)
                    }
                })
            })
        })
        return pin
    }

    useEffect(() => {
        ;(async () => {
            await getCounterTypes()
        })()
    }, [])

    return (
        <ModalContainer
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            overlayClassName="react-modal-overlay"
            className="react-modal-content"
            shouldCloseOnOverlayClick={false}
            shouldCloseOnEsc={false}
        >
            <button
                className="close"
                type="button"
                onClick={() => {
                    setStep('ONE')
                    setCategory(undefined)
                    setTypeChosen(undefined)
                    onRequestClose()
                }}
            >
                X
            </button>
            <CreateCategoryContent>
                <CreateCategorySteps
                    step={step}
                    title="Criar Modelo"
                    subtitle={
                        step === 'ONE'
                            ? 'A sua m??quina pertence a alguma desses modelos?'
                            : ''
                    }
                />
                {/* ---------------------- STEP ONE -------------------- */}
                {step === 'ONE' && (
                    <div className="choose-type">
                        <div className="category-types">
                            <button
                                style={
                                    typeChosen === 'GRUA'
                                        ? {
                                              border: '3px solid #ccd8ff',
                                              borderRadius: '0.8rem',
                                          }
                                        : {}
                                }
                                type="button"
                                className="category-type"
                                onClick={() => {
                                    setTypeChosen('GRUA')
                                    setCategory({
                                        label: '',
                                        type: CategoryType.SINGLE_BOX_SINGLE_STOCK,
                                        boxes: [
                                            {
                                                label: '',
                                                counters: [
                                                    {
                                                        isDigital: true,
                                                        isMechanical: true,
                                                        pin: 2,
                                                        counterTypeId:
                                                            counterTypes.find(
                                                                (c) =>
                                                                    c.label ===
                                                                    'Noteiro'
                                                            )?.id || '',
                                                    },
                                                    {
                                                        isDigital: true,
                                                        isMechanical: true,
                                                        pin: 3,
                                                        counterTypeId:
                                                            counterTypes.find(
                                                                (c) =>
                                                                    c.label ===
                                                                    'Pr??mio'
                                                            )?.id || '',
                                                    },
                                                ],
                                            },
                                        ],
                                    })
                                }}
                            >
                                <div className="title">
                                    <h2 className="f14-700-dark">Grua ??nica</h2>
                                    <FiInfo />
                                </div>
                                <div className="img">
                                    <img src={CategoryImg} alt="" />
                                </div>
                            </button>
                            <button
                                type="button"
                                className="category-type"
                                onClick={() => setTypeChosen('MULTI_BOXES')}
                                style={
                                    typeChosen === 'MULTI_BOXES'
                                        ? {
                                              border: '3px solid #ccd8ff',
                                              borderRadius: '0.8rem',
                                          }
                                        : {}
                                }
                            >
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
                            <button
                                type="button"
                                className="category-type"
                                onClick={() => setTypeChosen('MULTI_STOCKS')}
                                style={
                                    typeChosen === 'MULTI_STOCKS'
                                        ? {
                                              border: '3px solid #ccd8ff',
                                              borderRadius: '0.8rem',
                                          }
                                        : {}
                                }
                            >
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
                            <button
                                type="button"
                                className="category-type"
                                onClick={() => {
                                    setTypeChosen('NO_OUT')
                                    setCategory({
                                        label: '',
                                        type: CategoryType.NO_PRIZE,
                                        boxes: [
                                            {
                                                label: '',
                                                counters: [
                                                    {
                                                        isDigital: true,
                                                        isMechanical: true,
                                                        pin: 2,
                                                        counterTypeId:
                                                            counterTypes.find(
                                                                (c) =>
                                                                    c.label ===
                                                                    'Noteiro'
                                                            )?.id || '',
                                                    },
                                                ],
                                            },
                                        ],
                                    })
                                }}
                                style={
                                    typeChosen === 'NO_OUT'
                                        ? {
                                              border: '3px solid #ccd8ff',
                                              borderRadius: '0.8rem',
                                          }
                                        : {}
                                }
                            >
                                <div className="title">
                                    <h2 className="f14-700-dark">Sem sa??da</h2>
                                    <FiInfo />
                                </div>
                                <div className="img">
                                    <img src={CategoryImg} alt="" />
                                </div>
                            </button>
                            {/* <button
                                type="button"
                                className="category-type"
                                onClick={() => {
                                    setCategory({
                                        label: '',
                                        sharedSupply: false,
                                        sharedVault: false,
                                        boxes: [
                                            {
                                                label: '',
                                                counters: [
                                                    {
                                                        isDigital: true,
                                                        isMechanical: true,
                                                        pin: 2,
                                                        counterTypeId:
                                                            counterTypes.find(
                                                                (c) =>
                                                                    c.label ===
                                                                    'Noteiro'
                                                            )?.id || '',
                                                    },
                                                    {
                                                        isDigital: true,
                                                        isMechanical: true,
                                                        pin: 3,
                                                        counterTypeId:
                                                            counterTypes.find(
                                                                (c) =>
                                                                    c.label ===
                                                                    'Pr??mio'
                                                            )?.id || '',
                                                    },
                                                ],
                                            },
                                        ],
                                    })
                                    setTypeChosen('CUSTOM')
                                }}
                                style={
                                    typeChosen === 'CUSTOM'
                                        ? {
                                              border: '3px solid #ccd8ff',
                                              borderRadius: '0.8rem',
                                          }
                                        : {}
                                }
                            >
                                <div className="title">
                                    <h2 className="f14-700-dark">
                                        Criar uma nova
                                    </h2>
                                    <FiInfo />
                                </div>
                                <div className="img">
                                    <img src={CategoryImg} alt="" />
                                </div>
                            </button> */}
                        </div>
                        <div className="action-btns">
                            <Button
                                type="button"
                                buttonType="TEXT"
                                color="WARNING"
                                text="Cancelar"
                                onClick={() => {
                                    setStep('ONE')
                                    setCategory(undefined)
                                    setTypeChosen(undefined)
                                    onRequestClose()
                                }}
                            />
                            <Button
                                type="button"
                                buttonType="FILLED"
                                color="SECONDARY"
                                text="Pr??ximo"
                                onClick={() => {
                                    if (category || typeChosen) {
                                        setStep('TWO')
                                    } else {
                                        toast.info(
                                            'Selecione um tipo de modelo para prosseguir'
                                        )
                                    }
                                }}
                            />
                        </div>
                    </div>
                )}
                {/* ----------------------  STEP TWO ------------------- */}
                {step === 'TWO' && (
                    <div className="build-category">
                        {!category && typeChosen === 'MULTI_BOXES' && (
                            <div className="choose-boxes">
                                <h1 className="f16-700-primary-dark">
                                    Quantas cabines o seu modelo possui?
                                </h1>
                                <SelectInput
                                    className="select"
                                    name="numberOfBoxes"
                                    options={[
                                        { label: '1 cabine', value: 1 },
                                        { label: '2 cabine', value: 2 },
                                        { label: '3 cabine', value: 3 },
                                        { label: '4 cabine', value: 4 },
                                        { label: '5 cabine', value: 5 },
                                        { label: '6 cabine', value: 6 },
                                    ]}
                                    onChange={(e) => {
                                        if (e) {
                                            setCategory((state) => {
                                                const boxes = []
                                                for (
                                                    let index = 0;
                                                    index < e.value;
                                                    index++
                                                ) {
                                                    boxes.push({
                                                        label: `Cabine ${boxes.length}`,
                                                        counters: [
                                                            {
                                                                isDigital: true,
                                                                isMechanical:
                                                                    true,
                                                                pin:
                                                                    boxes.length +
                                                                    2 +
                                                                    index,
                                                                counterTypeId:
                                                                    counterTypes.find(
                                                                        (c) =>
                                                                            c.label ===
                                                                            'Noteiro'
                                                                    )?.id || '',
                                                            },
                                                            {
                                                                isDigital: true,
                                                                isMechanical:
                                                                    true,
                                                                pin:
                                                                    boxes.length +
                                                                    3 +
                                                                    index,
                                                                counterTypeId:
                                                                    counterTypes.find(
                                                                        (c) =>
                                                                            c.label ===
                                                                            'Pr??mio'
                                                                    )?.id || '',
                                                            },
                                                        ],
                                                    })
                                                }
                                                state = {
                                                    label: '',
                                                    boxes,
                                                    type: CategoryType.MULTIPLE_BOXES_MULTIPLE_STOCKS,
                                                }
                                                return { ...state }
                                            })
                                        }
                                    }}
                                />
                            </div>
                        )}
                        {!category && typeChosen === 'MULTI_STOCKS' && (
                            <div className="choose-boxes">
                                <h1 className="f16-700-primary-dark">
                                    Quantos estoques o seu modelo possui?
                                </h1>
                                <SelectInput
                                    className="select"
                                    name="numberOfBoxes"
                                    options={[
                                        { label: '1 estoque', value: 1 },
                                        { label: '2 estoques', value: 2 },
                                        { label: '3 estoques', value: 3 },
                                        { label: '4 estoques', value: 4 },
                                        { label: '5 estoques', value: 5 },
                                        { label: '6 estoques', value: 6 },
                                    ]}
                                    onChange={(e) => {
                                        if (e) {
                                            setCategory((state) => {
                                                const counters = []
                                                counters.push({
                                                    isDigital: true,
                                                    isMechanical: true,
                                                    pin: 2,
                                                    counterTypeId:
                                                        counterTypes.find(
                                                            (c) =>
                                                                c.label ===
                                                                'Noteiro'
                                                        )?.id || '',
                                                })
                                                for (
                                                    let index = 0;
                                                    index < e.value;
                                                    index++
                                                ) {
                                                    counters.push({
                                                        isDigital: true,
                                                        isMechanical: true,
                                                        pin: 3 + index,
                                                        counterTypeId:
                                                            counterTypes.find(
                                                                (c) =>
                                                                    c.label ===
                                                                    'Pr??mio'
                                                            )?.id || '',
                                                    })
                                                }
                                                state = {
                                                    label: '',
                                                    type: CategoryType.SINGLE_BOX_MULTIPLE_STOCKS,
                                                    boxes: [
                                                        {
                                                            label: `Cabine ${state?.boxes.length}`,
                                                            counters,
                                                        },
                                                    ],
                                                }
                                                return { ...state }
                                            })
                                        }
                                    }}
                                />
                            </div>
                        )}
                        <div className="category-container">
                            {category &&
                                category.boxes.map((box, index) => {
                                    return (
                                        <div
                                            className="category-box"
                                            key={v4()}
                                        >
                                            {typeChosen === 'CUSTOM' && (
                                                <button
                                                    type="button"
                                                    className="delete-box"
                                                    onClick={() =>
                                                        setCategory((state) => {
                                                            state = category
                                                            state.boxes.splice(
                                                                index,
                                                                1
                                                            )
                                                            return {
                                                                ...state,
                                                            }
                                                        })
                                                    }
                                                >
                                                    <FiXCircle />
                                                </button>
                                            )}
                                            <div className="header">
                                                <div className="title">
                                                    <SimpleInput
                                                        name={`box${index + 1}`}
                                                        label={`Cabine ${
                                                            index + 1
                                                        }`}
                                                        onChange={(e: any) => {
                                                            if (e) {
                                                                setCategory(
                                                                    (state) => {
                                                                        if (
                                                                            state
                                                                        ) {
                                                                            state.boxes[
                                                                                index
                                                                            ].label =
                                                                                e.target.value.toString()
                                                                        }
                                                                        return state
                                                                    }
                                                                )
                                                            }
                                                        }}
                                                    />
                                                </div>
                                                <button type="button">
                                                    <RiArrowUpSLine />
                                                </button>
                                            </div>
                                            <div className="category-content">
                                                <div className="titles">
                                                    <h1 className="f14-500-gray ">
                                                        Contador
                                                    </h1>
                                                    <h1 className="f14-500-gray ">
                                                        Telemetria
                                                    </h1>
                                                    <h1 className="f14-500-gray ">
                                                        Digital
                                                    </h1>
                                                    <h1 className="f14-500-gray ">
                                                        Anal??gico
                                                    </h1>
                                                </div>
                                                {box.counters.map(
                                                    (counter, idx) => {
                                                        return (
                                                            <div
                                                                className="category-form"
                                                                key={v4()}
                                                            >
                                                                <SmallSelectInput
                                                                    name="counterType"
                                                                    value={{
                                                                        label:
                                                                            counterTypes.find(
                                                                                (
                                                                                    c
                                                                                ) =>
                                                                                    c.id ===
                                                                                    counter.counterTypeId
                                                                            )
                                                                                ?.label ||
                                                                            'Selecione',
                                                                        value: counter.counterTypeId,
                                                                    }}
                                                                    onChange={(
                                                                        e
                                                                    ) => {
                                                                        if (e) {
                                                                            setCategory(
                                                                                (
                                                                                    state
                                                                                ) => {
                                                                                    state =
                                                                                        category
                                                                                    state.boxes[
                                                                                        index
                                                                                    ].counters[
                                                                                        idx
                                                                                    ].counterTypeId =
                                                                                        e.value
                                                                                    return {
                                                                                        ...state,
                                                                                    }
                                                                                }
                                                                            )
                                                                        }
                                                                    }}
                                                                    options={counterTypes.map(
                                                                        (c) => {
                                                                            return {
                                                                                label: c.label,
                                                                                value: c.id,
                                                                            }
                                                                        }
                                                                    )}
                                                                />
                                                                <SmallSelectInput
                                                                    name="pin"
                                                                    value={{
                                                                        label:
                                                                            counter.pin ===
                                                                            0
                                                                                ? 'Selecione'
                                                                                : `Pino ${counter.pin}`,
                                                                        value: counter.pin,
                                                                    }}
                                                                    onChange={(
                                                                        e
                                                                    ) => {
                                                                        if (e) {
                                                                            setCategory(
                                                                                (
                                                                                    state
                                                                                ) => {
                                                                                    state =
                                                                                        category
                                                                                    state.boxes[
                                                                                        index
                                                                                    ].counters[
                                                                                        idx
                                                                                    ].pin =
                                                                                        e.value
                                                                                    return {
                                                                                        ...state,
                                                                                    }
                                                                                }
                                                                            )
                                                                        }
                                                                    }}
                                                                    options={getPins().map(
                                                                        (p) => {
                                                                            return {
                                                                                label: `Pino ${p}`,
                                                                                value: p,
                                                                            }
                                                                        }
                                                                    )}
                                                                />
                                                                <div className="type-input">
                                                                    <input
                                                                        type="checkbox"
                                                                        checked={
                                                                            category
                                                                                .boxes[
                                                                                index
                                                                            ]
                                                                                .counters[
                                                                                idx
                                                                            ]
                                                                                .isDigital
                                                                        }
                                                                        onChange={(
                                                                            e
                                                                        ) =>
                                                                            setCategory(
                                                                                (
                                                                                    state
                                                                                ) => {
                                                                                    state =
                                                                                        category
                                                                                    state.boxes[
                                                                                        index
                                                                                    ].counters[
                                                                                        idx
                                                                                    ].isDigital =
                                                                                        e.target.checked
                                                                                    return {
                                                                                        ...state,
                                                                                    }
                                                                                }
                                                                            )
                                                                        }
                                                                    />
                                                                </div>
                                                                <div className="type-input">
                                                                    <input
                                                                        type="checkbox"
                                                                        checked={
                                                                            category
                                                                                .boxes[
                                                                                index
                                                                            ]
                                                                                .counters[
                                                                                idx
                                                                            ]
                                                                                .isMechanical
                                                                        }
                                                                        onChange={(
                                                                            e
                                                                        ) =>
                                                                            setCategory(
                                                                                (
                                                                                    state
                                                                                ) => {
                                                                                    state =
                                                                                        category
                                                                                    state.boxes[
                                                                                        index
                                                                                    ].counters[
                                                                                        idx
                                                                                    ].isMechanical =
                                                                                        e.target.checked
                                                                                    return {
                                                                                        ...state,
                                                                                    }
                                                                                }
                                                                            )
                                                                        }
                                                                    />
                                                                </div>
                                                                <button
                                                                    type="button"
                                                                    className="delete-counter"
                                                                    onClick={() =>
                                                                        setCategory(
                                                                            (
                                                                                state
                                                                            ) => {
                                                                                state =
                                                                                    category
                                                                                state.boxes[
                                                                                    index
                                                                                ].counters.splice(
                                                                                    idx,
                                                                                    1
                                                                                )
                                                                                return {
                                                                                    ...state,
                                                                                }
                                                                            }
                                                                        )
                                                                    }
                                                                >
                                                                    <FiXCircle />
                                                                </button>
                                                            </div>
                                                        )
                                                    }
                                                )}
                                                <div className="add-counter-btn">
                                                    <button
                                                        type="button"
                                                        onClick={() => {
                                                            setCategory(
                                                                (state) => {
                                                                    state =
                                                                        category
                                                                    state.boxes[
                                                                        index
                                                                    ].counters.push(
                                                                        {
                                                                            isDigital:
                                                                                false,
                                                                            isMechanical:
                                                                                false,
                                                                            pin: 0,
                                                                            counterTypeId:
                                                                                '',
                                                                        }
                                                                    )
                                                                    return {
                                                                        ...state,
                                                                    }
                                                                }
                                                            )
                                                        }}
                                                    >
                                                        Adicionar contador
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })}
                            {typeChosen === 'CUSTOM' && (
                                <div className="add-box">
                                    <button
                                        className="add-box-btn"
                                        type="button"
                                        onClick={() => {
                                            if (category) {
                                                setCategory((state) => {
                                                    state = category
                                                    state.boxes.push({
                                                        label: '',
                                                        counters: [
                                                            {
                                                                isDigital: true,
                                                                isMechanical:
                                                                    true,
                                                                pin: 2,
                                                                counterTypeId:
                                                                    counterTypes.find(
                                                                        (c) =>
                                                                            c.label ===
                                                                            'Noteiro'
                                                                    )?.id || '',
                                                            },
                                                            {
                                                                isDigital: true,
                                                                isMechanical:
                                                                    true,
                                                                pin: 3,
                                                                counterTypeId:
                                                                    counterTypes.find(
                                                                        (c) =>
                                                                            c.label ===
                                                                            'Pr??mio'
                                                                    )?.id || '',
                                                            },
                                                        ],
                                                    })
                                                    return {
                                                        ...state,
                                                    }
                                                })
                                            }
                                        }}
                                    >
                                        Adicionar cabine
                                    </button>
                                </div>
                            )}

                            <div className="action-btns">
                                <Button
                                    type="button"
                                    buttonType="TEXT"
                                    color="WARNING"
                                    text="Cancelar"
                                    onClick={() => {
                                        setCategory(undefined)
                                        onRequestClose()
                                    }}
                                />
                                <div className="step-btns">
                                    <Button
                                        type="button"
                                        buttonType="TEXT"
                                        color="PRIMARY"
                                        text="Anterior"
                                        onClick={() => {
                                            setCategory(undefined)
                                            setStep('ONE')
                                        }}
                                    />
                                    <Button
                                        type="button"
                                        buttonType="FILLED"
                                        color="SECONDARY"
                                        text="Pr??ximo"
                                        onClick={() => {
                                            let shouldStepThree = true
                                            category?.boxes.forEach(
                                                (box, index) => {
                                                    if (
                                                        box.label === '' ||
                                                        box.label === undefined
                                                    ) {
                                                        setCategory((state) => {
                                                            if (state) {
                                                                state.boxes[
                                                                    index
                                                                ].label = `Cabine ${
                                                                    index + 1
                                                                }`
                                                            }
                                                            return state
                                                        })
                                                    }
                                                    box.counters.forEach(
                                                        (counter) => {
                                                            if (
                                                                counter.counterTypeId ===
                                                                    '' ||
                                                                counter.pin ===
                                                                    0
                                                            ) {
                                                                shouldStepThree =
                                                                    false
                                                            }
                                                        }
                                                    )
                                                }
                                            )
                                            if (shouldStepThree) {
                                                setStep('THREE')
                                            } else {
                                                toast.warning(
                                                    'Verifique se voc?? preencheu todos os campos corretamente'
                                                )
                                            }
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                )}
                {/* ----------------------  STEP THREE ------------------- */}
                {step === 'THREE' && category && (
                    <div className="category-config">
                        <h1 className="f16-700-primary-dark">
                            O estoque na m??quina ?? compartilhado entre as
                            cabines?
                        </h1>
                        <div className="action-config">
                            <label
                                className="config-label"
                                htmlFor="sharedSupply"
                            >
                                SIM
                                <input
                                    type="checkbox"
                                    id="sharedSupply"
                                    checked={
                                        category.type ===
                                        CategoryType.MULTIPLE_BOXES_SINGLE_STOCK
                                    }
                                    disabled={
                                        typeChosen === 'GRUA' ||
                                        (typeChosen === 'MULTI_STOCKS' && true)
                                    }
                                    onChange={(e) => {
                                        setCategory((state) => {
                                            if (
                                                state?.type ===
                                                CategoryType.MULTIPLE_BOXES_MULTIPLE_STOCKS
                                            ) {
                                                state.type =
                                                    CategoryType.MULTIPLE_BOXES_SINGLE_STOCK
                                            }
                                            state = category

                                            return { ...state }
                                        })
                                    }}
                                />
                            </label>
                            <label
                                className="config-label"
                                htmlFor="unSharedSupply"
                            >
                                N??O
                                <input
                                    type="checkbox"
                                    id="unSharedSupply"
                                    checked={
                                        category.type !==
                                        CategoryType.MULTIPLE_BOXES_SINGLE_STOCK
                                    }
                                    disabled={
                                        typeChosen === 'GRUA' ||
                                        (typeChosen === 'MULTI_STOCKS' && true)
                                    }
                                    onChange={(e) => {
                                        setCategory((state) => {
                                            if (
                                                state?.type ===
                                                CategoryType.MULTIPLE_BOXES_SINGLE_STOCK
                                            ) {
                                                state.type =
                                                    CategoryType.MULTIPLE_BOXES_MULTIPLE_STOCKS
                                            }
                                            state = category

                                            return { ...state }
                                        })
                                    }}
                                />
                            </label>
                        </div>
                        {/* <h1 className="f16-700-primary-dark">
                            A m??quina possui cofres separados por cabine?
                        </h1>
                        <div className="action-config">
                            <label
                                className="config-label"
                                htmlFor="sharedVault"
                            >
                                SIM
                                <input
                                    type="checkbox"
                                    id="sharedVault"
                                    checked={category.sharedVault}
                                    disabled={typeChosen === 'GRUA' && true}
                                    onChange={(e) => {
                                        setCategory((state) => {
                                            state = category
                                            state.sharedVault = e.target.checked
                                            return { ...state }
                                        })
                                    }}
                                />
                            </label>
                            <label
                                className="config-label"
                                htmlFor="unSharedVault"
                            >
                                N??O
                                <input
                                    type="checkbox"
                                    id="unSharedVault"
                                    checked={!category.sharedVault}
                                    disabled={typeChosen === 'GRUA' && true}
                                    onChange={(e) => {
                                        setCategory((state) => {
                                            state = category
                                            state.sharedVault =
                                                !e.target.checked
                                            return { ...state }
                                        })
                                    }}
                                />
                            </label>
                        </div> */}
                        <div className="action-btns">
                            <Button
                                type="button"
                                buttonType="TEXT"
                                color="WARNING"
                                text="Cancelar"
                                onClick={() => {
                                    setStep('ONE')
                                    setCategory(undefined)
                                    setTypeChosen(undefined)
                                    onRequestClose()
                                }}
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
                                    text="Pr??ximo"
                                    onClick={() => setStep('FOUR')}
                                />
                            </div>
                        </div>
                    </div>
                )}
                {/* ----------------------- STEP FOUR --------------------- */}
                {step === 'FOUR' && category && (
                    <div className="category-name">
                        <h1 className="f16-700-primary-dark">Nome do modelo</h1>
                        <SimpleInput
                            name="categoryName"
                            onChange={(e) => {
                                setCategory((state) => {
                                    state = category
                                    state.label = e.target.value
                                    return { ...state }
                                })
                            }}
                        />
                        <div className="action-btns">
                            <Button
                                type="button"
                                buttonType="TEXT"
                                color="WARNING"
                                text="Cancelar"
                                onClick={() => {
                                    setStep('ONE')
                                    setCategory(undefined)
                                    setTypeChosen(undefined)
                                    onRequestClose()
                                }}
                            />
                            <div className="step-btns">
                                <Button
                                    type="button"
                                    buttonType="TEXT"
                                    color="PRIMARY"
                                    text="Anterior"
                                    onClick={() => setStep('FOUR')}
                                />
                                <Button
                                    type="button"
                                    buttonType="FILLED"
                                    color="SECONDARY"
                                    text="Criar"
                                    onClick={async () => {
                                        await createCategory(category)
                                        setStep('FIVE')
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                )}
                {/* ------------------------ STEP FIVE -------------------- */}
                {step === 'FIVE' && (
                    <div className="category-finished">
                        <img className="check" src={CheckImg} alt="" />
                        <h1 className="f24-700-primary-dark">Modelo criado!</h1>
                        <div className="action-btns">
                            <Button
                                type="button"
                                buttonType="FILLED"
                                color="SECONDARY"
                                text="Sair"
                                onClick={() => onRequestClose()}
                            />
                        </div>
                    </div>
                )}
            </CreateCategoryContent>
        </ModalContainer>
    )
}
