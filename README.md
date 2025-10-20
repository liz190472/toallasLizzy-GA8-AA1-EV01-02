# 📋 Sistema de Gestión - Toallas Lizzy

- **Proyecto:** _Comercializadora de Toallas Lizzy_
- **Curso:** _ADSO 2025_
- **Ficha:** _2983215_
- **Estudiante:** _Elizabeth Hernandez Aroca_

---

## 📋 Descripción del Proyecto

Sistema integral de gestión empresarial desarrollado con **Laravel** (Backend API RESTful) y **React** (Frontend SPA) para la administración de productos, clientes, proveedores y autenticación de usuarios. Este proyecto implementa servicios web modernos siguiendo estándares REST y mejores prácticas de desarrollo.

---

## 🎯 Objetivos del Proyecto

- Implementar una API RESTful completa siguiendo estándares REST
- Desarrollar una interfaz responsiva e intuitiva con React
- Gestionar autenticación segura de usuarios con encriptación bcrypt
- Administrar CRUD completo de Productos, Clientes y Proveedores
- Documentar todos los endpoints y validaciones de la API
- Aplicar control de versiones con Git

---

## 🛠️ Entorno Instalado y Configuración

### Componentes del Sistema

| Componente | Versión | Estado | Ubicación |
|---|---|---|---|
| **Servidor Local** | XAMPP 8.2.12-0 Linux | ✅ Instalado | `/opt/lampp/` |
| **Servidor Web** | Apache | ✅ OK | Panel XAMPP |
| **Base de Datos** | MySQL/MariaDB 5.7+ | ✅ OK | Panel XAMPP |
| **Lenguaje Backend** | PHP 8.2.12 | ✅ OK | Incluido en XAMPP |
| **Framework Backend** | Laravel 11.x | ✅ OK | Proyecto |
| **Lenguaje Frontend** | JavaScript (ES6+) | ✅ OK | Node.js |
| **Framework Frontend** | React 18.x | ✅ OK | Proyecto |
| **Runtime Frontend** | Node.js | v16.20.2+ | Sistema |
| **Administrador Paquetes** | Composer | ✅ Global | `/usr/local/bin/composer` |
| **Gestor Node** | npm | 8.19.4+ | Node.js |
| **Editor de Código** | Visual Studio Code | ✅ OK | - |
| **Control de Versiones** | Git | 2.0+ | - |

---

## 📦 Instalación Inicial

### 1. Prerequisitos

Verificar que estén instalados correctamente:

```bash
node --version        # v16.20.2 o superior
npm --version         # 8.19.4 o superior
php --version         # PHP 8.2.12
composer --version    # Latest
git --version         # git version 2.x
```

### 2. Clonar el Repositorio

```bash
cd ~/Escritorio
git clone https://github.com/liz190472/toallasLizzy-GA8-AA1-EV01-02.git
cd toallasLizzy\ \ GA8\ AA1-EV01
```

### 3. Configurar Backend (Laravel)

```bash
cd backend

# Instalar dependencias
composer install

# Copiar archivo de configuración
cp .env.example .env

# Generar clave de aplicación
php artisan key:generate
```

**Editar `.env` del backend:**

```env
APP_NAME="Toallas Lizzy"
APP_ENV=local
APP_DEBUG=true
APP_URL=http://localhost:8001

DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=toallas_lizzy
DB_USERNAME=root
DB_PASSWORD=
```

**Ejecutar migraciones:**

```bash
php artisan migrate
```

### 4. Configurar Frontend (React)

```bash
cd ../frontend

# Instalar dependencias
npm install

# Crear archivo .env si es necesario
touch .env
```

**Editar `.env` del frontend:**

```env
REACT_APP_API_URL=http://localhost:8001/api
```

---

## 🚀 Ejecutar la Aplicación

Abrir **3 terminales diferentes** en el directorio raíz del proyecto:

**Terminal 1: Iniciar XAMPP**

```bash
sudo /opt/lampp/lampp start

# Configurar alias PHP (opcional)
alias php='/opt/lampp/bin/php'
```

**Terminal 2: Iniciar Backend (Laravel)**

```bash
cd backend
php artisan serve --port=8001
```

El servidor backend estará disponible en: `http://localhost:8001`

**Terminal 3: Iniciar Frontend (React)**

```bash
cd frontend
npm start
```

El servidor frontend estará disponible en: `http://localhost:3000`

---

## 📱 Acceder a la Aplicación

