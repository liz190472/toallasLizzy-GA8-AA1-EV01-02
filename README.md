# 📋 Sistema de Gestión - Toallas Lizzy

- **Proyecto:** _Comercializadora de Toallas Lizzy_
- **Curso:** _ADSO 2025_
- **Ficha:** _2983215_
- **Estudiante:** _Elizabeth Hernandez Aroca_

---

## 📋 Descripción del Proyecto

Sistema integral de gestión empresarial desarrollado con **Laravel** (Backend API RESTful) y **React** (Frontend SPA) para la administración de productos, clientes, proveedores y autenticación de usuarios. Este proyecto implementa servicios web modernos siguiendo estándares REST y mejores prácticas de desarrollo, con cobertura completa de pruebas automatizadas.

---

## 🎯 Objetivos del Proyecto

- Implementar una API RESTful completa siguiendo estándares REST
- Desarrollar una interfaz responsiva e intuitiva con React
- Gestionar autenticación segura de usuarios con encriptación bcrypt
- Administrar CRUD completo de Productos, Clientes y Proveedores
- Documentar todos los endpoints y validaciones de la API
- Aplicar control de versiones con Git
- **Implementar pruebas automatizadas exhaustivas con Jest y React Testing Library**
- **Garantizar calidad de código con cobertura de pruebas superior al 80%**

---

## 🛠️ Entorno Instalado y Configuración

### Componentes del Sistema

| Componente                 | Versión               | Estado       | Ubicación                 |
| -------------------------- | --------------------- | ------------ | ------------------------- |
| **Servidor Local**         | XAMPP 8.2.12-0 Linux  | ✅ Instalado | `/opt/lampp/`             |
| **Servidor Web**           | Apache                | ✅ OK        | Panel XAMPP               |
| **Base de Datos**          | MySQL/MariaDB 5.7+    | ✅ OK        | Panel XAMPP               |
| **Lenguaje Backend**       | PHP 8.2.12            | ✅ OK        | Incluido en XAMPP         |
| **Framework Backend**      | Laravel 11.x          | ✅ OK        | Proyecto                  |
| **Lenguaje Frontend**      | JavaScript (ES6+)     | ✅ OK        | Node.js                   |
| **Framework Frontend**     | React 18.x            | ✅ OK        | Proyecto                  |
| **Runtime Frontend**       | Node.js               | v16.20.2+    | Sistema                   |
| **Testing Framework**      | Jest                  | 28.1.3       | ✅ Instalado              |
| **Testing Library**        | React Testing Library | 13.4.0       | ✅ Instalado              |
| **Administrador Paquetes** | Composer              | ✅ Global    | `/usr/local/bin/composer` |
| **Gestor Node**            | npm                   | 8.19.4+      | Node.js                   |
| **Editor de Código**       | Visual Studio Code    | ✅ OK        | -                         |
| **Control de Versiones**   | Git                   | 2.0+         | -                         |

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
cd toallasLizzy-GA8-AA1-EV01-02
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

## 🧪 Testing y Calidad de Código

### Ejecutar Pruebas

El proyecto incluye **pruebas automatizadas exhaustivas** para garantizar la calidad del código:

**Ejecutar todas las pruebas:**

```bash
cd frontend
npm test
```

**Ejecutar pruebas con cobertura:**

```bash
npm test -- --coverage
```

**Ejecutar pruebas en modo CI (sin watch):**

```bash
npm test -- --watchAll=false
```

**Ejecutar pruebas de un módulo específico:**

```bash
# Solo pruebas de autenticación
npm test authService.test.js

# Solo pruebas de productos
npm test productoService.test.js

# Solo pruebas de clientes
npm test -- Clientes

# Solo pruebas de proveedores
npm test -- Proveedores

# Solo pruebas de componentes UI
npm test -- Cabecera
npm test -- Subcabecera
npm test -- PanelLateral
```

### Cobertura de Pruebas Actual

