/* eslint-disable no-console */
/* eslint-disable react/jsx-no-duplicate-props */
/* eslint-disable react/require-default-props */
/* eslint-disable react/no-unused-prop-types */
import React, { ButtonHTMLAttributes } from 'react'
import { IconType } from 'react-icons/lib'
import { ClipLoader } from 'react-spinners'
import { ButtonContainer } from './styles'

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
    text: string
    busy?: boolean
    buttonType: 'FILLED' | 'TEXT' | 'BORDERED'
    color: 'PRIMARY' | 'SECONDARY' | 'TERTIARY' | 'WARNING'
    icon?: IconType
}

export function Button({
    text,
    buttonType,
    color,
    icon: Icon,
    busy,
    ...rest
}: Props) {
    return (
        <ButtonContainer buttonColor={color} buttonType={buttonType} {...rest}>
            {Icon && <Icon />}
            {busy ? <ClipLoader size={15} color="#fff" /> : text}
        </ButtonContainer>
    )
}
