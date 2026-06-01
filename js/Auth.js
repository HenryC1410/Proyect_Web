
const USUARIOS_INICIALES = [
  {
    id:       "usr-001",
    nombre:   "Administrador",
    email:    "admin@logitrack.com",
    password: "Admin2025",
    rol:      "admin",
    activo:   true,
    fechaRegistro: "2025-01-01T00:00:00.000Z"
  },
  {
    id:       "usr-002",
    nombre:   "Luis Ponce",
    email:    "operador@logitrack.com",
    password: "Operador2025",
    rol:      "operador",
    activo:   true,
    fechaRegistro: "2025-01-01T00:00:00.000Z"
  }
];
 

const RUTAS = {
  admin:    "dashboard.html",
  operador: "estado.html",
  cliente:  "portal.html"
};
 

function inicializarUsuarios() {
  const existe = localStorage.getItem("logitrack_usuarios");
  if (!existe) {
    localStorage.setItem(
      "logitrack_usuarios",
      JSON.stringify(USUARIOS_INICIALES)
    );
  }
}
 

function getUsuarios() {
  return JSON.parse(localStorage.getItem("logitrack_usuarios")) || [];
}

function setUsuarios(usuarios) {
  localStorage.setItem("logitrack_usuarios", JSON.stringify(usuarios));
}
 

function login(email, password) {
  const usuarios = getUsuarios();
 
  const usuario = usuarios.find(
    u => u.email.toLowerCase() === email.toLowerCase().trim()
  );
 
  if (!usuario) {
    return { ok: false, error: "No existe una cuenta con ese correo." };
  }
 
  if (usuario.password !== password) {
    return { ok: false, error: "Contraseña incorrecta. Inténtalo de nuevo." };
  }
 
  if (!usuario.activo) {
    return { ok: false, error: "Tu cuenta está desactivada. Contacta al administrador." };
  }
 

  const sesion = {
    id:     usuario.id,
    nombre: usuario.nombre,
    email:  usuario.email,
    rol:    usuario.rol
  };
  sessionStorage.setItem("logitrack_sesion", JSON.stringify(sesion));
 
  return { ok: true, usuario: sesion };
}
 

function signUp(nombre, email, password) {
  const usuarios = getUsuarios();
 
  // Verificar si el email ya existe
  const existe = usuarios.find(
    u => u.email.toLowerCase() === email.toLowerCase().trim()
  );
  if (existe) {
    return { ok: false, error: "Ya existe una cuenta con ese correo." };
  }
 
  const nuevo = {
    id:       "usr-" + Date.now(),
    nombre:   nombre.trim(),
    email:    email.toLowerCase().trim(),
    password: password,
    rol:      "cliente",      
    activo:   true,
    fechaRegistro: new Date().toISOString()
  };
 
  usuarios.push(nuevo);
  setUsuarios(usuarios);
 
  return { ok: true, usuario: nuevo };
}

function logout() {
  sessionStorage.removeItem("logitrack_sesion");
  window.location.href = "login.html";
}
 

function getSesion() {
  return JSON.parse(sessionStorage.getItem("logitrack_sesion"));
}
 

function protegerPagina(rolesPermitidos) {
  const sesion = getSesion();
 
  if (!sesion) {
    window.location.href = "login.html";
    return false;
  }
 
  if (!rolesPermitidos.includes(sesion.rol)) {
    alert("No tienes permiso para acceder a esta página.");
    window.location.href = "login.html";
    return false;
  }
 
  return true;
}
 
/* ================================================
   ARRANQUE
================================================ */
inicializarUsuarios();



