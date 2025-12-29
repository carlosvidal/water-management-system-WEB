<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header -->
    <header class="bg-white shadow-sm border-b border-gray-200">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16">
          <div class="flex items-center space-x-4">
            <router-link
              :to="`/admin/condominiums/${condominiumId}`"
              class="text-gray-400 hover:text-gray-600"
            >
              <ArrowLeftIcon class="h-5 w-5" />
            </router-link>
            <h1 class="text-xl font-semibold text-gray-900">
              {{ period?.name || 'Cargando período...' }}
            </h1>
          </div>
          <div class="flex items-center space-x-4">
            <button
              @click="handleLogout"
              class="text-sm text-gray-500 hover:text-gray-700"
            >
              Cerrar Sesión
            </button>
          </div>
        </div>
      </div>
    </header>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div v-if="loading" class="text-center py-12">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-water-600 mx-auto"></div>
        <p class="mt-2 text-sm text-gray-500">Cargando información del período...</p>
      </div>

      <div v-else-if="!period" class="text-center py-12">
        <CalendarIcon class="mx-auto h-12 w-12 text-gray-400" />
        <h3 class="mt-2 text-sm font-medium text-gray-900">Período no encontrado</h3>
      </div>

      <div v-else>
        <!-- Period Info -->
        <div class="bg-white shadow rounded-lg mb-8">
          <div class="px-4 py-5 sm:p-6">
            <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div>
                <h3 class="text-lg font-medium text-gray-900 mb-2">Información del Período</h3>
                <dl class="space-y-2">
                  <div>
                    <dt class="text-sm font-medium text-gray-500">Fechas</dt>
                    <dd class="text-sm text-gray-900">
                      {{ formatDate(period.startDate) }} - {{ formatDate(period.endDate) }}
                    </dd>
                  </div>
                  <div>
                    <dt class="text-sm font-medium text-gray-500">Estado</dt>
                    <dd class="text-sm text-gray-900 flex items-center">
                      <div class="w-2 h-2 rounded-full mr-2" :class="getStatusColor(period.status)"></div>
                      {{ period.status }}
                    </dd>
                  </div>
                </dl>
              </div>
              
              <div>
                <h3 class="text-lg font-medium text-gray-900 mb-2">Lecturas</h3>
                <dl class="space-y-2">
                  <div>
                    <dt class="text-sm font-medium text-gray-500">Total</dt>
                    <dd class="text-sm text-gray-900">{{ readings.length }}</dd>
                  </div>
                  <div>
                    <dt class="text-sm font-medium text-gray-500">Registradas</dt>
                    <dd class="text-sm text-gray-900">{{ registeredReadings }}</dd>
                  </div>
                  <div>
                    <dt class="text-sm font-medium text-gray-500">Pendientes</dt>
                    <dd class="text-sm text-gray-900">{{ pendingReadings }}</dd>
                  </div>
                </dl>
              </div>
              
              <div>
                <h3 class="text-lg font-medium text-gray-900 mb-2">Consumo</h3>
                <dl class="space-y-2">
                  <div>
                    <dt class="text-sm font-medium text-gray-500">Total</dt>
                    <dd class="text-sm text-gray-900">{{ totalConsumption.toLocaleString() }} L</dd>
                  </div>
                  <div>
                    <dt class="text-sm font-medium text-gray-500">Promedio</dt>
                    <dd class="text-sm text-gray-900">{{ averageConsumption.toLocaleString() }} L</dd>
                  </div>
                  <div>
                    <dt class="text-sm font-medium text-gray-500">Áreas Comunes</dt>
                    <dd class="text-sm text-gray-900">{{ commonAreaConsumption.toLocaleString() }} L</dd>
                  </div>
                </dl>
              </div>
              
              <div>
                <h3 class="text-lg font-medium text-gray-900 mb-2">Acciones</h3>
                <div class="space-y-2">
                  <button
                    v-if="authStore.canManagePeriods(condominiumId.value) && period.status !== 'CLOSED'"
                    @click="openEditPeriodModal"
                    class="w-full inline-flex items-center justify-center px-3 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                  >
                    <PencilIcon class="h-4 w-4 mr-2" />
                    Editar Período
                  </button>
                  <button
                    v-if="authStore.canCreateReadings(condominiumId.value)"
                    @click="showCreateReadingModal = true"
                    class="w-full inline-flex items-center justify-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-water-600 hover:bg-water-700"
                  >
                    <PlusIcon class="h-4 w-4 mr-2" />
                    Nueva Lectura
                  </button>
                  <button
                    v-if="authStore.canManageBills(condominiumId.value)"
                    @click="calculateBilling"
                    :disabled="period.status === 'CLOSED'"
                    class="w-full inline-flex items-center justify-center px-3 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
                  >
                    <CalculatorIcon class="h-4 w-4 mr-2" />
                    Calcular Facturación
                  </button>
                  <button
                    v-if="authStore.canManagePeriods(condominiumId.value) && period.status === 'ACTIVE'"
                    @click="showClosePeriodConfirm = true"
                    class="w-full inline-flex items-center justify-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700"
                  >
                    <LockClosedIcon class="h-4 w-4 mr-2" />
                    Cerrar Período
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Readings Table -->
        <div class="bg-white shadow rounded-lg">
          <div class="px-4 py-5 sm:p-6">
            <div class="flex items-center justify-between mb-4">
              <h3 class="text-lg font-medium text-gray-900">Lecturas del Período</h3>
              <div class="flex items-center space-x-2">
                <input
                  v-model="searchTerm"
                  type="text"
                  placeholder="Buscar unidad..."
                  class="border-gray-300 rounded-md shadow-sm focus:ring-water-500 focus:border-water-500 sm:text-sm"
                />
                <select
                  v-model="statusFilter"
                  class="border-gray-300 rounded-md shadow-sm focus:ring-water-500 focus:border-water-500 sm:text-sm"
                >
                  <option value="">Todos los estados</option>
                  <option value="REGISTERED">Registradas</option>
                  <option value="PENDING">Pendientes</option>
                </select>
              </div>
            </div>

            <div v-if="filteredReadings.length === 0" class="text-center py-8">
              <DocumentTextIcon class="mx-auto h-12 w-12 text-gray-400" />
              <h3 class="mt-2 text-sm font-medium text-gray-900">No hay lecturas</h3>
              <p class="mt-1 text-sm text-gray-500">
                {{ readings.length === 0 ? 'Comienza registrando la primera lectura.' : 'No se encontraron lecturas con los filtros aplicados.' }}
              </p>
            </div>

            <div v-else class="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
              <table class="min-w-full divide-y divide-gray-300">
                <thead class="bg-gray-50">
                  <tr>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Unidad
                    </th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Lectura Anterior
                    </th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Lectura Actual
                    </th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Consumo
                    </th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Estado
                    </th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Registrado Por
                    </th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Fecha
                    </th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Acciones
                    </th>
                  </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200">
                  <tr v-for="reading in filteredReadings" :key="reading.id">
                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {{ reading.unit?.block?.name }}-{{ reading.unit?.name }}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {{ reading.previousReading?.toLocaleString() || '-' }}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {{ reading.currentReading?.toLocaleString() || '-' }}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {{ reading.consumption?.toLocaleString() || '-' }} L
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <span :class="[
                        reading.status === 'REGISTERED' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800',
                        'inline-flex px-2 py-1 text-xs font-semibold rounded-full'
                      ]">
                        {{ reading.status }}
                      </span>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {{ reading.registeredBy?.name || '-' }}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {{ reading.registeredAt ? formatDate(reading.registeredAt) : '-' }}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button
                        v-if="reading.status === 'PENDING'"
                        @click="editReadingHandler(reading)"
                        class="text-water-600 hover:text-water-900"
                      >
                        Registrar
                      </button>
                      <button
                        v-else
                        @click="editReadingHandler(reading)"
                        class="text-water-600 hover:text-water-900"
                      >
                        Editar
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Create Reading Modal -->
    <div
      v-if="showCreateReadingModal"
      class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50"
    >
      <div class="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
        <div class="mt-3">
          <h3 class="text-lg font-medium text-gray-900 mb-4">Registrar Nueva Lectura</h3>
          <form @submit.prevent="createReading">
            <div class="space-y-4">
              <div>
                <label class="block text-sm font-medium text-gray-700">Unidad</label>
                <select
                  v-model="newReading.unitId"
                  required
                  class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-water-500 focus:border-water-500 sm:text-sm"
                >
                  <option value="">Seleccionar unidad</option>
                  <option v-for="unit in availableUnits" :key="unit.id" :value="unit.id">
                    {{ unit.block?.name }}-{{ unit.name }}
                  </option>
                </select>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700">Lectura Actual</label>
                <input
                  v-model.number="newReading.currentReading"
                  type="number"
                  step="0.01"
                  required
                  class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-water-500 focus:border-water-500 sm:text-sm"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700">Notas</label>
                <textarea
                  v-model="newReading.notes"
                  rows="3"
                  class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-water-500 focus:border-water-500 sm:text-sm"
                ></textarea>
              </div>
            </div>
            <div class="flex justify-end space-x-3 mt-6">
              <button
                type="button"
                @click="showCreateReadingModal = false"
                class="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md"
              >
                Cancelar
              </button>
              <button
                type="submit"
                :disabled="loading"
                class="px-4 py-2 text-sm font-medium text-white bg-water-600 hover:bg-water-700 rounded-md disabled:opacity-50"
              >
                {{ loading ? 'Registrando...' : 'Registrar' }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>

    <!-- Edit Reading Modal -->
    <div
      v-if="showEditReadingModal"
      class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50"
    >
      <div class="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
        <div class="mt-3">
          <h3 class="text-lg font-medium text-gray-900 mb-4">Editar Lectura</h3>
          <form @submit.prevent="updateReading">
            <div class="space-y-4">
              <div>
                <label class="block text-sm font-medium text-gray-700">Unidad</label>
                <input
                  :value="`${editingReading?.unit?.block?.name}-${editingReading?.unit?.name}`"
                  disabled
                  class="mt-1 block w-full border-gray-300 rounded-md shadow-sm bg-gray-50 sm:text-sm"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700">Lectura Anterior</label>
                <input
                  :value="editingReading?.previousReading"
                  disabled
                  class="mt-1 block w-full border-gray-300 rounded-md shadow-sm bg-gray-50 sm:text-sm"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700">Lectura Actual</label>
                <input
                  v-model.number="editReading.currentReading"
                  type="number"
                  step="0.01"
                  required
                  class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-water-500 focus:border-water-500 sm:text-sm"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700">Notas</label>
                <textarea
                  v-model="editReading.notes"
                  rows="3"
                  class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-water-500 focus:border-water-500 sm:text-sm"
                ></textarea>
              </div>
            </div>
            <div class="flex justify-end space-x-3 mt-6">
              <button
                type="button"
                @click="showEditReadingModal = false"
                class="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md"
              >
                Cancelar
              </button>
              <button
                type="submit"
                :disabled="loading"
                class="px-4 py-2 text-sm font-medium text-white bg-water-600 hover:bg-water-700 rounded-md disabled:opacity-50"
              >
                {{ loading ? 'Actualizando...' : 'Actualizar' }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>

    <!-- Edit Period Modal -->
    <div
      v-if="showEditPeriodModal"
      class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50"
    >
      <div class="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
        <div class="mt-3">
          <h3 class="text-lg font-medium text-gray-900 mb-4">Editar Período</h3>
          <form @submit.prevent="updatePeriod">
            <div class="space-y-4">
              <div>
                <label class="block text-sm font-medium text-gray-700">Nombre</label>
                <input
                  v-model="editPeriod.name"
                  type="text"
                  required
                  class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-water-500 focus:border-water-500 sm:text-sm"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700">Fecha de Inicio</label>
                <input
                  v-model="editPeriod.startDate"
                  type="date"
                  required
                  class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-water-500 focus:border-water-500 sm:text-sm"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700">Fecha de Fin</label>
                <input
                  v-model="editPeriod.endDate"
                  type="date"
                  required
                  class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-water-500 focus:border-water-500 sm:text-sm"
                />
              </div>
            </div>
            <div class="flex justify-end space-x-3 mt-6">
              <button
                type="button"
                @click="showEditPeriodModal = false"
                class="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md"
              >
                Cancelar
              </button>
              <button
                type="submit"
                :disabled="loading"
                class="px-4 py-2 text-sm font-medium text-white bg-water-600 hover:bg-water-700 rounded-md disabled:opacity-50"
              >
                {{ loading ? 'Guardando...' : 'Guardar' }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>

    <!-- Close Period Confirmation Modal -->
    <div
      v-if="showClosePeriodConfirm"
      class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50"
    >
      <div class="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
        <div class="mt-3">
          <div class="flex items-center justify-center w-12 h-12 mx-auto bg-red-100 rounded-full">
            <ExclamationTriangleIcon class="h-6 w-6 text-red-600" />
          </div>
          <h3 class="text-lg font-medium text-gray-900 text-center mt-4 mb-2">Cerrar Período</h3>
          <p class="text-sm text-gray-500 text-center mb-4">
            ¿Estás seguro de que deseas cerrar este período? Esta acción es irreversible y no podrás agregar o modificar lecturas después.
          </p>
          <div class="flex justify-end space-x-3 mt-6">
            <button
              type="button"
              @click="showClosePeriodConfirm = false"
              class="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md"
            >
              Cancelar
            </button>
            <button
              @click="closePeriod"
              :disabled="loading"
              class="px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-md disabled:opacity-50"
            >
              {{ loading ? 'Cerrando...' : 'Cerrar Período' }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { useCondominiumStore } from '@/stores/condominium'
import { apiClient } from '@/utils/api'
import {
  ArrowLeftIcon,
  CalendarIcon,
  PlusIcon,
  CalculatorIcon,
  DocumentTextIcon,
  PencilIcon,
  LockClosedIcon,
  ExclamationTriangleIcon,
} from '@heroicons/vue/24/outline'

const route = useRoute()
const router = useRouter()
const authStore = useAuthStore()
const condominiumStore = useCondominiumStore()

const condominiumId = computed(() => route.params.condominiumId as string)
const periodId = computed(() => route.params.periodId as string)

const loading = ref(false)
const period = ref<any>(null)
const readings = ref<any[]>([])
const availableUnits = ref<any[]>([])

const showCreateReadingModal = ref(false)
const showEditReadingModal = ref(false)
const showEditPeriodModal = ref(false)
const showClosePeriodConfirm = ref(false)
const editingReading = ref<any>(null)

const searchTerm = ref('')
const statusFilter = ref('')

const newReading = reactive({
  unitId: '',
  currentReading: null,
  notes: '',
})

const editReading = reactive({
  currentReading: null,
  notes: '',
})

const editPeriod = reactive({
  name: '',
  startDate: '',
  endDate: '',
})

const registeredReadings = computed(() => readings.value.filter(r => r.status === 'REGISTERED').length)
const pendingReadings = computed(() => readings.value.filter(r => r.status === 'PENDING').length)

const totalConsumption = computed(() => {
  return readings.value
    .filter(r => r.consumption)
    .reduce((total, r) => total + r.consumption, 0)
})

const averageConsumption = computed(() => {
  const consumptionReadings = readings.value.filter(r => r.consumption)
  return consumptionReadings.length > 0 ? totalConsumption.value / consumptionReadings.length : 0
})

const commonAreaConsumption = computed(() => {
  return 5000 // Mock data
})

const filteredReadings = computed(() => {
  let filtered = readings.value

  if (searchTerm.value) {
    const term = searchTerm.value.toLowerCase()
    filtered = filtered.filter(r =>
      r.unit?.name?.toLowerCase().includes(term) ||
      r.unit?.block?.name?.toLowerCase().includes(term)
    )
  }

  if (statusFilter.value) {
    filtered = filtered.filter(r => r.status === statusFilter.value)
  }

  return filtered
})

async function loadPeriodData() {
  try {
    loading.value = true
    
    // Load period details
    const periodResponse = await apiClient.getPeriod(periodId.value)
    period.value = periodResponse
    
    // Load readings for this period
    const readingsResponse = await apiClient.getPeriodReadings(periodId.value)
    const rawReadings = readingsResponse.readings || readingsResponse || []

    // Transform readings to match expected structure
    readings.value = rawReadings.map((r: any) => ({
      id: r.id,
      unit: r.meter?.unit || null,
      currentReading: r.value,
      previousReading: r.previousValue || null,
      consumption: r.consumption || 0,
      status: r.value ? 'REGISTERED' : 'PENDING',
      registeredBy: r.createdBy || null,
      registeredAt: r.createdAt,
      meter: r.meter,
      value: r.value,
      notes: r.notes,
      isValidated: r.isValidated,
      isAnomalous: r.isAnomalous,
    }))
    
    // Load available units
    await condominiumStore.fetchUnits(condominiumId.value)
    availableUnits.value = condominiumStore.units
  } catch (error) {
    console.error('Error loading period data:', error)
  } finally {
    loading.value = false
  }
}

async function createReading() {
  try {
    loading.value = true
    
    const response = await apiClient.createReading(periodId.value, newReading)
    readings.value.push(response)
    
    Object.assign(newReading, {
      unitId: '',
      currentReading: null,
      notes: '',
    })
    
    showCreateReadingModal.value = false
  } catch (error) {
    console.error('Error creating reading:', error)
  } finally {
    loading.value = false
  }
}

function editReadingHandler(reading: any) {
  editingReading.value = reading
  Object.assign(editReading, {
    currentReading: reading.currentReading,
    notes: reading.notes,
  })
  showEditReadingModal.value = true
}

async function updateReading() {
  try {
    loading.value = true
    
    // Mock update for now
    const response = editingReading.value
    
    const index = readings.value.findIndex(r => r.id === editingReading.value.id)
    if (index !== -1) {
      readings.value[index] = response
    }
    
    showEditReadingModal.value = false
    editingReading.value = null
  } catch (error) {
    console.error('Error updating reading:', error)
  } finally {
    loading.value = false
  }
}

async function calculateBilling() {
  try {
    loading.value = true
    // Mock calculation for now
    console.log('Calculating billing for period:', periodId.value)
    // Reload period data to get updated information
    await loadPeriodData()
  } catch (error) {
    console.error('Error calculating billing:', error)
  } finally {
    loading.value = false
  }
}

function formatDate(date: string): string {
  return new Date(date).toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}

function getStatusColor(status: string): string {
  switch (status) {
    case 'ACTIVE':
      return 'bg-green-400'
    case 'CLOSED':
      return 'bg-gray-400'
    case 'PROCESSING':
      return 'bg-yellow-400'
    default:
      return 'bg-gray-400'
  }
}

async function updatePeriod() {
  try {
    loading.value = true

    await apiClient.updatePeriod(periodId.value, editPeriod)

    // Reload period data
    await loadPeriodData()

    showEditPeriodModal.value = false
  } catch (error) {
    console.error('Error updating period:', error)
    alert('Error al actualizar el período')
  } finally {
    loading.value = false
  }
}

async function closePeriod() {
  try {
    loading.value = true

    await apiClient.closePeriod(periodId.value)

    // Reload period data
    await loadPeriodData()

    showClosePeriodConfirm.value = false
    alert('Período cerrado exitosamente')
  } catch (error) {
    console.error('Error closing period:', error)
    alert('Error al cerrar el período')
  } finally {
    loading.value = false
  }
}

function openEditPeriodModal() {
  if (period.value) {
    Object.assign(editPeriod, {
      name: period.value.name,
      startDate: period.value.startDate.split('T')[0],
      endDate: period.value.endDate.split('T')[0],
    })
    showEditPeriodModal.value = true
  }
}

async function handleLogout() {
  await authStore.logout()
  router.push('/')
}

onMounted(() => {
  loadPeriodData()
})
</script>