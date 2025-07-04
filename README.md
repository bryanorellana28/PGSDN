# PGSDN

Este proyecto contiene un ejemplo de aplicación Next.js con un backend en Python
para realizar configuraciones SDN. La base de datos utilizada es MySQL a través de
Prisma ORM. Incluye un simple sistema de registro e inicio de sesión. Luego de
autenticarse exitosamente el usuario es redirigido a la página `/dashboard`.

## Instalación

1. Copie `.env.example` a `.env` y actualice las credenciales de la base de datos.
2. Instale las dependencias de Node:
   ```bash
   npm install
   ```
3. Ejecute las migraciones y genere el cliente Prisma (incluye la tabla de
   inventario):
   ```bash
   npx prisma migrate dev --name init
   ```
4. Inicie la aplicación:
   ```bash
   npm run dev
   ```

## Python SDN

El directorio `sdn/` contiene un script de ejemplo `controller.py` donde se
podría implementar la lógica para gestionar configuraciones en equipos de red.

## Dashboard e Inventario

Al iniciar sesión se accede al `/dashboard`, que ahora presenta un sidebar con
la opción **Inventario**. Dicha sección permite agregar, editar o eliminar
equipos registrados en la base de datos. El formulario de ingreso incluye:

- IP de gestión
- Nombre del equipo
- Sitio y rack (con unidad de rack)
- Número de serie
- Tipo de dispositivo y función (core, distribución o acceso)
- Datos adicionales como modelo, versión y fecha de instalación

Estos datos pueden ampliarse según las necesidades de la red.
