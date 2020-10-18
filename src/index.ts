import { AuthClientConfig, AuthResponse } from "./interfaces/AuthClient"
import EncryptionUtils from "@verida/encryption-utils"
const _ = require("lodash")
const QRCode = require('qrcode')

export default class AuthClient {

    ws: any
    config: AuthClientConfig

    constructor(config: AuthClientConfig) {
        this.config = _.merge({
            loginUri: 'https://vault.verida.io/start'
        }, config)

        this.ws = new WebSocket(config.serverUri)
        const client = this

        this.ws.onmessage = function(event: MessageEvent) {
            client.newMessage(event)
        }

        this.ws.onopen = function() {
            client.ws.send(JSON.stringify({type: 'generateJwt'}))
        }

        this.ws.onerror = this.error
    }

    newMessage(event: MessageEvent) {
        const data = <AuthResponse> JSON.parse(event.data)

        switch (data.type) {
            case "auth-client-request":
                console.log(this.config, data)
                const canvas = document.getElementById(this.config.canvasId)
                const qrData = this.generateQrData(data.message)
                console.log(qrData)
                QRCode.toCanvas(canvas, qrData, function (err: any) {
                    if (err) {
                        console.error("Error: ", err)
                    }
                })
                return
        }

        console.error(`Unknown message type: ${data.type}`, data)
    }

    error(event: MessageEvent) {
        console.error("WebSocket error: ", event)
    }

    generateQrData(didJwt: string) {
        const symKeyBytes = EncryptionUtils.randomKey(32)
        const symKeyHex = "0x" + Buffer.from(symKeyBytes).toString("hex")
        
        return `${this.config.loginUri}?key=${symKeyHex}&req=${didJwt}`
    }

}