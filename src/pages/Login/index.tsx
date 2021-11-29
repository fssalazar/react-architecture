import React, { useRef, useState } from 'react'
import * as Yup from 'yup'
import { FormHandles } from '@unform/core'
import { Form } from '@unform/web'
import { toast } from 'react-toastify'
import { CgProfile, CgLock } from 'react-icons/cg'
import { Link } from 'react-router-dom'
import { AuthContainer } from '../../container/AuthContainer'
import { LoginContent } from './styles'
import LoginImg from '../../assets/login-img.svg'
import { getValidationErrors } from '../../utils/getValidationErrors'
import { useAuth } from '../../hooks/use-auth'
import { LoginDto } from '../../dtos/login'
import { Input } from '../../unformInputs/Input'
import { Button } from '../../components/Button'
import { RoutesName } from '../../routes'

export function LoginPage() {
    // refs
    const formRef = useRef<FormHandles>(null)
    // hooks
    const { login } = useAuth()
    // state
    const [loadingBtn, setLoadingBtn] = useState(false)

    async function handleLogin(data: LoginDto) {
        setLoadingBtn(true)
        try {
            formRef.current?.setErrors({})
            const schema = Yup.object().shape({
                password: Yup.string().required('Senha obrigatória '),
            })
            await schema.validate(data, {
                abortEarly: false,
            })
            const response = await login(data)
            if (response === 200) {
                setLoadingBtn(false)
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
        <AuthContainer image={LoginImg}>
            <LoginContent>
                <Form ref={formRef} onSubmit={handleLogin}>
                    <Input icon={CgProfile} label="E-mail" name="email" />
                    <div className="margin-bottom" />
                    <Input
                        icon={CgLock}
                        label="Password"
                        name="password"
                        isPassword
                    />
                    <div className="forgot-password">
                        <Link to={RoutesName.forgotPassword}>
                            <h2 className="f14-700-light">
                                Esqueceu sua senha?
                            </h2>
                        </Link>
                    </div>
                    <Button
                        buttonType="FILLED"
                        color="PRIMARY"
                        text="Entrar"
                        type="submit"
                        busy={loadingBtn}
                    />
                </Form>
            </LoginContent>
        </AuthContainer>
    )
}
