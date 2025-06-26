
    const listaJustificantes = document.getElementById('listaJustificantes');
    let solicitudes = JSON.parse(localStorage.getItem('solicitudes')) || [];

    if (solicitudes.length === 0) {
      listaJustificantes.innerHTML = '<p>No hay solicitudes pendientes.</p>';
    } else {
      solicitudes.forEach((solicitud, index) => {
        if (solicitud.estado === 'pendiente') {
          const div = document.createElement('div');
          div.innerHTML = `
            <h3>Solicitud #${solicitud.id}</h3>
            <p><strong>Alumno:</strong> ${solicitud.nombre}</p>
            <p><strong>Motivo:</strong> ${solicitud.motivo}</p>
            <p><strong>Día(s):</strong> ${solicitud.dias}</p>
            <p><strong>Mes:</strong> ${solicitud.mes}</p>
            <button class="approve-btn" onclick="aprobar(${index})">✅ Aprobar</button>
            <button class="reject-btn" onclick="rechazar(${index})">❌ No Aprobar</button>
          `;
          listaJustificantes.appendChild(div);
        }
      });
    }

    function aprobar(index) {
      solicitudes[index].estado = 'aprobado';
      localStorage.setItem('solicitudes', JSON.stringify(solicitudes));
      location.reload();
    }

    function rechazar(index) {
      solicitudes[index].estado = 'no aprobado';
      localStorage.setItem('solicitudes', JSON.stringify(solicitudes));
      location.reload();
    }

    // ACTIVAR ENLACE DE NAVEGACIÓN
    const links = document.querySelectorAll('.header__link');
    const currentPage = decodeURIComponent(location.pathname.split('/').pop());

    links.forEach(link => {
      const href = link.getAttribute('href');
      if (href === currentPage) {
        link.classList.add('active');
      }
    });
