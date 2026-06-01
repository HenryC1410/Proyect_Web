/* ============================================================
   DATOS
   La clave "logitrack_envios" es compartida con script.js
   para que los cambios del operador se reflejen en el portal.
============================================================ */
const KEY_ENVIOS = "logitrack_envios";
 
const ENVIOS_INICIALES = {
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
            { estado: "Almacén",    fecha: "27/11/2025 10:00", actor: "Bodega Central GYE",      obs: "Ingreso registrado." },
            { estado: "Despacho",   fecha: "27/11/2025 15:20", actor: "Operador: Karla Vera",    obs: "Asignado a transporte nocturno." },
            { estado: "En aduana",  fecha: "28/11/2025 07:40", actor: "Aduana Puerto Manta",     obs: "Revisión completada sin observaciones." },
            { estado: "En reparto", fecha: "29/11/2025 11:10", actor: "Repartidor: José Suárez", obs: "En camino al domicilio del destinatario." },
        ]
    },
    "LOG-2025-0021": {
        destinatario: "María Cedeño — Chone, Manabí",
        estadoActual: 5,
        historial: [
            { estado: "Almacén",    fecha: "24/11/2025 09:30", actor: "Bodega Central GYE",    obs: "Ingreso registrado." },
            { estado: "Despacho",   fecha: "24/11/2025 16:00", actor: "Operador: Luis Ponce",  obs: "Ruta CHO-018 asignada." },
            { estado: "En aduana",  fecha: "25/11/2025 08:20", actor: "Aduana Puerto Manta",   obs: "Sin observaciones." },
            { estado: "En reparto", fecha: "25/11/2025 13:45", actor: "Repartidor: Ana Bravo", obs: "Salida a domicilio." },
            { estado: "Entregado",  fecha: "25/11/2025 17:30", actor: "Repartidor: Ana Bravo", obs: "Entregado y firmado por el destinatario." },
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
 
function getEnvios() {
    const raw = localStorage.getItem(KEY_ENVIOS);
    if (!raw) {
        localStorage.setItem(KEY_ENVIOS, JSON.stringify(ENVIOS_INICIALES));
        return ENVIOS_INICIALES;
    }
    return JSON.parse(raw);
}
 
function setEnvios(e) {
    localStorage.setItem(KEY_ENVIOS, JSON.stringify(e));
}
 
/* ============================================================
   ESTADOS
============================================================ */
const estados = [
    {
        nombre: "Almacén",
        color: "#5C5C8A", bg: "#EEEEF6",
        svgPath: "M20.25 7.5l-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z"
    },
    {
        nombre: "Despacho",
        color: "#1B4F8A", bg: "#E8F0FB",
        svgPath: "M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 0 0-10.026 0 1.106 1.106 0 0 0-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12"
    },
    {
        nombre: "En aduana",
        color: "#B35C00", bg: "#FFF3E0",
        svgPath: "M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25ZM6.75 12h.008v.008H6.75V12Zm0 3h.008v.008H6.75V15Zm0 3h.008v.008H6.75V18Z"
    },
    {
        nombre: "En reparto",
        color: "#1A6B5A", bg: "#E1F5EE",
        svgPath: "M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0ZM19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
    },
    {
        nombre: "Entregado",
        color: "#2D7A2D", bg: "#EAF3DE",
        svgPath: "M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
    }
];
 
/* ============================================================
   UI STATE
============================================================ */
let envioActual   = null;  // guía string
let estadoElegido = null;  // número 1-5
 
/* ============================================================
   INIT
============================================================ */
document.addEventListener("DOMContentLoaded", () => {
    protegerPagina(["operador", "admin"]);
 
    const s = getSesion();
    if (s) {
        const iniciales = s.nombre.split(" ").map(w => w[0]).join("").substring(0, 2).toUpperCase();
        document.getElementById("topbar-avatar").textContent     = iniciales;
        document.getElementById("topbar-nombre").textContent     = s.nombre;
        document.getElementById("perfil-nombre").textContent     = s.nombre;
        document.getElementById("perfil-email").textContent      = s.email;
        document.getElementById("perfil-avatar-big").textContent = iniciales;
    }
 
    actualizarBadgePendientes();
    renderTablaEnvios();
 
    document.getElementById("input-guia").addEventListener("keydown", e => {
        if (e.key === "Enter") buscarEnvio();
    });
 
    document.getElementById("input-guia").addEventListener("input", () => {
        document.getElementById("buscar-error").style.display = "none";
    });
 
    document.getElementById("input-obs").addEventListener("input", actualizarBtnConfirmar);
});
 
/* ============================================================
   NAVEGACIÓN
============================================================ */
function mostrarPagina(id) {
    document.querySelectorAll(".page").forEach(p => p.classList.remove("active"));
    document.querySelectorAll(".sb-item").forEach(i => i.classList.remove("active"));
 
    document.getElementById("page-" + id).classList.add("active");
 
    const map = { "actualizar": 0, "mis-envios": 1, "perfil": 2 };
    if (map[id] !== undefined) {
        document.querySelectorAll(".sb-item")[map[id]]?.classList.add("active");
    }
 
    cerrarSidebar();
}
 
/* ============================================================
   SIDEBAR MOBILE
============================================================ */
document.getElementById("hamburger").addEventListener("click", () => {
    document.getElementById("sidebar").classList.toggle("open");
    document.getElementById("sidebar-overlay").classList.toggle("visible");
});
 
function cerrarSidebar() {
    document.getElementById("sidebar").classList.remove("open");
    document.getElementById("sidebar-overlay").classList.remove("visible");
}
 
/* ============================================================
   BUSCAR ENVÍO
============================================================ */
function buscarEnvio() {
    const input  = document.getElementById("input-guia");
    const valor  = input.value.trim().toUpperCase();
 
    document.getElementById("buscar-error").style.display = "none";
    envioActual   = null;
    estadoElegido = null;
 
    if (!valor) {
        mostrarBuscarError("El campo no puede estar vacío.");
        return;
    }
 
    if (!/^LOG-\d{4}-\d{4}$/.test(valor)) {
        mostrarBuscarError("Formato inválido. Debe ser LOG-YYYY-XXXX (ej: LOG-2025-0042).");
        return;
    }
 
    const btn = document.getElementById("btn-buscar");
    btn.disabled = true;
    btn.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" style="width:1.6rem;height:1.6rem;animation:spin 0.8s linear infinite;">
            <path stroke-linecap="round" stroke-linejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
        </svg> Buscando...`;
 
    setTimeout(() => {
        btn.disabled = false;
        btn.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
            </svg> Buscar envío`;
 
        const envio = getEnvios()[valor];
 
        if (!envio) {
            mostrarBuscarError(`No encontramos el envío ${valor}. Verifica el número e intenta de nuevo.`);
            document.getElementById("panel-envio").style.display  = "none";
            document.getElementById("estado-vacio").style.display = "flex";
            return;
        }
 
        envioActual = valor;
        renderPanelEnvio(valor, envio);
    }, 700);
}
 
