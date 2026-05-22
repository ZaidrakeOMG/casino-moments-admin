# Casino Moments Admin

Aplicación Astro separada para consultar listas de invitados usando el ID de fiesta generado en `casino-lista-publica`.

## Instalación

```bash
npm install
copy .env.example .env
npm run dev
```

Abre:

```txt
http://localhost:4322
```

## Variables

```env
SUPABASE_URL=https://TU-PROYECTO.supabase.co
SUPABASE_SERVICE_ROLE_KEY=TU_SERVICE_ROLE_KEY
ADMIN_PIN=1234
PUBLIC_APP_NAME=Casino Moments Admin
```

`SUPABASE_URL` debe ir sin `/rest/v1/`.

## Funciones

- Consulta lista por ID de fiesta
- Protege la consulta con PIN
- Busca por nombre, familia, teléfono o mesa
- Agrupa por mesas si la fiesta usa mesas
- Muestra lista general si la fiesta no usa mesas
- Marca asistencia
- Exporta a CSV
- Muestra total de registros y total de personas
