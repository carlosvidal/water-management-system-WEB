<template>
  <div class="min-h-screen bg-gray-100 flex">
    <!-- Sidebar -->
    <div class="fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform -translate-x-full lg:translate-x-0 lg:relative lg:flex lg:flex-col transition duration-200 ease-in-out" :class="{ 'translate-x-0': sidebarOpen }">
      <div class="flex items-center justify-center h-16 bg-water-600">
        <span class="text-white text-xl font-bold">AquaFlow Admin</span>
      </div>
      
      <nav class="mt-8">
        <div class="px-2 space-y-1">
          <router-link
            to="/admin/dashboard"
            class="group flex items-center px-2 py-2 text-sm font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-gray-900"
            :class="{ 'bg-gray-100 text-gray-900': $route.path === '/admin/dashboard' }"
          >
            <HomeIcon class="mr-3 h-5 w-5" />
            Dashboard
          </router-link>
          
          <router-link
            to="/admin/reports"
            class="group flex items-center px-2 py-2 text-sm font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-gray-900"
            :class="{ 'bg-gray-100 text-gray-900': $route.path === '/admin/reports' }"
          >
            <DocumentChartBarIcon class="mr-3 h-5 w-5" />
            Reportes
          </router-link>
        </div>
      </nav>
    </div>

    <!-- Mobile sidebar overlay -->
    <div v-if="sidebarOpen" class="fixed inset-0 z-40 lg:hidden">
      <div class="fixed inset-0 bg-gray-600 bg-opacity-75" @click="sidebarOpen = false"></div>
    </div>

    <!-- Main content -->
    <div class="flex flex-col flex-1 lg:ml-0">
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
import { HomeIcon, DocumentChartBarIcon, Bars3Icon } from '@heroicons/vue/24/outline'

const sidebarOpen = ref(false)
</script>