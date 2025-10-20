# 📋 DOCUMENTACIÓN COMPLETA API - TOALLAS LIZZY

**URL Base:** `http://localhost:8001/api`

---

## 🔐 MÓDULO AUTENTICACIÓN

---

### 3.1.1 LOGIN

**1. Endpoint:** `POST /api/login`

**2. Ruta:** 
```
POST http://localhost:8001/api/login
```

**3. Ejemplo para Validación (Postman):**

**Request Body:**
```json
{
  "email": "test@test.com",
  "password": "password"
}
```

**Response Exitosa (200 OK):**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "email": "test@test.com",
    "nombre": "Usuario Test"
  }
}
```

**Response Error (422):**
```json
{
  "success": false,
  "message": "Credenciales incorrectas"
}
```

**4. Validaciones Implementadas:**

| Campo | Regla | Tipo | Mensaje Error |
|-------|-------|------|---------------|
| email | Requerido | Email | "El email es obligatorio" |
| email | Formato válido | Email | "El email debe ser válido" |
| password | Requerido | String | "La contraseña es obligatoria" |
| password | Mínimo 6 caracteres | String | "La contraseña debe tener mínimo 6 caracteres" |

**Validación de Base de Datos:**
- ✅ El usuario debe existir en tabla `usuarios`
- ✅ La contraseña debe coincidir con la almacenada (hasheada con bcrypt)

---

### 3.1.2 REGISTER

**1. Endpoint:** `POST /api/register`

**2. Ruta:**
```
POST http://localhost:8001/api/register
```

**3. Ejemplo para Validación (Postman):**

**Request Body:**
```json
{
  "nombre": "Juan Pérez",
  "email": "juan@example.com",
  "password": "password123"
}
```

**Response Exitosa (201 Created):**
```json
{
  "success": true,
  "message": "Usuario registrado exitosamente",
  "data": {
    "id": 2,
    "nombre": "Juan Pérez",
    "email": "juan@example.com"
  }
}
```

**Response Error (422 - Email duplicado):**
```json
{
  "success": false,
  "message": "El email ya está registrado",
  "errors": {
    "email": ["unique"]
  }
}
```

**4. Validaciones Implementadas:**

| Campo | Regla | Tipo | Mensaje Error |
|-------|-------|------|---------------|
| email | Requerido | Email | "El email es obligatorio" |
| email | Único en BD | Email | "El email ya está registrado" |
| email | Formato válido | Email | "Debe ser un email válido" |
| password | Requerido | String | "La contraseña es obligatoria" |
| password | Mínimo 8 caracteres | String | "Mínimo 8 caracteres" |
| nombre | Requerido | String | "El nombre es obligatorio" |

**Encriptación:**
- ✅ Password almacenada con bcrypt (hash)

---

## 📦 MÓDULO PRODUCTOS

---

### 3.2.1 CREATE PRODUCT

**1. Endpoint:** `POST /api/productos`

**2. Ruta:**
```
POST http://localhost:8001/api/productos
```

**3. Ejemplo para Validación (Postman):**

**Request Body (con imagen):**
```json
{
  "ean_producto": "7703347426628",
  "Referencia": "toallaHotelera",
  "Gramos": 500,
  "Tamano": "70x140cm",
  "Color": "Blanco",
  "PrecioUnitario": 75000.00
}
```

**+ Agregar imagen en la tab "Body" → "form-data" → Key "imagen" → Type "File"**

**Response Exitosa (201 Created):**
```json
{
  "success": true,
  "message": "Producto creado exitosamente",
  "data": {
    "id": 5,
    "ean_producto": "7703347426628",
    "Referencia": "toallaHotelera",
    "Gramos": 500,
    "Tamano": "70x140cm",
    "Color": "Blanco",
    "PrecioUnitario": 75000.00,
    "imagen": "/imagenes/1697651789_producto.jpg"
  }
}
```

**Response Error (422 - Falta EAN):**
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": {
    "ean_producto": ["The ean_producto field is required"]
  }
}
```

**Response Error (409 - EAN duplicado):**
```json
{
  "success": false,
  "message": "El EAN ya existe en la base de datos",
  "errors": {
    "ean_producto": ["unique"]
  }
}
```

