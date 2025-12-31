import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { apiClient } from '@/utils/api'
import type { Condominium, Block, Unit, Resident, Period } from '@/types/api'

export const useCondominiumStore = defineStore('condominium', () => {
  // State
  const current = ref<Condominium | null>(null)
  const list = ref<Condominium[]>([])
  const blocks = ref<Block[]>([])
  const units = ref<Unit[]>([])
  const residents = ref<Resident[]>([])
  const periods = ref<Period[]>([])
  const users = ref<any[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  // Getters
  const currentCondominium = computed(() => current.value)
  const totalUnits = computed(() => units.value.length)
  const occupiedUnits = computed(() => units.value.filter(unit => unit.residentId).length)
  const availableUnits = computed(() => units.value.filter(unit => !unit.residentId))

  // Actions
  async function fetchCondominiums(params?: any): Promise<void> {
    try {
      loading.value = true
      error.value = null

      const response = await apiClient.getCondominiums(params)
      list.value = response.condominiums || response.data || []
    } catch (err: any) {
      error.value = err.response?.data?.message || 'Error al cargar condominios'
      throw err
    } finally {
      loading.value = false
    }
  }

  async function createCondominium(data: any): Promise<Condominium> {
    try {
      loading.value = true
      error.value = null

      const response = await apiClient.createCondominium(data)
      const newCondominium = response.condominium || response

      list.value.unshift(newCondominium)
      return newCondominium
    } catch (err: any) {
      error.value = err.response?.data?.message || 'Error al crear condominio'
      throw err
    } finally {
      loading.value = false
    }
  }

  async function fetchCondominium(id: string): Promise<void> {
    try {
      loading.value = true
      error.value = null

      const response = await apiClient.getCondominium(id)
      current.value = response
    } catch (err: any) {
      error.value = err.response?.data?.message || 'Error al cargar condominio'
      throw err
    } finally {
      loading.value = false
    }
  }

  async function updateCondominium(id: string, data: any): Promise<void> {
    try {
      loading.value = true
      error.value = null

      const response = await apiClient.updateCondominium(id, data)
      current.value = response

      // Update in list if exists
      const index = list.value.findIndex(c => c.id === id)
      if (index !== -1) {
        list.value[index] = response
      }
    } catch (err: any) {
      error.value = err.response?.data?.message || 'Error al actualizar condominio'
      throw err
    } finally {
      loading.value = false
    }
  }

  async function fetchBlocks(condominiumId: string): Promise<void> {
    try {
      loading.value = true
      error.value = null

      const response = await apiClient.getCondominiumBlocks(condominiumId)
      blocks.value = response
    } catch (err: any) {
      error.value = err.response?.data?.message || 'Error al cargar bloques'
      throw err
    } finally {
      loading.value = false
    }
  }

  async function createBlock(condominiumId: string, data: any): Promise<Block> {
    try {
      loading.value = true
      error.value = null

      const response = await apiClient.createBlock(condominiumId, data)
      const newBlock = response

      blocks.value.push(newBlock)
      return newBlock
    } catch (err: any) {
      error.value = err.response?.data?.message || 'Error al crear bloque'
      throw err
    } finally {
      loading.value = false
    }
  }

  async function fetchUnits(condominiumId: string, params?: any): Promise<void> {
    try {
      loading.value = true
      error.value = null

      const response = await apiClient.getCondominiumUnits(condominiumId, params)
      units.value = response.units || response.data || []
    } catch (err: any) {
      error.value = err.response?.data?.message || 'Error al cargar unidades'
      throw err
    } finally {
      loading.value = false
    }
  }

  async function createUnit(condominiumId: string, data: any): Promise<Unit> {
    try {
      loading.value = true
      error.value = null

      const response = await apiClient.createUnit(condominiumId, data)
      const newUnit = response.unit || response

      units.value.push(newUnit)
      return newUnit
    } catch (err: any) {
      error.value = err.response?.data?.message || 'Error al crear unidad'
      throw err
    } finally {
      loading.value = false
    }
  }

  async function fetchResidents(condominiumId: string, params?: any): Promise<void> {
    try {
      loading.value = true
      error.value = null

      const response = await apiClient.getCondominiumResidents(condominiumId, params)
      residents.value = response.residents || response.data || []
    } catch (err: any) {
      error.value = err.response?.data?.message || 'Error al cargar residentes'
      throw err
    } finally {
      loading.value = false
    }
  }

  async function createResident(condominiumId: string, data: any): Promise<Resident> {
    try {
      loading.value = true
      error.value = null

      const response = await apiClient.createResident(condominiumId, data)
      const newResident = response

      residents.value.push(newResident)
      return newResident
    } catch (err: any) {
      error.value = err.response?.data?.message || 'Error al crear residente'
      throw err
    } finally {
      loading.value = false
    }
  }

  async function updateResident(condominiumId: string, residentId: string, data: any): Promise<void> {
    try {
      loading.value = true
      error.value = null

      const response = await apiClient.updateResident(condominiumId, residentId, data)
      
      // Update in residents array
      const index = residents.value.findIndex(r => r.id === residentId)
      if (index !== -1) {
        residents.value[index] = response
      }
    } catch (err: any) {
      error.value = err.response?.data?.message || 'Error al actualizar residente'
      throw err
    } finally {
      loading.value = false
    }
  }

  async function assignResidentToUnit(condominiumId: string, unitId: string, residentId: string): Promise<void> {
    try {
      loading.value = true
      error.value = null

      const response = await apiClient.assignResidentToUnit(condominiumId, unitId, { residentId })
      
      // Update unit in units array
      const index = units.value.findIndex(u => u.id === unitId)
      if (index !== -1) {
        units.value[index] = response
      }
    } catch (err: any) {
      error.value = err.response?.data?.message || 'Error al asignar residente'
      throw err
    } finally {
      loading.value = false
    }
  }

  async function fetchPeriods(condominiumId: string, params?: any): Promise<void> {
    try {
      loading.value = true
      error.value = null

      const response = await apiClient.getCondominiumPeriods(condominiumId, params)
      periods.value = response.periods || response.data || []
    } catch (err: any) {
      error.value = err.response?.data?.message || 'Error al cargar períodos'
      throw err
    } finally {
      loading.value = false
    }
  }

  async function createPeriod(condominiumId: string, data: any): Promise<Period> {
    try {
      loading.value = true
      error.value = null

      const response = await apiClient.createPeriod(condominiumId, data)
      const newPeriod = response.period || response

      periods.value.push(newPeriod)
      return newPeriod
    } catch (err: any) {
      error.value = err.response?.data?.message || 'Error al crear período'
      throw err
    } finally {
      loading.value = false
    }
  }

  async function fetchUsers(condominiumId: string): Promise<void> {
    try {
      loading.value = true
      error.value = null

      const response = await apiClient.getCondominiumUsers(condominiumId)
      users.value = response || []
    } catch (err: any) {
      error.value = err.response?.data?.message || 'Error al cargar usuarios'
      throw err
    } finally {
      loading.value = false
    }
  }

  async function createUser(condominiumId: string, data: any): Promise<any> {
    try {
      loading.value = true
      error.value = null

      const response = await apiClient.createCondominiumUser(condominiumId, data)

      // Refresh users list after creating
      await fetchUsers(condominiumId)

      return response
    } catch (err: any) {
      error.value = err.response?.data?.message || 'Error al crear usuario'
      throw err
    } finally {
      loading.value = false
    }
  }

  async function updateUser(condominiumId: string, userId: string, data: any): Promise<any> {
    try {
      loading.value = true
      error.value = null

      const response = await apiClient.updateCondominiumUser(condominiumId, userId, data)

      // Refresh users list after updating
      await fetchUsers(condominiumId)

      return response
    } catch (err: any) {
      error.value = err.response?.data?.message || 'Error al actualizar usuario'
      throw err
    } finally {
      loading.value = false
    }
  }

  async function deleteUser(condominiumId: string, userId: string): Promise<void> {
    try {
      loading.value = true
      error.value = null

      await apiClient.deleteCondominiumUser(condominiumId, userId)

      // Remove from local state
      users.value = users.value.filter(u => u.userId !== userId)
    } catch (err: any) {
      error.value = err.response?.data?.message || 'Error al eliminar usuario'
      throw err
    } finally {
      loading.value = false
    }
  }

  function clearError(): void {
    error.value = null
  }

  function reset(): void {
    current.value = null
    list.value = []
    blocks.value = []
    units.value = []
    residents.value = []
    periods.value = []
    users.value = []
    error.value = null
  }

  return {
    // State
    current,
    list,
    blocks,
    units,
    residents,
    periods,
    users,
    loading,
    error,

    // Getters
    currentCondominium,
    totalUnits,
    occupiedUnits,
    availableUnits,

    // Actions
    fetchCondominiums,
    createCondominium,
    fetchCondominium,
    updateCondominium,
    fetchBlocks,
    createBlock,
    fetchUnits,
    createUnit,
    fetchResidents,
    createResident,
    updateResident,
    assignResidentToUnit,
    fetchPeriods,
    createPeriod,
    fetchUsers,
    createUser,
    updateUser,
    deleteUser,
    clearError,
    reset,
  }
})