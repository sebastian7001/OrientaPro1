const justificanteForm = document.getElementById('justificanteForm');
const mensajeExito = document.getElementById('mensajeExito');
const tituloFormulario = document.getElementById('tituloFormulario');

justificanteForm.addEventListener('submit', function(e) {
  e.preventDefault();

  const solicitud = {
    id: Date.now(),
    nombre: document.getElementById('nombre').value,
    motivo: document.getElementById('motivo').value,
    dias: document.getElementById('dias').value,
    mes: document.getElementById('mes').value,
    estado: 'pendiente'
  };

  let solicitudes = JSON.parse(localStorage.getItem('solicitudes')) || [];
  solicitudes.push(solicitud);
  localStorage.setItem('solicitudes', JSON.stringify(solicitudes));

  justificanteForm.style.display = 'none';
  tituloFormulario.textContent = 'Solicitud enviada';
  mensajeExito.classList.remove('hidden');
});

const links = document.querySelectorAll('.header__link');
const currentPage = location.pathname.split('/').pop();

links.forEach(link => {
  const href = link.getAttribute('href');
  if (href === currentPage) {
    link.classList.add('active');
  }
});