function togglePassword(id, icon) {
  const input = document.getElementById(id);
  if (input.type === 'password') {
    input.type = 'text';
    icon.classList.remove('fa-eye');
    icon.classList.add('fa-eye-slash');
  } else {
    input.type = 'password';
    icon.classList.remove('fa-eye-slash');
    icon.classList.add('fa-eye');
  }
}

function mostrarRegistro() {
  document.getElementById('formLogin').style.display = 'none';
  document.getElementById('formRegistro').style.display = 'block';
}

function mostrarLogin() {
  document.getElementById('formLogin').style.display = 'block';
  document.getElementById('formRegistro').style.display = 'none';
}

function verificarAcceso() {
  const correo = document.getElementById("correoAcceso").value.trim();
  const clave = document.getElementById("claveAcceso").value.trim();

  const usuarios = [
    { correo: "23.gomez.aguilar.sebastian@cetis120.edu.mx", clave: "12345", redireccion: "sebastian.html" },
    { correo: "24.ramirez.perez.fernanda@cetis120.edu.mx", clave: "12345", redireccion: "alunmos.html" },
    { correo: "23.samano.perez.mateo@cetis120.edu.mx", clave: "12345", redireccion: "MATEO.html" },
    { correo: "orientador@cetis120.com", clave: "orientador123", redireccion: "alunmos.html" },
    { correo: "mateo@cetis120.com", clave: "mateo123", redireccion: "alunmos.html" }
  ];

  const usuariosLocales = JSON.parse(localStorage.getItem('usuarios') || '[]');
  const todosUsuarios = [...usuarios, ...usuariosLocales.map(u => ({ ...u, redireccion: 'alunmos.html' }))];

  const usuarioValido = todosUsuarios.find(user => user.correo === correo && user.clave === clave);

  if (usuarioValido) {
    window.location.href = usuarioValido.redireccion;
  } else {
    document.getElementById("errorClave").innerText = "❌ Correo o contraseña incorrectos";
  }
}

function registrarUsuario() {
  const correo = document.getElementById("correoRegistro").value.trim();
  const clave = document.getElementById("claveRegistro").value.trim();
  if (!correo || !clave) {
    alert("Completa todos los campos");
    return;
  }
  const usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]');
  if (usuarios.find(u => u.correo === correo)) {
    alert("Este correo ya está registrado.");
    return;
  }
  usuarios.push({ correo, clave });
  localStorage.setItem('usuarios', JSON.stringify(usuarios));
  alert("✅ Registro exitoso. Ya puedes iniciar sesión.");
  mostrarLogin();
}