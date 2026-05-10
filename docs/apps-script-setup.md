# Conectar formularios del Reto Nacional con Google Sheets

Los formularios `/reto-nacional/inscripcion` y `/reto-nacional/entrega` ya están construidos. Para que las respuestas se guarden en Google Sheets, hay que crear un Apps Script Web App y conectar la URL al sitio.

## Paso 1 — Crear las hojas

1. Ir a [sheets.google.com](https://sheets.google.com) y crear **dos hojas**:
   - `Reto CSI 2026 — Inscripciones`
   - `Reto CSI 2026 — Entregas`
2. En cada hoja, crea la fila de encabezado:

   **Inscripciones (fila 1):**
   ```
   timestamp · equipo · escuela · region · m1_nombre · m1_apellido · m1_email_inst · m1_email_personal · m1_telefono · m2_nombre · m2_apellido · m2_email_inst · m2_email_personal · m2_telefono · m3_nombre · m3_apellido · m3_email_inst · m3_email_personal · m3_telefono
   ```

   **Entregas (fila 1):**
   ```
   timestamp · equipo · proyecto · tinkercad · video · descripcion
   ```

## Paso 2 — Crear Apps Script Web App

1. En la misma hoja: **Extensiones → Apps Script**.
2. Borra el contenido y pega:

```js
// Reto CSI 2026 — handler universal
const SHEETS = {
  inscripcion: "Hoja 1", // nombre de la pestaña en el Sheet de Inscripciones
  entrega: "Hoja 1",     // nombre de la pestaña en el Sheet de Entregas
};

function doPost(e) {
  try {
    const body = JSON.parse(e.postData.contents);
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheetName = SHEETS[body.form];
    if (!sheetName) throw new Error("form desconocido");
    const sheet = ss.getSheetByName(sheetName);
    const ts = new Date().toISOString();

    if (body.form === "inscripcion") {
      const m = body.integrantes;
      sheet.appendRow([
        ts,
        body.equipo.nombre, body.equipo.escuela, body.equipo.region,
        m[0].nombre, m[0].apellido, m[0].emailInstitucional, m[0].emailPersonal, m[0].telefono,
        m[1].nombre, m[1].apellido, m[1].emailInstitucional, m[1].emailPersonal, m[1].telefono,
        m[2].nombre, m[2].apellido, m[2].emailInstitucional, m[2].emailPersonal, m[2].telefono,
      ]);
    } else if (body.form === "entrega") {
      sheet.appendRow([
        ts,
        body.equipoNombre, body.proyectoNombre,
        body.tinkercadUrl, body.videoUrl, body.descripcion,
      ]);
    }

    return ContentService.createTextOutput(JSON.stringify({ ok: true })).setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({ ok: false, error: String(err) })).setMimeType(ContentService.MimeType.JSON);
  }
}
```

3. Guarda y selecciona **Implementar → Nueva implementación**.
4. Tipo: **Aplicación web**. Acceso: **Cualquier usuario**. Despliega.
5. Copia la URL de la implementación (termina en `/exec`).

> Si quieres dos hojas separadas (recomendado), crea **dos** Apps Scripts independientes — uno por cada hoja — y usa una URL para cada formulario.

## Paso 3 — Configurar variables de entorno en Vercel

En el dashboard de Vercel, **Settings → Environment Variables**:

| Variable | Valor |
|---|---|
| `RETO_INSCRIPCION_URL` | URL del Apps Script de Inscripciones |
| `RETO_ENTREGA_URL` | URL del Apps Script de Entregas |

Después de guardar, redespliega (o haz un push) y los formularios empezarán a guardar las respuestas.

## Verificación

Puedes probar localmente:

```bash
curl -X POST http://localhost:3000/api/reto/inscripcion \
  -H "Content-Type: application/json" \
  -d '{"equipo":{"nombre":"Test","escuela":"Test","region":"Panamá Centro"},"integrantes":[{"nombre":"a","apellido":"b","emailInstitucional":"a@b.pa","emailPersonal":"","telefono":"+507"},{"nombre":"a","apellido":"b","emailInstitucional":"a@b.pa","emailPersonal":"","telefono":"+507"},{"nombre":"a","apellido":"b","emailInstitucional":"a@b.pa","emailPersonal":"","telefono":"+507"}]}'
```

Si las variables no están configuradas, el endpoint devuelve `{ ok: true, configured: false }` y registra el cuerpo en logs — útil para verificar el diseño antes de conectar las hojas.