function mostrarBuscarError(txt) {
    document.getElementById("buscar-error-txt").textContent = txt;
    document.getElementById("buscar-error").style.display   = "block";
}
 
/* ============================================================
   RENDER PANEL ENVÍO
============================================================ */
function renderPanelEnvio(guia, envio) {
    document.getElementById("estado-vacio").style.display  = "none";
    document.getElementById("panel-envio").style.display   = "block";
 
    document.getElementById("info-guia").textContent = guia;
    document.getElementById("info-dest").textContent  = envio.destinatario;
 
    const estActual = estados[envio.estadoActual - 1];
    document.getElementById("info-badge-actual").innerHTML = `
        <span style="display:inline-flex;align-items:center;gap:0.5rem;padding:0.5rem 1.4rem;border-radius:99px;font-size:1.3rem;font-weight:600;background:${estActual.bg};color:${estActual.color};">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" style="width:1.4rem;height:1.4rem;">
                <path stroke-linecap="round" stroke-linejoin="round" d="${estActual.svgPath}" />
            </svg>
            ${estActual.nombre}
        </span>`;
 
    renderSelectorEstados(envio.estadoActual);
    renderHistorial(envio.historial);
 
    document.getElementById("input-obs").value        = "";
    document.getElementById("btn-confirmar").disabled = true;
    estadoElegido = null;
}
 