| Módulo                  | Archivos Testeados                                                     | Casos de Prueba | Cobertura | Estado        |
| ----------------------- | ---------------------------------------------------------------------- | --------------- | --------- | ------------- |
| **Autenticación**       | `authService.test.js`                                                  | 3               | 100%      | ✅ Completo   |
| **Productos (Service)** | `productoService.test.js`                                              | 4               | 100%      | ✅ Completo   |
| **Productos (UI)**      | `FormularioProducto.test.js`<br>`ListaProductos.test.jsx`              | 4 + 9 = 13      | 95%+      | ✅ Completo   |
| **Clientes**            | `FormularioCliente.test.js`<br>`ListaClientes.test.js`                 | 6 + 9 = 15      | 95%+      | ✅ Completo   |
| **Proveedores**         | `FormularioProveedor.test.js`<br>`ListaProveedores.test.js`            | 6 + 9 = 15      | 95%+      | ✅ Completo   |
| **Componentes UI**      | `Cabecera.test.jsx`<br>`Subcabecera.test.js`<br>`PanelLateral.test.js` | 3 + 3 + 3 = 9   | 75%+      | ✅ Completo   |
| **TOTAL**               | **11 archivos**                                                        | **59 casos**    | **~85%**  | ✅ Producción |

### Casos de Prueba por Módulo

#### 🔐 Módulo de Autenticación (3 casos)

| ID     | Descripción             | Archivo               | Estado |
| ------ | ----------------------- | --------------------- | ------ |
| CP-001 | Login exitoso           | `authService.test.js` | ✅     |
| CP-002 | Login con error         | `authService.test.js` | ✅     |
| CP-003 | Login con campos vacíos | `authService.test.js` | ✅     |

#### 📦 Módulo de Productos - Service (4 casos)

| ID     | Descripción         | Archivo                   | Estado |
| ------ | ------------------- | ------------------------- | ------ |
| CP-004 | Listar productos    | `productoService.test.js` | ✅     |
| CP-005 | Crear producto      | `productoService.test.js` | ✅     |
| CP-006 | Actualizar producto | `productoService.test.js` | ✅     |
| CP-007 | Eliminar producto   | `productoService.test.js` | ✅     |

#### 👥 Módulo de Clientes (15 casos)

**FormularioCliente.test.js (6 casos):**
| ID | Descripción | Estado |
|----|-------------|--------|
| CP-008 | Renderiza formulario en modo creación | ✅ |
| CP-009 | Renderiza formulario en modo edición | ✅ |
| CP-010 | Permite ingresar texto en campos | ✅ |
| CP-011 | Valida campos obligatorios | ✅ |
| CP-012 | Ejecuta onGuardar con datos completos | ✅ |
| CP-013 | Ejecuta onCancelar correctamente | ✅ |

**ListaClientes.test.js (9 casos):**
| ID | Descripción | Estado |
|----|-------------|--------|
| CP-014 | Renderiza lista de clientes | ✅ |
| CP-015 | Muestra estado de cargando | ✅ |
| CP-016 | Muestra mensaje sin clientes | ✅ |
| CP-017 | Cambia a vista de creación | ✅ |
| CP-018 | Cambia a vista de edición | ✅ |
| CP-019 | Regresa a lista al cancelar | ✅ |
| CP-020 | Ejecuta logout correctamente | ✅ |
| CP-021 | Elimina cliente con confirmación | ✅ |
| CP-022 | Maneja errores de carga | ✅ |

#### 🏭 Módulo de Proveedores (15 casos)

**FormularioProveedor.test.js (6 casos):**
| ID | Descripción | Estado |
|----|-------------|--------|
| CP-023 | Renderiza formulario en modo creación | ✅ |
| CP-024 | Renderiza formulario en modo edición | ✅ |
| CP-025 | Permite ingresar texto en campos | ✅ |
| CP-026 | Valida campos obligatorios (NIT, Nombre, Email) | ✅ |
| CP-027 | Ejecuta onGuardar con datos completos | ✅ |
| CP-028 | Ejecuta onCancelar correctamente | ✅ |

**ListaProveedores.test.js (9 casos):**
| ID | Descripción | Estado |
|----|-------------|--------|
| CP-029 | Renderiza lista de proveedores | ✅ |
| CP-030 | Muestra estado de cargando | ✅ |
| CP-031 | Muestra mensaje sin proveedores | ✅ |
| CP-032 | Cambia a vista de creación | ✅ |
| CP-033 | Cambia a vista de edición | ✅ |
| CP-034 | Regresa a lista al cancelar | ✅ |
| CP-035 | Ejecuta logout correctamente | ✅ |
| CP-036 | Elimina proveedor con confirmación | ✅ |
| CP-037 | Maneja errores de carga | ✅ |

