/* eslint-disable max-len */
import { createGlobalStyle } from 'styled-components'

export default createGlobalStyle`

*{
  margin: 0;
  padding:0;
  box-sizing: border-box ;
  outline: none;
  font-family: Nunito Sans, sans-serif;

  }


  :root{
      --color-dark: #1D1929;
      --color-light: #fff;
      --color-table: #F6F7F8;
      --color-gray: #646669;
      --color-success: #3BB90A;
      --color-warning: #E8604A;
      --color-secondary-gray: #96989B;
      --color-light-gray: #F9F9F9;
      --color-error: #E1173F;
      --color-background: #F9F9F9;
      --color-primary: #809EFF;
      --color-secondary: #3363FF;
      --color-primary-dark: #34303E;
  }

  html {
    scroll-behavior: smooth;
    font-size: 62.5%;

  @media screen and (max-width: 87.5em) {       //1400px  //1rem = 9px, 9/16 = 52.25%
    font-size: 52.25%;
  }
  @media screen and (max-width: 75em) {       //1200px  //1rem = 9px, 9/16 = 52.25%
    font-size: 52.25%;
  }
  @media screen and (max-width: 56.25em) {     //900px  //1rem = 8px, 8/16 = 50%
    font-size: 50%;
  }
  /* @media screen and (max-width: 37.5em) {    //600px
    padding: 100px;
  } */
  /* @media screen and (min-width: 112.5em) {    //1800 px //1rem = 12px, 12/16 = 75%
    font-size: 75%;

  } */
  }


  body{
    -webkit-font-smoothing: antialiased;
    background-color: #fff;
  }

  body, input, button, h1, h2, h3, h4, p, tr, th, a, span{
    font-family: Nunito Sans, sans-serif;
    color: #000;
    line-height: 1.5;
    font-size: 1.6rem;
    letter-spacing: 0.5px;
    font-weight: 400;
    line-height: 1.2;
  }


  #root {
    margin: 0;
  }

  .f17-600-dark {
    font-size: 1.7rem;
    font-weight: 600;
    color: var(--color-dark);

  }
  .secondary-initial-font {
    font-size: 1.6rem;
    font-weight: 500;
    color: var(--color-dark);
  }
  .grey-initial-font {
    font-size: 1.6rem;
    font-weight: 400;
    opacity: 0.5;
  }
  .label-font {
    font-size: 1.5rem;
    font-weight: 500;
    line-height: 1.5;
    text-align: left;
    opacity: 0.5;
  }

  .f14-500-gray {
    color: var(--color-gray);
    font-size: 1.4rem;
    font-weight: 500;
  }
  .f14-700-dark {
    color: var(--color-dark);
    font-size: 1.4rem;
    font-weight: 700;
  }
  .f24-700-dark-gray {
    color: #34303E;
    font-size: 2.4rem;
    font-weight: 700;
  }
  .f14-700-light {
    color: var(--color-light);
    font-size: 1.4rem;
    font-weight: 700;
  }
  .f12-600-gray {
    color: var(--color-gray);
    font-size: 1.4rem;
    font-weight: 600;
  }
  .f12-500-gray {
    color: var(--color-gray);
    font-size: 1.4rem;
    font-weight: 500;
  }
  .f24-700-primary-gray {
    color: var(--color-primary-gray);
    font-size: 2.4rem;
    font-weight: 700;
  }
  .f24-700-primary-dark {
    color: var(--color-primary-dark);
    font-size: 2.4rem;
    font-weight: 700;
  }
  .f16-400-primary-gray {
    color: var(--color-primary-gray);
    font-size: 1.6rem;
    font-weight: 400;
  }
  .f22-700-dark {
    color: var(--color-dark);
    font-size: 2.2rem;
    font-weight: 700;
  }
  .f18-700-dark {
    color: var(--color-dark);
    font-size: 1.8rem;
    font-weight: 700;
  }
  .f18-700-gray {
    color: var(--color-gray);
    font-size: 1.8rem;
    font-weight: 700;
  }
  .f16-500-gray {
    color: var(--color-gray);
    font-size: 1.6rem;
    font-weight: 500;
  }
  .f16-400-light-gray {
    color: var(--color-light-gray);
    font-size: 1.6rem;
    font-weight: 400;
  }

  .f16-500-green {
    color: var(--color-success);
    font-size: 1.6rem;
    font-weight: 500;
  }
  .f16-500-dark {
    color: var(--color-dark);
    font-size: 1.6rem;
    font-weight: 500;
  }
  .f14-500-dark {
    color: var(--color-dark);
    font-size: 1.4rem;
    font-weight: 500;
  }
  .f14-400-dark {
    color: var(--color-dark);
    font-size: 1.4rem;
    font-weight: 400;
  }
  .f14-400-gray {
    color: var(--color-gray);
    font-size: 1.4rem;
    font-weight: 400;
  }
  .f14-500-gray {
    color: var(--color-gray);
    font-size: 1.4rem;
    font-weight: 500;
  }
  .f14-700-gray {
    color: var(--color-gray);
    font-size: 1.4rem;
    font-weight: 700;
  }
  .f12-500-gray {
    color: var(--color-gray);
    font-size: 1.2rem;
    font-weight: 500;
  }
  .f12-700-dark {
    color: var(--color-dark);
    font-size: 1.2rem;
    font-weight: 700;
  }
  .f16-700-dark {
    color: var(--color-dark);
    font-size: 1.6rem;
    font-weight: 700;
  }
  .f16-700-primary-dark {
    color: var(--color-primary-dark);
    font-size: 1.6rem;
    font-weight: 700;
  }
  .f14-700-secondary-gray {
    color: var(--color-secondary-gray);
    font-size: 1.4rem;
    font-weight: 700;
  }
  .f15-700-dark {
    color: var(--color-dark);
    font-size: 1.5rem;
    font-weight: 700;
  }
  .f15-500-dark {
    color: var(--color-dark);
    font-size: 1.5rem;
    font-weight: 500;
  }
  .f16-700-gray-secondary {
    color: var(--color-secondary-gray);
    font-size: 1.6rem;
    font-weight: 700;
  }
  .f16-500-gray-secondary {
    color: var(--color-secondary-gray);
    font-size: 1.6rem;
    font-weight: 500;
    font-style: italic;
  }

  //margins
  .small-margin-top {
    margin-top: 0.8rem;
  }
  .large-margin-bottom {
    margin-bottom: 4.4rem;
  }

  .react-modal-overlay{
    background: rgba(0,0,0,0.5);
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
    z-index: 700;
}
 .react-modal-content-warning {
  position: relative;
    padding: 6.6rem 3.8rem 3.8rem 3.8rem;
    border-radius: 8px;
    background-color: var(--color-table);
    outline: none;
    width: 64rem;
    min-height: 29.7rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    &--title {
      text-align: center;
    }
    &--button {
      align-self: flex-end;
    }
    &--description {
      text-align: center;

      margin: 3rem 0 5rem 0;
    } 
    .close {
        position: absolute;
        top: 1rem;
        right: 1rem;
        border: none;
        background-color: inherit;
        font-weight: 700;
        font-size: 1.6rem;
        padding: 1rem;
        outline: none;
        transition: all 0.3s;
        &:hover {
            transform: rotate(180deg) scale(1.2);
        }
    }

 }
 
 .react-modal-product {
  position: relative;
    padding: 6.6rem 3.8rem 3.8rem 3.8rem;
    border-radius: 2.4rem;
    background-color: var(--color-light);
    outline: none;
    width: 35rem;
    min-height: 28.2rem;
    max-height: 87rem;
    box-shadow: 0px 12px 16px rgba(0, 0, 0, 0.08), 0px 4px 56px rgba(0, 0, 0, 0.08);
    
    .close {
        position: absolute;
        top: 1rem;
        right: 1rem;
        border: none;
        background-color: inherit;
        font-weight: 700;
        font-size: 1.6rem;
        padding: 1rem;
        outline: none;
        transition: all 0.3s;
        &:hover {
            transform: rotate(180deg) scale(1.2);
        }
    }
 }

  .react-modal-content {
    position: relative;
    padding: 6.6rem 3.8rem 3.8rem 3.8rem;
    border-radius: 2.4rem;
    background-color: var(--color-light);
    outline: none;
    width: 73rem;
    min-height: 28.2rem;
    max-height: 87rem;
    box-shadow: 0px 12px 16px rgba(0, 0, 0, 0.08), 0px 4px 56px rgba(0, 0, 0, 0.08);
    
    .close {
        position: absolute;
        top: 1rem;
        right: 1rem;
        border: none;
        background-color: inherit;
        font-weight: 700;
        font-size: 1.6rem;
        padding: 1rem;
        outline: none;
        transition: all 0.3s;
        &:hover {
            transform: rotate(180deg) scale(1.2);
        }
    }
}
.react-modal-telemetry-content {
    position: relative;
    padding: 6.6rem 3.8rem 3.8rem 3.8rem;
    border-radius: 2.4rem;
    background-color: var(--color-light);
    outline: none;
    width: 40rem;
    min-height: 28.2rem;
    max-height: 87rem;
    box-shadow: 0px 12px 16px rgba(0, 0, 0, 0.08), 0px 4px 56px rgba(0, 0, 0, 0.08);
    
    .close {
        position: absolute;
        top: 1rem;
        right: 1rem;
        border: none;
        background-color: inherit;
        font-weight: 700;
        font-size: 1.6rem;
        padding: 1rem;
        outline: none;
        transition: all 0.3s;
        &:hover {
            transform: rotate(180deg) scale(1.2);
        }
    }
}

  button{
    cursor: pointer;
  }
`