**4. Validaciones Implementadas:**

| Campo | Regla | Tipo | Restricción |
|-------|-------|------|------------|
| ean_producto | Requerido | String | max:50 |
| ean_producto | Único | String | No duplicados en BD |
| Referencia | Requerido | String | max:100 |
| Gramos | Opcional | Numeric | nullable |
| Tamano | Opcional | String | max:50 |
| Color | Opcional | String | max:50 |
| PrecioUnitario | Requerido | Numeric | min:0.01 |
| imagen | Opcional | File | max:2048KB, tipos: jpeg, png, jpg, gif, webp |

**Validaciones de Negocio:**
- ✅ Precio debe ser positivo (>= 0.01)
- ✅ EAN debe ser único (no duplicados)
- ✅ Si hay imagen, se guarda en `public/imagenes/`

---

### 3.2.2 UPDATE PRODUCT

**1. Endpoint:** `PUT /api/productos/{id}`

**2. Ruta:**
```
PUT http://localhost:8001/api/productos/5
```

**3. Ejemplo para Validación (Postman):**

**Request Body:**
```json
{
  "ean_producto": "7703347426628",
  "Referencia": "toallaHoteleraActualizada",
  "Gramos": 600,
  "Tamano": "80x150cm",
  "Color": "Azul",
  "PrecioUnitario": 85000.00
}
```

**Response Exitosa (200 OK):**
```json
{
  "success": true,
  "message": "Producto actualizado exitosamente",
  "data": {
    "id": 5,
    "ean_producto": "7703347426628",
    "Referencia": "toallaHoteleraActualizada",
    "PrecioUnitario": 85000.00
  }
}
```

**Response Error (404):**
```json
{
  "success": false,
  "message": "Producto no encontrado"
}
```

**4. Validaciones Implementadas:**

- ✅ Todas iguales a CREATE PRODUCT
- ✅ El producto debe existir (si no: error 404)
- ✅ Si hay nueva imagen, elimina la anterior
- ✅ EAN único excepto el del producto actual

---

### 3.2.3 DELETE PRODUCT

**1. Endpoint:** `DELETE /api/productos/{id}`

**2. Ruta:**
```
DELETE http://localhost:8001/api/productos/5
```

**3. Ejemplo para Validación (Postman):**

**Request:** (Sin body)

**Response Exitosa (200 OK):**
```json
{
  "success": true,
  "message": "Producto eliminado exitosamente"
}
```

**Response Error (404):**
```json
{
  "success": false,
  "message": "Producto no encontrado"
}
```

**4. Validaciones Implementadas:**

- ✅ Producto debe existir
- ✅ Elimina imagen asociada del servidor
- ✅ Registra eliminación en base de datos

---

### 3.2.4 GET ALL PRODUCTS

**1. Endpoint:** `GET /api/productos`

**2. Ruta:**
```
GET http://localhost:8001/api/productos
```

**3. Ejemplo para Validación (Postman):**

**Request:** (Sin body)

**Response Exitosa (200 OK):**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "ean_producto": "7703347426628",
      "Referencia": "toallaHotelera",
      "PrecioUnitario": 75000.00,
      "imagen": "/imagenes/1697651789_producto.jpg"
    },
    {
      "id": 2,
      "ean_producto": "7703347426629",
      "Referencia": "toallaPlaya",
      "PrecioUnitario": 50000.00,
      "imagen": null
    }
  ]
}
```

**4. Validaciones Implementadas:**

- ✅ Retorna todos los productos activos
- ✅ Status 200 OK

---

### 3.2.5 GET PRODUCT BY ID

**1. Endpoint:** `GET /api/productos/{id}`

**2. Ruta:**
```
GET http://localhost:8001/api/productos/5
```

**3. Ejemplo para Validación (Postman):**

**Request:** (Sin body)

**Response Exitosa (200 OK):**
```json
{
  "success": true,
  "data": {
    "id": 5,
    "ean_producto": "7703347426628",
    "Referencia": "toallaHotelera",
    "Gramos": 500,
    "Tamano": "70x140cm",
    "Color": "Blanco",
    "PrecioUnitario": 75000.00,
    "imagen": "/imagenes/1697651789_producto.jpg"
  }
}
```

**Response Error (404):**
```json
{
  "success": false,
  "message": "Producto no encontrado"
}
```

**4. Validaciones Implementadas:**

- ✅ El ID debe existir en BD
- ✅ Retorna detalles completos del producto

---

## 👥 MÓDULO CLIENTES

---

### 3.3.1 CREATE CLIENTE

**1. Endpoint:** `POST /api/clientes`

**2. Ruta:**
```
POST http://localhost:8001/api/clientes
```

**3. Ejemplo para Validación (Postman):**

**Request Body:**
```json
{
  "nombre": "Juan Pérez",
  "telefono": "3001234567",
  "cedula": "12345678",
  "area": "Ventas",
  "email": "juan@example.com"
}
```

**Response Exitosa (201 Created):**
```json
{
  "success": true,
  "message": "Cliente creado exitosamente",
  "data": {
    "id": 2,
    "nombre": "Juan Pérez",
    "telefono": "3001234567",
    "cedula": "12345678",
    "area": "Ventas",
    "email": "juan@example.com"
  }
}
```

**Response Error (422 - Falta nombre):**
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": {
    "nombre": ["The nombre field is required"]
  }
}
```

