import styled from 'styled-components'

export const Table = styled.div`
    width: 100%;
    padding: 1.6rem;
    border-bottom: 1px solid #e8e8ea;
    .table-header {
        width: 100%;
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        padding: 1.2rem 0;
        h1 {
            font-size: 1.4rem;
            font-weight: 400;
            color: #77757f;
        }
        .center {
            text-align: center;
        }
        .start {
            text-align: start;
        }
        .end {
            text-align: end;
        }
        button {
            display: flex;
            align-items: center;
            justify-content: center;
            border: none;
            background-color: inherit;
            font-size: 1.4rem;
            font-weight: 400;
            color: #77757f;
        }
    }
`
