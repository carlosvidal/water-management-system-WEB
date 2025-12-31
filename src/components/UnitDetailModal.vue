<template>
  <div
    v-if="show"
    class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50"
    @click.self="$emit('close')"
  >
    <div class="relative top-10 mx-auto p-5 border w-full max-w-3xl shadow-lg rounded-md bg-white mb-10">
      <div class="flex justify-between items-center mb-4">
        <div>
          <h3 class="text-lg font-medium text-gray-900">
            {{ blockName }} - {{ unit?.name || 'Unidad' }}
          </h3>
          <p class="text-sm text-gray-500">Historial de consumo</p>
        </div>
        <button @click="$emit('close')" class="text-gray-400 hover:text-gray-600">
          <XMarkIcon class="h-6 w-6" />
        </button>
      </div>

      <!-- Loading state -->
      <div v-if="loading" class="flex justify-center py-12">
        <div class="animate-spin rounded-full h-10 w-10 border-b-2 border-water-600"></div>
      </div>

      <!-- Content -->
      <div v-else>
        <!-- Summary Cards -->
        <div v-if="unitHistory.length > 0" class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div class="bg-water-50 rounded-lg p-4 text-center">
            <p class="text-sm text-water-600 mb-1">Consumo Promedio</p>
            <p class="text-2xl font-bold text-water-700">{{ avgConsumption.toFixed(2) }}</p>
            <p class="text-xs text-water-500">m3</p>
          </div>
          <div class="bg-green-50 rounded-lg p-4 text-center">
            <p class="text-sm text-green-600 mb-1">Monto Promedio</p>
            <p class="text-2xl font-bold text-green-700">S/ {{ avgAmount.toFixed(2) }}</p>
            <p class="text-xs text-green-500">por periodo</p>
          </div>
          <div class="bg-blue-50 rounded-lg p-4 text-center">
            <p class="text-sm text-blue-600 mb-1">Consumo Total</p>
            <p class="text-2xl font-bold text-blue-700">{{ totalConsumption.toFixed(2) }}</p>
            <p class="text-xs text-blue-500">m3</p>
          </div>
          <div class="bg-purple-50 rounded-lg p-4 text-center">
            <p class="text-sm text-purple-600 mb-1">Periodos</p>
            <p class="text-2xl font-bold text-purple-700">{{ unitHistory.length }}</p>
            <p class="text-xs text-purple-500">registrados</p>
          </div>
        </div>

        <!-- Consumption Chart -->
        <div v-if="unitHistory.length > 0" class="bg-white border rounded-lg p-4 mb-6">
          <h4 class="text-sm font-medium text-gray-700 mb-4 flex items-center">
            <ChartBarIcon class="h-5 w-5 mr-2 text-water-600" />
            Consumo por Periodo (ultimos {{ Math.min(unitHistory.length, 12) }} periodos)
          </h4>
          <div class="h-64">
            <canvas ref="chartCanvas"></canvas>
          </div>
        </div>

        <!-- History Table -->
        <div v-if="unitHistory.length > 0">
          <h4 class="text-sm font-medium text-gray-700 mb-3 flex items-center">
            <ClockIcon class="h-5 w-5 mr-2 text-gray-500" />
            Historial Detallado
          </h4>
          <div class="overflow-x-auto border rounded-lg">
            <table class="min-w-full divide-y divide-gray-200">
              <thead class="bg-gray-50">
                <tr>
                  <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Periodo</th>
                  <th class="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">Lectura Ant.</th>
                  <th class="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">Lectura Act.</th>
                  <th class="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">Consumo</th>
                  <th class="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">Monto Ind.</th>
                  <th class="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">Area Comun</th>
                  <th class="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">Total</th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-200">
                <tr v-for="item in unitHistory" :key="item.period.id" class="hover:bg-gray-50">
                  <td class="px-4 py-3 text-sm">
                    <p class="font-medium text-gray-900">{{ item.period.name }}</p>
                    <p class="text-xs text-gray-500">{{ formatDate(item.period.startDate) }}</p>
                  </td>
                  <td class="px-4 py-3 text-sm text-right text-gray-600">
                    {{ item.calculation.previousReading?.toFixed(2) || '-' }}
                  </td>
                  <td class="px-4 py-3 text-sm text-right text-gray-600">
                    {{ item.calculation.currentReading?.toFixed(2) || '-' }}
                  </td>
                  <td class="px-4 py-3 text-sm text-right font-medium text-water-600">
                    {{ item.calculation.consumption?.toFixed(2) || '0.00' }} m3
                  </td>
                  <td class="px-4 py-3 text-sm text-right text-gray-600">
                    S/ {{ item.calculation.individualAmount?.toFixed(2) || '0.00' }}
                  </td>
                  <td class="px-4 py-3 text-sm text-right text-gray-600">
                    S/ {{ item.calculation.commonAreaAmount?.toFixed(2) || '0.00' }}
                  </td>
                  <td class="px-4 py-3 text-sm text-right font-bold text-gray-900">
                    S/ {{ item.calculation.totalAmount?.toFixed(2) || '0.00' }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- Empty State -->
        <div v-else class="text-center py-12 bg-gray-50 rounded-lg">
          <ChartBarIcon class="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <h4 class="text-lg font-medium text-gray-600 mb-2">Sin historial</h4>
          <p class="text-gray-500 text-sm">
            Esta unidad no tiene periodos cerrados con calculos guardados.
          </p>
        </div>

        <!-- Error message -->
        <div v-if="error" class="mt-4 p-3 bg-red-50 text-red-700 rounded-md text-sm">
          {{ error }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, nextTick } from 'vue'
import { XMarkIcon, ChartBarIcon, ClockIcon } from '@heroicons/vue/24/outline'
import { Chart, registerables } from 'chart.js'
import apiClient from '@/utils/api'

Chart.register(...registerables)

interface Unit {
  id: string
  name: string
  blockId: string
}

interface Period {
  id: string
  name: string
  startDate: string
  endDate?: string
  status: string
}

interface UnitCalculation {
  unitId: string
  consumption: number
  previousReading?: number
  currentReading?: number
  individualAmount: number
  commonAreaAmount: number
  totalAmount: number
}

interface HistoryItem {
  period: Period
  calculation: UnitCalculation
}

const props = defineProps<{
  show: boolean
  unit: Unit | null
  condominiumId: string
  blockName?: string
}>()

const emit = defineEmits(['close'])

const loading = ref(false)
const error = ref('')
const unitHistory = ref<HistoryItem[]>([])
const chartCanvas = ref<HTMLCanvasElement | null>(null)
let chartInstance: Chart | null = null

const avgConsumption = computed(() => {
  if (unitHistory.value.length === 0) return 0
  const total = unitHistory.value.reduce((sum, item) => sum + (item.calculation.consumption || 0), 0)
  return total / unitHistory.value.length
})

const avgAmount = computed(() => {
  if (unitHistory.value.length === 0) return 0
  const total = unitHistory.value.reduce((sum, item) => sum + (item.calculation.totalAmount || 0), 0)
  return total / unitHistory.value.length
})

const totalConsumption = computed(() => {
  return unitHistory.value.reduce((sum, item) => sum + (item.calculation.consumption || 0), 0)
})

function formatDate(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleDateString('es-PE', { month: 'short', year: 'numeric' })
}

function getMonthAbbr(dateString: string): string {
  const date = new Date(dateString)
  const months = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic']
  return months[date.getMonth()]
}

async function loadUnitHistory() {
  if (!props.unit || !props.condominiumId) return

  loading.value = true
  error.value = ''
  unitHistory.value = []

  try {
    // Get all periods for condominium
    const periods = await apiClient.getCondominiumPeriods(props.condominiumId)
    const allPeriods = periods.periods || periods || []

    // Filter closed periods
    const closedPeriods = allPeriods.filter((p: Period) => p.status === 'CLOSED')

    // Sort by date (newest first)
    closedPeriods.sort((a: Period, b: Period) =>
      new Date(b.startDate).getTime() - new Date(a.startDate).getTime()
    )

    const history: HistoryItem[] = []

    // Get calculations for each closed period
    for (const period of closedPeriods) {
      try {
        const calcData = await apiClient.getPeriodCalculations(period.id)

        if (calcData && calcData.unitCalculations) {
          const unitCalc = calcData.unitCalculations.find(
            (c: UnitCalculation) => c.unitId === props.unit!.id
          )

          if (unitCalc) {
            history.push({
              period,
              calculation: unitCalc
            })
          }
        }
      } catch (err) {
        // Period doesn't have calculations, skip
        continue
      }
    }

    unitHistory.value = history

    // Render chart after data is loaded
    await nextTick()
    renderChart()
  } catch (err: any) {
    console.error('Error loading unit history:', err)
    error.value = 'Error al cargar el historial'
  } finally {
    loading.value = false
  }
}

function renderChart() {
  if (!chartCanvas.value || unitHistory.value.length === 0) return

  // Destroy existing chart
  if (chartInstance) {
    chartInstance.destroy()
  }

  // Get last 12 periods (reversed for oldest to newest)
  const last12 = unitHistory.value.slice(0, 12).reverse()

  const labels = last12.map(item => getMonthAbbr(item.period.startDate))
  const consumptionData = last12.map(item => item.calculation.consumption || 0)

  chartInstance = new Chart(chartCanvas.value, {
    type: 'bar',
    data: {
      labels,
      datasets: [{
        label: 'Consumo (m3)',
        data: consumptionData,
        backgroundColor: 'rgba(14, 165, 233, 0.7)',
        borderColor: 'rgba(14, 165, 233, 1)',
        borderWidth: 1,
        borderRadius: 6,
        borderSkipped: false,
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false
        },
        tooltip: {
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          titleColor: 'white',
          bodyColor: 'white',
          padding: 12,
          callbacks: {
            title: (context) => {
              const idx = context[0].dataIndex
              return last12[idx].period.name
            },
            label: (context) => {
              const idx = context.dataIndex
              const item = last12[idx]
              return [
                `Consumo: ${item.calculation.consumption?.toFixed(2)} m3`,
                `Total: S/ ${item.calculation.totalAmount?.toFixed(2)}`
              ]
            }
          }
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          grid: {
            color: 'rgba(0, 0, 0, 0.05)'
          },
          ticks: {
            callback: (value) => `${value} m3`
          }
        },
        x: {
          grid: {
            display: false
          }
        }
      }
    }
  })
}

watch(() => props.show, async (newVal) => {
  if (newVal && props.unit) {
    await loadUnitHistory()
  } else {
    // Cleanup chart when modal closes
    if (chartInstance) {
      chartInstance.destroy()
      chartInstance = null
    }
  }
})
</script>
