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
import { PaginationContainer, ProductsContainer } from './styles'
import { Table } from '../../utils/Table'
import { SingleProduct } from '../../components/SingleProduct'
import { HandleProduct } from '../../modals/HandleProduct'
import { useProduct } from '../../hooks/useProduct'
import { ManageProduct } from '../../modals/ManageProduct'
import { useUser } from '../../hooks/use-user'

export function ProductsPage() {
    // hooks
    const {
        getProducts,
        count,
        products,
        productToEdit,
        chooseProductToEdit,
        productToManage,
        chooseProductToManage,
        getUserProducts,
    } = useProduct()
    const { user } = useUser()
    // state
    const [busy, setBusy] = useState(false)
    const [limit, setLimit] = useState<{ label: string; value: number }>({
        label: '10',
        value: 10,
    })
    const [searchString, setSearchString] = useState<string>()
    const [pageSelected, setPageSelected] = useState<number>(1)
    const [personalStockView, setPersonalStockView] = useState(false)
    const [openCreateProduct, setOpenCreateProduct] = useState(false)

    function numberOfPages(countNum: number) {
        return Math.ceil(countNum / limit.value)
    }

    useEffect(() => {
        setBusy(true)
        ;(async () => {
            if (personalStockView === false) {
                await getProducts(
                    limit.value,
                    pageSelected * limit.value - limit.value,
                    searchString === '' ? undefined : searchString
                )
            } else {
                await getUserProducts(
                    limit.value,
                    pageSelected * limit.value - limit.value,
                    searchString === '' ? undefined : searchString
                )
            }
            setBusy(false)
        })()
    }, [limit, pageSelected, searchString, personalStockView])

    return (
        <MainContainer
            path={[{ label: 'Produtos', path: RoutesName.products }]}
            title="Produtos"
            active="products"
            busy={busy}
            btnLabel="Criar produto"
            callback={() => setOpenCreateProduct(true)}
        >
            <ProductsContainer>
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
                <div className="tab-products">
                    {user?.type === 'OWNER' ||
                        (user?.permissions.operateOwnerStock && (
                            <button
                                type="button"
                                onClick={() => setPersonalStockView(false)}
                                className={`tab-btn ${
                                    personalStockView ? 'inactive' : 'active'
                                }`}
                            >
                                Depósito
                            </button>
                        ))}
                    {user?.type !== 'OWNER' && (
                        <button
                            onClick={() => setPersonalStockView(true)}
                            type="button"
                            className={`tab-btn ${
                                !personalStockView ? 'inactive' : 'active'
                            }`}
                        >
                            Pessoal
                        </button>
                    )}
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
                            gridTemplateColumns: '2fr 2fr 2fr 2fr 2fr 0.5fr',
                        }}
                    >
                        <h1>Cód. Produto</h1>
                        <h1>Nome</h1>
                        <h1>No Estoque</h1>
                        <h1>Com usuários</h1>
                        <h1>Em máquinas</h1>
                        <div />
                    </div>
                    {products.map((p) => {
                        return <SingleProduct product={p} key={v4()} />
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
            </ProductsContainer>
            <HandleProduct
                isOpen={openCreateProduct}
                onRequestClose={() => setOpenCreateProduct(false)}
            />
            {productToEdit && (
                <HandleProduct
                    isOpen={!!productToEdit}
                    onRequestClose={() => chooseProductToEdit(undefined)}
                    product={productToEdit}
                />
            )}
            {productToManage && (
                <ManageProduct
                    isOpen={!!productToManage}
                    onRequestClose={() => chooseProductToManage()}
                    type={productToManage.type}
                    product={productToManage.product}
                />
            )}
        </MainContainer>
    )
}
