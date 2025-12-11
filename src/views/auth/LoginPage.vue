<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8">
      <div>
        <div class="mx-auto h-12 w-auto flex justify-center">
          <span class="text-3xl font-bold text-water-600">AquaFlow</span>
        </div>
        <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Inicia sesión en tu cuenta
        </h2>
        <p class="mt-2 text-center text-sm text-gray-600">
          O
          <router-link to="/" class="font-medium text-water-600 hover:text-water-500">
            vuelve al inicio
          </router-link>
        </p>
      </div>
      
      <form class="mt-8 space-y-6" @submit.prevent="handleLogin">
        <div class="rounded-md shadow-sm -space-y-px">
          <div>
            <label for="email" class="sr-only">Email</label>
            <input
              id="email"
              v-model="form.email"
              name="email"
              type="email"
              autocomplete="email"
              required
              class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-water-500 focus:border-water-500 focus:z-10 sm:text-sm"
              placeholder="Dirección de email"
            />
          </div>
          <div>
            <label for="password" class="sr-only">Contraseña</label>
            <input
              id="password"
              v-model="form.password"
              name="password"
              type="password"
              autocomplete="current-password"
              required
              class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-water-500 focus:border-water-500 focus:z-10 sm:text-sm"
              placeholder="Contraseña"
            />
          </div>
        </div>

        <div v-if="error" class="rounded-md bg-red-50 p-4">
          <div class="flex">
            <ExclamationTriangleIcon class="h-5 w-5 text-red-400" />
            <div class="ml-3">
              <h3 class="text-sm font-medium text-red-800">
                Error de autenticación
              </h3>
              <div class="mt-2 text-sm text-red-700">
                {{ error }}
              </div>
            </div>
          </div>
        </div>

        <div class="flex items-center justify-between">
          <div class="flex items-center">
            <input
              id="remember-me"
              v-model="form.rememberMe"
              name="remember-me"
              type="checkbox"
              class="h-4 w-4 text-water-600 focus:ring-water-500 border-gray-300 rounded"
            />
            <label for="remember-me" class="ml-2 block text-sm text-gray-900">
              Recordarme
            </label>
          </div>

          <div class="text-sm">
            <a href="#" class="font-medium text-water-600 hover:text-water-500">
              ¿Olvidaste tu contraseña?
            </a>
          </div>
        </div>

        <div>
          <button
            type="submit"
            :disabled="loading"
            class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-water-600 hover:bg-water-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-water-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span class="absolute left-0 inset-y-0 flex items-center pl-3">
              <LockClosedIcon 
                v-if="!loading"
                class="h-5 w-5 text-water-500 group-hover:text-water-400" 
                aria-hidden="true" 
              />
              <div 
                v-else
                class="animate-spin rounded-full h-5 w-5 border-b-2 border-white"
              />
            </span>
            {{ loading ? 'Iniciando sesión...' : 'Iniciar sesión' }}
          </button>
        </div>
      </form>

      <!-- Demo Accounts -->
      <div class="mt-8 border-t border-gray-200 pt-8">
        <h3 class="text-lg font-medium text-gray-900 text-center mb-4">Cuentas de Demostración</h3>
        <div class="space-y-3">
          <button
            @click="loginWithDemo('admin@aquaflow.com', 'SuperAdmin123!')"
            class="w-full text-left p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            :disabled="loading"
          >
            <div class="font-medium text-gray-900">Super Administrador</div>
            <div class="text-sm text-gray-500">admin@aquaflow.com</div>
            <div class="text-xs text-gray-400">Acceso completo al sistema</div>
          </button>
          
          <button
            @click="loginWithDemo('demo@sunsetgardens.com', 'DemoAdmin123!')"
            class="w-full text-left p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            :disabled="loading"
          >
            <div class="font-medium text-gray-900">Admin de Condominio</div>
            <div class="text-sm text-gray-500">demo@sunsetgardens.com</div>
            <div class="text-xs text-gray-400">Gestión de Sunset Gardens</div>
          </button>
          
          <button
            @click="loginWithDemo('janitor@sunsetgardens.com', 'Janitor123!')"
            class="w-full text-left p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            :disabled="loading"
          >
            <div class="font-medium text-gray-900">Personal de Mantenimiento</div>
            <div class="text-sm text-gray-500">janitor@sunsetgardens.com</div>
            <div class="text-xs text-gray-400">Registro de lecturas</div>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { LockClosedIcon, ExclamationTriangleIcon } from '@heroicons/vue/24/solid'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const authStore = useAuthStore()

const loading = ref(false)
const error = ref<string | null>(null)

const form = reactive({
  email: '',
  password: '',
  rememberMe: false,
})

async function handleLogin() {
  if (!form.email || !form.password) return
  
  try {
    loading.value = true
    error.value = null
    
    await authStore.login({
      email: form.email,
      password: form.password,
    })

    // Redirect based on user role
    if (authStore.isSuperAdmin) {
      router.push('/admin/dashboard')
    } else if (authStore.condominiumAccess.length > 0) {
      // Redirect to the first condominium the user has access to
      const firstCondominium = authStore.condominiumAccess[0]
      router.push(`/admin/condominiums/${firstCondominium.condominiumId}`)
    } else {
      // User has no condominium access
      error.value = 'No tienes acceso a ningún condominio'
      await authStore.logout()
    }
  } catch (err: any) {
    console.error('Login error:', err)
    console.error('Error response:', err.response)
    error.value = err.response?.data?.message || err.message || 'Error al iniciar sesión'
  } finally {
    loading.value = false
  }
}

async function loginWithDemo(email: string, password: string) {
  form.email = email
  form.password = password
  await handleLogin()
}
</script>