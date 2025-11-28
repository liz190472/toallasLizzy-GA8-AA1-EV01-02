import React, { useState, useEffect } from "react";
import productoService from "../../services/productoService";
import "./ListaProductos.css";

function ListaProductos({ onLogout }) {
  const [productos, setProductos] = useState([]);
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
        setTimeout(() => {
          setAlerta({ mostrar: false, mensaje: "", tipo: "" });
        }, 3000);
      } catch (error) {
        setAlerta({
          mostrar: true,
          mensaje: "Error al eliminar producto: " + error.message,
          tipo: "error",
        });
      }
    }
  };

  return (
    <div style={{ backgroundColor: "#fff", padding: "30px", margin: "20px", flex: 1 }}>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
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
          }}
        >
          Logout
        </button>
      </div>

      {alerta.mostrar && (
        <div
          style={{
            padding: "15px",
            marginBottom: "20px",
            borderRadius: "4px",
            fontSize: "14px",
            backgroundColor: alerta.tipo === "success" ? "#d4edda" : "#f8d7da",
            color: alerta.tipo === "success" ? "#155724" : "#721c24",
          }}
        >
          {alerta.mensaje}
        </div>
      )}

      {cargando ? (
        <p>Cargando productos...</p>
      ) : productos.length === 0 ? (
        <p>No hay productos disponibles</p>
      ) : (
        <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "20px" }}>
          <thead style={{ backgroundColor: "#f0ad4e", color: "#333" }}>
            <tr>
              <th style={{ padding: "12px", textAlign: "left", borderBottom: "2px solid #ddd" }}>
                Imagen
              </th>
              <th style={{ padding: "12px", textAlign: "left", borderBottom: "2px solid #ddd" }}>
                EAN
              </th>
              <th style={{ padding: "12px", textAlign: "left", borderBottom: "2px solid #ddd" }}>
                Referencia
              </th>
              <th style={{ padding: "12px", textAlign: "left", borderBottom: "2px solid #ddd" }}>
                Precio Unitario
              </th>
              <th style={{ padding: "12px", textAlign: "left", borderBottom: "2px solid #ddd" }}>
                Acciones
              </th>
            </tr>
          </thead>
          <tbody>
            {productos.map((producto, index) => (
              <tr key={producto.id} style={{ backgroundColor: index % 2 === 0 ? "#f9f9f9" : "white" }}>
                <td style={{ padding: "12px", borderBottom: "1px solid #eee" }}>
                  {producto.imagen ? (
                    <img
                      src={`http://localhost:8001${producto.imagen}`}
                      alt={producto.Referencia}
                      style={{ 
                        width: "60px", 
                        height: "60px", 
                        objectFit: "cover", 
                        borderRadius: "4px",
                        border: "1px solid #ddd"
                      }}
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'flex';
                      }}
                    />
                  ) : null}
                  <div 
                    style={{ 
                      width: "60px", 
                      height: "60px", 
                      backgroundColor: "#ddd", 
                      borderRadius: "4px",
                      display: producto.imagen ? "none" : "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "10px",
                      color: "#999",
                      textAlign: "center"
                    }}
                  >
                    Sin imagen
                  </div>
                </td>
                <td style={{ padding: "12px", borderBottom: "1px solid #eee" }}>
                  {producto.ean_producto || 'N/A'}
                </td>
                <td style={{ padding: "12px", borderBottom: "1px solid #eee" }}>
                  {producto.Referencia}
                </td>
                <td style={{ padding: "12px", borderBottom: "1px solid #eee" }}>
                  $ {parseFloat(producto.PrecioUnitario).toLocaleString("es-CO")}
                </td>
                <td style={{ padding: "12px", borderBottom: "1px solid #eee" }}>
                  <button
                    onClick={() => handleEliminar(producto.id)}
                    style={{
                      padding: "6px 15px",
                      margin: "0 5px",
                      border: "none",
                      borderRadius: "4px",
                      cursor: "pointer",
                      fontSize: "14px",
                      backgroundColor: "#d9534f",
                      color: "white",
                    }}
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
  );
}

export default ListaProductos;
