import Vue from 'vue';
import Router from 'vue-router';
import Page1 from './views/Page1.vue';

import store from '@/store';

Vue.use(Router);

export default new Router({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/page1',
      name: 'Page1',
      beforeEnter: (to, from, next) => {
        store.updateStep(1);
        return next();
      },
      component: Page1
    },
    {
      path: '/page2',
      name: 'Page2',
      component: () => import(/* webpackChunkName: "Page2" */ './views/Page2.vue'),
      beforeEnter: (to, from, next) => {
        store.updateStep(2);
        return next();
      }
    },
    { path: '*', redirect: '/page1' }
  ]
});
