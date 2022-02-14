import styled from 'styled-components'

export const MachineInfoContainer = styled.div`
    margin-right: 4rem;
    .edit-point {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        button {
            width: 25rem;
        }
    }
    .delete-btn {
        margin: 2rem 0;
        width: 100%;
        display: flex;
        align-items: flex-end;
        justify-content: flex-end;
        button {
            width: 20rem;
        }
    }
`

export const GeneralInformarionContainer = styled.div`
    padding: 1rem;
    .title {
        margin-bottom: 3rem;
    }
    .general-info-content {
        width: 100%;
        display: grid;
        grid-template-columns: 3fr 6fr;
        grid-gap: 5rem;
        padding: 0 4rem;
        .general-info {
            .object {
                display: flex;
                align-items: center;
                justify-content: space-between;
                margin-bottom: 2rem;
                .object-title {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    svg {
                        height: 2rem;
                        width: 2rem;
                        margin-right: 1rem;
                        color: #1d1929;
                    }
                }
            }
        }
        .machine-info {
            padding: 0 4rem;
            align-self: center;
            .telemetry-operator {
                display: grid;
                grid-template-columns: 1fr 1fr;
                .telemetry-card {
                    display: flex;
                    align-items: stretch;
                    justify-content: flex-start;
                    .telemetry-info {
                        margin-left: 1rem;
                    }
                }
                .operator-card {
                    display: flex;
                    align-items: stretch;
                    justify-content: flex-start;
                    .operator-info {
                        margin-left: 1rem;
                    }
                }
            }
            .buttons {
                display: flex;
                align-items: center;
                margin-top: 5rem;
                button {
                    &:not(:last-child) {
                        margin-right: 3rem;
                    }
                }
            }
        }
    }
`

export const BoxesInformation = styled.div`
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    justify-content: center;
    margin-top: 6rem;
    margin-bottom: 4rem;
`

export const BoxCard = styled.div`
    padding: 2rem;
    width: 25rem;
    background-color: #fff;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.08),
        0px 4px 24px rgba(0, 0, 0, 0.08);
    border-radius: 16px;
    .center {
        text-align: center;
        margin-bottom: 1rem;
    }
    .data-info {
        &-object {
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-bottom: 1rem;
        }
    }
    .stock-container {
        border-top: 1px dashed #e8e8ea;
        padding: 1rem 0;
        display: grid;
        grid-template-columns: 1fr 1fr;
        .stock-info {
            align-self: center;
            justify-self: center;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: column;
            .stock-title {
                font-size: 4.8rem;
                font-weight: 700;
                color: var(--color-secondary);
            }
        }
        .buttons {
            button {
                padding: 0.8rem;
                &:not(:last-child) {
                    margin-bottom: 0.5rem;
                }
            }
        }
    }
`

export const EventsContainer = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    padding: 1rem;
    .history-events {
        border-right: 1px dashed #e8e8ea;
        padding-right: 2rem;
        .title {
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-bottom: 2rem;

            h1 {
                color: #34303e;
                font-size: 1.8rem;
                font-weight: 700;
            }
            button {
                border: none;
                background-color: inherit;
                color: #34303e;
                font-size: 1.4rem;
                font-weight: 400;
            }
        }
    }
    .logs-events {
        padding-left: 2rem;
        .title {
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-bottom: 2rem;

            h1 {
                color: #34303e;
                font-size: 1.8rem;
                font-weight: 700;
            }
            button {
                border: none;
                background-color: inherit;
                color: #34303e;
                font-size: 1.4rem;
                font-weight: 400;
            }
        }
    }
`

export const EventCard = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 1.5rem;
    .event-info-container {
        display: flex;
        align-items: center;
        justify-content: center;
        .event-info {
            margin-left: 1rem;
        }
    }
    .event-data {
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        justify-content: flex-end;
    }
`
