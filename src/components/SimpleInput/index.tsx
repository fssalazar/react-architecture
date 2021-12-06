/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/require-default-props */
import React, { InputHTMLAttributes } from 'react'
import { IconBaseProps } from 'react-icons'
import { InputContainer, InputContent } from './styles'

interface Props extends InputHTMLAttributes<HTMLInputElement> {
    name: string
    label?: string
    icon?: React.ComponentType<IconBaseProps>
    normalLabel?: boolean
}

export function SimpleInput({
    name,
    label,
    normalLabel,
    icon: Icon,
    ...rest
}: Props) {
    return (
        <InputContainer>
            {normalLabel && (
                <h2 className="f16-500-dark normal-label">{label}</h2>
            )}
            <InputContent>
                <div className="left-icon">{Icon && <Icon />}</div>

                <input
                    id={name}
                    autoComplete="off"
                    formNoValidate
                    required
                    className={`${normalLabel ? '' : 'input-padding'}`}
                    {...rest}
                />
                {!normalLabel && (
                    <label htmlFor={name} className="label-name">
                        <span className="content-name">{label}</span>
                    </label>
                )}
            </InputContent>
        </InputContainer>
    )
}
