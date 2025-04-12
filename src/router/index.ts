import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/Home.vue')
    },
    // Playground 相關路由
    {
      path: '/playground',
      name: 'playground',
      component: () => import('../views/playground/index.vue')
    },
    {
      path: '/playground/history',
      name: 'playground-history',
      component: () => import('../views/playground/history.vue')
    },
    {
      path: '/playground/starred',
      name: 'playground-starred',
      component: () => import('../views/playground/starred.vue')
    },
    {
      path: '/playground/settings',
      name: 'playground-settings',
      component: () => import('../views/playground/settings.vue')
    },
    // Models 相關路由
    {
      path: '/models',
      name: 'models',
      component: () => import('../views/models/index.vue')
    },
    {
      path: '/models/genesis',
      name: 'models-genesis',
      component: () => import('../views/models/genesis.vue')
    },
    {
      path: '/models/explorer',
      name: 'models-explorer',
      component: () => import('../views/models/explorer.vue')
    },
    {
      path: '/models/quantum',
      name: 'models-quantum',
      component: () => import('../views/models/quantum.vue')
    },
    // Documentation 相關路由
    {
      path: '/documentation',
      name: 'documentation',
      component: () => import('../views/documentation/index.vue')
    },
    {
      path: '/documentation/introduction',
      name: 'documentation-introduction',
      component: () => import('../views/documentation/introduction.vue')
    },
    {
      path: '/documentation/get-started',
      name: 'documentation-get-started',
      component: () => import('../views/documentation/get-started.vue')
    },
    {
      path: '/documentation/tutorials',
      name: 'documentation-tutorials',
      component: () => import('../views/documentation/tutorials.vue')
    },
    {
      path: '/documentation/changelog',
      name: 'documentation-changelog',
      component: () => import('../views/documentation/changelog.vue')
    },
    // Settings 相關路由
    {
      path: '/settings',
      name: 'settings',
      component: () => import('../views/settings/index.vue')
    },
    {
      path: '/settings/general',
      name: 'settings-general',
      component: () => import('../views/settings/general.vue')
    },
    {
      path: '/settings/team',
      name: 'settings-team',
      component: () => import('../views/settings/team.vue')
    },
    {
      path: '/settings/billing',
      name: 'settings-billing',
      component: () => import('../views/settings/billing.vue')
    },
    {
      path: '/settings/limits',
      name: 'settings-limits',
      component: () => import('../views/settings/limits.vue')
    }
  ]
})

export default router 