/*  eslint no-undef: ignore */
import AuthClient from './index';
// @ts-ignore
import Logo from './assets/verida_vault_logo.svg';
import BackgroundImage from './assets/verida_bg.png';
// @ts-ignore
import Sora from './assets/fonts/Sora-Regular.ttf';
import { AuthClientConfig } from './interfaces/AuthClient';
const _ = require('lodash')

export default function (config: Omit<AuthClientConfig, "loginUri" | "canvasId">) {
  const authConfig: AuthClientConfig = _.merge({
    loginUri: 'https://vault.verida.io/start',
    canvasId: 'verida-auth-client-canvas'
  }, config)


  const modalHTML = `
  <div id="verida-modal" hidden="true" class="verida-modal-wrapper">
    <div class="verida-modal-container">
      <div class="verida-modal-header" id="verida-modal-header">
        <img class="verida-modal-logo" src="${Logo}" alt="verida logo">
        <span class="verida-modal-close" id="verida-modal-close">&times;</span>
      </div>
      <div class="verida-modal-body">
        <div>
          <h3 class="verida-modal-title">
            Scan this QR code on your mobile phone to login or signup
          </h3>
          <p class="verida-body-content">Already on your phone with Verida Vault installed? <a href="##">Log in with
          Verida Vault</a></p>
        </div>
        <div>
          <canvas id="verida-auth-client-canvas" class="verida-modal-qr"></canvas>
        </div>
      </div>
    </div>
  </div>

    <style>
    @font-face {
      font-family: "Sora";
      src: url(${Sora}) format("truetype");
    }

     #verida-auth-client-canvas {
      width: 287px !important;
      height: 287px !important;
    }

    .verida-modal-wrapper {
      display: none;
      position: fixed;
      left: 0;
      top: 0;
      z-index: 9999;
      width: 100%;
      height: 100%;
      overflow: hidden;
      background-color: #E5E5E5;
    }

    .verida-modal-container {
      margin: 3% auto;
      padding: 0;
      border-radius: 14.35px;
      background-image: url(${BackgroundImage});
      background-position: 50% 100%;
      background-size: cover;
      min-height: 80%;
      width: 800px;
      height: 483px;
      font-family: Sora, Avenir, Helvetica, Arial, sans-serif;
      font-weight: 700;
      box-shadow: 0px 35px 45px rgba(7, 14, 39, 0.05);
    }


    .image-curved {
      width: 800px;
      height: 483px;
    }

    .verida-modal-body {
      display: flex;
      margin: 2rem 4rem;
      align-items: center;
      justify-content: center;
    }

    .verida-modal-qr {
      margin: 1rem 0 0 1rem;
      background: #FFFFFF;
      border-radius: 14.35px;
      box-shadow: 0px 35px 45px rgba(7, 14, 39, 0.05);
    }

    .verida-modal-header {
      display: flex;
      padding: 5px;
      justify-content: space-between;
      margin: 1.3rem 0.4rem 0 0.4rem;
    }

    .verida-modal-title {
      font-family: Sora;
      font-style: normal;
      font-weight: bold;
      font-size: 32px;
      line-height: 40px;
      letter-spacing: -0.03em;
      color: #111111;
    }

    .verida-body-content {
      font-family: Sora;
      font-style: normal;
      font-weight: 500;
      font-size: 16px;
      line-height: 30px;
      letter-spacing: 0.2px;
      color: rgba(17, 17, 17, 0.7);
    }

    .verida-modal-body-title {
      padding: 0 0.9rem;
      align-items: center;
      justify-content: center;
      display: flex;
    }

    .verida-button {
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      padding: 16px 48px;

      width: 295.91px;
      height: 56px;

      background: #111111;
      border-radius: 8px;
    }

    .verida-modal-close {
      text-align: center;
      color: #041133;
      width: 30px;
      height: 30px;
      font-size: 26px;
      font-weight: lighter;
      background: #E0E3EA;
      opacity: 0.5;
      backdrop-filter: blur(54.3656px);
      border-radius: 50%;
      margin:0.5rem  0 0 0;
      padding: 0.2rem 0 -0.5rem 0;
    }

    .verida-modal-logo {
      margin: 0.8rem 3.5rem 0 3.5rem;
    }

    .verida-modal-close:hover,
    .verida-modal-close:focus {
      color: black;
      text-decoration: none;
      cursor: pointer;
    }

    @media screen and (max-width: 700px),
    screen and (max-height: 600px) {
      .verida-modal-qr {
        height: 80% !important;
        width: 80% !important;
      }

      .verida-modal-container {
        width: 90%;
      }

      .verida-modal-body {
        flex-direction: column;
        margin: 2rem 2rem;
      }

      .verida-modal-title {
        font-size: 25px;
      }
      .verida-modal-body-title {
        width: 50%;
        height: max-content;
        flex-direction: column;
      }
    }
    </style>
  `
  document.body.insertAdjacentHTML('beforeend', modalHTML)

  const modal: HTMLElement | null = document.getElementById('verida-modal');
  const closeModal: HTMLElement | null = document.getElementById('verida-modal-close');
  if (modal && closeModal) {
    closeModal.onclick = () => modal.style.display = 'none';
  }
  window.onclick = function (event: Event) {
    if (event.target === modal && modal !== null) {
      modal.style.display = 'none';
    }
  }

  new AuthClient(authConfig, modal)
  modal && (modal.style.display = "block");
};
