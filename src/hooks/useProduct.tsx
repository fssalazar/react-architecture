/* eslint-disable no-param-reassign */
import React, { createContext, useContext, ReactNode, useState } from 'react'
import { toast } from 'react-toastify'
import { api } from '../service/api'
import { useAuth } from './use-auth'
import { Product } from '../entities/product'
import { CreateProductDto } from '../dtos/CreateProduct'
import { TransferProductDto } from '../dtos/transferProduct'
import { useUser } from './use-user'

interface ProductContext {
    products: Product[]
    product?: Product
    count?: number
    productToManage?: {
        product: Product
        type:
            | 'ADD'
            | 'REMOVE'
            | 'TRANSFER_USER'
            | 'USER_TRANSFER_USER'
            | 'TRANSFER_MACHINE'
            | 'TRANSFER_STOCK'
    }
    chooseProductToManage(
        productData?: Product,
        manageType?:
            | 'ADD'
            | 'REMOVE'
            | 'TRANSFER_USER'
            | 'USER_TRANSFER_USER'
            | 'TRANSFER_MACHINE'
            | 'TRANSFER_STOCK'
    ): void
    chooseProductToEdit(productData?: Product): void
    createProduct(
        data: CreateProductDto,
        file?: File
    ): Promise<Product | undefined>
    getProducts(
        limit?: number,
        offset?: number,
        search?: string
    ): Promise<
        | {
              count: number
              products: Product[]
          }
        | undefined
    >
    getUserProducts(
        limit?: number,
        offset?: number,
        search?: string
    ): Promise<
        | {
              count: number
              products: Product[]
          }
        | undefined
    >
    productToEdit?: Product
    editProduct(
        data: CreateProductDto,
        id: string
    ): Promise<Product | undefined>
    addProduct(quantity: number, id: string): Promise<Product | undefined>
    transferProduct(
        data: TransferProductDto,
        id: string,
        from?: 'USER' | undefined
    ): Promise<Product | undefined>
    deleteProduct(id: string): Promise<boolean | undefined>
    getProductDetail(id: string): Promise<Product | undefined>
    chooseProductToDelete(productData: Product | undefined): void
    productToDelete?: Product
}

interface Props {
    children: ReactNode
}

const ProductContext = createContext({} as ProductContext)

