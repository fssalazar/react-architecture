/* eslint-disable import/order */
import React from 'react'

import { Menu, MenuItem, MenuButton, SubMenu } from '@szhsin/react-menu'
import { SinglePersonalProductContainer } from './styles'
import '@szhsin/react-menu/dist/index.css'
import {
    FiBox,
    FiEdit,
    FiEye,
    FiMinus,
    FiPlus,
    FiTrash,
    FiUser,
} from 'react-icons/fi'
import { Product } from '../../entities/product'
import { useProduct } from '../../hooks/useProduct'
import { totalProductInEmployee } from '../../utils/product/function'
import { useHistory } from 'react-router-dom'
import { RoutesName } from '../../routes'

interface Props {
    product: Product
}

export function SinglePersonalProduct({ product }: Props) {
    const menuStyles = {
        width: '16rem',
    }

    const menuItemStyles = {
        color: '#34303E',
        fontSize: '1.4rem',
        padding: '1rem',
        hover: {
            backgroundColor: ' rgba(115, 102, 255, 0.1)',
        },
    }
    const history = useHistory()
    // hooks
    const { chooseProductToEdit, chooseProductToManage } = useProduct()
    return (
        <SinglePersonalProductContainer
            style={{ gridTemplateColumns: '2fr 2fr 2fr 2fr' }}
        >
            <h1 className="f14-700-dark">{product.externalId || '-'}</h1>
            <h1 className="f12-600-gray center">{product.label}</h1>
            <h1 className="f12-600-gray center">
                {totalProductInEmployee(product)}
            </h1>

            <div className="container-menu">
                <Menu
                    menuButton={
                        <MenuButton className="menu-btn">...</MenuButton>
                    }
                    key="left"
                    direction="left"
                    align="start"
                    position="anchor"
                    viewScroll="auto"
                    arrow
                    offsetX={12}
                    offsetY={0}
                    menuStyles={menuStyles}
                >
                    <SubMenu
                        label="Transferir"
                        direction="left"
                        menuStyles={menuItemStyles}
                    >
                        <MenuItem
                            styles={menuItemStyles}
                            onClick={() =>
                                chooseProductToManage(
                                    product,
                                    'USER_TRANSFER_USER'
                                )
                            }
                        >
                            <FiUser style={{ marginRight: '0.5rem' }} />
                            Usuário
                        </MenuItem>
                        <MenuItem
                            styles={menuItemStyles}
                            onClick={() =>
                                chooseProductToManage(product, 'TRANSFER_STOCK')
                            }
                        >
                            <FiBox style={{ marginRight: '0.5rem' }} />
                            Fábrica
                        </MenuItem>
                    </SubMenu>
                    <MenuItem
                        styles={menuItemStyles}
                        onClick={() =>
                            history.push(
                                `${RoutesName.singleProduct}?id=${product.id}`
                            )
                        }
                    >
                        <FiEye style={{ marginRight: '0.5rem' }} />
                        Visualizar
                    </MenuItem>

                    <MenuItem
                        styles={menuItemStyles}
                        onClick={() => chooseProductToEdit(product)}
                    >
                        <FiEdit style={{ marginRight: '0.5rem' }} />
                        Editar
                    </MenuItem>
                </Menu>
            </div>
        </SinglePersonalProductContainer>
    )
}
