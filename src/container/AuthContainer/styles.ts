import styled, { keyframes } from 'styled-components'

const appear = keyframes`
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
`

export const AuthContainerStyled = styled.div`
    width: 100%;
    height: 100vh;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    .image {
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: var(--color-light);
        animation: ${appear} 0.6s;
    }
    .auth-content {
        background-color: var(--color-primary);
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        animation: ${appear} 0.6s;
        .content {
            width: 37rem;
        }
    }
    @media screen and (max-width: 56.25em) {
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: var(--color-primary);
        .image {
            display: none;
        }
    }
`
