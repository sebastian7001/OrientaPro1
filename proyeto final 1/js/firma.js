
/* <!-- Script para resaltar el enlace activo -->
 */
  const links = document.querySelectorAll('.header__link');
  const currentPage = location.pathname.split('/').pop();
  links.forEach(link => {
    const href = link.getAttribute('href');
    // Marca como activo el enlace que coincide con la página actual
    if (href === currentPage || (href === "#" && currentPage === "")) {
      link.classList.add('active');
    }
  });


document.addEventListener('DOMContentLoaded', () => {
    const meses = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
    const hoy = new Date();
    document.getElementById('dia').value = hoy.getDate();
    document.getElementById('mes').value = meses[hoy.getMonth()];
    document.getElementById('anio').value = hoy.getFullYear();
  
    // Rellenar rápido
    const overlay = document.getElementById('overlay');
    const formularioRapido = document.getElementById('formularioRapido');
    const btnFormulario = document.getElementById('btnFormulario');
    btnFormulario.addEventListener('click', () => {
      formularioRapido.style.display = 'block';
      overlay.style.display = 'block';
    });
    document.getElementById('btnCancelar').addEventListener('click', () => {
      formularioRapido.style.display = 'none';
      overlay.style.display = 'none';
    });
  
    document.getElementById('btnAplicar').addEventListener('click', () => {
      const formNombre = document.getElementById('formNombreAlumno').value;
      const formDepartamento = document.getElementById('formDepartamento').value;
      const formMotivo = document.getElementById('formMotivo').value;
      const fechaInasistencia = document.getElementById('formFechaInicio').value;
      const fechaJustificante = document.getElementById('formFechaJustificante').value;
  
      if (formNombre !== '') {
        document.getElementById('nombreAlumno').value = formNombre;
      }
      if (formDepartamento !== '') {
        document.getElementById('departamento').value = formDepartamento;
      }
      if (formMotivo !== '') {
        document.getElementById('motivo').value = formMotivo;
      }
  
      if (fechaInasistencia !== '') {
        const fechaInasistenciaObj = new Date(fechaInasistencia);
        document.getElementById('diasFaltados').value = fechaInasistenciaObj.getDate();
        document.getElementById('mesFaltado').value = meses[fechaInasistenciaObj.getMonth()];
      }
  
      if (fechaJustificante !== '') {
        const fechaJustificanteObj = new Date(fechaJustificante);
        document.getElementById('dia').value = fechaJustificanteObj.getDate();
        document.getElementById('mes').value = meses[fechaJustificanteObj.getMonth()];
        document.getElementById('anio').value = fechaJustificanteObj.getFullYear();
      }
  
      formularioRapido.style.display = 'none';
      overlay.style.display = 'none';
    });
  
    // Firma modal
    const firmaImagen = document.getElementById('firmaImagen');
    const formularioFirma = document.getElementById('formularioFirma');
    const canvas = document.getElementById('firmaPad');
    const ctx = canvas.getContext('2d');
    canvas.width = 400;
    canvas.height = 150;
    ctx.lineWidth = 2;
    let dibujando = false;
  
    document.getElementById('btnFirma').addEventListener('click', () => {
      formularioFirma.style.display = 'block';
      overlay.style.display = 'block';
    });
    document.getElementById('btnCancelarFirma').addEventListener('click', () => {
      formularioFirma.style.display = 'none';
      overlay.style.display = 'none';
    });
    document.getElementById('btnAplicarFirma').addEventListener('click', () => {
      firmaImagen.src = canvas.toDataURL('image/png');
      firmaImagen.style.display = 'block';
      formularioFirma.style.display = 'none';
      overlay.style.display = 'none';
    });
    document.getElementById('btnLimpiarFirma').addEventListener('click', () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    });
    canvas.addEventListener('mousedown', e => {
      dibujando = true;
      ctx.beginPath();
      ctx.moveTo(e.offsetX, e.offsetY);
    });
    canvas.addEventListener('mousemove', e => {
      if (dibujando) {
        ctx.lineTo(e.offsetX, e.offsetY);
        ctx.stroke();
      }
    });
    canvas.addEventListener('mouseup', () => dibujando = false);
    canvas.addEventListener('mouseout', () => dibujando = false);
  
    // Guardar justificante
    document.getElementById('btnGuardar').addEventListener('click', () => {
      const firmaDataURL = firmaImagen.src || '';
      const justificantes = JSON.parse(localStorage.getItem('justificantes')) || [];
      justificantes.push({
        nombreAlumno: document.getElementById('nombreAlumno').value,
        departamento: document.getElementById('departamento').value,
        motivo: document.getElementById('motivo').value,
        diasFaltados: document.getElementById('diasFaltados').value,
        mesFaltado: document.getElementById('mesFaltado').value,
        dia: document.getElementById('dia').value,
        mes: document.getElementById('mes').value,
        anio: document.getElementById('anio').value,
        firma: firmaDataURL
      });
      localStorage.setItem('justificantes', JSON.stringify(justificantes));
      alert("Justificante guardado correctamente");
    });
  });