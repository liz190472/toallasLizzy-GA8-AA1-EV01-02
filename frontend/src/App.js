import React, { useState, useEffect } from "react";
import Cabecera from "./components/Cabecera/Cabecera";
import PanelLateral from "./components/PanelLateral/PanelLateral";
import Subcabecera from "./components/Subcabecera/Subcabecera";
import FormularioProducto from "./components/FormularioProducto/FormularioProducto";
import ListaClientes from "./components/Módulos/Clientes/ListaClientes";
import ListaProveedores from "./components/Módulos/Proveedores/ListaProveedores";
import authService from "./services/authService";
import productoService from "./services/productoService";
import "./styles/inicioSesion.css";
import "./styles/listaProducto.css";
import "./styles/producto.css";
import "./styles/global.css";

// COMPONENTE: LOGIN
function InicioSesion({ onLogin }) {
  const [usuario, setUsuario] = useState("");
  const [password, setPassword] = useState("");
  const [alerta, setAlerta] = useState({
    mostrar: false,
    mensaje: "",
    tipo: "",
  });
  const [cargando, setCargando] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!usuario.trim() || !password.trim()) {
      setAlerta({
        mostrar: true,
        mensaje: "Error: Por favor complete todos los campos",
        tipo: "error",
      });
      setTimeout(
        () => setAlerta({ mostrar: false, mensaje: "", tipo: "" }),
        3000
      );
      return;
    }

    setCargando(true);

    try {
      const respuesta = await authService.login(usuario, password);

      if (respuesta.success) {
        setAlerta({
          mostrar: true,
          mensaje: "Inicio de sesión exitoso. Bienvenido/a!",
          tipo: "success",
        });

        setTimeout(() => {
          onLogin(respuesta.data);
        }, 1500);
      }
    } catch (error) {
      setAlerta({
        mostrar: true,
        mensaje: "Error: " + (error.message || "No se pudo conectar con el servidor"),
        tipo: "error",
      });
    } finally {
      setCargando(false);
    }
  };

  const handleOlvidoContrasena = (e) => {
    e.preventDefault();
    setAlerta({
      mostrar: true,
      mensaje: "Funcionalidad de recuperación de contraseña - En desarrollo",
      tipo: "success",
    });
    setTimeout(
      () => setAlerta({ mostrar: false, mensaje: "", tipo: "" }),
      3000
    );
  };

  return (
    <div>
      <Cabecera />
      <Subcabecera titulo="Inicio de sesión" />

      <div className="form">
        {alerta.mostrar && (
          <div
            style={{
              padding: "15px",
              marginBottom: "20px",
              borderRadius: "4px",
              fontSize: "14px",
              backgroundColor:
                alerta.tipo === "success" ? "#d4edda" : "#f8d7da",
              color: alerta.tipo === "success" ? "#155724" : "#721c24",
              border:
                alerta.tipo === "success"
                  ? "1px solid #c3e6cb"
                  : "1px solid #f5c6cb",
            }}
          >
            {alerta.mensaje}
          </div>
        )}

        <label>Bienvenido</label>
        <form name="inicioSesion" onSubmit={handleSubmit}>
          <div className="campoTexto">
            <img
              src="./imagenes/logoUsuario.png"
              alt="Icono usuario"
              style={{ width: "30px", height: "30px" }}
            />
            <input
              type="email"
              name="usuario"
              value={usuario}
              onChange={(e) => setUsuario(e.target.value)}
              placeholder="Ingrese su email"
              disabled={cargando}
              required
            />
          </div>

          <div className="campoTexto">
            <img
              src="./imagenes/candado.png"
              alt="Icono contraseña"
              style={{ width: "30px", height: "30px" }}
            />
            <input
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Ingrese su contraseña"
              disabled={cargando}
              required
            />
          </div>

          <div className="campoBoton">
            <button
              type="submit"
              className="botoninicioSesion"
              disabled={cargando}
            >
              {cargando ? "Cargando..." : "Ingresar"}
            </button>
          </div>

          <div className="campoBoton">
            <button
              type="button"
              className="botonOlvidoContrasena"
              onClick={handleOlvidoContrasena}
              disabled={cargando}
            >
              ¿Olvidó su contraseña?
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// COMPONENTE: LISTA DE PRODUCTOS
function ListaProducto({ onLogout, onNavigate }) {
  const [productos, setProductos] = useState([]);
  const [vistaActual, setVistaActual] = useState("lista");
  const [productoEditar, setProductoEditar] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [alerta, setAlerta] = useState({
    mostrar: false,
    mensaje: "",
    tipo: "",
  });

  useEffect(() => {
    cargarProductos();
  }, []);

  const cargarProductos = async () => {
    try {
      setCargando(true);
      const respuesta = await productoService.getProductos();

      if (Array.isArray(respuesta)) {
        setProductos(respuesta);
      } else if (respuesta.data && Array.isArray(respuesta.data)) {
        setProductos(respuesta.data);
      } else {
        setProductos([]);
      }
    } catch (error) {
      setAlerta({
        mostrar: true,
        mensaje: "Error al cargar productos: " + error.message,
        tipo: "error",
      });
    } finally {
      setCargando(false);
    }
  };

  const handleCrear = () => {
    setVistaActual("crear");
    setProductoEditar(null);
  };

  const handleEditar = (id) => {
    const producto = productos.find((p) => p.id === id);
    setProductoEditar(producto);
    setVistaActual("editar");
  };

  const handleEliminar = async (id) => {
    if (window.confirm("¿Está seguro de eliminar este producto?")) {
      try {
        await productoService.eliminarProducto(id);
        setProductos(productos.filter((producto) => producto.id !== id));
        setAlerta({
          mostrar: true,
          mensaje: "Producto eliminado exitosamente",
          tipo: "success",
        });
      } catch (error) {
        setAlerta({
          mostrar: true,
          mensaje: "Error al eliminar producto: " + error.message,
          tipo: "error",
        });
      }
    }
  };

  const handleGuardar = async (formData) => {
    try {
      if (vistaActual === "crear") {
        await productoService.crearProducto(formData);
        setAlerta({
          mostrar: true,
          mensaje: "Producto creado exitosamente",
          tipo: "success",
        });
      } else {
        await productoService.actualizarProducto(productoEditar.id, formData);
        setAlerta({
          mostrar: true,
          mensaje: "Producto actualizado exitosamente",
          tipo: "success",
        });
      }
      await cargarProductos();
      setVistaActual("lista");
      setProductoEditar(null);
    } catch (error) {
      setAlerta({
        mostrar: true,
        mensaje: "Error: " + error.message,
        tipo: "error",
      });
    }
  };

  const handleCancelar = () => {
    setVistaActual("lista");
    setProductoEditar(null);
  };

  const getTitulo = () => {
    if (vistaActual === "crear") return "Crear Producto";
    if (vistaActual === "editar") return "Editar Producto";
    return "Lista Productos";
  };

  if (vistaActual === "crear" || vistaActual === "editar") {
    return (
      <div>
        <Subcabecera titulo={getTitulo()} />
        <FormularioProducto
          producto={productoEditar}
          onGuardar={handleGuardar}
          onCancelar={handleCancelar}
        />
      </div>
    );
  }

  return (
    <div>
      <Subcabecera titulo={getTitulo()} />
      <div className="container">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
          <h2>Lista de productos</h2>
          <button
            onClick={onLogout}
            style={{
              backgroundColor: "#d9534f",
              padding: "10px 20px",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
              fontWeight: "bold",
            }}
          >
            Cerrar sesión
          </button>
        </div>

        {alerta.mostrar && (
          <div
            style={{
              padding: "15px",
              marginBottom: "20px",
              borderRadius: "4px",
              fontSize: "14px",
              backgroundColor:
                alerta.tipo === "success" ? "#d4edda" : "#f8d7da",
              color: alerta.tipo === "success" ? "#155724" : "#721c24",
              border:
                alerta.tipo === "success"
                  ? "1px solid #c3e6cb"
                  : "1px solid #f5c6cb",
            }}
          >
            {alerta.mensaje}
          </div>
        )}

        <button onClick={handleCrear} className="botonCrear">
          CREAR
        </button>

        {cargando ? (
          <p>Cargando productos...</p>
        ) : productos.length === 0 ? (
          <p>No hay productos disponibles</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Imagen</th>
                <th>EAN</th>
                <th>Referencia</th>
                <th>Precio Unitario</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {productos.map((producto) => (
                <tr key={producto.id}>
                  <td>
                    {producto.imagen ? (
                      <img
                        src={`http://localhost:8001${producto.imagen}`}
                        alt={producto.Referencia}
                        style={{
                          width: "60px",
                          height: "60px",
                          objectFit: "cover",
                          borderRadius: "4px",
                        }}
                      />
                    ) : (
                      <div
                        style={{
                          width: "60px",
                          height: "60px",
                          backgroundColor: "#ddd",
                          borderRadius: "4px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: "10px",
                        }}
                      >
                        Sin imagen
                      </div>
                    )}
                  </td>
                  <td>{producto.ean_producto}</td>
                  <td>{producto.Referencia}</td>
                  <td>
                    $ {parseFloat(producto.PrecioUnitario).toLocaleString("es-CO")}
                  </td>
                  <td>
                    <button
                      onClick={() => handleEditar(producto.id)}
                      className="botonEditar"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => handleEliminar(producto.id)}
                      className="botonEliminar"
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

// COMPONENTE PRINCIPAL
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [usuarioLogueado, setUsuarioLogueado] = useState(null);
  const [moduloActivo, setModuloActivo] = useState("productos");

  const handleLogin = (usuario) => {
    setIsLoggedIn(true);
    setUsuarioLogueado(usuario);
    setModuloActivo("productos");
  };

  const handleLogout = () => {
    authService.logout();
    setIsLoggedIn(false);
    setUsuarioLogueado(null);
    setModuloActivo("productos");
  };

  const handleNavigate = (modulo) => {
    setModuloActivo(modulo);
  };

  if (!isLoggedIn) {
    return <InicioSesion onLogin={handleLogin} />;
  }

  return (
    <div>
      <Cabecera />

      <div className="panelFormulario">
        <PanelLateral onNavigate={handleNavigate} />

        {moduloActivo === "productos" && (
          <ListaProducto onLogout={handleLogout} onNavigate={handleNavigate} />
        )}
        {moduloActivo === "clientes" && <ListaClientes onLogout={handleLogout} />}
        {moduloActivo === "proveedores" && <ListaProveedores onLogout={handleLogout} />}
      </div>
    </div>
  );
}

export default App;