#### 📦 Módulo de Productos - UI (13 casos)

**FormularioProducto.test.js (4 casos):**
| ID | Descripción | Estado |
|----|-------------|--------|
| CP-038 | Renderiza formulario en modo creación | ✅ |
| CP-039 | Renderiza todos los campos del formulario | ✅ |
| CP-040 | Permite ingresar texto en los campos | ✅ |
| CP-041 | Ejecuta onCancelar al hacer clic en CANCELAR | ✅ |

**ListaProductos.test.jsx (9 casos):**
| ID | Descripción | Estado |
|----|-------------|--------|
| CP-042 | Renderiza el título "Lista de productos" | ✅ |
| CP-043 | Renderiza la tabla correctamente | ✅ |
| CP-044 | Muestra los encabezados de la tabla | ✅ |
| CP-045 | Renderiza los productos recibidos del servicio | ✅ |
| CP-046 | Muestra el segundo producto correctamente | ✅ |
| CP-047 | Muestra mensaje de carga inicialmente | ✅ |
| CP-048 | Muestra mensaje cuando no hay productos | ✅ |
| CP-049 | Renderiza número correcto de filas con 2 productos | ✅ |
| CP-050 | Muestra texto "Sin imagen" cuando no hay imagen | ✅ |

#### 🎨 Módulo de Componentes UI (9 casos)

**Cabecera.test.jsx (3 casos):**
| ID | Descripción | Estado |
|----|-------------|--------|
| CP-051 | Renderizar cabecera completa | ✅ |
| CP-052 | Verificar elementos interactivos cabecera | ✅ |
| CP-053 | Validar estilos y clases CSS cabecera | ✅ |

**Subcabecera.test.js (3 casos):**
| ID | Descripción | Estado |
|----|-------------|--------|
| CP-054 | Renderizar subcabecera completa | ✅ |
| CP-055 | Verificar opciones de navegación subcabecera | ✅ |
| CP-056 | Validar respuesta a cambios de estado subcabecera | ✅ |

**PanelLateral.test.js (3 casos):**
| ID | Descripción | Estado |
|----|-------------|--------|
| CP-057 | Renderizar panel lateral completo | ✅ |
| CP-058 | Verificar items del menú lateral | ✅ |
| CP-059 | Validar comportamiento de navegación lateral | ✅ |

### Herramientas de Testing

- **Jest 28.1.3**: Framework de testing principal
- **React Testing Library 13.4.0**: Testing de componentes React
- **@testing-library/jest-dom**: Matchers personalizados para DOM
- **@testing-library/user-event**: Simulación de eventos de usuario
- **jest-mock**: Mocking de módulos y servicios

### Documentación de Pruebas

Para más detalles sobre el plan de pruebas, casos de prueba y resultados:

📄 **Consultar:** `docs/PLAN_DE_PRUEBAS.md`

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

**Pruebas:** ✅ 3 casos de prueba automatizados (100% cobertura)

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

**Pruebas:** ✅ 17 casos de prueba automatizados (95%+ cobertura)

- Service: 4 casos
- FormularioProducto: 4 casos
- ListaProductos: 9 casos

---

### 👥 Módulo de Gestión de Clientes

CRUD completo para administración de clientes con validaciones exhaustivas.

**Funcionalidades:**

- Registrar nuevos clientes
- Visualizar lista de clientes
- Editar información de clientes
- Eliminar clientes
- Validación de formularios
- Manejo de estados (cargando, error, vacío)

**Campos del Cliente:**

- Nombre (Obligatorio)
- Teléfono (Obligatorio)
- Cédula (Única, Obligatoria)
- Área (Opcional)
- Email (Único, Obligatorio)

**Endpoints:**

- `GET /api/clientes` - Listar todos
- `POST /api/clientes` - Crear cliente
- `GET /api/clientes/{id}` - Obtener por ID
- `PUT /api/clientes/{id}` - Actualizar cliente
- `DELETE /api/clientes/{id}` - Eliminar cliente

**Componentes Testeados:**