1. Abrir navegador en: **`http://localhost:3000`**
2. Iniciar sesión con credenciales de prueba:
   - **Email:** `test@test.com`
   - **Contraseña:** `password`

---

## 📚 Módulos del Sistema

### 🔐 Módulo de Autenticación

Sistema seguro de inicio de sesión y registro de usuarios con validaciones y encriptación.

**Funcionalidades:**
- Autenticación mediante email y contraseña encriptada (bcrypt)
- Validación robusta de credenciales
- Registro de nuevos usuarios
- Mensajes de confirmación o error

**Endpoints:**
- `POST /api/login` - Iniciar sesión
- `POST /api/register` - Registrar nuevo usuario

---

### 📦 Módulo de Gestión de Productos

CRUD completo para administración de productos con soporte para imágenes.

**Funcionalidades:**
- Listar todos los productos
- Crear nuevo producto con imagen
- Editar información de productos
- Eliminar productos
- Buscar producto por ID

**Campos del Producto:**
- EAN (Código de barras - Único)
- Referencia
- Gramos
- Tamaño
- Color
- Valor Unitario
- Imagen del producto

**Endpoints:**
- `GET /api/productos` - Listar todos
- `POST /api/productos` - Crear producto
- `GET /api/productos/{id}` - Obtener por ID
- `PUT /api/productos/{id}` - Actualizar producto
- `DELETE /api/productos/{id}` - Eliminar producto

---

### 👥 Módulo de Gestión de Clientes

CRUD completo para administración de clientes.

**Funcionalidades:**
- Registrar nuevos clientes
- Visualizar lista de clientes
- Editar información de clientes
- Eliminar clientes

**Campos del Cliente:**
- Nombre
- Teléfono
- Cédula (Única)
- Área
- Email (Único)

**Endpoints:**
- `GET /api/clientes` - Listar todos
- `POST /api/clientes` - Crear cliente
- `GET /api/clientes/{id}` - Obtener por ID
- `PUT /api/clientes/{id}` - Actualizar cliente
- `DELETE /api/clientes/{id}` - Eliminar cliente

---

### 🏭 Módulo de Gestión de Proveedores

CRUD completo para administración de proveedores.

**Funcionalidades:**
- Registrar nuevos proveedores
- Visualizar lista de proveedores
- Editar información de proveedores
- Eliminar proveedores

**Campos del Proveedor:**
- NIT (Único)
- Nombre
- Correo Electrónico (Único)
- Número de Teléfono

**Endpoints:**
- `GET /api/proveedores` - Listar todos
- `POST /api/proveedores` - Crear proveedor
- `GET /api/proveedores/{id}` - Obtener por ID
- `PUT /api/proveedores/{id}` - Actualizar proveedor
- `DELETE /api/proveedores/{id}` - Eliminar proveedor

---

## 🔧 Comandos Útiles

### Backend (Laravel)

```bash
# Limpiar caché
php artisan cache:clear
php artisan config:clear
php artisan route:clear

# Ver rutas disponibles
php artisan route:list

# Crear migraciones
php artisan make:migration create_tabla

# Crear controladores
php artisan make:controller NombreController

# Crear modelos
php artisan make:model Nombre -m

# Ejecutar servidor en puerto diferente
php artisan serve --port=8002
```

### Frontend (React)

```bash
# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm start

# Crear compilación para producción
npm run build

# Ejecutar pruebas
npm test
```

---

## 🔐 Seguridad

- Las contraseñas se almacenan encriptadas con **bcrypt**
- Validación de datos en todas las entradas de usuario
- Mensajes de error claros sin exponer información sensible
- CORS configurado según necesidades del frontend
- Validación de tipo de datos en backend
- Campos únicos protegidos contra duplicados

---

## 📁 Estructura del Proyecto

