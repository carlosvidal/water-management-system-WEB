# 🚀 Solución Rápida - Frontend (Web)

## Problema Actual

```
npm error The `npm ci` command can only install with an existing package-lock.json
```

## ✅ Solución Implementada

### 1. Archivo `.dockerignore` Corregido

**Cambio realizado**: Removido `package-lock.json` de `.dockerignore`

El archivo `package-lock.json` es **NECESARIO** para `npm ci` y ahora se incluirá en el build.

### 2. Dockerfile Simplificado

Se creó `Dockerfile.simple` que es más compatible con Coolify.

## 📋 Pasos para Desplegar

### 1. Hacer commit de los cambios

```bash
cd Web
git add .dockerignore Dockerfile.simple
git commit -m "Fix: Include package-lock.json for Docker build"
git push origin main
```

### 2. Configurar Coolify

#### En Build Settings:

- **Build Type**: Dockerfile
- **Dockerfile Path**: `./Dockerfile.simple`
- **Port**: `80`
- **Health Check Path**: `/health`

#### En Build Arguments (MUY IMPORTANTE):

```bash
VITE_API_URL=https://tu-api-url.coolify.app/api
```

**⚠️ CRÍTICO**: Reemplaza `tu-api-url.coolify.app` con la URL real de tu API desplegada.

Ejemplo:
```bash
VITE_API_URL=https://water-api.coolify.app/api
```

#### Environment Variables (Runtime - Opcional):

No necesitas variables de entorno en runtime para el frontend, ya que todo se embebe durante el build.

### 3. Desplegar

1. Haz clic en **Deploy** en Coolify
2. Espera a que el build complete
3. Verifica los logs

## 🔍 Verificación Post-Despliegue

### 1. Health Check

```bash
curl https://tu-web-url.coolify.app/health
```

**Respuesta esperada:**
```
healthy
```

### 2. Acceder a la Aplicación

Visita: `https://tu-web-url.coolify.app`

Deberías ver la interfaz de login de AquaFlow.

### 3. Test de Conexión con API

1. Abre la aplicación en el navegador
2. Abre las DevTools (F12)
3. Ve a la pestaña **Network**
4. Intenta hacer login con:
   - Email: `admin@aquaflow.com`
   - Password: `Admin2024!`
5. Verifica que las peticiones vayan a tu API en Coolify

## 🔧 Configuración Completa en Coolify

### General Settings:
```
Name: water-management-web
Source: Git Repository
Repository: URL de tu repo Web
Branch: main
Build Type: Dockerfile
Dockerfile Path: ./Dockerfile.simple
Port: 80
```

### Build Arguments:
```bash
VITE_API_URL=https://tu-api-url.coolify.app/api
```

### Health Check:
```
Path: /health
Port: 80
Interval: 30s
```

## 🐛 Troubleshooting

### Error: "package-lock.json not found"

Verifica que hiciste commit del cambio en `.dockerignore`:

```bash
cd Web
git status
# Debe mostrar: nothing to commit, working tree clean
```

### Error: "Cannot connect to API"

1. **Verifica VITE_API_URL en Build Arguments**:
   - Debe ser la URL completa de tu API
   - Debe terminar en `/api`
   - Ejemplo: `https://water-api.coolify.app/api`

2. **Verifica CORS en el API**:
   - El API debe tener tu URL del frontend en `CORS_ORIGIN`
   - Ejemplo: `CORS_ORIGIN=https://water-web.coolify.app`

3. **Re-build el Frontend**:
   - El `VITE_API_URL` se embebe durante el build
   - Si lo cambias, debes hacer un nuevo build

### Error: "404 on page refresh"

Esto es normal en SPAs. El Dockerfile ya incluye la configuración de Nginx para manejarlo con `try_files`.

Si persiste:
1. Verifica que el archivo `index.html` esté en `/usr/share/nginx/html`
2. Revisa los logs de Nginx en Coolify

### Páginas en blanco o errores en consola

1. Abre DevTools (F12) → Console
2. Busca errores relacionados con:
   - CORS
   - 404 en recursos (JS, CSS)
   - API connection failed

## 📊 Checklist Completo

- [ ] `.dockerignore` actualizado (sin `package-lock.json`)
- [ ] Cambios commiteados y pusheados
- [ ] `VITE_API_URL` configurado en Build Arguments con URL real del API
- [ ] `CORS_ORIGIN` en el API incluye la URL del frontend
- [ ] Dockerfile Path: `./Dockerfile.simple`
- [ ] Port: `80`
- [ ] Health Check Path: `/health`
- [ ] Deploy iniciado en Coolify

## 🔄 Actualizar CORS en el API

Después de que el frontend esté desplegado:

1. Ve al servicio del API en Coolify
2. Actualiza `CORS_ORIGIN`:
   ```bash
   CORS_ORIGIN=https://tu-frontend-url.coolify.app
   ```
3. Re-despliega el API
4. Verifica que el frontend ahora pueda hacer peticiones

## 🎯 Resultado Esperado

Si todo está correcto, deberías ver en los logs de Coolify:

```
✅ npm ci completed
✅ npm run build completed
✅ Vite build successful
✅ Static files copied to nginx
✅ Docker image built successfully
✅ Container started
✅ Health check passed
🚀 Deployment successful
```

## 💡 Notas Importantes

1. **VITE_API_URL es crítico**: Se embebe durante el build, no en runtime
2. **CORS debe estar configurado**: El API debe permitir peticiones del frontend
3. **Nginx maneja el SPA routing**: Configurado automáticamente en el Dockerfile
4. **Health check simple**: Solo verifica que Nginx esté corriendo
5. **Build Arguments vs Environment Variables**:
   - Build Arguments → Se usan durante `npm run build`
   - Environment Variables → No se usan en el frontend (todo es estático)

## 🔗 Flujo Completo

```
1. Frontend hace build con VITE_API_URL
   ↓
2. Genera archivos estáticos (HTML, JS, CSS)
   ↓
3. Se copian a Nginx
   ↓
4. Nginx sirve los archivos estáticos
   ↓
5. Browser ejecuta el JS
   ↓
6. JS hace peticiones al VITE_API_URL configurado
   ↓
7. API responde si CORS está configurado correctamente
```

---

**¿Listo?** Haz commit, configura Build Arguments con la URL del API, y despliega. 🚀
