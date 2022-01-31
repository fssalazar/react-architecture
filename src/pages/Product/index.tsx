/* eslint-disable import/no-unresolved */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable react/no-array-index-key */
/* eslint-disable no-param-reassign */
import React, { useEffect, useState } from 'react'
import { Button } from '../../components/Button'
import { MainContainer } from '../../container/MainContainer'
import { usePointOfSale } from '../../hooks/usePointOfSale'
import { HandlePointOfSale } from '../../modals/HandlePointOfSale'
import { RoutesName } from '../../routes'
import { PointOfSaleInfoContainer } from './styles'

export function ProductPage() {
    // hooks
    const { getPointOfSale, pointOfSale } = usePointOfSale()
    // state
    const [busy, setBusy] = useState(false)
    const [openEditPointOfSale, setOpenEditPointOfSale] = useState(false)

    // params
    const params = window.location.search.split('?')[1]

    useEffect(() => {
        setBusy(true)
        ;(async () => {
            await getPointOfSale(params)
            setBusy(false)
        })()
    }, [])

    return (
        <MainContainer
            path={[{ label: 'Produtos', path: RoutesName.products }]}
            title="Produto"
            active="products"
            busy={busy}
        >
            <PointOfSaleInfoContainer>
                <div className="edit-point">
                    <Button
                        text="Editar ponto de venda"
                        type="button"
                        buttonType="FILLED"
                        color="SECONDARY"
                        onClick={() => setOpenEditPointOfSale(true)}
                    />
                </div>
            </PointOfSaleInfoContainer>
            {openEditPointOfSale && (
                <HandlePointOfSale
                    isOpen={openEditPointOfSale}
                    onRequestClose={() => setOpenEditPointOfSale(false)}
                    pointOfSale={pointOfSale}
                />
            )}
        </MainContainer>
    )
}
