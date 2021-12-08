/* eslint-disable no-param-reassign */
import React, { useEffect, useState } from 'react'
import { FiXCircle } from 'react-icons/fi'
import { RiArrowUpSLine } from 'react-icons/ri'
import { v4 } from 'uuid'
import { Button } from '../../components/Button'
import { SelectInput } from '../../components/SelectInput'
import { SmallSelectInput } from '../../components/SmallSelectInput'
import { MainContainer } from '../../container/MainContainer'
import { Category } from '../../entities/category'
import { useCategory } from '../../hooks/useCategory'
import { CreateCategory } from '../../modals/CreateCategory'
import { CategoriesContent } from './styles'

export function CategoriesPage() {
    // hooks
    const { categories, getCategories, counterTypes, getCounterTypes } =
        useCategory()
    // state
    const [selectedCategory, setSelectedCategory] = useState<Category>()
    const [openCreateCategory, setOpenCreateCategory] = useState(false)
    const [canEdit, setCanEdit] = useState(false)

    function closeCreateCategory() {
        setOpenCreateCategory(false)
    }

    const pin = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]

    function getPins() {
        selectedCategory?.boxes.forEach((b) => {
            b.counters.forEach((c) => {
                pin.forEach((p, index) => {
                    if (c.pin === p) {
                        pin.splice(index, 1)
                    }
                })
            })
        })
        return pin
    }

    useEffect(() => {
        ;(async () => {
            await getCategories()
            await getCounterTypes()
        })()
    }, [])

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
                            onChange={(e) => {
                                if (e) {
                                    setSelectedCategory(
                                        categories.find((c) => c.id === e.value)
                                    )
                                }
                            }}
                            options={categories.map((category) => {
                                return {
                                    label: category.label,
                                    value: category.id,
                                }
                            })}
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
                                setOpenCreateCategory(true)
                            }}
                        />
                    </div>
                </div>
                <div className="category">
                    {selectedCategory && (
                        <div className="category-container">
                            {selectedCategory &&
                                selectedCategory.boxes.map((box, index) => {
                                    return (
                                        <div
                                            className="category-box"
                                            key={v4()}
                                        >
                                            <div className="header">
                                                <div className="title">
                                                    <h1 className="f16-700-dark">
                                                        {box.label}
                                                    </h1>
                                                </div>
                                                <button type="button">
                                                    <RiArrowUpSLine />
                                                </button>
                                            </div>
                                            <div className="category-content">
                                                <div className="titles">
                                                    <h1 className="f14-500-gray ">
                                                        Contador
                                                    </h1>
                                                    <h1 className="f14-500-gray ">
                                                        Telemetria
                                                    </h1>
                                                    <h1 className="f14-500-gray ">
                                                        Digital
                                                    </h1>
                                                    <h1 className="f14-500-gray ">
                                                        Analógico
                                                    </h1>
                                                </div>
                                                {box.counters.map(
                                                    (counter, idx) => {
                                                        return (
                                                            <div
                                                                className="category-form"
                                                                key={v4()}
                                                            >
                                                                <SmallSelectInput
                                                                    name="counterType"
                                                                    value={{
                                                                        label:
                                                                            counter
                                                                                .counterType
                                                                                .label ||
                                                                            'Selecione',
                                                                        value: counter
                                                                            .counterType
                                                                            .id,
                                                                    }}
                                                                    onChange={(
                                                                        e
                                                                    ) => {
                                                                        if (e) {
                                                                            setSelectedCategory(
                                                                                (
                                                                                    state
                                                                                ) => {
                                                                                    state =
                                                                                        selectedCategory
                                                                                    state.boxes[
                                                                                        index
                                                                                    ].counters[
                                                                                        idx
                                                                                    ].counterType =
                                                                                        e.value
                                                                                    return {
                                                                                        ...state,
                                                                                    }
                                                                                }
                                                                            )
                                                                        }
                                                                    }}
                                                                    options={counterTypes.map(
                                                                        (c) => {
                                                                            return {
                                                                                label: c.label,
                                                                                value: c.id,
                                                                            }
                                                                        }
                                                                    )}
                                                                />
                                                                <SmallSelectInput
                                                                    name="pin"
                                                                    value={{
                                                                        label:
                                                                            counter.pin ===
                                                                            0
                                                                                ? 'Selecione'
                                                                                : `Pino ${counter.pin}`,
                                                                        value: counter.pin,
                                                                    }}
                                                                    onChange={(
                                                                        e
                                                                    ) => {
                                                                        if (e) {
                                                                            setSelectedCategory(
                                                                                (
                                                                                    state
                                                                                ) => {
                                                                                    state =
                                                                                        selectedCategory
                                                                                    state.boxes[
                                                                                        index
                                                                                    ].counters[
                                                                                        idx
                                                                                    ].pin =
                                                                                        e.value
                                                                                    return {
                                                                                        ...state,
                                                                                    }
                                                                                }
                                                                            )
                                                                        }
                                                                    }}
                                                                    options={getPins().map(
                                                                        (p) => {
                                                                            return {
                                                                                label: `Pino ${p}`,
                                                                                value: p,
                                                                            }
                                                                        }
                                                                    )}
                                                                />
                                                                <div className="type-input">
                                                                    <input
                                                                        type="checkbox"
                                                                        checked={
                                                                            selectedCategory
                                                                                .boxes[
                                                                                index
                                                                            ]
                                                                                .counters[
                                                                                idx
                                                                            ]
                                                                                .isDigital
                                                                        }
                                                                        onChange={(
                                                                            e
                                                                        ) =>
                                                                            setSelectedCategory(
                                                                                (
                                                                                    state
                                                                                ) => {
                                                                                    state =
                                                                                        selectedCategory
                                                                                    state.boxes[
                                                                                        index
                                                                                    ].counters[
                                                                                        idx
                                                                                    ].isDigital =
                                                                                        e.target.checked
                                                                                    return {
                                                                                        ...state,
                                                                                    }
                                                                                }
                                                                            )
                                                                        }
                                                                    />
                                                                </div>
                                                                <div className="type-input">
                                                                    <input
                                                                        type="checkbox"
                                                                        checked={
                                                                            selectedCategory
                                                                                .boxes[
                                                                                index
                                                                            ]
                                                                                .counters[
                                                                                idx
                                                                            ]
                                                                                .isMechanical
                                                                        }
                                                                        onChange={(
                                                                            e
                                                                        ) =>
                                                                            setSelectedCategory(
                                                                                (
                                                                                    state
                                                                                ) => {
                                                                                    state =
                                                                                        selectedCategory
                                                                                    state.boxes[
                                                                                        index
                                                                                    ].counters[
                                                                                        idx
                                                                                    ].isMechanical =
                                                                                        e.target.checked
                                                                                    return {
                                                                                        ...state,
                                                                                    }
                                                                                }
                                                                            )
                                                                        }
                                                                    />
                                                                </div>
                                                                <button
                                                                    type="button"
                                                                    className="delete-counter"
                                                                    onClick={() =>
                                                                        setSelectedCategory(
                                                                            (
                                                                                state
                                                                            ) => {
                                                                                state =
                                                                                    selectedCategory
                                                                                state.boxes[
                                                                                    index
                                                                                ].counters.splice(
                                                                                    idx,
                                                                                    1
                                                                                )
                                                                                return {
                                                                                    ...state,
                                                                                }
                                                                            }
                                                                        )
                                                                    }
                                                                >
                                                                    <FiXCircle />
                                                                </button>
                                                            </div>
                                                        )
                                                    }
                                                )}
                                                <div className="add-counter-btn">
                                                    <button
                                                        type="button"
                                                        onClick={() => {
                                                            setSelectedCategory(
                                                                (state) => {
                                                                    state =
                                                                        selectedCategory
                                                                    state.boxes[
                                                                        index
                                                                    ].counters.push(
                                                                        {
                                                                            isDigital:
                                                                                false,
                                                                            isMechanical:
                                                                                false,
                                                                            pin: 0,
                                                                            counterType:
                                                                                {
                                                                                    label: '',
                                                                                    type: '',
                                                                                },
                                                                        }
                                                                    )
                                                                    return {
                                                                        ...state,
                                                                    }
                                                                }
                                                            )
                                                        }}
                                                    >
                                                        Adicionar contador
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })}
                        </div>
                    )}
                </div>
            </CategoriesContent>
            <CreateCategory
                isOpen={openCreateCategory}
                onRequestClose={closeCreateCategory}
            />
        </MainContainer>
    )
}
