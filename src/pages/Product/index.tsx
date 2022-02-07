/* eslint-disable import/no-unresolved */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable react/no-array-index-key */
/* eslint-disable no-param-reassign */
import React, { useEffect, useState } from 'react'
import { StockTable } from '../../components/StockTable'
import { MainContainer } from '../../container/MainContainer'
import { useProduct } from '../../hooks/useProduct'
import { RoutesName } from '../../routes'
import { Table } from '../../utils/Table'
import { PointOfSaleInfoContainer } from './styles'

export function ProductPage() {
    // hooks
    const { getProductDetail, product } = useProduct()
    // state
    const [busy, setBusy] = useState(false)

    // params
    const params = window.location.search.split('id=')[1]

    useEffect(() => {
        setBusy(true)
        ;(async () => {
            await getProductDetail(params)
            setBusy(false)
        })()
    }, [])

    return (
        <MainContainer
            path={[{ label: 'Produtos', path: RoutesName.products }]}
            title={`${product?.label}`}
            active="products"
            busy={busy}
        >
            <PointOfSaleInfoContainer>
                <div className="product-info">
                    <div className="info">
                        <h1>{product?.totalStock || '0'}</h1>
                        <p>Estoque</p>
                        <h2>{product?.externalId || '-'}</h2>
                        <p>Código do produto</p>
                    </div>
                    <div className="img">
                        <img src={product?.photoUrl} alt="" />
                    </div>
                </div>
                <div className="product-stock">
                    <div className="machine-stock">
                        <h1 className="table-title">{`Quantidade em máquinas (${
                            product?.machineStock.length || 0
                        })`}</h1>
                        <Table style={{ borderBottom: 'none' }}>
                            <div
                                className="table-header"
                                style={{
                                    gridTemplateColumns: '1fr 2fr 2fr 2fr',
                                }}
                            >
                                <h1>Num. Série</h1>
                                <h1>Categoria</h1>
                                <h1>Estoque</h1>
                                <h1>Estoque mínimo</h1>
                            </div>
                            {product?.machineStock.map((machineStock) => {
                                return (
                                    <StockTable machineStock={machineStock} />
                                )
                            })}
                        </Table>
                    </div>
                    <div className="users-stock">
                        <h1 className="table-title">{`Quantidade em usuários (${
                            product?.userStock.length || 0
                        })`}</h1>
                        <Table style={{ borderBottom: 'none' }}>
                            <div
                                className="table-header"
                                style={{
                                    gridTemplateColumns: '1fr 2fr 2fr 2fr',
                                }}
                            >
                                <h1>#</h1>
                                <h1>Nome</h1>
                                <h1>Cargo</h1>
                                <h1>Estoque</h1>
                            </div>
                            {product?.userStock.map((userStock) => {
                                return <StockTable userStock={userStock} />
                            })}
                        </Table>
                    </div>
                </div>
            </PointOfSaleInfoContainer>
        </MainContainer>
    )
}
