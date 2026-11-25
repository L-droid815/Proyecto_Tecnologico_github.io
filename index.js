// ============================================================================
// CONFIGURACIÓN Y ENDPOINTS (XAMPP -> /opt/lampp/htdocs/asistencia/api/)
// ============================================================================
const API_ESTUDIANTES = "./api/estudiantes.php";
const API_ASISTENCIA = "./api/asistencia.php";

const STORAGE_CREDENCIALES = "csb_credenciales_v1";
const STORAGE_SESION = "csb_sesion_activa_v1";

const USUARIO_INICIAL = "control de estudio";
const CLAVE_INICIAL = "ColegioSimonBolivar";

const DIAS_SEMANA = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes"];

let listaEstudiantes = [];
let estudianteEnEdicionId = null;
let estudianteSeleccionadoId = null;

// ============================================================================
// GESTIÓN DE USUARIO Y CONTRASEÑA (PERSISTENCIA LOCAL)
// ============================================================================
function asegurarCredencialesIniciales() {
  const actuales = obtenerCredenciales();
  if (!actuales) {
    guardarCredenciales({
      usuario: USUARIO_INICIAL,
      password: CLAVE_INICIAL,
    });
  }
}

function obtenerCredenciales() {
  try {
    const raw = localStorage.getItem(STORAGE_CREDENCIALES);
    if (!raw) return null;
    const data = JSON.parse(raw);
    if (!data || typeof data !== "object") return null;
    return {
      usuario: String(data.usuario || USUARIO_INICIAL).trim(),
      password: String(data.password || CLAVE_INICIAL),
    };
  } catch {
    return null;
  }
}

function guardarCredenciales(credenciales) {
  const limpio = {
    usuario: String(credenciales.usuario || USUARIO_INICIAL).trim(),
    password: String(credenciales.password || CLAVE_INICIAL),
  };
  localStorage.setItem(STORAGE_CREDENCIALES, JSON.stringify(limpio));
  return limpio;
}

function setSesionActiva(activa) {
  if (activa) {
    localStorage.setItem(STORAGE_SESION, "1");
  } else {
    localStorage.removeItem(STORAGE_SESION);
  }
}

function haySesionActiva() {
  return localStorage.getItem(STORAGE_SESION) === "1";
}

function validarCredenciales(usuarioIngresado, passwordIngresada) {
  asegurarCredencialesIniciales();
  const guardadas = obtenerCredenciales();
  const u1 = String(usuarioIngresado || "").trim().toLowerCase();
  const u2 = String(guardadas.usuario || "").trim().toLowerCase();
  return u1 === u2 && String(passwordIngresada || "") === String(guardadas.password || "");
}

function actualizarUsuarioYPassword({ nuevoUsuario, passwordActual, passwordNueva, passwordConfirmar }) {
  asegurarCredencialesIniciales();
  const guardadas = obtenerCredenciales();

  if (!passwordActual || String(passwordActual) !== String(guardadas.password)) {
    throw new Error("La contraseña actual es incorrecta.");
  }

  const usuarioFinal = String(nuevoUsuario || guardadas.usuario).trim();
  if (!usuarioFinal) {
    throw new Error("El nombre de usuario no puede estar vacío.");
  }

  let passwordFinal = guardadas.password;
  if (passwordNueva || passwordConfirmar) {
    if (String(passwordNueva).length < 4) {
      throw new Error("La nueva contraseña debe tener al menos 4 caracteres.");
    }
    if (String(passwordNueva) !== String(passwordConfirmar)) {
      throw new Error("La nueva contraseña y su confirmación no coinciden.");
    }
    passwordFinal = String(passwordNueva);
  }

  return guardarCredenciales({
    usuario: usuarioFinal,
    password: passwordFinal,
  });
}

// ============================================================================
// SECCIONES DE COLORES Y ASISTENCIA (VERDE -> ROJO -> MORADO -> BLANCO)
// ============================================================================
const COLORES_SECCION = [
  "seccion-color-0",
  "seccion-color-1",
  "seccion-color-2",
  "seccion-color-3",
  "seccion-color-4",
  "seccion-color-5",
];

