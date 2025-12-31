<template>
  <div
    v-if="show"
    class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50"
    @click.self="$emit('close')"
  >
    <div class="relative top-10 mx-auto p-5 border w-full max-w-lg shadow-lg rounded-md bg-white">
      <div class="flex justify-between items-center mb-4">
        <h3 class="text-lg font-medium text-gray-900">
          Residentes de {{ unit?.name || 'Unidad' }}
        </h3>
        <button @click="$emit('close')" class="text-gray-400 hover:text-gray-600">
          <XMarkIcon class="h-6 w-6" />
        </button>
      </div>

      <!-- Loading state -->
      <div v-if="loading" class="flex justify-center py-8">
        <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-water-600"></div>
      </div>

      <!-- Content -->
      <div v-else>
        <!-- Current residents -->
        <div class="mb-6">
          <div class="flex justify-between items-center mb-3">
            <h4 class="text-sm font-medium text-gray-700">
              Residentes Asignados ({{ residents.length }}/2)
            </h4>
            <button
              v-if="residents.length < 2"
              @click="showAddForm = true"
              class="text-sm text-water-600 hover:text-water-800 flex items-center"
            >
              <PlusIcon class="h-4 w-4 mr-1" />
              Agregar
            </button>
          </div>

          <div v-if="residents.length === 0" class="text-center py-6 bg-gray-50 rounded-lg">
            <UserIcon class="h-12 w-12 text-gray-300 mx-auto mb-2" />
            <p class="text-gray-500 text-sm">No hay residentes asignados</p>
          </div>

          <div v-else class="space-y-3">
            <div
              v-for="resident in residents"
              :key="resident.id"
              class="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
            >
              <div class="flex items-center">
                <div
                  :class="[
                    'w-10 h-10 rounded-full flex items-center justify-center text-white font-medium mr-3',
                    resident.isPrimary ? 'bg-water-600' : 'bg-gray-400'
                  ]"
                >
                  {{ getInitials(resident.name) }}
                </div>
                <div>
                  <p class="font-medium text-gray-900">
                    {{ resident.name }}
                    <span v-if="resident.isPrimary" class="ml-2 text-xs bg-water-100 text-water-800 px-2 py-0.5 rounded-full">
                      Principal
                    </span>
                  </p>
                  <p class="text-sm text-gray-500">{{ resident.email || resident.phone || 'Sin contacto' }}</p>
                </div>
              </div>
              <button
                @click="removeResident(resident)"
                class="p-1 text-red-400 hover:text-red-600"
                title="Quitar residente"
              >
                <TrashIcon class="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>

        <!-- Add resident form -->
        <div v-if="showAddForm" class="border-t pt-4">
          <h4 class="text-sm font-medium text-gray-700 mb-3">Agregar Residente</h4>

          <!-- Search existing residents -->
          <div class="mb-4">
            <label class="block text-sm text-gray-600 mb-1">Buscar residente existente</label>
            <div class="relative">
              <input
                v-model="searchQuery"
                type="text"
                placeholder="Buscar por nombre..."
                class="w-full border-gray-300 rounded-md shadow-sm focus:ring-water-500 focus:border-water-500 sm:text-sm pr-10"
                @input="searchResidents"
              />
              <MagnifyingGlassIcon class="h-5 w-5 text-gray-400 absolute right-3 top-2.5" />
            </div>

            <!-- Search results -->
            <div v-if="searchResults.length > 0" class="mt-2 border rounded-md max-h-40 overflow-y-auto">
              <button
                v-for="result in searchResults"
                :key="result.id"
                @click="selectResident(result)"
                class="w-full text-left px-3 py-2 hover:bg-gray-50 border-b last:border-b-0"
              >
                <p class="font-medium text-sm">{{ result.name }}</p>
                <p class="text-xs text-gray-500">{{ result.email || result.phone }}</p>
              </button>
            </div>
          </div>

          <!-- Or create new -->
          <div class="text-center text-sm text-gray-500 my-2">- o crear nuevo -</div>

          <div class="space-y-3">
            <div>
              <label class="block text-sm text-gray-600 mb-1">Nombre *</label>
              <input
                v-model="newResident.name"
                type="text"
                required
                class="w-full border-gray-300 rounded-md shadow-sm focus:ring-water-500 focus:border-water-500 sm:text-sm"
              />
            </div>
            <div>
              <label class="block text-sm text-gray-600 mb-1">Email</label>
              <input
                v-model="newResident.email"
                type="email"
                class="w-full border-gray-300 rounded-md shadow-sm focus:ring-water-500 focus:border-water-500 sm:text-sm"
              />
            </div>
            <div>
              <label class="block text-sm text-gray-600 mb-1">Telefono</label>
              <input
                v-model="newResident.phone"
                type="tel"
                class="w-full border-gray-300 rounded-md shadow-sm focus:ring-water-500 focus:border-water-500 sm:text-sm"
              />
            </div>
            <div class="flex items-center">
              <input
                v-model="newResident.isPrimary"
                type="checkbox"
                id="isPrimary"
                class="h-4 w-4 text-water-600 focus:ring-water-500 border-gray-300 rounded"
              />
              <label for="isPrimary" class="ml-2 text-sm text-gray-600">
                Residente principal
              </label>
            </div>
          </div>

          <div class="flex justify-end space-x-3 mt-4">
            <button
              @click="showAddForm = false; resetNewResident()"
              class="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md"
            >
              Cancelar
            </button>
            <button
              @click="addNewResident"
              :disabled="!newResident.name || saving"
              class="px-4 py-2 text-sm font-medium text-white bg-water-600 hover:bg-water-700 rounded-md disabled:opacity-50"
            >
              {{ saving ? 'Guardando...' : 'Agregar' }}
            </button>
          </div>
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
import { ref, watch, onMounted } from 'vue'
import { XMarkIcon, PlusIcon, TrashIcon, UserIcon, MagnifyingGlassIcon } from '@heroicons/vue/24/outline'
import apiClient from '@/utils/api'

