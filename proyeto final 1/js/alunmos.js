
function girarCredencial() {
  document.getElementById('credencial').classList.toggle('flip');
}

function descargarCredencial() {
  const frente = document.getElementById('frente');
  const reverso = document.getElementById('reverso');
  const contenedor = document.createElement('div');
  contenedor.style.width = '480px';
  contenedor.style.background = '#ffffff';
  contenedor.style.padding = '20px';
  contenedor.style.borderRadius = '20px';
  contenedor.style.boxShadow = '0 4px 10px rgba(0,0,0,0.3)';
  contenedor.style.boxSizing = 'border-box';

  const frenteClonado = frente.cloneNode(true);
  const reversoClonado = reverso.cloneNode(true);

  frenteClonado.style.position = 'static';
  reversoClonado.style.position = 'static';
  reversoClonado.style.transform = 'none';
  reversoClonado.style.backfaceVisibility = 'visible';

  contenedor.appendChild(frenteClonado);
  contenedor.appendChild(document.createElement('hr'));
  contenedor.appendChild(reversoClonado);

  document.body.appendChild(contenedor);

  html2canvas(contenedor).then(canvas => {
    const enlace = document.createElement('a');
    enlace.href = canvas.toDataURL("image/png");
    enlace.download = "credencial_completa.png";
    enlace.click();
    document.body.removeChild(contenedor);
  }).catch(err => {
    console.error("Error al capturar la credencial:", err);
    document.body.removeChild(contenedor);
  });
}

function verDetalle(detalle) {
  alert("Detalle: " + detalle);
}

function agregarReporte() {
  alert("Función para agregar reportes (pendiente).");
}

function agregarJustificante() {
  alert("Función para agregar justificantes (pendiente).");
}
