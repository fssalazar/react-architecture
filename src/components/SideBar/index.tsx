import React from 'react'
import { FaChartPie } from 'react-icons/fa'
import { BiWorld, BiDotsHorizontalRounded } from 'react-icons/bi'
import { BsArrowBarLeft } from 'react-icons/bs'
import { IconType } from 'react-icons/lib'
import { v4 } from 'uuid'
import { SideBarContainer } from './styles'
import Logo from '../../assets/logo-icon.svg'
import UserImg from '../../assets/user.png'

interface Props {
    active: string
}

export function SideBar({ active }: Props) {
    const tabs: {
        name: string
        path: string
        icon: IconType
        class: string
    }[] = [
        {
            name: 'Dashboard',
            path: '/dashboard',
            class: 'dashboard',
            icon: FaChartPie,
        },
        {
            name: 'Máquinas',
            path: '/machines',
            class: 'machines',
            icon: BiWorld,
        },
        {
            name: 'Categorias',
            path: '/categories',
            class: 'categories',
            icon: FaChartPie,
        },
        {
            name: 'Coleta',
            path: '/collections',
            class: 'collections',
            icon: FaChartPie,
        },
        {
            name: 'Telemetria',
            path: '/telemetries',
            class: 'telemetries',
            icon: FaChartPie,
        },
        {
            name: 'Estoque',
            path: '/stock',
            class: 'stock',
            icon: FaChartPie,
        },
        {
            name: 'Inventario',
            path: '/inventary',
            class: 'inventary',
            icon: FaChartPie,
        },
        {
            name: 'Ponto de venda',
            path: '/point-of-sales',
            class: 'point-of-sales',
            icon: FaChartPie,
        },
        {
            name: 'Relatórios',
            path: '/reports',
            class: 'reports',
            icon: FaChartPie,
        },
        {
            name: 'Usuários',
            path: '/users',
            class: 'users',
            icon: FaChartPie,
        },
    ]

    return (
        <SideBarContainer style={{ width: '28.8rem' }}>
            <div className="logo">
                <img src={Logo} alt="" />
            </div>
            <div className="contractor-btn">
                <button type="button">
                    <BsArrowBarLeft />
                </button>
            </div>
            <div className="nav-items">
                {tabs.map((tab) => {
                    return (
                        <button
                            key={v4()}
                            className={`nav-item ${
                                tab.class === active && 'nav-item-active'
                            }`}
                            type="button"
                        >
                            <tab.icon />
                            <h1 className="tab-name">{tab.name}</h1>
                        </button>
                    )
                })}
            </div>
            <div className="need-help">
                <button className="nav-item" type="button">
                    <FaChartPie />
                    <h1 className="tab-name">Ajuda?</h1>
                </button>
            </div>
            <div className="divider" />
            <div className="user-menu">
                <div className="user-img">
                    <img src={UserImg} alt="" />
                </div>
                <div className="user-info">
                    <h1 className="f14-700-dark">Zé da Silva</h1>
                    <p className="f12-500-gray">zedasilva@sttigma.com</p>
                </div>
                <BiDotsHorizontalRounded />
            </div>
        </SideBarContainer>
    )
}
