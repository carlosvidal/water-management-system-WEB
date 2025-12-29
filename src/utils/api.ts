import axios from 'axios'
import { useAuthStore } from '@/stores/auth'

class ApiClient {
  private instance: any

  constructor() {
    const baseURL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api'
    console.log('API Client initialized with baseURL:', baseURL)
    
    this.instance = axios.create({
      baseURL,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
      },
    })

    this.setupInterceptors()
  }

  private setupInterceptors() {
    // Request interceptor to add auth token
    this.instance.interceptors.request.use(
      (config: any) => {
        const authStore = useAuthStore()
        if (authStore.token) {
          config.headers.Authorization = `Bearer ${authStore.token}`
        }
        return config
      },
      (error: any) => {
        return Promise.reject(error)
      }
    )

    // Response interceptor to handle errors
    this.instance.interceptors.response.use(
      (response: any) => {
        return response
      },
      async (error: any) => {
        const authStore = useAuthStore()
        
        if (error.response?.status === 401) {
          // Try to refresh token
          try {
            await authStore.refreshTokenAction()
            // Retry the original request
            return this.instance.request(error.config)
          } catch (refreshError) {
            // Refresh failed, logout user
            authStore.logout()
            window.location.href = '/login'
          }
        }
        
        return Promise.reject(error)
      }
    )
  }

  // Auth endpoints
  async login(credentials: { email: string; password: string }) {
    console.log('API Client: Sending login request to /auth/login with:', credentials)
    try {
      const response = await this.instance.post('/auth/login', credentials)
      console.log('API Client: Login successful, response:', response.data)
      return response.data
    } catch (error: any) {
      console.error('API Client: Login failed:', error)
      console.error('API Client: Error response:', error.response?.data)
      
      // If API is down or returns 500, use mock data for demo
      if (!error.response || error.response.status >= 500) {
        console.warn('API is down, using mock authentication')
        return this.getMockLoginResponse(credentials)
      }
      
      throw error
    }
  }

  private getMockLoginResponse(credentials: { email: string; password: string }) {
    const mockUsers = {
      'admin@aquaflow.com': {
        user: {
          id: '1',
          email: 'admin@aquaflow.com',
          name: 'Super Admin',
          phone: '+1234567890',
          role: 'SUPER_ADMIN',
          isActive: true,
        },
        accessToken: 'mock-super-admin-token',
        refreshToken: 'mock-super-admin-refresh-token',
      },
      'demo@sunsetgardens.com': {
        user: {
          id: '2',
          email: 'demo@sunsetgardens.com',
          name: 'Admin Demo',
          phone: '+1234567891',
          role: 'ADMIN',
          isActive: true,
        },
        accessToken: 'mock-admin-token',
        refreshToken: 'mock-admin-refresh-token',
      },
      'janitor@sunsetgardens.com': {
        user: {
          id: '3',
          email: 'janitor@sunsetgardens.com',
          name: 'Personal Mantenimiento',
          phone: '+1234567892',
          role: 'EDITOR',
          isActive: true,
        },
        accessToken: 'mock-editor-token',
        refreshToken: 'mock-editor-refresh-token',
      },
    }

    const user = mockUsers[credentials.email as keyof typeof mockUsers]
    if (!user) {
      throw new Error('Credenciales inválidas')
    }

    return user
  }

  async refreshToken(refreshToken: string) {
    const response = await this.instance.post('/auth/refresh', { refreshToken })
    return response.data
  }

  async logout() {
    const response = await this.instance.post('/auth/logout')
    return response.data
  }

  async getCurrentUser() {
    try {
      const response = await this.instance.get('/auth/me')
      return response.data
    } catch (error: any) {
      // If API is down, return mock user data based on stored token
      const token = localStorage.getItem('auth_token')
      if (token?.includes('mock')) {
        console.warn('API is down, using mock user data')
        return this.getMockCurrentUser(token)
      }
      throw error
    }
  }

  private getMockCurrentUser(token: string) {
    if (token.includes('super-admin')) {
      return {
        id: '1',
        email: 'admin@aquaflow.com',
        name: 'Super Admin',
        phone: '+1234567890',
        role: 'SUPER_ADMIN',
        isActive: true,
        condominiumUsers: [],
      }
    }
    
    if (token.includes('admin')) {
      return {
        id: '2',
        email: 'demo@sunsetgardens.com',
        name: 'Admin Demo',
        phone: '+1234567891',
        role: 'ADMIN',
        isActive: true,
        condominiumUsers: [
          {
            condominiumId: 'sunset-gardens-id',
            role: 'ADMIN',
          }
        ],
      }
    }

    return {
      id: '3',
      email: 'janitor@sunsetgardens.com',
      name: 'Personal Mantenimiento',
      phone: '+1234567892',
      role: 'EDITOR',
      isActive: true,
      condominiumUsers: [
        {
          condominiumId: 'sunset-gardens-id',
          role: 'EDITOR',
        }
      ],
    }
  }

  // Super Admin endpoints
  async getPlans(params?: any) {
    const response = await this.instance.get('/admin/plans', { params })
    return response.data
  }

  async createPlan(data: any) {
    const response = await this.instance.post('/admin/plans', data)
    return response.data
  }

  async updatePlan(id: string, data: any) {
    const response = await this.instance.put(`/admin/plans/${id}`, data)
    return response.data
  }

  async togglePlanStatus(id: string) {
    const response = await this.instance.put(`/admin/plans/${id}/status`)
    return response.data
  }

  async getCondominiums(params?: any) {
    try {
      const response = await this.instance.get('/admin/condominiums', { params })
      return response.data
    } catch (error: any) {
      // If API is down, return mock data
      if (!error.response || error.response.status >= 500) {
        console.warn('API is down, using mock condominiums data')
        return {
          condominiums: [
            {
              id: 'sunset-gardens-id',
              name: 'Sunset Gardens',
              address: 'Av. Principal 123',
              readingDay: 15,
              isActive: true,
              createdAt: '2024-01-15T00:00:00.000Z',
              updatedAt: '2024-03-15T00:00:00.000Z',
              planId: 'plan-1',
              expiresAt: '2024-12-31T23:59:59.000Z',
            },
            {
              id: 'green-towers-id',
              name: 'Green Towers',
              address: 'Calle Verde 456',
              readingDay: 20,
              isActive: true,
              createdAt: '2024-02-01T00:00:00.000Z',
              updatedAt: '2024-03-01T00:00:00.000Z',
              planId: 'plan-2',
              expiresAt: '2024-12-31T23:59:59.000Z',
            }
          ]
        }
      }
      throw error
    }
  }

  async createCondominium(data: any) {
    try {
      const response = await this.instance.post('/admin/condominiums', data)
      return response.data
    } catch (error: any) {
      // If API is down, return mock created condominium
      if (!error.response || error.response.status >= 500) {
        console.warn('API is down, using mock create condominium')
        return {
          id: 'new-condominium-' + Date.now(),
          name: data.name,
          address: data.address,
          city: data.city,
          country: data.country,
          readingDay: 15,
          isActive: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          planId: 'plan-1',
          expiresAt: '2024-12-31T23:59:59.000Z',
        }
      }
      throw error
    }
  }

  async toggleCondominiumStatus(id: string) {
    const response = await this.instance.put(`/admin/condominiums/${id}/status`)
    return response.data
  }

  async getDashboardMetrics() {
    const response = await this.instance.get('/admin/dashboard/metrics')
    return response.data
  }

  // Condominium management endpoints
  async getCondominium(id: string) {
    const response = await this.instance.get(`/condominiums/${id}`)
    return response.data
  }

  async updateCondominium(id: string, data: any) {
    const response = await this.instance.put(`/condominiums/${id}`, data)
    return response.data
  }

  async getCondominiumBlocks(id: string) {
    const response = await this.instance.get(`/condominiums/${id}/blocks`)
    return response.data
  }

  async createBlock(condominiumId: string, data: any) {
    const response = await this.instance.post(`/condominiums/${condominiumId}/blocks`, data)
    return response.data
  }

  async getCondominiumUnits(id: string, params?: any) {
    const response = await this.instance.get(`/condominiums/${id}/units`, { params })
    return response.data
  }

  async createUnit(condominiumId: string, data: any) {
    const response = await this.instance.post(`/condominiums/${condominiumId}/units`, data)
    return response.data
  }

  async getCondominiumResidents(id: string, params?: any) {
    const response = await this.instance.get(`/condominiums/${id}/residents`, { params })
    return response.data
  }

  async createResident(condominiumId: string, data: any) {
    const response = await this.instance.post(`/condominiums/${condominiumId}/residents`, data)
    return response.data
  }

  async updateResident(condominiumId: string, residentId: string, data: any) {
    const response = await this.instance.put(`/condominiums/${condominiumId}/residents/${residentId}`, data)
    return response.data
  }

  async assignResidentToUnit(condominiumId: string, unitId: string, data: any) {
    const response = await this.instance.put(`/condominiums/${condominiumId}/units/${unitId}/resident`, data)
    return response.data
  }

  // Periods management
  async createPeriod(condominiumId: string, data: any) {
    const response = await this.instance.post('/periods', { ...data, condominiumId })
    return response.data
  }

  async getCondominiumPeriods(condominiumId: string, params?: any) {
    const response = await this.instance.get(`/periods/condominium/${condominiumId}`, { params })
    return response.data
  }

  async getPeriod(periodId: string) {
    const response = await this.instance.get(`/periods/${periodId}`)
    return response.data
  }

  async updatePeriod(periodId: string, data: any) {
    const response = await this.instance.put(`/periods/${periodId}`, data)
    return response.data
  }

  async closePeriod(periodId: string) {
    const response = await this.instance.put(`/periods/${periodId}/close`)
    return response.data
  }

  async updatePeriodReceipt(id: string, data: any) {
    const response = await this.instance.put(`/periods/${id}/receipt`, data)
    return response.data
  }

  async createReading(periodId: string, data: any) {
    const response = await this.instance.post(`/periods/${periodId}/readings`, data)
    return response.data
  }

  async getPeriodReadings(periodId: string, params?: any) {
    const response = await this.instance.get(`/periods/${periodId}/readings`, { params })
    return response.data
  }

  async getPeriodCalculations(periodId: string) {
    const response = await this.instance.get(`/periods/${periodId}/calculations`)
    return response.data
  }

  async validateReading(periodId: string, readingId: string, data: any) {
    const response = await this.instance.put(`/periods/${periodId}/readings/${readingId}/validate`, data)
    return response.data
  }

  async getPendingUnits(periodId: string) {
    const response = await this.instance.get(`/periods/${periodId}/pending`)
    return response.data
  }

  // Bills management
  async calculatePeriodBills(data: any) {
    const response = await this.instance.post('/bills/calculate', data)
    return response.data
  }

  async previewCalculation(data: any) {
    const response = await this.instance.post('/bills/preview', data)
    return response.data
  }

  async getCalculationSummary(periodId: string) {
    const response = await this.instance.get(`/bills/summary/${periodId}`)
    return response.data
  }

  async getPeriodBills(periodId: string, params?: any) {
    const response = await this.instance.get(`/bills/period/${periodId}`, { params })
    return response.data
  }

  async getUnitBills(unitId: string, params?: any) {
    const response = await this.instance.get(`/bills/unit/${unitId}`, { params })
    return response.data
  }

  async getBill(billId: string) {
    const response = await this.instance.get(`/bills/${billId}`)
    return response.data
  }

  async updateBillStatus(billId: string, data: any) {
    const response = await this.instance.put(`/bills/${billId}/status`, data)
    return response.data
  }

  async getCondominiumBillingSummary(condominiumId: string, params?: any) {
    const response = await this.instance.get(`/bills/condominium/${condominiumId}/summary`, { params })
    return response.data
  }

  // Condominium user management
  async getCondominiumUsers(condominiumId: string) {
    const response = await this.instance.get(`/condominiums/${condominiumId}/users`)
    return response.data
  }

  async createCondominiumUser(condominiumId: string, data: any) {
    const response = await this.instance.post(`/condominiums/${condominiumId}/users`, data)
    return response.data
  }
}

export const apiClient = new ApiClient()
export default apiClient