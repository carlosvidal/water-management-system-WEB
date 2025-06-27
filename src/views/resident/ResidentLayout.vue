<template>
  <div class="min-h-screen bg-gray-100">
    <!-- Sidebar -->
    <div class="fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform -translate-x-full lg:translate-x-0 lg:static lg:inset-0 transition duration-200 ease-in-out" :class="{ 'translate-x-0': sidebarOpen }">
      <div class="flex items-center justify-center h-16 bg-water-600">
        <span class="text-white text-xl font-bold">AquaFlow</span>
      </div>
      
      <nav class="mt-8">
        <div class="px-2 space-y-1">
          <router-link
            to="/resident/dashboard"
            class="group flex items-center px-2 py-2 text-sm font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-gray-900"
            :class="{ 'bg-gray-100 text-gray-900': $route.path === '/resident/dashboard' }"
          >
            <HomeIcon class="mr-3 h-5 w-5" />
            Mi Dashboard
          </router-link>
          
          <router-link
            to="/resident/consumption"
            class="group flex items-center px-2 py-2 text-sm font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-gray-900"
            :class="{ 'bg-gray-100 text-gray-900': $route.path === '/resident/consumption' }"
          >
            <ChartBarIcon class="mr-3 h-5 w-5" />
            Mi Consumo
          </router-link>
          
          <router-link
            to="/resident/billing"
            class="group flex items-center px-2 py-2 text-sm font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-gray-900"
            :class="{ 'bg-gray-100 text-gray-900': $route.path === '/resident/billing' }"
          >
            <CurrencyDollarIcon class="mr-3 h-5 w-5" />
            Facturación
          </router-link>
        </div>
      </nav>
    </div>

    <!-- Mobile sidebar overlay -->
    <div v-if="sidebarOpen" class="fixed inset-0 z-40 lg:hidden">
      <div class="fixed inset-0 bg-gray-600 bg-opacity-75" @click="sidebarOpen = false"></div>
    </div>

    <!-- Main content -->
    <div class="lg:pl-64 flex flex-col flex-1">
      <!-- Mobile header -->
      <div class="lg:hidden flex items-center justify-between bg-white border-b border-gray-200 px-4 py-3">
        <button @click="sidebarOpen = !sidebarOpen" class="text-gray-500 hover:text-gray-600">
          <Bars3Icon class="h-6 w-6" />
        </button>
        <span class="text-lg font-semibold text-gray-900">AquaFlow</span>
        <div></div>
      </div>

      <!-- Page content -->
      <main class="flex-1">
        <router-view />
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { HomeIcon, CurrencyDollarIcon, Bars3Icon, ChartBarIcon } from '@heroicons/vue/24/outline'

const sidebarOpen = ref(false)
</script>