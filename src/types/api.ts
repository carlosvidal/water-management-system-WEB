export interface ApiResponse<T = any> {
  data?: T
  error?: boolean
  message?: string
  statusCode?: number
}

export interface PaginatedResponse<T> {
  data: T[]
  pagination: {
    total: number
    page: number
    limit: number
    pages: number
  }
}

export interface Plan {
  id: string
  name: string
  maxUnits: number
  monthlyPrice: number
  features: string[]
  isActive: boolean
  createdAt: string
}

export interface Condominium {
  id: string
  name: string
  address: string
  readingDay?: number
  bankAccount?: string
  bankAccountHolder?: string
  planId: string
  expiresAt: string
  isActive: boolean
  createdAt: string
  updatedAt: string
  plan?: Plan
}

export interface Block {
  id: string
  name: string
  condominiumId: string
  maxUnits: number
  createdAt: string
}

export interface Unit {
  id: string
  name: string
  blockId: string
  residentId?: string
  isActive: boolean
  createdAt: string
  updatedAt: string
  block?: Block
  resident?: Resident
}

export interface Resident {
  id: string
  name: string
  email?: string
  phone?: string
  condominiumId: string
  createdAt: string
  updatedAt: string
}

export interface Period {
  id: string
  condominiumId: string
  startDate: string
  endDate?: string
  status: PeriodStatus
  totalVolume?: number
  totalAmount?: number
  receiptPhoto1?: string
  receiptPhoto2?: string
  createdAt: string
  updatedAt: string
}

export type PeriodStatus = 'OPEN' | 'PENDING_RECEIPT' | 'CALCULATING' | 'CLOSED'

export interface Reading {
  id: string
  meterId: string
  periodId: string
  userId: string
  value: number
  photo1?: string
  photo2?: string
  ocrValue?: number
  ocrConfidence?: number
  isValidated: boolean
  isAnomalous: boolean
  notes?: string
  createdAt: string
  updatedAt: string
}

export interface Bill {
  id: string
  periodId: string
  unitId: string
  currentReading: number
  previousReading: number
  consumption: number
  individualCost: number
  commonAreaCost: number
  totalCost: number
  extraCharges?: any[]
  status: BillStatus
  paidAt?: string
  createdAt: string
  updatedAt: string
}

export type BillStatus = 'PENDING' | 'SENT' | 'PAID' | 'OVERDUE'