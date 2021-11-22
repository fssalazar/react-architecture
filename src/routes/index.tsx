import React from 'react'
import { Switch } from 'react-router-dom'
import { ForgotPasswordPage } from '../pages/ForgotPassword'
import { LoginPage } from '../pages/Login'
import { Route } from './route'

export const RoutesName: { login: string; forgotPassword: string } = {
    login: '/',
    forgotPassword: '/forgot-password',
}

export function Routes() {
    return (
        <Switch>
            <Route
                path={RoutesName.login}
                isPrivate={false}
                exact
                component={LoginPage}
            />
            <Route
                path={RoutesName.forgotPassword}
                isPrivate={false}
                exact
                component={ForgotPasswordPage}
            />
        </Switch>
    )
}
