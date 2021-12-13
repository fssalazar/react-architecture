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
