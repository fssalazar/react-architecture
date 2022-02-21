import React from 'react'
import { FiCheck, FiX } from 'react-icons/fi'
import { useHistory } from 'react-router-dom'
import { Collection } from '../../entities/collection'
import { RoutesName } from '../../routes'
import { Avatar } from '../Avatar'
import { SingleCollectionContainer } from './styles'

interface Props {
    collection?: Collection
}

export function SingleCollection({ collection }: Props) {
    const history = useHistory()

    function reviewIcon(boolean: boolean) {
        if (boolean) {
            return <FiCheck style={{ color: 'green' }} />
        }
        return <FiX style={{ color: 'red' }} />
    }

    return (
        <SingleCollectionContainer
            type="button"
            style={{ gridTemplateColumns: '1fr 1fr 1fr 1fr 2fr 2fr 2fr 0.5fr' }}
            onClick={() =>
                history.push(
                    `${RoutesName.singleCollection}?${collection?.id || ''}`
                )
            }
        >
            <h1 className="f12-600-gray ">012921097</h1>
            <h1 className="type">Completa</h1>
            <h1 className="f14-700-dark">RO1002</h1>
            <span className="f12-600-gray">Carrossel</span>
            <div className="employee">
                <div className="avatar">
                    <Avatar label="FS" />
                </div>
                <div className="info">
                    <h2>Darrell Steward</h2>
                    <p>Gerente</p>
                </div>
            </div>
            <div className="pdv">
                <h2>Pizzaria Disco Voador</h2>
                <p>Porto Alegre - RS</p>
            </div>
            <h1 className="f12-600-gray ">31 JUL 2021</h1>
            <div className="review">{reviewIcon(true)}</div>
        </SingleCollectionContainer>
    )
}
