import React, { useState } from 'react';
import '../../../styles/producto.css';

function FormularioProveedor({ proveedor, onGuardar, onCancelar }) {
  const [formData, setFormData] = useState({
    nit: proveedor?.nit || '',
    nombre: proveedor?.nombre || '',
    correo_electronico: proveedor?.correo_electronico || '',
    numero_telefono: proveedor?.numero_telefono || ''
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
    
    if (!formData.nit || !formData.nombre || !formData.correo_electronico) {
      alert('Error: Por favor complete los campos obligatorios (NIT, Nombre y Email)');
      return;
    }
    
    onGuardar(formData);
  };

  return (
    <div style={{ padding: '20px', backgroundColor: '#f4f4f4', minHeight: '100vh' }}>
      <div style={{ backgroundColor: 'white', borderRadius: '10px', padding: '40px', maxWidth: '1000px', margin: '0 auto', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}>
        <h2 style={{ marginBottom: '30px', fontSize: '28px', fontWeight: 'bold' }}>
          {proveedor ? 'Editar Proveedor' : 'Crear Proveedor'}
        </h2>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '25px' }}>
            <label style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '10px', display: 'block' }}>
              Datos del Proveedor
            </label>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '25px', marginBottom: '25px' }}>
            <div>
              <label htmlFor="nit" style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>
                NIT: *
              </label>
              <input
                type="text"
                id="nit"
                name="nit"
                value={formData.nit}
                onChange={handleChange}
                placeholder="NIT del proveedor"
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
              <label htmlFor="nombre" style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>
                Nombre: *
              </label>
              <input
                type="text"
                id="nombre"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                placeholder="Nombre de la empresa"
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

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '25px', marginBottom: '30px' }}>
            <div>
              <label htmlFor="correo_electronico" style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>
                Email: *
              </label>
              <input
                type="email"
                id="correo_electronico"
                name="correo_electronico"
                value={formData.correo_electronico}
                onChange={handleChange}
                placeholder="Email del proveedor"
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
              <label htmlFor="numero_telefono" style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>
                Teléfono:
              </label>
              <input
                type="text"
                id="numero_telefono"
                name="numero_telefono"
                value={formData.numero_telefono}
                onChange={handleChange}
                placeholder="Número de teléfono"
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
              {proveedor ? 'EDITAR' : 'CREAR'}
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

export default FormularioProveedor;