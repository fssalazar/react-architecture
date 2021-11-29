import React, { ReactNode } from 'react'
import { AuthContainerStyled } from './styles'
import Logo from '../../assets/logo.svg'

interface Props {
    children: ReactNode
    image: string
}

export function AuthContainer({ children, image }: Props) {
    return (
        <AuthContainerStyled>
            <div className="auth-content">
                <div className="logo">
                    <img src={Logo} alt="" />
                </div>
                <div className="content">{children}</div>
            </div>
            <div className="image">
                <img src={image} alt="" />
            </div>
        </AuthContainerStyled>
    )
}
