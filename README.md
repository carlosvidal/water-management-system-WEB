# Water Management System - Web Frontend

Una aplicación web moderna para la gestión de consumo de agua en condominios, construida con Vue 3, Tailwind CSS y TypeScript.

## 🚀 Características

- **Panel de Super Administrador**: Gestión de planes, condominios y usuarios
- **Dashboard de Condominio**: Administración completa de unidades y residentes
- **Portal de Residentes**: Consulta de estados de cuenta y consumos
- **Landing Page**: Información del producto y planes de suscripción
- **Diseño Responsive**: Optimizado para desktop, tablet y móvil
- **Interfaz Moderna**: Diseño limpio con Tailwind CSS y Headless UI
- **Autenticación Segura**: JWT con manejo de roles y permisos

## 📋 Requisitos

- Node.js 18+
- npm o yarn
- Backend API ejecutándose

## 🛠️ Instalación

1. **Clonar y navegar al directorio Web**
   ```bash
   cd water-management-system/Web
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   ```

3. **Configurar variables de entorno**
   ```bash
   cp .env.example .env.local
   ```
   
   Editar `.env.local`:
   ```env
   VITE_API_BASE_URL=http://localhost:3000/api
   VITE_APP_NAME=AquaFlow
   ```

4. **Iniciar el servidor de desarrollo**
   ```bash
   npm run dev
   ```

   La aplicación estará disponible en `http://localhost:5173`

## 🏗️ Estructura del Proyecto

```
src/
├── components/          # Componentes reutilizables
│   ├── charts/         # Componentes de gráficos
│   ├── forms/          # Formularios y campos
│   └── ui/             # Elementos básicos de UI
├── composables/        # Lógica reutilizable de Vue
├── router/             # Configuración de rutas
├── stores/             # Estado global con Pinia
│   ├── auth.ts        # Autenticación y usuario
│   └── condominium.ts # Datos de condominios
├── types/              # Definiciones TypeScript
│   ├── api.ts         # Tipos de API
│   └── auth.ts        # Tipos de autenticación
├── utils/              # Utilidades y helpers
│   └── api.ts         # Cliente HTTP
└── views/              # Páginas principales
    ├── admin/         # Panel de super admin
    ├── auth/          # Login y registro
    ├── condominium/   # Dashboard de condominio
    ├── landing/       # Landing page y precios
    └── resident/      # Portal de residentes
```

## 🎯 Funcionalidades Principales

### Landing Page
- Presentación del producto AquaFlow
- Información de planes y precios
- Formulario de contacto
- Call-to-action para registro

### Panel de Super Administrador
- Gestión de planes de suscripción
- Administración de condominios
- Reportes y analytics globales
- Configuración del sistema

### Dashboard de Condominio
- Gestión de bloques y unidades
- Administración de residentes
- Períodos de lectura y facturación
- Reportes de consumo
- Estados de cuenta

### Portal de Residentes
- Consulta de consumos históricos
- Estados de cuenta detallados
- Notificaciones importantes
- Perfil y configuración

## 🔐 Autenticación y Roles

**Roles disponibles:**
- **Super Admin**: Acceso completo al sistema
- **Admin**: Administración de su condominio
- **Analyst**: Reportes y consultas
- **Editor**: Gestión de datos básicos
- **Resident**: Portal personal

**Flujo de autenticación:**
1. Login con email/password
2. Verificación JWT con backend
3. Redirección según rol del usuario
4. Refresh automático de tokens

## 📱 Interfaz Responsive

**Breakpoints:**
- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

**Características responsive:**
- Navigation adaptable (hamburger menu en móvil)
- Tablas con scroll horizontal en dispositivos pequeños
- Cards apilables en móvil
- Modales adaptados a pantalla

## 🎨 Sistema de Diseño

**Colores principales:**
- **Primary**: Azul (#3B82F6)
- **Secondary**: Gris (#6B7280)
- **Success**: Verde (#10B981)
- **Warning**: Amarillo (#F59E0B)
- **Error**: Rojo (#EF4444)

**Tipografía:**
- **Font Family**: Inter (via Google Fonts)
- **Tamaños**: text-sm, text-base, text-lg, text-xl, text-2xl

## 📊 Gestión de Estado

**Pinia Stores:**

1. **Auth Store** (`stores/auth.ts`):
   - Usuario actual
   - Estado de autenticación
   - Permisos y roles
   - Login/logout

2. **Condominium Store** (`stores/condominium.ts`):
   - Datos del condominio actual
   - Unidades y residentes
   - Períodos y lecturas

## 🔄 Comunicación con API

**Cliente HTTP** (`utils/api.ts`):
- Interceptores para autenticación
- Manejo automático de errores
- Refresh de tokens
- Loading states

**Ejemplo de uso:**
```typescript
import { api } from '@/utils/api'

// GET request
const condominiums = await api.get('/condominiums')

// POST request
const newResident = await api.post('/residents', {
  name: 'Juan Pérez',
  email: 'juan@email.com'
})
```

## 🧪 Scripts Disponibles

```bash
# Desarrollo
npm run dev

# Build para producción
npm run build

# Preview del build
npm run preview

# Type checking
npm run type-check
```

## 🚀 Deployment

### Build de Producción

```bash
# Generar build
npm run build

# Los archivos estarán en dist/
```

### Variables de Entorno

| Variable | Descripción | Ejemplo |
|----------|-------------|---------|
| `VITE_API_BASE_URL` | URL del backend API | `https://api.aquaflow.com/api` |
| `VITE_APP_NAME` | Nombre de la aplicación | `AquaFlow` |

### Hosting Recomendado

- **Vercel**: Deploy automático desde Git
- **Netlify**: Ideal para SPAs
- **AWS S3 + CloudFront**: Máximo control
- **Firebase Hosting**: Integración con otros servicios

## 🔧 Desarrollo

**Comandos útiles:**
```bash
# Instalar nueva dependencia
npm install package-name

# Linting (configurar ESLint)
npm run lint

# Formatear código (configurar Prettier)
npm run format
```

**Estructura de componentes:**
```vue
<template>
  <!-- HTML template -->
</template>

<script setup lang="ts">
  // Composition API con TypeScript
</script>

<style scoped>
  /* Estilos scoped con Tailwind */
</style>
```

## 📚 Recursos Adicionales

- [Vue 3 Documentation](https://vuejs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Headless UI Vue](https://headlessui.com/vue)
- [Pinia](https://pinia.vuejs.org/)
- [Vue Router](https://router.vuejs.org/)

## 🤝 Contribución

1. Seguir las convenciones de Vue 3 Composition API
2. Usar TypeScript para type safety
3. Componentes reutilizables y modulares
4. Responsive design con Tailwind CSS
5. Optimización de performance

## 📄 Licencia

Este proyecto es parte del sistema integral Water Management System.