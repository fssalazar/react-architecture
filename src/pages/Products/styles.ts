import styled from 'styled-components'

export const ProductsContainer = styled.div`
    margin-right: 4rem;
    .filters {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        .location-search {
            display: flex;
            align-items: center;
            margin-right: 1rem;
            &-select {
                width: 20rem;
                margin-right: 3rem;
            }
            button {
                width: 20rem;
            }
        }
    }
    .tab-products {
        margin-top: 3rem;
        .tab-btn {
            border: none;
            background-color: inherit;
            border-bottom: 3px solid inherit;
            padding: 1rem 2rem;
            font-size: 1.4rem;
            font-weight: 700;
            transition: all 0.1s ease;
            &:hover {
                border-bottom: 3px solid #003cff;
                color: #003cff;
            }
        }
        .active {
            border-bottom: 3px solid #003cff;
            color: #003cff;
        }
    }
`

export const PaginationContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    width: 40rem;
    margin: 20px 0;
`
