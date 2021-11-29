import styled, { css } from 'styled-components'

interface Props {
    buttonColor: 'PRIMARY' | 'SECONDARY' | 'TERTIARY' | 'WARNING'
    buttonType: 'FILLED' | 'TEXT' | 'BORDERED'
}

export const ButtonContainer = styled.button<Props>`
    width: 100%;
    padding: 1.5rem;
    font-weight: 700;
    font-size: 1.6rem;
    outline: none;
    transition: all 0.3s;
    &:hover {
        filter: opacity(0.9);
    }
    svg {
        margin-right: 0.5rem;
    }
    ${(props) => {
        if (props.buttonType === 'FILLED') {
            return css`
                border-radius: 1.6rem;
                border: none;
                color: var(--color-light);
            `
        }
        if (props.buttonType === 'BORDERED') {
            return css`
                border-radius: 1.6rem;
                border: 1px solid #34303e;
                background-color: inherit !important;
                color: var(--color-secondary);
            `
        }
        if (props.buttonType === 'TEXT') {
            return css`
                border-radius: 1.6rem;
                border: none;
                background-color: inherit !important;
                color: var(--color-secondary);
            `
        }
        return css`
            color: var(--color-light);
            background-color: inherit !important;
            border: none;
        `
    }}
    ${(p) => {
        if (p.buttonColor === 'SECONDARY') {
            return css`
                background-color: var(--color-secondary);
            `
        }
        if (p.buttonColor === 'WARNING') {
            return css`
                background-color: var(--color-warning);
                color: var(--color-warning);
            `
        }
        return css`
            background-color: var(--color-primary-dark);
        `
    }}
`