export function ProductProvider({ children }: Props) {
    // hook
    const { token } = useAuth()
    const { user } = useUser()
    // State
    const [products, setProducts] = useState<Product[]>([])
    const [product, setProduct] = useState<Product>()
    const [productToDelete, setProductToDelete] = useState<Product>()
    const [count, setCount] = useState<number>()
    const [productToManage, setProductToManage] = useState<{
        product: Product
        type:
            | 'ADD'
            | 'REMOVE'
            | 'TRANSFER_USER'
            | 'USER_TRANSFER_USER'
            | 'TRANSFER_MACHINE'
            | 'TRANSFER_STOCK'
    }>()
    const [productToEdit, setProductToEdit] = useState<Product>()

    function chooseProductToManage(
        productData?: Product,
        manageType?:
            | 'ADD'
            | 'REMOVE'
            | 'TRANSFER_USER'
            | 'USER_TRANSFER_USER'
            | 'TRANSFER_MACHINE'
            | 'TRANSFER_STOCK'
    ) {
        if (productData && manageType) {
            setProductToManage({ product: productData, type: manageType })
        } else {
            setProductToManage(undefined)
        }
    }
    function chooseProductToEdit(productData: Product | undefined) {
        setProductToEdit(productData)
    }
    function chooseProductToDelete(productData: Product | undefined) {
        setProductToDelete(productData)
    }

    async function getProducts(
        limit?: number,
        offset?: number,
        search?: string
    ) {
        try {
            if (!limit) {
                limit = 10
            }
            if (!offset) {
                offset = 0
            }

            const response = await api.get<{
                count: number
                products: Product[]
            }>('products', {
                headers: {
                    authorization: `Bearer ${token}`,
                },
                params: {
                    limit,
                    offset,
                    search_string: search,
                },
            })
            setCount(response.data.count)
            setProducts(response.data.products)
            return response.data
        } catch (error: any) {
            // localStorage.removeItem('@sttigma:token')
            const e: string = error.response.data.details.pt
            toast.warning(e)
            return undefined
        }
    }

    async function getProductDetail(id: string) {
        try {
            const response = await api.get<Product>(`products/${id}`, {
                headers: {
                    authorization: `Bearer ${token}`,
                },
            })
            setProduct(response.data)
            return response.data
        } catch (error: any) {
            // localStorage.removeItem('@sttigma:token')
            const e: string = error.response.data.details.pt
            toast.warning(e)
            return undefined
        }
    }

    async function getUserProducts(
        limit?: number,
        offset?: number,
        search?: string
    ) {
        try {
            if (!limit) {
                limit = 10
            }
            if (!offset) {
                offset = 0
            }

            const response = await api.get<{
                count: number
                products: Product[]
            }>('products/stock', {
                headers: {
                    authorization: `Bearer ${token}`,
                },
                params: {
                    limit,
                    offset,
                    search_string: search,
                },
            })
            console.log(response.data)
            setCount(response.data.count)
            setProducts(response.data.products)
            return response.data
        } catch (error: any) {
            // localStorage.removeItem('@sttigma:token')
            const e: string = error.response.data.details.pt
            toast.warning(e)
            return undefined
        }
    }

    async function createProduct(data: CreateProductDto, file?: File) {
        try {
            if (file) {
                const formData = new FormData()
                formData.append('file', file)
                Object.keys(data).forEach((key) => {
                    formData.append(key, (data as never)[key])
                })

                const response = await api.post<Product>(
                    '/products',
                    formData,
                    {
                        headers: {
                            authorization: `Bearer ${token}`,
                            'Content-Type': 'multipart/form-data',
                        },
                    }
                )

                setProducts([...products, response.data])

                return response.data
            }
            const response = await api.post<Product>('/products', data, {
                headers: {
                    authorization: `Bearer ${token}`,
                },
            })
            setProducts([...products, response.data])
            return response.data
        } catch (error: any) {
            // localStorage.removeItem('@sttigma:token')
            const e: string = error.response.data.details.pt
            toast.warning(e)
            return undefined
        }
    }

    async function editProduct(data: CreateProductDto, id: string) {
        try {
            const response = await api.patch<Product>(`products/${id}`, data, {
                headers: {
                    authorization: `Bearer ${token}`,
                },
            })
            setProducts((state) => {
                const index = state.findIndex((s) => s.id === id)
                if (index !== undefined) {
                    state[index] = response.data
                }
                return state
            })
            return response.data
        } catch (error: any) {
            // localStorage.removeItem('@sttigma:token')
            const e: string = error.response.data.details.pt
            toast.warning(e)
            return undefined
        }
    }

    async function addProduct(quantity: number, id: string) {
        try {
            const response = await api.patch<Product>(
                `products/${id}/add`,
                { quantity },
                {
                    headers: {
                        authorization: `Bearer ${token}`,
                    },
                }
            )
            setProducts((state) => {
                const index = state.findIndex((s) => s.id === id)
                if (index !== undefined) {
                    state[index] = response.data
                }
                return state
            })
            return response.data
        } catch (error: any) {
            // localStorage.removeItem('@sttigma:token')
            const e: string = error.response.data.details.pt
            toast.warning(e)
            return undefined
        }
    }

    async function deleteProduct(id: string) {
        try {
            await api.delete(`products/${id}`, {
                headers: {
                    authorization: `Bearer ${token}`,
                },
            })
            setProducts((state) => {
                const index = products.findIndex((t) => t.id === id)
                if (index !== undefined) {
                    state.slice(index, 1)
                }
                return [...state]
            })
            return true
        } catch (error: any) {
            // localStorage.removeItem('@sttigma:token')
            const e: string = error.response.data.details.pt
            toast.warning(e)
            return undefined
        }
    }

    async function transferProduct(
        data: TransferProductDto,
        id: string,
        from?: 'USER' | undefined
    ) {
        try {
            const response = await api.patch<Product>(
                `products/${id}/transfer`,
                data,
                {
                    headers: {
                        authorization: `Bearer ${token}`,
                    },
                }
            )
            setProducts((state) => {
                const index = state.findIndex((s) => s.id === id)
                if (from === 'USER') {
                    if (index !== undefined) {
                        const stock = state[index].stock.filter(
                            (s) => s.referenceId === user?.id
                        )
                        state[index] = { ...response.data, stock }
                    }
                    return state
                }
                if (index !== undefined) {
                    state[index] = response.data
                }
                return state
            })
            return response.data
        } catch (error: any) {
            // localStorage.removeItem('@sttigma:token')
            const e: string = error.response.data.details.pt
            toast.warning(e)
            return undefined
        }
    }

    return (
        <ProductContext.Provider
            value={{
                products,
                count,
                product,
                chooseProductToManage,
                productToManage,
                chooseProductToEdit,
                productToEdit,
                createProduct,
                getProducts,
                editProduct,
                addProduct,
                transferProduct,
                getUserProducts,
                deleteProduct,
                getProductDetail,
                chooseProductToDelete,
                productToDelete,
            }}
        >
            {children}
        </ProductContext.Provider>
    )
}

export function useProduct(): ProductContext {
    const context = useContext(ProductContext)
    if (!context) {
        throw new Error('useProduct must be used within a Provider')
    }
    return context
}
