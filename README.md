# app-template

* Make a copy of this repo with the new project name (Forking doesn't work :-())
* edit `package.json` change `name`
* edit `vue.config.js` change `publicPath` that refers to your project
* edit `serverless.yml` change service name
* edit  `public/index.html` and `src/App.vue` to replace `app-template` with the app name


## legal-gateway-apps

This is a [repo](github.com:Plexlogic/legal-gateway-apps.git) with re-usable components & functions.

Import functions like so;

```
import { getBaseUrl, getRoot } from 'legal-gateway-apps/src/legal-gateway';
```

## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn serve
```

### Run your tests
```
yarn test
```

### Lints and fixes files
```
yarn lint
```

### Deploy local changes to `dev` environment (without going through CI)
```
NODE_ENV=production yarn build && yarn deploy:dev
```

## Deployment
All apps from now on should be configured as `Authenticatable` app in Django Admin.

The URL of an app should be:

```
https://apps.dev.legalgateway.com.au/app-template/index.html#/
```

Note the `#/` part at the end of the URL. This is required for the app in `iframe`
to be able to receive params passed from Gateway.
