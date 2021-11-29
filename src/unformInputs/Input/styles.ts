import styled from 'styled-components'

export const InputContainer = styled.div`
    .error-message {
        text-align: start;
        font-size: 1.3rem;
        color: var(--color-error);
        margin: 0;
    }

    .error {
        color: var(--color-error);
    }
    .normal-label {
        margin-bottom: 1rem;
    }
`
export const InputContent = styled.div`
    width: 100%;
    font-size: 1.6rem;
    position: relative;
    height: 5.5rem;
    overflow: hidden;
    border: 1px solid #e8e8ea;
    border-radius: 1.8rem;
    .left-icon {
        position: absolute;
        top: 50%;
        left: 0.8rem;
        transform: translate(50%, -50%);
        color: #a5a3a9;
    }
    .hide-password {
        position: absolute;
        right: 1rem;
        bottom: 1rem;
        border: none;
        background-color: inherit;
        outline: none;
        svg {
            height: 2rem;
            width: 2rem;
        }
    }

    & input:focus {
        border-radius: 0.8rem;
    }
    input {
        width: 100%;
        height: 100%;
        border: none;
        outline: none;
        padding-left: 4rem;
        color: var(--color-dark);
        &:focus + .label-name .content-name,
        &:valid + .label-name .content-name {
            transform: translateY(-125%);
            font-size: 1.1rem;
            color: #a5a3a9;
        }
        &:focus + .label-name::after,
        &:valid + .label-name::after {
            transform: translateX(25%);
        }
    }
    .input-padding {
        padding-top: 1rem;
    }
    .label-name {
        position: absolute;
        bottom: 25%;
        left: 4rem;
        width: 100%;
        height: 100%;
        pointer-events: none;

        &::after {
            content: '';
            position: absolute;
            left: 0px;
            bottom: -1px;
            width: 100%;
            height: 100%;
            transform: translateX(-100%);
            transition: transform 0.3s ease;
        }
        .content-name {
            position: absolute;
            bottom: 0.5rem;
            left: 0px;
            color: #a5a3a9;
            transition: all 0.3s ease;
        }
    }
`
