/* eslint-disable import/no-unresolved */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable react/no-array-index-key */
/* eslint-disable no-param-reassign */
import React, { useEffect, useState } from 'react'
import { FiSearch } from 'react-icons/fi'
import { Pagination } from '@material-ui/lab'
import { v4 } from 'uuid'
import { Button } from '../../components/Button'
import { SimpleInput } from '../../components/SimpleInput'
import { SmallSelectInput } from '../../components/SmallSelectInput'
import { MainContainer } from '../../container/MainContainer'
import { RoutesName } from '../../routes'
import { PaginationContent } from '../../utils/SharedStyles'
import { PaginationContainer, PointsOfSaleContainer } from './styles'
import { Table } from '../../utils/Table'
import { HandleUser } from '../../modals/HandleUser'
import { useUser } from '../../hooks/use-user'
import { SingleUser } from '../../components/SingleUser'

export function UsersPage() {
    // hooks
    const { getUsers, users, userToEdit, chooseUserToEdit } = useUser()
    // state
    const [openCreateUser, setOpenCreateUser] = useState(false)
    const [busy, setBusy] = useState(false)
    const [limit, setLimit] = useState<{ label: string; value: number }>({
        label: '10',
        value: 10,
    })
    const [pageSelected, setPageSelected] = useState<number>(1)

    function numberOfPages(countNum: number) {
        return Math.ceil(countNum / limit.value)
    }

    useEffect(() => {
        setBusy(true)
        ;(async () => {
            getUsers()
            setBusy(false)
        })()
    }, [])

    return (
        <MainContainer
            path={[{ label: 'Usuários', path: RoutesName.users }]}
            title="Usuários"
            active="users"
            busy={busy}
        >
            <PointsOfSaleContainer>
                <div className="filters">
                    <SimpleInput
                        name="point-filter"
                        label="Busca rápida"
                        icon={FiSearch}
                    />
                    <div className="location-search">
                        <Button
                            text="Criar usuário"
                            type="button"
                            buttonType="FILLED"
                            color="SECONDARY"
                            onClick={() => setOpenCreateUser(true)}
                        />
                    </div>
                </div>
                <div className="points-of-sale-content">
                    <PaginationContent>
                        <div className="results">
                            <p>{`Mostrando ${
                                pageSelected * limit.value - limit.value + 1
                            } - ${
                                pageSelected * limit.value < users.length
                                    ? pageSelected * limit.value
                                    : users.length
                            } de ${users.length} resultados`}</p>
                        </div>
                        <PaginationContainer>
                            <Pagination
                                count={numberOfPages(users.length || 0)}
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
                            gridTemplateColumns: '1fr 2fr 1fr 1fr 1fr 0.5fr',
                        }}
                    >
                        <h1>Nome</h1>
                        <h1>Cargo</h1>
                        <h1>Telefone</h1>
                        <button type="button">E-mail</button>
                        <button type="button">Último acesso</button>
                        <h1>#</h1>
                    </div>
                    {users.map((user) => {
                        return <SingleUser user={user} key={v4()} />
                    })}
                </Table>
                <PaginationContent>
                    <div className="results">
                        <p>{`Mostrando ${
                            pageSelected * limit.value - limit.value + 1
                        } - ${
                            pageSelected * limit.value < users.length
                                ? pageSelected * limit.value
                                : users.length
                        } de ${users.length} resultados`}</p>
                    </div>
                    <PaginationContainer>
                        <Pagination
                            count={numberOfPages(users.length || 0)}
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
            {openCreateUser && (
                <HandleUser
                    isOpen={openCreateUser}
                    onRequestClose={() => setOpenCreateUser(false)}
                />
            )}
            {userToEdit && (
                <HandleUser
                    user={userToEdit}
                    isOpen={!!userToEdit}
                    onRequestClose={() => chooseUserToEdit(undefined)}
                />
            )}
        </MainContainer>
    )
}
