

export interface AuthClientConfig {
    serverUri: string,      // WSS URI
    loginUri: string,      // Login URI (page where the user will be sent to login using the app; ie: vault.verida.io)
    canvasId: string        // DOM id where the QR code canvas will be injected
}

export interface AuthResponse {
    type: string,
    message: any
}