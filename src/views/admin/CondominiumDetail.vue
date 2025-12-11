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
            <h1 class="text-xl font-semibold text-gray-900">
              {{ condominiumStore.current?.name || 'Cargando...' }}
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
      <div v-if="condominiumStore.loading" class="text-center py-12">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-water-600 mx-auto"></div>
        <p class="mt-2 text-sm text-gray-500">Cargando información del condominio...</p>
      </div>

      <div v-else-if="!condominiumStore.current" class="text-center py-12">
        <BuildingOfficeIcon class="mx-auto h-12 w-12 text-gray-400" />
        <h3 class="mt-2 text-sm font-medium text-gray-900">Condominio no encontrado</h3>
      </div>

      <div v-else>
        <!-- Condominium Info -->
        <div class="bg-white shadow rounded-lg mb-8">
          <div class="px-4 py-5 sm:p-6">
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <h3 class="text-lg font-medium text-gray-900 mb-2">Información General</h3>
                <dl class="space-y-2">
                  <div>
                    <dt class="text-sm font-medium text-gray-500">Dirección</dt>
                    <dd class="text-sm text-gray-900">{{ condominiumStore.current.address }}</dd>
                  </div>
                  <div>
                    <dt class="text-sm font-medium text-gray-500">Ciudad</dt>
                    <dd class="text-sm text-gray-900">{{ condominiumStore.current.city }}</dd>
                  </div>
                  <div>
                    <dt class="text-sm font-medium text-gray-500">País</dt>
                    <dd class="text-sm text-gray-900">{{ condominiumStore.current.country }}</dd>
                  </div>
                </dl>
              </div>
              
              <div>
                <h3 class="text-lg font-medium text-gray-900 mb-2">Estadísticas</h3>
                <dl class="space-y-2">
                  <div>
                    <dt class="text-sm font-medium text-gray-500">Total Bloques</dt>
                    <dd class="text-sm text-gray-900">{{ condominiumStore.blocks.length }}</dd>
                  </div>
                  <div>
                    <dt class="text-sm font-medium text-gray-500">Total Unidades</dt>
                    <dd class="text-sm text-gray-900">{{ condominiumStore.totalUnits }}</dd>
                  </div>
                  <div>
                    <dt class="text-sm font-medium text-gray-500">Unidades Ocupadas</dt>
                    <dd class="text-sm text-gray-900">{{ condominiumStore.occupiedUnits }}</dd>
                  </div>
                </dl>
              </div>
              
              <div>
                <h3 class="text-lg font-medium text-gray-900 mb-2">Estado</h3>
                <div class="flex items-center">
                  <div class="w-2 h-2 rounded-full mr-2" :class="condominiumStore.current.isActive ? 'bg-green-400' : 'bg-red-400'"></div>
                  <span class="text-sm text-gray-900">
                    {{ condominiumStore.current.isActive ? 'Activo' : 'Inactivo' }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Navigation Tabs -->
        <div class="bg-white shadow rounded-lg mb-8">
          <div class="border-b border-gray-200">
            <nav class="-mb-px flex space-x-8 px-6">
              <button
                v-for="tab in tabs"
                :key="tab.id"
                @click="activeTab = tab.id"
                :class="[
                  activeTab === tab.id
                    ? 'border-water-500 text-water-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
                  'whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm'
                ]"
              >
                {{ tab.name }}
              </button>
            </nav>
          </div>

          <!-- Tab Content -->
          <div class="p-6">
            <!-- Blocks Tab -->
            <div v-if="activeTab === 'blocks'">
              <div class="flex justify-between items-center mb-4">
                <h3 class="text-lg font-medium text-gray-900">Bloques</h3>
                <button
                  v-if="authStore.canEdit(condominiumId.value)"
                  @click="showCreateBlockModal = true"
                  class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-water-600 hover:bg-water-700"
                >
                  <PlusIcon class="h-4 w-4 mr-2" />
                  Nuevo Bloque
                </button>
              </div>
              
              <div v-if="condominiumStore.blocks.length === 0" class="text-center py-8">
                <BuildingOffice2Icon class="mx-auto h-12 w-12 text-gray-400" />
                <h3 class="mt-2 text-sm font-medium text-gray-900">No hay bloques</h3>
                <p class="mt-1 text-sm text-gray-500">Comienza creando el primer bloque.</p>
              </div>
              
              <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div
                  v-for="block in condominiumStore.blocks"
                  :key="block.id"
                  class="bg-gray-50 rounded-lg p-4"
                >
                  <h4 class="font-medium text-gray-900">{{ block.name }}</h4>
                  <p class="text-sm text-gray-500 mt-1">{{ block.description }}</p>
                  <div class="mt-2 text-xs text-gray-500">
                    {{ block.units?.length || 0 }} unidades
                  </div>
                </div>
              </div>
            </div>

            <!-- Units Tab -->
            <div v-if="activeTab === 'units'">
              <div class="flex justify-between items-center mb-4">
                <h3 class="text-lg font-medium text-gray-900">Unidades</h3>
                <button
                  v-if="authStore.canManageUnits(condominiumId.value)"
                  @click="showCreateUnitModal = true"
                  class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-water-600 hover:bg-water-700"
                >
                  <PlusIcon class="h-4 w-4 mr-2" />
                  Nueva Unidad
                </button>
              </div>
              
              <div v-if="condominiumStore.units.length === 0" class="text-center py-8">
                <HomeIcon class="mx-auto h-12 w-12 text-gray-400" />
                <h3 class="mt-2 text-sm font-medium text-gray-900">No hay unidades</h3>
                <p class="mt-1 text-sm text-gray-500">Comienza creando la primera unidad.</p>
              </div>
              
              <div v-else class="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                <table class="min-w-full divide-y divide-gray-300">
                  <thead class="bg-gray-50">
                    <tr>
                      <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Número
                      </th>
                      <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Bloque
                      </th>
                      <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Residente
                      </th>
                      <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Estado
                      </th>
                      <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Acciones
                      </th>
                    </tr>
                  </thead>
                  <tbody class="bg-white divide-y divide-gray-200">
                    <tr v-for="unit in condominiumStore.units" :key="unit.id">
                      <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {{ unit.number }}
                      </td>
                      <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {{ unit.block?.name }}
                      </td>
                      <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {{ unit.resident?.name || 'Sin asignar' }}
                      </td>
                      <td class="px-6 py-4 whitespace-nowrap">
                        <span :class="[
                          unit.resident ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800',
                          'inline-flex px-2 py-1 text-xs font-semibold rounded-full'
                        ]">
                          {{ unit.resident ? 'Ocupada' : 'Disponible' }}
                        </span>
                      </td>
                      <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button
                          @click="selectUnitForResident(unit)"
                          class="text-water-600 hover:text-water-900"
                        >
                          {{ unit.resident ? 'Cambiar' : 'Asignar' }}
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <!-- Residents Tab -->
            <div v-if="activeTab === 'residents'">
              <div class="flex justify-between items-center mb-4">
                <h3 class="text-lg font-medium text-gray-900">Residentes</h3>
                <button
                  v-if="authStore.canManageResidents(condominiumId.value)"
                  @click="showCreateResidentModal = true"
                  class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-water-600 hover:bg-water-700"
                >
                  <PlusIcon class="h-4 w-4 mr-2" />
                  Nuevo Residente
                </button>
              </div>

              <div v-if="condominiumStore.residents.length === 0" class="text-center py-8">
                <UsersIcon class="mx-auto h-12 w-12 text-gray-400" />
                <h3 class="mt-2 text-sm font-medium text-gray-900">No hay residentes</h3>
                <p class="mt-1 text-sm text-gray-500">Comienza registrando el primer residente.</p>
              </div>

              <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div
                  v-for="resident in condominiumStore.residents"
                  :key="resident.id"
                  class="bg-gray-50 rounded-lg p-4"
                >
                  <h4 class="font-medium text-gray-900">{{ resident.name }}</h4>
                  <p class="text-sm text-gray-500">{{ resident.email }}</p>
                  <p class="text-sm text-gray-500">{{ resident.phone }}</p>
                  <div class="mt-2 flex items-center">
                    <div class="w-2 h-2 rounded-full mr-2" :class="resident.isActive ? 'bg-green-400' : 'bg-red-400'"></div>
                    <span class="text-xs text-gray-500">
                      {{ resident.isActive ? 'Activo' : 'Inactivo' }}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Users Tab -->
            <div v-if="activeTab === 'users'">
              <div class="flex justify-between items-center mb-4">
                <h3 class="text-lg font-medium text-gray-900">Usuarios del Condominio</h3>
                <button
                  v-if="authStore.canManageUsers(condominiumId.value)"
                  @click="showCreateUserModal = true"
                  class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-water-600 hover:bg-water-700"
                >
                  <PlusIcon class="h-4 w-4 mr-2" />
                  Nuevo Usuario
                </button>
              </div>

              <div v-if="condominiumStore.users.length === 0" class="text-center py-8">
                <UsersIcon class="mx-auto h-12 w-12 text-gray-400" />
                <h3 class="mt-2 text-sm font-medium text-gray-900">No hay usuarios</h3>
                <p class="mt-1 text-sm text-gray-500">Comienza creando el primer usuario.</p>
              </div>

              <div v-else class="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                <table class="min-w-full divide-y divide-gray-300">
                  <thead class="bg-gray-50">
                    <tr>
                      <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Nombre
                      </th>
                      <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Email
                      </th>
                      <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Teléfono
                      </th>
                      <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Rol
                      </th>
                      <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Estado
                      </th>
                    </tr>
                  </thead>
                  <tbody class="bg-white divide-y divide-gray-200">
                    <tr v-for="condoUser in condominiumStore.users" :key="condoUser.id">
                      <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {{ condoUser.user.name }}
                      </td>
                      <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {{ condoUser.user.email }}
                      </td>
                      <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {{ condoUser.user.phone || '-' }}
                      </td>
                      <td class="px-6 py-4 whitespace-nowrap">
                        <span :class="[
                          getRoleColor(condoUser.role),
                          'inline-flex px-2 py-1 text-xs font-semibold rounded-full'
                        ]">
                          {{ getRoleName(condoUser.role) }}
                        </span>
                      </td>
                      <td class="px-6 py-4 whitespace-nowrap">
                        <span :class="[
                          condoUser.user.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800',
                          'inline-flex px-2 py-1 text-xs font-semibold rounded-full'
                        ]">
                          {{ condoUser.user.isActive ? 'Activo' : 'Inactivo' }}
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <!-- Periods Tab -->
            <div v-if="activeTab === 'periods'">
              <div class="flex justify-between items-center mb-4">
                <h3 class="text-lg font-medium text-gray-900">Períodos de Facturación</h3>
                <button
                  v-if="authStore.canManagePeriods(condominiumId.value)"
                  @click="showCreatePeriodModal = true"
                  class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-water-600 hover:bg-water-700"
                >
                  <PlusIcon class="h-4 w-4 mr-2" />
                  Nuevo Período
                </button>
              </div>
              
              <div v-if="condominiumStore.periods.length === 0" class="text-center py-8">
                <CalendarIcon class="mx-auto h-12 w-12 text-gray-400" />
                <h3 class="mt-2 text-sm font-medium text-gray-900">No hay períodos</h3>
                <p class="mt-1 text-sm text-gray-500">Comienza creando el primer período de facturación.</p>
              </div>
              
              <div v-else class="space-y-4">
                <div
                  v-for="period in condominiumStore.periods"
                  :key="period.id"
                  class="border border-gray-200 rounded-lg p-4"
                >
                  <div class="flex items-center justify-between">
                    <div>
                      <h4 class="font-medium text-gray-900">{{ period.name }}</h4>
                      <p class="text-sm text-gray-500">
                        {{ formatDate(period.startDate) }} - {{ formatDate(period.endDate) }}
                      </p>
                      <div class="mt-1 flex items-center space-x-4 text-xs text-gray-500">
                        <span>{{ period.readings?.length || 0 }} lecturas</span>
                        <span class="flex items-center">
                          <div class="w-2 h-2 rounded-full mr-1" :class="getStatusColor(period.status)"></div>
                          {{ period.status }}
                        </span>
                      </div>
                    </div>
                    <div class="flex items-center space-x-2">
                      <router-link
                        :to="`/admin/condominiums/${condominiumId}/periods/${period.id}`"
                        class="inline-flex items-center px-3 py-1 border border-transparent text-xs font-medium rounded text-water-700 bg-water-100 hover:bg-water-200"
                      >
                        Ver Detalles
                      </router-link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Create Block Modal -->
    <div
      v-if="showCreateBlockModal"
      class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50"
    >
      <div class="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
        <div class="mt-3">
          <h3 class="text-lg font-medium text-gray-900 mb-4">Crear Nuevo Bloque</h3>
          <form @submit.prevent="createBlock">
            <div class="space-y-4">
              <div>
                <label class="block text-sm font-medium text-gray-700">Nombre</label>
                <input
                  v-model="newBlock.name"
                  type="text"
                  required
                  class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-water-500 focus:border-water-500 sm:text-sm"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700">Descripción</label>
                <textarea
                  v-model="newBlock.description"
                  rows="3"
                  class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-water-500 focus:border-water-500 sm:text-sm"
                ></textarea>
              </div>
            </div>
            <div class="flex justify-end space-x-3 mt-6">
              <button
                type="button"
                @click="showCreateBlockModal = false"
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

    <!-- Create Unit Modal -->
    <div
      v-if="showCreateUnitModal"
      class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50"
    >
      <div class="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
        <div class="mt-3">
          <h3 class="text-lg font-medium text-gray-900 mb-4">Crear Nueva Unidad</h3>
          <form @submit.prevent="createUnit">
            <div class="space-y-4">
              <div>
                <label class="block text-sm font-medium text-gray-700">Número</label>
                <input
                  v-model="newUnit.number"
                  type="text"
                  required
                  class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-water-500 focus:border-water-500 sm:text-sm"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700">Bloque</label>
                <select
                  v-model="newUnit.blockId"
                  required
                  class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-water-500 focus:border-water-500 sm:text-sm"
                >
                  <option value="">Seleccionar bloque</option>
                  <option v-for="block in condominiumStore.blocks" :key="block.id" :value="block.id">
                    {{ block.name }}
                  </option>
                </select>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700">Área (m²)</label>
                <input
                  v-model.number="newUnit.area"
                  type="number"
                  step="0.01"
                  class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-water-500 focus:border-water-500 sm:text-sm"
                />
              </div>
            </div>
            <div class="flex justify-end space-x-3 mt-6">
              <button
                type="button"
                @click="showCreateUnitModal = false"
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

    <!-- Create Resident Modal -->
    <div
      v-if="showCreateResidentModal"
      class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50"
    >
      <div class="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
        <div class="mt-3">
          <h3 class="text-lg font-medium text-gray-900 mb-4">Crear Nuevo Residente</h3>
          <form @submit.prevent="createResident">
            <div class="space-y-4">
              <div>
                <label class="block text-sm font-medium text-gray-700">Nombre</label>
                <input
                  v-model="newResident.name"
                  type="text"
                  required
                  class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-water-500 focus:border-water-500 sm:text-sm"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700">Email</label>
                <input
                  v-model="newResident.email"
                  type="email"
                  required
                  class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-water-500 focus:border-water-500 sm:text-sm"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700">Teléfono</label>
                <input
                  v-model="newResident.phone"
                  type="tel"
                  class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-water-500 focus:border-water-500 sm:text-sm"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700">Documento</label>
                <input
                  v-model="newResident.document"
                  type="text"
                  class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-water-500 focus:border-water-500 sm:text-sm"
                />
              </div>
            </div>
            <div class="flex justify-end space-x-3 mt-6">
              <button
                type="button"
                @click="showCreateResidentModal = false"
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
                <label class="block text-sm font-medium text-gray-700">Contraseña</label>
                <input
                  v-model="newUser.password"
                  type="password"
                  required
                  minlength="8"
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
                  <option value="ADMIN">Administrador</option>
                  <option value="EDITOR">Editor</option>
                  <option value="ANALYST">Lector</option>
                </select>
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

    <!-- Create Period Modal -->
    <div
      v-if="showCreatePeriodModal"
      class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50"
    >
      <div class="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
        <div class="mt-3">
          <h3 class="text-lg font-medium text-gray-900 mb-4">Crear Nuevo Período</h3>
          <form @submit.prevent="createPeriod">
            <div class="space-y-4">
              <div>
                <label class="block text-sm font-medium text-gray-700">Nombre del Período</label>
                <input
                  v-model="newPeriod.name"
                  type="text"
                  required
                  placeholder="Ej: Marzo 2024"
                  class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-water-500 focus:border-water-500 sm:text-sm"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700">Fecha de Inicio</label>
                <input
                  v-model="newPeriod.startDate"
                  type="date"
                  required
                  class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-water-500 focus:border-water-500 sm:text-sm"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700">Fecha de Fin</label>
                <input
                  v-model="newPeriod.endDate"
                  type="date"
                  class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-water-500 focus:border-water-500 sm:text-sm"
                />
              </div>
            </div>
            <div class="flex justify-end space-x-3 mt-6">
              <button
                type="button"
                @click="showCreatePeriodModal = false"
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
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { useCondominiumStore } from '@/stores/condominium'
import {
  ArrowLeftIcon,
  BuildingOfficeIcon,
  BuildingOffice2Icon,
  HomeIcon,
  UsersIcon,
  CalendarIcon,
  PlusIcon,
} from '@heroicons/vue/24/outline'

