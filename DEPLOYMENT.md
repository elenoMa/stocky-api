# 🚀 Guía de Despliegue en Render.com

## Variables de Entorno Requeridas

En tu dashboard de Render.com, asegúrate de tener estas variables de entorno:

```bash
MONGO_URI=mongodb+srv://tu-usuario:tu-password@tu-cluster.mongodb.net/tu-database
NODE_ENV=production
```

## Configuración del Servicio

- **Build Command**: `npm run build`
- **Start Command**: `npm start`
- **Health Check Path**: `/`

## Configuración en Render.com Dashboard

1. **Ve a tu servicio en Render.com**
2. **En "Settings" → "Build & Deploy":**
   - **Build Command**: `npm run build`
   - **Start Command**: `npm start`
3. **En "Environment Variables":**
   - `MONGO_URI`: Tu URI de MongoDB Atlas
   - `NODE_ENV`: `production`
4. **En "Health Check Path":** `/`

## Endpoints de Verificación

### Health Check Principal
```
GET https://tu-app.onrender.com/
```

### Health Check de la API
```
GET https://tu-app.onrender.com/api/health
```

## Solución de Problemas

### Si se queda en "Building" por más de 10 minutos:

1. **Verifica las variables de entorno** en Render.com
2. **Revisa los logs** en la consola de Render.com
3. **Asegúrate de que MongoDB esté accesible** desde Render.com
4. **Verifica que el puerto no esté hardcodeado** en el código

### Problema específico: Build Command incorrecto

**ANTES (INCORRECTO):**
- Build Command: `npm start` ❌
- Esto hace que Render.com ejecute la aplicación durante el build

**DESPUÉS (CORRECTO):**
- Build Command: `npm run build` ✅
- Start Command: `npm start` ✅
- Esto separa el proceso de build del start

### Logs esperados al iniciar:

```
🚀 Servidor corriendo en puerto 10000
📊 API disponible en /api
🔗 MongoDB conectado correctamente
```

## Comandos de Prueba

### Verificar que la API funciona:
```bash
curl https://tu-app.onrender.com/
curl https://tu-app.onrender.com/api/health
```

### Login de prueba:
```bash
curl -X POST https://tu-app.onrender.com/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@stocky.com","password":"admin123"}'
```
