import styled from 'styled-components'

export const PaginationContent = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    p {
        color: #a5a3a9;
        font-size: 1.4rem;
        font-weight: 600;
    }

    .number-of-results {
        display: flex;
        align-items: center;

        .number-search {
            margin-left: 1rem;
            width: 10rem;
        }
    }
`
