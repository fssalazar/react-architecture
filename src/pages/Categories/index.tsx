import React, { useState } from 'react'
import { Button } from '../../components/Button'
import { SelectInput } from '../../components/SelectInput'
import { MainContainer } from '../../container/MainContainer'
import { CreateCategory } from '../../modals/CreateCategory'
import { CategoriesContent } from './styles'

export function CategoriesPage() {
    // state
    const [openCreateCategory, setOpenCreateCategory] = useState(false)

    function closeCreateCategory() {
        setOpenCreateCategory(false)
    }

    return (
        <MainContainer
            path={[{ label: 'Categorias', path: '/categories' }]}
            title="Categorias"
        >
            <CategoriesContent>
                <div className="header-content">
                    <div className="select-category">
                        <SelectInput
                            name="categories"
                            placeholder="Selecione uma categoria"
                            options={[{ label: 'Grua', value: '123' }]}
                        />
                    </div>
                    <div className="header-btns">
                        <Button
                            type="button"
                            buttonType="FILLED"
                            color="SECONDARY"
                            text="Contadores"
                        />
                        <Button
                            type="button"
                            buttonType="BORDERED"
                            color="PRIMARY"
                            text="Editar"
                        />
                        <Button
                            type="button"
                            buttonType="FILLED"
                            color="SECONDARY"
                            text="Criar"
                            onClick={() => {
                                console.log('lala')
                                setOpenCreateCategory(true)
                            }}
                        />
                    </div>
                </div>
            </CategoriesContent>
            <CreateCategory
                isOpen={openCreateCategory}
                onRequestClose={closeCreateCategory}
            />
        </MainContainer>
    )
}
