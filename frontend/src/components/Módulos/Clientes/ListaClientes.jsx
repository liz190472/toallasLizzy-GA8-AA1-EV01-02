import React, { useState, useEffect } from 'react';
import clienteService from '../../../services/clienteService';
import FormularioCliente from './FormularioCliente';
import Subcabecera from '../../Subcabecera/Subcabecera';
import '../../../styles/listaProducto.css';

function ListaClientes({ onLogout }) {
  const [clientes, setClientes] = useState([]);
  const [vistaActual, setVistaActual] = useState('lista');
  const [clienteEditar, setClienteEditar] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [alerta, setAlerta] = useState({
    mostrar: false,
    mensaje: '',
    tipo: ''
  });

  useEffect(() => {
    cargarClientes();
  }, []);

  const cargarClientes = async () => {
    try {
      setCargando(true);
      const respuesta = await clienteService.getClientes();
      
      if (Array.isArray(respuesta)) {
        setClientes(respuesta);
      } else if (respuesta.data && Array.isArray(respuesta.data)) {
        setClientes(respuesta.data);
      } else {
        setClientes([]);
      }
    } catch (error) {
      setAlerta({
        mostrar: true,
        mensaje: 'Error al cargar clientes: ' + error.message,
        tipo: 'error'
      });
    } finally {
      setCargando(false);
    }
  };

  const handleCrear = () => {
    setVistaActual('crear');
    setClienteEditar(null);
  };

  const handleEditar = (id) => {
    const cliente = clientes.find(c => c.id === id);
    setClienteEditar(cliente);
    setVistaActual('editar');
  };

  const handleEliminar = async (id) => {
    if (window.confirm('¿Está seguro de eliminar este cliente?')) {
      try {
        await clienteService.eliminarCliente(id);
        setClientes(clientes.filter(cliente => cliente.id !== id));
        setAlerta({
          mostrar: true,
          mensaje: 'Cliente eliminado exitosamente',
          tipo: 'success'
        });
      } catch (error) {
        setAlerta({
          mostrar: true,
          mensaje: 'Error al eliminar cliente: ' + error.message,
          tipo: 'error'
        });
      }
    }
  };

  const handleGuardar = async (formData) => {
    try {
      if (vistaActual === 'crear') {
        await clienteService.crearCliente(formData);
        setAlerta({
          mostrar: true,
          mensaje: 'Cliente creado exitosamente',
          tipo: 'success'
        });
      } else {
        await clienteService.actualizarCliente(clienteEditar.id, formData);
        setAlerta({
          mostrar: true,
          mensaje: 'Cliente actualizado exitosamente',
          tipo: 'success'
        });
      }
      await cargarClientes();
      setVistaActual('lista');
      setClienteEditar(null);
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
    setClienteEditar(null);
  };

  // Determinar el título según la vista
  const getTitulo = () => {
    if (vistaActual === 'crear') return 'Crear Clientes';
    if (vistaActual === 'editar') return 'Editar Cliente';
    return 'Lista Clientes';
  };

  if (vistaActual === 'crear' || vistaActual === 'editar') {
    return (
      <div>
        <Subcabecera titulo={getTitulo()} />
        <FormularioCliente
          cliente={clienteEditar}
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
          <h2>LISTADO CLIENTES</h2>
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
          <p>Cargando clientes...</p>
        ) : clientes.length === 0 ? (
          <p>No hay clientes disponibles</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Identificador</th>
                <th>Nombre</th>
                <th>Cédula</th>
                <th>Teléfono</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {clientes.map((cliente) => (
                <tr key={cliente.id}>
                  <td>{cliente.id}</td>
                  <td>{cliente.nombre}</td>
                  <td>{cliente.cedula}</td>
                  <td>{cliente.telefono}</td>
                  <td>
                    <button
                      onClick={() => handleEditar(cliente.id)}
                      className="botonEditar"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => handleEliminar(cliente.id)}
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

export default ListaClientes;