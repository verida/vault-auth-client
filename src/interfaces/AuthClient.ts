

export interface AuthClientConfig {
    serverUri: string,      // WSS URI
    loginUri: string,       // Login URI
    canvasId: string        // DOM id where the QR code canvas will be injected
}

export interface AuthResponse {
    type: string,
    message: any
}