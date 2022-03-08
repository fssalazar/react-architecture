import React, { useState } from 'react'
import Carousel from 'react-multi-carousel'
import 'react-multi-carousel/lib/styles.css'
import { FiDollarSign, FiList, FiUser } from 'react-icons/fi'
import { v4 } from 'uuid'
import { Avatar } from '../../components/Avatar'
import { MainContainer } from '../../container/MainContainer'
import { RoutesName } from '../../routes'
import {
    BoxCollectionCard,
    BoxesInfo,
    CollectionInfoContainer,
    CollectionReview,
    CollectionTable,
    GeneralInformarionContainer,
} from './styles'
import iconOne from '../../assets/collection/Icon.png'
import iconTwo from '../../assets/collection/Icon-1.png'
import iconThree from '../../assets/collection/Icon-2.png'
import iconFour from '../../assets/collection/Icon-3.png'
import iconFive from '../../assets/collection/Icon-4.png'
import iconSix from '../../assets/collection/Icon-5.png'
import iconSeven from '../../assets/collection/Icon-6.png'
import iconEight from '../../assets/collection/Icon-7.png'
import info from '../../assets/collection/info.png'

import { ReviewCollection } from '../../modals/ReviewCollection'

export function CollectionInfoPage() {
    const params = window.location.search.split('?')[1]
    // state
    const [busy, setBusy] = useState(false)
    const [openReviewCollection, setOpenReviewCollection] = useState(false)
    const responsive = {
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 4,
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 2,
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1,
        },
    }

    const images = [
        'https://images.unsplash.com/photo-1549989476-69a92fa57c36?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60',
        'https://images.unsplash.com/photo-1549396535-c11d5c55b9df?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60',
        'https://images.unsplash.com/photo-1550133730-695473e544be?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60',
        'https://images.unsplash.com/photo-1550167164-1b67c2be3973?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60',
        'https://images.unsplash.com/photo-1550338861-b7cfeaf8ffd8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60',
        'https://images.unsplash.com/photo-1550223640-23097fc71cb2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60',
        'https://images.unsplash.com/photo-1550353175-a3611868086b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60',
        'https://images.unsplash.com/photo-1550330039-a54e15ed9d33?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60',
        'https://images.unsplash.com/photo-1549737328-8b9f3252b927?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60',
        'https://images.unsplash.com/photo-1549833284-6a7df91c1f65?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60',
        'https://images.unsplash.com/photo-1549985908-597a09ef0a7c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60',
        'https://images.unsplash.com/photo-1550064824-8f993041ffd3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60',
    ]

    return (
        <MainContainer
            path={[
                { label: 'Coletas', path: RoutesName.collections },
                { label: '/ 123456', path: RoutesName.singleCollection },
            ]}
            title="123123"
            active="collections"
            busy={busy}
            btnLabel="Revisar coleta"
            callback={() => setOpenReviewCollection(true)}
        >
            <CollectionInfoContainer>
                <GeneralInformarionContainer>
                    <div className="f24-700-dark-gray title">
                        Informações gerais
                    </div>
                    <div className="general-info-content">
                        <div className="general-info">
                            <div className="object">
                                <div className="object-title">
                                    <FiList />
                                    <h2 className="f14-700-dark">Modelo</h2>
                                </div>
                                <div className="object-info">
                                    <p className="f14-700-gray">Mega plush</p>
                                </div>
                            </div>
                            <div className="object">
                                <div className="object-title">
                                    <FiUser />
                                    <h2 className="f14-700-dark">
                                        Ponto de venda
                                    </h2>
                                </div>
                                <div className="object-info">
                                    <p className="f14-700-gray">
                                        Shopping Boa Vista
                                    </p>
                                </div>
                            </div>
                            <div className="object">
                                <div className="object-title">
                                    <FiUser />
                                    <h2 className="f14-700-dark">Operador</h2>
                                </div>
                                <div className="object-info">
                                    <p className="f14-700-gray">
                                        Leandro da Silva
                                    </p>
                                </div>
                            </div>
                            <div className="object">
                                <div className="object-title">
                                    <FiDollarSign />
                                    <h2 className="f14-700-dark">
                                        Valor da jogada
                                    </h2>
                                </div>
                                <div className="object-info">
                                    <p className="f14-700-gray">R$ 10,00</p>
                                </div>
                            </div>
                            {/* Days withou operation */}
                            <div className="days-without-operation">
                                <img src={info} alt="info" />
                                <h2>Esta máquina ficou 4 dias sem operar.</h2>
                            </div>
                        </div>

                        <div className="machine-info">
                            <div className="telemetry-operator">
                                <div className="operator-card">
                                    <h1 className="title">Coleta anterior</h1>
                                    <div className="object">
                                        <Avatar label="FS" />
                                        <div className="operator-info">
                                            <h1 className="f18-700-dark">
                                                Rodrigo A. Seixas
                                            </h1>
                                            <h2 className="f12-700-dark">
                                                29 JUN 2021 16:24 (12 dias)
                                            </h2>
                                            <p className="f12-500-gray">
                                                Última coleta
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="operator-card">
                                    <h1 className="title">Coleta atual</h1>
                                    <div className="object">
                                        <Avatar label="FS" />
                                        <div className="operator-info">
                                            <h1 className="f18-700-dark">
                                                Rodrigo A. Seixas
                                            </h1>
                                            <h2 className="f12-700-dark">
                                                29 JUN 2021 16:24 (12 dias)
                                            </h2>
                                            <p className="f12-500-gray">
                                                Última coleta
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </GeneralInformarionContainer>
                <BoxesInfo>
                    <div className="f24-700-dark-gray title">
                        Resumo das cabines
                    </div>
                    <div className="collection-cards">
                        <BoxCollectionCard>
                            <img src={iconOne} alt="" />
                            <div className="info">
                                <h1>R$430</h1>
                                <p>Cartão</p>
                            </div>
                        </BoxCollectionCard>
                        <BoxCollectionCard>
                            <img src={iconTwo} alt="" />
                            <div className="info">
                                <h1>R$430</h1>
                                <p>Cartão</p>
                            </div>
                        </BoxCollectionCard>
                        <BoxCollectionCard>
                            <img src={iconThree} alt="" />
                            <div className="info">
                                <h1>R$430</h1>
                                <p>Cartão</p>
                            </div>
                        </BoxCollectionCard>
                        <BoxCollectionCard>
                            <img src={iconFour} alt="" />
                            <div className="info">
                                <h1>R$430</h1>
                                <p>Cartão</p>
                            </div>
                        </BoxCollectionCard>
                        <BoxCollectionCard>
                            <img src={iconFive} alt="" />
                            <div className="info">
                                <h1>R$430</h1>
                                <p>Cartão</p>
                            </div>
                        </BoxCollectionCard>
                    </div>
                    <div
                        // style={{ gridTemplateColumns: '1fr' }}
                        className="collection-tables"
                    >
                        <CollectionTable>
                            <div className="title-table">
                                <h1>Cabine 1</h1>
                            </div>
                            <div className="header">
                                <h2>Contador</h2>
                                <h2>Relógio</h2>
                                <h2>Anterior</h2>
                                <h2>Atual</h2>
                                <h2>Diferença</h2>
                                <h2>Telemetria</h2>
                            </div>
                            <div className="table-line">
                                <div className="counter">
                                    <h2>Cartão</h2>
                                </div>
                                <div className="types">
                                    <div className="types-line">
                                        <h1
                                            style={{
                                                color: '#1D1929',
                                                fontWeight: 700,
                                            }}
                                        >
                                            Digital
                                        </h1>
                                        <h1 style={{ color: '#003CFF' }}>
                                            2953
                                        </h1>
                                        <h1 style={{ color: '#003CFF' }}>
                                            2953
                                        </h1>
                                        <h1 style={{ color: '#003CFF' }}>
                                            2953
                                        </h1>
                                    </div>
                                    <div className="types-line">
                                        <h1
                                            style={{
                                                color: '#1D1929',
                                                fontWeight: 700,
                                            }}
                                        >
                                            Digital
                                        </h1>
                                        <h1 style={{ color: '#003CFF' }}>
                                            2953
                                        </h1>
                                        <h1 style={{ color: '#003CFF' }}>
                                            2953
                                        </h1>
                                        <h1 style={{ color: '#003CFF' }}>
                                            2953
                                        </h1>
                                    </div>
                                </div>
                                <div className="telemetry">
                                    <h1 style={{ color: '#18BA92' }}>2953</h1>
                                </div>
                            </div>
                            <div className="table-line">
                                <div className="counter">
                                    <h2>Cartão</h2>
                                </div>
                                <div className="types">
                                    <div className="types-line">
                                        <h1
                                            style={{
                                                color: '#1D1929',
                                                fontWeight: 700,
                                            }}
                                        >
                                            Digital
                                        </h1>
                                        <h1 style={{ color: '#003CFF' }}>
                                            2953
                                        </h1>
                                        <h1 style={{ color: '#003CFF' }}>
                                            2953
                                        </h1>
                                        <h1 style={{ color: '#003CFF' }}>
                                            2953
                                        </h1>
                                    </div>
                                    <div className="types-line">
                                        <h1
                                            style={{
                                                color: '#1D1929',
                                                fontWeight: 700,
                                            }}
                                        >
                                            Digital
                                        </h1>
                                        <h1 style={{ color: '#003CFF' }}>
                                            2953
                                        </h1>
                                        <h1 style={{ color: '#003CFF' }}>
                                            2953
                                        </h1>
                                        <h1 style={{ color: '#003CFF' }}>
                                            2953
                                        </h1>
                                    </div>
                                </div>
                                <div className="telemetry">
                                    <h1 style={{ color: '#18BA92' }}>2953</h1>
                                </div>
                            </div>
                        </CollectionTable>
                        <CollectionTable>
                            <div className="title-table">
                                <h1>Cabine 1</h1>
                            </div>
                            <div className="header">
                                <h2>Contador</h2>
                                <h2>Relógio</h2>
                                <h2>Anterior</h2>
                                <h2>Atual</h2>
                                <h2>Diferença</h2>
                                <h2>Telemetria</h2>
                            </div>
                            <div className="table-line">
                                <div className="counter">
                                    <h2>Cartão</h2>
                                </div>
                                <div className="types">
                                    <div className="types-line">
                                        <h1
                                            style={{
                                                color: '#1D1929',
                                                fontWeight: 700,
                                            }}
                                        >
                                            Digital
                                        </h1>
                                        <h1 style={{ color: '#003CFF' }}>
                                            2953
                                        </h1>
                                        <h1 style={{ color: '#003CFF' }}>
                                            2953
                                        </h1>
                                        <h1 style={{ color: '#003CFF' }}>
                                            2953
                                        </h1>
                                    </div>
                                    <div className="types-line">
                                        <h1
                                            style={{
                                                color: '#1D1929',
                                                fontWeight: 700,
                                            }}
                                        >
                                            Digital
                                        </h1>
                                        <h1 style={{ color: '#003CFF' }}>
                                            2953
                                        </h1>
                                        <h1 style={{ color: '#003CFF' }}>
                                            2953
                                        </h1>
                                        <h1 style={{ color: '#003CFF' }}>
                                            2953
                                        </h1>
                                    </div>
                                </div>
                                <div className="telemetry">
                                    <h1 style={{ color: '#18BA92' }}>2953</h1>
                                </div>
                            </div>
                            <div className="table-line">
                                <div className="counter">
                                    <h2>Cartão</h2>
                                </div>
                                <div className="types">
                                    <div className="types-line">
                                        <h1
                                            style={{
                                                color: '#1D1929',
                                                fontWeight: 700,
                                            }}
                                        >
                                            Digital
                                        </h1>
                                        <h1 style={{ color: '#003CFF' }}>
                                            2953
                                        </h1>
                                        <h1 style={{ color: '#003CFF' }}>
                                            2953
                                        </h1>
                                        <h1 style={{ color: '#003CFF' }}>
                                            2953
                                        </h1>
                                    </div>
                                    <div className="types-line">
                                        <h1
                                            style={{
                                                color: '#1D1929',
                                                fontWeight: 700,
                                            }}
                                        >
                                            Digital
                                        </h1>
                                        <h1 style={{ color: '#003CFF' }}>
                                            2953
                                        </h1>
                                        <h1 style={{ color: '#003CFF' }}>
                                            2953
                                        </h1>
                                        <h1 style={{ color: '#003CFF' }}>
                                            2953
                                        </h1>
                                    </div>
                                </div>
                                <div className="telemetry">
                                    <h1 style={{ color: '#18BA92' }}>2953</h1>
                                </div>
                            </div>
                        </CollectionTable>
                    </div>
                </BoxesInfo>
                <CollectionReview>
                    <div className="f24-700-dark-gray title">
                        Revisão da coleta
                    </div>
                    <div className="review-cards">
                        <BoxCollectionCard>
                            <img src={iconSix} alt="" />
                            <div className="info">
                                <h1>R$430</h1>
                                <p>Valor estimado</p>
                            </div>
                        </BoxCollectionCard>
                        <BoxCollectionCard>
                            <img src={iconSeven} alt="" />
                            <div className="info">
                                <h1>R$464</h1>
                                <p>Valor recolhido</p>
                            </div>
                        </BoxCollectionCard>
                        <BoxCollectionCard>
                            <img src={iconEight} alt="" />
                            <div className="info">
                                <h1>R$430</h1>
                                <p>DIferença</p>
                            </div>
                        </BoxCollectionCard>
                    </div>
                    <div className="reviewed-by-container">
                        <div className="info">
                            <h1 className="f18-700-dark">Revisado por</h1>
                            <div className="object">
                                <Avatar label="FS" />
                                <div className="operator-info">
                                    <h1 className="f18-700-dark">
                                        Rodrigo A. Seixas
                                    </h1>
                                    <h2 className="f12-700-dark">
                                        29 JUN 2021 16:24 (12 dias)
                                    </h2>
                                    <p className="f12-500-gray">
                                        Última coleta
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="observation">
                            <div className="title">
                                <h1 className="f18-700-dark">Observações</h1>
                            </div>
                            <p>
                                Lorem ipsum dolor sit amet, consectetur
                                adipiscing elit. Praesent pharetra sit amet nisl
                                eget tincidunt. Praesent semper, tortor id
                                elementum pretium, urna massa rutrum velit, non
                                elementum ipsum est.
                            </p>
                        </div>
                    </div>
                </CollectionReview>
                <div className="photos-container">
                    <div className="f24-700-dark-gray title">
                        Fotos da coleta
                    </div>
                    <div className="carousel-c">
                        <Carousel
                            ssr
                            itemClass="image-item"
                            responsive={responsive}
                            autoPlay={false}
                            infinite={false}
                        >
                            {images.map((image) => {
                                return (
                                    <div className="img" key={v4()}>
                                        <img
                                            draggable={false}
                                            style={{
                                                width: '100%',
                                                height: '100%',
                                            }}
                                            src={image}
                                            alt="lla"
                                        />
                                    </div>
                                )
                            })}
                        </Carousel>
                    </div>
                </div>
                <div className="observation-container">
                    <div className="f24-700-dark-gray title">Observações</div>
                    <h2 className="observation-string">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Praesent pharetra sit amet nisl eget tincidunt. Praesent
                        semper, tortor id elementum pretium, urna massa rutrum
                        velit, non elementum ipsum est.
                    </h2>
                </div>
            </CollectionInfoContainer>
            <ReviewCollection
                isOpen={openReviewCollection}
                onRequestClose={() => setOpenReviewCollection(false)}
            />
        </MainContainer>
    )
}
