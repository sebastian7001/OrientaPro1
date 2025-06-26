 // Datos de ejemplo corregidos
 const datosHistorial = [
    {
      tipo: 'justificante',
      numeroControl: 'N/A',
      nombre: 'Juan Pérez',
      fecha: '2025-05-30',
      grado: '2',
      grupo: 'A',
      turno: 'Matutino',
      especialidad: 'Programación',
      semestre: '4',
      archivo: 'justificantes/juan_perez.pdf'
    },
    {
      tipo: 'reporte',
      numeroControl: '123456',
      nombre: 'María González',
      fecha: '2025-05-29',
      grado: '3',
      grupo: 'B',
      turno: 'Vespertino',
      especialidad: 'Contabilidad',
      semestre: '5',
      archivo: 'reportes/123456.pdf'
    },
    {
      tipo: 'justificante',
      numeroControl: 'N/A',
      nombre: 'Carlos Martínez',
      fecha: '2025-05-28',
      grado: '1',
      grupo: 'A',
      turno: 'Matutino',
      especialidad: 'Electrónica',
      semestre: '2',
      archivo: 'justificantes/carlos_martinez.pdf'
    },
    {
      tipo: 'reporte',
      numeroControl: '789012',
      nombre: 'Ana López',
      fecha: '2025-05-27',
      grado: '2',
      grupo: 'B',
      turno: 'Vespertino',
      especialidad: 'Ofimática',
      semestre: '3',
      archivo: 'reportes/789012.pdf'
    },
    {
      tipo: 'justificante',
      numeroControl: 'N/A',
      nombre: 'Roberto Silva',
      fecha: '2025-05-26',
      grado: '3',
      grupo: 'A',
      turno: 'Matutino',
      especialidad: 'Soporte y Mantenimiento de Equipo de Cómputo',
      semestre: '6',
      archivo: 'justificantes/roberto_silva.pdf'
    },
    {
      tipo: 'reporte',
      numeroControl: '456789',
      nombre: 'Laura Jiménez',
      fecha: '2025-05-25',
      grado: '1',
      grupo: 'B',
      turno: 'Vespertino',
      especialidad: 'Administración de Recursos Humanos',
      semestre: '1',
      archivo: 'reportes/456789.pdf'
    }
  ];

  // Función para formatear fecha
  function formatearFecha(fecha) {
    const opciones = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(fecha).toLocaleDateString('es-ES', opciones);
  }

  // Función para filtrar y mostrar datos
  function filtrarDatos() {
    const filtros = {
      tipo: document.getElementById('tipo').value,
      texto: document.getElementById('busqueda').value.toLowerCase(),
      fecha: document.getElementById('fecha').value,
      grado: document.getElementById('grado').value,
      grupo: document.getElementById('grupo').value,
      turno: document.getElementById('turno').value,
      especialidad: document.getElementById('especialidad').value,
      semestre: document.getElementById('semestre').value,
    };

    const resultados = datosHistorial.filter(d => {
      return (
        (filtros.tipo === 'todos' || d.tipo === filtros.tipo) &&
        (filtros.texto === '' || 
         d.nombre.toLowerCase().includes(filtros.texto) ||
         d.numeroControl.toLowerCase().includes(filtros.texto)) &&
        (filtros.fecha === '' || d.fecha === filtros.fecha) &&
        (filtros.grado === '' || d.grado === filtros.grado) &&
        (filtros.grupo === '' || d.grupo === filtros.grupo) &&
        (filtros.turno === '' || d.turno === filtros.turno) &&
        (filtros.especialidad === '' || d.especialidad === filtros.especialidad) &&
        (filtros.semestre === '' || d.semestre === filtros.semestre)
      );
    });

    mostrarResultados(resultados);
  }

  // Función para mostrar resultados en la tabla
  function mostrarResultados(resultados) {
    const tbody = document.getElementById('tablaHistorial');
    tbody.innerHTML = '';

    if (resultados.length === 0) {
      tbody.innerHTML = `
        <tr>
          <td colspan="10" class="no-results">
            <div>
              📋<br>
              <strong>No se encontraron registros</strong><br>
              <small>Intenta ajustar los filtros de búsqueda</small>
            </div>
          </td>
        </tr>
      `;
      return;
    }

    resultados.forEach(r => {
      const tipoClass = r.tipo === 'justificante' ? 'justificante-row' : 'reporte-row';
      const tipoBadge = r.tipo === 'justificante' 
        ? '<span class="badge bg-success">Justificante</span>'
        : '<span class="badge bg-warning text-dark">Reporte</span>';
      
      const numeroControlDisplay = r.numeroControl === 'N/A' 
        ? '<span class="na-text">N/A</span>'
        : `<span class="numero-control">${r.numeroControl}</span>`;

      tbody.innerHTML += `
        <tr class="${tipoClass}">
          <td>${numeroControlDisplay}</td>
          <td><strong>${r.nombre}</strong></td>
          <td>${tipoBadge}</td>
          <td><span class="fecha-text">${formatearFecha(r.fecha)}</span></td>
          <td><div class="especialidad-text">${r.especialidad}</div></td>
          <td><strong>${r.grado}°</strong></td>
          <td><strong>${r.grupo}</strong></td>
          <td>${r.turno}</td>
          <td><strong>${r.semestre}</strong></td>
          <td><a href="${r.archivo}" target="_blank" class="btn btn-sm btn-outline-primary">Ver documento</a></td>
        </tr>
      `;
    });
  }

  // Event listeners
  document.getElementById('formFiltros').addEventListener('submit', function(e) {
    e.preventDefault();
    filtrarDatos();
  });

  // Cargar todos los datos al inicio
  document.addEventListener('DOMContentLoaded', function() {
    mostrarResultados(datosHistorial);
  });

  // Filtrado en tiempo real para búsqueda de texto
  document.getElementById('busqueda').addEventListener('input', filtrarDatos);
  const links = document.querySelectorAll('.header__link');
  const currentPage = location.pathname.split('/').pop();

  links.forEach(link => {
    if (link.getAttribute('href') === currentPage) {
      link.classList.add('active');
    }
  });