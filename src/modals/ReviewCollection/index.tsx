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
import { FaRegMoneyBillAlt } from 'react-icons/fa'
import { RiHandCoinLine } from 'react-icons/ri'
import { Button } from '../../components/Button'
import { Input } from '../../unformInputs/Input'
import { getValidationErrors } from '../../utils/getValidationErrors'
import { CreateProductDto } from '../../dtos/CreateProduct'
import { ReviewCollectionContent } from './styles'

interface Props {
    isOpen: boolean
    onRequestClose: () => void
}

export function ReviewCollection({ isOpen, onRequestClose }: Props) {
    // hooks
    // refs
    const formRef = useRef<FormHandles>(null)
    // state
    const [busyBtn, setBusyBtn] = useState(false)
    const [description, setDescription] = useState('')

    async function handleProduct(data: CreateProductDto) {
        setBusyBtn(true)
        try {
            formRef.current?.setErrors({})
            const schema = Yup.object().shape({
                label: Yup.string().required('Insira o nome do produto'),
            })
            await schema.validate(data, {
                abortEarly: false,
            })

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

            <ReviewCollectionContent>
                <div className="title">
                    <h1 className="f24-700-primary-dark">Revisar coleta</h1>
                </div>
                <Form ref={formRef} onSubmit={handleProduct} noValidate>
                    <div className="form-avatar">
                        <div className="form">
                            <div className="input">
                                <Input
                                    name="externalId"
                                    label="Valor esperado"
                                    icon={FaRegMoneyBillAlt}
                                    disabled
                                />
                            </div>
                            <p className="paragraph">
                                O valor total que foi computado pela telemetria
                                nesta máquina durante o período.
                            </p>
                            <div className="input">
                                <Input
                                    name="label"
                                    label="Valor recolhido"
                                    icon={RiHandCoinLine}
                                />
                            </div>
                            <p className="paragraph">
                                O valor físico recolhido na máquina no momento
                                da coleta.
                            </p>
                            <div className="input-textarea">
                                <label
                                    htmlFor="description"
                                    className="description"
                                >
                                    <span className="content-name">
                                        {`Observações gerias - opcional   ${description.length}/200`}
                                    </span>
                                </label>
                                <textarea
                                    id="description"
                                    name="story"
                                    rows={5}
                                    cols={30}
                                    onChange={(e) => {
                                        if (e.target.value.length <= 200)
                                            setDescription(e.target.value)
                                    }}
                                >
                                    {description}
                                </textarea>
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

                        <Button
                            text="Revisar"
                            type="submit"
                            buttonType="FILLED"
                            color="SECONDARY"
                            busy={busyBtn}
                        />
                    </div>
                </Form>
            </ReviewCollectionContent>
        </ModalContainer>
    )
}
