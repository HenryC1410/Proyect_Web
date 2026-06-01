/* ---- USAR CUENTA DE PRUEBA ---- */
function usarCuenta(email, pw) {
    document.getElementById('email').value    = email;
    document.getElementById('password').value = pw;
    limpiarError();
}
 
function togglePassword() {
    const input = document.getElementById('password');
    const icono = document.getElementById('icon-ojo');
    const mostrar = input.type === 'password';
    input.type = mostrar ? 'text' : 'password';
    icono.innerHTML = mostrar
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
        <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"/>`;
}
 
function limpiarError() {
    document.getElementById('msg-error').classList.remove('visible');
    document.getElementById('email').classList.remove('error-field');
    document.getElementById('password').classList.remove('error-field');
}
 

function handleLogin() {
    const email    = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const btn      = document.getElementById('btn-login');
    const msgError = document.getElementById('msg-error');
 
    limpiarError();
 

    if (!email.trim()) {
        document.getElementById('email').classList.add('error-field');
        document.getElementById('msg-error-texto').textContent = 'El correo no puede estar vacío.';
        msgError.classList.add('visible');
        document.getElementById('email').focus();
        return;
    }
 
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        document.getElementById('email').classList.add('error-field');
        document.getElementById('msg-error-texto').textContent = 'Ingresa un correo electrónico válido.';
        msgError.classList.add('visible');
        return;
    }
 
    if (!password) {
        document.getElementById('password').classList.add('error-field');
        document.getElementById('msg-error-texto').textContent = 'La contraseña no puede estar vacía.';
        msgError.classList.add('visible');
        document.getElementById('password').focus();
        return;
    }
 

    btn.disabled = true;
    btn.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
             stroke-width="2" stroke="currentColor" width="20" height="20"
             style="animation:spin 0.8s linear infinite;" aria-hidden="true">
          <path stroke-linecap="round" stroke-linejoin="round"
            d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993
            0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1
            13.803-3.7l3.181 3.182m0-4.991v4.99" />
        </svg>
        Verificando...`;
 
    setTimeout(() => {
        const resultado = login(email, password);
 
        if (!resultado.ok) {
          btn.disabled = false;
          btn.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                 stroke-width="2" stroke="currentColor" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round"
                d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25
                2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3
                0 3-3m0 0-3-3m3 3H9" />
            </svg>
            Ingresar`;
 
          document.getElementById('email').classList.add('error-field');
          document.getElementById('password').classList.add('error-field');
          document.getElementById('msg-error-texto').textContent = resultado.error;
          msgError.classList.add('visible');
          return;
        }
 
        const ruta = RUTAS[resultado.usuario.rol] || 'index.html';
        window.location.href = ruta;
 
    }, 800);
}
 

document.addEventListener('keydown', function(e) {
    if (e.key === 'Enter') handleLogin();
});