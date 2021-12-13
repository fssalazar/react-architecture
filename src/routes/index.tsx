import React from 'react'
import { Switch } from 'react-router-dom'
import { CategoriesPage } from '../pages/Categories'
import { ChangePasswordPage } from '../pages/ChangePassword'
import { EmailSentPage } from '../pages/EmailSent'
import { ForgotPasswordPage } from '../pages/ForgotPassword'
import { LoginPage } from '../pages/Login'
import { PasswordChangedPage } from '../pages/PasswordChanged'
import { PointsOfSalePage } from '../pages/PointsOfSale'
import { Route } from './route'

export const RoutesName: {
    login: string
    forgotPassword: string
    emailSent: string
    changePassword: string
    passwordChanged: string
    categories: string
    pointsOfSale: string
} = {
    login: '/',
    forgotPassword: '/forgot-password',
    emailSent: '/email-sent',
    changePassword: '/change-password',
    passwordChanged: '/password-changed',
    categories: '/categories',
    pointsOfSale: '/points-of-sale',
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
            <Route
                path={RoutesName.emailSent}
                isPrivate={false}
                exact
                component={EmailSentPage}
            />
            <Route
                path={RoutesName.changePassword}
                isPrivate={false}
                exact
                component={ChangePasswordPage}
            />
            <Route
                path={RoutesName.passwordChanged}
                isPrivate={false}
                exact
                component={PasswordChangedPage}
            />
            <Route
                path={RoutesName.categories}
                isPrivate
                exact
                component={CategoriesPage}
            />
            <Route
                path={RoutesName.pointsOfSale}
                isPrivate
                exact
                component={PointsOfSalePage}
            />
        </Switch>
    )
}
