# Catálogo de Autos API

Microservicio web hecho con Node.js y Express que recupera un catálogo básico de autos.
Cada auto tiene: **marca, modelo, año, precio y color**.

Autor: Alejandro Medina Martínez

## Cómo correrlo en local

```bash
npm install
npm start
```

El servicio queda en `http://localhost:3000`.

## Rutas

| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | `/` | Información del servicio y lista de rutas |
| GET | `/health` | Estado del servicio |
| GET | `/api/autos` | Catálogo completo de autos |
| GET | `/api/autos?marca=Nissan` | Filtra por marca (también `color` y `anio`) |
| GET | `/api/autos/:id` | Un auto por su id (404 si no existe) |

## Despliegue en Render

- Runtime: Node
- Build command: `npm install`
- Start command: `node server.js`
- Plan: Free
