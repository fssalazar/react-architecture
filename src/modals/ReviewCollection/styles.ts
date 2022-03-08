import styled from 'styled-components'

export const ReviewCollectionContent = styled.div`
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
                .paragraph {
                    font-weight: 600;
                    font-size: 1.2rem;
                    color: #a5a3a9;
                    margin-bottom: 1rem;
                }
                .input-textarea {
                    width: 100%;
                    font-size: 1.6rem;
                    position: relative;
                    overflow: hidden;
                    border: 1px solid #e8e8ea;
                    border-radius: 1.8rem;
                    padding: 1rem;
                    .description {
                        span {
                            color: #a5a3a9;
                            font-weight: 400;
                            font-size: 1.4rem;
                        }
                    }
                    textarea {
                        border: none;
                    }
                }
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
