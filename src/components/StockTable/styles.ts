import styled from 'styled-components'

export const StockTableContainer = styled.div`
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
