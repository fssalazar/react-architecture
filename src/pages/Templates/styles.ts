import styled from 'styled-components'

export const TemplatesContainer = styled.div`
    .header-content {
        width: 100%;
        padding: 0 4.1rem 0 0rem;
        display: flex;
        align-items: center;
        justify-content: space-between;
        .select-category {
            width: 35rem;
        }
        .header-btns {
            display: flex;
            align-items: center;
            button {
                &:not(:last-child) {
                    margin-right: 1.6rem;
                }
            }
        }
    }
    .template-container {
        width: 70%;
        .template-header {
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin: 2.6rem 0;
            .template-name {
                font-size: 2.4rem;
                color: var(--color-dark);
                font-weight: 700;
            }
        }
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
            button {
                background: inherit;
                border: none;
                svg {
                    width: 2rem;
                    height: 2rem;
                    color: #1d1929;
                }
            }
            padding-bottom: 1rem;
            margin-bottom: 1.6rem;
            border-bottom: 2px dashed #e8e8ea;
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
