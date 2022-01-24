/* eslint-disable react/no-array-index-key */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-plusplus */
/* eslint-disable no-param-reassign */
/* eslint-disable react/require-default-props */
import { FormHandles } from '@unform/core'
import * as Yup from 'yup'
import { Form } from '@unform/web'
import React, { useEffect, useRef, useState } from 'react'
import ModalContainer from 'react-modal'
import { toast } from 'react-toastify'
import { FiXCircle } from 'react-icons/fi'
import { RiArrowUpSLine } from 'react-icons/ri'
import { v4 } from 'uuid'
import { Button } from '../../components/Button'
import { Input } from '../../unformInputs/Input'
import { getValidationErrors } from '../../utils/getValidationErrors'
import { CreateMachineContent } from './styles'
import { HandleMachineDto } from '../../dtos/handleMachine'
import { useTelemetry } from '../../hooks/useTelemetry'
import { useCategory } from '../../hooks/useCategory'
import { useUser } from '../../hooks/use-user'
import { SelectInput } from '../../components/SelectInput'
import { usePointOfSale } from '../../hooks/usePointOfSale'
import { Box, Category } from '../../entities/category'
import { SimpleInput } from '../../components/SimpleInput'
import { SmallSelectInput } from '../../components/SmallSelectInput'
import { useMachine } from '../../hooks/use-machine'
import { Machine } from '../../entities/machine'
import { HandleUser } from '../HandleUser'
import { HandlePointOfSale } from '../HandlePointOfSale'
import { CreateCategory } from '../CreateCategory'

interface Props {
    isOpen: boolean
    machine?: Machine
    onRequestClose: () => void
}

