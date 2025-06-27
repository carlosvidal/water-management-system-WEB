<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header -->
    <header class="bg-white shadow-sm border-b border-gray-200">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16">
          <div class="flex items-center">
            <h1 class="text-xl font-semibold text-gray-900">Mi Dashboard</h1>
          </div>
          <div class="flex items-center space-x-4">
            <div class="text-sm text-gray-500">
              {{ authStore.user?.name }}
            </div>
            <button
              @click="authStore.logout"
              class="text-sm text-gray-500 hover:text-gray-700"
            >
              Cerrar Sesión
            </button>
          </div>
        </div>
      </div>
    </header>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Quick Stats -->
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
                    Consumo Actual
                  </dt>
                  <dd class="text-lg font-medium text-gray-900">
                    {{ stats.currentConsumption.toLocaleString() }} L
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
                    Factura Actual
                  </dt>
                  <dd class="text-lg font-medium text-gray-900">
                    ${{ stats.currentBill.toLocaleString() }}
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
                    Promedio Mensual
                  </dt>
                  <dd class="text-lg font-medium text-gray-900">
                    {{ stats.monthlyAverage.toLocaleString() }} L
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
                <CalendarIcon class="h-6 w-6 text-purple-400" />
              </div>
              <div class="ml-5 w-0 flex-1">
                <dl>
                  <dt class="text-sm font-medium text-gray-500 truncate">
                    Próximo Corte
                  </dt>
                  <dd class="text-lg font-medium text-gray-900">
                    {{ stats.nextReadingDate }}
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Main Content Grid -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Consumption Chart -->
        <div class="lg:col-span-2">
          <div class="bg-white shadow rounded-lg">
            <div class="px-4 py-5 sm:p-6">
              <h3 class="text-lg leading-6 font-medium text-gray-900 mb-4">
                Histórico de Consumo
              </h3>
              <div class="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
                <div class="text-center">
                  <ChartBarIcon class="mx-auto h-12 w-12 text-gray-400" />
                  <h3 class="mt-2 text-sm font-medium text-gray-900">Gráfico de Consumo</h3>
                  <p class="mt-1 text-sm text-gray-500">Visualización de tu consumo mensual</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Recent Activity & Quick Actions -->
        <div class="space-y-6">
          <!-- Unit Information -->
          <div class="bg-white shadow rounded-lg">
            <div class="px-4 py-5 sm:p-6">
              <h3 class="text-lg leading-6 font-medium text-gray-900 mb-4">
                Mi Unidad
              </h3>
              <dl class="space-y-3">
                <div>
                  <dt class="text-sm font-medium text-gray-500">Número</dt>
                  <dd class="text-sm text-gray-900">{{ unitInfo.number }}</dd>
                </div>
                <div>
                  <dt class="text-sm font-medium text-gray-500">Bloque</dt>
                  <dd class="text-sm text-gray-900">{{ unitInfo.block }}</dd>
                </div>
                <div>
                  <dt class="text-sm font-medium text-gray-500">Área</dt>
                  <dd class="text-sm text-gray-900">{{ unitInfo.area }} m²</dd>
                </div>
                <div>
                  <dt class="text-sm font-medium text-gray-500">Condominio</dt>
                  <dd class="text-sm text-gray-900">{{ unitInfo.condominium }}</dd>
                </div>
              </dl>
            </div>
          </div>

          <!-- Recent Readings -->
          <div class="bg-white shadow rounded-lg">
            <div class="px-4 py-5 sm:p-6">
              <h3 class="text-lg leading-6 font-medium text-gray-900 mb-4">
                Últimas Lecturas
              </h3>
              <div class="space-y-3">
                <div
                  v-for="reading in recentReadings"
                  :key="reading.id"
                  class="flex items-center justify-between py-2 border-b border-gray-100 last:border-b-0"
                >
                  <div>
                    <p class="text-sm text-gray-900">{{ reading.period }}</p>
                    <p class="text-xs text-gray-500">{{ formatDate(reading.date) }}</p>
                  </div>
                  <div class="text-right">
                    <p class="text-sm font-medium text-gray-900">{{ reading.consumption.toLocaleString() }} L</p>
                    <p class="text-xs text-gray-500">${{ reading.amount.toLocaleString() }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Alerts -->
          <div class="bg-white shadow rounded-lg">
            <div class="px-4 py-5 sm:p-6">
              <h3 class="text-lg leading-6 font-medium text-gray-900 mb-4">
                Notificaciones
              </h3>
              
              <div v-if="alerts.length === 0" class="text-center py-4">
                <BellIcon class="mx-auto h-8 w-8 text-gray-400" />
                <p class="mt-2 text-sm text-gray-500">No hay notificaciones</p>
              </div>
              
              <div v-else class="space-y-3">
                <div
                  v-for="alert in alerts"
                  :key="alert.id"
                  :class="[
                    'p-3 rounded-lg border-l-4',
                    alert.type === 'info' ? 'bg-blue-50 border-blue-400' :
                    alert.type === 'warning' ? 'bg-yellow-50 border-yellow-400' : 'bg-red-50 border-red-400'
                  ]"
                >
                  <div class="flex">
                    <div class="ml-3">
                      <h3 :class="[
                        'text-sm font-medium',
                        alert.type === 'info' ? 'text-blue-800' :
                        alert.type === 'warning' ? 'text-yellow-800' : 'text-red-800'
                      ]">
                        {{ alert.title }}
                      </h3>
                      <div :class="[
                        'mt-1 text-sm',
                        alert.type === 'info' ? 'text-blue-700' :
                        alert.type === 'warning' ? 'text-yellow-700' : 'text-red-700'
                      ]">
                        <p>{{ alert.message }}</p>
                      </div>
                    </div>
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
import { ref, onMounted } from 'vue'
import { useAuthStore } from '@/stores/auth'
import {
  CurrencyDollarIcon,
  ChartBarIcon,
  CalendarIcon,
  BellIcon,
} from '@heroicons/vue/24/outline'

const authStore = useAuthStore()

const stats = ref({
  currentConsumption: 4250,
  currentBill: 127.50,
  monthlyAverage: 3890,
  nextReadingDate: '15 Abr',
})

const unitInfo = ref({
  number: 'A-101',
  block: 'Torre A',
  area: 85,
  condominium: 'Sunset Gardens',
})

const recentReadings = ref([
  {
    id: 1,
    period: 'Marzo 2024',
    date: new Date('2024-03-31'),
    consumption: 4250,
    amount: 127.50,
  },
  {
    id: 2,
    period: 'Febrero 2024',
    date: new Date('2024-02-29'),
    consumption: 3890,
    amount: 116.70,
  },
  {
    id: 3,
    period: 'Enero 2024',
    date: new Date('2024-01-31'),
    consumption: 4120,
    amount: 123.60,
  },
])

const alerts = ref([
  {
    id: 1,
    type: 'info',
    title: 'Próxima lectura',
    message: 'La lectura de tu medidor está programada para el 15 de abril.',
  },
  {
    id: 2,
    type: 'warning',
    title: 'Consumo elevado',
    message: 'Tu consumo este mes es 15% mayor al promedio.',
  },
])

function formatDate(date: Date): string {
  return date.toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}

onMounted(() => {
  // Load resident dashboard data
})
</script>