import styled from 'styled-components'

export const CollectionInfoContainer = styled.div`
    margin-right: 4rem;
    .collection-tables {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        grid-gap: 1rem;
    }
    .photos-container {
        width: 100%;
        .carousel-c {
            width: 115rem;
            height: 25rem;
            margin: 2rem auto;
            .img {
                margin-right: 2rem;
                height: 25rem;
                width: 25rem;
                img {
                    height: 25rem;
                    width: 25rem;
                    border-radius: 2rem;
                }
            }
        }
    }
    .observation-container {
        .observation-string {
            margin-top: 1rem;
            color: #34303e;
            font-size: 1.8rem;
            font-weight: 700;
            line-height: 135%;
        }
        margin-bottom: 3rem;
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
        grid-template-columns: 0.7fr 1fr;
        grid-gap: 10rem;
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
                .object {
                    display: flex;
                    align-items: stretch;
                    justify-content: flex-start;
                    .telemetry-card {
                        .telemetry-info {
                            margin-left: 1rem;
                        }
                    }
                }
                .operator-card {
                    .title {
                        font-weight: 700;
                        font-size: 1.8rem;
                        color: #34303e;
                    }
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

export const BoxesInfo = styled.div`
    .title {
        margin-bottom: 3rem;
    }
    .collection-cards {
        width: 100%;
        display: flex;
        align-items: center;
        justify-items: start;
    }
`

export const BoxCollectionCard = styled.div`
    display: flex;
    align-items: center;
    justify-items: center;
    border-radius: 1.6rem;
    background: #ffffff;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.08),
        0px 4px 24px rgba(0, 0, 0, 0.08);
    width: 100%;
    padding: 1rem;
    img {
        margin-right: 1.6rem;
    }
    h2 {
        color: #34303e;
        font-size: 1.8rem;
        font-weight: 700;
    }
    p {
        color: #a5a3a9;
        font-size: 1.2rem;
        font-weight: 600;
    }
    &:not(:last-child) {
        margin-right: 1rem;
    }
`

export const CollectionTable = styled.div`
    background-color: #fff;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.08),
        0px 4px 24px rgba(0, 0, 0, 0.08);
    border-radius: 16px;
    padding: 1rem;
    margin-top: 3.6rem;
    width: 100%;
    &:not(:last-child) {
        margin-right: 1rem;
    }
    .title-table {
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 1rem 0;
        h1 {
            color: #77757f;
            font-size: 1.6rem;
            font-weight: 400;
        }
    }
    .header {
        display: grid;
        grid-template-columns: repeat(6, 1fr);
        justify-items: center;
        background: #f9f9f9;
        border-radius: 16px;
        padding: 0.8rem 0;
        h2 {
            color: #77757f;
            font-size: 1.4rem;
            font-weight: 400;
        }
    }
    .table-line {
        display: grid;
        grid-template-columns: 1fr 4fr 1fr;
        justify-items: center;
        border: 1px solid #e8e8ea;
        border-radius: 16px;
        margin-top: 1rem;
        padding: 0.8rem 0;
        .types {
            width: 100%;
            .types-line {
                display: grid;
                grid-template-columns: repeat(4, 1fr);
                justify-items: center;
                &:not(:last-child) {
                    margin-bottom: 2rem;
                }
            }
        }
        .counter,
        .telemetry {
            display: flex;
            align-items: center;
            justify-content: center;
        }
        h2 {
            font-size: 1.6rem;
            font-weight: 400;
            color: #34303e;
        }
        h1 {
            font-size: 1.4rem;
            font-weight: 400;
        }
    }
`

export const CollectionReview = styled.div`
    margin-top: 2.6rem;
    margin-bottom: 3.6rem;
    .title {
        margin-bottom: 3rem;
    }
    .review-cards {
        display: flex;
        align-items: center;
    }
    .reviewed-by-container {
        border: 1px solid #e8e8ea;
        border-radius: 1.6rem;
        margin-top: 2rem;
        display: grid;
        grid-template-columns: 3fr 7fr;
        padding: 1.5rem;
        .info {
            .object {
                margin-top: 2rem;
                display: flex;
                align-items: stretch;
                justify-content: flex-start;
                .operator-info {
                    margin-left: 1rem;
                }
            }
        }
        .observation {
            .title {
                margin-bottom: 2rem;
            }
            p {
                font-weight: 400;
                font-size: 1.6rem;
                color: #34303e;
                line-height: 147%;
            }
        }
    }
`
