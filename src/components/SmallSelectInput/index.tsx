import React from 'react'
import ReactSelect, { OptionTypeBase, Props as SelectProps } from 'react-select'
import { SmallSelectInputContainer } from './styles'

interface Props extends SelectProps<OptionTypeBase> {
    name: string
    label?: string
    options: { value: number | string | boolean | undefined; label: string }[]
}

export function SmallSelectInput({ name, options, label, ...rest }: Props) {
    return (
        <SmallSelectInputContainer>
            <label htmlFor={name}>{label ? <p>{label}</p> : null}</label>
            <ReactSelect
                classNamePrefix="react-select"
                options={options}
                {...rest}
            />
        </SmallSelectInputContainer>
    )
}
