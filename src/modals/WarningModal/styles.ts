import styled from 'styled-components'

export const WarningContent = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-direction: column;
    height: 18rem;
    h1 {
        font-size: 2.2rem;
        color: var() (--color-dark);
    }
    p {
        font-size: 1.6rem;
        color: var(--color-gray);
        text-align: center;
    }
    .btns {
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;
    }
`
