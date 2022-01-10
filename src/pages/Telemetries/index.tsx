/* eslint-disable import/no-unresolved */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable react/no-array-index-key */
/* eslint-disable no-param-reassign */
import React, { useEffect, useState } from 'react'
import { FiSearch } from 'react-icons/fi'
import { Pagination } from '@material-ui/lab'
import { v4 } from 'uuid'
import { SimpleInput } from '../../components/SimpleInput'
import { SmallSelectInput } from '../../components/SmallSelectInput'
import { MainContainer } from '../../container/MainContainer'
import { RoutesName } from '../../routes'
import { PaginationContent } from '../../utils/SharedStyles'
import { PaginationContainer, PointsOfSaleContainer } from './styles'
import { Table } from '../../utils/Table'
import { SingleTelemetry } from '../../components/SingleTelemetry'
import { useTelemetry } from '../../hooks/useTelemetry'
import { TelemetryInfo } from '../../modals/TelemetryInfo'

export function TelemetriesPage() {
    // hooks
    const { telemetry, chooseTelemetry, getTelemetries, telemetries, count } =
        useTelemetry()
    // state
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
            await getTelemetries(
                limit.value,
                pageSelected * limit.value - limit.value,
                searchString === '' ? undefined : searchString
            )
            setBusy(false)
        })()
    }, [limit, pageSelected, searchString])

    return (
        <MainContainer
            path={[{ label: 'Telemetrias', path: RoutesName.telemetries }]}
            title="Telemetrias"
            active="telemetries"
            busy={busy}
        >
            <PointsOfSaleContainer>
                <div className="filters">
                    <SimpleInput
                        name="telemeries-filter"
                        label="Busca rápida"
                        icon={FiSearch}
                        onChange={(e) => {
                            setSearchString(e.target.value)
                            setPageSelected(1)
                        }}
                    />
                    <div className="location-search" />
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
                                count={numberOfPages(1 || 0)}
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
                            gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr',
                        }}
                    >
                        <h1>ID</h1>
                        <h1>Máquina</h1>
                        <h1>Conexão</h1>
                        <h1>Última comunicação</h1>
                        <button type="button">Status</button>
                    </div>
                    {telemetries.map((t) => {
                        return <SingleTelemetry telemetry={t} key={v4()} />
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
            {telemetry && (
                <TelemetryInfo
                    isOpen={!!telemetry}
                    telemetry={telemetry}
                    onRequestClose={() => chooseTelemetry(undefined)}
                />
            )}
        </MainContainer>
    )
}