- `FormularioCliente.jsx` - 6 casos de prueba
- `ListaClientes.jsx` - 9 casos de prueba

**Pruebas:** ✅ 15 casos de prueba automatizados (95%+ cobertura)

---

### 🏭 Módulo de Gestión de Proveedores

CRUD completo para administración de proveedores con validaciones exhaustivas.

**Funcionalidades:**

- Registrar nuevos proveedores
- Visualizar lista de proveedores
- Editar información de proveedores
- Eliminar proveedores
- Validación de formularios
- Manejo de estados (cargando, error, vacío)

**Campos del Proveedor:**

- NIT (Único, Obligatorio)
- Nombre (Obligatorio)
- Correo Electrónico (Único, Obligatorio)
- Número de Teléfono (Opcional)

**Endpoints:**

- `GET /api/proveedores` - Listar todos
- `POST /api/proveedores` - Crear proveedor
- `GET /api/proveedores/{id}` - Obtener por ID
- `PUT /api/proveedores/{id}` - Actualizar proveedor
- `DELETE /api/proveedores/{id}` - Eliminar proveedor

**Componentes Testeados:**

- `FormularioProveedor.jsx` - 6 casos de prueba
- `ListaProveedores.jsx` - 9 casos de prueba

**Pruebas:** ✅ 15 casos de prueba automatizados (95%+ cobertura)

---

### 🎨 Módulo de Componentes UI

Componentes de interfaz de usuario reutilizables para la navegación y estructura de la aplicación.

**Funcionalidades:**

- Cabecera principal con logo, título y controles de usuario
- Subcabecera con navegación secundaria y breadcrumbs
- Panel lateral con menú de navegación entre módulos
- Diseño responsivo y accesible
- Gestión de estados activos en navegación

**Componentes:**

- **Cabecera:** Logo, título, menú de usuario
- **Subcabecera:** Breadcrumbs, filtros, acciones secundarias
- **PanelLateral:** Menú de navegación con iconos (Productos, Clientes, Proveedores)

**Componentes Testeados:**

- `Cabecera.jsx` - 3 casos de prueba
- `Subcabecera.jsx` - 3 casos de prueba
- `PanelLateral.jsx` - 3 casos de prueba

**Pruebas:** ✅ 9 casos de prueba automatizados (75%+ cobertura)

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

# Ver cobertura de pruebas
npm test -- --coverage

# Ejecutar pruebas en CI
npm test -- --watchAll=false

