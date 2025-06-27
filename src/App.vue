<template>
  <router-view />
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()

onMounted(() => {
  // Try to restore authentication from localStorage
  try {
    authStore.initializeAuth()
  } catch (error) {
    console.error('Error initializing auth:', error)
  }
})
</script>