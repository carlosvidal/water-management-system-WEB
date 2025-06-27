<template>
  <div class="min-h-screen bg-white">
    <!-- Navigation -->
    <nav class="bg-white shadow-sm border-b border-gray-200">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16">
          <div class="flex items-center">
            <div class="flex-shrink-0 flex items-center">
              <span class="text-2xl font-bold text-water-600">AquaFlow</span>
            </div>
          </div>
          <div class="flex items-center space-x-4">
            <router-link
              to="/pricing"
              class="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
            >
              Precios
            </router-link>
            <router-link
              to="/login"
              class="bg-water-600 hover:bg-water-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
            >
              Iniciar Sesión
            </router-link>
          </div>
        </div>
      </div>
    </nav>

    <!-- Hero Section -->
    <section class="relative bg-gradient-to-br from-water-50 to-blue-50 overflow-hidden">
      <div class="max-w-7xl mx-auto">
        <div class="relative z-10 pb-8 sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
          <main class="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
            <div class="sm:text-center lg:text-left">
              <h1 class="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                <span class="block xl:inline">Gestión inteligente</span>
                <span class="block text-water-600 xl:inline">del agua en condominios</span>
              </h1>
              <p class="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                Automatiza el registro de lecturas, cálculo de consumos y generación de facturas. 
                Optimiza la gestión del agua en tu condominio con nuestra plataforma integral.
              </p>
              <div class="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                <div class="rounded-md shadow">
                  <router-link
                    to="/login"
                    class="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-water-600 hover:bg-water-700 md:py-4 md:text-lg md:px-10 transition-colors"
                  >
                    Comenzar Ahora
                  </router-link>
                </div>
                <div class="mt-3 sm:mt-0 sm:ml-3">
                  <a
                    href="#features"
                    class="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-water-700 bg-water-100 hover:bg-water-200 md:py-4 md:text-lg md:px-10 transition-colors"
                  >
                    Ver Características
                  </a>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
      <div class="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
        <div class="h-56 w-full bg-gradient-to-br from-water-400 to-blue-500 sm:h-72 md:h-96 lg:w-full lg:h-full flex items-center justify-center">
          <div class="text-white text-center">
            <!-- Placeholder for illustration -->
            <div class="w-64 h-64 mx-auto bg-white/20 rounded-full flex items-center justify-center">
              <svg class="w-32 h-32" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M5 2a1 1 0 011 1v1h1a1 1 0 010 2H6v1a1 1 0 01-2 0V6H3a1 1 0 010-2h1V3a1 1 0 011-1zm0 10a1 1 0 011 1v1h1a1 1 0 110 2H6v1a1 1 0 11-2 0v-1H3a1 1 0 110-2h1v-1a1 1 0 011-1zM12 2a1 1 0 01.967.744L14.146 7.2 17.5 9.134a1 1 0 010 1.732L14.146 12.8l-1.179 4.456a1 1 0 01-1.934 0L9.854 12.8 6.5 10.866a1 1 0 010-1.732L9.854 7.2l1.179-4.456A1 1 0 0112 2z" clip-rule="evenodd" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section id="features" class="py-12 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="lg:text-center">
          <h2 class="text-base text-water-600 font-semibold tracking-wide uppercase">Características</h2>
          <p class="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Una solución completa para la gestión del agua
          </p>
          <p class="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
            Desde el registro de lecturas hasta la facturación automática, todo en una sola plataforma.
          </p>
        </div>

        <div class="mt-10">
          <dl class="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
            <div class="relative">
              <dt>
                <div class="absolute flex items-center justify-center h-12 w-12 rounded-md bg-water-500 text-white">
                  <!-- Reading icon -->
                  <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                  </svg>
                </div>
                <p class="ml-16 text-lg leading-6 font-medium text-gray-900">Registro Digital de Lecturas</p>
              </dt>
              <dd class="mt-2 ml-16 text-base text-gray-500">
                Aplicación móvil con OCR para registrar lecturas de medidores de forma rápida y precisa.
              </dd>
            </div>

            <div class="relative">
              <dt>
                <div class="absolute flex items-center justify-center h-12 w-12 rounded-md bg-water-500 text-white">
                  <!-- Calculator icon -->
                  <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                </div>
                <p class="ml-16 text-lg leading-6 font-medium text-gray-900">Cálculo Automático</p>
              </dt>
              <dd class="mt-2 ml-16 text-base text-gray-500">
                Calcula automáticamente consumos individuales y distribución de áreas comunes.
              </dd>
            </div>

            <div class="relative">
              <dt>
                <div class="absolute flex items-center justify-center h-12 w-12 rounded-md bg-water-500 text-white">
                  <!-- Chart icon -->
                  <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <p class="ml-16 text-lg leading-6 font-medium text-gray-900">Reportes y Analytics</p>
              </dt>
              <dd class="mt-2 ml-16 text-base text-gray-500">
                Dashboards interactivos con métricas de consumo y análisis de tendencias.
              </dd>
            </div>

            <div class="relative">
              <dt>
                <div class="absolute flex items-center justify-center h-12 w-12 rounded-md bg-water-500 text-white">
                  <!-- Users icon -->
                  <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                  </svg>
                </div>
                <p class="ml-16 text-lg leading-6 font-medium text-gray-900">Multi-Usuario</p>
              </dt>
              <dd class="mt-2 ml-16 text-base text-gray-500">
                Diferentes roles y permisos para administradores, analistas y conserjes.
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </section>

    <!-- Pricing Preview -->
    <section class="bg-gray-50 py-12">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="lg:text-center">
          <h2 class="text-base text-water-600 font-semibold tracking-wide uppercase">Precios</h2>
          <p class="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Planes para cada tamaño de condominio
          </p>
        </div>
        
        <div class="mt-10 grid grid-cols-1 gap-8 md:grid-cols-3">
          <!-- Basic Plan -->
          <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 class="text-lg font-medium text-gray-900">Plan Básico</h3>
            <p class="mt-2 text-gray-500">Para condominios pequeños</p>
            <p class="mt-4">
              <span class="text-3xl font-extrabold text-gray-900">$29.99</span>
              <span class="text-base font-medium text-gray-500">/mes</span>
            </p>
            <ul class="mt-6 space-y-4">
              <li class="flex">
                <svg class="flex-shrink-0 w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                </svg>
                <span class="ml-3 text-gray-500">Hasta 50 unidades</span>
              </li>
              <li class="flex">
                <svg class="flex-shrink-0 w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                </svg>
                <span class="ml-3 text-gray-500">Registro de lecturas</span>
              </li>
              <li class="flex">
                <svg class="flex-shrink-0 w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                </svg>
                <span class="ml-3 text-gray-500">Facturación básica</span>
              </li>
            </ul>
          </div>

          <!-- Professional Plan -->
          <div class="bg-white rounded-lg shadow-sm border-2 border-water-500 p-6 relative">
            <div class="absolute top-0 right-6 -translate-y-1/2">
              <span class="bg-water-500 text-white px-3 py-1 text-sm font-medium rounded-full">Recomendado</span>
            </div>
            <h3 class="text-lg font-medium text-gray-900">Plan Profesional</h3>
            <p class="mt-2 text-gray-500">Para condominios medianos</p>
            <p class="mt-4">
              <span class="text-3xl font-extrabold text-gray-900">$79.99</span>
              <span class="text-base font-medium text-gray-500">/mes</span>
            </p>
            <ul class="mt-6 space-y-4">
              <li class="flex">
                <svg class="flex-shrink-0 w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                </svg>
                <span class="ml-3 text-gray-500">Hasta 150 unidades</span>
              </li>
              <li class="flex">
                <svg class="flex-shrink-0 w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                </svg>
                <span class="ml-3 text-gray-500">OCR y app móvil</span>
              </li>
              <li class="flex">
                <svg class="flex-shrink-0 w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                </svg>
                <span class="ml-3 text-gray-500">Analytics avanzados</span>
              </li>
            </ul>
          </div>

          <!-- Enterprise Plan -->
          <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 class="text-lg font-medium text-gray-900">Plan Empresarial</h3>
            <p class="mt-2 text-gray-500">Para condominios grandes</p>
            <p class="mt-4">
              <span class="text-3xl font-extrabold text-gray-900">$199.99</span>
              <span class="text-base font-medium text-gray-500">/mes</span>
            </p>
            <ul class="mt-6 space-y-4">
              <li class="flex">
                <svg class="flex-shrink-0 w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                </svg>
                <span class="ml-3 text-gray-500">Hasta 500 unidades</span>
              </li>
              <li class="flex">
                <svg class="flex-shrink-0 w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                </svg>
                <span class="ml-3 text-gray-500">API personalizada</span>
              </li>
              <li class="flex">
                <svg class="flex-shrink-0 w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                </svg>
                <span class="ml-3 text-gray-500">Soporte dedicado</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div class="mt-8 text-center">
          <router-link
            to="/pricing"
            class="text-water-600 hover:text-water-700 font-medium"
          >
            Ver todos los detalles de precios →
          </router-link>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="bg-water-600">
      <div class="max-w-2xl mx-auto text-center py-16 px-4 sm:py-20 sm:px-6 lg:px-8">
        <h2 class="text-3xl font-extrabold text-white sm:text-4xl">
          <span class="block">¿Listo para optimizar</span>
          <span class="block">la gestión del agua?</span>
        </h2>
        <p class="mt-4 text-lg leading-6 text-water-200">
          Únete a cientos de condominios que ya confían en AquaFlow para gestionar su consumo de agua de manera eficiente.
        </p>
        <router-link
          to="/login"
          class="mt-8 w-full inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-water-600 bg-white hover:bg-water-50 sm:w-auto transition-colors"
        >
          Comenzar prueba gratuita
        </router-link>
      </div>
    </section>

    <!-- Footer -->
    <footer class="bg-white">
      <div class="max-w-7xl mx-auto py-12 px-4 sm:px-6 md:flex md:items-center md:justify-between lg:px-8">
        <div class="flex justify-center space-x-6 md:order-2">
          <a href="#" class="text-gray-400 hover:text-gray-500">
            <span class="sr-only">Facebook</span>
            <svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path fill-rule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clip-rule="evenodd" />
            </svg>
          </a>
        </div>
        <div class="mt-8 md:mt-0 md:order-1">
          <p class="text-center text-base text-gray-400">&copy; 2024 AquaFlow Solutions. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
// Landing page component - no specific logic needed
</script>