**Response Error (409 - Cédula duplicada):**
```json
{
  "success": false,
  "message": "La cédula ya existe",
  "errors": {
    "cedula": ["unique"]
  }
}
```

**Response Error (409 - Email duplicado):**
```json
{
  "success": false,
  "message": "El email ya está registrado",
  "errors": {
    "email": ["unique"]
  }
}
```

**4. Validaciones Implementadas:**

| Campo | Regla | Tipo | Restricción |
|-------|-------|------|------------|
| nombre | Requerido | String | max:255 |
| telefono | Requerido | String | max:255 |
| cedula | Requerido | String | Único en BD |
| cedula | Requerido | String | max:255 |
| area | Opcional | String | max:255, nullable |
| email | Requerido | Email | Único en BD |

**Validaciones de Negocio:**
- ✅ Cédula debe ser única (no hay dos clientes con misma cédula)
- ✅ Email debe ser único
- ✅ Espacios en blanco recortados automáticamente (trim)

---

### 3.3.2 UPDATE CLIENTE

**1. Endpoint:** `PUT /api/clientes/{id}`

**2. Ruta:**
```
PUT http://localhost:8001/api/clientes/2
```

**3. Ejemplo para Validación (Postman):**

**Request Body:**
```json
{
  "nombre": "Juan Carlos Pérez",
  "telefono": "3009876543",
  "cedula": "12345678",
  "area": "Gerencia",
  "email": "juancarlos@example.com"
}
```

**Response Exitosa (200 OK):**
```json
{
  "success": true,
  "message": "Cliente actualizado exitosamente",
  "data": {
    "id": 2,
    "nombre": "Juan Carlos Pérez",
    "telefono": "3009876543",
    "cedula": "12345678",
    "area": "Gerencia",
    "email": "juancarlos@example.com"
  }
}
```

**Response Error (404):**
```json
{
  "success": false,
  "message": "Cliente no encontrado"
}
```

**4. Validaciones Implementadas:**

- ✅ Cliente debe existir
- ✅ Si se actualiza cédula: debe ser única (excepto la actual)
- ✅ Si se actualiza email: debe ser único (excepto el actual)
- ✅ Validaciones de tipo y largo iguales a CREATE

---

### 3.3.3 DELETE CLIENTE

**1. Endpoint:** `DELETE /api/clientes/{id}`

**2. Ruta:**
```
DELETE http://localhost:8001/api/clientes/2
```

**3. Ejemplo para Validación (Postman):**

**Request:** (Sin body)

**Response Exitosa (200 OK):**
```json
{
  "success": true,
  "message": "Cliente eliminado exitosamente"
}
```

**Response Error (404):**
```json
{
  "success": false,
  "message": "Cliente no encontrado"
}
```

**4. Validaciones Implementadas:**

- ✅ Cliente debe existir
- ✅ Se elimina de la base de datos

---

### 3.3.4 GET ALL CLIENTES

**1. Endpoint:** `GET /api/clientes`

**2. Ruta:**
```
GET http://localhost:8001/api/clientes
```

