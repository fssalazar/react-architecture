import React, { useState } from 'react'
import { Pagination } from '@material-ui/lab'
import { FiSearch } from 'react-icons/fi'
import { SmallSelectInput } from '../../components/SmallSelectInput'
import { MainContainer } from '../../container/MainContainer'
import { RoutesName } from '../../routes'
import { Table } from '../../utils/Table'
import { PaginationContainer } from '../Users/styles'
import { PaginationContent } from '../../utils/SharedStyles'
import { SimpleInput } from '../../components/SimpleInput'
import { CollectionsContainer } from './styles'
import { SingleCollection } from '../../components/SingleCollection'

export function CollectionsPage() {
    // state
    const [busy, setBusy] = useState(false)
    const [limit, setLimit] = useState<{ label: string; value: number }>({
        label: '10',
        value: 10,
    })
    const [searchString, setSearchString] = useState<string>()
    const [pageSelected, setPageSelected] = useState<number>(1)
    const count = 10

    function numberOfPages(countNum: number) {
        return Math.ceil(countNum / limit.value)
    }

    return (
        <MainContainer
            path={[{ label: 'Coletas', path: RoutesName.collections }]}
            title="Coletas"
            active="collections"
            busy={busy}
        >
            <CollectionsContainer>
                <div className="filters">
                    <SimpleInput
                        name="point-filter"
                        label="Busca rápida"
                        icon={FiSearch}
                        onChange={(e: any) => {
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
                        style={{
                            gridTemplateColumns:
                                '1fr 1fr 1fr 1fr 2fr 2fr 2fr 0.5fr',
                        }}
                    >
                        <h1>Id No.</h1>
                        <h1>Tipo</h1>
                        <h1>Máquina</h1>
                        <h1>Modelo</h1>
                        <h1>Usuário</h1>
                        <h1>PDV</h1>
                        <h1>Data</h1>
                        <h1>Revisada</h1>
                    </div>
                    <SingleCollection />
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
                                onChange={(e: any) => {
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
            </CollectionsContainer>
        </MainContainer>
    )
}
