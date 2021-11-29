import styled from 'styled-components'

export const MainContainerStyled = styled.div`
    display: flex;
    .content {
        width: 100%;
        .path {
            display: flex;
            align-items: center;
            margin-top: 4.4rem;
            .general-path {
                a {
                    text-decoration: none;
                    display: flex;
                    align-items: center;
                    margin-right: 1rem;
                    svg {
                        margin-right: 0.5rem;
                    }
                }
            }
            a {
                text-decoration: none;
                margin-right: 1rem;
            }
        }
        .title {
            font-size: 3.4rem;
            font-weight: 700;
            color: #1d1929;
            padding: 1.6rem 0;
        }
    }
`