# Limpiar caché de Jest
npm test -- --clearCache
```

---

## 🔐 Seguridad

- Las contraseñas se almacenan encriptadas con **bcrypt**
- Validación de datos en todas las entradas de usuario
- Mensajes de error claros sin exponer información sensible
- CORS configurado según necesidades del frontend
- Validación de tipo de datos en backend
- Campos únicos protegidos contra duplicados
- **Testing automatizado de validaciones y autenticación**
- **Validación de formularios en frontend antes de enviar**
- **Confirmación de eliminación para prevenir pérdidas de datos**

---

## 📁 Estructura del Proyecto

```
toallasLizzy-GA8-AA1-EV01-02/
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
│   │   │   │   ├── Cabecera.jsx
│   │   │   │   └── Cabecera.test.jsx           ✅ 3 tests
│   │   │   ├── Subcabecera/
│   │   │   │   ├── Subcabecera.jsx
│   │   │   │   └── Subcabecera.test.js         ✅ 3 tests
│   │   │   ├── PanelLateral/
│   │   │   │   ├── PanelLateral.jsx
│   │   │   │   └── PanelLateral.test.js        ✅ 3 tests
│   │   │   ├── Módulos/
│   │   │   │   ├── Clientes/
│   │   │   │   │   ├── ListaClientes.jsx
│   │   │   │   │   ├── ListaClientes.test.js       ✅ 9 tests
│   │   │   │   │   ├── FormularioCliente.jsx
│   │   │   │   │   └── FormularioCliente.test.js   ✅ 6 tests
│   │   │   │   ├── Productos/
│   │   │   │   │   ├── ListaProductos.jsx
│   │   │   │   │   ├── ListaProductos.test.jsx     ✅ 9 tests
│   │   │   │   │   ├── FormularioProducto.jsx
│   │   │   │   │   └── FormularioProducto.test.js  ✅ 4 tests
│   │   │   │   └── Proveedores/
│   │   │   │       ├── ListaProveedores.jsx
│   │   │   │       ├── ListaProveedores.test.js    ✅ 9 tests
│   │   │   │       ├── FormularioProveedor.jsx
│   │   │   │       └── FormularioProveedor.test.js ✅ 6 tests
│   │   │   └── Login/
│   │   ├── services/
│   │   │   ├── authService.js
│   │   │   ├── authService.test.js       ✅ 3 tests
│   │   │   ├── productoService.js
│   │   │   ├── productoService.test.js   ✅ 4 tests
│   │   │   ├── clienteService.js
│   │   │   └── proveedorService.js
│   │   ├── __tests__/
│   │   │   └── setupTests.js
│   │   ├── styles/
│   │   ├── App.js
│   │   └── index.js
│   ├── public/
│   ├── package.json
│   └── .env
│
├── docs/
│   ├── PLAN_DE_PRUEBAS.md
│   ├── casos_de_prueba/
│   │   ├── CP-001_a_CP-003_Autenticacion.md
│   │   ├── CP-004_a_CP-007_Productos_Service.md
│   │   ├── CP-008_a_CP-022_Clientes.md
│   │   ├── CP-023_a_CP-037_Proveedores.md
│   │   ├── CP-038_a_CP-050_Productos_UI.md
│   │   ├── CP-051_a_CP-059_Componentes_UI.md
│   │   └── ...
│   └── evidencias/
│       ├── cobertura_tests/
│       │   ├── coverage_general.png
│       │   ├── coverage_clientes.png
│       │   ├── coverage_proveedores.png
│       │   ├── coverage_productos.png
│       │   └── coverage_componentes_ui.png
│       └── ...
│
├── FICHA_TECNICA.md
└── README.md
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

| Servicio    | URL                         | Puerto | Estado |
| ----------- | --------------------------- | ------ | ------ |
| Frontend    | http://localhost:3000       | 3000   | Activo |
| Backend API | http://localhost:8001/api   | 8001   | Activo |
| MySQL       | localhost                   | 3306   | Activo |
| phpMyAdmin  | http://localhost/phpmyadmin | 80     | Activo |

---

## 📖 Documentación Adicional

**Para información detallada consultar:**

