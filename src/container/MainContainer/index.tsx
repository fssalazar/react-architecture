import React, { Children, ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { BsHouseDoor } from 'react-icons/bs'
import { v4 } from 'uuid'
import { SideBar } from '../../components/SideBar'
import { MainContainerStyled } from './styles'

interface Props {
    children: ReactNode
    path: { label: string; path: string }[]
    title: string
}

export function MainContainer({ children, path, title }: Props) {
    return (
        <MainContainerStyled>
            <SideBar active="categories" />
            <div className="content">
                <div className="path">
                    <div className="general-path">
                        <Link to="/dashboard">
                            <BsHouseDoor />
                            <h2>Visão Geral / </h2>
                        </Link>
                    </div>
                    {path.map((p) => {
                        return (
                            <Link to={p.path} key={v4()}>
                                <h2>{`${p.label}`}</h2>
                            </Link>
                        )
                    })}
                </div>
                <h1 className="title">{title}</h1>
                {children}
            </div>
        </MainContainerStyled>
    )
}
