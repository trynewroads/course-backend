# Course Backend

Backend para la gestión de tareas y autenticación de usuarios, desarrollado con NestJS, TypeORM y soporte para JWT.

## Descripción

Este proyecto proporciona una API RESTful para la gestión de tareas (CRUD), autenticación de usuarios y control de acceso mediante JWT. Incluye endpoints protegidos, logging configurable y soporte para base de datos relacional (PostgreSQL o SQLite).

## Configuración del proyecto

### Variables de entorno

El proyecto utiliza variables de entorno para su configuración. Puedes crear un archivo `.env` en la raíz del proyecto con el siguiente contenido de ejemplo:

```env
PORT=3000
DEBUG_REQUEST=true
DEFAULT_USER=admin
DEFAULT_PASS=12345678
JWT_SECRET=secretKey
ENABLE_AUTH=false
USE_DB=false
DB_HOST=localhost
DB_PORT=5432
DB_USER=todo_user
DB_PASS=todo_pass
DB_NAME=todo_db
```

### Dependencias principales

- @nestjs/common, @nestjs/core, @nestjs/config, @nestjs/typeorm
- typeorm, pg, sqlite3
- passport, passport-jwt, @nestjs/passport, @nestjs/jwt
- cookie-parser, joi

Consulta el `package.json` para ver todas las dependencias y versiones.

## Comandos útiles

Instalación de dependencias:

```bash
npm install
```

Arranque del proyecto:

```bash
# Desarrollo
npm run start:dev

# Producción
npm run build
npm run start:prod
```

Ejecución de tests:

```bash
# Unit tests
npm run test

# End-to-end tests
npm run test:e2e
```

## Endpoints principales

- `/auth/login` — Login de usuario (devuelve JWT en cookie)
- `/auth/me` — Perfil del usuario autenticado
- `/tasks` — CRUD de tareas (protegido)

La documentación Swagger está disponible en `/docs` una vez arrancado el servidor.

## Uso con Docker

La imagen oficial del backend está disponible en GitHub Packages: https://github.com/trynewroads/course-backend/pkgs/container/course-backend

### Arrancar una instancia simple

```bash
docker run --rm \
	-p 3000:3000 \
	-e PORT=3000 \
	-e DEFAULT_USER=admin \
	-e DEFAULT_PASS=12345678 \
	-e JWT_SECRET=secretKey \
	ghcr.io/trynewroads/course-backend:latest
```

Puedes añadir más variables de entorno según tu configuración.

### Uso con Docker Compose

Ejemplo de `docker-compose.yml`:

```yaml
version: '3.8'
services:
	backend:
		image: ghcr.io/trynewroads/course-backend:latest
		ports:
			- "3000:3000"
		environment:
			PORT: 3000
			DEFAULT_USER: admin
			DEFAULT_PASS: 12345678
			JWT_SECRET: secretKey
			ENABLE_AUTH: 'true'
			USE_DB: 'false' # o 'true' si usas base de datos
			# ...otras variables
		# volumes:
		#   - ./data:/app/data
```

---

Desarrollado con NestJS.

- Visualize your application graph and interact with the NestJS application in real-time using [NestJS Devtools](https://devtools.nestjs.com).
- Need help with your project (part-time to full-time)? Check out our official [enterprise support](https://enterprise.nestjs.com).
- To stay in the loop and get updates, follow us on [X](https://x.com/nestframework) and [LinkedIn](https://linkedin.com/company/nestjs).
- Looking for a job, or have a job to offer? Check out our official [Jobs board](https://jobs.nestjs.com).
