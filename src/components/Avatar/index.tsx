import React from 'react'
import { AvatarContainer } from './styles'

interface Props {
    label?: string
    img?: string
}

export function Avatar({ label, img }: Props) {
    return (
        <AvatarContainer>
            {img ? <img src={img} alt="" /> : <h1>{label}</h1>}
        </AvatarContainer>
    )
}
