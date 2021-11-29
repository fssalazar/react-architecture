import styled from 'styled-components'

export const CategoriesContent = styled.div`
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
`
