import styled from 'styled-components'

export const CreatePointOfSaleContent = styled.div`
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
            &-3-2-1 {
                grid-template-columns: 2fr 2fr 1fr;
            }
            &-2-3 {
                grid-template-columns: 2fr 3fr;
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
    }
    .btns {
        display: flex;
        align-items: center;
        justify-content: space-between;
        button {
            width: 10rem;
        }
    }
`
