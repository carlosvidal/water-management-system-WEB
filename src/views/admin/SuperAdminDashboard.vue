<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header -->
    <header class="bg-white shadow-sm border-b border-gray-200">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16">
          <div class="flex items-center">
            <h1 class="text-xl font-semibold text-gray-900">Panel Super Administrador</h1>
          </div>
          <div class="flex items-center space-x-4">
            <div class="text-sm text-gray-500">
              {{ authStore.user?.name }}
            </div>
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
      <!-- Stats Overview -->
      <div class="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8">
        <div class="bg-white overflow-hidden shadow rounded-lg">
          <div class="p-5">
            <div class="flex items-center">
              <div class="flex-shrink-0">
                <BuildingOfficeIcon class="h-6 w-6 text-gray-400" />
              </div>
              <div class="ml-5 w-0 flex-1">
                <dl>
                  <dt class="text-sm font-medium text-gray-500 truncate">
                    Total Condominios
                  </dt>
                  <dd class="text-lg font-medium text-gray-900">
                    {{ stats.totalCondominiums }}
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
                <HomeIcon class="h-6 w-6 text-gray-400" />
              </div>
              <div class="ml-5 w-0 flex-1">
                <dl>
                  <dt class="text-sm font-medium text-gray-500 truncate">
                    Total Unidades
                  </dt>
                  <dd class="text-lg font-medium text-gray-900">
                    {{ stats.totalUnits }}
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
                <UsersIcon class="h-6 w-6 text-gray-400" />
              </div>
              <div class="ml-5 w-0 flex-1">
                <dl>
                  <dt class="text-sm font-medium text-gray-500 truncate">
                    Usuarios Activos
                  </dt>
                  <dd class="text-lg font-medium text-gray-900">
                    {{ stats.activeUsers }}
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
                <ChartBarIcon class="h-6 w-6 text-gray-400" />
              </div>
              <div class="ml-5 w-0 flex-1">
                <dl>
                  <dt class="text-sm font-medium text-gray-500 truncate">
                    Consumo Mensual
                  </dt>
                  <dd class="text-lg font-medium text-gray-900">
                    {{ stats.monthlyConsumption.toLocaleString() }} L
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Main Content Grid -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Condominiums Management -->
        <div class="lg:col-span-2">
          <div class="bg-white shadow rounded-lg">
            <div class="px-4 py-5 sm:p-6">
              <div class="flex items-center justify-between mb-4">
                <h3 class="text-lg leading-6 font-medium text-gray-900">
                  Gestión de Condominios
                </h3>
                <button
                  @click="showCreateCondominiumModal = true"
                  class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-water-600 hover:bg-water-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-water-500"
                >
                  <PlusIcon class="h-4 w-4 mr-2" />
                  Nuevo Condominio
                </button>
              </div>

              <div v-if="condominiumStore.loading" class="text-center py-4">
                <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-water-600 mx-auto"></div>
              </div>

              <div v-else-if="condominiumStore.list.length === 0" class="text-center py-8">
                <BuildingOfficeIcon class="mx-auto h-12 w-12 text-gray-400" />
                <h3 class="mt-2 text-sm font-medium text-gray-900">No hay condominios</h3>
                <p class="mt-1 text-sm text-gray-500">Comienza creando tu primer condominio.</p>
              </div>

              <div v-else class="space-y-4">
                <div
                  v-for="condominium in condominiumStore.list"
                  :key="condominium.id"
                  class="border border-gray-200 rounded-lg p-4 hover:bg-gray-50"
                >
                  <div class="flex items-center justify-between">
                    <div>
                      <h4 class="text-sm font-medium text-gray-900">
                        {{ condominium.name }}
                      </h4>
                      <p class="text-sm text-gray-500">
                        {{ condominium.address }}
                      </p>
                      <div class="mt-1 flex items-center space-x-4 text-xs text-gray-500">
                        <span class="inline-flex items-center">
                          <CubeIcon class="h-3 w-3 mr-1 text-gray-400" />
                          {{ getBlocksCount(condominium) }} bloques
                        </span>
                        <span class="inline-flex items-center">
                          <HomeIcon class="h-3 w-3 mr-1 text-gray-400" />
                          {{ getUnitsCount(condominium) }} unidades
                        </span>
                        <span class="flex items-center">
                          <div class="w-2 h-2 rounded-full mr-1" :class="condominium.isActive ? 'bg-green-400' : 'bg-red-400'"></div>
                          {{ condominium.isActive ? 'Activo' : 'Inactivo' }}
                        </span>
                      </div>
                    </div>
                    <div class="flex items-center space-x-2">
                      <router-link
                        :to="`/admin/condominiums/${condominium.id}`"
                        class="inline-flex items-center px-3 py-1 border border-transparent text-xs font-medium rounded text-water-700 bg-water-100 hover:bg-water-200"
                      >
                        Gestionar
                      </router-link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Recent Activity & Quick Actions -->
        <div class="space-y-6">
          <!-- Quick Actions -->
          <div class="bg-white shadow rounded-lg">
            <div class="px-4 py-5 sm:p-6">
              <h3 class="text-lg leading-6 font-medium text-gray-900 mb-4">
                Acciones Rápidas
              </h3>
              <div class="space-y-3">
                <button
                  @click="showCreateCondominiumModal = true"
                  class="w-full flex items-center px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  <PlusIcon class="h-4 w-4 mr-3 text-gray-400" />
                  Crear Condominio
                </button>
                <button
                  @click="showCreateUserModal = true"
                  class="w-full flex items-center px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  <UserPlusIcon class="h-4 w-4 mr-3 text-gray-400" />
                  Crear Usuario
                </button>
                <router-link
                  to="/admin/reports"
                  class="w-full flex items-center px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  <DocumentChartBarIcon class="h-4 w-4 mr-3 text-gray-400" />
                  Ver Reportes
                </router-link>
              </div>
            </div>
          </div>

          <!-- Recent Activity -->
          <div class="bg-white shadow rounded-lg">
            <div class="px-4 py-5 sm:p-6">
              <h3 class="text-lg leading-6 font-medium text-gray-900 mb-4">
                Actividad Reciente
              </h3>
              <div class="space-y-3">
                <div
                  v-for="activity in recentActivity"
                  :key="activity.id"
                  class="flex items-start space-x-3"
                >
                  <div class="flex-shrink-0">
                    <div class="w-2 h-2 bg-water-400 rounded-full mt-2"></div>
                  </div>
                  <div class="min-w-0 flex-1">
                    <p class="text-sm text-gray-900">{{ activity.description }}</p>
                    <p class="text-xs text-gray-500">{{ formatDate(activity.createdAt) }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Create Condominium Modal -->
    <div
      v-if="showCreateCondominiumModal"
      class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50"
    >
      <div class="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
        <div class="mt-3">
          <h3 class="text-lg font-medium text-gray-900 mb-4">Crear Nuevo Condominio</h3>
          <form @submit.prevent="createCondominium">
            <div class="space-y-4">
              <div>
                <label class="block text-sm font-medium text-gray-700">Nombre</label>
                <input
                  v-model="newCondominium.name"
                  type="text"
                  required
                  class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-water-500 focus:border-water-500 sm:text-sm"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700">Dirección</label>
                <input
                  v-model="newCondominium.address"
                  type="text"
                  required
                  class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-water-500 focus:border-water-500 sm:text-sm"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700">Ciudad</label>
                <input
                  v-model="newCondominium.city"
                  type="text"
                  required
                  class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-water-500 focus:border-water-500 sm:text-sm"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700">País</label>
                <input
                  v-model="newCondominium.country"
                  type="text"
                  required
                  class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-water-500 focus:border-water-500 sm:text-sm"
                />
              </div>
            </div>
            <div class="flex justify-end space-x-3 mt-6">
              <button
                type="button"
                @click="showCreateCondominiumModal = false"
                class="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md"
              >
                Cancelar
              </button>
              <button
                type="submit"
                :disabled="condominiumStore.loading"
                class="px-4 py-2 text-sm font-medium text-white bg-water-600 hover:bg-water-700 rounded-md disabled:opacity-50"
              >
                {{ condominiumStore.loading ? 'Creando...' : 'Crear' }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>

    <!-- Create User Modal -->
    <div
      v-if="showCreateUserModal"
      class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50"
    >
      <div class="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
        <div class="mt-3">
          <h3 class="text-lg font-medium text-gray-900 mb-4">Crear Nuevo Usuario</h3>
          <form @submit.prevent="createUser">
            <div class="space-y-4">
              <div>
                <label class="block text-sm font-medium text-gray-700">Nombre</label>
                <input
                  v-model="newUser.name"
                  type="text"
                  required
                  class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-water-500 focus:border-water-500 sm:text-sm"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700">Email</label>
                <input
                  v-model="newUser.email"
                  type="email"
                  required
                  class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-water-500 focus:border-water-500 sm:text-sm"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700">Teléfono</label>
                <input
                  v-model="newUser.phone"
                  type="tel"
                  class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-water-500 focus:border-water-500 sm:text-sm"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700">Rol</label>
                <select
                  v-model="newUser.role"
                  required
                  class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-water-500 focus:border-water-500 sm:text-sm"
                >
                  <option value="">Seleccionar rol</option>
                  <option value="SUPER_ADMIN">Super Administrador</option>
                  <option value="ADMIN">Administrador</option>
                  <option value="ANALYST">Analista</option>
                  <option value="EDITOR">Editor</option>
                </select>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700">Contraseña</label>
                <input
                  v-model="newUser.password"
                  type="password"
                  required
                  class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-water-500 focus:border-water-500 sm:text-sm"
                />
              </div>
            </div>
            <div class="flex justify-end space-x-3 mt-6">
              <button
                type="button"
                @click="showCreateUserModal = false"
                class="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md"
              >
                Cancelar
              </button>
              <button
                type="submit"
                :disabled="loading"
                class="px-4 py-2 text-sm font-medium text-white bg-water-600 hover:bg-water-700 rounded-md disabled:opacity-50"
              >
                {{ loading ? 'Creando...' : 'Crear' }}
              </button>
            </div>
          </form>
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
  BuildingOfficeIcon,
  HomeIcon,
  UsersIcon,
  ChartBarIcon,
  PlusIcon,
  UserPlusIcon,
  DocumentChartBarIcon,
  CubeIcon,
} from '@heroicons/vue/24/outline'

const router = useRouter()
const authStore = useAuthStore()
const condominiumStore = useCondominiumStore()

const loading = ref(false)
const showCreateCondominiumModal = ref(false)
const showCreateUserModal = ref(false)

const stats = ref({
  totalCondominiums: 0,
  totalUnits: 0,
  activeUsers: 0,
  monthlyConsumption: 0,
})

const recentActivity = ref([
  {
    id: 1,
    description: 'Nuevo condominio "Sunset Gardens" creado',
    createdAt: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
  },
  {
    id: 2,
    description: 'Usuario demo@sunsetgardens.com registrado',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
  },
  {
    id: 3,
    description: 'Lecturas del período marzo procesadas',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
  },
])

const newCondominium = reactive({
  name: '',
  address: '',
  city: '',
  country: '',
})

const newUser = reactive({
  name: '',
  email: '',
  phone: '',
  role: '',
  password: '',
})

async function loadDashboardData() {
  try {
    await condominiumStore.fetchCondominiums()

    // Calculate stats using the helper functions
    stats.value.totalCondominiums = condominiumStore.list.length
    stats.value.totalUnits = condominiumStore.list.reduce((total, c) => total + getUnitsCount(c), 0)
    stats.value.activeUsers = 15 // Mock data
    stats.value.monthlyConsumption = 125000 // Mock data
  } catch (error) {
    console.error('Error loading dashboard data:', error)
  }
}

async function createCondominium() {
  try {
    await condominiumStore.createCondominium(newCondominium)
    
    // Reset form
    Object.assign(newCondominium, {
      name: '',
      address: '',
      city: '',
      country: '',
    })
    
    showCreateCondominiumModal.value = false
    await loadDashboardData()
  } catch (error) {
    console.error('Error creating condominium:', error)
  }
}

async function createUser() {
  try {
    loading.value = true
    await apiClient.createUser(newUser)
    
    // Reset form
    Object.assign(newUser, {
      name: '',
      email: '',
      phone: '',
      role: '',
      password: '',
    })
    
    showCreateUserModal.value = false
  } catch (error) {
    console.error('Error creating user:', error)
  } finally {
    loading.value = false
  }
}

async function handleLogout() {
  await authStore.logout()
  router.push('/')
}

function formatDate(date: Date): string {
  const now = new Date()
  const diffMs = now.getTime() - date.getTime()
  const diffMins = Math.floor(diffMs / (1000 * 60))
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60))
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))

  if (diffMins < 60) {
    return `hace ${diffMins} minutos`
  } else if (diffHours < 24) {
    return `hace ${diffHours} horas`
  } else {
    return `hace ${diffDays} días`
  }
}

function getBlocksCount(condominium: any): number {
  // blocks array comes from API with nested units
  if (condominium.blocks && Array.isArray(condominium.blocks)) {
    return condominium.blocks.length
  }
  // Fallback to _count if available
  if (condominium._count?.blocks) {
    return condominium._count.blocks
  }
  return 0
}

function getUnitsCount(condominium: any): number {
  // Calculate total units from blocks array
  if (condominium.blocks && Array.isArray(condominium.blocks)) {
    return condominium.blocks.reduce((total: number, block: any) => {
      if (block.units && Array.isArray(block.units)) {
        return total + block.units.length
      }
      if (block._count?.units) {
        return total + block._count.units
      }
      return total
    }, 0)
  }
  // Fallback to totalUnits if available
  if (condominium.totalUnits) {
    return condominium.totalUnits
  }
  // Fallback to _count if available
  if (condominium._count?.units) {
    return condominium._count.units
  }
  return 0
}

onMounted(() => {
  loadDashboardData()
})
</script>