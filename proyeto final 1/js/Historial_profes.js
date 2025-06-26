
    // Datos de ejemplo: justifcantes y reportes
    const historial = [
    {
      nombre: "Andrea Ruiz", control: "12001934", grupo: "4A", tipo: "Justificante",
      fecha: "2025-05-23", motivo: "Familiar", estado: "Aprobado"
    },
    {
      nombre: "Juan Pérez", control: "12002011", grupo: "4A", tipo: "Reporte",
      fecha: "2025-05-20", motivo: "Conducta inadecuada", estado: "Pendiente"
    },
    {
      nombre: "Ana Gómez", control: "12001956", grupo: "4B", tipo: "Justificante",
      fecha: "2025-05-19", motivo: "Salud", estado: "Aprobado"
    },
    {
      nombre: "Mario López", control: "12002121", grupo: "4B", tipo: "Reporte",
      fecha: "2025-05-19", motivo: "Faltas reiteradas", estado: "Rechazado"
    },
    {
      nombre: "Paola Torres", control: "12002210", grupo: "5A", tipo: "Justificante",
      fecha: "2025-05-18", motivo: "Cita médica", estado: "Aprobado"
    },
    {
      nombre: "Laura Ortiz", control: "12002013", grupo: "4A", tipo: "Reporte",
      fecha: "2025-05-17", motivo: "Indisciplina", estado: "Aprobado"
    },
    {
      nombre: "Sofía Hernández", control: "12002300", grupo: "5A", tipo: "Justificante",
      fecha: "2025-05-17", motivo: "Familiar", estado: "Pendiente"
    },
    {
      nombre: "José Sánchez", control: "12002100", grupo: "4B", tipo: "Reporte",
      fecha: "2025-05-16", motivo: "Faltas reiteradas", estado: "Aprobado"
    },
    {
      nombre: "Carlos Mendoza", control: "12002444", grupo: "5A", tipo: "Justificante",
      fecha: "2025-05-15", motivo: "Enfermedad", estado: "Rechazado"
    }
    // Puedes agregar más registros aquí
  ];

  function renderTabla(filtro = {}) {
    const tbody = document.querySelector("#tablaHistorial tbody");
    tbody.innerHTML = "";
    let datos = historial.filter(item => {
      return (!filtro.nombre || item.nombre.toLowerCase().includes(filtro.nombre.toLowerCase()))
        && (!filtro.grupo || item.grupo === filtro.grupo)
        && (!filtro.tipo || item.tipo === filtro.tipo)
        && (!filtro.fecha || item.fecha === filtro.fecha);
    });
    if (datos.length === 0) {
      tbody.innerHTML = `<tr><td colspan="8" style="text-align:center; color:gray;">No se encontraron resultados.</td></tr>`;
    } else {
      datos.forEach(item => {
        const estadoClass =
          item.estado === "Aprobado" ? "estado-aprobado" :
          item.estado === "Pendiente" ? "estado-pendiente" :
          "estado-rechazado";
        tbody.innerHTML += `
          <tr>
            <td>${item.nombre}</td>
            <td>${item.control}</td>
            <td>${item.grupo}</td>
            <td>${item.tipo}</td>
            <td>${item.fecha}</td>
            <td>${item.motivo}</td>
            <td class="${estadoClass}">${item.estado}</td>
            <td><button class="detalle-btn" onclick="alert('Aquí irán los detalles del documento de ${item.nombre}.')">Ver</button></td>
          </tr>
        `;
      });
    }
  }
  // Filtrar por los inputs
  document.getElementById("filtroAlumno").addEventListener("input", filtrar);
  document.getElementById("filtroGrupo").addEventListener("change", filtrar);
  document.getElementById("filtroTipo").addEventListener("change", filtrar);
  document.getElementById("filtroFecha").addEventListener("change", filtrar);

  function filtrar() {
    renderTabla({
      nombre: document.getElementById("filtroAlumno").value,
      grupo: document.getElementById("filtroGrupo").value,
      tipo: document.getElementById("filtroTipo").value,
      fecha: document.getElementById("filtroFecha").value
    });
  }
  // Renderizar al inicio
  renderTabla();



  const links = document.querySelectorAll('.header__link');
  const currentPage = location.pathname.split('/').pop();

  links.forEach(link => {
    if (link.getAttribute('href') === currentPage) {
      link.classList.add('active');
    }
  });
