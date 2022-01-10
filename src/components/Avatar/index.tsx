import React from 'react'
import { AvatarContainer } from './styles'

interface Props {
    label: string
}

export function Avatar({ label }: Props) {
    return (
        <AvatarContainer>
            <h1>{label}</h1>
        </AvatarContainer>
    )
}
