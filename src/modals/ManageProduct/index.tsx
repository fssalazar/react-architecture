/* eslint-disable no-return-assign */
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
import { Button } from '../../components/Button'
import { Input } from '../../unformInputs/Input'
import { getValidationErrors } from '../../utils/getValidationErrors'
import { CreateProductContent } from './styles'
import { Product, ProductStockType } from '../../entities/product'
import { useProduct } from '../../hooks/useProduct'
import {
    totalProductInEmployee,
    totalProductInStock,
} from '../../utils/product/function'
import { useUser } from '../../hooks/use-user'
import { SelectInput } from '../../components/SelectInput'
import { TransferProductDto } from '../../dtos/transferProduct'
import { useMachine } from '../../hooks/use-machine'

interface Props {
    isOpen: boolean
    onRequestClose: () => void
    product: Product
    type:
        | 'ADD'
        | 'REMOVE'
        | 'TRANSFER_USER'
        | 'USER_TRANSFER_USER'
        | 'TRANSFER_MACHINE'
        | 'TRANSFER_STOCK'
}

export function ManageProduct({
    isOpen,
    onRequestClose,
    product,
    type,
}: Props) {
    // hooks
    const { addProduct, transferProduct } = useProduct()
    const { getUsers, users } = useUser()
    const { getMachines, machines } = useMachine()
    // refs
    const formRef = useRef<FormHandles>(null)
    // state
    const [busy, setBusy] = useState(false)
    const [busyBtn, setBusyBtn] = useState(false)
    const [operator, setOperator] = useState<{ value: string; label: string }>({
        label: 'Selecione um usuário',
        value: 'none',
    })
    const [machine, setMachine] = useState<{ value: string; label: string }>({
        label: 'Selecione uma máquina',
        value: 'none',
    })

    async function handleUser(data: { quantity: number }) {
        setBusyBtn(true)
        try {
            formRef.current?.setErrors({})
            const schema = Yup.object().shape({
                quantity: Yup.string().required('Insira uma quantidade'),
            })
            await schema.validate(data, {
                abortEarly: false,
            })
            if (type === 'ADD') {
                if (data.quantity > totalProductInStock(product)) {
                    toast.warning(
                        'Você não possui essa quantidade de itens no estoque'
                    )
                    setBusyBtn(false)

                    return
                }
                const response = await addProduct(data.quantity, product.id)
                if (response) {
                    toast.success(
                        `A quantidade de ${data.quantity} foram adicionadas ao ${product.label}`
                    )
                    onRequestClose()
                }
            }
            if (type === 'REMOVE') {
                const response = await addProduct(-data.quantity, product.id)
                if (response) {
                    toast.success(
                        `A quantidade de ${data.quantity} foram removidas do ${product.label}`
                    )
                    onRequestClose()
                }
            }
            if (type === 'TRANSFER_STOCK') {
                if (data.quantity > totalProductInEmployee(product)) {
                    toast.warning(
                        'Você não possui essa quantidade de itens no estoque'
                    )
                    setBusyBtn(false)

                    return
                }
                const transferData: TransferProductDto = {
                    from: {
                        type: ProductStockType.EMPLOYEE,
                    },
                    to: {
                        type: ProductStockType.FACTORY,
                    },
                    quantity: data.quantity,
                }
                const response = await transferProduct(
                    transferData,
                    product.id,
                    'USER'
                )
                if (response) {
                    toast.success(
                        `A quantidade de ${data.quantity} foi transferida para o usuário ${operator.label}`
                    )
                    onRequestClose()
                }
            }
            if (type === 'USER_TRANSFER_USER') {
                if (operator.value !== 'none') {
                    if (data.quantity > totalProductInEmployee(product)) {
                        toast.warning(
                            'Você não possui essa quantidade de itens no estoque'
                        )
                        setBusyBtn(false)

                        return
                    }
                    const transferData: TransferProductDto = {
                        from: {
                            type: ProductStockType.EMPLOYEE,
                        },
                        to: {
                            type: ProductStockType.EMPLOYEE,
                            id: operator.value,
                        },
                        quantity: data.quantity,
                    }
                    const response = await transferProduct(
                        transferData,
                        product.id,
                        'USER'
                    )
                    if (response) {
                        toast.success(
                            `A quantidade de ${data.quantity} foi transferida para o usuário ${operator.label}`
                        )
                        onRequestClose()
                    }
                } else {
                    toast.warning(
                        'Selecione o usuário para qual deseja efetuar a transferencia'
                    )
                }
            }
            if (type === 'TRANSFER_USER') {
                if (operator.value !== 'none') {
                    if (data.quantity > totalProductInStock(product)) {
                        toast.warning(
                            'Você não possui essa quantidade de itens no estoque'
                        )
                        setBusyBtn(false)

                        return
                    }
                    const transferData: TransferProductDto = {
                        from: {
                            type: ProductStockType.FACTORY,
                        },
                        to: {
                            type: ProductStockType.EMPLOYEE,
                            id: operator.value,
                        },
                        quantity: data.quantity,
                    }
                    const response = await transferProduct(
                        transferData,
                        product.id
                    )
                    if (response) {
                        toast.success(
                            `A quantidade de ${data.quantity} foi transferida o depósito`
                        )
                        onRequestClose()
                    }
                } else {
                    toast.warning(
                        'Selecione o usuário para qual deseja efetuar a transferencia'
                    )
                }
            }
            if (type === 'TRANSFER_MACHINE') {
                if (machine.value !== 'none') {
                    if (data.quantity > totalProductInStock(product)) {
                        toast.warning(
                            'Você não possui essa quantidade de itens no estoque'
                        )
                        setBusyBtn(false)

                        return
                    }
                    const transferData: TransferProductDto = {
                        from: {
                            type: ProductStockType.FACTORY,
                        },
                        to: {
                            type: ProductStockType.MACHINE,
                            id: machine.value,
                        },
                        quantity: data.quantity,
                    }
                    const response = await transferProduct(
                        transferData,
                        product.id
                    )
                    if (response) {
                        toast.success(
                            `A quantidade de ${data.quantity} foi transferida para a máquina ${machine.label}`
                        )
                        onRequestClose()
                    }
                } else {
                    toast.warning(
                        'Selecione a máquina para qual deseja efetuar a transferencia'
                    )
                }
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

    useEffect(() => {
        setBusy(true)
        ;(async () => {
            if (type === 'TRANSFER_USER' || type === 'USER_TRANSFER_USER') {
                await getUsers(undefined, undefined, undefined)
            }
            if (type === 'TRANSFER_MACHINE') {
                await getMachines(1000, 0)
            }
            setBusy(false)
        })()
    }, [])

    return (
        <ModalContainer
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            overlayClassName="react-modal-overlay"
            className="react-modal-product"
        >
            <button
                className="close"
                type="button"
                onClick={() => onRequestClose()}
            >
                X
            </button>

            <CreateProductContent>
                <div className="title">
                    {type === 'ADD' && (
                        <h1 className="f24-700-primary-dark">
                            Adicionar produto
                        </h1>
                    )}
                    {type === 'REMOVE' && (
                        <h1 className="f24-700-primary-dark">
                            Remover produto
                        </h1>
                    )}
                    {(type === 'TRANSFER_USER' ||
                        type === 'USER_TRANSFER_USER') && (
                        <h1 className="f24-700-primary-dark">
                            Transferir para usuário
                        </h1>
                    )}
                    {type === 'TRANSFER_MACHINE' && (
                        <h1 className="f24-700-primary-dark">
                            Transferir para máquina
                        </h1>
                    )}
                    {type === 'TRANSFER_STOCK' && (
                        <h1 className="f24-700-primary-dark">
                            Transferir para depósito
                        </h1>
                    )}
                </div>
                {busy ? (
                    <div />
                ) : (
                    <Form ref={formRef} onSubmit={handleUser} noValidate>
                        <div className="label-quantity">
                            <div className="item">
                                <h1>{product.label}</h1>
                                <p>Nome</p>
                            </div>
                            <div className="item">
                                <h1 style={{ color: 'red' }}>
                                    {type === 'TRANSFER_STOCK' ||
                                    type === 'USER_TRANSFER_USER' ? (
                                        <>{totalProductInEmployee(product)}</>
                                    ) : (
                                        <>{totalProductInStock(product)}</>
                                    )}
                                </h1>
                                <p>Quantidade</p>
                            </div>
                        </div>
                        <div className="form-avatar">
                            <div className="form">
                                {(type === 'TRANSFER_USER' ||
                                    type === 'USER_TRANSFER_USER') && (
                                    <SelectInput
                                        name="operatorId"
                                        value={
                                            operator.value === 'none'
                                                ? undefined
                                                : operator
                                        }
                                        placeholder="Usuário"
                                        options={users
                                            .filter((u) => u.type !== 'OWNER')
                                            .map((operatorTmp) => {
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
                                )}
                                {type === 'TRANSFER_MACHINE' && (
                                    <SelectInput
                                        name="operatorId"
                                        value={
                                            machine.value === 'none'
                                                ? undefined
                                                : machine
                                        }
                                        placeholder="Maquina"
                                        options={machines.map((machineTemp) => {
                                            return {
                                                value: machineTemp.id,
                                                label: machineTemp.label,
                                            }
                                        })}
                                        onChange={(e) => {
                                            if (e) {
                                                setMachine({
                                                    value: e.value,
                                                    label: e.label,
                                                })
                                            }
                                        }}
                                    />
                                )}
                                <div className="input">
                                    <Input
                                        name="quantity"
                                        label="Quantidade"
                                        type="number"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="btns">
                            <Button
                                text="Cancelar"
                                type="button"
                                buttonType="TEXT"
                                color="WARNING"
                                onClick={() => onRequestClose()}
                            />
                            <div className="save-delete">
                                <Button
                                    text="Salvar"
                                    type="submit"
                                    buttonType="FILLED"
                                    color="SECONDARY"
                                    busy={busyBtn}
                                />
                            </div>
                        </div>
                    </Form>
                )}
            </CreateProductContent>
        </ModalContainer>
    )
}