function obtenerClaseColorSeccion(nombreSeccion) {
  const texto = String(nombreSeccion || "General").trim();
  let hash = 0;
  for (let i = 0; i < texto.length; i++) {
    hash = (hash * 31 + texto.charCodeAt(i)) >>> 0;
  }
  return COLORES_SECCION[hash % COLORES_SECCION.length];
}

function normalizarColorAsistencia(valor) {
  const v = String(valor || "").trim().toLowerCase();
  if (v === "verde" || v === "asistente" || v === "p") return "verde";
  if (v === "rojo" || v === "inasistente" || v === "i") return "rojo";
  if (v === "morado" || v === "ausente" || v === "a") return "morado";
  return "";
}

function obtenerSiguienteEstado(estadoActual) {
  if (estadoActual === "") return "verde";
  if (estadoActual === "verde") return "rojo";
  if (estadoActual === "rojo") return "morado";
  return "";
}

function obtenerClaseEstado(estado) {
  if (estado === "verde") return "estado-verde";
  if (estado === "rojo") return "estado-rojo";
  if (estado === "morado") return "estado-morado";
  return "";
}

function obtenerTextoEstado(estado) {
  if (estado === "verde") return "ASISTENTE";
  if (estado === "rojo") return "INASISTENTE";
  if (estado === "morado") return "AUSENTE";
  return "-";
}

function renderizarCasillasAsistencia(estudiante, semanas = 4) {
  const cont = document.querySelector("#contenedor-asistencia");
  if (!cont || !estudiante) return;

  estudianteSeleccionadoId = Number(estudiante.id);
  const marcas = estudiante.asistencias || {};
  const claseSec = obtenerClaseColorSeccion(estudiante.seccion);

  let html = `
    <div class="cabecera-asistencia">
      <strong>${escaparHtml(estudiante.nombre_completo)}</strong>
      <span>Cédula: ${escaparHtml(estudiante.cedula)}</span>
      <span class="seccion-badge ${claseSec}">${escaparHtml(estudiante.seccion)}</span>
    </div>
    <div class="leyenda-colores">
      <span class="item-leyenda"><span class="muestra-color muestra-verde"></span> <strong>Verde:</strong> Asistente</span>
      <span class="item-leyenda"><span class="muestra-color muestra-rojo"></span> <strong>Rojo:</strong> Inasistente</span>
      <span class="item-leyenda"><span class="muestra-color muestra-morado"></span> <strong>Morado:</strong> Ausente</span>
      <span class="item-leyenda"><span class="muestra-color muestra-blanco"></span> <strong>Blanco:</strong> Sin registro</span>
    </div>
    <div class="casillas-grid">
  `;

  let contadorDiaGlobal = 1;
  for (let s = 1; s <= semanas; s++) {
    DIAS_SEMANA.forEach((diaNombre) => {
      const clave = `dia_${contadorDiaGlobal}`;
      const colorActual = normalizarColorAsistencia(marcas[clave]);
      const claseColor = obtenerClaseEstado(colorActual);

      html += `
        <button
          type="button"
          class="casilla-dia ${claseColor}"
          data-estudiante-id="${estudiante.id}"
          data-clave="${clave}"
          data-color="${colorActual}"
        >
          <span>${diaNombre}</span>
          <small>${obtenerTextoEstado(colorActual)}</small>
        </button>
      `;
      contadorDiaGlobal++;
    });
  }

  html += `</div>`;
  cont.innerHTML = html;
}

