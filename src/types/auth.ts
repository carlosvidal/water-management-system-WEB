export interface User {
  id: string
  email: string
  name: string
  phone?: string
  role: UserRole
  isActive: boolean
}

export interface LoginCredentials {
  email: string
  password: string
}

export interface LoginResponse {
  user: User
  accessToken: string
  refreshToken: string
  expiresIn: string
}

export interface CondominiumAccess {
  condominiumId: string
  role: UserRole
  condominium: {
    id: string
    name: string
    address: string
    isActive: boolean
  }
}

export type UserRole = 'SUPER_ADMIN' | 'ADMIN' | 'ANALYST' | 'EDITOR'