/* ============================================================
   SELECTOR DE ESTADOS
============================================================ */
function renderSelectorEstados(estadoActual) {
    const el = document.getElementById("estado-selector");
    el.innerHTML = "";
 
    estados.forEach((est, i) => {
        const num           = i + 1;
        const esActual      = num === estadoActual;
        const esPasado      = num < estadoActual;
        const esEntregado   = estadoActual === 5;
 
        let clases = "estado-option";
        if (esActual)                       clases += " current";
        if (esPasado)                       clases += " disabled";
        if (esEntregado && !esActual)       clases += " disabled";
 
        const div = document.createElement("div");
        div.className = clases;
        div.style.setProperty("--estado-color", est.color);
        div.style.setProperty("--estado-bg",    est.bg);
 
        div.innerHTML = `
            <div class="check-mark">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="3" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                </svg>
            </div>
            <div class="estado-icon" style="background:${esPasado ? '#F5F5F5' : est.bg};">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.8" stroke="${esPasado ? '#ccc' : est.color}">
                    <path stroke-linecap="round" stroke-linejoin="round" d="${est.svgPath}" />
                </svg>
            </div>
            <span class="estado-num">${String(num).padStart(2, "0")}</span>
            <span class="estado-name">${est.nombre}</span>
            ${esActual ? `<span style="font-size:1rem;color:${est.color};font-weight:600;margin-top:0.2rem;">Actual</span>` : ""}`;
 
        if (!esPasado && !(esEntregado && !esActual)) {
            div.addEventListener("click", () => seleccionarEstado(num, div));
        }
 
        el.appendChild(div);
    });
}
 
function seleccionarEstado(num, divEl) {
    document.querySelectorAll(".estado-option").forEach(d => d.classList.remove("selected"));
    divEl.classList.add("selected");
    estadoElegido = num;
    actualizarBtnConfirmar();
}
 
function actualizarBtnConfirmar() {
    const obs    = document.getElementById("input-obs").value.trim();
    const envios = getEnvios();
    const envio  = envioActual ? envios[envioActual] : null;
 
    const listo = estadoElegido !== null
        && obs.length >= 3
        && envio
        && estadoElegido !== envio.estadoActual;
 
    document.getElementById("btn-confirmar").disabled = !listo;
}
 
/* ============================================================
   HISTORIAL
============================================================ */
function renderHistorial(historial) {
    const el = document.getElementById("historial-timeline");
    el.innerHTML = "";
 
    [...historial].reverse().forEach((item, i) => {
        const esReciente = i === 0;
        const idxEst     = estados.findIndex(e => e.nombre === item.estado);
        const color      = idxEst >= 0 ? estados[idxEst].color : "var(--color-primario)";
 
        const div = document.createElement("div");
        div.className = "tl-item";
        div.innerHTML = `
            <div class="tl-left">
                <div class="tl-dot" style="background:${esReciente ? color : "#fff"}; border-color:${color};"></div>
                <div class="tl-line"></div>
            </div>
            <div class="tl-body">
                <p class="tl-estado" style="color:${color}">${item.estado}</p>
                <p class="tl-meta">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                    </svg>
                    ${item.fecha} &nbsp;·&nbsp; ${item.actor}
                </p>
                <p class="tl-obs">${item.obs}</p>
            </div>`;
        el.appendChild(div);
    });
}
 
