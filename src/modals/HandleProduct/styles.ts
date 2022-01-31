import styled from 'styled-components'

export const CreateProductContent = styled.div`
    .title {
        text-align: start;
        margin-bottom: 4rem;
    }
    form {
        .form-avatar {
            display: flex;
            align-items: stretch;
            justify-content: start;
            .form {
                width: 100%;
            }
            .avatar {
                width: 40rem;
                border-radius: 2.4rem;
                background-color: var(--color-secondary);
                margin-left: 2rem;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 5.4rem;
                color: #fff;
            }
        }
        div {
            margin-bottom: 1rem;
        }
        .input-select {
            width: 30rem;
        }
        .create-new-template {
            display: flex;
            align-items: center;
            justify-content: start;
            p {
                margin-left: 1rem;
                font-size: 1.4rem;
                color: var(--color-gray);
            }
            button {
                background-color: inherit;
                border: none;
                margin-left: 0.3rem;
                font-size: 1.4rem;
                color: var(--color-primary);
            }
        }
    }
    .last-access {
        display: flex;
        align-items: center;
        justify-content: flex-start;
        margin-top: 2rem;
        svg {
            margin-right: 1rem;
            color: var(--color-warning);
        }
        p {
            color: var(--color-warning);
        }
    }
    .btns {
        display: flex;
        align-items: center;
        justify-content: space-between;
        button {
            width: 10rem;
        }
        .save-delete {
            button {
                margin-left: 1rem;
            }
        }
    }
`
