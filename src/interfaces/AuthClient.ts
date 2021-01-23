

export interface AuthClientConfig {
    appName: string,
    serverUri: string,      // WSS URI
    loginUri: string,       // Login URI (page where the user will be sent to login using the app; ie: vault.verida.io)
    canvasId: string        // DOM id where the QR code canvas will be injected
    schemeUri: string,
    deeplinkId: string,
    callback(response: AuthResponse): void        // callback function (called when auth response received)
}

export interface AuthResponse {
    type: string,
    success: boolean,
    message: string
}