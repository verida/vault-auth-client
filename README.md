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
    })
```

## Build scripts

> `Note:` Windows users ensure you open your bash terminal before running any scripts to work properly .


- MacOSX: `npm run build`
- Windows: `npm run build.bash`

## Getting started with Verida Auth Client Demo 



### Connecting to your vault 

```js
import Verida from '@verida/datastore';
import { veridaVaultLogin } from '@verida/vault-auth-client';


// Unique name of application
const APP_NAME = 'My Company: My Application'

// URI of the auth server. Verida provides a default server for testnet, but you can spin
// up your own using https://github.com/verida/vault-auth-server
const WSS_URI = 'wss://auth-server.testnet.verida.io:7001'

// URL of the logo to display in the Verida Vault mobile application
// when the user is authenticating
const LOGO_URL = ''


   veridaVaultLogin({
      loginUri: WSS_URI,
      serverUri: SERVER_URI,
      appName: CLIENT_AUTH_NAME,
      logoUrl: LOGO_URL,
      callback: async (response) => {
          const veridaDApp = new Verida({
            did: response.did,
            signature: response.signature,
            appName: CLIENT_AUTH_NAME
          })
          await veridaDApp.connect(true)
          const dataStore = await window.veridaDApp.openDatastore(DATASTORE_SCHEMA)
          const notes = await dataStore.getMany();


          const profileInstance = await window.veridaDApp.openProfile(response.did, 'Verida: Vault');

          const data = await profileInstance.getMany()
          const userProfile = data.reduce((result, item) => {
            result[item.key] = item.value;
            return result;
          }, {});
      }
    })


```

 1. The `VeridaVaultLogin` function accepts an object with the following  fields

- `loginUri` -  The vault login Url,
-  `serverUri` - URI of the auth server. Verida provides a default server for testnet, but you can spin
up your own using https://github.com/verida/vault-auth-server
-  `appName`  -  Custom application name
-  `logoUrl` - URL of the logo to display in the Verida Vault mobile application when the user is authenticating ``optional``
-  `callback` - A function that returns the decrypted user data .

2. When the `veridaVaultLogin` function is been called it will open a modal with a QR code which a user scans to allow access from the requesting application.

`see example below:`

![demo image](http://assets.verida.io/verida_logo.svg)

3. Create an instance of the verida App using the response in the callback function from the `VeridaVaultLogin` and a open datastore see example:

```js

    const veridaDApp = new Verida({
      did: response.did,
      signature: response.signature,
      appName: CLIENT_AUTH_NAME
    })

    const dataStore = await window.veridaDApp.openDatastore(DATASTORE_SCHEMA)
    const notes = await dataStore.getMany();   

    await veridaDApp.connect(true)

```

3. Accessing the user public profile data

```js

    const profileInstance = await window.veridaDApp.openProfile(response.did, 'Verida: Vault');
    const data = await profileInstance.getMany()
    const userProfile = data.reduce((result, item) => {
      result[item.key] = item.value;
      return result;
    }, {});

```

4. Listen for real time changes in the vault when ever user edits their public profile information

`see example code below:`

```js
    const db = await profileInstance._store.getDb();
    const dbInstance = await db.getInstance();
    dbInstance.changes({
        since: 'now',
        live: true
    }).on('change', async function (info) {
        const row = await db.get(info.id, {
          rev: info.changes[0].rev
        });
          
        // updated user data
        console.log(row);
    });
```

## Using Verida Custom Button

Verida  would suggest you to use the following buttons for SSO login (Single Sign On) to maintain a consistent branding. you can save these images to your server cloud in order to use it on your application.

Login in with Verida `button`:

![verida button]()

Login in with Verida `link`:

![verida button Link]()

 


