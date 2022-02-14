/* eslint-disable no-param-reassign */
/* eslint-disable react/require-default-props */
import React from 'react'
import ModalContainer from 'react-modal'
import { Button } from '../../components/Button'
import { WarningContent } from './styles'

interface Props {
    isOpen: boolean
    onRequestClose: () => void
    title: string
    subTitle: string
    callback(): Promise<void>
}

export function WarningModal({
    isOpen,
    onRequestClose,
    title,
    subTitle,
    callback,
}: Props) {
    return (
        <ModalContainer
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            overlayClassName="react-modal-overlay"
            className="react-modal-product"
        >
            <button
                className="close"
                type="button"
                onClick={() => onRequestClose()}
            >
                X
            </button>
            <WarningContent>
                <h1>{title}</h1>
                <p>{subTitle}</p>
                <div className="btns">
                    <Button
                        text="Cancelar"
                        type="button"
                        buttonType="TEXT"
                        color="WARNING"
                        onClick={() => onRequestClose()}
                    />
                    <Button
                        text="Confirmar"
                        type="submit"
                        buttonType="FILLED"
                        color="SECONDARY"
                        onClick={() => {
                            callback()
                        }}
                    />
                </div>
            </WarningContent>
        </ModalContainer>
    )
}
