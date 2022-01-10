import React from 'react'
import { GeneralUser } from '../../entities/generalUser'
import { useUser } from '../../hooks/use-user'
import { Avatar } from '../Avatar'
import { SingleUserContainer } from './styles'

interface Props {
    user: GeneralUser
}

export function SingleUser({ user }: Props) {
    const { chooseUserToEdit } = useUser()
    return (
        <>
            <SingleUserContainer
                type="button"
                style={{ gridTemplateColumns: '1fr 2fr 1fr 1fr 1fr 0.5fr' }}
                onClick={() => {
                    chooseUserToEdit(user)
                }}
            >
                <h1 className="f14-700-dark">{`${user.firstName} ${user.lastName}`}</h1>
                <h1 className="f12-600-gray ">{user.permissions.label}</h1>
                <h1 className="f12-600-gray ">Telefone</h1>
                <h1 className="f12-600-gray ">{user.email}</h1>
                <h1 className="f12-600-gray ">Ultimo </h1>
                <Avatar label={`${user.firstName[0]}${user.lastName[0]}`} />
            </SingleUserContainer>
        </>
    )
}
