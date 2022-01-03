/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable react/no-array-index-key */
/* eslint-disable no-param-reassign */
import React, { useEffect, useState } from 'react'
import { FiXCircle } from 'react-icons/fi'
import { RiArrowUpSLine } from 'react-icons/ri'
import { toast } from 'react-toastify'
import { v4 } from 'uuid'
import { Button } from '../../components/Button'
import { SelectInput } from '../../components/SelectInput'
import { SimpleInput } from '../../components/SimpleInput'
import { SmallSelectInput } from '../../components/SmallSelectInput'
import { MainContainer } from '../../container/MainContainer'
import { Box, Category } from '../../entities/category'
import { useCategory } from '../../hooks/useCategory'
import { CreateCategory } from '../../modals/CreateCategory'
import { CategoriesContent } from './styles'

export function CategoriesPage() {
    // hooks
    const {
        categories,
        editCategory,
        getCategories,
        counterTypes,
        getCounterTypes,
        deleteCategory,
    } = useCategory()
    // state
    const [selectedCategory, setSelectedCategory] = useState<Category>()
    const [openCreateCategory, setOpenCreateCategory] = useState(false)
    const [canEdit, setCanEdit] = useState(false)
    const [busy, setBusy] = useState(false)
    const [editLoader, setEditLoader] = useState(false)

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
        setBusy(true)
        ;(async () => {
            await getCategories()
            await getCounterTypes()
            setBusy(false)
        })()
    }, [])

    useEffect(() => {
        if (!selectedCategory) {
            setBusy(true)
            ;(async () => {
                await getCategories()
                setBusy(false)
            })()
        }
    }, [selectedCategory])

    return (
        <MainContainer
            path={[{ label: 'Categorias', path: '/categories' }]}
            title="Categorias"
            active="categories"
            busy={busy}
        >
            <CategoriesContent>
                <div className="header-content">
                    <div className="select-category">
                        <SelectInput
                            name="categories"
                            placeholder="Selecione uma categoria"
                            onChange={(e) => {
                                if (e) {
                                    const temp = categories.find(
                                        (c) => c.id === e.value
                                    )
                                    const boxes: Box[] = []
                                    temp?.boxes.forEach((b) => {
                                        boxes.push({
                                            id: b.id,
                                            label: b.label,
                                            counters: [...b.counters],
                                        })
                                    })
                                    if (temp) {
                                        setSelectedCategory({
                                            ...temp,
                                            boxes,
                                        })
                                    }
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
                    {!canEdit ? (
                        <div className="header-btns">
                            {selectedCategory && (
                                <>
                                    <Button
                                        type="button"
                                        buttonType="BORDERED"
                                        color="PRIMARY"
                                        text="Editar"
                                        disabled={!selectedCategory}
                                        onClick={() => {
                                            setCanEdit(true)
                                        }}
                                    />
                                    <Button
                                        type="button"
                                        buttonType="TEXT"
                                        color="WARNING"
                                        text="Deletar"
                                        disabled={!selectedCategory}
                                        onClick={async () => {
                                            const response =
                                                await deleteCategory(
                                                    selectedCategory.id
                                                )
                                            if (response) {
                                                toast.success(
                                                    `Categoria ${selectedCategory.label} deletada com sucesso`
                                                )
                                            }
                                        }}
                                    />
                                </>
                            )}
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
                    ) : (
                        <div className="header-btns">
                            <Button
                                type="button"
                                buttonType="TEXT"
                                color="WARNING"
                                text="Cancelar"
                                onClick={() => {
                                    if (selectedCategory) {
                                        const temp = categories.find(
                                            (c) => c.id === selectedCategory.id
                                        )
                                        const boxes: Box[] = []
                                        temp?.boxes.forEach((b) => {
                                            boxes.push({
                                                id: b.id,
                                                label: b.label,
                                                counters: [...b.counters],
                                            })
                                        })
                                        if (temp) {
                                            setSelectedCategory({
                                                ...temp,
                                                boxes,
                                            })
                                        }
                                    }
                                    setCanEdit(false)
                                }}
                            />
                            <Button
                                type="button"
                                buttonType="FILLED"
                                color="SECONDARY"
                                text="Salvar"
                                onClick={async () => {
                                    setEditLoader(true)
                                    let canSubmit = true
                                    selectedCategory?.boxes.forEach((box) => {
                                        if (box.label === '' || !box.label) {
                                            canSubmit = false
                                        }
                                        box.counters.forEach((counter) => {
                                            if (
                                                counter.counterType?.type ===
                                                    '' ||
                                                counter.pin === 0
                                            ) {
                                                canSubmit = false
                                            }
                                        })
                                    })
                                    if (canSubmit) {
                                        if (selectedCategory) {
                                            const response = await editCategory(
                                                selectedCategory.boxes,
                                                selectedCategory.id
                                            )
                                            setEditLoader(false)
                                            setCanEdit(false)
                                            if (response) {
                                                toast.success(
                                                    `Categoria ${selectedCategory.label} editada com sucesso`
                                                )
                                                setSelectedCategory(undefined)
                                            }
                                        }
                                    } else {
                                        toast.warning(
                                            `Verifique se você preencheu todos os campos para editar a categoria ${selectedCategory?.label}`
                                        )
                                    }
                                }}
                            />
                        </div>
                    )}
                </div>

                <div className="category">
                    {selectedCategory && (
                        <div className="category-container">
                            <div className="category-header">
                                <h1 className="category-name">
                                    {selectedCategory.label}
                                </h1>
                                <div className="category-config">
                                    <div className="shared-stock">
                                        <label htmlFor="sharedStock">
                                            <input
                                                type="checkbox"
                                                id="sharedStock"
                                                checked={
                                                    selectedCategory.sharedSupply
                                                }
                                                disabled
                                            />
                                            Estoque compartilhado
                                        </label>
                                    </div>
                                    <div className="shared-stock">
                                        <label htmlFor="sharedVault">
                                            <input
                                                type="checkbox"
                                                id="sharedVault"
                                                checked={
                                                    selectedCategory.sharedVault
                                                }
                                                disabled
                                            />
                                            Cofre compartilhado
                                        </label>
                                    </div>
                                </div>
                            </div>
                            {selectedCategory &&
                                selectedCategory.boxes.map((box, index) => {
                                    return (
                                        <div
                                            className="category-box"
                                            key={`${index}-box`}
                                        >
                                            <div className="header">
                                                <div className="title">
                                                    {canEdit ? (
                                                        <SimpleInput
                                                            name={`${index}-boxname`}
                                                            id={`${index}-boxname`}
                                                            value={
                                                                selectedCategory
                                                                    .boxes[
                                                                    index
                                                                ].label
                                                            }
                                                            onChange={(e) => {
                                                                setSelectedCategory(
                                                                    (state) => {
                                                                        state =
                                                                            selectedCategory
                                                                        state.boxes[
                                                                            index
                                                                        ].label =
                                                                            e.target.value
                                                                        return {
                                                                            ...state,
                                                                        }
                                                                    }
                                                                )
                                                            }}
                                                        />
                                                    ) : (
                                                        <h1 className="f16-700-dark">
                                                            {box.label}
                                                        </h1>
                                                    )}
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
                                                                {canEdit ? (
                                                                    <SmallSelectInput
                                                                        name="counterType"
                                                                        value={
                                                                            counter.counterType
                                                                                ? {
                                                                                      value: counter
                                                                                          .counterType
                                                                                          .id,
                                                                                      label: counterTypes.find(
                                                                                          (
                                                                                              c
                                                                                          ) =>
                                                                                              c.id ===
                                                                                              counter
                                                                                                  .counterType
                                                                                                  ?.id
                                                                                      )
                                                                                          ?.label,
                                                                                  }
                                                                                : {
                                                                                      label: 'Selecionar',
                                                                                      value: 'none',
                                                                                  }
                                                                        }
                                                                        onChange={(
                                                                            e
                                                                        ) => {
                                                                            if (
                                                                                e
                                                                            ) {
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
                                                                                            {
                                                                                                label:
                                                                                                    counterTypes.find(
                                                                                                        (
                                                                                                            c
                                                                                                        ) =>
                                                                                                            c.id ===
                                                                                                            e.value
                                                                                                    )
                                                                                                        ?.label ||
                                                                                                    '',
                                                                                                id: counterTypes.find(
                                                                                                    (
                                                                                                        c
                                                                                                    ) =>
                                                                                                        c.id ===
                                                                                                        e.value
                                                                                                )
                                                                                                    ?.id,
                                                                                                type:
                                                                                                    counterTypes.find(
                                                                                                        (
                                                                                                            c
                                                                                                        ) =>
                                                                                                            c.id ===
                                                                                                            e.value
                                                                                                    )
                                                                                                        ?.type ||
                                                                                                    '',
                                                                                            }
                                                                                        return {
                                                                                            ...state,
                                                                                        }
                                                                                    }
                                                                                )
                                                                            }
                                                                        }}
                                                                        options={counterTypes.map(
                                                                            (
                                                                                c
                                                                            ) => {
                                                                                return {
                                                                                    label: c.label,
                                                                                    value: c.id,
                                                                                }
                                                                            }
                                                                        )}
                                                                    />
                                                                ) : (
                                                                    <p>
                                                                        {counter
                                                                            .counterType
                                                                            ?.label
                                                                            ? counter
                                                                                  .counterType
                                                                                  ?.label
                                                                            : counterTypes.find(
                                                                                  (
                                                                                      c
                                                                                  ) =>
                                                                                      c.id ===
                                                                                      counter
                                                                                          .counterType
                                                                                          ?.id
                                                                              )}
                                                                    </p>
                                                                )}
                                                                {canEdit ? (
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
                                                                            if (
                                                                                e
                                                                            ) {
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
                                                                            (
                                                                                p
                                                                            ) => {
                                                                                return {
                                                                                    label: `Pino ${p}`,
                                                                                    value: p,
                                                                                }
                                                                            }
                                                                        )}
                                                                    />
                                                                ) : (
                                                                    <p>{`Pino ${counter.pin}`}</p>
                                                                )}
                                                                <div className="type-input">
                                                                    <input
                                                                        type="checkbox"
                                                                        disabled={
                                                                            !canEdit
                                                                        }
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
                                                                        disabled={
                                                                            !canEdit
                                                                        }
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
                                                                {canEdit && (
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
                                                                )}
                                                            </div>
                                                        )
                                                    }
                                                )}
                                                {canEdit && (
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
                                                )}
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
