import React from 'react'
import { Link } from 'react-router-dom'
import { AuthContainer } from '../../container/AuthContainer'
import { PasswordChangedContent } from './styles'
import { Button } from '../../components/Button'
import SentEmail from '../../assets/email-sent.svg'
import { RoutesName } from '../../routes'

export function PasswordChangedPage() {
    return (
        <AuthContainer image={SentEmail}>
            <PasswordChangedContent>
                <h1 className="title">Senha recuperada com sucesso!</h1>
                <p className="f16-400-light-gray insert-email">
                    Volte para a página inicial para entrar no sistema com sua
                    nova senha.
                </p>
                <Link to={RoutesName.login}>
                    <Button
                        buttonType="FILLED"
                        color="PRIMARY"
                        text="Voltar"
                        type="button"
                    />
                </Link>
            </PasswordChangedContent>
        </AuthContainer>
    )
}
