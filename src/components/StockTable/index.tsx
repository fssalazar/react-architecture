import React from 'react'
import { Avatar } from '../Avatar'

import { StockTableContainer } from './styles'

interface Props {
    machineStock?: {
        category: string
        label: string
        minStock: number
        stock: number
    }
    userStock?: {
        name: string
        photoUrl: string
        stock: number
        userTemplateLabel: string
    }
}

export function StockTable({ machineStock, userStock }: Props) {
    const firstName = userStock?.name.split(' ')[0]
    const secondName = userStock?.name.split(' ')[1]

    return (
        <>
            {machineStock && (
                <StockTableContainer
                    style={{
                        gridTemplateColumns: '1fr 2fr 2fr 2fr',
                        padding: ' 1.25rem 0',
                    }}
                >
                    <h1 className="f12-600-gray">{machineStock.label}</h1>
                    <h1 className="f14-700-dark">{machineStock.category}</h1>
                    <h1 className="f12-600-gray" style={{ color: '#4D77FF' }}>
                        {machineStock.stock}
                    </h1>
                    <h1 className="f12-600-gray">{machineStock.minStock}</h1>
                </StockTableContainer>
            )}
            {userStock && (
                <StockTableContainer
                    style={{ gridTemplateColumns: '1fr 2fr 2fr 2fr' }}
                >
                    <Avatar
                        label={`${firstName ? firstName[0] : ''}${
                            secondName ? secondName[0] : ''
                        }`}
                        img={
                            userStock.photoUrl ? userStock.photoUrl : undefined
                        }
                    />
                    <h1 className="f12-600-gray ">{userStock.name}</h1>
                    <h1 className="f14-700-dark ">
                        {userStock.userTemplateLabel}
                    </h1>
                    <h1 className="f12-600-gray " style={{ color: '#4D77FF' }}>
                        {userStock.stock}
                    </h1>
                </StockTableContainer>
            )}
        </>
    )
}
