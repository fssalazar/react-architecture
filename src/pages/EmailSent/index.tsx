import React from 'react'
import { Link } from 'react-router-dom'
import { AuthContainer } from '../../container/AuthContainer'
import { EmailSentContent } from './styles'
import { Button } from '../../components/Button'
import SentEmail from '../../assets/email-sent.svg'
import { RoutesName } from '../../routes'

export function EmailSentPage() {
    return (
        <AuthContainer image={SentEmail}>
            <EmailSentContent>
                <h1 className="title">E-MAIL ENVIADO COM SUCESSO!</h1>
                <p className="f16-400-light-gray insert-email">
                    Caso esse e-mail exista em nosso sistema, ele receberá uma
                    mensagem indicando os próximos passos para realizar a
                    recuperação de senha.Caso não encontre o e-mail, procure na
                    caixa de SPAM.
                </p>
                <Link to={RoutesName.login}>
                    <Button
                        buttonType="FILLED"
                        color="PRIMARY"
                        text="Voltar"
                        type="button"
                    />
                </Link>
            </EmailSentContent>
        </AuthContainer>
    )
}
