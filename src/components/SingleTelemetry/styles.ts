import styled from 'styled-components'

export const SingleTelemetryContainer = styled.button`
    width: 100%;
    display: grid;
    outline: none;
    border: none;
    padding: 0.5rem 0;
    text-align: start;
    background-color: inherit;
    align-items: center;
    justify-content: center;
    justify-items: start;
    .machine-bnt {
        border: none;
        background-color: inherit;
        font-size: 1.4rem;
        font-weight: 500;
        color: #4d77ff;
        z-index: 50;
        padding: 1rem;
    }
    .status {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    &:hover {
        background-color: rgba(115, 102, 255, 0.1);
    }
`
