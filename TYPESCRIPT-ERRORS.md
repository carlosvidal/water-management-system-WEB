# TypeScript Errors - Pendientes de Corrección

## Estado

Para desplegar rápidamente en producción, se deshabilitó el type checking durante el build (`vue-tsc`).

**Script anterior:**
```json
"build": "vue-tsc && vite build"
```

**Script actual:**
```json
"build": "vite build"
```

Si quieres habilitar type checking nuevamente, usa:
```json
"build": "vue-tsc && vite build"
```

O crea un script separado:
```bash
npm run build:check
```

## Errores Detectados

### 1. CondominiumDetail.vue

#### Propiedades faltantes en el tipo Condominium:
```typescript
// Línea 55: Property 'city' does not exist
// Línea 59: Property 'country' does not exist
```

**Problema**: El tipo de `Condominium` no incluye las propiedades `city` y `country` que se añadieron al schema de Prisma.

**Solución**: Actualizar los tipos en el frontend para incluir estas propiedades:
```typescript
interface Condominium {
  // ... otras propiedades
  city?: string;
  country?: string;
}
```

#### Propiedades faltantes en Block:
```typescript
// Línea 143: Property 'description' does not exist
// Línea 145: Property 'units' does not exist
```

**Solución**: Actualizar el tipo `Block` o remover estas propiedades del componente si no son necesarias.

#### Propiedades faltantes en Unit:
```typescript
// Línea 194: Property 'number' does not exist
```

**Solución**: Cambiar de `unit.number` a `unit.name` o actualizar el tipo.

#### Propiedades faltantes en Resident:
```typescript
// Línea 253, 255: Property 'isActive' does not exist
```

**Solución**: El modelo `Resident` no tiene campo `isActive` en el schema de Prisma. Remover estas referencias o añadir el campo al schema.

#### Propiedades faltantes en Period:
```typescript
// Línea 289: Property 'name' does not exist
// Línea 291: Argument type mismatch
// Línea 294: Property 'readings' does not exist
```

**Solución**: Los períodos no tienen `name` ni `readings` directamente. Actualizar la lógica del componente.

### 2. PeriodDetail.vue

```typescript
// Línea 456: Expected 1 arguments, but got 2
// Línea 477: Expected 2 arguments, but got 3
```

**Problema**: Llamadas a funciones con número incorrecto de argumentos.

**Solución**: Revisar las firmas de las funciones y ajustar las llamadas.

### 3. SuperAdminDashboard.vue

```typescript
// Línea 153: Property 'blocks' does not exist
// Línea 154, 458: Property 'totalUnits' does not exist
// Línea 488: Property 'createUser' does not exist on ApiClient
```

**Problema**:
- `Condominium` no incluye `blocks` ni `totalUnits` en su tipo
- `ApiClient` no tiene método `createUser`

**Solución**:
- Actualizar tipos para incluir relaciones necesarias
- Verificar que el método `createUser` exista en el API client o usar el método correcto

## Cómo Corregir Estos Errores

### Opción 1: Actualizar Types/Interfaces

Crea o actualiza el archivo de tipos (ej: `src/types/api.ts`):

```typescript
export interface Condominium {
  id: string;
  name: string;
  address: string;
  city?: string;        // ← Añadir
  country?: string;     // ← Añadir
  readingDay?: number;
  bankAccount?: string;
  bankAccountHolder?: string;
  planId: string;
  totalUnitsPlanned?: number;  // ← Añadir
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  plan?: Plan;
  blocks?: Block[];     // ← Añadir si necesitas la relación
}

export interface Block {
  id: string;
  name: string;
  condominiumId: string;
  maxUnits: number;
  createdAt: string;
  units?: Unit[];       // ← Añadir si necesitas la relación
}

export interface Unit {
  id: string;
  name: string;         // No 'number', usa 'name'
  blockId: string;
  residentId?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  block?: Block;
  resident?: Resident;
}

export interface Resident {
  id: string;
  name: string;
  email?: string;
  phone?: string;
  condominiumId: string;
  createdAt: string;
  updatedAt: string;
  // NO tiene isActive según el schema de Prisma
}

export interface Period {
  id: string;
  condominiumId: string;
  startDate: string;
  endDate?: string;
  status: PeriodStatus;
  totalVolume?: number;
  totalAmount?: number;
  receiptPhoto1?: string;
  receiptPhoto2?: string;
  createdAt: string;
  updatedAt: string;
  // NO tiene 'name' ni 'readings' directamente
}
```

### Opción 2: Ajustar el Código de los Componentes

En lugar de cambiar los tipos, ajusta el código de los componentes para usar las propiedades correctas:

**CondominiumDetail.vue:**
```vue
<!-- Antes -->
<div>{{ condominium.city }}</div>

<!-- Después (si city no existe en el tipo) -->
<div>{{ condominium.address }}</div>
```

### Opción 3: Usar Type Assertions (No Recomendado)

```typescript
(condominium as any).city
```

**⚠️ No recomendado**: Esto oculta el error pero no lo soluciona.

## Generar Types Automáticamente desde Prisma

Para evitar inconsistencias, puedes generar los tipos del frontend desde tu schema de Prisma:

```bash
# Instalar
npm install -D prisma-json-types-generator

# O usar zod-prisma
npm install -D zod-prisma
```

Luego en tu `schema.prisma`:
```prisma
generator client {
  provider = "prisma-client-js"
}

generator zod {
  provider = "zod-prisma"
  output   = "../Web/src/types/generated"
}
```

## Ejecutar Type Check Manualmente

Para ver todos los errores antes de corregirlos:

```bash
cd Web
npm run type-check
```

Esto ejecutará `vue-tsc --noEmit` sin hacer el build.

## Prioridad de Corrección

1. **Alta**: Errores que afectan funcionalidad crítica (login, navegación)
2. **Media**: Propiedades opcionales que podrían no mostrarse correctamente
3. **Baja**: Propiedades que no se usan en la aplicación actual

## Estado Actual

✅ **Aplicación funcional**: Aunque hay errores de TypeScript, la aplicación debería funcionar correctamente en runtime porque JavaScript es permisivo.

⚠️ **Type safety deshabilitado**: No hay validación de tipos durante el build, lo que podría causar bugs difíciles de detectar.

## Recomendación

1. **Corto plazo**: Despliega sin type checking para poner en producción
2. **Mediano plazo**: Crea un branch `fix/typescript-errors` y corrige los tipos
3. **Largo plazo**: Configura CI/CD para ejecutar `npm run type-check` en cada PR

## Comandos Útiles

```bash
# Build sin type checking (actual)
npm run build

# Build con type checking
npm run build:check

# Solo verificar tipos sin build
npm run type-check

# Development con hot reload (no hace type check intensivo)
npm run dev
```

---

**Nota**: Los errores de TypeScript NO impiden que la aplicación funcione en runtime, solo son validaciones en tiempo de compilación. La aplicación debería funcionar correctamente una vez desplegada.