export function HandleMachine({ isOpen, onRequestClose, machine }: Props) {
    // hooks
    const { telemetries, getTelemetries } = useTelemetry()
    const { categories, getCategories } = useCategory()
    const { users, getUsers } = useUser()
    const { pointsOfSale, getPointsOfSale } = usePointOfSale()
    const { counterTypes, getCounterTypes } = useCategory()
    const { createMachine, editMachine } = useMachine()
    // refs
    const formRef = useRef<FormHandles>(null)
    // state
    const [busyBtn, setBusyBtn] = useState(false)
    const [busy, setBusy] = useState(false)
    const [operator, setOperator] = useState<{ value: string; label: string }>({
        label: 'Selecione um operador',
        value: 'none',
    })
    const [pointOfSale, setPointOfSale] = useState<{
        label: string
        value: string
    }>({
        label: 'Selecione um ponto de venda',
        value: 'none',
    })
    const [telemetry, setTelemetry] = useState<{
        label: string
        value: string
    }>({
        label: 'Selecione uma telemetria',
        value: 'none',
    })
    const [product, setProduct] = useState<{
        label: string
        value: string
    }>({
        label: 'Selecione um produto',
        value: 'none',
    })
    const [selectedCategory, setSelectedCategory] = useState<Category>()
    const [openCreateOperator, setOpenCreateOperator] = useState(false)
    const [openPointOfSale, setOpenPointOfSale] = useState(false)
    const [openCreateCategory, setOpenCreateCategory] = useState(false)

    const pin = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]

    function getPins() {
        selectedCategory?.boxes.forEach((b) => {
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
        setTimeout(() => {
            if (machine) {
                console.log('a')
                formRef.current?.setData({
                    label: machine.label,
                    gamePrice: machine.gamePrice,
                    minStock: machine.minStock,
                })
                setSelectedCategory(machine.category)
                if (machine.operator) {
                    setOperator({
                        value: machine.operator.id,
                        label: `${machine.operator.firstName} ${machine.operator.lastName}`,
                    })
                }
                if (machine.telemetry) {
                    setTelemetry({
                        value: machine.telemetry.id,
                        label: `STG - ${machine.telemetry.id}`,
                    })
                }
                if (machine.pointOfSale) {
                    setPointOfSale({
                        value: machine.pointOfSale.id,
                        label: machine.pointOfSale.label,
                    })
                }
            }
        }, 500)

        setBusy(true)
        ;(async () => {
            await getUsers(undefined, undefined, undefined, true)
            await getTelemetries(undefined, undefined, undefined, false)
            await getCounterTypes()
            await getCategories()
            await getPointsOfSale()
            setBusy(false)
        })()
    }, [])

    async function handlePointOfSale(data: HandleMachineDto) {
        setBusyBtn(true)
        try {
            formRef.current?.setErrors({})
            const schema = Yup.object().shape({
                label: Yup.string().required(
                    'Insira o numero de série da máquina'
                ),
            })
            await schema.validate(data, {
                abortEarly: false,
            })
            if (selectedCategory) {
                selectedCategory.boxes.forEach((box) => {
                    box.counters.forEach((counter) => {
                        counter.counterTypeId =
                            counter.counterType?.id || counter.counterTypeId
                        delete counter.counterType
                    })
                })
                if (machine) {
                    const editMachineData: HandleMachineDto = {
                        minStock: data.minStock,
                        gamePrice: data.gamePrice,
                        label: data.label,
                        telemetryId: telemetry.value,
                        operatorId:
                            operator.value === 'none'
                                ? undefined
                                : operator.value,
                        pointOfSaleId:
                            pointOfSale.value === 'none'
                                ? undefined
                                : pointOfSale.value,
                        productId: undefined,
                        boxes: selectedCategory.boxes,
                    }
                    const response = await editMachine(
                        editMachineData,
                        machine.id
                    )
                    if (response) {
                        toast.success(
                            `Máquina ${data.label} editada com sucesso`
                        )
                    }
                } else {
                    const createMachineData: HandleMachineDto = {
                        minStock: data.minStock,
                        gamePrice: data.gamePrice,
                        label: data.label,
                        telemetryId: telemetry.value,
                        operatorId:
                            operator.value === 'none'
                                ? undefined
                                : operator.value,
                        pointOfSaleId:
                            pointOfSale.value === 'none'
                                ? undefined
                                : pointOfSale.value,
                        productId: undefined,
                        categoryId: selectedCategory.id,
                        boxes: selectedCategory.boxes,
                    }
                    const response = await createMachine(createMachineData)
                    if (response) {
                        toast.success(
                            `Máquina ${data.label} criada com sucesso`
                        )
                    }
                }
            } else {
                toast.info(
                    `Para criar uma máquina é necessário selecionar um modelo`
                )
                setBusyBtn(false)
                return
            }

            setBusyBtn(false)
        } catch (error) {
            toast.warning(
                'Verifique se todos os campos foram preenchidos corretamente'
            )
            setBusyBtn(false)
            if (error instanceof Yup.ValidationError) {
                const errors = getValidationErrors(error)
                formRef.current?.setErrors(errors)
            }
        }
    }

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
            {busy ? (
                <div />
            ) : (
                <CreateMachineContent>
                    <div className="title">
                        <h1 className="f24-700-primary-dark">
                            {machine
                                ? `Edita máquina ${machine.label}`
                                : 'Criar nova máquina'}
                        </h1>
                    </div>
                    <Form
                        ref={formRef}
                        onSubmit={handlePointOfSale}
                        noValidate
                        id="form-points"
                    >
                        <div className="grid grid-1-1">
                            <Input name="label" label="ID No." />
                            <SelectInput
                                name="telemetryId"
                                value={
                                    telemetry.value === 'none'
                                        ? undefined
                                        : telemetry
                                }
                                placeholder="Telemetria"
                                options={telemetries.map((telemetryTmp) => {
                                    return {
                                        value: telemetryTmp.id,
                                        label: `STG - ${telemetryTmp.id}`,
                                    }
                                })}
                                onChange={(e) => {
                                    if (e) {
                                        setTelemetry({
                                            value: e.value,
                                            label: e.label,
                                        })
                                    }
                                }}
                            />
                        </div>
                        <div className="grid grid-1-1">
                            <div className="input-btn">
                                <SelectInput
                                    name="operatorId"
                                    value={
                                        operator.value === 'none'
                                            ? undefined
                                            : operator
                                    }
                                    placeholder="Operador"
                                    options={users.map((operatorTmp) => {
                                        return {
                                            value: operatorTmp.id,
                                            label: `${operatorTmp.firstName} ${operatorTmp.lastName}`,
                                        }
                                    })}
                                    onChange={(e) => {
                                        if (e) {
                                            setOperator({
                                                value: e.value,
                                                label: e.label,
                                            })
                                        }
                                    }}
                                />
                                <button
                                    type="button"
                                    className="add-new-btn"
                                    onClick={() => setOpenCreateOperator(true)}
                                >
                                    Criar novo operador
                                </button>
                            </div>
                            <div className="input-btn">
                                <SelectInput
                                    name="pointOfSaleId"
                                    value={
                                        pointOfSale.value === 'none'
                                            ? undefined
                                            : pointOfSale
                                    }
                                    placeholder="Ponto de venda"
                                    options={pointsOfSale.map(
                                        (pointOfSaleTmp) => {
                                            return {
                                                value: pointOfSaleTmp.id,
                                                label: pointOfSaleTmp.label,
                                            }
                                        }
                                    )}
                                    onChange={(e) => {
                                        if (e) {
                                            setPointOfSale({
                                                value: e.value,
                                                label: e.label,
                                            })
                                        }
                                    }}
                                />
                                <button
                                    type="button"
                                    className="add-new-btn"
                                    onClick={() => setOpenPointOfSale(true)}
                                >
                                    Criar novo ponto de venda
                                </button>
                            </div>
                        </div>
                        <div className="grid grid-2-1-1">
                            <div className="input-btn">
                                <SelectInput
                                    name="productId"
                                    value={
                                        product.value === 'none'
                                            ? undefined
                                            : product
                                    }
                                    placeholder="Produto"
                                    options={[product]}
                                    onChange={(e) => {
                                        if (e) {
                                            setProduct({
                                                value: e.value,
                                                label: e.label,
                                            })
                                        }
                                    }}
                                />
                                <button type="button" className="add-new-btn">
                                    Criar novo produto
                                </button>
                            </div>
                            <Input
                                name="minStock"
                                label="Estoque mínimo"
                                type="number"
                            />
                            <Input
                                name="gamePrice"
                                label="Valor da jogada"
                                type="number"
                            />
                        </div>
                        <div className="category-selector">
                            {machine ? (
                                <h1>{machine.category.label}</h1>
                            ) : (
                                <div className="input-btn">
                                    <SelectInput
                                        name="categoryId"
                                        value={
                                            selectedCategory
                                                ? {
                                                      value: selectedCategory.id,
                                                      label: selectedCategory.label,
                                                  }
                                                : undefined
                                        }
                                        placeholder="Modelo"
                                        options={categories.map(
                                            (categoryTmp) => {
                                                return {
                                                    value: categoryTmp.id,
                                                    label: categoryTmp.label,
                                                }
                                            }
                                        )}
                                        onChange={(e) => {
                                            if (e) {
                                                const temp = categories.find(
                                                    (c) => c.id === e.value
                                                )
                                                const boxes: Box[] = []
                                                temp?.boxes.forEach((b) => {
                                                    boxes.push({
                                                        id: b.id,
                                                        label: b.label,
                                                        counters: [
                                                            ...b.counters,
                                                        ],
                                                    })
                                                })
                                                if (temp) {
                                                    setSelectedCategory({
                                                        ...temp,
                                                        boxes,
                                                    })
                                                }
                                            }
                                        }}
                                    />
                                    <button
                                        type="button"
                                        className="add-new-btn"
                                        onClick={() =>
                                            setOpenCreateCategory(true)
                                        }
                                    >
                                        Criar novo modelo
                                    </button>
                                </div>
                            )}
                        </div>
                        <div className="category">
                            {selectedCategory && (
                                <div className="category-container">
                                    {selectedCategory &&
                                        selectedCategory.boxes.map(
                                            (box, index) => {
                                                return (
                                                    <div
                                                        className="category-box"
                                                        key={`${index}-box`}
                                                    >
                                                        <div className="header">
                                                            <div className="title">
                                                                <SimpleInput
                                                                    name={`${index}-boxname`}
                                                                    id={`${index}-boxname`}
                                                                    value={
                                                                        selectedCategory
                                                                            .boxes[
                                                                            index
                                                                        ].label
                                                                    }
                                                                    onChange={(
                                                                        e
                                                                    ) => {
                                                                        setSelectedCategory(
                                                                            (
                                                                                state
                                                                            ) => {
                                                                                state =
                                                                                    selectedCategory
                                                                                state.boxes[
                                                                                    index
                                                                                ].label =
                                                                                    e.target.value
                                                                                return {
                                                                                    ...state,
                                                                                }
                                                                            }
                                                                        )
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
                                                                    Analógico
                                                                </h1>
                                                            </div>
                                                            {box.counters.map(
                                                                (
                                                                    counter,
                                                                    idx
                                                                ) => {
                                                                    return (
                                                                        <div
                                                                            className="category-form"
                                                                            key={v4()}
                                                                        >
                                                                            <SmallSelectInput
                                                                                name="counterType"
                                                                                value={
                                                                                    counter.counterType
                                                                                        ? {
                                                                                              value: counter
                                                                                                  .counterType
                                                                                                  .id,
                                                                                              label: counterTypes.find(
                                                                                                  (
                                                                                                      c
                                                                                                  ) =>
                                                                                                      c.id ===
                                                                                                      counter
                                                                                                          .counterType
                                                                                                          ?.id
                                                                                              )
                                                                                                  ?.label,
                                                                                          }
                                                                                        : {
                                                                                              label: 'Selecionar',
                                                                                              value: 'none',
                                                                                          }
                                                                                }
                                                                                onChange={(
                                                                                    e
                                                                                ) => {
                                                                                    if (
                                                                                        e
                                                                                    ) {
                                                                                        setSelectedCategory(
                                                                                            (
                                                                                                state
                                                                                            ) => {
                                                                                                state =
                                                                                                    selectedCategory
                                                                                                state.boxes[
                                                                                                    index
                                                                                                ].counters[
                                                                                                    idx
                                                                                                ].counterType =
                                                                                                    {
                                                                                                        label:
                                                                                                            counterTypes.find(
                                                                                                                (
                                                                                                                    c
                                                                                                                ) =>
                                                                                                                    c.id ===
                                                                                                                    e.value
                                                                                                            )
                                                                                                                ?.label ||
                                                                                                            '',
                                                                                                        id: counterTypes.find(
                                                                                                            (
                                                                                                                c
                                                                                                            ) =>
                                                                                                                c.id ===
                                                                                                                e.value
                                                                                                        )
                                                                                                            ?.id,
                                                                                                        type:
                                                                                                            counterTypes.find(
                                                                                                                (
                                                                                                                    c
                                                                                                                ) =>
                                                                                                                    c.id ===
                                                                                                                    e.value
                                                                                                            )
                                                                                                                ?.type ||
                                                                                                            '',
                                                                                                    }
                                                                                                return {
                                                                                                    ...state,
                                                                                                }
                                                                                            }
                                                                                        )
                                                                                    }
                                                                                }}
                                                                                options={counterTypes.map(
                                                                                    (
                                                                                        c
                                                                                    ) => {
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
                                                                                    if (
                                                                                        e
                                                                                    ) {
                                                                                        setSelectedCategory(
                                                                                            (
                                                                                                state
                                                                                            ) => {
                                                                                                state =
                                                                                                    selectedCategory
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
                                                                                    (
                                                                                        p
                                                                                    ) => {
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
                                                                                        selectedCategory
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
                                                                                        setSelectedCategory(
                                                                                            (
                                                                                                state
                                                                                            ) => {
                                                                                                state =
                                                                                                    selectedCategory
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
                                                                                        selectedCategory
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
                                                                                        setSelectedCategory(
                                                                                            (
                                                                                                state
                                                                                            ) => {
                                                                                                state =
                                                                                                    selectedCategory
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
                                                                                    setSelectedCategory(
                                                                                        (
                                                                                            state
                                                                                        ) => {
                                                                                            state =
                                                                                                selectedCategory
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
                                                                        setSelectedCategory(
                                                                            (
                                                                                state
                                                                            ) => {
                                                                                state =
                                                                                    selectedCategory
                                                                                state.boxes[
                                                                                    index
                                                                                ].counters.push(
                                                                                    {
                                                                                        isDigital:
                                                                                            false,
                                                                                        isMechanical:
                                                                                            false,
                                                                                        pin: 0,
                                                                                        counterType:
                                                                                            {
                                                                                                label: '',
                                                                                                type: '',
                                                                                            },
                                                                                    }
                                                                                )
                                                                                return {
                                                                                    ...state,
                                                                                }
                                                                            }
                                                                        )
                                                                    }}
                                                                >
                                                                    Adicionar
                                                                    contador
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )
                                            }
                                        )}
                                </div>
                            )}
                        </div>
                        <div className="btns">
                            <Button
                                text="Cancelar"
                                type="button"
                                buttonType="TEXT"
                                color="WARNING"
                                onClick={() => onRequestClose()}
                            />
                            <Button
                                text="Salvar"
                                type="submit"
                                buttonType="FILLED"
                                color="SECONDARY"
                                busy={busyBtn}
                            />
                        </div>
                    </Form>
                </CreateMachineContent>
            )}
            <HandleUser
                isOpen={openCreateOperator}
                onRequestClose={() => setOpenCreateOperator(false)}
            />
            <HandlePointOfSale
                isOpen={openPointOfSale}
                onRequestClose={() => setOpenPointOfSale(false)}
            />
            <CreateCategory
                isOpen={openCreateCategory}
                onRequestClose={() => setOpenCreateCategory(false)}
            />
        </ModalContainer>
    )
}
