import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import 'katex/dist/katex.min.css';
import { calcularCargaOptima, calcularCostoMarginal, calcularLatenciaPromedio } from './balanceador.js'
import LoadBalancerDiagram from './LoadBalancerDiagram.jsx'
import { BlockMath } from 'react-katex'



function App() {
  const [peticiones, setPeticiones] = useState(210);

  // Estado para la lista de servidores
  const [servidores, setServidores] = useState([
    { nombre: 'Servidor 1', capacidad: 200 },
    { nombre: 'Servidor 2', capacidad: 100 },
    { nombre: 'Servidor 3', capacidad: 50 },
  ]);

  // Estado para el formulario de nuevo servidor
  const [nuevoNombre, setNuevoNombre] = useState('');
  const [nuevaCapacidad, setNuevaCapacidad] = useState(100);

  // Manejadores para actualizar servidores
  const handleCapacidadChange = (index, nuevaCap) => {
    const nuevosServidores = [...servidores];
    nuevosServidores[index].capacidad = Math.max(1, Number(nuevaCap) || 0);
    setServidores(nuevosServidores);
  };

  const handleEliminarServidor = (index) => {
    if (servidores.length <= 1) {
      alert('Debe haber al menos un servidor.');
      return;
    }
    setServidores(servidores.filter((_, i) => i !== index));
  };

  const handleAgregarServidor = (e) => {
    e.preventDefault();
    const nombreFinal = nuevoNombre.trim() || `Servidor ${servidores.length + 1}`;
    setServidores([
      ...servidores,
      { nombre: nombreFinal, capacidad: Number(nuevaCapacidad) || 50 }
    ]);
    setNuevoNombre('');
    setNuevaCapacidad(50);
  };

  const cargasOptimas = calcularCargaOptima(peticiones, servidores)

  const r = servidores.reduce((a, b) => a + b.capacidad, 0)
  const sumaDeRaices = Math.round(servidores.reduce((a, b) => a + Math.sqrt(b.capacidad), 0))
  const remanente = r - peticiones;
  const k = (remanente / sumaDeRaices).toFixed(4)
  return (
    <>
      <div className="layout-container">
        {/* Panel de Control Izquierdo */}
        <aside className="control-panel">
         
          
         <small style={{textAlign:"center"}}>
           <img src='https://unibarranquilla.edu.co/images/logo.png' width={96}/>
          <h2>Balanceador de carga</h2>
          Evaldo V., Mauricio C., Jesús G.,  Brayan V<br></br>
        <strong> Institución Universitaria de Barranquilla</strong> <br></br>
         Calculo Diferencial <br></br>
         Javier Zaroni <br></br>
         </small>
         <br></br>

          {/* Configuración de Peticiones Totales */}
          <div className="panel-section">
            <label htmlFor="peticiones-input">
              <strong>Peticiones Totales (L):</strong>
            </label>
            <input
              id="peticiones-input"
              type="number"
              min="1"
              value={peticiones}
              onChange={(e) => setPeticiones(Math.max(1, Number(e.target.value) || 0))}
            />
          </div>

          <hr className="divider" />

          {/* Lista y Edición de Servidores Existententes */}
          <div className="panel-section">
            <h3>Servidores</h3>
            <div className="servers-list">
              {servidores.map((srv, index) => (
                <div key={index} className="server-item">
                  <div className="server-info">
                    <span className="server-name">{srv.nombre}</span>
                    <button
                      type="button"
                      className="btn-delete"
                      onClick={() => handleEliminarServidor(index)}
                      title="Eliminar servidor"
                    >
                      ✕
                    </button>
                  </div>
                  <div className="capacity-input-group">
                    <label>Capacidad:</label>
                    <input
                      type="number"
                      min="1"
                      value={srv.capacidad}
                      onChange={(e) => handleCapacidadChange(index, e.target.value)}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <hr className="divider" />

          {/* Formulario para Agregar Servidor */}
          <form onSubmit={handleAgregarServidor} className="panel-section add-form">
            <h3>Añadir Servidor</h3>
            <input
              type="text"
              placeholder="Nombre (ej. Servidor 4)"
              value={nuevoNombre}
              onChange={(e) => setNuevoNombre(e.target.value)}
            />
            <div className="capacity-input-group">
              <label>Capacidad:</label>
              <input
                type="number"
                min="1"
                value={nuevaCapacidad}
                onChange={(e) => setNuevaCapacidad(e.target.value)}
              />
            </div>
            <button type="submit" className="btn-add">
              + Agregar Servidor
            </button>
          </form>
        </aside>
               <aside className="control-panel panel-right">
          <h2>Cálculo diferencial</h2>
        
          <p style={{ fontSize: '0.85rem', color: '#a6adc8' }}>
            Función <b>Lagrangiana</b> minimizando retardo total: Herramienta matemática fundamental que se utiliza para resolver problemas de optimización con restricciones
          </p>
          <BlockMath math={"x_i = v_i - \\sqrt{v_i} \\cdot (\\frac{\\sum v_i - L}{\\sum \\sqrt{v_i}})"} />
          <BlockMath math={`L=${peticiones}`} />
          <p style={{ fontSize: '0.85rem', color: '#a6adc8' }}>
            Suma de capacidades:
          </p>
          <BlockMath math={`\\sum v_j = ${servidores.map(s => s.capacidad).join("+")} = ${r}`} />
          <p style={{ fontSize: '0.85rem', color: '#a6adc8' }}>
            Capacidad remanente:
          </p>
          <BlockMath math={`\\sum v_j - L = ${r} - ${peticiones} = ${remanente} `} />

          <p style={{ fontSize: '0.85rem', color: '#a6adc8' }}>
            Suma de raices:
          </p>

          <BlockMath math={`\\sum \\sqrt{v_i} = ${sumaDeRaices}`} />
          <BlockMath math={`K = \\frac{\\sum v_j - L}{\\sum \\sqrt{v_i}} = \\frac{${remanente}}{${sumaDeRaices}} = ${k}`} />

          <p style={{ fontSize: '0.85rem', color: '#a6adc8' }}>
            Carga óptima de cada servidor:
          </p>

          {
            cargasOptimas?.map((servidor, i) => {
              return <BlockMath math={`s${i + 1} = ${servidor.capacidad} - \\sqrt{${servidor.capacidad}} \\cdot ${servidor.K} = ${servidor.asignadas}`} />
            })
          }

          <h4>Comprobación</h4>
          <p style={{ fontSize: '0.85rem', color: '#a6adc8' }}>
           La optimización mediante Multiplicadores de Lagrange logra una distribución de carga óptima y proporcional al igualar el <b>costo marginal</b> de todos los servidores activos. Esto garantiza que el sistema minimice la latencia total global sin desperdiciar capacidad en ningún nodo.
          </p>
          <BlockMath math={`D'(x) = \\frac{v}{v - x}`} />
           {
            cargasOptimas?.map((s, i) => {
              return <BlockMath math={`s${i+1} = D'(${s.asignadas}) = \\frac{${s.capacidad}}{${s.capacidad} - ${s.asignadas}} = ${s.costoMarginal}`}  />
            })
          }
        </aside>
        {/* Ámbitó del Canvas / Diagrama */}
        <main className="diagram-container">
          <LoadBalancerDiagram L={peticiones} servidores={cargasOptimas} />
        </main>

       
      </div>
    </>
  )
}

export default App
