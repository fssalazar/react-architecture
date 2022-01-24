/* eslint-disable import/no-unresolved */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable react/no-array-index-key */
/* eslint-disable no-param-reassign */
import React, { useEffect, useState } from 'react'
import { FiSearch } from 'react-icons/fi'
import { Pagination } from '@material-ui/lab'
import { Button } from '../../components/Button'
import { SimpleInput } from '../../components/SimpleInput'
import { SmallSelectInput } from '../../components/SmallSelectInput'
import { MainContainer } from '../../container/MainContainer'
import { usePointOfSale } from '../../hooks/usePointOfSale'
import { HandlePointOfSale } from '../../modals/HandlePointOfSale'
import { RoutesName } from '../../routes'
import { PaginationContent } from '../../utils/SharedStyles'
import { PaginationContainer, PointsOfSaleContainer } from './styles'
import { Table } from '../../utils/Table'
import { SinglePointOfSale } from '../../components/SinglePointOfSale'

export function PointsOfSalePage() {
    // hooks
    const { getPointsOfSale, count, pointsOfSale } = usePointOfSale()
    // state
    const [openCreatePointOfSale, setOpenCreatePointOfSale] = useState(false)
    const [busy, setBusy] = useState(false)
    const [limit, setLimit] = useState<{ label: string; value: number }>({
        label: '10',
        value: 10,
    })
    const [searchString, setSearchString] = useState<string>()
    const [pageSelected, setPageSelected] = useState<number>(1)

    function numberOfPages(countNum: number) {
        return Math.ceil(countNum / limit.value)
    }

    useEffect(() => {
        setBusy(true)
        ;(async () => {
            getPointsOfSale(
                limit.value,
                pageSelected * limit.value - limit.value,
                searchString === '' ? undefined : searchString
            )
            setBusy(false)
        })()
    }, [limit, pageSelected, searchString])

    return (
        <MainContainer
            path={[{ label: 'Pontos de venda', path: RoutesName.pointsOfSale }]}
            title="Pontos de veda"
            active="points-of-sale"
            busy={busy}
            btnLabel="Criar ponto de venda"
            callback={() => setOpenCreatePointOfSale(true)}
        >
            <PointsOfSaleContainer>
                <div className="filters">
                    <SimpleInput
                        name="point-filter"
                        label="Busca rápida"
                        icon={FiSearch}
                        onChange={(e) => {
                            setSearchString(e.target.value)
                            setPageSelected(1)
                        }}
                    />
                    <div className="location-search">
                        {/* <div className="location-search-select">
                            <SmallSelectInput
                                name="location"
                                options={[
                                    { label: 'Todos', value: '1' },
                                    { label: 'Itajaí-SC', value: '1' },
                                ]}
                                placeholder="Localização"
                            />
                        </div> */}
                    </div>
                </div>
                <div className="points-of-sale-content">
                    <PaginationContent>
                        <div className="results">
                            <p>{`Mostrando ${
                                pageSelected * limit.value - limit.value + 1
                            } - ${
                                pageSelected * limit.value < count!
                                    ? pageSelected * limit.value
                                    : count
                            } de ${count} resultados`}</p>
                        </div>
                        <PaginationContainer>
                            <Pagination
                                count={numberOfPages(count || 0)}
                                color="primary"
                                variant="outlined"
                                page={pageSelected}
                                onChange={(
                                    event: any,
                                    page: React.SetStateAction<number>
                                ) => {
                                    setPageSelected(page)
                                }}
                            />
                        </PaginationContainer>
                        <div className="number-of-results">
                            <p>Itens por páginas</p>
                            <div className="number-search">
                                <SmallSelectInput
                                    name="number"
                                    placeholder=""
                                    value={limit}
                                    options={[
                                        { label: '10', value: 10 },
                                        { label: '20', value: 20 },
                                        { label: '50', value: 50 },
                                        { label: '100', value: 100 },
                                    ]}
                                    onChange={(e) => {
                                        if (e) {
                                            setLimit({
                                                label: e.label,
                                                value: e.value,
                                            })
                                        }
                                    }}
                                />
                            </div>
                        </div>
                    </PaginationContent>
                </div>
                <Table>
                    <div
                        className="table-header"
                        style={{ gridTemplateColumns: '1fr 2fr 1fr 1fr 1fr' }}
                    >
                        <h1>Nome</h1>
                        <h1>Localização</h1>
                        <h1>Telefone</h1>
                        <button type="button">Qtd. Máquinas</button>
                        <button type="button">Última visita</button>
                    </div>
                    {pointsOfSale.map((pointOfSale) => {
                        return <SinglePointOfSale pointOfSale={pointOfSale} />
                    })}
                </Table>
                <PaginationContent>
                    <div className="results">
                        <p>{`Mostrando ${
                            pageSelected * limit.value - limit.value + 1
                        } - ${
                            pageSelected * limit.value < count!
                                ? pageSelected * limit.value
                                : count
                        } de ${count} resultados`}</p>
                    </div>
                    <PaginationContainer>
                        <Pagination
                            count={numberOfPages(count || 0)}
                            color="primary"
                            variant="outlined"
                            page={pageSelected}
                            onChange={(
                                event: any,
                                page: React.SetStateAction<number>
                            ) => {
                                setPageSelected(page)
                            }}
                        />
                    </PaginationContainer>
                    <div className="number-of-results">
                        <p>Itens por páginas</p>
                        <div className="number-search">
                            <SmallSelectInput
                                name="number"
                                placeholder=""
                                value={limit}
                                options={[
                                    { label: '10', value: 10 },
                                    { label: '20', value: 20 },
                                    { label: '50', value: 50 },
                                    { label: '100', value: 100 },
                                ]}
                                onChange={(e) => {
                                    if (e) {
                                        setLimit({
                                            label: e.label,
                                            value: e.value,
                                        })
                                    }
                                }}
                            />
                        </div>
                    </div>
                </PaginationContent>
            </PointsOfSaleContainer>

            <HandlePointOfSale
                isOpen={openCreatePointOfSale}
                onRequestClose={() => setOpenCreatePointOfSale(false)}
            />
        </MainContainer>
    )
}