interface Resident {
  id: string
  name: string
  email?: string
  phone?: string
  isPrimary?: boolean
}

interface Unit {
  id: string
  name: string
  blockId: string
}

const props = defineProps<{
  show: boolean
  unit: Unit | null
  condominiumId: string
}>()

const emit = defineEmits(['close', 'updated'])

const loading = ref(false)
const saving = ref(false)
const error = ref('')
const residents = ref<Resident[]>([])
const showAddForm = ref(false)
const searchQuery = ref('')
const searchResults = ref<Resident[]>([])
const allResidents = ref<Resident[]>([])

const newResident = ref({
  name: '',
  email: '',
  phone: '',
  isPrimary: false
})

function getInitials(name: string): string {
  return name
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
    .substring(0, 2)
}

function resetNewResident() {
  newResident.value = {
    name: '',
    email: '',
    phone: '',
    isPrimary: false
  }
  searchQuery.value = ''
  searchResults.value = []
}

async function loadResidents() {
  if (!props.unit || !props.condominiumId) return

  loading.value = true
  error.value = ''

  try {
    const response = await apiClient.getUnitResidents(props.condominiumId, props.unit.id)
    residents.value = response.residents || response || []
  } catch (err: any) {
    console.error('Error loading unit residents:', err)
    error.value = 'Error al cargar los residentes'
  } finally {
    loading.value = false
  }
}

async function loadAllResidents() {
  if (!props.condominiumId) return

  try {
    const response = await apiClient.getCondominiumResidents(props.condominiumId)
    allResidents.value = response.residents || response || []
  } catch (err) {
    console.error('Error loading all residents:', err)
  }
}

function searchResidents() {
  if (!searchQuery.value.trim()) {
    searchResults.value = []
    return
  }

  const query = searchQuery.value.toLowerCase()
  const currentResidentIds = residents.value.map(r => r.id)

  searchResults.value = allResidents.value.filter(r =>
    r.name.toLowerCase().includes(query) &&
    !currentResidentIds.includes(r.id)
  ).slice(0, 5)
}

async function selectResident(resident: Resident) {
  saving.value = true
  error.value = ''

  try {
    await apiClient.addResidentToUnit(props.condominiumId, props.unit!.id, {
      residentId: resident.id,
      isPrimary: residents.value.length === 0 // First one is primary by default
    })

    await loadResidents()
    searchQuery.value = ''
    searchResults.value = []
    showAddForm.value = false
    emit('updated')
  } catch (err: any) {
    console.error('Error adding resident:', err)
    error.value = err.response?.data?.message || 'Error al agregar el residente'
  } finally {
    saving.value = false
  }
}

async function addNewResident() {
  if (!newResident.value.name) return

  saving.value = true
  error.value = ''

  try {
    // First create the resident
    const created = await apiClient.createResident(props.condominiumId, {
      name: newResident.value.name,
      email: newResident.value.email || undefined,
      phone: newResident.value.phone || undefined
    })

    // Then add to unit
    await apiClient.addResidentToUnit(props.condominiumId, props.unit!.id, {
      residentId: created.id,
      isPrimary: newResident.value.isPrimary || residents.value.length === 0
    })

    await loadResidents()
    await loadAllResidents()
    resetNewResident()
    showAddForm.value = false
    emit('updated')
  } catch (err: any) {
    console.error('Error creating resident:', err)
    error.value = err.response?.data?.message || 'Error al crear el residente'
  } finally {
    saving.value = false
  }
}

async function removeResident(resident: Resident) {
  if (!confirm(`¿Quitar a ${resident.name} de esta unidad?`)) return

  saving.value = true
  error.value = ''

  try {
    await apiClient.removeResidentFromUnit(props.condominiumId, props.unit!.id, resident.id)
    await loadResidents()
    emit('updated')
  } catch (err: any) {
    console.error('Error removing resident:', err)
    error.value = err.response?.data?.message || 'Error al quitar el residente'
  } finally {
    saving.value = false
  }
}

watch(() => props.show, (newVal) => {
  if (newVal && props.unit) {
    loadResidents()
    loadAllResidents()
    showAddForm.value = false
    resetNewResident()
    error.value = ''
  }
})
</script>
