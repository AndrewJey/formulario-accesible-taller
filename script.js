'use strict';

(() => {
  const TITULO_BASE =
    'Formulario de inscripción – Taller Universitario de Accesibilidad e Inclusión Digital';

  const formulario = document.getElementById('formulario-inscripcion');
  const seccionFormulario = document.getElementById('seccion-formulario');
  const seccionConfirmacion = document.getElementById('confirmacion');
  const resumenErrores = document.getElementById('resumen-errores');
  const tituloResumenErrores = document.getElementById('titulo-resumen-errores');
  const listaResumenErrores = document.getElementById('lista-resumen-errores');
  const anuncioEstado = document.getElementById('anuncio-estado');

  const campoNombre = document.getElementById('nombre');
  const campoCorreo = document.getElementById('correo');
  const campoTelefono = document.getElementById('telefono');
  const campoFacultad = document.getElementById('facultad');
  const campoSesion = document.getElementById('sesion');
  const campoComentarios = document.getElementById('comentarios');
  const contadorComentarios = document.getElementById('comentarios-contador');
  const campoConsentimiento = document.getElementById('consentimiento');

  const folioConfirmacion = document.getElementById('folio-confirmacion');
  const resumenDatos = document.getElementById('resumen-datos');

  const btnLimpiar = document.getElementById('btn-limpiar');
  const btnImprimir = document.getElementById('btn-imprimir');
  const btnNuevaInscripcion = document.getElementById('btn-nueva-inscripcion');

  if (!formulario) {
    return;
  }

  // Mejora progresiva: desactiva los globos nativos solo cuando JS está activo
  // para ofrecer mensajes de error más claros y un resumen accesible con foco.
  formulario.noValidate = true;

  let ultimoAvisoCaracteres = 0;

  /**
   * Anuncia un mensaje de estado en la región viva cortés para lectores de pantalla.
   * @param {string} mensaje
   */
  function anunciarEstado(mensaje) {
    anuncioEstado.textContent = '';
    window.setTimeout(() => {
      anuncioEstado.textContent = mensaje;
    }, 50);
  }

  /**
   * Obtiene el valor seleccionado de un grupo de botones de opción (radio).
   * @param {string} nombreGrupo
   * @returns {string}
   */
  function obtenerRadioSeleccionado(nombreGrupo) {
    const seleccionado = formulario.querySelector(`input[name="${nombreGrupo}"]:checked`);
    return seleccionado ? seleccionado.value : '';
  }

  /**
   * Obtiene todos los valores marcados de un grupo de casillas de verificación.
   * @param {string} nombreGrupo
   * @returns {string[]}
   */
  function obtenerCasillasSeleccionadas(nombreGrupo) {
    return Array.from(formulario.querySelectorAll(`input[name="${nombreGrupo}"]:checked`)).map(
      (input) => input.value
    );
  }

  /**
   * Muestra o limpia el estado de error de un campo individual o grupo de opciones.
   * @param {string} claveCampo
   * @param {string} mensajeError
   */
  function establecerErrorCampo(claveCampo, mensajeError) {
    const contenedor = formulario.querySelector(`[data-campo="${claveCampo}"]`);
    const elementoError = document.getElementById(`${claveCampo}-error`);

    if (!contenedor || !elementoError) {
      return;
    }

    const tieneError = Boolean(mensajeError);
    contenedor.classList.toggle('campo-invalido', tieneError);

    if (tieneError) {
      elementoError.textContent = mensajeError;
      elementoError.hidden = false;
    } else {
      elementoError.textContent = '';
      elementoError.hidden = true;
    }

    if (claveCampo === 'perfil' || claveCampo === 'modalidad') {
      const radios = formulario.querySelectorAll(`input[name="${claveCampo}"]`);
      radios.forEach((radio) => {
        if (tieneError) {
          radio.setAttribute('aria-invalid', 'true');
          radio.setAttribute('aria-describedby', `${claveCampo}-error`);
        } else {
          radio.removeAttribute('aria-invalid');
          radio.removeAttribute('aria-describedby');
        }
      });
    } else {
      const control = document.getElementById(claveCampo);
      if (control) {
        if (tieneError) {
          control.setAttribute('aria-invalid', 'true');
        } else {
          control.removeAttribute('aria-invalid');
        }
      }
    }
  }

  /**
   * Definición centralizada de validadores y textos accesibles por campo.
   */
  const validadores = [
    {
      clave: 'nombre',
      etiqueta: 'Nombre completo',
      idFoco: 'nombre',
      validar() {
        const valor = campoNombre.value.trim();
        if (!valor) {
          return 'Ingrese su nombre completo (nombre y al menos un apellido) para emitir su certificado.';
        }
        const partes = valor.split(/\s+/).filter(Boolean);
        if (partes.length < 2 || valor.length < 4) {
          return 'Escriba al menos un nombre y un apellido (por ejemplo: María Gómez).';
        }
        return '';
      },
    },
    {
      clave: 'correo',
      etiqueta: 'Correo electrónico',
      idFoco: 'correo',
      validar() {
        const valor = campoCorreo.value.trim();
        if (!valor) {
          return 'Ingrese una dirección de correo electrónico para recibir la confirmación de su inscripción.';
        }
        const patronCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
        if (!patronCorreo.test(valor)) {
          return 'El formato del correo electrónico no es válido. Incluya un nombre, el símbolo @ y un dominio (ejemplo: maria.gomez@universidad.edu).';
        }
        return '';
      },
    },
    {
      clave: 'telefono',
      etiqueta: 'Teléfono de contacto',
      idFoco: 'telefono',
      validar() {
        const valor = campoTelefono.value.trim();
        if (!valor) {
          return '';
        }
        const caracteresValidos = /^[+0-9()\s-]+$/.test(valor);
        const digitos = valor.replace(/\D/g, '');
        if (!caracteresValidos || digitos.length < 8 || digitos.length > 15) {
          return 'El número de teléfono debe tener entre 8 y 15 dígitos y solo puede incluir números, espacios, guiones, paréntesis o el signo +.';
        }
        return '';
      },
    },
    {
      clave: 'perfil',
      etiqueta: 'Perfil universitario',
      idFoco: 'perfil-grado',
      validar() {
        if (!obtenerRadioSeleccionado('perfil')) {
          return 'Seleccione su perfil universitario para adaptar los ejemplos y materiales del taller.';
        }
        return '';
      },
    },
    {
      clave: 'facultad',
      etiqueta: 'Facultad, escuela o unidad académica',
      idFoco: 'facultad',
      validar() {
        if (!campoFacultad.value) {
          return 'Seleccione una facultad, escuela o unidad académica de la lista desplegable.';
        }
        return '';
      },
    },
    {
      clave: 'modalidad',
      etiqueta: 'Modalidad de asistencia preferida',
      idFoco: 'modalidad-presencial',
      validar() {
        if (!obtenerRadioSeleccionado('modalidad')) {
          return 'Seleccione si asistirá de forma presencial o virtual para reservar su cupo.';
        }
        return '';
      },
    },
    {
      clave: 'sesion',
      etiqueta: 'Sesión y horario preferido',
      idFoco: 'sesion',
      validar() {
        if (!campoSesion.value) {
          return 'Seleccione la fecha y el horario en los que desea participar en el taller.';
        }
        return '';
      },
    },
    {
      clave: 'comentarios',
      etiqueta: 'Otros comentarios o necesidades de apoyo',
      idFoco: 'comentarios',
      validar() {
        if (campoComentarios.value.length > 500) {
          return 'El texto supera el máximo permitido de 500 caracteres. Reduzca su mensaje antes de enviar.';
        }
        return '';
      },
    },
    {
      clave: 'consentimiento',
      etiqueta: 'Autorización de uso de datos',
      idFoco: 'consentimiento',
      validar() {
        if (!campoConsentimiento.checked) {
          return 'Debe marcar la casilla de autorización de datos para completar y enviar su inscripción.';
        }
        return '';
      },
    },
  ];

  /**
   * Valida todos los campos y devuelve la lista de errores encontrados.
   * @returns {Array<{clave: string, etiqueta: string, idFoco: string, mensaje: string}>}
   */
  function validarFormulario() {
    const errores = [];

    validadores.forEach((regla) => {
      const mensaje = regla.validar();
      establecerErrorCampo(regla.clave, mensaje);
      if (mensaje) {
        errores.push({
          clave: regla.clave,
          etiqueta: regla.etiqueta,
          idFoco: regla.idFoco,
          mensaje,
        });
      }
    });

    return errores;
  }

  /**
   * Muestra el resumen superior de errores con enlaces directos a cada campo.
   * @param {Array<{clave: string, etiqueta: string, idFoco: string, mensaje: string}>} errores
   * @param {boolean} moverFoco
   */
  function renderizarResumenErrores(errores, moverFoco) {
    listaResumenErrores.textContent = '';

    if (errores.length === 0) {
      resumenErrores.hidden = true;
      document.title = TITULO_BASE;
      return;
    }

    const textoConteo =
      errores.length === 1
        ? 'Se encontró 1 error en el formulario'
        : `Se encontraron ${errores.length} errores en el formulario`;

    tituloResumenErrores.textContent = textoConteo;

    errores.forEach((error) => {
      const li = document.createElement('li');
      const enlace = document.createElement('a');
      enlace.href = `#${error.idFoco}`;
      enlace.textContent = `${error.etiqueta}: ${error.mensaje}`;
      enlace.addEventListener('click', (evento) => {
        const objetivo = document.getElementById(error.idFoco);
        if (objetivo) {
          evento.preventDefault();
          objetivo.focus();
          objetivo.scrollIntoView({ block: 'center' });
        }
      });
      li.appendChild(enlace);
      listaResumenErrores.appendChild(li);
    });

    resumenErrores.hidden = false;
    document.title = `Error (${errores.length}) – ${TITULO_BASE}`;

    if (moverFoco) {
      resumenErrores.focus();
      resumenErrores.scrollIntoView({ block: 'start' });
    }
  }

  /**
   * Revalida un campo individual solo si actualmente estaba marcado con error.
   * @param {string} claveCampo
   */
  function revalidarSiTieneError(claveCampo) {
    const contenedor = formulario.querySelector(`[data-campo="${claveCampo}"]`);
    if (!contenedor || !contenedor.classList.contains('campo-invalido')) {
      return;
    }

    const regla = validadores.find((item) => item.clave === claveCampo);
    if (!regla) {
      return;
    }

    const mensaje = regla.validar();
    establecerErrorCampo(claveCampo, mensaje);

    // Si el resumen estaba visible, actualizamos el listado sin robar el foco del usuario.
    if (!resumenErrores.hidden) {
      const erroresRestantes = validadores
        .map((item) => {
          const cont = formulario.querySelector(`[data-campo="${item.clave}"]`);
          const err = document.getElementById(`${item.clave}-error`);
          if (cont && cont.classList.contains('campo-invalido') && err && err.textContent) {
            return {
              clave: item.clave,
              etiqueta: item.etiqueta,
              idFoco: item.idFoco,
              mensaje: err.textContent,
            };
          }
          return null;
        })
        .filter(Boolean);

      renderizarResumenErrores(erroresRestantes, false);
    }
  }

  /**
   * Actualiza el contador de caracteres del área de comentarios.
   */
  function actualizarContadorComentarios() {
    const longitud = campoComentarios.value.length;
    contadorComentarios.textContent = `${longitud} de 500 caracteres utilizados`;

    if (longitud >= 500 && ultimoAvisoCaracteres < 500) {
      ultimoAvisoCaracteres = 500;
      anunciarEstado('Ha alcanzado el límite de 500 caracteres en el campo de comentarios.');
    } else if (longitud >= 450 && longitud < 500 && ultimoAvisoCaracteres < 450) {
      ultimoAvisoCaracteres = 450;
      anunciarEstado(`Le quedan ${500 - longitud} caracteres disponibles en el campo de comentarios.`);
    } else if (longitud < 450) {
      ultimoAvisoCaracteres = 0;
    }
  }

  /**
   * Genera un código legible de comprobante de inscripción.
   * @returns {string}
   */
  function generarFolio() {
    const anio = new Date().getFullYear();
    const numero = Math.floor(1000 + Math.random() * 9000);
    return `TALLER-${anio}-${numero}`;
  }

  /**
   * Crea una fila semántica <dt>/<dd> en la lista de resumen de confirmación.
   * @param {string} etiqueta
   * @param {string} valor
   */
  function agregarFilaResumen(etiqueta, valor) {
    const fila = document.createElement('div');
    fila.className = 'resumen-fila';

    const dt = document.createElement('dt');
    dt.textContent = etiqueta;

    const dd = document.createElement('dd');
    dd.textContent = valor;

    fila.appendChild(dt);
    fila.appendChild(dd);
    resumenDatos.appendChild(fila);
  }

  /**
   * Muestra el panel de confirmación accesible con todos los datos enviados.
   */
  function mostrarConfirmacion() {
    const folio = generarFolio();
    const fechaRegistro = new Intl.DateTimeFormat('es', {
      dateStyle: 'long',
      timeStyle: 'short',
    }).format(new Date());

    const apoyos = obtenerCasillasSeleccionadas('apoyos');
    const telefono = campoTelefono.value.trim();
    const comentarios = campoComentarios.value.trim();

    folioConfirmacion.textContent = folio;
    resumenDatos.textContent = '';

    agregarFilaResumen('Número de comprobante', folio);
    agregarFilaResumen('Fecha y hora de registro', fechaRegistro);
    agregarFilaResumen('Nombre completo', campoNombre.value.trim());
    agregarFilaResumen('Correo electrónico', campoCorreo.value.trim());
    agregarFilaResumen('Teléfono de contacto', telefono || 'No proporcionado');
    agregarFilaResumen('Perfil universitario', obtenerRadioSeleccionado('perfil'));
    agregarFilaResumen('Facultad o unidad académica', campoFacultad.value);
    agregarFilaResumen('Modalidad de asistencia', obtenerRadioSeleccionado('modalidad'));
    agregarFilaResumen('Sesión seleccionada', campoSesion.value);
    agregarFilaResumen(
      'Apoyos de accesibilidad solicitados',
      apoyos.length > 0 ? apoyos.join('; ') : 'Ninguno especificado'
    );
    agregarFilaResumen('Comentarios adicionales', comentarios || 'Sin comentarios adicionales');

    resumenErrores.hidden = true;
    seccionFormulario.hidden = true;
    seccionConfirmacion.hidden = false;

    document.title = `Inscripción confirmada (${folio}) – ${TITULO_BASE}`;
    seccionConfirmacion.focus();
    seccionConfirmacion.scrollIntoView({ block: 'start' });

    anunciarEstado(
      `Inscripción enviada y confirmada. Su número de comprobante es ${folio}.`
    );
  }

  /**
   * Limpia todos los valores y estados de error del formulario.
   */
  function reiniciarFormulario() {
    formulario.reset();
    validadores.forEach((regla) => establecerErrorCampo(regla.clave, ''));
    resumenErrores.hidden = true;
    listaResumenErrores.textContent = '';
    ultimoAvisoCaracteres = 0;
    actualizarContadorComentarios();
    document.title = TITULO_BASE;
  }

  // Eventos de revalidación en vivo (solo cuando un campo ya tiene error)
  campoNombre.addEventListener('input', () => revalidarSiTieneError('nombre'));
  campoCorreo.addEventListener('input', () => revalidarSiTieneError('correo'));
  campoTelefono.addEventListener('input', () => revalidarSiTieneError('telefono'));
  campoFacultad.addEventListener('change', () => revalidarSiTieneError('facultad'));
  campoSesion.addEventListener('change', () => revalidarSiTieneError('sesion'));
  campoConsentimiento.addEventListener('change', () => revalidarSiTieneError('consentimiento'));

  campoComentarios.addEventListener('input', () => {
    actualizarContadorComentarios();
    revalidarSiTieneError('comentarios');
  });

  formulario.querySelectorAll('input[name="perfil"]').forEach((radio) => {
    radio.addEventListener('change', () => revalidarSiTieneError('perfil'));
  });

  formulario.querySelectorAll('input[name="modalidad"]').forEach((radio) => {
    radio.addEventListener('change', () => revalidarSiTieneError('modalidad'));
  });

  // Envío del formulario
  formulario.addEventListener('submit', (evento) => {
    evento.preventDefault();
    const errores = validarFormulario();

    if (errores.length > 0) {
      renderizarResumenErrores(errores, true);
      return;
    }

    mostrarConfirmacion();
  });

  // Botón limpiar formulario
  btnLimpiar.addEventListener('click', () => {
    reiniciarFormulario();
    campoNombre.focus();
    anunciarEstado('El formulario se ha limpiado. Todos los campos están vacíos.');
  });

  // Botón imprimir / guardar comprobante
  btnImprimir.addEventListener('click', () => {
    window.print();
  });

  // Botón realizar otra inscripción
  btnNuevaInscripcion.addEventListener('click', () => {
    reiniciarFormulario();
    seccionConfirmacion.hidden = true;
    seccionFormulario.hidden = false;
    campoNombre.focus();
    anunciarEstado('Formulario reiniciado y listo para una nueva inscripción.');
  });

  actualizarContadorComentarios();
})();
