/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/require-default-props */
import React, { InputHTMLAttributes, useEffect, useRef, useState } from 'react'
import { IconBaseProps } from 'react-icons'
import { useField } from '@unform/core'
import { FiEye, FiEyeOff } from 'react-icons/fi'
import { InputContainer, InputContent } from './styles'

interface Props extends InputHTMLAttributes<HTMLInputElement> {
    name: string
    label: string
    isPassword?: boolean
    icon?: React.ComponentType<IconBaseProps>
    normalLabel?: boolean
}

export function Input({
    name,
    label,
    icon: Icon,
    isPassword,
    normalLabel,
    ...rest
}: Props) {
    // Refs
    const inputRef = useRef<HTMLInputElement>(null)
    const { fieldName, defaultValue, error, registerField } = useField(name)

    // state
    const [disableError, setDisableError] = useState(false)
    const [showPassword, setShowPassword] = useState(!isPassword)

    useEffect(() => {
        registerField({
            name: fieldName,
            ref: inputRef.current,
            path: 'value',
        })
    }, [fieldName, registerField])

    return (
        <InputContainer>
            {normalLabel && (
                <h2 className="f16-500-dark normal-label">{label}</h2>
            )}
            <InputContent
                className={`${error && !disableError ? 'error' : ''}`}
            >
                <div className="left-icon">{Icon && <Icon />}</div>
                {isPassword && (
                    <button
                        className="hide-password"
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                    >
                        {showPassword ? <FiEye /> : <FiEyeOff />}
                    </button>
                )}
                <input
                    defaultValue={defaultValue}
                    onChange={() => setDisableError(true)}
                    id={name}
                    ref={inputRef}
                    type={showPassword ? 'text' : 'password'}
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
            {error ? <p className="error-message">{error}</p> : null}
        </InputContainer>
    )
}
