const envios = {
    "LOG-2025-0042": {
      destinatario: "Ana Torres — Manta, Manabí",
      estadoActual: 3,
      historial: [
        { estado: "Almacén",    fecha: "28/11/2025 08:14", actor: "Bodega Central GYE",     obs: "Paquete recibido e inventariado correctamente." },
        { estado: "Despacho",   fecha: "28/11/2025 14:30", actor: "Operador: Luis Ponce",   obs: "Enviado en ruta MNT-042. Peso: 3.2 kg." },
        { estado: "En aduana",  fecha: "29/11/2025 09:55", actor: "Aduana Puerto Manta",    obs: "En proceso de revisión. Sin inconvenientes." },
      ]
    },
    "LOG-2025-0038": {
      destinatario: "Pedro Loor — Portoviejo, Manabí",
      estadoActual: 4,
      historial: [
        { estado: "Almacén",    fecha: "27/11/2025 10:00", actor: "Bodega Central GYE",    obs: "Ingreso registrado." },
        { estado: "Despacho",   fecha: "27/11/2025 15:20", actor: "Operador: Karla Vera",  obs: "Asignado a transporte nocturno." },
        { estado: "En aduana",  fecha: "28/11/2025 07:40", actor: "Aduana Puerto Manta",   obs: "Revisión completada sin observaciones." },
        { estado: "En reparto", fecha: "29/11/2025 11:10", actor: "Repartidor: José Suárez", obs: "En camino al domicilio del destinatario." },
      ]
    },
    "LOG-2025-0021": {
      destinatario: "María Cedeño — Chone, Manabí",
      estadoActual: 5,
      historial: [
        { estado: "Almacén",    fecha: "24/11/2025 09:30", actor: "Bodega Central GYE",      obs: "Ingreso registrado." },
        { estado: "Despacho",   fecha: "24/11/2025 16:00", actor: "Operador: Luis Ponce",    obs: "Ruta CHO-018 asignada." },
        { estado: "En aduana",  fecha: "25/11/2025 08:20", actor: "Aduana Puerto Manta",     obs: "Sin observaciones." },
        { estado: "En reparto", fecha: "25/11/2025 13:45", actor: "Repartidor: Ana Bravo",   obs: "Salida a domicilio." },
        { estado: "Entregado",  fecha: "25/11/2025 17:30", actor: "Repartidor: Ana Bravo",   obs: "Entregado y firmado por el destinatario." },
      ]
    },
    "LOG-2025-0055": {
      destinatario: "Carlos Mendoza — Bahía de Caráquez, Manabí",
      estadoActual: 1,
      historial: [
        { estado: "Almacén", fecha: "30/11/2025 07:50", actor: "Bodega Central GYE", obs: "Paquete ingresado. Pendiente de despacho." },
      ]
    }
};

const estados = [
    {
      nombre: "Almacén",
      colorVar: "--color-estado-1",
      color: "#5C5C8A",
      bgColor: "#EEEEF6",
      svgPath: "M20.25 7.5l-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z"
    },
    {
      nombre: "Despacho",
      colorVar: "--color-estado-2",
      color: "#1B4F8A",
      bgColor: "#E8F0FB",
      svgPath: "M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 0 0-10.026 0 1.106 1.106 0 0 0-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12"
    },
    {
      nombre: "En aduana",
      colorVar: "--color-estado-3",
      color: "#B35C00",
      bgColor: "#FFF3E0",
      svgPath: "M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25ZM6.75 12h.008v.008H6.75V12Zm0 3h.008v.008H6.75V15Zm0 3h.008v.008H6.75V18Z"
    },
    {
      nombre: "En reparto",
      colorVar: "--color-estado-4",
      color: "#1A6B5A",
      bgColor: "#E1F5EE",
      svgPath: "M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0ZM19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
    },
    {
      nombre: "Entregado",
      colorVar: "--color-estado-5",
      color: "#2D7A2D",
      bgColor: "#EAF3DE",
      svgPath: "M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
    }
];
 

