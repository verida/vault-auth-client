/*  eslint no-undef: ignore */
import AuthClient from './index';
// @ts-ignore
import * as Logo from './assets/logo.svg';

export default function() {
  const veridaButton = document.querySelector("[verida-config-server-uri]")

  if (!veridaButton) return;

  const serverUri = veridaButton.getAttribute('verida-config-server-uri');
  if (!serverUri) return Error('Verida config server URI not found!')

  let loginUri = veridaButton.getAttribute('verida-config-login-uri');
  if (!loginUri) loginUri = window.location.origin;

  const authConfig = {
    serverUri: serverUri,
    loginUri: loginUri,
    canvasId: 'verida-auth-client-canvas'
  }

  const modalHTML = `
    <div id="verida-modal" hidden="true" class="verida-modal-wrapper">
      <div class="verida-modal-container">
        <div class="verida-modal-header">
          <span class="verida-modal-close" id="verida-modal-close">&times;</span>
        </div>
        <div class="verida-modal-body">
          <div class="verida-modal-body-title">
            <span>Login with</span>
            <img src="${ Logo }" alt="verida logo">
          </div>
          <canvas id="verida-auth-client-canvas" class="verida-modal-qr"></canvas>
          <p style="text-align: center;">Scan this QR code on your mobile phone to login or signup.</p>
        </div>
      </div>
    </div>

    <style>
      .verida-modal-wrapper {
        display: none;
        position: fixed;
        z-index: 1;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        overflow: auto;
        background-color: rgba(0,0,0,0.4);
      }

      .verida-modal-container {
        background-color: #fff;
        margin: 3% auto;
        padding: 0;
        border: 1px solid #888;
        width: 80%;
        min-height: 80%;
      }

      .verida-modal-body {
        padding: 10px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
      }

      .verida-modal-qr {
        padding: 20px;
        box-shadow: 0 0 10px rgba(0,0,0,0.5);
        border-radius: 10px;
        margin-bottom: 3%;
      }

      .verida-modal-header {
        display: flex;
        flex-direction: column;
        padding: 5px;
        margin: 0 0 10px;
        box-shadow: 0 0px 5px;
        border-bottom: 1px solid rgb(0,0,0,0.1);
      }
      .verida-modal-body-title {
        padding: 0 0 3%;
        align-items: center;
        justify-content: center;
        display: flex;
      }
      .verida-modal-body-title span {
        padding-right: 5px;
      }

      .verida-modal-close {
        align-self: flex-end;
        color: #aaa;
        font-size: 28px;
        font-weight: bold;
      }

      .verida-modal-close:hover,
      .verida-modal-close:focus {
        color: black;
        text-decoration: none;
        cursor: pointer;
      }

      @media screen and (max-width: 700px), screen and (max-height: 600px) {
        .verida-modal-qr {
          height: 70% !important;
          width: 70% !important;
        }
        .verida-modal-body-title {
          width: 50%;
          height: max-content;
          flex-direction: column;
        }
        .verida-modal-body-title span {
          padding-right: 0px;
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
  window.onclick = function(event: Event){
    if (event.target === modal && modal !== null) {
      modal.style.display = 'none';
    }
  }

  veridaButton.addEventListener('click', () => {
    new AuthClient(authConfig)
    modal && (modal.style.display = "block");
  });
};
