import styled from 'styled-components'

export const SingleCollectionContainer = styled.button`
    width: 100%;
    display: grid;
    align-items: center;
    outline: none;
    border: none;
    padding: 2rem 0;
    text-align: start;
    background-color: inherit;
    .type {
        padding: 0.8rem;
        border-radius: 1rem;
        color: #18ba92;
        background-color: #d2fbf0;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 8rem;
        font-size: 1.4rem;
    }
    .fast {
        background-color: #fff8dd;
        color: #ccb243;
    }
    .employee {
        display: flex;
        align-items: center;
        justify-content: flex-start;
        .info {
            margin-left: 0.5rem;
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            justify-content: flex-start;
            h2 {
                font-weight: 600;
                color: #34303e;
                font-size: 1.2rem;
            }
            p {
                font-size: 1.2rem;
                font-weight: 600;
                color: #8e8c94;
            }
        }
    }
    .pdv {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: flex-start;
        h2 {
            font-weight: 600;
            color: #34303e;
            font-size: 1.2rem;
        }
        p {
            font-size: 1.2rem;
            font-weight: 600;
            color: #8e8c94;
        }
    }
    .review {
        display: flex;
        align-items: center;
        justify-content: center;
        svg {
            height: 2rem;
            width: 2rem;
        }
    }
    &:hover {
        background-color: rgba(115, 102, 255, 0.1);
    }
`
