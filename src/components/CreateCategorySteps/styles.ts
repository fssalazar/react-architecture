import styled from 'styled-components'

export const CreateCategoryStepsContainer = styled.div`
    width: 100%;
    .step-head {
        text-align: center;
        margin-bottom: 3.4rem;
        .step-title {
            margin-bottom: 0.8rem;
        }
    }
    .steps {
        display: flex;
        align-items: center;
        width: 100%;
        .step-config {
            display: flex;
            flex-direction: column;
            align-items: center;
            width: 100%;
            .step {
                display: flex;
                align-items: center;
                width: 100%;
                .step-number {
                    margin: 0 0.4rem;
                    padding: 0.8rem 1.2rem;
                    border-radius: 1.2rem;
                    background: #e8e8ea;
                    font-size: 1.4rem;
                    font-weight: 700;
                    color: #34303e;
                }
                .divider {
                    width: 100%;
                    height: 2px;
                    background: #e8e8ea;
                }
            }
            .active {
                .divider {
                    background: #003cff;
                }
                .step-number {
                    background: #ccd8ff;
                    color: var(--color-secondary);
                }
            }
        }
    }
    .sub-title {
        margin: 3.4rem;
        text-align: center;
    }
`
