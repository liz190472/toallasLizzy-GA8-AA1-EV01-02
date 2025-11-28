import React, { useState, useEffect } from 'react';
import proveedorService from '../../../services/proveedorService';
import FormularioProveedor from './FormularioProveedor';
import Subcabecera from '../../Subcabecera/Subcabecera';
import '../../../styles/listaProducto.css';

function ListaProveedores({ onLogout }) {
  const [proveedores, setProveedores] = useState([]);
  const [vistaActual, setVistaActual] = useState('lista');
  const [proveedorEditar, setProveedorEditar] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [alerta, setAlerta] = useState({
    mostrar: false,
    mensaje: '',
    tipo: ''
  });

  useEffect(() => {
    cargarProveedores();
  }, []);

  const cargarProveedores = async () => {
    try {
      setCargando(true);
      const respuesta = await proveedorService.getProveedores();
      
      if (Array.isArray(respuesta)) {
        setProveedores(respuesta);
      } else if (respuesta.data && Array.isArray(respuesta.data)) {
        setProveedores(respuesta.data);
      } else {
        setProveedores([]);
      }
    } catch (error) {
      setAlerta({
        mostrar: true,
        mensaje: 'Error al cargar proveedores: ' + error.message,
        tipo: 'error'
      });
    } finally {
      setCargando(false);
    }
  };

  const handleCrear = () => {
    setVistaActual('crear');
    setProveedorEditar(null);
  };

  const handleEditar = (id) => {
    const proveedor = proveedores.find(p => p.id === id);
    setProveedorEditar(proveedor);
    setVistaActual('editar');
  };

  const handleEliminar = async (id) => {
    if (window.confirm('¿Está seguro de eliminar este proveedor?')) {
      try {
        await proveedorService.eliminarProveedor(id);
        setProveedores(proveedores.filter(proveedor => proveedor.id !== id));
        setAlerta({
          mostrar: true,
          mensaje: 'Proveedor eliminado exitosamente',
          tipo: 'success'
        });
      } catch (error) {
        setAlerta({
          mostrar: true,
          mensaje: 'Error al eliminar proveedor: ' + error.message,
          tipo: 'error'
        });
      }
    }
  };

  const handleGuardar = async (formData) => {
    try {
      if (vistaActual === 'crear') {
        await proveedorService.crearProveedor(formData);
        setAlerta({
          mostrar: true,
          mensaje: 'Proveedor creado exitosamente',
          tipo: 'success'
        });
      } else {
        await proveedorService.actualizarProveedor(proveedorEditar.id, formData);
        setAlerta({
          mostrar: true,
          mensaje: 'Proveedor actualizado exitosamente',
          tipo: 'success'
        });
      }
      await cargarProveedores();
      setVistaActual('lista');
      setProveedorEditar(null);
    } catch (error) {
      setAlerta({
        mostrar: true,
        mensaje: 'Error: ' + error.message,
        tipo: 'error'
      });
    }
  };

  const handleCancelar = () => {
    setVistaActual('lista');
    setProveedorEditar(null);
  };

  const getTitulo = () => {
    if (vistaActual === 'crear') return 'Crear Proveedor';
    if (vistaActual === 'editar') return 'Editar Proveedor';
    return 'Lista Proveedores';
  };

  if (vistaActual === 'crear' || vistaActual === 'editar') {
    return (
      <div>
        <Subcabecera titulo={getTitulo()} />
        <FormularioProveedor
          proveedor={proveedorEditar}
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
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h2>LISTADO PROVEEDORES</h2>
          <button
            onClick={onLogout}
            style={{
              backgroundColor: '#d9534f',
              padding: '10px 20px',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontWeight: 'bold'
            }}
          >
            Cerrar sesión
          </button>
        </div>

        {alerta.mostrar && (
          <div
            style={{
              padding: '15px',
              marginBottom: '20px',
              borderRadius: '4px',
              fontSize: '14px',
              backgroundColor: alerta.tipo === 'success' ? '#d4edda' : '#f8d7da',
              color: alerta.tipo === 'success' ? '#155724' : '#721c24',
              border: alerta.tipo === 'success' ? '1px solid #c3e6cb' : '1px solid #f5c6cb'
            }}
          >
            {alerta.mensaje}
          </div>
        )}

        <button onClick={handleCrear} className="botonCrear">
          CREAR
        </button>

        {cargando ? (
          <p>Cargando proveedores...</p>
        ) : proveedores.length === 0 ? (
          <p>No hay proveedores disponibles</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Identificador</th>
                <th>NIT</th>
                <th>Nombre</th>
                <th>Email</th>
                <th>Teléfono</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {proveedores.map((proveedor) => (
                <tr key={proveedor.id}>
                  <td>{proveedor.id}</td>
                  <td>{proveedor.nit}</td>
                  <td>{proveedor.nombre}</td>
                  <td>{proveedor.correo_electronico}</td>
                  <td>{proveedor.numero_telefono}</td>
                  <td>
                    <button
                      onClick={() => handleEditar(proveedor.id)}
                      className="botonEditar"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => handleEliminar(proveedor.id)}
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

export default ListaProveedores;