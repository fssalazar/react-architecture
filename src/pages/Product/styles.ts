import styled from 'styled-components'

export const PointOfSaleInfoContainer = styled.div`
    margin-right: 4rem;
    .product-info {
        background: #ffffff;
        /* Shadow/4dp */

        box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.08),
            0px 4px 24px rgba(0, 0, 0, 0.08);
        border-radius: 16px;
        padding: 2rem;
        display: flex;
        align-items: center;
        justify-content: space-evenly;
        .info {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            h1 {
                color: #34303e;
                font-size: 6rem;
                font-weight: 700;
                margin-bottom: 1rem;
            }
            p {
                color: #77757f;
                font-size: 1.4rem;
                font-weight: 400;
                margin-bottom: 1rem;
            }
            h2 {
                color: #34303e;
                font-size: 1.6rem;
                font-weight: 700;
                margin-bottom: 1rem;
            }
        }
        .img {
            width: 30rem;
            height: 30rem;
            img {
                height: 100%;
                object-fit: cover;
            }
        }
    }
    .product-stock {
        margin-top: 1.6rem;
        background: #ffffff;
        /* Shadow/4dp */

        box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.08),
            0px 4px 24px rgba(0, 0, 0, 0.08);
        border-radius: 16px;
        padding: 2rem;
        display: flex;
        align-items: stretch;
        justify-content: space-between;
        .machine-stock {
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            justify-content: flex-start;
            width: 50%;
            .table-title {
                color: #34303e;
                font-size: 1.8rem;
                font-weight: 800;
            }
        }
        .users-stock {
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            justify-content: flex-start;
            width: 50%;
            .table-title {
                color: #34303e;
                font-size: 1.8rem;
                font-weight: 700;
            }
        }
    }
`
