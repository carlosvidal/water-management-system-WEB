import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    // Landing page
    {
      path: '/',
      name: 'Home',
      component: () => import('@/views/landing/LandingPage.vue'),
    },
    {
      path: '/pricing',
      name: 'Pricing',
      component: () => import('@/views/landing/PricingPage.vue'),
    },
    
    // Authentication
    {
      path: '/login',
      name: 'Login',
      component: () => import('@/views/auth/LoginPage.vue'),
      meta: { requiresGuest: true },
    },
    
    // Resident Portal
    {
      path: '/resident',
      component: () => import('@/views/resident/ResidentLayout.vue'),
      meta: { requiresAuth: true, roles: ['RESIDENT'] },
      children: [
        {
          path: '',
          redirect: '/resident/dashboard',
        },
        {
          path: 'dashboard',
          name: 'ResidentDashboard',
          component: () => import('@/views/resident/ResidentDashboard.vue'),
        },
        {
          path: 'consumption',
          name: 'ResidentConsumption',
          component: () => import('@/views/resident/ResidentDashboard.vue'),
        },
        {
          path: 'billing',
          name: 'ResidentBilling',
          component: () => import('@/views/resident/ResidentDashboard.vue'),
        },
      ],
    },
    
    // Admin Panel
    {
      path: '/admin',
      component: () => import('@/views/admin/AdminLayout.vue'),
      meta: { requiresAuth: true, roles: ['SUPER_ADMIN', 'ADMIN', 'ANALYST', 'EDITOR'] },
      children: [
        {
          path: '',
          redirect: '/admin/dashboard',
        },
        
        // Super Admin Routes
        {
          path: 'dashboard',
          name: 'SuperAdminDashboard',
          component: () => import('@/views/admin/SuperAdminDashboard.vue'),
          meta: { roles: ['SUPER_ADMIN', 'ADMIN'] },
        },
        {
          path: 'condominiums/:id',
          name: 'CondominiumDetail',
          component: () => import('@/views/admin/CondominiumDetail.vue'),
          meta: { roles: ['SUPER_ADMIN', 'ADMIN'] },
        },
        {
          path: 'condominiums/:condominiumId/periods/:periodId',
          name: 'PeriodDetail',
          component: () => import('@/views/admin/PeriodDetail.vue'),
          meta: { roles: ['SUPER_ADMIN', 'ADMIN'] },
        },
        {
          path: 'reports',
          name: 'Reports',
          component: () => import('@/views/admin/Reports.vue'),
          meta: { roles: ['SUPER_ADMIN', 'ADMIN'] },
        },
      ],
    },
    
    // Catch all 404
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: () => import('@/views/NotFound.vue'),
    },
  ],
})

// Navigation guards
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()
  
  // Check if route requires authentication
  if (to.meta.requiresAuth) {
    if (!authStore.isAuthenticated) {
      next('/login')
      return
    }
    
    // Check role permissions
    if (to.meta.roles && Array.isArray(to.meta.roles)) {
      const hasPermission = to.meta.roles.includes(authStore.user?.role)
      if (!hasPermission) {
        next('/admin/dashboard') // Redirect to default dashboard
        return
      }
    }
  }
  
  // Check if route requires guest (not logged in)
  if (to.meta.requiresGuest && authStore.isAuthenticated) {
    next('/admin/dashboard')
    return
  }
  
  next()
})

export default router