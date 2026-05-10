# Admin Setup — Daniel

El sitio incluye un panel `/admin` donde Daniel puede:

- **Recibir inscripciones del Reto Nacional** y descargarlas como CSV (abre en Excel).
- **Ver entregas de proyectos** del Reto y descargarlas.
- **Editar talleres** (título, descripción, video, quiz, objetivos).
- **Editar el calendario** (agregar/quitar/modificar fechas).

Para activarlo necesitas configurar Supabase (gratis, 5 minutos de setup).

---

## Paso 1 — Crear proyecto en Supabase

1. Entrar a [supabase.com](https://supabase.com) y crear cuenta (puedes usar GitHub).
2. **New project**:
   - Nombre: `csi-arduino`
   - Database password: cualquier contraseña segura (guárdala)
   - Region: `East US (North Virginia)` o `Central US`
   - Plan: Free
3. Espera ~2 min mientras se crea el proyecto.

## Paso 2 — Ejecutar la migración SQL

1. En el dashboard de Supabase: **SQL Editor** (icono de la izquierda).
2. **New query**, copia y pega TODO el contenido del archivo:
   ```
   supabase/migrations/0001_initial.sql
   ```
3. **Run**. Debería ejecutarse sin errores y crear las 4 tablas con datos seed.

## Paso 3 — Crear el usuario admin (Daniel)

1. En Supabase: **Authentication → Users** (icono de la izquierda).
2. **Add user → Create new user**.
3. Email: el correo de Daniel (ej: `daniel10abadi@gmail.com`).
4. Password: una contraseña segura.
5. ✅ Check "Auto confirm user".
6. **Create user**.

> Solo creas UN usuario admin (Daniel). Cualquier persona con esas credenciales tendrá acceso al panel.

## Paso 4 — Copiar las credenciales de Supabase

En Supabase: **Settings → API**. Copia 3 valores:

| Variable | Dónde está |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Project API keys → `anon` `public` |
| `SUPABASE_SERVICE_ROLE_KEY` | Project API keys → `service_role` `secret` (haz click en "Reveal") |

## Paso 5 — Configurar variables en Vercel

1. En Vercel: tu proyecto → **Settings → Environment Variables**.
2. Agrega las 3 variables del paso anterior.
3. Para cada variable, selecciona los 3 environments: **Production, Preview, Development**.
4. **Save**.
5. Ve a **Deployments** y redespliega el último (Redeploy → "Use existing Build Cache" desactivado).

## Paso 6 — Acceder al panel

Una vez desplegado, abre:

```
https://csi-arduino.vercel.app/admin/login
```

Inicia sesión con el email + contraseña de Daniel. El panel aparece.

---

## Lo que puede hacer Daniel desde el panel

### Dashboard
- Total de inscripciones, entregas, talleres y eventos del calendario
- Últimas 5 inscripciones recibidas

### Inscripciones del Reto
- Tabla completa con todos los equipos inscritos
- Click en **↓ Descargar CSV** → archivo `reto-inscripciones-AAAA-MM-DD.csv` que abre directo en Excel/Numbers/Google Sheets

### Entregas del Reto
- Cards con cada proyecto entregado, links a Tinkercad y video
- Descripción expandible
- Descarga CSV

### Talleres
- Lista de los 10 talleres
- Click en cualquier fila → editor:
  - Título, tagline, descripción
  - Nivel y tema
  - YouTube ID y URL del Quiz
  - Objetivos (agregar/quitar/editar)
  - Outcome
- Los cambios se publican inmediatamente en el sitio

### Calendario
- Tabla editable con todas las fechas
- Cambiar día, fecha texto, hora directamente
- **+ Agregar fecha** para nuevas
- **✕** para eliminar
- **Guardar cambios** persiste todo

---

## Local development (opcional)

Si quieres editar localmente con Supabase activo:

1. Crea `.env.local` en la raíz:
   ```
   NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
   SUPABASE_SERVICE_ROLE_KEY=eyJ...
   ```
2. `npm run dev` y abre `http://localhost:3000/admin`.

Si NO configuras Supabase, el sitio sigue funcionando con los datos seed estáticos. Solo el panel y los formularios del Reto requieren la base de datos.
