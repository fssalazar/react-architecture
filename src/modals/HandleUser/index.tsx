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
import { CreateUserContent } from './styles'
import { HandleUserDto } from '../../dtos/handleUser'
import { useUser } from '../../hooks/use-user'
import { GeneralUser } from '../../entities/generalUser'
import { SmallSelectInput } from '../../components/SmallSelectInput'

interface Props {
    isOpen: boolean
    onRequestClose: () => void
    user?: GeneralUser
}

export function HandleUser({ isOpen, onRequestClose, user }: Props) {
    // hooks
    const { createUser, getTemplates, templates } = useUser()
    // refs
    const formRef = useRef<FormHandles>(null)
    // state
    const [selectedTemplateId, setSelectedTemplateId] = useState<string>()
    const [busyBtn, setBusyBtn] = useState(false)
    const [busy, setBusy] = useState(false)

    setTimeout(() => {
        if (user) {
            formRef.current?.setData({
                firstName: user.firstName,
                lastName: user.firstName || '',
                email: user.email || '',
            })
        }
    }, 500)

    useEffect(() => {
        setBusy(true)
        ;(async () => {
            await getTemplates()
            setBusy(false)
        })()
    }, [])

    async function handleUser(data: HandleUserDto) {
        setBusyBtn(true)
        try {
            formRef.current?.setErrors({})
            const schema = Yup.object().shape({
                firstName: Yup.string().required('Insira o nome do usuário'),
            })
            await schema.validate(data, {
                abortEarly: false,
            })
            if (user) {
                // const response = await editPointOfSale(data, pointOfSale.id)
                // if (response) {
                //     toast.success(
                //         `Ponto de venda ${data.label} editado com sucesso`
                //     )
                // }
                setBusyBtn(false)

                return
            }
            if (selectedTemplateId) {
                const createUserData: HandleUserDto = {
                    email: data.email,
                    firstName: data.firstName,
                    lastName: data.lastName,
                    userTemplateId: selectedTemplateId,
                }
                const response = await createUser(createUserData)
                if (response) {
                    toast.success(
                        `Usuário ${data.firstName} criado com sucesso`
                    )
                }
                setBusyBtn(false)
            }
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
                <CreateUserContent>
                    <div className="title">
                        <h1 className="f24-700-primary-dark">
                            Cadastrar usuário
                        </h1>
                    </div>
                    <Form ref={formRef} onSubmit={handleUser} noValidate>
                        <div className="input">
                            <Input name="firstName" label="Nome" />
                        </div>
                        <div className="input">
                            <Input name="lastName" label="Sobrenome" />
                        </div>
                        <div className="input">
                            <Input name="email" label="E-mail" />
                        </div>
                        <div className="input-select">
                            <SmallSelectInput
                                name="email"
                                placeholder="Cargo"
                                onChange={(e) => {
                                    if (e) {
                                        setSelectedTemplateId(e.value)
                                    }
                                }}
                                options={templates.map((template) => {
                                    return {
                                        label: template.label,
                                        value: template.id,
                                    }
                                })}
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
                </CreateUserContent>
            )}
        </ModalContainer>
    )
}
