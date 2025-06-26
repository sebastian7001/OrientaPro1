document.querySelectorAll('.botones a button').forEach(button => {
  button.addEventListener('mouseover', function() {
      this.querySelector('span').style.animation = 'float 1s infinite ease-in-out';
  });
  
  button.addEventListener('mouseout', function() {
      this.querySelector('span').style.animation = 'none';
  });
});

const toggles = [
  document.getElementById('modoToggleLeft'),
  document.getElementById('modoToggleRight')
];

const logo = document.getElementById('logoImagen');

function actualizarIcono(isDark) {
  toggles.forEach(btn => {
    if (btn) btn.textContent = isDark ? '☀️' : '🌙';
  });
}

function actualizarLogo(isDark) {
  if (logo) {
    logo.src = isDark ? 'imagenes/image5.png' : 'imagenes/image-2.png';
  }
}

// Leer estado guardado
const modoGuardado = localStorage.getItem('modoOscuro') === 'true';
if (modoGuardado) {
  document.body.classList.add('dark-mode');
}

const modoActual = document.body.classList.contains('dark-mode');
actualizarIcono(modoActual);
actualizarLogo(modoActual);

// Evento para cambiar el modo
toggles.forEach(btn => {
  if (btn) {
    btn.addEventListener('click', () => {
      const isDark = document.body.classList.toggle('dark-mode');
      localStorage.setItem('modoOscuro', isDark);
      actualizarIcono(isDark);
      actualizarLogo(isDark);
    });
  }
});
