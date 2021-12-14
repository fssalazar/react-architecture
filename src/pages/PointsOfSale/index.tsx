/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable react/no-array-index-key */
/* eslint-disable no-param-reassign */
import React, { useEffect, useState } from 'react'
import { FiSearch } from 'react-icons/fi'
import { v4 } from 'uuid'
import { Button } from '../../components/Button'
import { SimpleInput } from '../../components/SimpleInput'
import { SmallSelectInput } from '../../components/SmallSelectInput'
import { MainContainer } from '../../container/MainContainer'
import { CreateCategory } from '../../modals/CreateCategory'
import { CreatePointOfSale } from '../../modals/CreatePointOfSale'
import { RoutesName } from '../../routes'
import { PaginationContent } from '../../utils/SharedStyles'
import { PointsOfSaleContainer } from './styles'

export function PointsOfSalePage() {
    // hooks

    // state
    const [openCreatePointOfSale, setOpenCreatePointOfSale] = useState(false)

    useEffect(() => {
        ;(async () => {
            console.log('a')
        })()
    }, [])

    return (
        <MainContainer
            path={[{ label: 'Pontos de venda', path: RoutesName.pointsOfSale }]}
            title="Pontos de veda"
            active="points-of-sale"
        >
            <PointsOfSaleContainer>
                <div className="filters">
                    <SimpleInput
                        name="point-filter"
                        label="Busca rápida"
                        icon={FiSearch}
                    />
                    <div className="location-search">
                        <div className="location-search-select">
                            <SmallSelectInput
                                name="location"
                                options={[
                                    { label: 'Todos', value: '1' },
                                    { label: 'Itajaí-SC', value: '1' },
                                ]}
                                placeholder="Localização"
                            />
                        </div>
                        <Button
                            text="Criar ponto de venda"
                            type="button"
                            buttonType="FILLED"
                            color="SECONDARY"
                            onClick={() => setOpenCreatePointOfSale(true)}
                        />
                    </div>
                </div>
                <div className="points-of-sale-content">
                    <PaginationContent>
                        <div className="results">
                            <p>Mostrando 21 - 30 de 88 resultados</p>
                        </div>
                        <div className="pagination" />
                        <div className="number-of-results">
                            <p>Itens por páginas</p>
                            <div className="number-search">
                                <SmallSelectInput
                                    name="number"
                                    placeholder=""
                                    options={[{ label: '10', value: 10 }]}
                                />
                            </div>
                        </div>
                    </PaginationContent>
                </div>
            </PointsOfSaleContainer>
            <CreatePointOfSale
                isOpen={openCreatePointOfSale}
                onRequestClose={() => setOpenCreatePointOfSale(false)}
            />
        </MainContainer>
    )
}
