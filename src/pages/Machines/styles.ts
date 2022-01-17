import styled from 'styled-components'

export const MachineContainer = styled.div`
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
`

export const PaginationContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    width: 40rem;
    margin: 20px 0;
`
