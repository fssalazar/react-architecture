import React from 'react'
import { useHistory } from 'react-router-dom'
import { PointOfSale } from '../../entities/pointOfSale'
import { RoutesName } from '../../routes'
import { SinglePointOfSaleContainer } from './styles'

interface Props {
    pointOfSale: PointOfSale
}

export function SinglePointOfSale({ pointOfSale }: Props) {
    const history = useHistory()

    return (
        <SinglePointOfSaleContainer
            type="button"
            style={{ gridTemplateColumns: '1fr 2fr 1fr 1fr 1fr' }}
            onClick={() =>
                history.push(
                    `${RoutesName.singlePointsOfSale}?${pointOfSale.id}`
                )
            }
        >
            <h1 className="f14-700-dark">{pointOfSale.label}</h1>
            <h1 className="f12-600-gray ">
                {pointOfSale.address
                    ? `${pointOfSale.address.city} - ${pointOfSale.address.state}`
                    : ''}
            </h1>
            <h1 className="f12-600-gray ">
                {pointOfSale.phoneNumber ? pointOfSale.phoneNumber : ''}
            </h1>
            <h1 className="f12-600-gray "> </h1>
        </SinglePointOfSaleContainer>
    )
}
