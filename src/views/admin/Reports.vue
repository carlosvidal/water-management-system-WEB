<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header -->
    <header class="bg-white shadow-sm border-b border-gray-200">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16">
          <div class="flex items-center space-x-4">
            <router-link
              to="/admin/dashboard"
              class="text-gray-400 hover:text-gray-600"
            >
              <ArrowLeftIcon class="h-5 w-5" />
            </router-link>
            <h1 class="text-xl font-semibold text-gray-900">Reportes y Analytics</h1>
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
      <!-- Filters -->
      <div class="bg-white shadow rounded-lg mb-8">
        <div class="px-4 py-5 sm:p-6">
          <h3 class="text-lg font-medium text-gray-900 mb-4">Filtros</h3>
          <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Condominio</label>
              <select
                v-model="filters.condominiumId"
                @change="loadReportsData"
                class="block w-full border-gray-300 rounded-md shadow-sm focus:ring-water-500 focus:border-water-500 sm:text-sm"
              >
                <option value="">Todos los condominios</option>
                <option v-for="condominium in condominiumStore.list" :key="condominium.id" :value="condominium.id">
                  {{ condominium.name }}
                </option>
              </select>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Período</label>
              <select
                v-model="filters.periodRange"
                @change="loadReportsData"
                class="block w-full border-gray-300 rounded-md shadow-sm focus:ring-water-500 focus:border-water-500 sm:text-sm"
              >
                <option value="last3">Últimos 3 meses</option>
                <option value="last6">Últimos 6 meses</option>
                <option value="last12">Último año</option>
                <option value="custom">Personalizado</option>
              </select>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Fecha Inicio</label>
              <input
                v-model="filters.startDate"
                type="date"
                :disabled="filters.periodRange !== 'custom'"
                @change="loadReportsData"
                class="block w-full border-gray-300 rounded-md shadow-sm focus:ring-water-500 focus:border-water-500 sm:text-sm disabled:bg-gray-50"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Fecha Fin</label>
              <input
                v-model="filters.endDate"
                type="date"
                :disabled="filters.periodRange !== 'custom'"
                @change="loadReportsData"
                class="block w-full border-gray-300 rounded-md shadow-sm focus:ring-water-500 focus:border-water-500 sm:text-sm disabled:bg-gray-50"
              />
            </div>
          </div>
        </div>
      </div>

      <!-- Key Metrics -->
      <div class="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8">
        <div class="bg-white overflow-hidden shadow rounded-lg">
          <div class="p-5">
            <div class="flex items-center">
              <div class="flex-shrink-0">
                <ChartBarIcon class="h-6 w-6 text-blue-400" />
              </div>
              <div class="ml-5 w-0 flex-1">
                <dl>
                  <dt class="text-sm font-medium text-gray-500 truncate">
                    Consumo Total
                  </dt>
                  <dd class="text-lg font-medium text-gray-900">
                    {{ metrics.totalConsumption.toLocaleString() }} L
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div class="bg-white overflow-hidden shadow rounded-lg">
          <div class="p-5">
            <div class="flex items-center">
              <div class="flex-shrink-0">
                <CurrencyDollarIcon class="h-6 w-6 text-green-400" />
              </div>
              <div class="ml-5 w-0 flex-1">
                <dl>
                  <dt class="text-sm font-medium text-gray-500 truncate">
                    Facturación Total
                  </dt>
                  <dd class="text-lg font-medium text-gray-900">
                    ${{ metrics.totalBilling.toLocaleString() }}
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div class="bg-white overflow-hidden shadow rounded-lg">
          <div class="p-5">
            <div class="flex items-center">
              <div class="flex-shrink-0">
                <ChartBarIcon class="h-6 w-6 text-yellow-400" />
              </div>
              <div class="ml-5 w-0 flex-1">
                <dl>
                  <dt class="text-sm font-medium text-gray-500 truncate">
                    Promedio por Unidad
                  </dt>
                  <dd class="text-lg font-medium text-gray-900">
                    {{ metrics.averagePerUnit.toLocaleString() }} L
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div class="bg-white overflow-hidden shadow rounded-lg">
          <div class="p-5">
            <div class="flex items-center">
              <div class="flex-shrink-0">
                <ExclamationTriangleIcon class="h-6 w-6 text-red-400" />
              </div>
              <div class="ml-5 w-0 flex-1">
                <dl>
                  <dt class="text-sm font-medium text-gray-500 truncate">
                    Consumos Anómalos
                  </dt>
                  <dd class="text-lg font-medium text-gray-900">
                    {{ metrics.anomalousConsumptions }}
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Charts and Reports -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <!-- Consumption Trend Chart -->
        <div class="bg-white shadow rounded-lg">
          <div class="px-4 py-5 sm:p-6">
            <h3 class="text-lg font-medium text-gray-900 mb-4">Tendencia de Consumo</h3>
            <div class="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
              <div class="text-center">
                <ChartBarIcon class="mx-auto h-12 w-12 text-gray-400" />
                <h3 class="mt-2 text-sm font-medium text-gray-900">Gráfico de Tendencias</h3>
                <p class="mt-1 text-sm text-gray-500">Visualización del consumo a lo largo del tiempo</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Consumption by Block -->
        <div class="bg-white shadow rounded-lg">
          <div class="px-4 py-5 sm:p-6">
            <h3 class="text-lg font-medium text-gray-900 mb-4">Consumo por Bloque</h3>
            <div class="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
              <div class="text-center">
                <ChartPieIcon class="mx-auto h-12 w-12 text-gray-400" />
                <h3 class="mt-2 text-sm font-medium text-gray-900">Gráfico Circular</h3>
                <p class="mt-1 text-sm text-gray-500">Distribución del consumo por bloques</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Top Consumers Table -->
      <div class="bg-white shadow rounded-lg mb-8">
        <div class="px-4 py-5 sm:p-6">
          <div class="flex items-center justify-between mb-4">
            <h3 class="text-lg font-medium text-gray-900">Mayores Consumidores</h3>
            <button
              @click="exportTopConsumers"
              class="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
            >
              <DocumentArrowDownIcon class="h-4 w-4 mr-2" />
              Exportar
            </button>
          </div>
          
          <div class="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
            <table class="min-w-full divide-y divide-gray-300">
              <thead class="bg-gray-50">
                <tr>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Unidad
                  </th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Residente
                  </th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Consumo Total
                  </th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Promedio Mensual
                  </th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    % del Total
                  </th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Estado
                  </th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-200">
                <tr v-for="consumer in topConsumers" :key="consumer.id">
                  <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {{ consumer.unit }}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {{ consumer.resident }}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {{ consumer.totalConsumption.toLocaleString() }} L
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {{ consumer.monthlyAverage.toLocaleString() }} L
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {{ consumer.percentage }}%
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <span :class="[
                      consumer.isAnomalous ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800',
                      'inline-flex px-2 py-1 text-xs font-semibold rounded-full'
                    ]">
                      {{ consumer.isAnomalous ? 'Anómalo' : 'Normal' }}
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <!-- Billing Summary -->
      <div class="bg-white shadow rounded-lg mb-8">
        <div class="px-4 py-5 sm:p-6">
          <div class="flex items-center justify-between mb-4">
            <h3 class="text-lg font-medium text-gray-900">Resumen de Facturación</h3>
            <div class="flex items-center space-x-2">
              <button
                @click="exportBillingSummary"
                class="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
              >
                <DocumentArrowDownIcon class="h-4 w-4 mr-2" />
                Exportar
              </button>
              <button
                @click="generateDetailedReport"
                class="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-water-600 hover:bg-water-700"
              >
                <DocumentTextIcon class="h-4 w-4 mr-2" />
                Reporte Detallado
              </button>
            </div>
          </div>
          
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div class="text-center">
              <dt class="text-sm font-medium text-gray-500">Total Facturado</dt>
              <dd class="mt-1 text-2xl font-semibold text-gray-900">
                ${{ billingSummary.totalBilled.toLocaleString() }}
              </dd>
            </div>
            <div class="text-center">
              <dt class="text-sm font-medium text-gray-500">Pagos Pendientes</dt>
              <dd class="mt-1 text-2xl font-semibold text-red-600">
                ${{ billingSummary.pendingPayments.toLocaleString() }}
              </dd>
            </div>
            <div class="text-center">
              <dt class="text-sm font-medium text-gray-500">Tasa de Cobro</dt>
              <dd class="mt-1 text-2xl font-semibold text-green-600">
                {{ billingSummary.collectionRate }}%
              </dd>
            </div>
          </div>

          <div class="mt-6">
            <h4 class="text-sm font-medium text-gray-900 mb-3">Distribución de Pagos</h4>
            <div class="space-y-3">
              <div class="flex items-center">
                <div class="w-0 flex-1 bg-gray-200 rounded-full h-2">
                  <div class="bg-green-600 h-2 rounded-full" :style="`width: ${billingSummary.collectionRate}%`"></div>
                </div>
                <div class="ml-4 text-sm text-gray-500">
                  {{ billingSummary.collectionRate }}% pagado
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Recent Alerts -->
      <div class="bg-white shadow rounded-lg">
        <div class="px-4 py-5 sm:p-6">
          <h3 class="text-lg font-medium text-gray-900 mb-4">Alertas Recientes</h3>
          
          <div v-if="alerts.length === 0" class="text-center py-6">
            <BellIcon class="mx-auto h-12 w-12 text-gray-400" />
            <h3 class="mt-2 text-sm font-medium text-gray-900">No hay alertas</h3>
            <p class="mt-1 text-sm text-gray-500">Todas las métricas están dentro de los rangos normales.</p>
          </div>
          
          <div v-else class="space-y-4">
            <div
              v-for="alert in alerts"
              :key="alert.id"
              :class="[
                'border-l-4 p-4',
                alert.type === 'warning' ? 'bg-yellow-50 border-yellow-400' : 'bg-red-50 border-red-400'
              ]"
            >
              <div class="flex">
                <div class="flex-shrink-0">
                  <ExclamationTriangleIcon 
                    :class="[
                      'h-5 w-5',
                      alert.type === 'warning' ? 'text-yellow-400' : 'text-red-400'
                    ]" 
                  />
                </div>
                <div class="ml-3">
                  <h3 :class="[
                    'text-sm font-medium',
                    alert.type === 'warning' ? 'text-yellow-800' : 'text-red-800'
                  ]">
                    {{ alert.title }}
                  </h3>
                  <div :class="[
                    'mt-2 text-sm',
                    alert.type === 'warning' ? 'text-yellow-700' : 'text-red-700'
                  ]">
                    <p>{{ alert.description }}</p>
                  </div>
                  <div class="mt-2 text-xs text-gray-500">
                    {{ formatDate(alert.createdAt) }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { useCondominiumStore } from '@/stores/condominium'
import { apiClient } from '@/utils/api'
import {
  ArrowLeftIcon,
  CurrencyDollarIcon,
  ChartBarIcon,
  ExclamationTriangleIcon,
  ChartPieIcon,
  DocumentArrowDownIcon,
  DocumentTextIcon,
  BellIcon,
} from '@heroicons/vue/24/outline'

const router = useRouter()
const authStore = useAuthStore()
const condominiumStore = useCondominiumStore()

const loading = ref(false)

const filters = reactive({
  condominiumId: '',
  periodRange: 'last3',
  startDate: '',
  endDate: '',
})

const metrics = ref({
  totalConsumption: 524750,
  totalBilling: 156842,
  averagePerUnit: 4356,
  anomalousConsumptions: 3,
})

const billingSummary = ref({
  totalBilled: 156842,
  pendingPayments: 12750,
  collectionRate: 91.8,
})

const topConsumers = ref([
  {
    id: 1,
    unit: 'A-101',
    resident: 'María González',
    totalConsumption: 18500,
    monthlyAverage: 6167,
    percentage: 3.5,
    isAnomalous: false,
  },
  {
    id: 2,
    unit: 'B-205',
    resident: 'Carlos Rodríguez',
    totalConsumption: 16200,
    monthlyAverage: 5400,
    percentage: 3.1,
    isAnomalous: false,
  },
  {
    id: 3,
    unit: 'C-301',
    resident: 'Ana López',
    totalConsumption: 22100,
    monthlyAverage: 7367,
    percentage: 4.2,
    isAnomalous: true,
  },
])

const alerts = ref([
  {
    id: 1,
    type: 'error',
    title: 'Consumo anómalo detectado',
    description: 'La unidad C-301 ha superado el 200% del consumo promedio en los últimos 2 períodos.',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
  },
  {
    id: 2,
    type: 'warning',
    title: 'Pagos pendientes altos',
    description: 'El 8.2% de los pagos del último período están pendientes.',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
  },
])

async function loadReportsData() {
  try {
    loading.value = true
    // Mock data loading - in real app, would call API with filters
    console.log('Loading reports data with filters:', filters)
  } catch (error) {
    console.error('Error loading reports data:', error)
  } finally {
    loading.value = false
  }
}

async function exportTopConsumers() {
  try {
    // Mock export functionality
    console.log('Exporting top consumers...')
    // In real app: await apiClient.exportTopConsumers(filters)
  } catch (error) {
    console.error('Error exporting top consumers:', error)
  }
}

async function exportBillingSummary() {
  try {
    // Mock export functionality
    console.log('Exporting billing summary...')
    // In real app: await apiClient.exportBillingSummary(filters)
  } catch (error) {
    console.error('Error exporting billing summary:', error)
  }
}

async function generateDetailedReport() {
  try {
    // Mock detailed report generation
    console.log('Generating detailed report...')
    // In real app: await apiClient.generateDetailedReport(filters)
  } catch (error) {
    console.error('Error generating detailed report:', error)
  }
}

function formatDate(date: Date): string {
  const now = new Date()
  const diffMs = now.getTime() - date.getTime()
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60))
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))

  if (diffHours < 24) {
    return `hace ${diffHours} horas`
  } else {
    return `hace ${diffDays} días`
  }
}

async function handleLogout() {
  await authStore.logout()
  router.push('/')
}

onMounted(async () => {
  await condominiumStore.fetchCondominiums()
  await loadReportsData()
})
</script>