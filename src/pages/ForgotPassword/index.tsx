import React, { useRef, useState } from 'react'
import * as Yup from 'yup'
import { Form } from '@unform/web'
import { CgProfile } from 'react-icons/cg'
import { Link, useHistory } from 'react-router-dom'
import { FormHandles } from '@unform/core'
import { toast } from 'react-toastify'
import { AuthContainer } from '../../container/AuthContainer'
import { ForgotPasswordContent } from './styles'
import forgotPassword from '../../assets/forgot-password.svg'
import { Button } from '../../components/Button'
import { Input } from '../../unformInputs/Input'
import { getValidationErrors } from '../../utils/getValidationErrors'
import { RoutesName } from '../../routes'
import { useUser } from '../../hooks/use-user'

export function ForgotPasswordPage() {
    // refs
    const formRef = useRef<FormHandles>(null)
    // hooks
    const { requestPasswordReset } = useUser()
    // state
    const [loadingBtn, setLoadingBtn] = useState(false)

    const history = useHistory()

    async function handleForgotPassword(data: { email: string }) {
        setLoadingBtn(true)
        try {
            formRef.current?.setErrors({})
            const schema = Yup.object().shape({
                email: Yup.string().required('E-mail obrigatório'),
            })
            await schema.validate(data, {
                abortEarly: false,
            })
            const response = await requestPasswordReset(data.email)
            if (response === 204) {
                history.push(RoutesName.emailSent)
                setLoadingBtn(false)
            }
            if (response !== 200) {
                if (!response) {
                    toast.error('E-mail não existe')
                    setLoadingBtn(false)
                }
                setLoadingBtn(false)
            }
        } catch (error) {
            toast.info('Verifique se você preencheu o campo')
            setLoadingBtn(false)
            console.log(error)
            if (error instanceof Yup.ValidationError) {
                const errors = getValidationErrors(error)
                formRef.current?.setErrors(errors)
            }
        }
    }

    return (
        <AuthContainer image={forgotPassword}>
            <ForgotPasswordContent>
                <h1 className="f16-400-light-gray insert-email">
                    Insira o seu e-mail de acesso no sistema.
                </h1>
                <Form ref={formRef} onSubmit={handleForgotPassword}>
                    <Input icon={CgProfile} label="E-mail" name="email" />
                    <div className="margin-bottom" />
                    <div className="action-btns-container">
                        <div className="action-btns">
                            <Link to={RoutesName.login}>
                                <Button
                                    buttonType="TEXT"
                                    color="PRIMARY"
                                    text="Voltar"
                                    type="button"
                                    busy={loadingBtn}
                                />
                            </Link>
                            <Button
                                buttonType="FILLED"
                                color="PRIMARY"
                                text="Enviar"
                                type="submit"
                                busy={loadingBtn}
                            />
                        </div>
                    </div>
                </Form>
            </ForgotPasswordContent>
        </AuthContainer>
    )
}
