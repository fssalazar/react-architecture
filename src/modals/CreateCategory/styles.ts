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
                    display: grid;
                    grid-template-columns: 3fr 2fr 1fr 1fr;
                    align-items: center;
                    grid-gap: 1rem;
                    margin-bottom: 1rem;
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
    }
`
