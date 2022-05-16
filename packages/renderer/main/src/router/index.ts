import { createRouter, createWebHashHistory } from 'vue-router'
import ROUTE_MAIN from './routes/main/view.vue'
import ROUTE_SETTING from './routes/setting/view.vue'
import ROUTE_LAUNCH from './routes/launch/view.vue'
import ROUTE_GUIDE from './routes/guide/app.vue'

const Router = createRouter({
  history: createWebHashHistory(),
  routes: [{
    path: '/',
    redirect: '/main'
  }, {
    path: '/main',
    name: 'Main',
    component: ROUTE_MAIN,
    meta: {
      keepAlive: false,
    },
  }, {
    path: '/guide',
    name: 'Guide',
    component: ROUTE_GUIDE,
    meta: {
      keepAlive: false,
    }
  }, {
    path: '/launch',
    name: 'Launch',
    component: ROUTE_LAUNCH,
    meta: {
      keepAlive: false,
    }
  }, {
    path: '/setting',
    name: 'Setting',
    component: ROUTE_SETTING,
    meta: {
      keepAlive: false,
    }
  }]
})

export default Router