import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { apiClient } from '@/utils/api'
import type { User, LoginCredentials, LoginResponse, CondominiumAccess } from '@/types/auth'

export const useAuthStore = defineStore('auth', () => {
  // State
  const user = ref<User | null>(null)
  const token = ref<string | null>(null)
  const refreshToken = ref<string | null>(null)
  const condominiumAccess = ref<CondominiumAccess[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  // Getters
  const isAuthenticated = computed(() => !!token.value && !!user.value)
  const isSuperAdmin = computed(() => user.value?.role === 'SUPER_ADMIN')
  const isAdmin = computed(() => user.value?.role === 'ADMIN')
  const userRole = computed(() => user.value?.role)

  // Actions
  async function login(credentials: LoginCredentials): Promise<void> {
    try {
      loading.value = true
      error.value = null

      console.log('Attempting login with:', credentials)
      const response: LoginResponse = await apiClient.login(credentials)
      console.log('Login response:', response)
      
      user.value = response.user
      token.value = response.accessToken
      refreshToken.value = response.refreshToken

      // Store in localStorage for persistence
      localStorage.setItem('auth_token', response.accessToken)
      localStorage.setItem('auth_refresh_token', response.refreshToken)
      localStorage.setItem('auth_user', JSON.stringify(response.user))

      // Get user's condominium access
      await getCurrentUser()
    } catch (err: any) {
      error.value = err.response?.data?.message || 'Error al iniciar sesión'
      throw err
    } finally {
      loading.value = false
    }
  }

  async function logout(): Promise<void> {
    try {
      if (token.value) {
        await apiClient.logout()
      }
    } catch (err) {
      console.error('Error during logout:', err)
    } finally {
      // Clear state
      user.value = null
      token.value = null
      refreshToken.value = null
      condominiumAccess.value = []
      error.value = null

      // Clear localStorage
      localStorage.removeItem('auth_token')
      localStorage.removeItem('auth_refresh_token')
      localStorage.removeItem('auth_user')
    }
  }

  async function refreshTokenAction(): Promise<void> {
    try {
      if (!refreshToken.value) {
        throw new Error('No refresh token available')
      }

      const response = await apiClient.refreshToken(refreshToken.value)
      
      token.value = response.accessToken
      localStorage.setItem('auth_token', response.accessToken)
    } catch (err) {
      // Refresh failed, logout user
      await logout()
      throw err
    }
  }

  async function getCurrentUser(): Promise<void> {
    try {
      if (!token.value) return

      const userData = await apiClient.getCurrentUser()
      
      user.value = {
        id: userData.id,
        email: userData.email,
        name: userData.name,
        phone: userData.phone,
        role: userData.role,
        isActive: userData.isActive,
      }

      condominiumAccess.value = userData.condominiumUsers || []
      
      // Update localStorage
      localStorage.setItem('auth_user', JSON.stringify(user.value))
    } catch (err: any) {
      error.value = err.response?.data?.message || 'Error al obtener datos del usuario'
      throw err
    }
  }

  function initializeAuth(): void {
    try {
      // Restore auth state from localStorage
      const storedToken = localStorage.getItem('auth_token')
      const storedRefreshToken = localStorage.getItem('auth_refresh_token')
      const storedUser = localStorage.getItem('auth_user')

      if (storedToken && storedUser) {
        token.value = storedToken
        refreshToken.value = storedRefreshToken
        user.value = JSON.parse(storedUser)
        
        // Refresh user data
        getCurrentUser().catch(() => {
          // If failed, logout
          logout()
        })
      }
    } catch (error) {
      console.error('Error initializing auth:', error)
      // Clear any corrupted data
      logout()
    }
  }

  function hasAccess(condominiumId: string): boolean {
    if (isSuperAdmin.value) return true
    return condominiumAccess.value.some(access => access.condominiumId === condominiumId)
  }

  function hasRole(condominiumId: string, requiredRoles: string[]): boolean {
    if (isSuperAdmin.value) return true
    
    const access = condominiumAccess.value.find(access => access.condominiumId === condominiumId)
    return access ? requiredRoles.includes(access.role) : false
  }

  function canEdit(condominiumId?: string): boolean {
    if (isSuperAdmin.value) return true
    if (!condominiumId) return false
    
    return hasRole(condominiumId, ['ADMIN'])
  }

  function canView(condominiumId?: string): boolean {
    if (isSuperAdmin.value) return true
    if (!condominiumId) return false

    return hasRole(condominiumId, ['ADMIN', 'ANALYST', 'EDITOR'])
  }

  // New permission helpers for role-based access control

  function canCreateReadings(condominiumId?: string): boolean {
    if (isSuperAdmin.value) return true
    if (!condominiumId) return false

    return hasRole(condominiumId, ['ADMIN', 'EDITOR'])
  }

  function canManageUnits(condominiumId?: string): boolean {
    if (isSuperAdmin.value) return true
    if (!condominiumId) return false

    return hasRole(condominiumId, ['ADMIN', 'EDITOR'])
  }

  function canManageResidents(condominiumId?: string): boolean {
    if (isSuperAdmin.value) return true
    if (!condominiumId) return false

    return hasRole(condominiumId, ['ADMIN', 'EDITOR'])
  }

  function canValidateReadings(condominiumId?: string): boolean {
    if (isSuperAdmin.value) return true
    if (!condominiumId) return false

    return hasRole(condominiumId, ['ADMIN'])
  }

  function canManagePeriods(condominiumId?: string): boolean {
    if (isSuperAdmin.value) return true
    if (!condominiumId) return false

    return hasRole(condominiumId, ['ADMIN'])
  }

  function canManageBills(condominiumId?: string): boolean {
    if (isSuperAdmin.value) return true
    if (!condominiumId) return false

    return hasRole(condominiumId, ['ADMIN'])
  }

  function canManageUsers(condominiumId?: string): boolean {
    if (isSuperAdmin.value) return true
    if (!condominiumId) return false

    return hasRole(condominiumId, ['ADMIN'])
  }

  function isReadOnly(condominiumId?: string): boolean {
    if (isSuperAdmin.value) return false
    if (!condominiumId) return true

    return hasRole(condominiumId, ['ANALYST'])
  }

  function clearError(): void {
    error.value = null
  }

  return {
    // State
    user,
    token,
    refreshToken,
    condominiumAccess,
    loading,
    error,

    // Getters
    isAuthenticated,
    isSuperAdmin,
    isAdmin,
    userRole,

    // Actions
    login,
    logout,
    refreshTokenAction,
    getCurrentUser,
    initializeAuth,
    hasAccess,
    hasRole,
    canEdit,
    canView,

    // Permission helpers
    canCreateReadings,
    canManageUnits,
    canManageResidents,
    canValidateReadings,
    canManagePeriods,
    canManageBills,
    canManageUsers,
    isReadOnly,

    clearError,
  }
})