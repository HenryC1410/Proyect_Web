
function irPaso2() {
  if (!validarPaso1()) return;
  document.getElementById('paso-1').classList.remove('activo');
  document.getElementById('paso-2').classList.add('activo');
  document.getElementById('circle-1').className = 'step-circle hecho';
  document.getElementById('circle-1').innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
      stroke-width="2.5" stroke="currentColor" width="16" height="16" aria-hidden="true">
      <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5" />
    </svg>`;
  document.getElementById('lbl-1').className  = 'step-lbl hecho';
  document.getElementById('conector-1').classList.add('hecho');
  document.getElementById('circle-2').className = 'step-circle activo';
  document.getElementById('lbl-2').className  = 'step-lbl activo';
 
  document.getElementById('password').focus();
}
 
function irPaso1() {
  document.getElementById('paso-2').classList.remove('activo');
  document.getElementById('paso-1').classList.add('activo');
 
  document.getElementById('circle-1').className = 'step-circle activo';
  document.getElementById('circle-1').textContent = '1';
  document.getElementById('lbl-1').className  = 'step-lbl activo';
  document.getElementById('conector-1').classList.remove('hecho');
  document.getElementById('circle-2').className = 'step-circle';
  document.getElementById('lbl-2').className  = 'step-lbl';
}

function validarPaso1() {
  let ok = true;
 
  const nombres   = document.getElementById('nombres');
  const apellidos = document.getElementById('apellidos');
  const email     = document.getElementById('email');
  const telefono  = document.getElementById('telefono');
 
  if (!nombres.value.trim() || nombres.value.trim().length < 3 || !/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(nombres.value.trim())) {
    setFieldError(nombres, 'nombres-msg', 'Solo letras, mínimo 3 caracteres.');
    ok = false;
  }
 
  if (!apellidos.value.trim() || apellidos.value.trim().length < 3 || !/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(apellidos.value.trim())) {
    setFieldError(apellidos, 'apellidos-msg', 'Solo letras, mínimo 3 caracteres.');
    ok = false;
  }
 
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim())) {
    setFieldError(email, 'email-msg', 'Ingresa un correo electrónico válido.');
    ok = false;
  }
 
  if (!/^\d{10}$/.test(telefono.value.trim())) {
    setFieldError(telefono, 'telefono-msg', 'El teléfono debe tener exactamente 10 dígitos.');
    ok = false;
  }
 
  return ok;
}
 
function handleSignUp() {
  let ok = true;
  const pw = document.getElementById('password');
  const confirm = document.getElementById('confirm-pw');
  const terminos = document.getElementById('terminos');
  const btn = document.getElementById('btn-registrar');
 
  if (pw.value.length < 8 || !/\d/.test(pw.value) || !/[A-Z]/.test(pw.value)) {
    setFieldError(pw, 'pw-msg', 'Mínimo 8 caracteres, una mayúscula y un número.');
    ok = false;
  }
 
  
  if (pw.value !== confirm.value || !confirm.value) {
    setFieldError(confirm, 'confirm-msg', 'Las contraseñas no coinciden.');
    ok = false;
  }
 
  if (!terminos.checked) {
    document.getElementById('terminos-error').style.display = 'block';
    ok = false;
  }
 
  if (!ok) return;
 

  btn.disabled = true;
  btn.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
        stroke-width="2" stroke="currentColor" width="18" height="18"
        style="animation:spin 0.8s linear infinite;" aria-hidden="true">
        <path stroke-linecap="round" stroke-linejoin="round"
          d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993
          0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1
          13.803-3.7l3.181 3.182m0-4.991v4.99" />
    </svg>
    Creando cuenta...`;

  setTimeout(() => {
    const nombres = document.getElementById('nombres').value.trim();
    const apellidos = document.getElementById('apellidos').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = pw.value;
 
    const resultado = signUp(`${nombres} ${apellidos}`, email, password);
 
    if (!resultado.ok) {
      btn.disabled = false;
      btn.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
              stroke-width="2" stroke="currentColor" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round"
              d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
        </svg>
        Crear cuenta`;
        setFieldError(document.getElementById('email'), 'email-msg', resultado.error);
        irPaso1();
        return;
    }
 
    document.getElementById('form-contenido').style.display = 'none';
    document.querySelector('.stepper').style.display        = 'none';
    document.querySelector('h1').style.display              = 'none';
    document.querySelector('.card-sub').style.display       = 'none';
    document.getElementById('footer-card').style.display    = 'none';
    document.querySelector('.card-icon').style.display      = 'none';
 
    document.getElementById('exito-nombre').textContent = `${nombres} ${apellidos}`;
    document.getElementById('exito-email').textContent  = email;
    document.getElementById('exito-screen').classList.add('visible');
 
    }, 900);
}
 
function setFieldError(input, msgId, texto) {
  input.classList.remove('ok-field');
  input.classList.add('error-field');
  const msg = document.getElementById(msgId);
  msg.className = 'field-msg error';
  msg.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
          stroke-width="2" stroke="currentColor" aria-hidden="true">
      <path stroke-linecap="round" stroke-linejoin="round"
        d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z"/>
    </svg>${texto}`;
}
 
function setFieldOk(input, msgId, texto) {
  input.classList.remove('error-field');
  input.classList.add('ok-field');
  const msg = document.getElementById(msgId);
  msg.className = 'field-msg exito';
  msg.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
          stroke-width="2" stroke="currentColor" aria-hidden="true">
      <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5"/>
    </svg>${texto}`;
}
 
function validarCampoLive(input, msgId, tipo, min) {
  const v = input.value.trim();
  if (!v) { input.classList.remove('ok-field','error-field'); document.getElementById(msgId).className='field-msg'; return; }
 
  if (tipo === 'solo-letras') {
    if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(v) || v.length < min)
      setFieldError(input, msgId, `Solo letras, mínimo ${min} caracteres.`);
    else setFieldOk(input, msgId, '¡Correcto!');
  }
 
  if (tipo === 'email') {
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v))
      setFieldError(input, msgId, 'Formato inválido. Ej: correo@empresa.com');
    else setFieldOk(input, msgId, 'Correo válido ✓');
  }
 
  if (tipo === 'telefono') {
    if (!/^\d{10}$/.test(v))
      setFieldError(input, msgId, 'Debe tener exactamente 10 dígitos.');
    else setFieldOk(input, msgId, 'Teléfono válido ✓');
  }
}
 
function soloNumeros(input) {
  input.value = input.value.replace(/\D/g, '');
}
 
function evaluarPassword(input) {
  const v = input.value;
  const fuerza = document.getElementById('pw-strength');
  const texto  = document.getElementById('pw-text');
  const bars = [1,2,3,4].map(i => document.getElementById('bar-'+i));
 
  if (!v) { fuerza.style.display = 'none'; document.getElementById('pw-msg').className='field-msg'; input.classList.remove('ok-field','error-field'); return; }
 
  fuerza.style.display = 'block';
 
  let puntos = 0;
  if (v.length >= 8)  puntos++;
  if (/[A-Z]/.test(v)) puntos++;
  if (/\d/.test(v))   puntos++;
  if (/[^A-Za-z0-9]/.test(v)) puntos++;
 
  bars.forEach(b => b.className = 'pw-bar');
 
  if (puntos === 1) {
    bars[0].classList.add('weak');
    texto.textContent = 'Contraseña débil';
    texto.style.color = 'var(--color-error)';
  } else if (puntos === 2) {
    bars[0].classList.add('medium'); bars[1].classList.add('medium');
    texto.textContent = 'Contraseña regular';
    texto.style.color = 'var(--color-accent)';
  } else if (puntos === 3) {
    bars[0].classList.add('strong'); bars[1].classList.add('strong'); bars[2].classList.add('strong');
    texto.textContent = 'Contraseña fuerte';
    texto.style.color = 'var(--color-exito)';
  } else if (puntos === 4) {
    bars.forEach(b => b.classList.add('strong'));
    texto.textContent = 'Contraseña muy fuerte ✓';
    texto.style.color = 'var(--color-exito)';
  }
 
  if (v.length < 8 || !/\d/.test(v) || !/[A-Z]/.test(v))
    setFieldError(input, 'pw-msg', 'Mínimo 8 caracteres, una mayúscula y un número.');
  else
    setFieldOk(input, 'pw-msg', 'Contraseña válida ✓');
 
  if (document.getElementById('confirm-pw').value) validarConfirm();
}
 
function validarConfirm() {
  const pw      = document.getElementById('password').value;
  const confirm = document.getElementById('confirm-pw');
  if (!confirm.value) { confirm.classList.remove('ok-field','error-field'); document.getElementById('confirm-msg').className='field-msg'; return; }
  if (pw !== confirm.value)
    setFieldError(confirm, 'confirm-msg', 'Las contraseñas no coinciden.');
  else
    setFieldOk(confirm, 'confirm-msg', 'Las contraseñas coinciden ✓');
}
 
function limpiarTerminos() {
  if (document.getElementById('terminos').checked)
    document.getElementById('terminos-error').style.display = 'none';
}
 
function togglePw(inputId, iconId) {
  const input  = document.getElementById(inputId);
  const icon   = document.getElementById(iconId);
  const mostrar = input.type === 'password';
  input.type = mostrar ? 'text' : 'password';
  icon.innerHTML = mostrar
    ? `<path stroke-linecap="round" stroke-linejoin="round"
        d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993
        0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162
        10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65
        3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242
        4.242L9.88 9.88"/>`
    : `<path stroke-linecap="round" stroke-linejoin="round"
        d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0
        8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5
        c-4.638 0-8.573-3.007-9.963-7.178Z"/>
        <path stroke-linecap="round" stroke-linejoin="round"
        d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"/>`;
}
