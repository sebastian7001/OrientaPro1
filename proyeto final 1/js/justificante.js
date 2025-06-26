document.addEventListener('DOMContentLoaded', function() {
  // Referencias DOM
  const btnFormulario = document.getElementById('btnFormulario');
  const btnFirma = document.getElementById('btnFirma');
  const btnImprimir = document.getElementById('btnImprimir');
  const formularioRapido = document.getElementById('formularioRapido');
  const formularioFirma = document.getElementById('formularioFirma');
  const overlay = document.getElementById('overlay');
  const btnCancelar = document.getElementById('btnCancelar');
  const btnAplicar = document.getElementById('btnAplicar');
  const btnCancelarFirma = document.getElementById('btnCancelarFirma');
  const btnAplicarFirma = document.getElementById('btnAplicarFirma');
  const btnLimpiarFirma = document.getElementById('btnLimpiarFirma');
  const mensajeFirma = document.querySelector('.mensaje-firma');
  
  // Canvas para firma - Implementación mejorada
  const canvas = document.getElementById('firmaPad');
  const ctx = canvas.getContext('2d');
  const firmaContainer = document.getElementById('firma-container');
  ctx.lineWidth = 2;
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';
  ctx.strokeStyle = '#000000';
  
  // Inputs del formulario
  const formNombreAlumno = document.getElementById('formNombreAlumno');
  const formDepartamento = document.getElementById('formDepartamento');
  const formMotivo = document.getElementById('formMotivo');
  const formFechaInicio = document.getElementById('formFechaInicio');
  const formFechaFin = document.getElementById('formFechaFin');
  const formFechaJustificante = document.getElementById('formFechaJustificante');
  const imagenFirma = document.getElementById('imagenFirma');
  
  // Campos del documento
  const nombreAlumno = document.getElementById('nombreAlumno');
  const departamento = document.getElementById('departamento');
  const motivo = document.getElementById('motivo');
  const diasFaltados = document.getElementById('diasFaltados');
  const mesFaltado = document.getElementById('mesFaltado');
  const dia = document.getElementById('dia');
  const mes = document.getElementById('mes');
  const anio = document.getElementById('anio');
  const firmaImagen = document.getElementById('firmaImagen');
  
  // Establecer fecha actual por defecto
  const hoy = new Date();
  formFechaJustificante.valueAsDate = hoy;
  formFechaInicio.valueAsDate = hoy;
  formFechaFin.valueAsDate = hoy;
  
  // Establecer fecha en el documento
  dia.value = hoy.getDate();
  const meses = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
  mes.value = meses[hoy.getMonth()];
  anio.value = hoy.getFullYear();
  
  // Variables para dibujo de firma
  let dibujando = false;
  let firmado = false;
  let puntosX = [];
  let puntosY = [];
  let ultimoX, ultimoY;
  
  // Ajustar tamaño del canvas
  function ajustarCanvas() {
      const rect = firmaContainer.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = 150;
      ctx.lineWidth = 2;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.strokeStyle = '#000000';
      
      // Volver a dibujar si hay firma
      if (firmado && puntosX.length > 0) {
          redibujarFirma();
      }
  }
  
  // Función para manejar el inicio del dibujo
  function iniciarDibujo(e) {
      e.preventDefault();
      dibujando = true;
      
      const posicion = obtenerPosicion(e);
      ultimoX = posicion.x;
      ultimoY = posicion.y;
      
      // Almacenar punto
      puntosX.push(ultimoX);
      puntosY.push(ultimoY);
      
      // Poner un punto donde se empieza
      ctx.beginPath();
      ctx.arc(ultimoX, ultimoY, 1, 0, Math.PI * 2);
      ctx.fill();
      
      // Ocultar mensaje
      mensajeFirma.style.display = 'none';
      firmado = true;
  }
  
  // Función para dibujar
  function dibujar(e) {
      if (!dibujando) return;
      e.preventDefault();
      
      const posicion = obtenerPosicion(e);
      const x = posicion.x;
      const y = posicion.y;
      
      // Dibujar línea
      ctx.beginPath();
      ctx.moveTo(ultimoX, ultimoY);
      ctx.lineTo(x, y);
      ctx.stroke();
      
      // Actualizar última posición
      ultimoX = x;
      ultimoY = y;
      
      // Almacenar punto
      puntosX.push(x);
      puntosY.push(y);
  }
  
  // Función para finalizar el dibujo
  function finalizarDibujo(e) {
      if (!dibujando) return;
      e.preventDefault();
      dibujando = false;
  }
  
  // Obtener posición del cursor/toque
  function obtenerPosicion(e) {
      const rect = canvas.getBoundingClientRect();
      let x, y;
      
      // Evento táctil
      if (e.touches && e.touches[0]) {
          x = e.touches[0].clientX - rect.left;
          y = e.touches[0].clientY - rect.top;
      } 
      // Evento de mouse
      else {
          x = e.clientX - rect.left;
          y = e.clientY - rect.top;
      }
      
      return { x, y };
  }
  
  // Redibujar la firma desde los puntos almacenados
  function redibujarFirma() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      if (puntosX.length < 2) return;
      
      ctx.beginPath();
      ctx.moveTo(puntosX[0], puntosY[0]);
      
      for (let i = 1; i < puntosX.length; i++) {
          ctx.lineTo(puntosX[i], puntosY[i]);
      }
      
      ctx.stroke();
  }
  
  // Limpiar canvas y reiniciar variables
  function limpiarCanvas() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      puntosX = [];
      puntosY = [];
      firmado = false;
      mensajeFirma.style.display = 'block';
  }
  
  // Adjuntar eventos de mouse al canvas
  canvas.addEventListener('mousedown', iniciarDibujo);
  canvas.addEventListener('mousemove', dibujar);
  canvas.addEventListener('mouseup', finalizarDibujo);
  canvas.addEventListener('mouseout', finalizarDibujo);
  
  // Adjuntar eventos táctiles al canvas
  canvas.addEventListener('touchstart', iniciarDibujo);
  canvas.addEventListener('touchmove', dibujar);
  canvas.addEventListener('touchend', finalizarDibujo);
  canvas.addEventListener('touchcancel', finalizarDibujo);
  
  // Eventos
  btnFormulario.addEventListener('click', mostrarFormulario);
  btnFirma.addEventListener('click', mostrarFormularioFirma);
  btnImprimir.addEventListener('click', imprimirDocumento);
  btnCancelar.addEventListener('click', ocultarFormulario);
  btnAplicar.addEventListener('click', aplicarDatos);
  btnCancelarFirma.addEventListener('click', ocultarFormularioFirma);
  btnAplicarFirma.addEventListener('click', aplicarFirma);
  btnLimpiarFirma.addEventListener('click', limpiarCanvas);
  overlay.addEventListener('click', ocultarTodosFormularios);
  
  // Evento para cargar imagen de firma
  imagenFirma.addEventListener('change', function(e) {
      const archivo = e.target.files[0];
      if (archivo) {
          const reader = new FileReader();
          reader.onload = function(event) {
              const img = new Image();
              img.onload = function() {
                  // Limpiar canvas y dibujar imagen
                  limpiarCanvas();
                  
                  // Calcular dimensiones para ajustar la imagen al canvas
                  const relacion = img.width / img.height;
                  let nuevoAncho = canvas.width;
                  let nuevoAlto = canvas.width / relacion;
                  
                  if (nuevoAlto > canvas.height) {
                      nuevoAlto = canvas.height;
                      nuevoAncho = canvas.height * relacion;
                  }
                  
                  // Centrar imagen en canvas
                  const x = (canvas.width - nuevoAncho) / 2;
                  const y = (canvas.height - nuevoAlto) / 2;
                  
                  // Dibujar imagen en canvas
                  ctx.drawImage(img, x, y, nuevoAncho, nuevoAlto);
                  
                  // Marcar como firmado
                  firmado = true;
                  mensajeFirma.style.display = 'none';
                  
                  // Para capturar los puntos de la imagen y poderlos redibujar
                  // (simulación - no es perfecta pero permite mantener la firma)
                  puntosX = [x, x + nuevoAncho, x + nuevoAncho, x, x];
                  puntosY = [y, y, y + nuevoAlto, y + nuevoAlto, y];
              };
              img.src = event.target.result;
          };
          reader.readAsDataURL(archivo);
      }
  });
  
  // Funciones
  function mostrarFormulario() {
      formularioRapido.style.display = 'block';
      overlay.style.display = 'block';
  }
  
  function ocultarFormulario() {
      formularioRapido.style.display = 'none';
      overlay.style.display = 'none';
  }
  
  function mostrarFormularioFirma() {
      formularioFirma.style.display = 'block';
      overlay.style.display = 'block';
      // Ajustar canvas cuando se muestra el formulario
      setTimeout(ajustarCanvas, 10);
  }
  
  function ocultarFormularioFirma() {
      formularioFirma.style.display = 'none';
      overlay.style.display = 'none';
  }
  
  function ocultarTodosFormularios() {
      formularioRapido.style.display = 'none';
      formularioFirma.style.display = 'none';
      overlay.style.display = 'none';
  }
  
  function imprimirDocumento() {
      window.print();
  }
  
  function aplicarDatos() {
      // Aplicar datos del formulario al documento
      nombreAlumno.value = formNombreAlumno.value;
      departamento.value = formDepartamento.value;
      motivo.value = formMotivo.value;
      
      // Formatear fechas de inasistencia
      if (formFechaInicio.value && formFechaFin.value) {
          const fechaInicio = new Date(formFechaInicio.value);
          const fechaFin = new Date(formFechaFin.value);
          
          // Si es el mismo día
          if (fechaInicio.getTime() === fechaFin.getTime()) {
              diasFaltados.value = fechaInicio.getDate();
          } else {
              // Rango de fechas
              diasFaltados.value = fechaInicio.getDate() + " al " + fechaFin.getDate();
          }
          
          // Mes de la inasistencia
          mesFaltado.value = meses[fechaInicio.getMonth()];
      }
      
      // Fecha del justificante
      if (formFechaJustificante.value) {
          const fechaJust = new Date(formFechaJustificante.value);
          dia.value = fechaJust.getDate();
          mes.value = meses[fechaJust.getMonth()];
          anio.value = fechaJust.getFullYear();
      }
      
      // Ocultar formulario
      ocultarFormulario();
  }
  
  function aplicarFirma() {
      if (!firmado) {
          alert("Por favor, dibuja o carga una firma primero.");
          return;
      }
      
      // Obtener imagen del canvas
      const imagenURL = canvas.toDataURL('image/png');
      
      // Mostrar la firma en el documento
      firmaImagen.src = imagenURL;
      firmaImagen.style.display = 'block';
      
      // Ocultar formulario
      ocultarFormularioFirma();
  }
  
  // Hacer que todos los campos de texto se puedan editar directamente
  const camposTexto = document.querySelectorAll('.campo-texto');
  camposTexto.forEach(campo => {
      campo.addEventListener('click', function() {
          this.focus();
      });
  });
  
  // Ajustar canvas al cargar y al cambiar tamaño de ventana
  ajustarCanvas();
  window.addEventListener('resize', ajustarCanvas);
});