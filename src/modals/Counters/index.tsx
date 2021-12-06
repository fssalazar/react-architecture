/* eslint-disable no-param-reassign */
/* eslint-disable react/require-default-props */
import React from 'react'
import ModalContainer from 'react-modal'

import { CountersContent } from './styles'

interface Props {
    isOpen: boolean
    onRequestClose: () => void
}

export function Counters({ isOpen, onRequestClose }: Props) {
    return (
        <ModalContainer
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            overlayClassName="react-modal-overlay"
            className="react-modal-content"
        >
            <button
                className="close"
                type="button"
                onClick={() => onRequestClose()}
            >
                X
            </button>
            <CountersContent>
                <h1>a</h1>
            </CountersContent>
        </ModalContainer>
    )
}
