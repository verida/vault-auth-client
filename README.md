# Verida Auth Client 

## Usage

```js
import { veridaVaultLogin } from '@verida/vault-auth-client'

// Unique name of application
const APP_NAME = 'My Company: My Application'

// URI of the auth server. Verida provides a default server for testnet, but you can spin
// up your own using https://github.com/verida/vault-auth-server
const WSS_URI = 'wss://auth-server.testnet.verida.io:7001'

// URL of the logo to display in the Verida Vault mobile application
// when the user is authenticating
const LOGO_URL = ''

veridaVaultLogin({
      serverUri: WSS_URI,
      appName: APP_NAME,
      logoUrl: LOGO_URL,
      callback: async (response) => {
          // instantiate a Verida client using the signature that unlocks this application's
          // secure context of databases and messages
          const verida = new Verida({
            did: response.did,
            signature: response.signature,
            appName: APP_NAME
          })
          
          // connect the user
          await verida.connect(true)

          // The user is now authenticated
          // The verida instance can now be used to open databases, datastores, access the application inbox etc.
        }
      }
    })
  }
```

## Build scripts

> `Note:` Windows users ensure you open your bash terminal before running any scripts to work properly .


- MacOSX: `npm run build`
- Windows: `npm run build.bash`