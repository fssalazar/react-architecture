/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable react/no-array-index-key */
/* eslint-disable no-param-reassign */
import React, { useEffect, useState } from 'react'
import { RiArrowUpSLine } from 'react-icons/ri'
import { toast } from 'react-toastify'
import { Button } from '../../components/Button'
import { SelectInput } from '../../components/SelectInput'
import { MainContainer } from '../../container/MainContainer'
import { Box, Category } from '../../entities/category'
import { useUser } from '../../hooks/use-user'
import { useCategory } from '../../hooks/useCategory'
import { CreateTemplate } from '../../modals/CreateTemplate'
import { TemplatesContainer } from './styles'

export function TemplatesPage() {
    // hooks
    const {
        categories,
        editCategory,
        getCategories,
        counterTypes,
        getCounterTypes,
        deleteCategory,
    } = useCategory()
    const { templates, editTemplate, getTemplates } = useUser()
    // state
    const [selectedCategory, setSelectedCategory] = useState<Category>()
    const [openCreateTemplate, setOpenCreateTemplate] = useState(false)
    const [canEdit, setCanEdit] = useState(false)
    const [busy, setBusy] = useState(false)
    const [editLoader, setEditLoader] = useState(false)

    function closeCreateTemplate() {
        setOpenCreateTemplate(false)
    }

    useEffect(() => {
        setBusy(true)
        ;(async () => {
            await getCategories()
            await getCounterTypes()
            await getTemplates()
            setBusy(false)
        })()
    }, [])

    return (
        <MainContainer
            path={[{ label: 'Cargos', path: '/templates' }]}
            title="Cargos"
            active="templates"
            busy={busy}
        >
            <TemplatesContainer>
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
                                    setOpenCreateTemplate(true)
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
                                    if (selectedCategory) {
                                        const response = await editCategory(
                                            selectedCategory.boxes,
                                            selectedCategory.id
                                        )
                                        if (response) {
                                            toast.success(
                                                `Categoria ${selectedCategory.label} editada com sucesso`
                                            )
                                        }
                                    }
                                }}
                            />
                        </div>
                    )}
                </div>

                <div className="template">
                    {selectedCategory && (
                        <div className="template-container">
                            <div className="template-header">
                                <h1 className="template-name">
                                    {selectedCategory.label}
                                </h1>
                            </div>
                            {selectedCategory && (
                                <>
                                    {/* ------------    MÁQUINAS -------------------- */}
                                    <div className="template-box">
                                        <div className="header">
                                            <div className="title">
                                                <h1 className="f16-700-dark">
                                                    Máquinas
                                                </h1>
                                                <h2 className="f12-600-gray">
                                                    Permissões referentes ao
                                                    acesso e ações nas máquinas.
                                                </h2>
                                            </div>
                                            <button type="button">
                                                <RiArrowUpSLine />
                                            </button>
                                        </div>
                                        <div className="body-content">
                                            <label
                                                htmlFor="listMachines"
                                                className="template-item"
                                            >
                                                <input
                                                    type="checkbox"
                                                    id="listMachines"
                                                />
                                                <div className="info">
                                                    <h2 className="f14-700-dark">
                                                        Acessar máquinas
                                                    </h2>
                                                    <p className="f12-500-gray">
                                                        O usuário poderá
                                                        visualizar as máquinas.{' '}
                                                    </p>
                                                </div>
                                            </label>
                                            <label
                                                htmlFor="manageMachines"
                                                className="template-item"
                                            >
                                                <input
                                                    type="checkbox"
                                                    id="manageMachines"
                                                />
                                                <div className="info">
                                                    <h2 className="f14-700-dark">
                                                        Gerenciar máquinas
                                                    </h2>
                                                    <p className="f12-500-gray">
                                                        O usuário poderá criar,
                                                        excluir ou alterar as
                                                        máquinas no sistema.
                                                    </p>
                                                </div>
                                            </label>
                                            <label
                                                htmlFor="operateMachineStock"
                                                className="template-item"
                                            >
                                                <input
                                                    type="checkbox"
                                                    id="operateMachineStock"
                                                />
                                                <div className="info">
                                                    <h2 className="f14-700-dark">
                                                        Abastecer máquinas
                                                    </h2>
                                                    <p className="f12-500-gray">
                                                        O usuário poderá
                                                        abastecer ou retirar
                                                        prêmios do estoque da
                                                        máquina. Os prêmios
                                                        retirados vão para o
                                                        estoque pessoal do
                                                        usuário.
                                                    </p>
                                                </div>
                                            </label>
                                            <label
                                                htmlFor="fixMachineStock"
                                                className="template-item"
                                            >
                                                <input
                                                    type="checkbox"
                                                    id="fixMachineStock"
                                                />
                                                <div className="info">
                                                    <h2 className="f14-700-dark">
                                                        Corrigir estoque
                                                    </h2>
                                                    <p className="f12-500-gray">
                                                        O usuário poderá alterar
                                                        a quantidade de prêmios
                                                        no estoque da máquina
                                                        sem movimentar prêmios
                                                        do seu estoque pessoal.
                                                        Esta permissão só deve
                                                        ser dada a pessoas de
                                                        confiança.
                                                    </p>
                                                </div>
                                            </label>
                                            <label
                                                htmlFor="remoteCredit"
                                                className="template-item"
                                            >
                                                <input
                                                    type="checkbox"
                                                    id="remoteCredit"
                                                />
                                                <div className="info">
                                                    <h2 className="f14-700-dark">
                                                        Enviar crédito remoto
                                                    </h2>
                                                    <p className="f12-500-gray">
                                                        O usuário poderá enviar
                                                        crédito remoto para as
                                                        máquinas.
                                                    </p>
                                                </div>
                                            </label>
                                        </div>
                                    </div>
                                    {/* // ------------ PONTOS DE VENDA ------------------ */}
                                    <div className="template-box">
                                        <div className="header">
                                            <div className="title">
                                                <h1 className="f16-700-dark">
                                                    Pontos de venda
                                                </h1>
                                                <h2 className="f12-600-gray">
                                                    Permissões referentes ao
                                                    acesso e ações nos pontos de
                                                    venda.
                                                </h2>
                                            </div>
                                            <button type="button">
                                                <RiArrowUpSLine />
                                            </button>
                                        </div>
                                        <div className="body-content">
                                            <label
                                                htmlFor="listPointsOfSale"
                                                className="template-item"
                                            >
                                                <input
                                                    type="checkbox"
                                                    id="listPointsOfSale"
                                                />
                                                <div className="info">
                                                    <h2 className="f14-700-dark">
                                                        Acessar pontos de venda
                                                    </h2>
                                                    <p className="f12-500-gray">
                                                        O usuário poderá
                                                        visualizar os PDVs no
                                                        sistema.
                                                    </p>
                                                </div>
                                            </label>
                                            <label
                                                htmlFor="managePointsOfSale"
                                                className="template-item"
                                            >
                                                <input
                                                    type="checkbox"
                                                    id="managePointsOfSale"
                                                />
                                                <div className="info">
                                                    <h2 className="f14-700-dark">
                                                        Gerenciar pontos de
                                                        venda
                                                    </h2>
                                                    <p className="f12-500-gray">
                                                        O usuário poderá criar,
                                                        excluir ou alterar os
                                                        PDVs.
                                                    </p>
                                                </div>
                                            </label>
                                        </div>
                                    </div>
                                    {/* // ------------ CATEGORIA ------------------ */}
                                    <div className="template-box">
                                        <div className="header">
                                            <div className="title">
                                                <h1 className="f16-700-dark">
                                                    Categorias
                                                </h1>
                                                <h2 className="f12-600-gray">
                                                    Permissões referentes ao
                                                    acesso e ações nas
                                                    categorias de máquina.
                                                </h2>
                                            </div>
                                            <button type="button">
                                                <RiArrowUpSLine />
                                            </button>
                                        </div>
                                        <div className="body-content">
                                            <label
                                                htmlFor="listCategories"
                                                className="template-item"
                                            >
                                                <input
                                                    type="checkbox"
                                                    id="listCategories"
                                                />
                                                <div className="info">
                                                    <h2 className="f14-700-dark">
                                                        Acessar categorias
                                                    </h2>
                                                    <p className="f12-500-gray">
                                                        O usuário poderá acessar
                                                        a página de categorias.
                                                    </p>
                                                </div>
                                            </label>
                                            <label
                                                htmlFor="manageCategories"
                                                className="template-item"
                                            >
                                                <input
                                                    type="checkbox"
                                                    id="manageCategories"
                                                />
                                                <div className="info">
                                                    <h2 className="f14-700-dark">
                                                        Gerenciar categorias
                                                    </h2>
                                                    <p className="f12-500-gray">
                                                        O usuário poderá criar,
                                                        excluir ou alterar
                                                        qualquer categoria no
                                                        sistema.
                                                    </p>
                                                </div>
                                            </label>
                                        </div>
                                        {/* // ------------ TELEMETRIA ------------------ */}
                                        <div className="template-box">
                                            <div className="header">
                                                <div className="title">
                                                    <h1 className="f16-700-dark">
                                                        Telemetrias
                                                    </h1>
                                                    <h2 className="f12-600-gray">
                                                        Permissões referentes às
                                                        telemetrias.
                                                    </h2>
                                                </div>
                                                <button type="button">
                                                    <RiArrowUpSLine />
                                                </button>
                                            </div>
                                            <div className="body-content">
                                                <label
                                                    htmlFor="listTelemetries"
                                                    className="template-item"
                                                >
                                                    <input
                                                        type="checkbox"
                                                        id="listTelemetries"
                                                    />
                                                    <div className="info">
                                                        <h2 className="f14-700-dark">
                                                            Acessar telemetrias
                                                        </h2>
                                                        <p className="f12-500-gray">
                                                            O usuário poderá
                                                            acessar a página de
                                                            telemetrias.
                                                        </p>
                                                    </div>
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                    {/* // ------------ FABRICA ------------------ */}
                                    <div className="template-box">
                                        <div className="header">
                                            <div className="title">
                                                <h1 className="f16-700-dark">
                                                    Fábrica
                                                </h1>
                                                <h2 className="f12-600-gray">
                                                    Permissões referentes ao
                                                    controle do estoque da
                                                    empresa.
                                                </h2>
                                            </div>
                                            <button type="button">
                                                <RiArrowUpSLine />
                                            </button>
                                        </div>
                                        <div className="body-content">
                                            <label
                                                htmlFor="operateOwnerStock"
                                                className="template-item"
                                            >
                                                <input
                                                    type="checkbox"
                                                    id="operateOwnerStock"
                                                />
                                                <div className="info">
                                                    <h2 className="f14-700-dark">
                                                        Gerenciar estoque
                                                    </h2>
                                                    <p className="f12-500-gray">
                                                        O usuário poderá criar,
                                                        adicionar, deletar ou
                                                        transferir os produtos
                                                        do estoque da empresa
                                                        para outros usuários ou
                                                        máquinas.
                                                    </p>
                                                </div>
                                            </label>
                                            <label
                                                htmlFor="fixOwnerStock"
                                                className="template-item"
                                            >
                                                <input
                                                    type="checkbox"
                                                    id="fixOwnerStock"
                                                />
                                                <div className="info">
                                                    <h2 className="f14-700-dark">
                                                        Corrigir estoque
                                                    </h2>
                                                    <p className="f12-500-gray">
                                                        O usuário poderá alterar
                                                        a quantidade de prêmios
                                                        direto no estoque da
                                                        empresa.
                                                    </p>
                                                </div>
                                            </label>
                                        </div>
                                    </div>
                                    {/* // ------------ INVENTÁRIO ------------------ */}
                                    <div className="template-box">
                                        <div className="header">
                                            <div className="title">
                                                <h1 className="f16-700-dark">
                                                    Inventário
                                                </h1>
                                                <h2 className="f12-600-gray">
                                                    Permissões referentes ao
                                                    acesso do inventário da
                                                    empresa.
                                                </h2>
                                            </div>
                                            <button type="button">
                                                <RiArrowUpSLine />
                                            </button>
                                        </div>
                                        <div className="body-content">
                                            <label
                                                htmlFor="listInventory"
                                                className="template-item"
                                            >
                                                <input
                                                    type="checkbox"
                                                    id="listInventory"
                                                />
                                                <div className="info">
                                                    <h2 className="f14-700-dark">
                                                        Acessar inventário
                                                    </h2>
                                                    <p className="f12-500-gray">
                                                        O usuário poderá acessar
                                                        a página de inventário
                                                        no sistema.
                                                    </p>
                                                </div>
                                            </label>
                                        </div>
                                    </div>
                                    {/* // ------------ RELATÓRIOS ------------------ */}
                                    <div className="template-box">
                                        <div className="header">
                                            <div className="title">
                                                <h1 className="f16-700-dark">
                                                    Relatórios e informações de
                                                    faturamento
                                                </h1>
                                                <h2 className="f12-600-gray">
                                                    Permissões referentes ao
                                                    acesso de relatórios e à
                                                    informações de faturamento
                                                    da empresa.
                                                </h2>
                                            </div>
                                            <button type="button">
                                                <RiArrowUpSLine />
                                            </button>
                                        </div>
                                        <div className="body-content">
                                            <label
                                                htmlFor="generateReports"
                                                className="template-item"
                                            >
                                                <input
                                                    type="checkbox"
                                                    id="generateReports"
                                                />
                                                <div className="info">
                                                    <h2 className="f14-700-dark">
                                                        Gerar relatórios e
                                                        acessar painel
                                                        financeiro
                                                    </h2>
                                                    <p className="f12-500-gray">
                                                        O usuário poderá gerar
                                                        relatórios diversos e
                                                        ter acesso à informações
                                                        e indicadores
                                                        financeiros na tela
                                                        inicial do sistema.
                                                    </p>
                                                </div>
                                            </label>
                                            <label
                                                htmlFor="accessOperationalInfo"
                                                className="template-item"
                                            >
                                                <input
                                                    type="checkbox"
                                                    id="accessOperationalInfo"
                                                />
                                                <div className="info">
                                                    <h2 className="f14-700-dark">
                                                        Acessar painel
                                                        operacional
                                                    </h2>
                                                    <p className="f12-500-gray">
                                                        O usuário poderá ver as
                                                        informações operacionais
                                                        na tela inicial do
                                                        sistema.
                                                    </p>
                                                </div>
                                            </label>
                                        </div>
                                    </div>
                                    {/* // ------------ USUÁRIOS ------------------ */}
                                    <div className="template-box">
                                        <div className="header">
                                            <div className="title">
                                                <h1 className="f16-700-dark">
                                                    Usuários
                                                </h1>
                                                <h2 className="f12-600-gray">
                                                    Permissões referentes ao
                                                    gerenciamento de usuários no
                                                    sistema.
                                                </h2>
                                            </div>
                                            <button type="button">
                                                <RiArrowUpSLine />
                                            </button>
                                        </div>
                                        <div className="body-content">
                                            <label
                                                htmlFor="listUsers"
                                                className="template-item"
                                            >
                                                <input
                                                    type="checkbox"
                                                    id="listUsers"
                                                />
                                                <div className="info">
                                                    <h2 className="f14-700-dark">
                                                        Acessar lista de
                                                        usuários
                                                    </h2>
                                                    <p className="f12-500-gray">
                                                        O usuário terá acesso à
                                                        página que lista todos
                                                        os usuários no sistema.
                                                    </p>
                                                </div>
                                            </label>
                                            <label
                                                htmlFor="manageUsers"
                                                className="template-item"
                                            >
                                                <input
                                                    type="checkbox"
                                                    id="manageUsers"
                                                />
                                                <div className="info">
                                                    <h2 className="f14-700-dark">
                                                        Gerenciar usuários
                                                    </h2>
                                                    <p className="f12-500-gray">
                                                        O usuário poderá criar
                                                        usuários, editar seus
                                                        cargos, ou ate
                                                        desativá-los.
                                                    </p>
                                                </div>
                                            </label>
                                        </div>
                                    </div>
                                    {/* // ------------ COLETAS ------------------ */}
                                    <div className="template-box">
                                        <div className="header">
                                            <div className="title">
                                                <h1 className="f16-700-dark">
                                                    Coletas
                                                </h1>
                                                <h2 className="f12-600-gray">
                                                    Permissões referentes às
                                                    coletas nas máquinas.
                                                </h2>
                                            </div>
                                            <button type="button">
                                                <RiArrowUpSLine />
                                            </button>
                                        </div>
                                        <div className="body-content">
                                            <label
                                                htmlFor="listCollections"
                                                className="template-item"
                                            >
                                                <input
                                                    type="checkbox"
                                                    id="listCollections"
                                                />
                                                <div className="info">
                                                    <h2 className="f14-700-dark">
                                                        Verificar coletas
                                                    </h2>
                                                    <p className="f12-500-gray">
                                                        O usuário poderá acessar
                                                        e verificar as coletas
                                                        já realizadas.
                                                    </p>
                                                </div>
                                            </label>
                                            <label
                                                htmlFor="manageCollections"
                                                className="template-item"
                                            >
                                                <input
                                                    type="checkbox"
                                                    id="manageCollections"
                                                />
                                                <div className="info">
                                                    <h2 className="f14-700-dark">
                                                        Criar, editar e listar
                                                        coletas
                                                    </h2>
                                                    <p className="f12-500-gray">
                                                        O usuário poderá
                                                        realizar coletas nas
                                                        máquinas que possui
                                                        acesso.
                                                    </p>
                                                </div>
                                            </label>
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>
                    )}
                </div>
            </TemplatesContainer>
            <CreateTemplate
                isOpen={openCreateTemplate}
                onRequestClose={closeCreateTemplate}
            />
        </MainContainer>
    )
}
