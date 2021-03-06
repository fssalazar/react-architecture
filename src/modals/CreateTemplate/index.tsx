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
                {/* ------------    M??QUINAS -------------------- */}
                <div className="template-box">
                    <div className="header">
                        <div className="title">
                            <h1 className="f16-700-dark">M??quinas</h1>
                            <h2 className="f12-600-gray">
                                Permiss??es referentes ao acesso e a????es nas
                                m??quinas.
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
                                    Acessar m??quinas
                                </h2>
                                <p className="f12-500-gray">
                                    O usu??rio poder?? visualizar as m??quinas.{' '}
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
                                    Gerenciar m??quinas
                                </h2>
                                <p className="f12-500-gray">
                                    O usu??rio poder?? criar, excluir ou alterar
                                    as m??quinas no sistema.
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
                                    Abastecer m??quinas
                                </h2>
                                <p className="f12-500-gray">
                                    O usu??rio poder?? abastecer ou retirar
                                    pr??mios do estoque da m??quina. Os pr??mios
                                    retirados v??o para o estoque pessoal do
                                    usu??rio.
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
                                    O usu??rio poder?? alterar a quantidade de
                                    pr??mios no estoque da m??quina sem movimentar
                                    pr??mios do seu estoque pessoal. Esta
                                    permiss??o s?? deve ser dada a pessoas de
                                    confian??a.
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
                                    Enviar cr??dito remoto
                                </h2>
                                <p className="f12-500-gray">
                                    O usu??rio poder?? enviar cr??dito remoto para
                                    as m??quinas.
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
                                Permiss??es referentes ao acesso e a????es nos
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
                                    O usu??rio poder?? visualizar os PDVs no
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
                                    O usu??rio poder?? criar, excluir ou alterar
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
                            <h1 className="f16-700-dark">Modelos</h1>
                            <h2 className="f12-600-gray">
                                Permiss??es referentes ao acesso e a????es nos
                                modelos de m??quina.
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
                                    Acessar modelos de m??quinas
                                </h2>
                                <p className="f12-500-gray">
                                    O usu??rio poder?? acessar a p??gina de
                                    modelos.
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
                                    Gerenciar modelos de m??quinas
                                </h2>
                                <p className="f12-500-gray">
                                    O usu??rio poder?? criar, excluir ou alterar
                                    qualquer modelo de m??quinas no sistema.
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
                                Permiss??es referentes ??s telemetrias.
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
                                    O usu??rio poder?? acessar a p??gina de
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
                            <h1 className="f16-700-dark">Dep??sito</h1>
                            <h2 className="f12-600-gray">
                                Permiss??es referentes ao controle do estoque da
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
                                    Gerenciar produtos
                                </h2>
                                <p className="f12-500-gray">
                                    O usu??rio poder?? criar, adicionar, deletar
                                    ou transferir os produtos do estoque da
                                    empresa para outros usu??rios ou m??quinas.
                                </p>
                            </div>
                        </label>
                    </div>
                </div>
                {/* // ------------ INVENT??RIO ------------------ */}
                <div className="template-box">
                    <div className="header">
                        <div className="title">
                            <h1 className="f16-700-dark">Invent??rio</h1>
                            <h2 className="f12-600-gray">
                                Permiss??es referentes ao acesso do invent??rio da
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
                                    Acessar invent??rio
                                </h2>
                                <p className="f12-500-gray">
                                    O usu??rio poder?? acessar a p??gina de
                                    invent??rio no sistema.
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
                                Relat??rios e informa????es de faturamento
                            </h1>
                            <h2 className="f12-600-gray">
                                Permiss??es referentes ao acesso de relat??rios e
                                ?? informa????es de faturamento da empresa.
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
                                    Gerar relat??rios e acessar painel financeiro
                                </h2>
                                <p className="f12-500-gray">
                                    O usu??rio poder?? gerar relat??rios diversos e
                                    ter acesso ?? informa????es e indicadores
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
                                    O usu??rio poder?? ver as informa????es
                                    operacionais na tela inicial do sistema.
                                </p>
                            </div>
                        </label>
                    </div>
                </div>
                {/* // ------------ USU??RIOS ------------------ */}
                <div className="template-box">
                    <div className="header">
                        <div className="title">
                            <h1 className="f16-700-dark">Usu??rios</h1>
                            <h2 className="f12-600-gray">
                                Permiss??es referentes ao gerenciamento de
                                usu??rios no sistema.
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
                                    Acessar lista de usu??rios
                                </h2>
                                <p className="f12-500-gray">
                                    O usu??rio ter?? acesso ?? p??gina que lista
                                    todos os usu??rios no sistema.
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
                                    Gerenciar usu??rios
                                </h2>
                                <p className="f12-500-gray">
                                    O usu??rio poder?? criar usu??rios, editar seus
                                    cargos, ou ate desativ??-los.
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
                                Permiss??es referentes ??s coletas nas m??quinas.
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
                                    O usu??rio poder?? acessar e verificar as
                                    coletas j?? realizadas.
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
                                    O usu??rio poder?? realizar coletas nas
                                    m??quinas que possui acesso.
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
                                        'N??o foi poss??vel criar esse cargo, verifique os campos preenchidos e tente novamente'
                                    )
                                    setBusyBtn(false)
                                    return
                                }
                                toast.success(
                                    `Cargo ${template.label} criado com sucesso`
                                )
                                onRequestClose()
                            })()
                            setBusyBtn(false)
                        }}
                    />
                </div>
            </CreateTemplateContent>
        </ModalContainer>
    )
}
