import React, { useRef, useState } from 'react'
import * as Yup from 'yup'
import { Form } from '@unform/web'
import { CgLock } from 'react-icons/cg'
import { Link, useHistory } from 'react-router-dom'
import { FormHandles } from '@unform/core'
import { toast } from 'react-toastify'
import qs from 'qs'
import { AuthContainer } from '../../container/AuthContainer'
import { ChangePasswordContent } from './styles'
import { Button } from '../../components/Button'
import { Input } from '../../unformInputs/Input'
import { LoginDto } from '../../dtos/login'
import { getValidationErrors } from '../../utils/getValidationErrors'
import { RoutesName } from '../../routes'
import ChangePasswordImg from '../../assets/change-password.svg'
import { useUser } from '../../hooks/use-user'

export function ChangePasswordPage() {
    // refs
    const formRef = useRef<FormHandles>(null)
    // state
    const [loadingBtn, setLoadingBtn] = useState(false)
    // hooks
    const { ChangePassword } = useUser()
    // params
    const params = window.location.search.split('?')[1]

    const history = useHistory()

    const { token }: { token: string } = qs.parse(params) as unknown as {
        token: string
    }

    async function handleChangePassword(data: LoginDto) {
        setLoadingBtn(true)
        try {
            formRef.current?.setErrors({})
            const schema = Yup.object().shape({
                password: Yup.string().required('Senha obrigatória '),
            })
            await schema.validate(data, {
                abortEarly: false,
            })
            const response = await ChangePassword({
                password: data.password,
                token,
            })
            if (response === 204) {
                setLoadingBtn(false)
                history.push(RoutesName.passwordChanged)
            }
            if (response !== 200) {
                if (!response) {
                    toast.error('E-mail ou senha incorretos')
                    setLoadingBtn(false)
                }
                setLoadingBtn(false)
            }
        } catch (error) {
            toast.info('Verifique se você preencheu o campo')
            setLoadingBtn(false)
            if (error instanceof Yup.ValidationError) {
                const errors = getValidationErrors(error)
                formRef.current?.setErrors(errors)
            }
        }
    }

    return (
        <AuthContainer image={ChangePasswordImg}>
            <ChangePasswordContent>
                <h1 className="f16-400-light-gray insert-email">
                    Recuperação de senha.
                </h1>
                <Form ref={formRef} onSubmit={handleChangePassword}>
                    <Input
                        icon={CgLock}
                        label="Digite a nova senha"
                        name="password"
                        isPassword
                    />
                    <div className="margin-bottom" />
                    <Input
                        icon={CgLock}
                        label="Confirme a nova senha"
                        name="newPassword"
                        isPassword
                    />
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
            </ChangePasswordContent>
        </AuthContainer>
    )
}
