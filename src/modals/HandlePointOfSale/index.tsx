/* eslint-disable no-unused-expressions */
/* eslint-disable no-plusplus */
/* eslint-disable no-param-reassign */
/* eslint-disable react/require-default-props */
import { FormHandles, Scope } from '@unform/core'
import * as Yup from 'yup'
import { Form } from '@unform/web'
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import ModalContainer from 'react-modal'
import cep from 'cep-promise'
import { toast } from 'react-toastify'
import { Button } from '../../components/Button'
import { Input } from '../../unformInputs/Input'
import { getValidationErrors } from '../../utils/getValidationErrors'
import { CreatePointOfSaleContent } from './styles'
import { handlePointOfSaleDto } from '../../dtos/handlePointOfSale'
import {
    formatCep,
    phoneFormatter,
    unFormatCep,
} from '../../utils/maskFunctions'
import { usePointOfSale } from '../../hooks/usePointOfSale'
import { PointOfSale } from '../../entities/pointOfSale'

interface Props {
    isOpen: boolean
    onRequestClose: () => void
    pointOfSale?: PointOfSale
}

export function HandlePointOfSale({
    isOpen,
    onRequestClose,
    pointOfSale,
}: Props) {
    // hooks
    const { createPointOfSale, editPointOfSale } = usePointOfSale()
    // refs
    const formRef = useRef<FormHandles>(null)
    // state
    const [busyBtn, setBusyBtn] = useState(false)
    const [busy, setBusy] = useState(false)
    const [loadingCepResponse, setLoadingCepResponse] = useState<boolean>(false)
    const [cepFormatted, setCepFormatted] = useState<string>()
    const [phoneFormatted, setPhoneFormatted] = useState<string>()

    setTimeout(() => {
        if (pointOfSale) {
            formRef.current?.setData({
                label: pointOfSale.label,
                manager: pointOfSale.manager || '',
                phoneNumber: pointOfSale.phoneNumber || '',
                address: {
                    zipCode: pointOfSale.address?.zipCode || '',
                    street: pointOfSale.address?.street || '',
                    neighborhood: pointOfSale.address?.neighborhood || '',
                    state: pointOfSale.address?.state || '',
                    city: pointOfSale.address?.city || '',
                    number: pointOfSale.address?.number || '',
                    complement: pointOfSale.address?.complement || '',
                },
            })
        }
    }, 500)

    async function handlePointOfSale(data: handlePointOfSaleDto) {
        setBusyBtn(true)
        try {
            formRef.current?.setErrors({})
            const schema = Yup.object().shape({
                label: Yup.string().required(
                    'Insira o nome do seu ponto de venda'
                ),
            })
            await schema.validate(data, {
                abortEarly: false,
            })
            if (pointOfSale) {
                const response = await editPointOfSale(data, pointOfSale.id)
                if (response) {
                    toast.success(
                        `Ponto de venda ${data.label} editado com sucesso`
                    )
                }
                setBusyBtn(false)
                onRequestClose()
                return
            }
            const createPointOfSaleData: handlePointOfSaleDto = {
                ...data,
            }
            if (cepFormatted && data.address?.number === '') {
                toast.warning(
                    'Verifique se voc?? preencheu o n??mero corretamente'
                )
                setBusyBtn(false)
                return
            }
            const response = await createPointOfSale(createPointOfSaleData)
            if (response) {
                toast.success(`Ponto de venda ${data.label} criado com sucesso`)
                setBusyBtn(false)
                onRequestClose()
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
            toast.warning('CEP n??o encontrado')
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
                <CreatePointOfSaleContent>
                    <div className="title">
                        <h1 className="f24-700-primary-dark">
                            Criar ponto de venda
                        </h1>
                    </div>
                    <Form
                        ref={formRef}
                        onSubmit={handlePointOfSale}
                        noValidate
                        id="form-points
                    "
                    >
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
                                            handleCep(
                                                unFormatCep(e.target.value)
                                            )
                                        }
                                    }}
                                />
                                <Input
                                    name="street"
                                    label={pointOfSale ? '' : 'Endere??o'}
                                    disabled={!cepFormatted}
                                />
                                <Input name="number" label="N??mero" />
                            </div>
                            <div className="grid grid-1-1">
                                <Input
                                    name="neighborhood"
                                    label={pointOfSale ? '' : 'Bairro'}
                                    disabled={!cepFormatted}
                                />
                                <Input
                                    name="city"
                                    label={pointOfSale ? '' : 'Cidade'}
                                    disabled={!cepFormatted}
                                />
                            </div>
                            <div className="grid grid-1-1">
                                <Input
                                    name="state"
                                    label={pointOfSale ? '' : 'Estado'}
                                />
                                <Input name="complement" label="Complemento" />
                            </div>
                        </Scope>
                        <div className="grid grid-1-1">
                            <Input name="manager" label="Respons??vel" />
                            <Input
                                name="phoneNumber"
                                label="Contato"
                                value={phoneFormatted}
                                onChange={(e) =>
                                    setPhoneFormatted(
                                        phoneFormatter(e.target.value, 'INPUT')
                                    )
                                }
                            />
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
                </CreatePointOfSaleContent>
            )}
        </ModalContainer>
    )
}
