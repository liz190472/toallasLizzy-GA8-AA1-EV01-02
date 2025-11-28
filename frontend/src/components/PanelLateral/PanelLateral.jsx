import React from 'react';
import './PanelLateral.css';

function PanelLateral({ onNavigate }) {
  return (
    <div className="panelLateral">
      <button className="botonPanel" disabled style={{ opacity: 0.5, cursor: 'not-allowed' }}>Usuario</button>
      <button className="botonPanel" onClick={() => onNavigate('clientes')}>Clientes</button>
      <button className="botonPanel" onClick={() => onNavigate('productos')}>Producto</button>
      <button className="botonPanel" disabled style={{ opacity: 0.5, cursor: 'not-allowed' }}>Inventario</button>
      <button className="botonPanel" disabled style={{ opacity: 0.5, cursor: 'not-allowed' }}>Ventas</button>
      <button className="botonPanel" disabled style={{ opacity: 0.5, cursor: 'not-allowed' }}>Pedidos</button>
      <button className="botonPanel" disabled style={{ opacity: 0.5, cursor: 'not-allowed' }}>Compras</button>
      <button className="botonPanel" disabled style={{ opacity: 0.5, cursor: 'not-allowed' }}>Facturación</button>
      <button className="botonPanel" onClick={() => onNavigate('proveedores')}>Proveedores</button>
      <button className="botonPanel" disabled style={{ opacity: 0.5, cursor: 'not-allowed' }}>Reportes</button>
    </div>
  );
}

export default PanelLateral;
