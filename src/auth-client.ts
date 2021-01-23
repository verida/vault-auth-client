import { AuthClientConfig, AuthResponse } from "./interfaces/AuthClient"
import EncryptionUtils from "@verida/encryption-utils"
const _ = require("lodash")
const QRCode = require("qrcode")

export default class AuthClient {

    ws: any
    config: AuthClientConfig
    symKeyBytes?: Uint8Array

    constructor(config: AuthClientConfig) {
        this.config = _.merge({
            schemeUri: 'veridavault://login-request',
            loginUri: 'https://vault.verida.io/start',
            deeplinkId: 'verida-auth-client-deeplink'
        }, config)

        this.ws = new WebSocket(config.serverUri)
        const client = this

        this.ws.onmessage = function(event: MessageEvent) {
            client.newMessage(event)
        }

        config = this.config
        this.ws.onopen = function() {
            client.ws.send(JSON.stringify({type: 'generateJwt', appName: config.appName}))
        }

        this.ws.onerror = this.error
    }

    newMessage(event: MessageEvent) {
        const response = <AuthResponse> JSON.parse(event.data)

        switch (response.type) {
            case 'auth-client-request':
                const canvas = document.getElementById(this.config.canvasId)
                const queryParams = this.generateQueryParams(response.message!)
                const redirectUri = `${this.config.loginUri}${queryParams}`
                const schemeUri = `${this.config.schemeUri}${queryParams}`

                try {
                    window.location.href = schemeUri
                } catch (err) {
                    console.log(err)
                }

                const deeplinkElm = document.getElementById(this.config.deeplinkId)

                if (deeplinkElm) {
                    deeplinkElm.setAttribute('href', schemeUri)
                }
                
                QRCode.toCanvas(canvas, redirectUri, function (err: any) {
                    if (err) {
                        console.error("Error: ", err)
                    }
                })
                return
            case 'auth-client-response':
                console.log('response from server for the client!')
                const key = this.symKeyBytes!
                const decrypted = EncryptionUtils.symDecrypt(response.message, key)

                this.config.callback(decrypted)
                return
        }

        console.error(`Unknown message type: ${response.type}`, response)
    }

    error(event: MessageEvent) {
        console.error("WebSocket error: ", event)
    }

    generateQueryParams(didJwt: string) {
        this.symKeyBytes = EncryptionUtils.randomKey(32)
        const symKeyHex = "0x" + Buffer.from(this.symKeyBytes).toString("hex")

        // note: can't use `key` as a parameter as its a reserved word in react native
        // instead use `_k` (key) and `_r` (request)
        return `?_k=${symKeyHex}&_r=${didJwt}`
    }

}