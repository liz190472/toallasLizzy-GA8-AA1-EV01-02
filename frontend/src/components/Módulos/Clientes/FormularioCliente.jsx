import React, { useState } from 'react';
import '../../../styles/producto.css';

function FormularioCliente({ cliente, onGuardar, onCancelar }) {
  const [formData, setFormData] = useState({
    nombre: cliente?.nombre || '',
    telefono: cliente?.telefono || '',
    cedula: cliente?.cedula || '',
    area: cliente?.area || '',
    email: cliente?.email || ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.nombre || !formData.telefono || !formData.cedula || !formData.email) {
      alert('Error: Por favor complete los campos obligatorios');
      return;
    }
    
    onGuardar(formData);
  };

  return (
    <div style={{ padding: '20px', backgroundColor: '#f4f4f4', minHeight: '100vh' }}>
      <div style={{ backgroundColor: 'white', borderRadius: '10px', padding: '40px', maxWidth: '1000px', margin: '0 auto', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}>
        <h2 style={{ marginBottom: '30px', fontSize: '28px', fontWeight: 'bold' }}>
          {cliente ? 'Editar Cliente' : 'Crear Cliente'}
        </h2>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '25px' }}>
            <label style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '10px', display: 'block' }}>
              Datos del Cliente
            </label>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '25px', marginBottom: '25px' }}>
            <div>
              <label htmlFor="nombre" style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>
                Nombre: *
              </label>
              <input
                type="text"
                id="nombre"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                placeholder="Ingrese nombre"
                required
                style={{
                  width: '100%',
                  padding: '12px',
                  fontSize: '14px',
                  border: '1px solid #ccc',
                  borderRadius: '4px',
                  backgroundColor: 'rgba(125, 125, 125, 0.1)'
                }}
              />
            </div>

            <div>
              <label htmlFor="telefono" style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>
                Teléfono: *
              </label>
              <input
                type="text"
                id="telefono"
                name="telefono"
                value={formData.telefono}
                onChange={handleChange}
                placeholder="Ingrese teléfono"
                required
                style={{
                  width: '100%',
                  padding: '12px',
                  fontSize: '14px',
                  border: '1px solid #ccc',
                  borderRadius: '4px',
                  backgroundColor: 'rgba(125, 125, 125, 0.1)'
                }}
              />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '25px', marginBottom: '25px' }}>
            <div>
              <label htmlFor="cedula" style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>
                Cédula: *
              </label>
              <input
                type="text"
                id="cedula"
                name="cedula"
                value={formData.cedula}
                onChange={handleChange}
                placeholder="Ingrese cédula"
                required
                style={{
                  width: '100%',
                  padding: '12px',
                  fontSize: '14px',
                  border: '1px solid #ccc',
                  borderRadius: '4px',
                  backgroundColor: 'rgba(125, 125, 125, 0.1)'
                }}
              />
            </div>

            <div>
              <label htmlFor="area" style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>
                Área:
              </label>
              <input
                type="text"
                id="area"
                name="area"
                value={formData.area}
                onChange={handleChange}
                placeholder="Ingrese área"
                style={{
                  width: '100%',
                  padding: '12px',
                  fontSize: '14px',
                  border: '1px solid #ccc',
                  borderRadius: '4px',
                  backgroundColor: 'rgba(125, 125, 125, 0.1)'
                }}
              />
            </div>
          </div>

          <div style={{ marginBottom: '30px' }}>
            <label htmlFor="email" style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>
              Email: *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Ingrese email"
              required
              style={{
                width: '100%',
                padding: '12px',
                fontSize: '14px',
                border: '1px solid #ccc',
                borderRadius: '4px',
                backgroundColor: 'rgba(125, 125, 125, 0.1)'
              }}
            />
          </div>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '25px' }}>
            <button
              type="submit"
              style={{
                backgroundColor: 'rgba(0, 180, 0, 0.7)',
                color: 'white',
                padding: '15px 50px',
                fontSize: '16px',
                fontWeight: 'bold',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
                minWidth: '150px'
              }}
            >
              {cliente ? 'EDITAR' : 'CREAR'}
            </button>
            <button
              type="button"
              onClick={onCancelar}
              style={{
                backgroundColor: '#d9534f',
                color: 'white',
                padding: '15px 50px',
                fontSize: '16px',
                fontWeight: 'bold',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
                minWidth: '150px'
              }}
            >
              CANCELAR
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default FormularioCliente;