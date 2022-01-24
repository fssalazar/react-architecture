/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable react/no-array-index-key */
/* eslint-disable no-param-reassign */
import React, { useEffect, useState } from 'react'
import { RiArrowUpSLine } from 'react-icons/ri'
import { toast } from 'react-toastify'
import { Button } from '../../components/Button'
import { SelectInput } from '../../components/SelectInput'
import { MainContainer } from '../../container/MainContainer'
import { Template } from '../../entities/template'
import { useUser } from '../../hooks/use-user'
import { CreateTemplate } from '../../modals/CreateTemplate'
import { TemplatesContainer } from './styles'

export function TemplatesPage() {
    const { templates, editTemplate, getTemplates, deleteTemplate } = useUser()
    // state
    const [selectedTemplate, setSelectedTemplate] = useState<Template>()
    const [openCreateTemplate, setOpenCreateTemplate] = useState(false)
    const [canEdit, setCanEdit] = useState(false)
    const [busy, setBusy] = useState(false)

    function closeCreateTemplate() {
        setOpenCreateTemplate(false)
    }

    useEffect(() => {
        setBusy(true)
        ;(async () => {
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
            btnLabel="Criar"
            callback={() => {
                setOpenCreateTemplate(true)
            }}
        >
            <TemplatesContainer>
                <div className="header-content">
                    <div className="select-category">
                        <SelectInput
                            name="templates"
                            placeholder="Selecione um cargo"
                            onChange={(e) => {
                                if (e) {
                                    const temp = templates.find(
                                        (c) => c.id === e.value
                                    )

                                    if (temp) {
                                        setSelectedTemplate(temp)
                                    }
                                }
                            }}
                            options={templates.map((template) => {
                                return {
                                    label: template.label,
                                    value: template.id,
                                }
                            })}
                        />
                    </div>
                    {!canEdit ? (
                        <div className="header-btns">
                            {selectedTemplate && (
                                <>
                                    <Button
                                        type="button"
                                        buttonType="BORDERED"
                                        color="PRIMARY"
                                        text="Editar"
                                        disabled={!selectedTemplate}
                                        onClick={() => {
                                            setCanEdit(true)
                                        }}
                                    />
                                    <Button
                                        type="button"
                                        buttonType="TEXT"
                                        color="WARNING"
                                        text="Deletar"
                                        disabled={!selectedTemplate}
                                        onClick={async () => {
                                            const response =
                                                await deleteTemplate(
                                                    selectedTemplate.id
                                                        ? selectedTemplate.id
                                                        : ''
                                                )
                                            if (!response) {
                                                toast.error(
                                                    `O cargo ${selectedTemplate.label} está sendo utilizado por um usuário`
                                                )
                                            }
                                            if (response) {
                                                toast.success(
                                                    `Cargo ${selectedTemplate.label} deletado com sucesso`
                                                )
                                            }
                                        }}
                                    />
                                </>
                            )}
                        </div>
                    ) : (
                        <div className="header-btns">
                            <Button
                                type="button"
                                buttonType="TEXT"
                                color="WARNING"
                                text="Cancelar"
                                onClick={() => {
                                    if (selectedTemplate) {
                                        const temp = templates.find(
                                            (c) => c.id === selectedTemplate.id
                                        )

                                        if (temp) {
                                            setSelectedTemplate(temp)
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
                                    if (selectedTemplate) {
                                        const response = await editTemplate(
                                            selectedTemplate,
                                            selectedTemplate.id
                                                ? selectedTemplate.id
                                                : ''
                                        )
                                        if (response) {
                                            toast.success(
                                                `Cargo ${selectedTemplate.label} editado com sucesso`
                                            )
                                        }
                                    }
                                }}
                            />
                        </div>
                    )}
                </div>

                <div className="template">
                    {selectedTemplate && (
                        <div className="template-container">
                            <div className="template-header">
                                <h1 className="template-name">
                                    {selectedTemplate.label}
                                </h1>
                            </div>
                            {selectedTemplate && (
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
                                                    checked={
                                                        selectedTemplate
                                                            .permissions
                                                            .listMachines
                                                    }
                                                    disabled={!canEdit}
                                                    onChange={(e) =>
                                                        setSelectedTemplate({
                                                            ...selectedTemplate,
                                                            permissions: {
                                                                ...selectedTemplate.permissions,
                                                                listMachines:
                                                                    e.target
                                                                        .checked,
                                                            },
                                                        })
                                                    }
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
                                                className="selectedTemplate-item"
                                            >
                                                <input
                                                    type="checkbox"
                                                    id="manageMachines"
                                                    checked={
                                                        selectedTemplate
                                                            .permissions
                                                            .manageMachines
                                                    }
                                                    disabled={!canEdit}
                                                    onChange={(e) =>
                                                        setSelectedTemplate({
                                                            ...selectedTemplate,
                                                            permissions: {
                                                                ...selectedTemplate.permissions,
                                                                manageMachines:
                                                                    e.target
                                                                        .checked,
                                                            },
                                                        })
                                                    }
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
                                                className="selectedTemplate-item"
                                            >
                                                <input
                                                    type="checkbox"
                                                    id="operateMachineStock"
                                                    checked={
                                                        selectedTemplate
                                                            .permissions
                                                            .operateMachineStock
                                                    }
                                                    disabled={!canEdit}
                                                    onChange={(e) =>
                                                        setSelectedTemplate({
                                                            ...selectedTemplate,
                                                            permissions: {
                                                                ...selectedTemplate.permissions,
                                                                operateMachineStock:
                                                                    e.target
                                                                        .checked,
                                                            },
                                                        })
                                                    }
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
                                                className="selectedTemplate-item"
                                            >
                                                <input
                                                    type="checkbox"
                                                    id="fixMachineStock"
                                                    checked={
                                                        selectedTemplate
                                                            .permissions
                                                            .fixMachineStock
                                                    }
                                                    disabled={!canEdit}
                                                    onChange={(e) =>
                                                        setSelectedTemplate({
                                                            ...selectedTemplate,
                                                            permissions: {
                                                                ...selectedTemplate.permissions,
                                                                fixMachineStock:
                                                                    e.target
                                                                        .checked,
                                                            },
                                                        })
                                                    }
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
                                                className="selectedTemplate-item"
                                            >
                                                <input
                                                    type="checkbox"
                                                    id="remoteCredit"
                                                    checked={
                                                        selectedTemplate
                                                            .permissions
                                                            .remoteCredit
                                                    }
                                                    disabled={!canEdit}
                                                    onChange={(e) =>
                                                        setSelectedTemplate({
                                                            ...selectedTemplate,
                                                            permissions: {
                                                                ...selectedTemplate.permissions,
                                                                remoteCredit:
                                                                    e.target
                                                                        .checked,
                                                            },
                                                        })
                                                    }
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
                                                className="selectedTemplate-item"
                                            >
                                                <input
                                                    type="checkbox"
                                                    id="listPointsOfSale"
                                                    checked={
                                                        selectedTemplate
                                                            .permissions
                                                            .listPointsOfSale
                                                    }
                                                    disabled={!canEdit}
                                                    onChange={(e) =>
                                                        setSelectedTemplate({
                                                            ...selectedTemplate,
                                                            permissions: {
                                                                ...selectedTemplate.permissions,
                                                                listPointsOfSale:
                                                                    e.target
                                                                        .checked,
                                                            },
                                                        })
                                                    }
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
                                                className="selectedTemplate-item"
                                            >
                                                <input
                                                    type="checkbox"
                                                    id="managePointsOfSale"
                                                    checked={
                                                        selectedTemplate
                                                            .permissions
                                                            .managePointsOfSale
                                                    }
                                                    disabled={!canEdit}
                                                    onChange={(e) =>
                                                        setSelectedTemplate({
                                                            ...selectedTemplate,
                                                            permissions: {
                                                                ...selectedTemplate.permissions,
                                                                managePointsOfSale:
                                                                    e.target
                                                                        .checked,
                                                            },
                                                        })
                                                    }
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
                                                    Modelos
                                                </h1>
                                                <h2 className="f12-600-gray">
                                                    Permissões referentes ao
                                                    acesso e ações nos modelos
                                                    de máquina.
                                                </h2>
                                            </div>
                                            <button type="button">
                                                <RiArrowUpSLine />
                                            </button>
                                        </div>
                                        <div className="body-content">
                                            <label
                                                htmlFor="listCategories"
                                                className="selectedTemplate-item"
                                            >
                                                <input
                                                    type="checkbox"
                                                    id="listCategories"
                                                    checked={
                                                        selectedTemplate
                                                            .permissions
                                                            .listCategories
                                                    }
                                                    disabled={!canEdit}
                                                    onChange={(e) =>
                                                        setSelectedTemplate({
                                                            ...selectedTemplate,
                                                            permissions: {
                                                                ...selectedTemplate.permissions,
                                                                listCategories:
                                                                    e.target
                                                                        .checked,
                                                            },
                                                        })
                                                    }
                                                />
                                                <div className="info">
                                                    <h2 className="f14-700-dark">
                                                        Acessar modelos de
                                                        máquinas
                                                    </h2>
                                                    <p className="f12-500-gray">
                                                        O usuário poderá acessar
                                                        a página de modelos.
                                                    </p>
                                                </div>
                                            </label>
                                            <label
                                                htmlFor="manageCategories"
                                                className="selectedTemplate-item"
                                            >
                                                <input
                                                    type="checkbox"
                                                    id="manageCategories"
                                                    checked={
                                                        selectedTemplate
                                                            .permissions
                                                            .manageCategories
                                                    }
                                                    disabled={!canEdit}
                                                    onChange={(e) =>
                                                        setSelectedTemplate({
                                                            ...selectedTemplate,
                                                            permissions: {
                                                                ...selectedTemplate.permissions,
                                                                manageCategories:
                                                                    e.target
                                                                        .checked,
                                                            },
                                                        })
                                                    }
                                                />
                                                <div className="info">
                                                    <h2 className="f14-700-dark">
                                                        Gerenciar modelos de
                                                        máquinas
                                                    </h2>
                                                    <p className="f12-500-gray">
                                                        O usuário poderá criar,
                                                        excluir ou alterar
                                                        qualquer modelos de
                                                        máquinas no sistema.
                                                    </p>
                                                </div>
                                            </label>
                                        </div>
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
                                                className="selectedTemplate-item"
                                            >
                                                <input
                                                    type="checkbox"
                                                    id="listTelemetries"
                                                    checked={
                                                        selectedTemplate
                                                            .permissions
                                                            .listTelemetries
                                                    }
                                                    disabled={!canEdit}
                                                    onChange={(e) =>
                                                        setSelectedTemplate({
                                                            ...selectedTemplate,
                                                            permissions: {
                                                                ...selectedTemplate.permissions,
                                                                listTelemetries:
                                                                    e.target
                                                                        .checked,
                                                            },
                                                        })
                                                    }
                                                />
                                                <div className="info">
                                                    <h2 className="f14-700-dark">
                                                        Acessar telemetrias
                                                    </h2>
                                                    <p className="f12-500-gray">
                                                        O usuário poderá acessar
                                                        a página de telemetrias.
                                                    </p>
                                                </div>
                                            </label>
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
                                                className="selectedTemplate-item"
                                            >
                                                <input
                                                    type="checkbox"
                                                    id="operateOwnerStock"
                                                    checked={
                                                        selectedTemplate
                                                            .permissions
                                                            .operateOwnerStock
                                                    }
                                                    disabled={!canEdit}
                                                    onChange={(e) =>
                                                        setSelectedTemplate({
                                                            ...selectedTemplate,
                                                            permissions: {
                                                                ...selectedTemplate.permissions,
                                                                operateOwnerStock:
                                                                    e.target
                                                                        .checked,
                                                            },
                                                        })
                                                    }
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
                                                className="selectedTemplate-item"
                                            >
                                                <input
                                                    type="checkbox"
                                                    id="fixOwnerStock"
                                                    checked={
                                                        selectedTemplate
                                                            .permissions
                                                            .fixOwnerStock
                                                    }
                                                    disabled={!canEdit}
                                                    onChange={(e) =>
                                                        setSelectedTemplate({
                                                            ...selectedTemplate,
                                                            permissions: {
                                                                ...selectedTemplate.permissions,
                                                                fixOwnerStock:
                                                                    e.target
                                                                        .checked,
                                                            },
                                                        })
                                                    }
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
                                                className="selectedTemplate-item"
                                            >
                                                <input
                                                    type="checkbox"
                                                    id="listInventory"
                                                    checked={
                                                        selectedTemplate
                                                            .permissions
                                                            .listInventory
                                                    }
                                                    disabled={!canEdit}
                                                    onChange={(e) =>
                                                        setSelectedTemplate({
                                                            ...selectedTemplate,
                                                            permissions: {
                                                                ...selectedTemplate.permissions,
                                                                listInventory:
                                                                    e.target
                                                                        .checked,
                                                            },
                                                        })
                                                    }
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
                                                className="selectedTemplate-item"
                                            >
                                                <input
                                                    type="checkbox"
                                                    id="generateReports"
                                                    checked={
                                                        selectedTemplate
                                                            .permissions
                                                            .generateReports
                                                    }
                                                    disabled={!canEdit}
                                                    onChange={(e) =>
                                                        setSelectedTemplate({
                                                            ...selectedTemplate,
                                                            permissions: {
                                                                ...selectedTemplate.permissions,
                                                                generateReports:
                                                                    e.target
                                                                        .checked,
                                                            },
                                                        })
                                                    }
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
                                                className="selectedTemplate-item"
                                            >
                                                <input
                                                    type="checkbox"
                                                    id="accessOperationalInfo"
                                                    checked={
                                                        selectedTemplate
                                                            .permissions
                                                            .accessOperationalInfo
                                                    }
                                                    disabled={!canEdit}
                                                    onChange={(e) =>
                                                        setSelectedTemplate({
                                                            ...selectedTemplate,
                                                            permissions: {
                                                                ...selectedTemplate.permissions,
                                                                accessOperationalInfo:
                                                                    e.target
                                                                        .checked,
                                                            },
                                                        })
                                                    }
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
                                                className="selectedTemplate-item"
                                            >
                                                <input
                                                    type="checkbox"
                                                    id="listUsers"
                                                    checked={
                                                        selectedTemplate
                                                            .permissions
                                                            .listUsers
                                                    }
                                                    disabled={!canEdit}
                                                    onChange={(e) =>
                                                        setSelectedTemplate({
                                                            ...selectedTemplate,
                                                            permissions: {
                                                                ...selectedTemplate.permissions,
                                                                listUsers:
                                                                    e.target
                                                                        .checked,
                                                            },
                                                        })
                                                    }
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
                                                className="selectedTemplate-item"
                                            >
                                                <input
                                                    type="checkbox"
                                                    id="manageUsers"
                                                    checked={
                                                        selectedTemplate
                                                            .permissions
                                                            .manageUsers
                                                    }
                                                    disabled={!canEdit}
                                                    onChange={(e) =>
                                                        setSelectedTemplate({
                                                            ...selectedTemplate,
                                                            permissions: {
                                                                ...selectedTemplate.permissions,
                                                                manageUsers:
                                                                    e.target
                                                                        .checked,
                                                            },
                                                        })
                                                    }
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
                                                    checked={
                                                        selectedTemplate
                                                            .permissions
                                                            .listCollections
                                                    }
                                                    disabled={!canEdit}
                                                    onChange={(e) =>
                                                        setSelectedTemplate({
                                                            ...selectedTemplate,
                                                            permissions: {
                                                                ...selectedTemplate.permissions,
                                                                listCollections:
                                                                    e.target
                                                                        .checked,
                                                            },
                                                        })
                                                    }
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
                                                className="selectedTemplate-item"
                                            >
                                                <input
                                                    type="checkbox"
                                                    id="manageCollections"
                                                    checked={
                                                        selectedTemplate
                                                            .permissions
                                                            .manageCollections
                                                    }
                                                    disabled={!canEdit}
                                                    onChange={(e) =>
                                                        setSelectedTemplate({
                                                            ...selectedTemplate,
                                                            permissions: {
                                                                ...selectedTemplate.permissions,
                                                                manageCollections:
                                                                    e.target
                                                                        .checked,
                                                            },
                                                        })
                                                    }
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
