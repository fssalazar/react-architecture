import styled from 'styled-components'

export const CreateTemplateContent = styled.div`
    max-height: 55rem;
    overflow-y: scroll;
    &::-webkit-scrollbar {
        width: 0.5rem;
    }

    /* Track */
    &::-webkit-scrollbar-track {
        border-radius: 0.5rem;
        background: #edeff2;
    }

    /* Handle */
    &::-webkit-scrollbar-thumb {
        border-radius: 0.5rem;
        background: #96989b;
    }

    /* Handle on hover */
    &::-webkit-scrollbar-thumb:hover {
        background: #96989b;
    }
    .content-title {
        h1 {
            font-size: 3.2rem;
            color: var(--color-dark);
            font-weight: 700;
        }
        margin-bottom: 1.8rem;
    }
    .label {
        width: 50%;
        margin-bottom: 3rem;
    }
    .template-box {
        width: 100%;
        box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.08),
            0px 4px 24px rgba(0, 0, 0, 0.08);
        border-radius: 1.6rem;
        margin: 2.4rem 0px;
        padding: 1.6rem;
        .header {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding-bottom: 1rem;
            button {
                background: inherit;
                border: none;
                svg {
                    width: 2rem;
                    height: 2rem;
                    color: #1d1929;
                }
            }
            border-bottom: 2px dashed #e8e8ea;
            margin-bottom: 1.6rem;
        }
        .body-content {
            width: 100%;
            label {
                width: 100%;
                display: flex;
                flex-direction: row;
                align-items: center;
                margin-bottom: 1.6rem;
                input {
                    margin-right: 1.6rem;
                }
                &:hover {
                    cursor: pointer;
                }
            }
        }
    }
`