const route = useRoute()
const router = useRouter()
const authStore = useAuthStore()
const condominiumStore = useCondominiumStore()

const condominiumId = computed(() => route.params.id as string)
const activeTab = ref('blocks')

const showCreateBlockModal = ref(false)
const showCreateUnitModal = ref(false)
const showCreateResidentModal = ref(false)
const showCreateUserModal = ref(false)
const showCreatePeriodModal = ref(false)

const tabs = [
  { id: 'blocks', name: 'Bloques' },
  { id: 'units', name: 'Unidades' },
  { id: 'residents', name: 'Residentes' },
  { id: 'users', name: 'Usuarios' },
  { id: 'periods', name: 'Períodos' },
]

const newBlock = reactive({
  name: '',
  description: '',
})

const newUnit = reactive({
  number: '',
  blockId: '',
  area: null,
})

const newResident = reactive({
  name: '',
  email: '',
  phone: '',
  document: '',
})

const newUser = reactive({
  name: '',
  email: '',
  password: '',
  phone: '',
  role: 'ANALYST',
})

const newPeriod = reactive({
  name: '',
  startDate: '',
  endDate: '',
})

async function loadCondominiumData() {
  try {
    await condominiumStore.fetchCondominium(condominiumId.value)
    await Promise.all([
      condominiumStore.fetchBlocks(condominiumId.value),
      condominiumStore.fetchUnits(condominiumId.value),
      condominiumStore.fetchResidents(condominiumId.value),
      condominiumStore.fetchUsers(condominiumId.value),
      condominiumStore.fetchPeriods(condominiumId.value),
    ])
  } catch (error) {
    console.error('Error loading condominium data:', error)
  }
}

