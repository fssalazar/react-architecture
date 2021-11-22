import React, { useEffect, useState } from 'react'
import {
    Route as ReactDOMRoute,
    RouteProps as ReactDOMRouterProps,
    Redirect,
} from 'react-router-dom'
import { useAuth } from '../hooks/use-auth'

interface ReactProps extends ReactDOMRouterProps {
    isPrivate: boolean
    component: React.ComponentType
}

export function Route({
    component: Component,
    isPrivate,
    ...rest
}: ReactProps) {
    // hooks
    // const { token } = useAuth()
    // state
    const [loading, setLoading] = useState<boolean>(false)

    const token = undefined

    useEffect(() => {
        setLoading(true)
        ;(async () => {
            //  await getUser()
            setLoading(false)
        })()
    }, [token])

    return (
        <>
            {!loading ? (
                <ReactDOMRoute
                    {...rest}
                    render={() => {
                        if (isPrivate) {
                            if (!token) {
                                return <Redirect to={{ pathname: '/' }} />
                            }
                        }
                        if (!isPrivate) {
                            if (token) {
                                return (
                                    <Redirect to={{ pathname: '/dashboard' }} />
                                )
                            }
                        }
                        return <Component />
                    }}
                />
            ) : (
                // TODO => WE NEED TO DO A CIRCULAR PROGRESSIVE COMPONENT
                <div
                    style={{
                        background: '#000',
                        height: '100vh',
                        width: '100%',
                    }}
                />
                // -----------------------------------------------------<
            )}
        </>
    )
}
