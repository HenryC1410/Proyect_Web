    /* ================================================
       INIT — proteger página, cargar sesión
    ================================================ */
    protegerPagina(["admin"]);
 
    const sesion = getSesion();
    if (sesion) {
      document.getElementById('topbar-nombre').textContent = sesion.nombre;
      document.getElementById('topbar-avatar').textContent = sesion.nombre.charAt(0).toUpperCase();
    }
 
    /* ================================================
       NAVEGACIÓN ENTRE PÁGINAS
    ================================================ */
    const paginaTitulos = {
      dashboard:  'Dashboard',
      envios:     'Envíos',
      entidades:  'Clientes / Proveedores',
      estados:    'Actualizar estados',
      usuarios:   'Gestión de usuarios',
      reportes:   'Reportes',
      ajustes:    'Ajustes'
    };
 
    function navegar(pagina) {
      document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
      document.querySelectorAll('.sb-item').forEach(i => i.classList.remove('active'));
      document.getElementById('page-' + pagina).classList.add('active');
      document.getElementById('nav-' + pagina).classList.add('active');
      document.getElementById('topbar-title').textContent = paginaTitulos[pagina];
 
      if (pagina === 'usuarios') renderTablaUsuarios();
 
      // Cerrar sidebar en móvil
      if (window.innerWidth <= 768) toggleSidebar(false);
    }
 
    /* ================================================
       SIDEBAR MOBILE
    ================================================ */
    function toggleSidebar(forzar) {
      const sb  = document.getElementById('sidebar');
      const ovl = document.getElementById('sb-overlay');
      const abrir = forzar !== undefined ? forzar : !sb.classList.contains('open');
      sb.classList.toggle('open', abrir);
      ovl.classList.toggle('visible', abrir);
    }
 
    /* ================================================
       CERRAR SESIÓN
    ================================================ */
    function cerrarSesion() {
      logout();
    }
 
    /* ================================================
       TOAST
    ================================================ */
    let toastTimer;
    function mostrarToast(texto, tipo = 'ok') {
      const toast = document.getElementById('toast');
      const icono = document.getElementById('toast-icon');
      toast.className = 'toast toast-' + tipo;
      document.getElementById('toast-texto').textContent = texto;
      icono.innerHTML = tipo === 'ok'
        ? '<path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>'
        : '<path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"/>';
      toast.classList.add('visible');
      clearTimeout(toastTimer);
      toastTimer = setTimeout(() => toast.classList.remove('visible'), 3500);
    }
 
    /* ================================================
       TABLA DE USUARIOS
    ================================================ */
    function renderTablaUsuarios() {
      filtrarUsuarios();
    }
 
    function filtrarUsuarios() {
      const usuarios  = getUsuarios();
      const buscar    = document.getElementById('filtro-buscar').value.toLowerCase();
      const rol       = document.getElementById('filtro-rol').value;
      const estado    = document.getElementById('filtro-estado').value;
 
      const filtrados = usuarios.filter(u => {
        const coincideBuscar = !buscar ||
          u.nombre.toLowerCase().includes(buscar) ||
          u.email.toLowerCase().includes(buscar);
        const coincideRol    = !rol    || u.rol === rol;
        const coincideEstado = estado === '' || String(u.activo) === estado;
        return coincideBuscar && coincideRol && coincideEstado;
      });
 
      document.getElementById('usuarios-count').textContent =
        filtrados.length + ' usuario' + (filtrados.length !== 1 ? 's' : '');
 
      const tbody = document.getElementById('tabla-usuarios');
      if (!filtrados.length) {
        tbody.innerHTML = `<tr><td colspan="6" style="text-align:center;color:var(--color-text-muted);padding:3rem;">No se encontraron usuarios con esos filtros.</td></tr>`;
        return;
      }
 
      tbody.innerHTML = filtrados.map(u => {
        const badgeRol = u.rol === 'admin'
          ? `<span class="badge badge-admin">Admin</span>`
          : u.rol === 'operador'
          ? `<span class="badge badge-operador">Operador</span>`
          : `<span class="badge badge-cliente">Cliente</span>`;
 
        const badgeEst = u.activo
          ? `<span class="badge badge-activo">Activo</span>`
          : `<span class="badge badge-inactivo">Inactivo</span>`;
 
        const fecha = u.fechaRegistro
          ? new Date(u.fechaRegistro).toLocaleDateString('es-EC', { day:'2-digit', month:'short', year:'numeric' })
          : '—';
 
        const esSesionActual = sesion && u.id === sesion.id;
 
        return `<tr>
          <td>
            <div style="display:flex;align-items:center;gap:1rem;">
              <div style="width:3.2rem;height:3.2rem;border-radius:50%;background:var(--color-primario-bg);display:flex;align-items:center;justify-content:center;font-weight:600;font-size:1.4rem;color:var(--color-primario);flex-shrink:0;">
                ${u.nombre.charAt(0).toUpperCase()}
              </div>
              <div>
                <p style="margin:0;font-weight:500;font-size:1.4rem;">${u.nombre}${esSesionActual ? ' <span style="font-size:1.1rem;color:var(--color-primario);font-weight:600;">(tú)</span>' : ''}</p>
              </div>
            </div>
          </td>
          <td style="color:var(--color-text-muted);font-size:1.3rem;">${u.email}</td>
          <td>${badgeRol}</td>
          <td>${badgeEst}</td>
          <td style="color:var(--color-text-muted);font-size:1.3rem;">${fecha}</td>
          <td>
            <div style="display:flex;gap:0.6rem;">
              <button class="btn btn-ghost btn-sm" onclick="editarOperador('${u.id}')" title="Editar usuario">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" width="14" height="14" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"/></svg>
                Editar
              </button>
              ${!esSesionActual ? `
              <button class="btn btn-danger btn-sm" onclick="pedirEliminar('${u.id}','${u.nombre.replace(/'/g,"\\'")}')">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" width="14" height="14" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"/></svg>
                Eliminar
              </button>` : ''}
            </div>
          </td>
        </tr>`;
      }).join('');
    }
 
    /* ================================================
       MODAL OPERADOR — ABRIR / CERRAR
    ================================================ */
    let editandoId = null;
 
    function abrirModalOperador() {
      editandoId = null;
      document.getElementById('modal-op-titulo-texto').textContent = 'Registrar nuevo operador';
      document.getElementById('op-nombres').value   = '';
      document.getElementById('op-apellidos').value = '';
      document.getElementById('op-email').value     = '';
      document.getElementById('op-rol').value       = 'operador';
      document.getElementById('op-estado').value    = 'true';
      document.getElementById('op-pw').value        = '';
      document.getElementById('op-pw2').value       = '';
      document.getElementById('aviso-edicion').style.display  = 'none';
      document.getElementById('modal-error').style.display    = 'none';
      limpiarErroresModal();
      document.getElementById('modal-operador').classList.add('visible');
      document.getElementById('op-nombres').focus();
    }
 
    function editarOperador(id) {
      const u = getUsuarios().find(x => x.id === id);
      if (!u) return;
      editandoId = id;
      const partes = u.nombre.split(' ');
      document.getElementById('modal-op-titulo-texto').textContent = 'Editar usuario';
      document.getElementById('op-nombres').value   = partes[0] || '';
      document.getElementById('op-apellidos').value = partes.slice(1).join(' ') || '';
      document.getElementById('op-email').value     = u.email;
      document.getElementById('op-rol').value       = u.rol;
      document.getElementById('op-estado').value    = String(u.activo);
      document.getElementById('op-pw').value        = '';
      document.getElementById('op-pw2').value       = '';
      document.getElementById('aviso-edicion').style.display  = 'flex';
      document.getElementById('modal-error').style.display    = 'none';
      limpiarErroresModal();
      document.getElementById('modal-operador').classList.add('visible');
    }
 
    function cerrarModalOperador() {
      document.getElementById('modal-operador').classList.remove('visible');
      editandoId = null;
    }
 
    /* ================================================
       GUARDAR OPERADOR (crear o editar)
    ================================================ */
    function guardarOperador() {
      const nombres   = document.getElementById('op-nombres').value.trim();
      const apellidos = document.getElementById('op-apellidos').value.trim();
      const email     = document.getElementById('op-email').value.trim();
      const rol       = document.getElementById('op-rol').value;
      const activo    = document.getElementById('op-estado').value === 'true';
      const pw        = document.getElementById('op-pw').value;
      const pw2       = document.getElementById('op-pw2').value;
      const btn       = document.getElementById('btn-guardar-op');
 
      limpiarErroresModal();
      document.getElementById('modal-error').style.display = 'none';
      let ok = true;
 
      if (!nombres || nombres.length < 2 || !/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(nombres)) {
        setModalFieldError('op-nombres', 'op-nombres-msg', 'Solo letras, mínimo 2 caracteres.'); ok = false;
      }
      if (!apellidos || apellidos.length < 2 || !/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(apellidos)) {
        setModalFieldError('op-apellidos', 'op-apellidos-msg', 'Solo letras, mínimo 2 caracteres.'); ok = false;
      }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        setModalFieldError('op-email', 'op-email-msg', 'Correo electrónico inválido.'); ok = false;
      }
 
      const esPwRequerida = !editandoId || pw !== '';
      if (esPwRequerida) {
        if (pw.length < 8 || !/[A-Z]/.test(pw) || !/\d/.test(pw)) {
          setModalFieldError('op-pw', 'op-pw-msg', 'Mínimo 8 caracteres, una mayúscula y un número.'); ok = false;
        }
        if (pw !== pw2) {
          setModalFieldError('op-pw2', 'op-pw2-msg', 'Las contraseñas no coinciden.'); ok = false;
        }
      }
 
      if (!ok) return;
 
      btn.disabled = true;
      btn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" width="16" height="16" style="animation:spin 0.8s linear infinite;" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"/></svg> Guardando...`;
 
      setTimeout(() => {
        btn.disabled = false;
        btn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/></svg> Guardar`;
 
        const usuarios = getUsuarios();
        const nombreCompleto = `${nombres} ${apellidos}`;
 
        if (editandoId) {
          // EDITAR
          const idx = usuarios.findIndex(x => x.id === editandoId);
          if (idx === -1) return;
 
          // Verificar email duplicado (excluyendo el propio)
          const dupEmail = usuarios.find(u => u.email.toLowerCase() === email.toLowerCase() && u.id !== editandoId);
          if (dupEmail) {
            setModalFieldError('op-email', 'op-email-msg', 'Ese correo ya está registrado.');
            return;
          }
 
          usuarios[idx].nombre = nombreCompleto;
          usuarios[idx].email  = email.toLowerCase();
          usuarios[idx].rol    = rol;
          usuarios[idx].activo = activo;
          if (pw) usuarios[idx].password = pw;
 
          setUsuarios(usuarios);
          cerrarModalOperador();
          renderTablaUsuarios();
          mostrarToast(`Usuario "${nombreCompleto}" actualizado correctamente.`, 'ok');
 
        } else {
          // CREAR
          const resultado = signUp(nombreCompleto, email, pw);
          if (!resultado.ok) {
            const errEl = document.getElementById('modal-error');
            document.getElementById('modal-error-texto').textContent = resultado.error;
            errEl.style.display = 'flex';
            return;
          }
          // Asignar rol correcto (signUp siempre crea como cliente, lo corregimos)
          const usrs = getUsuarios();
          const nuevo = usrs.find(u => u.email.toLowerCase() === email.toLowerCase());
          if (nuevo) { nuevo.rol = rol; nuevo.activo = activo; setUsuarios(usrs); }
 
          cerrarModalOperador();
          renderTablaUsuarios();
          mostrarToast(`Operador "${nombreCompleto}" registrado con rol "${rol}".`, 'ok');
        }
      }, 700);
    }
 
    /* ================================================
       ELIMINAR USUARIO
    ================================================ */
    let eliminarId = null;
 
    function pedirEliminar(id, nombre) {
      eliminarId = id;
      document.getElementById('eliminar-nombre').textContent = nombre;
      document.getElementById('modal-eliminar').classList.add('visible');
    }
 
    function cerrarModalEliminar() {
      document.getElementById('modal-eliminar').classList.remove('visible');
      eliminarId = null;
    }
 
    function confirmarEliminar() {
      if (!eliminarId) return;
      const usuarios = getUsuarios().filter(u => u.id !== eliminarId);
      setUsuarios(usuarios);
      cerrarModalEliminar();
      renderTablaUsuarios();
      mostrarToast('Usuario eliminado correctamente.', 'ok');
    }
 
    /* ================================================
       HELPERS DE CAMPOS
    ================================================ */
    function setModalFieldError(inputId, msgId, texto) {
      const input = document.getElementById(inputId);
      input.classList.add('error-field');
      const msg = document.getElementById(msgId);
      msg.className = 'field-msg error';
      msg.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z"/></svg>${texto}`;
    }
 
    function clearFieldError(inputId, msgId) {
      document.getElementById(inputId).classList.remove('error-field');
      document.getElementById(msgId).className = 'field-msg';
      document.getElementById(msgId).innerHTML = '';
    }
 
    function limpiarErroresModal() {
      ['op-nombres','op-apellidos','op-email','op-pw','op-pw2'].forEach(id => {
        document.getElementById(id).classList.remove('error-field','ok-field');
      });
      ['op-nombres-msg','op-apellidos-msg','op-email-msg','op-pw-msg','op-pw2-msg'].forEach(id => {
        document.getElementById(id).className = 'field-msg';
        document.getElementById(id).innerHTML = '';
      });
    }
 
    function togglePwModal() {
      const input = document.getElementById('op-pw');
      const ojo   = document.getElementById('ojo-modal');
      const ver   = input.type === 'password';
      input.type  = ver ? 'text' : 'password';
      ojo.innerHTML = ver
        ? `<path stroke-linecap="round" stroke-linejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88"/>`
        : `<path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"/><path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"/>`;
    }
 
    // Cerrar modal con Escape
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape') {
        cerrarModalOperador();
        cerrarModalEliminar();
      }
    });