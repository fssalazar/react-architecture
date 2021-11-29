import styled from 'styled-components'

export const SideBarContainer = styled.nav`
    height: 100vh;
    padding: 3.2rem 2.4rem;
    .logo {
        width: 24rem;
        height: 11.2;
        img {
            width: 24rem;
            height: 11.2;
        }
    }
    .contractor-btn {
        margin: 2.8rem 0;
        border: none;
        text-align: end;
        button {
            background-color: inherit;
            border: none;
        }
    }
    .nav-items {
        height: 37rem;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: space-between;
        .nav-item {
            display: flex;
            align-items: center;
            justify-content: flex-start;
            padding: 1.2rem 1.6rem;
            width: 100%;
            border: none;
            border-radius: 1.6rem;
            background-color: inherit;
            transition: all 0.4s ease;
            .tab-name {
                font-size: 1.4rem;
                color: #34303e;
                font-weight: 700;
            }
            svg {
                margin-right: 1.6rem;
                color: #bbbabf;
                height: 1.5rem;
                width: 1.5rem;
            }
            &:hover {
                background-color: #e6ecff;
                .tab-name {
                    color: #3363ff;
                }
                svg {
                    color: #3363ff;
                }
            }
        }
        .nav-item-active {
            background-color: #e6ecff;
            .tab-name {
                color: #3363ff;
            }
            svg {
                color: #3363ff;
            }
        }
    }
    .need-help {
        margin-top: 20rem;
        margin-bottom: 3.2rem;
        .nav-item {
            display: flex;
            align-items: center;
            justify-content: flex-start;
            padding: 1.2rem 1.6rem;
            width: 100%;
            border: none;
            border-radius: 1.6rem;
            background-color: inherit;
            transition: all 0.4s ease;
            .tab-name {
                font-size: 1.4rem;
                color: #34303e;
                font-weight: 700;
            }
            svg {
                margin-right: 1.6rem;
                color: #bbbabf;
                height: 1.5rem;
                width: 1.5rem;
            }
            &:hover {
                background-color: #e6ecff;
                .tab-name {
                    color: #3363ff;
                }
                svg {
                    color: #3363ff;
                }
            }
        }
    }
    .divider {
        width: 100%;
        border: 2px dashed #e8e8ea;
        padding: 0 1.6rem;
        margin-bottom: 2.4rem;
    }
    .user-menu {
        display: flex;
        align-items: center;
        justify-content: space-between;
        .user-img {
            height: 3.2rem;
            width: 3.2rem;
            border-radius: 1.2rem;
            img {
                height: 3.2rem;
                width: 3.2rem;
                border-radius: 1.2rem;
            }
        }
    }
`
