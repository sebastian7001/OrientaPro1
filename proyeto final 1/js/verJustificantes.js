/* para los botones paque este en ver de  */
const links = document.querySelectorAll('.header__link');
    const currentPage = location.pathname.split('/').pop();

    links.forEach(link => {
      if (link.getAttribute('href') === currentPage) {
        link.classList.add('active');
      }
    });
/* esto es para lo de ver los justificantes
 */document.addEventListener('DOMContentLoaded', () => {
    const contenedor = document.getElementById('contenedorJustificantes');
    let justificantes = JSON.parse(localStorage.getItem('justificantes')) || [];
  
    function crearBuscador() {
      const buscadorDiv = document.createElement('div');
      buscadorDiv.classList.add('formulario-rapido', 'buscador');
      buscadorDiv.innerHTML = `
        <h3>Buscar justificantes</h3>
        <div class="form-group">
          <label for="buscarNombre">Nombre del alumno:</label>
          <input type="text" id="buscarNombre" placeholder="Ej. Juan Pérez">
        </div>
        <div class="form-group">
          <label for="buscarFecha">Fecha:</label>
          <input type="text" id="buscarFecha" placeholder="Ej. 06 junio 2025">
        </div>
        <div class="botones-form">
          <button id="btnBuscar">Buscar</button>
          <button id="btnLimpiar">Limpiar</button>
        </div>
      `;
      contenedor.appendChild(buscadorDiv);
  
      document.getElementById('btnBuscar').addEventListener('click', filtrarJustificantes);
      document.getElementById('btnLimpiar').addEventListener('click', () => {
        document.getElementById('buscarNombre').value = '';
        document.getElementById('buscarFecha').value = '';
        mostrarJustificantes(justificantes);
      });
    }
  
    function mostrarJustificantes(lista) {
      contenedor.innerHTML = '';
      crearBuscador();
  
      if (lista.length === 0) {
        const p = document.createElement('p');
        p.style.textAlign = 'center';
        p.textContent = 'No hay justificantes encontrados.';
        contenedor.appendChild(p);
        return;
      }
  
      lista.forEach((j, index) => {
        const div = document.createElement('div');
        div.classList.add('documento');
        div.innerHTML = `
          <button class="boton-eliminar" onclick="eliminarJustificante(${index})">🗑️</button>
          <div class="encabezado">
            <div class="logo-container">
              <div class="logo"></div>
              <div class="titulo-sep">
                <h1>EDUCACIÓN</h1>
                <p>Secretaría de Educación Pública</p>
              </div>
            </div>
            <div class="info-escuela">
              <p>Subsecretaría de Educación Media Superior<br>
              Dirección General de Educación Tecnológica Industrial y de Servicios<br>
              CETis No. 120 "Josefa Ortiz de Domínguez"</p>
            </div>
          </div>
          <div class="titulo-justificante">JUSTIFICANTE</div>
  
          <div class="fecha">
            Morelia, Mich., a 
            <span class="campo-linea">${j.dia}</span> de 
            <span class="campo-linea">${j.mes}</span> de 
            <span class="campo-linea">${j.anio}</span>
          </div>
  
          <div class="contenido">
            <p>
              C. PROFESORES DEL 
              <span class="campo-linea">${j.departamento}</span><br>
              P R E S E N T E S.-
            </p>
            <p>
              Por este conducto, solicito a ustedes le sea justificada la inasistencia al(a) alumno(a):
              <span class="campo-linea">${j.nombreAlumno}</span>, quien por motivos:
              <span class="campo-linea">${j.motivo}</span>, no asistió a clase el(los) día(s)
              <span class="campo-linea">${j.diasFaltados}</span> de 
              <span class="campo-linea">${j.mesFaltado}</span> del presente año.
            </p>
            <p>
              <span class="texto-enfasis">RESPONSABILIDAD DEL ALUMNO(A):</span> regularizarse en la entrega de trabajos y/o tareas.
            </p>
          </div>
  
          <div class="firmas">
            <p>A T E N T A M E N T E:</p>
            <p>Oficina de Orientación Educativa</p>
            <div class="area-firma">
              ${j.firma ? `<img src="${j.firma}" class="firma-img">` : '<p>(Sin firma adjunta)</p>'}
              <div class="linea-firma"></div>
              <p>______________________________</p>
            </div>
          </div>
        `;
        contenedor.appendChild(div);
      });
    }
  
    window.eliminarJustificante = (index) => {
      if (confirm("¿Seguro que deseas eliminar este justificante?")) {
        justificantes.splice(index, 1);
        localStorage.setItem('justificantes', JSON.stringify(justificantes));
        mostrarJustificantes(justificantes);
      }
    };
  
    function filtrarJustificantes() {
      const filtroNombre = document.getElementById('buscarNombre').value.trim().toLowerCase();
      const filtroFecha = document.getElementById('buscarFecha').value.trim().toLowerCase();
  
      const filtrados = justificantes.filter(j => {
        const coincideNombre = j.nombreAlumno.toLowerCase().includes(filtroNombre);
        const fechaTexto = `${j.dia} ${j.mes} ${j.anio}`.toLowerCase();
        const coincideFecha = fechaTexto.includes(filtroFecha);
        return coincideNombre && coincideFecha;
      });
  
      mostrarJustificantes(filtrados);
    }
  
    mostrarJustificantes(justificantes);
  });
  

 