<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Navigation -->
    <nav class="bg-white shadow-sm border-b border-gray-200">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16">
          <div class="flex items-center">
            <router-link to="/" class="flex-shrink-0 flex items-center">
              <span class="text-2xl font-bold text-water-600">AquaFlow</span>
            </router-link>
          </div>
          <div class="flex items-center space-x-4">
            <router-link
              to="/"
              class="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
            >
              Inicio
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

    <!-- Header -->
    <div class="bg-white">
      <div class="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <div class="text-center">
          <h1 class="text-4xl font-extrabold text-gray-900 sm:text-5xl">
            Precios simples y transparentes
          </h1>
          <p class="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
            Elige el plan perfecto para tu condominio. Todos los planes incluyen soporte técnico 
            y actualizaciones gratuitas.
          </p>
        </div>
      </div>
    </div>

    <!-- Pricing Grid -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
      <div class="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <!-- Basic Plan -->
        <div class="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div class="p-6">
            <h3 class="text-lg font-medium text-gray-900">Plan Básico</h3>
            <p class="mt-2 text-sm text-gray-500">Perfecto para condominios pequeños</p>
            <p class="mt-6">
              <span class="text-4xl font-extrabold text-gray-900">$29.99</span>
              <span class="text-base font-medium text-gray-500">/mes</span>
            </p>
            <p class="mt-2 text-sm text-gray-500">Hasta 50 unidades</p>
          </div>
          
          <div class="px-6 pb-8">
            <h4 class="text-sm font-medium text-gray-900 tracking-wide uppercase">Características incluidas</h4>
            <ul class="mt-6 space-y-4">
              <li class="flex">
                <CheckIcon class="flex-shrink-0 w-5 h-5 text-green-500" />
                <span class="ml-3 text-sm text-gray-700">Hasta 50 unidades</span>
              </li>
              <li class="flex">
                <CheckIcon class="flex-shrink-0 w-5 h-5 text-green-500" />
                <span class="ml-3 text-sm text-gray-700">Registro de lecturas digitales</span>
              </li>
              <li class="flex">
                <CheckIcon class="flex-shrink-0 w-5 h-5 text-green-500" />
                <span class="ml-3 text-sm text-gray-700">Cálculo automático de consumos</span>
              </li>
              <li class="flex">
                <CheckIcon class="flex-shrink-0 w-5 h-5 text-green-500" />
                <span class="ml-3 text-sm text-gray-700">Generación de facturas</span>
              </li>
              <li class="flex">
                <CheckIcon class="flex-shrink-0 w-5 h-5 text-green-500" />
                <span class="ml-3 text-sm text-gray-700">Reportes básicos</span>
              </li>
              <li class="flex">
                <CheckIcon class="flex-shrink-0 w-5 h-5 text-green-500" />
                <span class="ml-3 text-sm text-gray-700">Soporte por email</span>
              </li>
            </ul>
            
            <div class="mt-8">
              <router-link
                to="/login"
                class="w-full bg-gray-800 text-white hover:bg-gray-900 font-medium py-2 px-4 rounded-lg transition-colors text-center block"
              >
                Empezar con Básico
              </router-link>
            </div>
          </div>
        </div>

        <!-- Professional Plan -->
        <div class="bg-white rounded-lg shadow-lg border-2 border-water-500 overflow-hidden relative">
          <div class="absolute top-0 right-6 -translate-y-1/2">
            <span class="bg-water-500 text-white px-4 py-1 text-sm font-medium rounded-full">Más Popular</span>
          </div>
          
          <div class="p-6">
            <h3 class="text-lg font-medium text-gray-900">Plan Profesional</h3>
            <p class="mt-2 text-sm text-gray-500">Ideal para condominios medianos</p>
            <p class="mt-6">
              <span class="text-4xl font-extrabold text-gray-900">$79.99</span>
              <span class="text-base font-medium text-gray-500">/mes</span>
            </p>
            <p class="mt-2 text-sm text-gray-500">Hasta 150 unidades</p>
          </div>
          
          <div class="px-6 pb-8">
            <h4 class="text-sm font-medium text-gray-900 tracking-wide uppercase">Todo en Básico, más:</h4>
            <ul class="mt-6 space-y-4">
              <li class="flex">
                <CheckIcon class="flex-shrink-0 w-5 h-5 text-green-500" />
                <span class="ml-3 text-sm text-gray-700">Hasta 150 unidades</span>
              </li>
              <li class="flex">
                <CheckIcon class="flex-shrink-0 w-5 h-5 text-green-500" />
                <span class="ml-3 text-sm text-gray-700">App móvil con OCR</span>
              </li>
              <li class="flex">
                <CheckIcon class="flex-shrink-0 w-5 h-5 text-green-500" />
                <span class="ml-3 text-sm text-gray-700">Analytics avanzados</span>
              </li>
              <li class="flex">
                <CheckIcon class="flex-shrink-0 w-5 h-5 text-green-500" />
                <span class="ml-3 text-sm text-gray-700">Detección de anomalías</span>
              </li>
              <li class="flex">
                <CheckIcon class="flex-shrink-0 w-5 h-5 text-green-500" />
                <span class="ml-3 text-sm text-gray-700">Múltiples usuarios</span>
              </li>
              <li class="flex">
                <CheckIcon class="flex-shrink-0 w-5 h-5 text-green-500" />
                <span class="ml-3 text-sm text-gray-700">Soporte prioritario</span>
              </li>
            </ul>
            
            <div class="mt-8">
              <router-link
                to="/login"
                class="w-full bg-water-600 text-white hover:bg-water-700 font-medium py-2 px-4 rounded-lg transition-colors text-center block"
              >
                Empezar con Profesional
              </router-link>
            </div>
          </div>
        </div>

        <!-- Enterprise Plan -->
        <div class="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div class="p-6">
            <h3 class="text-lg font-medium text-gray-900">Plan Empresarial</h3>
            <p class="mt-2 text-sm text-gray-500">Para condominios grandes y complejos</p>
            <p class="mt-6">
              <span class="text-4xl font-extrabold text-gray-900">$199.99</span>
              <span class="text-base font-medium text-gray-500">/mes</span>
            </p>
            <p class="mt-2 text-sm text-gray-500">Hasta 500 unidades</p>
          </div>
          
          <div class="px-6 pb-8">
            <h4 class="text-sm font-medium text-gray-900 tracking-wide uppercase">Todo en Profesional, más:</h4>
            <ul class="mt-6 space-y-4">
              <li class="flex">
                <CheckIcon class="flex-shrink-0 w-5 h-5 text-green-500" />
                <span class="ml-3 text-sm text-gray-700">Hasta 500 unidades</span>
              </li>
              <li class="flex">
                <CheckIcon class="flex-shrink-0 w-5 h-5 text-green-500" />
                <span class="ml-3 text-sm text-gray-700">API personalizada</span>
              </li>
              <li class="flex">
                <CheckIcon class="flex-shrink-0 w-5 h-5 text-green-500" />
                <span class="ml-3 text-sm text-gray-700">Integraciones avanzadas</span>
              </li>
              <li class="flex">
                <CheckIcon class="flex-shrink-0 w-5 h-5 text-green-500" />
                <span class="ml-3 text-sm text-gray-700">Reportes personalizados</span>
              </li>
              <li class="flex">
                <CheckIcon class="flex-shrink-0 w-5 h-5 text-green-500" />
                <span class="ml-3 text-sm text-gray-700">Soporte dedicado 24/7</span>
              </li>
              <li class="flex">
                <CheckIcon class="flex-shrink-0 w-5 h-5 text-green-500" />
                <span class="ml-3 text-sm text-gray-700">Gestor de cuenta asignado</span>
              </li>
            </ul>
            
            <div class="mt-8">
              <router-link
                to="/login"
                class="w-full bg-gray-800 text-white hover:bg-gray-900 font-medium py-2 px-4 rounded-lg transition-colors text-center block"
              >
                Empezar con Empresarial
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- FAQ Section -->
    <div class="bg-white">
      <div class="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <div class="lg:grid lg:grid-cols-3 lg:gap-8">
          <div>
            <h2 class="text-3xl font-extrabold text-gray-900">Preguntas Frecuentes</h2>
            <p class="mt-4 text-lg text-gray-500">
              ¿No encuentras la respuesta que buscas? 
              <a href="#" class="font-medium text-water-600 hover:text-water-500">
                Contáctanos
              </a>
            </p>
          </div>
          <div class="mt-12 lg:mt-0 lg:col-span-2">
            <dl class="space-y-12">
              <div>
                <dt class="text-lg leading-6 font-medium text-gray-900">
                  ¿Puedo cambiar de plan en cualquier momento?
                </dt>
                <dd class="mt-2 text-base text-gray-500">
                  Sí, puedes actualizar o cambiar tu plan en cualquier momento desde tu panel de administración. 
                  Los cambios se aplicarán inmediatamente y se prorrateará la facturación.
                </dd>
              </div>

              <div>
                <dt class="text-lg leading-6 font-medium text-gray-900">
                  ¿Ofrecen período de prueba gratuito?
                </dt>
                <dd class="mt-2 text-base text-gray-500">
                  Sí, todos los planes incluyen un período de prueba gratuito de 14 días. 
                  No necesitas tarjeta de crédito para comenzar.
                </dd>
              </div>

              <div>
                <dt class="text-lg leading-6 font-medium text-gray-900">
                  ¿Qué sucede si excedo el límite de unidades?
                </dt>
                <dd class="mt-2 text-base text-gray-500">
                  Te notificaremos cuando te acerques al límite y podrás actualizar tu plan fácilmente. 
                  El sistema nunca se desactivará abruptamente.
                </dd>
              </div>

              <div>
                <dt class="text-lg leading-6 font-medium text-gray-900">
                  ¿Incluyen soporte técnico?
                </dt>
                <dd class="mt-2 text-base text-gray-500">
                  Todos los planes incluyen soporte técnico. El Plan Básico tiene soporte por email, 
                  el Profesional incluye soporte prioritario, y el Empresarial incluye soporte dedicado 24/7.
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </div>

    <!-- Footer -->
    <footer class="bg-gray-800">
      <div class="max-w-7xl mx-auto py-12 px-4 sm:px-6 md:flex md:items-center md:justify-between lg:px-8">
        <div class="mt-8 md:mt-0">
          <p class="text-center text-base text-gray-400">&copy; 2024 AquaFlow Solutions. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { CheckIcon } from '@heroicons/vue/24/solid'
</script>