- 📄 **FICHA_TECNICA.md** - Especificación completa de endpoints, validaciones y ejemplos
- 📄 **docs/PLAN_DE_PRUEBAS.md** - Plan completo de pruebas de software
- 📂 **docs/casos_de_prueba/** - Casos de prueba individuales con evidencias

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

### Errores en las pruebas

```bash
# Limpiar caché de Jest
npm test -- --clearCache

# Reinstalar dependencias
rm -rf node_modules package-lock.json
npm install

# Verificar que setupTests.js esté configurado
cat src/__tests__/setupTests.js
```

### Tests fallan por timeout

```bash
# Aumentar timeout en jest.config.js o en tests específicos
jest.setTimeout(10000);
```

---

## 🔄 Flujo de Trabajo Recomendado

1. **Iniciar servicios** en orden: XAMPP → Backend → Frontend
2. **Realizar cambios** en código
3. **Ejecutar pruebas** después de cada cambio significativo:
   ```bash
   npm test -- --watchAll=false
   ```
4. **Verificar cobertura** antes de commit:
   ```bash
   npm test -- --coverage
   ```
5. **Backend:** Cambios aplicados automáticamente
6. **Frontend:** Recargar página (F5) o se recarga automáticamente
7. **Base de datos:** Si hay cambios, ejecutar migraciones nuevamente
8. **Commit y Push** a GitHub con mensajes descriptivos:
   ```bash
   git add .
   git commit -m "feat: agregar tests para componentes UI (Cabecera, Subcabecera, PanelLateral)"
   git push origin main
   ```

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

**Testing:**

- Framework: Jest 28.1.3
- Testing Library: React Testing Library 13.4.0
- Jest DOM: @testing-library/jest-dom
- User Event: @testing-library/user-event
- Cobertura de código: Jest Coverage Reporter

---

## 📊 Métricas de Calidad

- ✅ **59 casos de prueba** implementados y aprobados
- ✅ **11 archivos de test** (services + componentes)
- ✅ **~85% de cobertura** en código crítico
- ✅ **100% de funcionalidades críticas** cubiertas por pruebas
- ✅ **Autenticación** completamente testeada (3 tests)
- ✅ **CRUD de Productos** completamente testeado (17 tests)
- ✅ **CRUD de Clientes** completamente testeado (15 tests)
- ✅ **CRUD de Proveedores** completamente testeado (15 tests)
- ✅ **Componentes UI** completamente testeados (9 tests)
- ✅ **0 errores críticos** en producción
- ✅ **Todos los formularios** con validación testeada
- ✅ **Todas las listas** con estados de carga/error testeados
- ✅ **Navegación y UI** completamente funcionales

### Distribución de Pruebas

```
📊 Total: 59 casos de prueba
├── Autenticación:         3 tests (5.1%)
├── Productos:            17 tests (28.8%)
│   ├── Service:           4 tests
│   ├── Formulario:        4 tests
│   └── Lista:             9 tests
├── Clientes:             15 tests (25.4%)
│   ├── Formulario:        6 tests
│   └── Lista:             9 tests
├── Proveedores:          15 tests (25.4%)
│   ├── Formulario:        6 tests
│   └── Lista:             9 tests
└── Componentes UI:        9 tests (15.3%)
    ├── Cabecera:          3 tests
    ├── Subcabecera:       3 tests
    └── PanelLateral:      3 tests

✅ Cobertura estimada: ~85%
```

---

## 👥 Equipo de Desarrollo

- **Desarrollador Principal:** Elizabeth Hernandez Aroca
- **Última Actualización:** Noviembre 2025
- **Versión:** 2.2.0

---

## 📄 Licencia

Este proyecto es parte de un componente formativo educativo de ADSO 2025.

---

## 🚀 Changelog

### v2.2.0 (Noviembre 2025)

- ✅ **Implementación completa de tests para Componentes UI**
- ✅ **Cabecera.test.jsx**: 3 casos de prueba (renderizado, interactividad, estilos)
- ✅ **Subcabecera.test.js**: 3 casos de prueba (renderizado, navegación, estado)
- ✅ **PanelLateral.test.js**: 3 casos de prueba (renderizado, items, navegación)
- ✅ **Total: 59 casos de prueba automatizados** (actualizado desde 50)
- ✅ **11 archivos de test** completamente funcionales
- ✅ **Cobertura de pruebas ~85%** (incremento desde ~95% por nuevos componentes)
- ✅ **Documentación actualizada** con casos CP-051 a CP-059
- ✅ **README con distribución completa** de todos los módulos testeados

### v2.1.0 (Noviembre 2025)

- ✅ **Implementación completa de tests para módulo Productos UI**
- ✅ **FormularioProducto.test.js**: 4 casos de prueba
- ✅ **ListaProductos.test.jsx**: 9 casos de prueba
- ✅ **Total: 50 casos de prueba automatizados**
- ✅ **Cobertura de pruebas ~95%** mantenida
- ✅ **Documentación actualizada** con numeración correcta CP-001 a CP-050

### v2.0.0 (Noviembre 2025)

- ✅ **Implementación completa de módulo Clientes** con CRUD
- ✅ **Implementación completa de módulo Proveedores** con CRUD
- ✅ **15 tests para FormularioCliente y ListaClientes**
- ✅ **15 tests para FormularioProveedor y ListaProveedores**
- ✅ **Validaciones exhaustivas en todos los formularios**
- ✅ **Manejo de estados (loading, error, empty) en todas las listas**
- ✅ **Documentación actualizada con nuevos módulos**

### v1.0.0 (Octubre 2025)

- ✅ Implementación completa de CRUD para Productos
- ✅ Sistema de autenticación con Laravel
- ✅ Frontend con React
- ✅ Testing automatizado con Jest (7 casos iniciales)
- ✅ Plan de pruebas documentado
- ✅ Documentación completa

---

**Estado del Proyecto:** ✅ **PRODUCCIÓN** - Sistema completo con 5 módulos funcionales (4 CRUD + Componentes UI) y 59 tests automatizados (85% cobertura)
