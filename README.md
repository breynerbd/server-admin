# KinalSport Admin API

## Descripción
KinalSport es un sistema de administración para canchas deportivas, diseñado para gestionar **campos**, **torneos**, **equipos** y **reservas** de manera eficiente. Permite crear, actualizar, activar/desactivar y consultar información, gestionar torneos y reservas, con control de errores, validaciones y manejo de imágenes en la nube.

## Tecnologías utilizadas
- Node.js
- Express.js
- MongoDB & Mongoose
- Cloudinary
- Express Validator
- Multer & Multer-Storage-Cloudinary
- Helmet
- CORS
- Morgan
- Rate Limit
- dotenv

## Dependencias

### Dependencias principales
```json
{
  "express": "^4.18.2",
  "mongoose": "^7.5.0",
  "dotenv": "^16.3.1",
  "cloudinary": "^1.38.1",
  "multer": "^1.4.5-lts.1",
  "multer-storage-cloudinary": "^4.0.0",
  "express-validator": "^7.0.1",
  "helmet": "^7.0.0",
  "cors": "^2.8.5",
  "morgan": "^1.10.0",
  "uuid": "^9.0.0",
  "express-rate-limit": "^7.1.0"
}
Dependencias de desarrollo
{
  "nodemon": "^3.0.1"
}
Base URL
http://localhost:3001/kinalSportsAdmin/v1
Endpoints
Campos deportivos (Fields)
Obtener todos los campos

GET /fields?page=1&limit=10&isActive=true
Obtener campo por ID

GET /fields/:id
Crear campo

POST /fields
Body (JSON):

{
  "fieldName": "Cancha Central",
  "fieldType": "NATURAL",
  "capacity": "FUTBOL_11",
  "pricePerHour": 50,
  "description": "Cancha principal de césped natural."
}
Actualizar campo

PUT /fields/:id
Body (JSON):

{
  "fieldName": "Cancha Secundaria",
  "pricePerHour": 40,
  "description": "Césped natural, iluminación nocturna."
}
Activar campo

PUT /fields/:id/activate
Desactivar campo

PUT /fields/:id/deactivate
Torneos (Tournaments)
Obtener todos los torneos

GET /tournaments?page=1&limit=10&isActive=true
Obtener torneo por ID

GET /tournaments/:id
Crear torneo

POST /tournaments
Body (JSON):

{
  "tournamentName": "Torneo Primavera",
  "description": "Torneo abierto de fútbol 7.",
  "startDate": "2026-03-01",
  "endDate": "2026-03-15",
  "maxTeams": 8
}
Actualizar torneo

PUT /tournaments/:id
Body (JSON):

{
  "tournamentName": "Torneo Verano",
  "maxTeams": 12
}
Activar torneo

PUT /tournaments/:id/activate
Desactivar torneo

PUT /tournaments/:id/deactivate
Equipos (Teams)
Obtener todos los equipos

GET /teams
Obtener equipo por ID

GET /teams/:id
Crear equipo

POST /teams
Body (JSON):

{
  "teamName": "Leones FC",
  "description": "Equipo competitivo de fútbol 7",
  "captain": "64f5d6a1a2b3c1d2e3f4g5j",
  "members": ["64f5d6a1a2b3c1d2e3f4g5k", "64f5d6a1a2b3c1d2e3f4g5l"],
  "level": "INTERMEDIO"
}
Actualizar equipo

PUT /teams/:id
Body (JSON):

{
  "teamName": "Tigres FC",
  "level": "AVANZADO"
}
Activar equipo

PUT /teams/:id/activate
Desactivar equipo

PUT /teams/:id/deactivate
Reservas (Reservations)
Obtener todas las reservas

GET /reservations?page=1&limit=10&fieldId=64f5d6a1a2b3c1d2e3f4g5h&teamId=64f5d6a1a2b3c1d2e3f4g5i
Obtener reserva por ID

GET /reservations/:id
Crear reserva

POST /reservations
Body (JSON):

{
  "field": "64f5d6a1a2b3c1d2e3f4g5h",
  "team": "64f5d6a1a2b3c1d2e3f4g5i",
  "date": "2026-03-05",
  "startTime": "15:00",
  "endTime": "16:30",
  "totalPrice": 50
}
Actualizar reserva

PUT /reservations/:id
Body (JSON):

{
  "startTime": "16:00",
  "endTime": "17:30"
}
Cancelar reserva

PUT /reservations/:id/cancel