/* ============================================================
   CONFIRMAR CAMBIO
============================================================ */
function confirmarCambio() {
    const obs    = document.getElementById("input-obs").value.trim();
    const envios = getEnvios();
    const envio  = envios[envioActual];
 
    if (!envio || !estadoElegido || !obs) return;
 
    const s       = getSesion();
    const actor   = s ? `Operador: ${s.nombre}` : "Operador";
    const ahora   = new Date();
    const fecha   = `${ahora.toLocaleDateString("es-EC")} ${ahora.toLocaleTimeString("es-EC", { hour: "2-digit", minute: "2-digit" })}`;
    const estInfo = estados[estadoElegido - 1];
 
    envio.historial.push({ estado: estInfo.nombre, fecha, actor, obs });
    envio.estadoActual      = estadoElegido;
    envios[envioActual]     = envio;
    setEnvios(envios);
 
    renderPanelEnvio(envioActual, envio);
    actualizarBadgePendientes();
    renderTablaEnvios();
 
    mostrarToast(`Estado actualizado a "${estInfo.nombre}" correctamente.`, "ok");
}
 
/* ============================================================
   LIMPIAR BÚSQUEDA
============================================================ */
function limpiarBusqueda() {
    envioActual   = null;
    estadoElegido = null;
    document.getElementById("input-guia").value            = "";
    document.getElementById("panel-envio").style.display   = "none";
    document.getElementById("estado-vacio").style.display  = "flex";
    document.getElementById("buscar-error").style.display  = "none";
}
 
/* ============================================================
   TABLA MIS ENVÍOS
============================================================ */
function renderTablaEnvios() {
    const tbody  = document.getElementById("tabla-envios-body");
    const envios = getEnvios();
    tbody.innerHTML = "";
 
    Object.entries(envios).forEach(([guia, envio]) => {
        const est    = estados[envio.estadoActual - 1];
        const ultimo = envio.historial[envio.historial.length - 1];
 
        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td><span class="td-mono">${guia}</span></td>
            <td>${envio.destinatario}</td>
            <td>
                <span style="display:inline-flex;align-items:center;gap:0.4rem;padding:0.3rem 1rem;border-radius:99px;font-size:1.2rem;font-weight:600;background:${est.bg};color:${est.color};">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" style="width:1.2rem;height:1.2rem;">
                        <path stroke-linecap="round" stroke-linejoin="round" d="${est.svgPath}" />
                    </svg>
                    ${est.nombre}
                </span>
            </td>
            <td style="font-size:1.3rem;color:var(--color-text-muted);">${ultimo.fecha}</td>
            <td>
                <button class="btn btn-sm btn-ghost" onclick="abrirDesdeTabla('${guia}')">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
                    </svg>
                    Actualizar
                </button>
            </td>`;
        tbody.appendChild(tr);
    });
}
 
function abrirDesdeTabla(guia) {
    mostrarPagina("actualizar");
    document.getElementById("input-guia").value = guia;
    buscarEnvio();
}
 
function actualizarBadgePendientes() {
    const pendientes = Object.values(getEnvios()).filter(e => e.estadoActual < 5).length;
    document.getElementById("badge-pendientes").textContent = pendientes;
}
 
/* ============================================================
   TOAST
============================================================ */
function mostrarToast(msg, tipo = "ok") {
    const toast = document.getElementById("toast");
    const icon  = document.getElementById("toast-icon");
    document.getElementById("toast-msg").textContent = msg;
 
    toast.className = `toast toast-${tipo}`;
    icon.innerHTML  = tipo === "ok"
        ? `<path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />`
        : `<path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />`;
 
    toast.classList.add("visible");
    setTimeout(() => toast.classList.remove("visible"), 3500);
}