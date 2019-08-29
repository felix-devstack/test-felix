import '@babel/polyfill';
import Vue from 'vue';
import 'legal-gateway-apps/src/plugins/vuetify';
import 'legal-gateway-apps/src/stylus/vuetify.overrides.styl';
import { isPostMessageValid } from 'legal-gateway-apps/src/legalGateway';
import App from '@/App.vue';
import router from '@/router';
import store from '@/store';
import '@/styles/main.scss';


Vue.config.productionTip = false;

export function mountApp() {
  new Vue({
    router,
    render: h => h(App)
  }).$mount('#app');
}

export async function handleLegalGatewayPostMessage(event) {
  let baseUrl;

  if (!isPostMessageValid(event)) { return; }

  baseUrl = event.data.baseURL;
  store.updateUserSessionData({ baseUrl });
  mountApp();
}

window.addEventListener('message', handleLegalGatewayPostMessage, false);

// when the app is run standalone i.e. local dev
// just mount it - because we normally don't run it within local legal gateway
if (process.env.NODE_ENV === 'development') {
  mountApp();
}
