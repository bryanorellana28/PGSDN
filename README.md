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
3. Ejecute las migraciones y genere el cliente Prisma:
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
