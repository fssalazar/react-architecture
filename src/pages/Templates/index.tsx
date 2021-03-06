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
                                                    `O cargo ${selectedTemplate.label} est?? sendo utilizado por um usu??rio`
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
                                    {/* ------------    M??QUINAS -------------------- */}
                                    <div className="template-box">
                                        <div className="header">
                                            <div className="title">
                                                <h1 className="f16-700-dark">
                                                    M??quinas
                                                </h1>
                                                <h2 className="f12-600-gray">
                                                    Permiss??es referentes ao
                                                    acesso e a????es nas m??quinas.
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
                                                        Acessar m??quinas
                                                    </h2>
                                                    <p className="f12-500-gray">
                                                        O usu??rio poder??
                                                        visualizar as m??quinas.{' '}
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
                                                        Gerenciar m??quinas
                                                    </h2>
                                                    <p className="f12-500-gray">
                                                        O usu??rio poder?? criar,
                                                        excluir ou alterar as
                                                        m??quinas no sistema.
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
                                                        Abastecer m??quinas
                                                    </h2>
                                                    <p className="f12-500-gray">
                                                        O usu??rio poder??
                                                        abastecer ou retirar
                                                        pr??mios do estoque da
                                                        m??quina. Os pr??mios
                                                        retirados v??o para o
                                                        estoque pessoal do
                                                        usu??rio.
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
                                                        O usu??rio poder?? alterar
                                                        a quantidade de pr??mios
                                                        no estoque da m??quina
                                                        sem movimentar pr??mios
                                                        do seu estoque pessoal.
                                                        Esta permiss??o s?? deve
                                                        ser dada a pessoas de
                                                        confian??a.
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
                                                        Enviar cr??dito remoto
                                                    </h2>
                                                    <p className="f12-500-gray">
                                                        O usu??rio poder?? enviar
                                                        cr??dito remoto para as
                                                        m??quinas.
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
                                                    Permiss??es referentes ao
                                                    acesso e a????es nos pontos de
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
                                                        O usu??rio poder??
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
                                                        O usu??rio poder?? criar,
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
                                                    Permiss??es referentes ao
                                                    acesso e a????es nos modelos
                                                    de m??quina.
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
                                                        m??quinas
                                                    </h2>
                                                    <p className="f12-500-gray">
                                                        O usu??rio poder?? acessar
                                                        a p??gina de modelos.
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
                                                        m??quinas
                                                    </h2>
                                                    <p className="f12-500-gray">
                                                        O usu??rio poder?? criar,
                                                        excluir ou alterar
                                                        qualquer modelos de
                                                        m??quinas no sistema.
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
                                                    Permiss??es referentes ??s
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
                                                        O usu??rio poder?? acessar
                                                        a p??gina de telemetrias.
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
                                                    Dep??sito
                                                </h1>
                                                <h2 className="f12-600-gray">
                                                    Permiss??es referentes ao
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
                                                        Gerenciar produtos
                                                    </h2>
                                                    <p className="f12-500-gray">
                                                        O usu??rio poder?? criar,
                                                        adicionar, deletar ou
                                                        transferir os produtos
                                                        do estoque da empresa
                                                        para outros usu??rios ou
                                                        m??quinas.
                                                    </p>
                                                </div>
                                            </label>
                                        </div>
                                    </div>
                                    {/* // ------------ INVENT??RIO ------------------ */}
                                    <div className="template-box">
                                        <div className="header">
                                            <div className="title">
                                                <h1 className="f16-700-dark">
                                                    Invent??rio
                                                </h1>
                                                <h2 className="f12-600-gray">
                                                    Permiss??es referentes ao
                                                    acesso do invent??rio da
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
                                                        Acessar invent??rio
                                                    </h2>
                                                    <p className="f12-500-gray">
                                                        O usu??rio poder?? acessar
                                                        a p??gina de invent??rio
                                                        no sistema.
                                                    </p>
                                                </div>
                                            </label>
                                        </div>
                                    </div>
                                    {/* // ------------ RELAT??RIOS ------------------ */}
                                    <div className="template-box">
                                        <div className="header">
                                            <div className="title">
                                                <h1 className="f16-700-dark">
                                                    Relat??rios e informa????es de
                                                    faturamento
                                                </h1>
                                                <h2 className="f12-600-gray">
                                                    Permiss??es referentes ao
                                                    acesso de relat??rios e ??
                                                    informa????es de faturamento
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
                                                        Gerar relat??rios e
                                                        acessar painel
                                                        financeiro
                                                    </h2>
                                                    <p className="f12-500-gray">
                                                        O usu??rio poder?? gerar
                                                        relat??rios diversos e
                                                        ter acesso ?? informa????es
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
                                                        O usu??rio poder?? ver as
                                                        informa????es operacionais
                                                        na tela inicial do
                                                        sistema.
                                                    </p>
                                                </div>
                                            </label>
                                        </div>
                                    </div>
                                    {/* // ------------ USU??RIOS ------------------ */}
                                    <div className="template-box">
                                        <div className="header">
                                            <div className="title">
                                                <h1 className="f16-700-dark">
                                                    Usu??rios
                                                </h1>
                                                <h2 className="f12-600-gray">
                                                    Permiss??es referentes ao
                                                    gerenciamento de usu??rios no
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
                                                        usu??rios
                                                    </h2>
                                                    <p className="f12-500-gray">
                                                        O usu??rio ter?? acesso ??
                                                        p??gina que lista todos
                                                        os usu??rios no sistema.
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
                                                        Gerenciar usu??rios
                                                    </h2>
                                                    <p className="f12-500-gray">
                                                        O usu??rio poder?? criar
                                                        usu??rios, editar seus
                                                        cargos, ou ate
                                                        desativ??-los.
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
                                                    Permiss??es referentes ??s
                                                    coletas nas m??quinas.
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
                                                        O usu??rio poder?? acessar
                                                        e verificar as coletas
                                                        j?? realizadas.
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
                                                        O usu??rio poder??
                                                        realizar coletas nas
                                                        m??quinas que possui
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
