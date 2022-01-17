import React, { Children, ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { BsHouseDoor } from 'react-icons/bs'
import { v4 } from 'uuid'
import { SideBar } from '../../components/SideBar'
import { MainContainerStyled } from './styles'
import { Button } from '../../components/Button'

interface Props {
    children: ReactNode
    path: { label: string; path: string }[]
    title: string
    active: string
    busy: boolean
    btnLabel?: string
    callback?(): void
}

export function MainContainer({
    children,
    path,
    title,
    active,
    busy,
    btnLabel,
    callback,
}: Props) {
    return (
        <MainContainerStyled>
            <SideBar active={active} />
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
                <div className="title-button">
                    <h1 className="title">{title}</h1>
                    <Button
                        className="header-btn"
                        type="button"
                        buttonType="FILLED"
                        text={btnLabel || ''}
                        color="SECONDARY"
                        onClick={() => callback && callback()}
                    />
                </div>
                {busy ? <div /> : <>{children}</>}
            </div>
        </MainContainerStyled>
    )
}
