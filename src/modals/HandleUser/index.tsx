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
import { FiAlertCircle } from 'react-icons/fi'
import { Button } from '../../components/Button'
import { Input } from '../../unformInputs/Input'
import { getValidationErrors } from '../../utils/getValidationErrors'
import { CreateUserContent } from './styles'
import { HandleUserDto } from '../../dtos/handleUser'
import { useUser } from '../../hooks/use-user'
import { GeneralUser } from '../../entities/generalUser'
import { SmallSelectInput } from '../../components/SmallSelectInput'
import { CreateTemplate } from '../CreateTemplate'

interface Props {
    isOpen: boolean
    onRequestClose: () => void
    user?: GeneralUser
}

export function HandleUser({ isOpen, onRequestClose, user }: Props) {
    // hooks
    const { createUser, getTemplates, templates, editUser, deleteUser } =
        useUser()
    // refs
    const formRef = useRef<FormHandles>(null)
    // state
    const [selectedTemplate, setSelectedTemplate] = useState<{
        label?: string
        value?: string
    }>(() => {
        if (user) {
            return {
                label: user.permissions.label,
                value: user.permissions.templateId,
            }
        }
        return { label: 'Selecinar cargo', value: 'none' }
    })
    const [busyBtn, setBusyBtn] = useState(false)
    const [busy, setBusy] = useState(false)
    const [openCreateTemplate, setOpenCreateTemplate] = useState(false)

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
                email: Yup.string().required('Insira o e-mail do usuário'),
            })
            await schema.validate(data, {
                abortEarly: false,
            })
            if (user) {
                if (selectedTemplate.value) {
                    const response = await editUser(
                        selectedTemplate.value,
                        user.id
                    )
                    if (response) {
                        toast.success(
                            `Usuário ${data.firstName} editado com sucesso`
                        )
                    }
                    setBusyBtn(false)
                    onRequestClose()
                    return
                }
            }
            if (
                selectedTemplate?.value === 'none' ||
                selectedTemplate?.value === undefined
            ) {
                toast.info(
                    `Para cadastrar um usuário é necessário selecionar um cargo.`
                )
                setBusyBtn(false)
            }
            if (selectedTemplate?.value) {
                const createUserData: HandleUserDto = {
                    email: data.email,
                    firstName: data.firstName,
                    lastName: data.lastName,
                    userTemplateId: selectedTemplate?.value,
                }
                const response = await createUser(createUserData)
                if (response) {
                    toast.success(
                        `Usuário ${data.firstName} criado com sucesso`
                    )
                }
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
                        <div className="form-avatar">
                            <div className="form">
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
                                                setSelectedTemplate({
                                                    value: e.value,
                                                    label: e.label,
                                                })
                                            }
                                        }}
                                        value={selectedTemplate}
                                        options={templates.map((template) => {
                                            return {
                                                label: template.label,
                                                value: template.id,
                                            }
                                        })}
                                    />
                                </div>
                            </div>
                            {user && (
                                <div className="avatar">
                                    {`${user.firstName[0]}${user.lastName[0]}`}
                                </div>
                            )}
                        </div>
                        <div className="create-new-template">
                            <p>ou crie um novo cargo</p>
                            <button
                                type="button"
                                onClick={() => setOpenCreateTemplate(true)}
                            >
                                aqui
                            </button>
                        </div>
                        {user && !user?.lastAccess ? (
                            <div className="last-access">
                                <FiAlertCircle />
                                <p>Usuário não confirmou o e-mail ainda.</p>
                            </div>
                        ) : (
                            <div />
                        )}
                        <div className="btns">
                            <Button
                                text="Cancelar"
                                type="button"
                                buttonType="TEXT"
                                color="WARNING"
                                onClick={() => onRequestClose()}
                            />
                            {user ? (
                                <div className="save-delete">
                                    <Button
                                        text="Deletar"
                                        type="button"
                                        buttonType="FILLED"
                                        color="WARNING"
                                        busy={busyBtn}
                                        onClick={async () => {
                                            const response = await deleteUser(
                                                user.id
                                            )
                                            if (response) {
                                                toast.success(
                                                    `Usuário ${user.firstName} deletado com sucesso.`
                                                )
                                            }
                                        }}
                                    />
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
                </CreateUserContent>
            )}
            <CreateTemplate
                isOpen={openCreateTemplate}
                onRequestClose={() => setOpenCreateTemplate(false)}
            />
        </ModalContainer>
    )
}
