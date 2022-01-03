/* eslint-disable no-unused-expressions */
/* eslint-disable no-plusplus */
/* eslint-disable no-param-reassign */
/* eslint-disable react/require-default-props */
import React, { useState } from 'react'
import { RiArrowUpSLine } from 'react-icons/ri'
import ModalContainer from 'react-modal'
import { toast } from 'react-toastify'
import { Button } from '../../components/Button'
import { SimpleInput } from '../../components/SimpleInput'
import { Template } from '../../entities/template'
import { useUser } from '../../hooks/use-user'

import { CreateTemplateContent } from './styles'

interface Props {
    isOpen: boolean
    onRequestClose: () => void
}

export function CreateTemplate({ isOpen, onRequestClose }: Props) {
    // hooks
    const { createTemplate } = useUser()
    // state
    const [busyBtn, setBusyBtn] = useState(false)
    const [template, setTemplate] = useState<Template>({
        label: '',
        permissions: {
            listMachines: false,
            manageMachines: false,
            operateMachineStock: false,
            fixMachineStock: false,
            remoteCredit: false,
            listPointsOfSale: false,
            managePointsOfSale: false,
            listCategories: false,
            manageCategories: false,
            listTelemetries: false,
            operateOwnerStock: false,
            fixOwnerStock: false,
            listInventory: false,
            generateReports: false,
            accessOperationalInfo: false,
            listUsers: false,
            manageUsers: false,
            listCollections: false,
            manageCollections: false,
        },
    })

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
            <CreateTemplateContent>
                <div className="content-title">
                    <h1>Novo cargo</h1>
                </div>
                <div className="label">
                    <SimpleInput
                        name="label"
                        type="text"
                        label="Nome do cargo"
                        value={template.label}
                        onChange={(e) => {
                            setTemplate({
                                label: e.target.value,
                                permissions: template?.permissions,
                            })
                        }}
                    />
                </div>
                {/* ------------    MÁQUINAS -------------------- */}
                <div className="template-box">
                    <div className="header">
                        <div className="title">
                            <h1 className="f16-700-dark">Máquinas</h1>
                            <h2 className="f12-600-gray">
                                Permissões referentes ao acesso e ações nas
                                máquinas.
                            </h2>
                        </div>
                        <button type="button">
                            <RiArrowUpSLine />
                        </button>
                    </div>
                    <div className="body-content">
                        <label htmlFor="listMachines" className="template-item">
                            <input
                                type="checkbox"
                                id="listMachines"
                                checked={template.permissions.listMachines}
                                onChange={(e) =>
                                    setTemplate({
                                        ...template,
                                        permissions: {
                                            ...template.permissions,
                                            listMachines: e.target.checked,
                                        },
                                    })
                                }
                            />
                            <div className="info">
                                <h2 className="f14-700-dark">
                                    Acessar máquinas
                                </h2>
                                <p className="f12-500-gray">
                                    O usuário poderá visualizar as máquinas.{' '}
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
                                checked={template.permissions.manageMachines}
                                onChange={(e) =>
                                    setTemplate({
                                        ...template,
                                        permissions: {
                                            ...template.permissions,
                                            manageMachines: e.target.checked,
                                        },
                                    })
                                }
                            />
                            <div className="info">
                                <h2 className="f14-700-dark">
                                    Gerenciar máquinas
                                </h2>
                                <p className="f12-500-gray">
                                    O usuário poderá criar, excluir ou alterar
                                    as máquinas no sistema.
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
                                checked={
                                    template.permissions.operateMachineStock
                                }
                                onChange={(e) =>
                                    setTemplate({
                                        ...template,
                                        permissions: {
                                            ...template.permissions,
                                            operateMachineStock:
                                                e.target.checked,
                                        },
                                    })
                                }
                            />
                            <div className="info">
                                <h2 className="f14-700-dark">
                                    Abastecer máquinas
                                </h2>
                                <p className="f12-500-gray">
                                    O usuário poderá abastecer ou retirar
                                    prêmios do estoque da máquina. Os prêmios
                                    retirados vão para o estoque pessoal do
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
                                checked={template.permissions.fixMachineStock}
                                onChange={(e) =>
                                    setTemplate({
                                        ...template,
                                        permissions: {
                                            ...template.permissions,
                                            fixMachineStock: e.target.checked,
                                        },
                                    })
                                }
                            />
                            <div className="info">
                                <h2 className="f14-700-dark">
                                    Corrigir estoque
                                </h2>
                                <p className="f12-500-gray">
                                    O usuário poderá alterar a quantidade de
                                    prêmios no estoque da máquina sem movimentar
                                    prêmios do seu estoque pessoal. Esta
                                    permissão só deve ser dada a pessoas de
                                    confiança.
                                </p>
                            </div>
                        </label>
                        <label htmlFor="remoteCredit" className="template-item">
                            <input
                                type="checkbox"
                                id="remoteCredit"
                                checked={template.permissions.remoteCredit}
                                onChange={(e) =>
                                    setTemplate({
                                        ...template,
                                        permissions: {
                                            ...template.permissions,
                                            remoteCredit: e.target.checked,
                                        },
                                    })
                                }
                            />
                            <div className="info">
                                <h2 className="f14-700-dark">
                                    Enviar crédito remoto
                                </h2>
                                <p className="f12-500-gray">
                                    O usuário poderá enviar crédito remoto para
                                    as máquinas.
                                </p>
                            </div>
                        </label>
                    </div>
                </div>
                {/* // ------------ PONTOS DE VENDA ------------------ */}
                <div className="template-box">
                    <div className="header">
                        <div className="title">
                            <h1 className="f16-700-dark">Pontos de venda</h1>
                            <h2 className="f12-600-gray">
                                Permissões referentes ao acesso e ações nos
                                pontos de venda.
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
                                checked={template.permissions.listPointsOfSale}
                                onChange={(e) =>
                                    setTemplate({
                                        ...template,
                                        permissions: {
                                            ...template.permissions,
                                            listPointsOfSale: e.target.checked,
                                        },
                                    })
                                }
                            />
                            <div className="info">
                                <h2 className="f14-700-dark">
                                    Acessar pontos de venda
                                </h2>
                                <p className="f12-500-gray">
                                    O usuário poderá visualizar os PDVs no
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
                                checked={
                                    template.permissions.managePointsOfSale
                                }
                                onChange={(e) =>
                                    setTemplate({
                                        ...template,
                                        permissions: {
                                            ...template.permissions,
                                            managePointsOfSale:
                                                e.target.checked,
                                        },
                                    })
                                }
                            />
                            <div className="info">
                                <h2 className="f14-700-dark">
                                    Gerenciar pontos de venda
                                </h2>
                                <p className="f12-500-gray">
                                    O usuário poderá criar, excluir ou alterar
                                    os PDVs.
                                </p>
                            </div>
                        </label>
                    </div>
                </div>
                {/* // ------------ CATEGORIA ------------------ */}
                <div className="template-box">
                    <div className="header">
                        <div className="title">
                            <h1 className="f16-700-dark">Categorias</h1>
                            <h2 className="f12-600-gray">
                                Permissões referentes ao acesso e ações nas
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
                                checked={template.permissions.listCategories}
                                onChange={(e) =>
                                    setTemplate({
                                        ...template,
                                        permissions: {
                                            ...template.permissions,
                                            listCategories: e.target.checked,
                                        },
                                    })
                                }
                            />
                            <div className="info">
                                <h2 className="f14-700-dark">
                                    Acessar categorias
                                </h2>
                                <p className="f12-500-gray">
                                    O usuário poderá acessar a página de
                                    categorias.
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
                                checked={template.permissions.manageCategories}
                                onChange={(e) =>
                                    setTemplate({
                                        ...template,
                                        permissions: {
                                            ...template.permissions,
                                            manageCategories: e.target.checked,
                                        },
                                    })
                                }
                            />
                            <div className="info">
                                <h2 className="f14-700-dark">
                                    Gerenciar categorias
                                </h2>
                                <p className="f12-500-gray">
                                    O usuário poderá criar, excluir ou alterar
                                    qualquer categoria no sistema.
                                </p>
                            </div>
                        </label>
                    </div>
                </div>
                {/* // ------------ TELEMETRIA ------------------ */}
                <div className="template-box">
                    <div className="header">
                        <div className="title">
                            <h1 className="f16-700-dark">Telemetrias</h1>
                            <h2 className="f12-600-gray">
                                Permissões referentes às telemetrias.
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
                                checked={template.permissions.listTelemetries}
                                onChange={(e) =>
                                    setTemplate({
                                        ...template,
                                        permissions: {
                                            ...template.permissions,
                                            listTelemetries: e.target.checked,
                                        },
                                    })
                                }
                            />
                            <div className="info">
                                <h2 className="f14-700-dark">
                                    Acessar telemetrias
                                </h2>
                                <p className="f12-500-gray">
                                    O usuário poderá acessar a página de
                                    telemetrias.
                                </p>
                            </div>
                        </label>
                    </div>
                </div>
                {/* // ------------ FABRICA ------------------ */}
                <div className="template-box">
                    <div className="header">
                        <div className="title">
                            <h1 className="f16-700-dark">Fábrica</h1>
                            <h2 className="f12-600-gray">
                                Permissões referentes ao controle do estoque da
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
                                checked={template.permissions.operateOwnerStock}
                                onChange={(e) =>
                                    setTemplate({
                                        ...template,
                                        permissions: {
                                            ...template.permissions,
                                            operateOwnerStock: e.target.checked,
                                        },
                                    })
                                }
                            />
                            <div className="info">
                                <h2 className="f14-700-dark">
                                    Gerenciar estoque
                                </h2>
                                <p className="f12-500-gray">
                                    O usuário poderá criar, adicionar, deletar
                                    ou transferir os produtos do estoque da
                                    empresa para outros usuários ou máquinas.
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
                                checked={template.permissions.fixOwnerStock}
                                onChange={(e) =>
                                    setTemplate({
                                        ...template,
                                        permissions: {
                                            ...template.permissions,
                                            fixOwnerStock: e.target.checked,
                                        },
                                    })
                                }
                            />
                            <div className="info">
                                <h2 className="f14-700-dark">
                                    Corrigir estoque
                                </h2>
                                <p className="f12-500-gray">
                                    O usuário poderá alterar a quantidade de
                                    prêmios direto no estoque da empresa.
                                </p>
                            </div>
                        </label>
                    </div>
                </div>
                {/* // ------------ INVENTÁRIO ------------------ */}
                <div className="template-box">
                    <div className="header">
                        <div className="title">
                            <h1 className="f16-700-dark">Inventário</h1>
                            <h2 className="f12-600-gray">
                                Permissões referentes ao acesso do inventário da
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
                                checked={template.permissions.listInventory}
                                onChange={(e) =>
                                    setTemplate({
                                        ...template,
                                        permissions: {
                                            ...template.permissions,
                                            listInventory: e.target.checked,
                                        },
                                    })
                                }
                            />
                            <div className="info">
                                <h2 className="f14-700-dark">
                                    Acessar inventário
                                </h2>
                                <p className="f12-500-gray">
                                    O usuário poderá acessar a página de
                                    inventário no sistema.
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
                                Relatórios e informações de faturamento
                            </h1>
                            <h2 className="f12-600-gray">
                                Permissões referentes ao acesso de relatórios e
                                à informações de faturamento da empresa.
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
                                checked={template.permissions.generateReports}
                                onChange={(e) =>
                                    setTemplate({
                                        ...template,
                                        permissions: {
                                            ...template.permissions,
                                            generateReports: e.target.checked,
                                        },
                                    })
                                }
                            />
                            <div className="info">
                                <h2 className="f14-700-dark">
                                    Gerar relatórios e acessar painel financeiro
                                </h2>
                                <p className="f12-500-gray">
                                    O usuário poderá gerar relatórios diversos e
                                    ter acesso à informações e indicadores
                                    financeiros na tela inicial do sistema.
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
                                checked={
                                    template.permissions.accessOperationalInfo
                                }
                                onChange={(e) =>
                                    setTemplate({
                                        ...template,
                                        permissions: {
                                            ...template.permissions,
                                            accessOperationalInfo:
                                                e.target.checked,
                                        },
                                    })
                                }
                            />
                            <div className="info">
                                <h2 className="f14-700-dark">
                                    Acessar painel operacional
                                </h2>
                                <p className="f12-500-gray">
                                    O usuário poderá ver as informações
                                    operacionais na tela inicial do sistema.
                                </p>
                            </div>
                        </label>
                    </div>
                </div>
                {/* // ------------ USUÁRIOS ------------------ */}
                <div className="template-box">
                    <div className="header">
                        <div className="title">
                            <h1 className="f16-700-dark">Usuários</h1>
                            <h2 className="f12-600-gray">
                                Permissões referentes ao gerenciamento de
                                usuários no sistema.
                            </h2>
                        </div>
                        <button type="button">
                            <RiArrowUpSLine />
                        </button>
                    </div>
                    <div className="body-content">
                        <label htmlFor="listUsers" className="template-item">
                            <input
                                type="checkbox"
                                id="listUsers"
                                checked={template.permissions.listUsers}
                                onChange={(e) =>
                                    setTemplate({
                                        ...template,
                                        permissions: {
                                            ...template.permissions,
                                            listUsers: e.target.checked,
                                        },
                                    })
                                }
                            />
                            <div className="info">
                                <h2 className="f14-700-dark">
                                    Acessar lista de usuários
                                </h2>
                                <p className="f12-500-gray">
                                    O usuário terá acesso à página que lista
                                    todos os usuários no sistema.
                                </p>
                            </div>
                        </label>
                        <label htmlFor="manageUsers" className="template-item">
                            <input
                                type="checkbox"
                                id="manageUsers"
                                checked={template.permissions.manageUsers}
                                onChange={(e) =>
                                    setTemplate({
                                        ...template,
                                        permissions: {
                                            ...template.permissions,
                                            manageUsers: e.target.checked,
                                        },
                                    })
                                }
                            />
                            <div className="info">
                                <h2 className="f14-700-dark">
                                    Gerenciar usuários
                                </h2>
                                <p className="f12-500-gray">
                                    O usuário poderá criar usuários, editar seus
                                    cargos, ou ate desativá-los.
                                </p>
                            </div>
                        </label>
                    </div>
                </div>
                {/* // ------------ COLETAS ------------------ */}
                <div className="template-box">
                    <div className="header">
                        <div className="title">
                            <h1 className="f16-700-dark">Coletas</h1>
                            <h2 className="f12-600-gray">
                                Permissões referentes às coletas nas máquinas.
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
                                checked={template.permissions.listCollections}
                                onChange={(e) =>
                                    setTemplate({
                                        ...template,
                                        permissions: {
                                            ...template.permissions,
                                            listCollections: e.target.checked,
                                        },
                                    })
                                }
                            />
                            <div className="info">
                                <h2 className="f14-700-dark">
                                    Verificar coletas
                                </h2>
                                <p className="f12-500-gray">
                                    O usuário poderá acessar e verificar as
                                    coletas já realizadas.
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
                                checked={template.permissions.manageCollections}
                                onChange={(e) =>
                                    setTemplate({
                                        ...template,
                                        permissions: {
                                            ...template.permissions,
                                            manageCollections: e.target.checked,
                                        },
                                    })
                                }
                            />
                            <div className="info">
                                <h2 className="f14-700-dark">
                                    Criar, editar e listar coletas
                                </h2>
                                <p className="f12-500-gray">
                                    O usuário poderá realizar coletas nas
                                    máquinas que possui acesso.
                                </p>
                            </div>
                        </label>
                    </div>
                </div>
                <div className="btns">
                    <Button
                        text="Cancelar"
                        type="button"
                        buttonType="TEXT"
                        color="WARNING"
                        onClick={() => onRequestClose()}
                    />
                    <Button
                        text="Salvar"
                        type="button"
                        buttonType="FILLED"
                        color="SECONDARY"
                        busy={busyBtn}
                        onClick={() => {
                            setBusyBtn(true)
                            ;(async () => {
                                const response = await createTemplate(template)
                                if (response !== 201) {
                                    toast.error(
                                        'Não foi possível criar esse cargo, verifique os campos preenchidos e tente novamente'
                                    )
                                    setBusyBtn(false)
                                    return
                                }
                                toast.success(
                                    `Cargo ${template.label} criado com sucesso`
                                )
                            })()
                            setBusyBtn(false)
                        }}
                    />
                </div>
            </CreateTemplateContent>
        </ModalContainer>
    )
}