// ============================================================================
// CAPA HTTP / FETCH CON MANEJO SEGURO DE JSON
// ============================================================================
async function peticionJson(url, options = {}) {
  const headers = {
    Accept: "application/json",
    ...(options.body ? { "Content-Type": "application/json" } : {}),
    ...(options.headers || {}),
  };

  const res = await fetch(url, { ...options, headers });
  const texto = await res.text();
  let data = {};

  if (texto) {
    try {
      data = JSON.parse(texto);
    } catch {
      throw new Error(
        `El servidor devolvió un formato no JSON (HTTP ${res.status}). Asegúrate de abrir http://localhost/asistencia/ desde XAMPP.`
      );
    }
  }

  if (!res.ok || data.ok === false) {
    throw new Error(data.error || `Error en la petición (HTTP ${res.status}).`);
  }

  return data;
}

function normalizarEstudiante(est) {
  const nombre = String(est.nombre || "").trim();
  const apellido = String(est.apellido || "").trim();
  const nombreCompleto =
    est.nombre_completo ||
    [nombre, apellido].filter((p) => p && p !== "N/D").join(" ").trim() ||
    nombre;

  const asistencias =
    est.asistencias && typeof est.asistencias === "object" && !Array.isArray(est.asistencias)
      ? est.asistencias
      : {};

  return {
    ...est,
    id: Number(est.id),
    seccion_id: est.seccion_id != null ? Number(est.seccion_id) : null,
    cedula: String(est.cedula || "").trim(),
    nombre,
    apellido,
    nombre_completo: nombreCompleto,
    sexo: est.sexo || "N/D",
    seccion: est.seccion || est.nombre_seccion || "",
    asistencias,
  };
}

async function apiListarEstudiantes() {
  const data = await peticionJson(API_ESTUDIANTES, { method: "GET" });
  const lista = Array.isArray(data.estudiantes) ? data.estudiantes : [];
  return lista.map(normalizarEstudiante);
}

async function apiCrearEstudiante(payload) {
  const data = await peticionJson(API_ESTUDIANTES, {
    method: "POST",
    body: JSON.stringify(payload),
  });
  return normalizarEstudiante(data.estudiante);
}

async function apiEditarEstudiante(payload) {
  const data = await peticionJson(API_ESTUDIANTES, {
    method: "PUT",
    body: JSON.stringify({ ...payload, id: Number(payload.id) }),
  });
  return normalizarEstudiante(data.estudiante);
}

async function apiEliminarEstudiante(id) {
  const data = await peticionJson(API_ESTUDIANTES, {
    method: "DELETE",
    body: JSON.stringify({ id: Number(id) }),
  });
  return Number(data.id ?? id);
}

async function apiGuardarAsistencia(id, asistencias) {
  const data = await peticionJson(API_ASISTENCIA, {
    method: "PUT",
    body: JSON.stringify({ id: Number(id), asistencias }),
  });
  return data.asistencias && typeof data.asistencias === "object" ? data.asistencias : asistencias;
}