```
toallasLizzy-GA8-AA1-EV01/
│
├── backend/                           (Laravel API)
│   ├── app/
│   │   ├── Http/Controllers/
│   │   │   ├── AuthController.php
│   │   │   ├── ProductoController.php
│   │   │   ├── ClienteController.php
│   │   │   └── ProveedorController.php
│   │   └── Models/
│   │       ├── Usuario.php
│   │       ├── Producto.php
│   │       ├── Cliente.php
│   │       └── Proveedor.php
│   ├── database/
│   │   ├── migrations/
│   │   └── seeders/
│   ├── routes/
│   │   └── api.php
│   ├── public/
│   │   └── imagenes/           (Imágenes de productos)
│   ├── .env
│   └── composer.json
│
├── frontend/                          (React SPA)
│   ├── src/
│   │   ├── components/
│   │   │   ├── Cabecera/
│   │   │   ├── PanelLateral/
│   │   │   ├── Subcabecera/
│   │   │   ├── Módulos/
│   │   │   │   ├── Clientes/
│   │   │   │   │   ├── ListaClientes.jsx
│   │   │   │   │   └── FormularioCliente.jsx
│   │   │   │   ├── Productos/
│   │   │   │   │   ├── ListaProducto.jsx
│   │   │   │   │   └── FormularioProducto.jsx
│   │   │   │   └── Proveedores/
│   │   │   │       ├── ListaProveedores.jsx
│   │   │   │       └── FormularioProveedor.jsx
│   │   │   └── Login/
│   │   ├── services/
│   │   │   ├── authService.js
│   │   │   ├── productoService.js
│   │   │   ├── clienteService.js
│   │   │   └── proveedorService.js
│   │   ├── styles/
│   │   │   ├── global.css
│   │   │   ├── inicioSesion.css
│   │   │   └── componentes.css
│   │   ├── App.js
│   │   └── index.js
│   ├── public/
│   ├── package.json
│   └── .env
│
└── FICHA_TECNICA.md           (Validaciones, rutas y ejemplos)
```

---

## 💾 Credenciales de Prueba

### Base de Datos MySQL

```
Usuario: root
Contraseña: (vacía)
Base de datos: toallas_lizzy
Host: 127.0.0.1:3306
```

### Usuario de Prueba

```
Email: test@test.com
Contraseña: password
```

---

## 🌐 Puertos y URLs

| Servicio | URL | Puerto | Estado |
|---|---|---|---|
| Frontend | http://localhost:3000 | 3000 | Activo |
| Backend API | http://localhost:8001/api | 8001 | Activo |
| MySQL | localhost | 3306 | Activo |
| phpMyAdmin | http://localhost/phpmyadmin | 80 | Activo |

---

## 📖 Documentación Adicional

**Para información detallada sobre validaciones, rutas y ejemplos de Postman, consultar:**
- 📄 **FICHA_TECNICA.md** - Especificación completa de endpoints, validaciones y ejemplos

---

## 🐛 Solución de Problemas

### Error: "Port 8001/3000 already in use"

```bash
# Encontrar proceso en el puerto
lsof -i :8001

# Matar proceso
kill -9 <PID>

# O usar un puerto diferente
php artisan serve --port=8002
```

### Error: "MySQL connection refused"

```bash
# Reiniciar XAMPP
sudo /opt/lampp/lampp restart

# Verificar MySQL
sudo /opt/lampp/bin/mysql.server start
```

### Error: "npm: command not found"

Descargar Node.js desde https://nodejs.org/

### React no recompila después de cambios

```bash
# Detener React (Ctrl+C) e iniciar nuevamente
npm start
```

### Problemas con CORS

Verificar que:
- Backend esté en puerto 8001
- `APP_URL` en `.env` backend sea correcto
- `REACT_APP_API_URL` en `.env` frontend sea correcto

---

## 🔄 Flujo de Trabajo Recomendado

1. **Iniciar servicios** en orden: XAMPP → Backend → Frontend
2. **Realizar cambios** en código
3. **Backend:** Cambios aplicados automáticamente
4. **Frontend:** Recargar página (F5) o se recarga automáticamente
5. **Base de datos:** Si hay cambios, ejecutar migraciones nuevamente

---

## 📝 Tecnologías Utilizadas

**Backend:**
- Framework: Laravel 11.x
- Lenguaje: PHP 8.2.12
- Base de Datos: MySQL 5.7+
- Autenticación: Sesiones
- Encriptación: bcrypt

**Frontend:**
- Framework: React 18.x
- Lenguaje: JavaScript (ES6+)
- HTTP Client: Fetch API
- Estilos: CSS3
- Runtime: Node.js v16.20.2+
- Build Tool: Create React App

---

## 👥 Equipo de Desarrollo

- **Desarrollador Principal:** Elizabeth Hernandez Aroca
- **Última Actualización:** Octubre 2025
- **Versión:** 1.0.0

---

## 📄 Licencia

Este proyecto es parte de un componente formativo educativo de ADSO 2025.

---

**Estado del Proyecto:** ✅ Funcional - CRUD completo en producción