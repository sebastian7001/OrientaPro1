function buscarJustificante() {
    const nombre = document.getElementById('nombreBuscar').value;
    const solicitudes = JSON.parse(localStorage.getItem('solicitudes')) || [];
    const solicitud = solicitudes.find(s => s.nombre.toLowerCase() === nombre.toLowerCase());

    if (solicitud) {
      document.getElementById('resultado').classList.remove('hidden');
      const estado = solicitud.estado;
      let estadoTexto = '';
      if (estado === 'pendiente') {
        estadoTexto = '⏳ En espera de revisión';
      } else if (estado === 'aprobado') {
        estadoTexto = '✅ Aprobado';
      } else if (estado === 'no aprobado') {
        estadoTexto = '❌ No aprobado';
      }
      document.getElementById('estadoJustificante').textContent = estadoTexto;
    } else {
      alert('No se encontró ninguna solicitud para ese nombre.');
    }
  }





 const links = document.querySelectorAll('.header__link');
 const currentPage = location.pathname.split('/').pop();


 links.forEach(link => {
   const href = link.getAttribute('href');
   // Marca como activo el enlace que coincide con la página actual
   if (href === currentPage || (href === "#" && currentPage === "")) {
     link.classList.add('active');
   }
 });