async function createBlock() {
  try {
    await condominiumStore.createBlock(condominiumId.value, newBlock)
    
    Object.assign(newBlock, {
      name: '',
      description: '',
    })
    
    showCreateBlockModal.value = false
  } catch (error) {
    console.error('Error creating block:', error)
  }
}

async function createUnit() {
  try {
    await condominiumStore.createUnit(condominiumId.value, newUnit)
    
    Object.assign(newUnit, {
      number: '',
      blockId: '',
      area: null,
    })
    
    showCreateUnitModal.value = false
  } catch (error) {
    console.error('Error creating unit:', error)
  }
}

async function createResident() {
  try {
    await condominiumStore.createResident(condominiumId.value, newResident)

    Object.assign(newResident, {
      name: '',
      email: '',
      phone: '',
      document: '',
    })

    showCreateResidentModal.value = false
  } catch (error) {
    console.error('Error creating resident:', error)
  }
}

async function createUser() {
  try {
    await condominiumStore.createUser(condominiumId.value, newUser)

    Object.assign(newUser, {
      name: '',
      email: '',
      password: '',
      phone: '',
      role: 'ANALYST',
    })

    showCreateUserModal.value = false
  } catch (error) {
    console.error('Error creating user:', error)
  }
}

function selectUnitForResident(unit: any) {
  console.log('Select resident for unit:', unit)
}

function getRoleName(role: string): string {
  const roleNames: Record<string, string> = {
    'SUPER_ADMIN': 'Super Admin',
    'ADMIN': 'Administrador',
    'EDITOR': 'Editor',
    'ANALYST': 'Lector',
  }
  return roleNames[role] || role
}

function getRoleColor(role: string): string {
  const colors: Record<string, string> = {
    'SUPER_ADMIN': 'bg-purple-100 text-purple-800',
    'ADMIN': 'bg-blue-100 text-blue-800',
    'EDITOR': 'bg-green-100 text-green-800',
    'ANALYST': 'bg-gray-100 text-gray-800',
  }
  return colors[role] || 'bg-gray-100 text-gray-800'
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

async function createPeriod() {
  try {
    await condominiumStore.createPeriod(condominiumId.value, newPeriod)
    
    Object.assign(newPeriod, {
      name: '',
      startDate: '',
      endDate: '',
    })
    
    showCreatePeriodModal.value = false
  } catch (error) {
    console.error('Error creating period:', error)
  }
}

async function handleLogout() {
  await authStore.logout()
  router.push('/')
}

onMounted(() => {
  loadCondominiumData()
})
</script>