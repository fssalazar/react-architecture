/* eslint-disable no-return-assign */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-plusplus */
/* eslint-disable no-param-reassign */
/* eslint-disable react/require-default-props */
import { FormHandles } from '@unform/core'
import * as Yup from 'yup'
import { Form } from '@unform/web'
import React, { useRef, useState } from 'react'
import ModalContainer from 'react-modal'
import { toast } from 'react-toastify'
import { Button } from '../../components/Button'
import { Input } from '../../unformInputs/Input'
import { getValidationErrors } from '../../utils/getValidationErrors'
import { CreateProductContent } from './styles'
import { CreateProductDto } from '../../dtos/CreateProduct'
import { Product } from '../../entities/product'
import { useProduct } from '../../hooks/useProduct'

interface Props {
    isOpen: boolean
    onRequestClose: () => void
    product?: Product
}

export function HandleProduct({ isOpen, onRequestClose, product }: Props) {
    // hooks
    const { createProduct, editProduct } = useProduct()
    // refs
    const formRef = useRef<FormHandles>(null)
    // state
    const [busyBtn, setBusyBtn] = useState(false)

    setTimeout(() => {
        if (product) {
            formRef.current?.setData({
                externalId: product.externalId,
                label: product.label || '',
                quantity: product.quantity || '',
            })
        }
    }, 500)

    async function handleUser(data: CreateProductDto) {
        setBusyBtn(true)
        try {
            formRef.current?.setErrors({})
            const schema = Yup.object().shape({
                label: Yup.string().required('Insira o nome do produto'),
            })
            await schema.validate(data, {
                abortEarly: false,
            })
            if (!product) {
                const response = await createProduct(data)
                if (response) {
                    toast.success(`Produto ${data.label} criado com sucesso`)
                }
            } else {
                const editProductData: CreateProductDto = {
                    label: data.label,
                    externalId: data.externalId,
                }
                const response = await editProduct(editProductData, product.id)
                if (response) {
                    toast.success(`Produto ${data.label} criado com sucesso`)
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
                    <h1 className="f24-700-primary-dark">Criar Produto</h1>
                </div>
                <Form ref={formRef} onSubmit={handleUser} noValidate>
                    <div className="form-avatar">
                        <div className="form">
                            <div className="input">
                                <Input
                                    name="externalId"
                                    label="Código do produto (opcional)"
                                />
                            </div>
                            <div className="input">
                                <Input name="label" label="Nome" />
                            </div>
                            {!product && (
                                <div className="input">
                                    <Input
                                        name="quantity"
                                        label="Quantidade inicial"
                                        type="number"
                                    />
                                </div>
                            )}
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
                        {product ? (
                            <div className="save-delete">
                                <Button
                                    text="Salvar"
                                    type="submit"
                                    buttonType="FILLED"
                                    color="SECONDARY"
                                    busy={busyBtn}
                                />
                            </div>
                        ) : (
                            <Button
                                text="Criar"
                                type="submit"
                                buttonType="FILLED"
                                color="SECONDARY"
                                busy={busyBtn}
                            />
                        )}
                    </div>
                </Form>
            </CreateProductContent>
        </ModalContainer>
    )
}