// ============================================================================
// UTILIDADES DE INTERFAZ Y RENDERIZADO
// ============================================================================
function escaparHtml(valor) {
  return String(valor ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function sincronizarDatosUsuarioUI() {
  const cred = obtenerCredenciales() || { usuario: USUARIO_INICIAL };
  const labelUsuario = document.querySelector("#usuario-activo");
  if (labelUsuario) labelUsuario.textContent = cred.usuario;

  const inputPerfil = document.querySelector("#usuario-perfil");
  if (inputPerfil && !inputPerfil.value) {
    inputPerfil.value = cred.usuario;
  }
}

function mostrarSistema() {
  const loginEl = document.querySelector("#login-container");
  const sistemaEl = document.querySelector("#sistema-container");
  if (loginEl) loginEl.classList.add("oculto");
  if (sistemaEl) sistemaEl.classList.remove("oculto");
  sincronizarDatosUsuarioUI();
}

function mostrarLogin() {
  const loginEl = document.querySelector("#login-container");
  const sistemaEl = document.querySelector("#sistema-container");
  if (sistemaEl) sistemaEl.classList.add("oculto");
  if (loginEl) loginEl.classList.remove("oculto");

  const uInput = document.querySelector("#login-usuario");
  const pInput = document.querySelector("#login-password");
  if (uInput) uInput.value = "";
  if (pInput) pInput.value = "";
}

function actualizarOpcionesSeccion() {
  const selectFiltro = document.querySelector("#filtro-seccion");
  if (!selectFiltro) return;

  const valorPrevio = selectFiltro.value || "todas";
  const seccionesUnicas = [...new Set(listaEstudiantes.map((e) => e.seccion).filter(Boolean))].sort();

  selectFiltro.innerHTML = `<option value="todas">Todas las secciones</option>`;
  seccionesUnicas.forEach((sec) => {
    const opt = document.createElement("option");
    opt.value = sec;
    opt.textContent = sec;
    selectFiltro.appendChild(opt);
  });

  if ([...selectFiltro.options].some((o) => o.value === valorPrevio)) {
    selectFiltro.value = valorPrevio;
  }
}

function obtenerFiltrados() {
  const texto = (document.querySelector("#buscar-estudiante")?.value || "").trim().toLowerCase();
  const sexo = document.querySelector("#filtro-sexo")?.value || "todos";
  const seccion = document.querySelector("#filtro-seccion")?.value || "todas";

  return listaEstudiantes.filter((est) => {
    const okTexto =
      !texto ||
      est.cedula.toLowerCase().includes(texto) ||
      est.nombre_completo.toLowerCase().includes(texto) ||
      est.seccion.toLowerCase().includes(texto);
    const okSexo = sexo === "todos" || est.sexo === sexo;
    const okSeccion = seccion === "todas" || est.seccion === seccion;
    return okTexto && okSexo && okSeccion;
  });
}

function renderizarTabla(estudiantes = obtenerFiltrados()) {
  const tbody = document.querySelector("#tabla-estudiantes tbody");
  if (!tbody) return;

  tbody.innerHTML = "";
  if (!estudiantes.length) {
    tbody.innerHTML = `<tr><td colspan="5">No hay estudiantes registrados.</td></tr>`;
    return;
  }

  estudiantes.forEach((est) => {
    const claseSec = obtenerClaseColorSeccion(est.seccion);
    const tr = document.createElement("tr");
    tr.dataset.id = est.id;
    tr.innerHTML = `
      <td>${escaparHtml(est.cedula)}</td>
      <td>${escaparHtml(est.nombre_completo)}</td>
      <td>${escaparHtml(est.sexo)}</td>
      <td><span class="seccion-badge ${claseSec}">${escaparHtml(est.seccion)}</span></td>
      <td class="no-print">
        <button type="button" class="btn-secundario" data-accion="asistencia" data-id="${est.id}">Asistencia</button>
        <button type="button" class="btn-primario" data-accion="editar" data-id="${est.id}">Editar</button>
        <button type="button" class="btn-peligro" data-accion="eliminar" data-id="${est.id}">Eliminar</button>
      </td>
    `;
    tbody.appendChild(tr);
  });
}

// ============================================================================
// ACCIONES DE CARGA, CRUD, ASISTENCIA, CREDENCIALES E IMPRESIÓN
// ============================================================================
async function cargarEstudiantes() {
  try {
    listaEstudiantes = await apiListarEstudiantes();
    actualizarOpcionesSeccion();
    renderizarTabla(obtenerFiltrados());

    if (estudianteSeleccionadoId) {
      const actual = listaEstudiantes.find((e) => Number(e.id) === Number(estudianteSeleccionadoId));
      if (actual) renderizarCasillasAsistencia(actual);
    }
  } catch (error) {
    console.error(error);
    alert(error.message);
  }
}

function abrirEdicion(estudiante) {
  estudianteEnEdicionId = Number(estudiante.id);
  const panelEditar = document.querySelector("#panel-editar-estudiante");
  if (panelEditar) panelEditar.classList.remove("oculto");

  document.querySelector("#edit-id").value = estudiante.id;
  document.querySelector("#edit-cedula").value = estudiante.cedula;
  document.querySelector("#edit-nombre-completo").value = estudiante.nombre_completo;
  document.querySelector("#edit-sexo").value = estudiante.sexo || "N/D";
  document.querySelector("#edit-seccion").value = estudiante.seccion;
  panelEditar?.scrollIntoView({ behavior: "smooth", block: "nearest" });
}

function cerrarEdicion() {
  estudianteEnEdicionId = null;
  const formEditar = document.querySelector("#form-editar-estudiante");
  const panelEditar = document.querySelector("#panel-editar-estudiante");
  formEditar?.reset();
  panelEditar?.classList.add("oculto");
}

document.addEventListener("DOMContentLoaded", () => {
  asegurarCredencialesIniciales();
  sincronizarDatosUsuarioUI();

  // Login
  document.querySelector("#form-login")?.addEventListener("submit", async (e) => {
    e.preventDefault();
    const usuario = document.querySelector("#login-usuario")?.value || "";
    const password = document.querySelector("#login-password")?.value || "";

    if (!validarCredenciales(usuario, password)) {
      alert("Usuario o contraseña incorrectos.");
      return;
    }

    setSesionActiva(true);
    mostrarSistema();
    await cargarEstudiantes();
  });

  // Cerrar sesión
  document.querySelector("#btn-cerrar-sesion")?.addEventListener("click", () => {
    setSesionActiva(false);
    mostrarLogin();
  });

  // Abrir / cerrar panel de cambio de contraseña y usuario
  document.querySelector("#btn-cambiar-password")?.addEventListener("click", () => {
    sincronizarDatosUsuarioUI();
    document.querySelector("#panel-cambiar-password")?.classList.toggle("oculto");
  });

  document.querySelector("#btn-cancelar-clave")?.addEventListener("click", () => {
    const formClave = document.querySelector("#form-cambiar-password");
    formClave?.reset();
    document.querySelector("#panel-cambiar-password")?.classList.add("oculto");
  });

  // Guardar cambio de contraseña / usuario
  document.querySelector("#form-cambiar-password")?.addEventListener("submit", (e) => {
    e.preventDefault();
    try {
      const actualizado = actualizarUsuarioYPassword({
        nuevoUsuario: document.querySelector("#usuario-perfil")?.value,
        passwordActual: document.querySelector("#password-actual")?.value,
        passwordNueva: document.querySelector("#password-nueva")?.value,
        passwordConfirmar: document.querySelector("#password-confirmar")?.value,
      });

      sincronizarDatosUsuarioUI();
      e.currentTarget.reset();
      document.querySelector("#panel-cambiar-password")?.classList.add("oculto");
      alert(`Credenciales guardadas para el usuario "${actualizado.usuario}".`);
    } catch (error) {
      alert(error.message);
    }
  });

  // Imprimir
  document.querySelector("#btn-imprimir")?.addEventListener("click", () => {
    window.print();
  });

  // Crear estudiante
  document.querySelector("#form-agregar-estudiante")?.addEventListener("submit", async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const payload = {
      cedula: document.querySelector("#cedula")?.value.trim(),
      nombre_completo: document.querySelector("#nombre-completo")?.value.trim(),
      sexo: document.querySelector("#sexo")?.value || "N/D",
      seccion: document.querySelector("#seccion")?.value.trim(),
    };

    const btn = form.querySelector("button[type='submit']");
    if (btn) btn.disabled = true;

    try {
      const creado = await apiCrearEstudiante(payload);
      listaEstudiantes.push(creado);
      actualizarOpcionesSeccion();
      renderizarTabla(obtenerFiltrados());
      form.reset();
    } catch (error) {
      alert(error.message);
    } finally {
      if (btn) btn.disabled = false;
    }
  });

  // Editar estudiante
  document.querySelector("#btn-cancelar-edicion")?.addEventListener("click", cerrarEdicion);

  document.querySelector("#form-editar-estudiante")?.addEventListener("submit", async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const id = Number(estudianteEnEdicionId || document.querySelector("#edit-id")?.value || 0);
    if (!id) return;

    const payload = {
      id,
      cedula: document.querySelector("#edit-cedula")?.value.trim(),
      nombre_completo: document.querySelector("#edit-nombre-completo")?.value.trim(),
      sexo: document.querySelector("#edit-sexo")?.value || "N/D",
      seccion: document.querySelector("#edit-seccion")?.value.trim(),
    };

    const btn = form.querySelector("button[type='submit']");
    if (btn) btn.disabled = true;

    try {
      const actualizado = await apiEditarEstudiante(payload);
      listaEstudiantes = listaEstudiantes.map((est) =>
        Number(est.id) === Number(actualizado.id) ? { ...est, ...actualizado } : est
      );
      actualizarOpcionesSeccion();
      renderizarTabla(obtenerFiltrados());
      cerrarEdicion();
    } catch (error) {
      alert(error.message);
    } finally {
      if (btn) btn.disabled = false;
    }
  });

  // Botones en cada fila de la tabla
  document.querySelector("#tabla-estudiantes tbody")?.addEventListener("click", async (e) => {
    const btn = e.target.closest("button[data-accion]");
    if (!btn) return;

    const id = Number(btn.dataset.id);
    const est = listaEstudiantes.find((item) => Number(item.id) === id);
    if (!est) return;

    const accion = btn.dataset.accion;
    if (accion === "editar") {
      abrirEdicion(est);
    } else if (accion === "asistencia") {
      renderizarCasillasAsistencia(est);
    } else if (accion === "eliminar") {
      if (!confirm(`¿Seguro que deseas eliminar a ${est.nombre_completo}?`)) return;
      btn.disabled = true;
      try {
        const eliminadoId = await apiEliminarEstudiante(id);
        listaEstudiantes = listaEstudiantes.filter((item) => Number(item.id) !== Number(eliminadoId));
        if (Number(estudianteSeleccionadoId) === Number(eliminadoId)) {
          estudianteSeleccionadoId = null;
          document.querySelector("#contenedor-asistencia").innerHTML =
            `<p class="texto-ayuda">Selecciona el botón <strong>Asistencia</strong> en un estudiante para marcar sus días.</p>`;
        }
        actualizarOpcionesSeccion();
        renderizarTabla(obtenerFiltrados());
      } catch (error) {
        alert(error.message);
        btn.disabled = false;
      }
    }
  });

  // Clic directo en las casillas para rotar colores (Verde -> Rojo -> Morado -> Blanco)
  document.querySelector("#contenedor-asistencia")?.addEventListener("click", async (e) => {
    const btnCasilla = e.target.closest("button.casilla-dia");
    if (!btnCasilla) return;

    const id = Number(btnCasilla.dataset.estudianteId);
    const clave = btnCasilla.dataset.clave;
    const est = listaEstudiantes.find((item) => Number(item.id) === id);
    if (!est || !clave) return;

    const estadoActual = normalizarColorAsistencia(btnCasilla.dataset.color);
    const nuevoEstado = obtenerSiguienteEstado(estadoActual);

    const nuevasAsistencias = { ...(est.asistencias || {}) };

    if (nuevoEstado === "") {
      delete nuevasAsistencias[clave];
    } else {
      nuevasAsistencias[clave] = nuevoEstado;
    }

    btnCasilla.disabled = true;
    try {
      const guardadas = await apiGuardarAsistencia(id, nuevasAsistencias);
      est.asistencias = guardadas;
      renderizarCasillasAsistencia(est);
    } catch (error) {
      alert(error.message);
    } finally {
      btnCasilla.disabled = false;
    }
  });

  // Filtros de búsqueda
  ["#buscar-estudiante", "#filtro-sexo", "#filtro-seccion"].forEach((sel) => {
    const el = document.querySelector(sel);
    el?.addEventListener("input", () => renderizarTabla(obtenerFiltrados()));
    el?.addEventListener("change", () => renderizarTabla(obtenerFiltrados()));
  });

  // Estado inicial al cargar
  if (haySesionActiva()) {
    mostrarSistema();
    cargarEstudiantes();
  } else {
    mostrarLogin();
  }
});