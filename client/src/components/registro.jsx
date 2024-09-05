import React, { useState } from 'react';

const Registro = () => {
  const [activos, setActivos] = useState([]);
  const [pasivos, setPasivos] = useState([]);
  const [nuevoActivo, setNuevoActivo] = useState({ descripcion: '', valor2022: '', valor2021: '' });
  const [nuevoPasivo, setNuevoPasivo] = useState({ descripcion: '', valor2022: '', valor2021: '' });

  // Estado para el cálculo del CPV
  const [inventarioInicial, setInventarioInicial] = useState('');
  const [costosDirectos, setCostosDirectos] = useState('');
  const [costosIndirectos, setCostosIndirectos] = useState('');
  const [compras, setCompras] = useState('');
  const [inventarioFinal, setInventarioFinal] = useState('');
  const [cpv, setCpv] = useState(null);

  const agregarActivo = () => {
    if (nuevoActivo.descripcion && nuevoActivo.valor2022) {
      setActivos([...activos, nuevoActivo]);
      setNuevoActivo({ descripcion: '', valor2022: '', valor2021: '' });
    }
  };

  const agregarPasivo = () => {
    if (nuevoPasivo.descripcion && nuevoPasivo.valor2022) {
      setPasivos([...pasivos, nuevoPasivo]);
      setNuevoPasivo({ descripcion: '', valor2022: '', valor2021: '' });
    }
  };

  const calcularCpv = () => {
    const cpvValue = parseFloat(inventarioInicial) + parseFloat(costosDirectos) + parseFloat(costosIndirectos) + parseFloat(compras) - parseFloat(inventarioFinal);
    setCpv(cpvValue);
  };

  const descargarBalance = () => {
    const balanceContent = `
      Activos:
      ${activos.map(activo => `${activo.descripcion}: ${activo.valor2022} (2022), ${activo.valor2021} (2021)`).join("\n")}
      
      Pasivos:
      ${pasivos.map(pasivo => `${pasivo.descripcion}: ${pasivo.valor2022} (2022), ${pasivo.valor2021} (2021)`).join("\n")}
      
      Costo de Productos Vendidos (CPV): ${cpv}
    `;
    
    const blob = new Blob([balanceContent], { type: 'text/plain' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'balance.txt';
    link.click();
  };

  return (
    <div>
      <h2>Registrar Activos y Pasivos</h2>
      
      {/* Formulario para Activos */}
      <div>
        <h3>Agregar Activo</h3>
        <input
          type="text"
          value={nuevoActivo.descripcion}
          onChange={(e) => setNuevoActivo({ ...nuevoActivo, descripcion: e.target.value })}
          placeholder="Descripción"
        />
        <input
          type="number"
          value={nuevoActivo.valor2022}
          onChange={(e) => setNuevoActivo({ ...nuevoActivo, valor2022: e.target.value })}
          placeholder="Valor 2022"
        />
        <input
          type="number"
          value={nuevoActivo.valor2021}
          onChange={(e) => setNuevoActivo({ ...nuevoActivo, valor2021: e.target.value })}
          placeholder="Valor 2021"
        />
        <button onClick={agregarActivo}>Agregar Activo</button>
      </div>

      {/* Formulario para Pasivos */}
      <div>
        <h3>Agregar Pasivo</h3>
        <input
          type="text"
          value={nuevoPasivo.descripcion}
          onChange={(e) => setNuevoPasivo({ ...nuevoPasivo, descripcion: e.target.value })}
          placeholder="Descripción"
        />
        <input
          type="number"
          value={nuevoPasivo.valor2022}
          onChange={(e) => setNuevoPasivo({ ...nuevoPasivo, valor2022: e.target.value })}
          placeholder="Valor 2022"
        />
        <input
          type="number"
          value={nuevoPasivo.valor2021}
          onChange={(e) => setNuevoPasivo({ ...nuevoPasivo, valor2021: e.target.value })}
          placeholder="Valor 2021"
        />
        <button onClick={agregarPasivo}>Agregar Pasivo</button>
      </div>

      {/* Cuadro de Contabilidad */}
      <h3>Cuadro de Contabilidad</h3>
      <table>
        <thead>
          <tr>
            <th>Descripción Activo</th>
            <th>Valor 2022</th>
            <th>Valor 2021</th>
            <th>Descripción Pasivo</th>
            <th>Valor 2022</th>
            <th>Valor 2021</th>
          </tr>
        </thead>
        <tbody>
          {activos.map((activo, index) => (
            <tr key={index}>
              <td>{activo.descripcion}</td>
              <td>{activo.valor2022}</td>
              <td>{activo.valor2021}</td>
              {pasivos[index] ? (
                <>
                  <td>{pasivos[index].descripcion}</td>
                  <td>{pasivos[index].valor2022}</td>
                  <td>{pasivos[index].valor2021}</td>
                </>
              ) : (
                <>
                  <td></td>
                  <td></td>
                  <td></td>
                </>
              )}
            </tr>
          ))}
          {pasivos.slice(activos.length).map((pasivo, index) => (
            <tr key={index + activos.length}>
              <td></td>
              <td></td>
              <td></td>
              <td>{pasivo.descripcion}</td>
              <td>{pasivo.valor2022}</td>
              <td>{pasivo.valor2021}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Formulario para el CPV */}
      <h3>Calcular Costo de Productos Vendidos (CPV)</h3>
      <input
        type="number"
        value={inventarioInicial}
        onChange={(e) => setInventarioInicial(e.target.value)}
        placeholder="Inventario Inicial"
      />
      <input
        type="number"
        value={costosDirectos}
        onChange={(e) => setCostosDirectos(e.target.value)}
        placeholder="Costos Directos"
      />
      <input
        type="number"
        value={costosIndirectos}
        onChange={(e) => setCostosIndirectos(e.target.value)}
        placeholder="Costos Indirectos"
      />
      <input
        type="number"
        value={compras}
        onChange={(e) => setCompras(e.target.value)}
        placeholder="Compras"
      />
      <input
        type="number"
        value={inventarioFinal}
        onChange={(e) => setInventarioFinal(e.target.value)}
        placeholder="Inventario Final"
      />
      <button onClick={calcularCpv}>Calcular CPV</button>

      {cpv !== null && (
        <div style={{ marginTop: '20px', padding: '10px', border: '1px solid #ddd' }}>
          <h4>Resultado del CPV: {cpv}</h4>
          <button onClick={descargarBalance}>Descargar Balance</button>
        </div>
      )}
    </div>
  );
};

export default Registro;