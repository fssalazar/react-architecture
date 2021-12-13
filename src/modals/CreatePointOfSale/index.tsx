/* eslint-disable no-unused-expressions */
/* eslint-disable no-plusplus */
/* eslint-disable no-param-reassign */
/* eslint-disable react/require-default-props */
import { FormHandles, Scope } from '@unform/core'
import * as Yup from 'yup'
import { Form } from '@unform/web'
import React, { useEffect, useRef, useState } from 'react'
import ModalContainer from 'react-modal'
import cep from 'cep-promise'
import { v4 } from 'uuid'
import { toast } from 'react-toastify'
import { Button } from '../../components/Button'
import { Input } from '../../unformInputs/Input'
import { getValidationErrors } from '../../utils/getValidationErrors'
import { CreatePointOfSaleContent } from './styles'
import { handlePointOfSaleDto } from '../../dtos/createPointOfSale'
import { formatCep, unFormatCep } from '../../utils/maskFunctions'

interface Props {
    isOpen: boolean
    onRequestClose: () => void
}

export function CreatePointOfSale({ isOpen, onRequestClose }: Props) {
    // hooks

    // refs
    const formRef = useRef<FormHandles>(null)
    // state
    const [busyBtn, setBusyBtn] = useState(false)
    const [loadingCepResponse, setLoadingCepResponse] = useState<boolean>(false)
    const [cepFormatted, setCepFormatted] = useState<string>()

    async function handlePointOfSale(data: handlePointOfSaleDto) {
        setBusyBtn(true)
        try {
            formRef.current?.setErrors({})
            const schema = Yup.object().shape({
                label: Yup.string().required(
                    'Insira o nome do seu ponto de venda'
                ),
                manager: Yup.string().required('Insira o nome do contato'),
                phoneNumber: Yup.string().required(
                    'Insira um telefone para contato'
                ),
                address: Yup.object().shape({
                    zipCode: Yup.string().required(
                        'Insira o cep do ponto de venda'
                    ),
                    street: Yup.string().required(
                        'Insira o nome da rua do ponto de venda.'
                    ),
                    neighborhood: Yup.string().required(
                        'Insira o nome do bairro do ponto de venda.'
                    ),
                    state: Yup.string().required(
                        'Insira o estado do ponto de venda'
                    ),
                    city: Yup.string().required(
                        'Insira a cidade do ponto de venda'
                    ),
                    number: Yup.string().required('Insira um número'),
                }),
            })
            console.log(data)
            await schema.validate(data, {
                abortEarly: false,
            })
        } catch (error) {
            setBusyBtn(false)
            console.log(error)
            if (error instanceof Yup.ValidationError) {
                const errors = getValidationErrors(error)
                formRef.current?.setErrors(errors)
            }
        }
    }

    async function handleCep(data: string) {
        setLoadingCepResponse(true)
        try {
            const response = await cep(data)
            if (response) {
                formRef.current?.setData({
                    address: {
                        state: response.state,
                        city: response.city,
                        neighborhood: response.neighborhood,
                        street: response.street,
                    },
                })
            }
            setLoadingCepResponse(false)
        } catch (error) {
            setLoadingCepResponse(false)
            toast.warning('CEP não encontrado')
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
            <CreatePointOfSaleContent>
                <div className="title">
                    <h1 className="f24-700-primary-dark">
                        Criar ponto de venda
                    </h1>
                </div>
                <Form ref={formRef} onSubmit={handlePointOfSale}>
                    <div style={{ marginBottom: '1.5rem' }}>
                        <Input name="label" label="Nome do local" />
                    </div>
                    <Scope path="address">
                        <div className="grid grid-3-2-1">
                            <Input
                                name="zipCode"
                                label="CEP"
                                value={cepFormatted}
                                onChange={(e) => {
                                    if (e.target.value.length < 10) {
                                        formatCep(e.target.value)
                                        setCepFormatted(
                                            formatCep(e.target.value)
                                        )
                                    }
                                    if (
                                        e.target.value.replaceAll('-', '')
                                            .length === 8
                                    ) {
                                        handleCep(unFormatCep(e.target.value))
                                    }
                                }}
                            />
                            <Input name="street" label="Endereço" />
                            <Input name="number" label="Número" />
                        </div>
                        <div className="grid grid-1-1">
                            <Input name="neighborhood" label="Bairro" />
                            <Input name="city" label="Cidade" />
                        </div>
                        <div className="grid grid-1-1">
                            <Input name="state" label="Estado" />
                            <Input name="complement" label="Complemento" />
                        </div>
                    </Scope>
                    <div className="grid grid-1-1">
                        <Input name="manager" label="Responsável" />
                        <Input name="phoneNumber" label="Contato" />
                    </div>
                    <div className="grid grid-2-3">
                        <Input name="rent" label="Aluguel" />
                        <div className="is-percentage" />
                    </div>
                    <div className="btns">
                        <Button
                            text="Cancelar"
                            type="button"
                            buttonType="TEXT"
                            color="WARNING"
                        />
                        <Button
                            text="Salvar"
                            type="submit"
                            buttonType="FILLED"
                            color="SECONDARY"
                        />
                    </div>
                </Form>
            </CreatePointOfSaleContent>
        </ModalContainer>
    )
}