function rastrearEnvio() {
    const input     = document.getElementById('input-guia');
    const btnRas    = document.getElementById('btn-rastrear');
    const msgError  = document.getElementById('msg-error');
    const resultado = document.getElementById('resultado');
 

    input.classList.remove('error');
    msgError.classList.remove('visible');
    resultado.classList.remove('visible');
 
    const valor = input.value.trim().toUpperCase();
 

    if (!valor) {
      mostrarError(input, msgError, 'El campo no puede estar vacío. Ingresa un número de guía.');
      return;
    }
 
    const formatoValido = /^LOG-\d{4}-\d{4}$/.test(valor);
    if (!formatoValido) {
      mostrarError(input, msgError, `Formato inválido. Debe ser LOG-YYYY-XXXX (ej: LOG-2025-0042).`);
      return;
    }
 
    btnRas.disabled = true;
    btnRas.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" width="20" height="20" aria-hidden="true" style="animation:spin 0.8s linear infinite;">
        <path stroke-linecap="round" stroke-linejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
      </svg>
      Buscando...`;
 
    setTimeout(() => {
      btnRas.disabled = false;
      btnRas.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" width="20" height="20" aria-hidden="true">
          <path stroke-linecap="round" stroke-linejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
        </svg>
        Rastrear`;

      const envio = envios[valor];
 
      if (!envio) {
        mostrarError(input, msgError, `No encontramos el envío ${valor}. Verifica el número e intenta de nuevo.`);
        return;
      }
 
      mostrarResultado(valor, envio);
    }, 900);
}
 

function mostrarError(input, msgError, texto) {
    input.classList.add('error');
    document.getElementById('msg-error-texto').textContent = texto;
    msgError.classList.add('visible');
    input.focus();
}
 

function mostrarResultado(guia, envio) {
    const estadoIdx  = envio.estadoActual - 1; // 0-based
    const estadoInfo = estados[estadoIdx];
 

    document.getElementById('res-numero').textContent = guia;
    document.getElementById('res-dest').textContent   = envio.destinatario;
 
    const badge = document.getElementById('badge-estado');
    badge.style.background = estadoInfo.bgColor;
    badge.style.color      = estadoInfo.color;
    badge.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
           stroke-width="2" stroke="currentColor" aria-hidden="true">
        <path stroke-linecap="round" stroke-linejoin="round" d="${estadoInfo.svgPath}" />
      </svg>
      ${estadoInfo.nombre}`;
 

    const porcentaje = ((envio.estadoActual - 1) / (estados.length - 1)) * 100;
    document.getElementById('progreso-fill').style.width = porcentaje + '%';
 

    const stepsEl = document.getElementById('progreso-steps');
    stepsEl.innerHTML = '';
    estados.forEach((est, i) => {
      const num      = i + 1;
      const esHecho  = num < envio.estadoActual;
      const esActual = num === envio.estadoActual;
      const clase    = esHecho ? 'hecho' : esActual ? 'actual' : 'pendiente';
 
      const circleStyle = esHecho
        ? `background:${est.color}; border-color:${est.color};`
        : esActual
        ? `background:${est.color}; border-color:${est.color};`
        : '';
 
      stepsEl.innerHTML += `
        <div class="step ${clase}" aria-label="${est.nombre}: ${clase}">
          <div class="step-circle" style="${circleStyle}">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                 stroke-width="2" stroke="${esHecho || esActual ? '#fff' : '#A0B4CC'}" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" d="${est.svgPath}" />
            </svg>
          </div>
          <span class="step-num" style="color:${esHecho || esActual ? est.color : ''}">
            ${String(num).padStart(2,'0')}
          </span>
          <span class="step-lbl" style="color:${esHecho || esActual ? est.color : 'var(--color-text-muted)'}">
            ${est.nombre}
          </span>
        </div>`;
    });
 
    const timelineEl = document.getElementById('timeline');
    timelineEl.innerHTML = '';
    const histRev = [...envio.historial].reverse(); 
    histRev.forEach((item, i) => {
      const esReciente = i === 0;
      const idxEst     = estados.findIndex(e => e.nombre === item.estado);
      const color      = idxEst >= 0 ? estados[idxEst].color : 'var(--color-primario)';
 
      timelineEl.innerHTML += `
        <div class="tl-item">
          <div class="tl-left">
            <div class="tl-dot"
              style="background:${esReciente ? color : '#fff'};
                     border-color:${color};"></div>
            <div class="tl-line"></div>
          </div>
          <div class="tl-body">
            <p class="tl-estado" style="color:${color}">${item.estado}</p>
            <p class="tl-meta">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                   stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round"
                  d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
              </svg>
              ${item.fecha} &nbsp;·&nbsp; ${item.actor}
            </p>
            <p class="tl-obs">${item.obs}</p>
          </div>
        </div>`;
    });
 

    document.getElementById('resultado').classList.add('visible');
 
    document.getElementById('resultado').scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}
 

document.getElementById('input-guia').addEventListener('keydown', function(e) {
    if (e.key === 'Enter') rastrearEnvio();
});
 

document.getElementById('input-guia').addEventListener('input', function() {
    this.classList.remove('error');
    document.getElementById('msg-error').classList.remove('visible');
});
