import styled from 'styled-components'

export const AvatarContainer = styled.div`
    height: 3rem;
    width: 3rem;
    border-radius: 50%;
    background-color: var(--color-secondary);
    display: flex;
    align-items: center;
    justify-content: center;
    h1 {
        color: #fff;
        font-size: 1.4rem;
        font-weight: 700;
    }
    img {
        height: 3rem;
        width: 3rem;
        border-radius: 50%;
        object-fit: cover;
    }
`