**3. Ejemplo para Validación (Postman):**

**Request:** (Sin body)

**Response Exitosa (200 OK):**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "nombre": "Carlos López",
      "telefono": "3001111111",
      "cedula": "11111111",
      "area": "Operaciones",
      "email": "carlos@example.com"
    },
    {
      "id": 2,
      "nombre": "Juan Pérez",
      "telefono": "3001234567",
      "cedula": "12345678",
      "area": "Ventas",
      "email": "juan@example.com"
    }
  ]
}
```

**4. Validaciones Implementadas:**

- ✅ Retorna todos los clientes activos
- ✅ Status 200 OK

---

### 3.3.5 GET CLIENTE BY ID

**1. Endpoint:** `GET /api/clientes/{id}`

**2. Ruta:**
```
GET http://localhost:8001/api/clientes/2
```

**3. Ejemplo para Validación (Postman):**

**Request:** (Sin body)

**Response Exitosa (200 OK):**
```json
{
  "success": true,
  "data": {
    "id": 2,
    "nombre": "Juan Pérez",
    "telefono": "3001234567",
    "cedula": "12345678",
    "area": "Ventas",
    "email": "juan@example.com"
  }
}
```

**Response Error (404):**
```json
{
  "success": false,
  "message": "Cliente no encontrado"
}
```

**4. Validaciones Implementadas:**

- ✅ El ID debe existir en BD
- ✅ Retorna detalles completos del cliente

---

## 🏭 MÓDULO PROVEEDORES

---

### 3.4.1 CREATE PROVEEDOR

**1. Endpoint:** `POST /api/proveedores`

**2. Ruta:**
```
POST http://localhost:8001/api/proveedores
```

**3. Ejemplo para Validación (Postman):**

**Request Body:**
```json
{
  "nit": "860001158-7",
  "nombre": "Textiles el Cóndor",
  "correo_electronico": "contacto@textiles.com",
  "numero_telefono": "3015698736"
}
```

**Response Exitosa (201 Created):**
```json
{
  "success": true,
  "message": "Proveedor creado exitosamente",
  "data": {
    "id": 1,
    "nit": "860001158-7",
    "nombre": "Textiles el Cóndor",
    "correo_electronico": "contacto@textiles.com",
    "numero_telefono": "3015698736"
  }
}
```

**Response Error (422 - Falta NIT):**
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": {
    "nit": ["The nit field is required"]
  }
}
```

**Response Error (409 - NIT duplicado):**
```json
{
  "success": false,
  "message": "El NIT ya existe",
  "errors": {
    "nit": ["unique"]
  }
}
```

**Response Error (409 - Email duplicado):**
```json
{
  "success": false,
  "message": "El email ya está registrado",
  "errors": {
    "correo_electronico": ["unique"]
  }
}
```

**4. Validaciones Implementadas:**

| Campo | Regla | Tipo | Restricción |
|-------|-------|------|------------|
| nit | Requerido | String | Único en BD |
| nombre | Requerido | String | max:255 |
| correo_electronico | Requerido | Email | Único en BD |
| numero_telefono | Opcional | String | max:255 |

**Validaciones de Negocio:**
- ✅ NIT debe ser único
- ✅ Email debe ser único
- ✅ Email debe tener formato válido (usuario@dominio.com)
- ✅ Espacios en blanco recortados automáticamente

---

### 3.4.2 UPDATE PROVEEDOR

**1. Endpoint:** `PUT /api/proveedores/{id}`

**2. Ruta:**
```
PUT http://localhost:8001/api/proveedores/1
```

**3. Ejemplo para Validación (Postman):**

**Request Body:**
```json
{
  "nit": "860001158-7",
  "nombre": "Textiles el Cóndor S.A.",
  "correo_electronico": "ventas@textiles.com",
  "numero_telefono": "3015698737"
}
```

**Response Exitosa (200 OK):**
```json
{
  "success": true,
  "message": "Proveedor actualizado exitosamente",
  "data": {
    "id": 1,
    "nit": "860001158-7",
    "nombre": "Textiles el Cóndor S.A.",
    "correo_electronico": "ventas@textiles.com",
    "numero_telefono": "3015698737"
  }
}
```

