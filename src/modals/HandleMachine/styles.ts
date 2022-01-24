import styled from 'styled-components'

export const CreateMachineContent = styled.div`
    max-height: 70vh;
    overflow-y: scroll;
    &::-webkit-scrollbar {
        width: 0.5rem;
        padding: 1rem;
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
    .title {
        text-align: center;
        margin-bottom: 4rem;
    }
    form {
        .grid {
            display: grid;
            grid-gap: 1.5rem;
            margin-bottom: 1.5rem;
            &-1-1 {
                grid-template-columns: 1fr 1fr;
            }
            &-2-1 {
                grid-template-columns: 2fr 1fr;
            }
            &-2-1-1 {
                grid-template-columns: 3fr 2fr 2fr;
            }
            &-3-2-1 {
                grid-template-columns: 2fr 2fr 1fr;
            }
            &-2-3 {
                grid-template-columns: 2fr 3fr;
            }
        }
        .input-btn {
            .add-new-btn {
                border: none;
                background-color: inherit;
                color: var(--color-primary);
                font-size: 1.4rem;
                padding-left: 1rem;
            }
        }
        .payment-type {
            display: flex;
            align-items: center;
            justify-content: space-around;
            width: 70%;
            .isPercentage,
            .isValue {
                display: flex;
                align-items: center;
                &:hover {
                    cursor: pointer;
                }
                input {
                    width: 1.5rem;
                    height: 1.5rem;
                    margin-right: 1rem;
                }
            }
        }

        .category-selector {
            width: 50%;
        }
        .category {
            .category-container {
                width: 100%;
                .category-header {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    margin: 2.6rem 0;
                    .category-name {
                        font-size: 2.4rem;
                        color: var(--color-dark);
                        font-weight: 700;
                    }
                    .category-config {
                        display: flex;
                        align-items: center;
                        .shared-stock {
                            margin-right: 1rem;
                        }
                        .shared-stock,
                        .shared-vault {
                            label {
                                display: flex;
                                align-items: center;
                                &:hover {
                                    cursor: pointer;
                                }
                                input {
                                    margin-right: 0.5rem;
                                    height: 1.5rem;
                                    width: 1.5rem;
                                }
                            }
                        }
                    }
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
        }
    }
    .btns {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-top: 2rem;

        button {
            width: 10rem;
        }
    }
`
