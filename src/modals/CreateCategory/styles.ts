import styled from 'styled-components'

export const CreateCategoryContent = styled.div`
    .choose-type {
        .category-types {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            grid-row-gap: 1rem;
            justify-content: center;
            align-items: center;
            align-content: center;
            .category-type {
                background: inherit;
                border: none;
                padding: 1rem 0;
                .title {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    svg {
                        margin-left: 0.5rem;
                    }
                }
                &:hover {
                    border: 3px solid #ccd8ff;
                    border-radius: 1.2rem;
                }
            }
        }
        .action-btns {
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-top: 9rem;
            button {
                width: 10rem;
            }
        }
    }
    .build-category {
        .choose-boxes {
            display: flex;
            align-items: center;
            flex-direction: column;
            .select {
                width: 25rem;
                margin-top: 3rem;
            }
        }
        .category-container {
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
        }
        .category-box {
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
                button {
                    background: inherit;
                    border: none;
                    svg {
                        width: 2rem;
                        height: 2rem;
                        color: #1d1929;
                    }
                }
                padding: 1.6rem;
                border-bottom: 2px dashed #e8e8ea;
            }
            .category-content {
                padding: 0 2.4rem;
                .titles {
                    margin-top: 2.4rem;
                    margin-bottom: 1rem;
                    display: grid;
                    grid-template-columns: 3fr 2fr 1fr 1fr;
                }
                .category-form {
                    position: relative;
                    display: grid;
                    grid-template-columns: 3fr 2fr 1fr 1fr;
                    align-items: center;
                    grid-gap: 1rem;
                    margin-bottom: 1rem;
                    .delete-counter {
                        position: absolute;
                        right: -2rem;
                        border: none;
                        background-color: inherit;
                        color: var(--color-warning);
                        width: 2.5rem;
                        height: 2.5rem;
                    }
                    .type-input {
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        input {
                            width: 1.5rem;
                            height: 1.5rem;
                            &:hover {
                                cursor: pointer;
                            }
                        }
                    }
                }
                .add-counter-btn {
                    text-align: right;
                    button {
                        border: none;
                        background-color: inherit;
                        color: var(--color-primary);
                        font-weight: 700;
                        margin-top: 1rem;
                    }
                }
            }
        }
        .action-btns {
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-top: 9rem;
            button {
                width: 10rem;
            }
        }
    }
    .category-config {
        text-align: center;
        margin-top: 4.4rem;
        .action-config {
            margin: 2.2rem 0;
            display: flex;
            align-items: center;
            justify-content: center;
            .config-label {
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 1.4rem;
                font-weight: 700;
                color: var(--color-primary-dark);
                opacity: 0.8;
                &:hover {
                    cursor: pointer;
                }
                input {
                    margin: 0 1rem;
                    height: 2rem;
                    width: 2rem;
                    border-radius: 0.8rem;
                }
            }
        }
        .action-btns {
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-top: 9rem;
            button {
                width: 10rem;
            }
        }
    }
    .category-name {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        h1 {
            margin-bottom: 2.4rem;
        }
        .action-btns {
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-top: 9rem;
            button {
                width: 10rem;
            }
        }
    }
    .category-finished {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        .check {
            margin-bottom: 3rem;
        }
        .action-btns {
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: flex-end;
            margin-top: 9rem;
            button {
                width: 10rem;
            }
        }
    }
`