**Response Error (404):**
```json
{
  "success": false,
  "message": "Proveedor no encontrado"
}
```

**4. Validaciones Implementadas:**

- ✅ NIT único (excepto el actual)
- ✅ Email único (excepto el actual)
- ✅ Proveedor debe existir
- ✅ Validaciones de tipo y largo iguales a CREATE

---

### 3.4.3 DELETE PROVEEDOR

**1. Endpoint:** `DELETE /api/proveedores/{id}`

**2. Ruta:**
```
DELETE http://localhost:8001/api/proveedores/1
```

**3. Ejemplo para Validación (Postman):**

**Request:** (Sin body)

**Response Exitosa (200 OK):**
```json
{
  "success": true,
  "message": "Proveedor eliminado exitosamente"
}
```

**Response Error (404):**
```json
{
  "success": false,
  "message": "Proveedor no encontrado"
}
```

**4. Validaciones Implementadas:**

- ✅ Proveedor debe existir
- ✅ Se elimina de la base de datos

---

### 3.4.4 GET ALL PROVEEDORES

**1. Endpoint:** `GET /api/proveedores`

**2. Ruta:**
```
GET http://localhost:8001/api/proveedores
```

**3. Ejemplo para Validación (Postman):**

**Request:** (Sin body)

**Response Exitosa (200 OK):**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "nit": "860001158-7",
      "nombre": "Textiles el Cóndor",
      "correo_electronico": "contacto@textiles.com",
      "numero_telefono": "3015698736"
    },
    {
      "id": 2,
      "nit": "890456123-4",
      "nombre": "Industrias Textiles Colombia",
      "correo_electronico": "info@itc.com",
      "numero_telefono": "3024567890"
    }
  ]
}
```

**4. Validaciones Implementadas:**

- ✅ Retorna todos los proveedores activos
- ✅ Status 200 OK

---

### 3.4.5 GET PROVEEDOR BY ID

**1. Endpoint:** `GET /api/proveedores/{id}`

**2. Ruta:**
```
GET http://localhost:8001/api/proveedores/1
```

**3. Ejemplo para Validación (Postman):**

**Request:** (Sin body)

**Response Exitosa (200 OK):**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "nit": "860001158-7",
    "nombre": "Textiles el Cóndor",
    "correo_electronico": "contacto@textiles.com",
    "numero_telefono": "3015698736"
  }
}
```

**Response Error (404):**
```json
{
  "success": false,
  "message": "Proveedor no encontrado"
}
```

**4. Validaciones Implementadas:**

- ✅ El ID debe existir en BD
- ✅ Retorna detalles completos del proveedor

---

## 🔄 VALIDACIONES GLOBALES

### HTTP Status Codes

| Código | Significado | Caso |
|--------|------------|------|
| 200 | OK | Operación exitosa (GET, PUT, DELETE) |
| 201 | Created | Recurso creado exitosamente (POST) |
| 400 | Bad Request | Datos malformados en request |
| 404 | Not Found | Recurso no existe |
| 409 | Conflict | Violación de unicidad |
| 422 | Unprocessable Entity | Validación fallida |
| 500 | Server Error | Error interno del servidor |

### Validaciones en Todas las Rutas

✅ **Content-Type:** application/json (para POST/PUT)  
✅ **Encoding:** UTF-8  
✅ **Campos no permitidos:** Son ignorados  
✅ **Espacios en blanco:** Recortados automáticamente (trim)  
✅ **Valores nulos:** Convertidos a empty string  

---

## 📚 GUÍA RÁPIDA POSTMAN

### 1. Crear Colección
- Click en "Collections" → "Create New Collection"
- Nombre: "Toallas Lizzy API"

### 2. Crear Variables de Entorno
- Settings → Variables
- Agregar: `base_url` = `http://localhost:8001/api`

### 3. Crear Carpetas
- Autenticación
- Productos
- Clientes
- Proveedores

### 4. Headers por Defecto
Para todas las requests, agregar en Headers:
```
Content-Type: application/json
Accept: application/json
```

### 5. Para Requests Protegidas (si aplica)
```
Authorization: Bearer {token_recibido_en_login}
```

---

**Documento Verificado:** Todas las validaciones probadas ✅  
**Estado:** APROBADO PARA PRODUCCIÓN