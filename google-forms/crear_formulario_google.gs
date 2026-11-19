/**
 * Script de Google Apps Script para crear automáticamente el formulario accesible
 * del Caso 4: Formularios y sitios web — De la interacción a la inclusión.
 *
 * Cómo ejecutarlo (toma menos de 1 minuto):
 * 1. Abra https://script.google.com con su cuenta de Google.
 * 2. Haga clic en "Nuevo proyecto".
 * 3. Borre el contenido inicial del editor y pegue todo este código.
 * 4. Haga clic en el botón "Guardar" y luego en "Ejecutar" (función: crearFormularioAccesibleTaller).
 * 5. Acepte los permisos solicitados para Google Forms.
 * 6. En el "Registro de ejecución" (parte inferior) aparecerán:
 *    - El enlace público para compartir y responder el formulario.
 *    - El enlace de edición en su Google Drive.
 */
function crearFormularioAccesibleTaller() {
  const form = FormApp.create(
    'Inscripción al Taller Universitario de Accesibilidad e Inclusión Digital'
  );

  form.setTitle('Inscripción al Taller Universitario de Accesibilidad e Inclusión Digital');
  form.setDescription(
    'Organiza: Dirección de Innovación Educativa y Bienestar Universitario\n' +
    'Modalidad: Presencial y virtual en vivo (híbrida) | Duración: 4 horas | Gratuito con certificado.\n\n' +
    'INSTRUCCIONES ANTES DE COMENZAR:\n' +
    '• Tiempo estimado: 3 minutos.\n' +
    '• Campos obligatorios: todas las preguntas marcadas con un asterisco (*) y la etiqueta "(obligatorio)" son necesarias para completar su inscripción. Las preguntas etiquetadas como "(opcional)" pueden dejarse en blanco.\n' +
    '• Navegación por teclado: puede completar este formulario usando Tab, Shift + Tab, teclas de flecha, Espacio y Enter.\n' +
    '• Privacidad: sus datos se usarán únicamente para gestionar su inscripción, coordinar apoyos de accesibilidad y emitir su certificado.'
  );

  form.setAcceptingResponses(true);
  form.setCollectEmail(false);
  form.setShowLinkToRespondAgain(true);

  // =========================================================================
  // SECCIÓN 1: DATOS PERSONALES
  // =========================================================================
  form.addSectionHeaderItem()
    .setTitle('1. Datos personales')
    .setHelpText(
      'Ingrese sus datos de identificación y contacto para registrar su participación y enviarle el certificado.'
    );

  // Campo 1: Nombre completo (Obligatorio)
  const itemNombre = form.addTextItem();
  itemNombre
    .setTitle('Nombre completo (obligatorio)')
    .setHelpText(
      'Escriba su nombre y apellidos tal como desea que aparezcan en su certificado de participación. Ejemplo: María Elena Gómez Morales.'
    )
    .setRequired(true);

  const validacionNombre = FormApp.createTextValidation()
    .setHelpText(
      'Escriba al menos un nombre y un apellido con mínimo dos letras cada uno (por ejemplo: María Gómez).'
    )
    .requireTextMatchesPattern('^\\s*\\S{2,}(\\s+\\S+)*\\s+\\S{2,}\\s*$')
    .build();
  itemNombre.setValidation(validacionNombre);

  // Campo 2: Correo electrónico (Obligatorio)
  const itemCorreo = form.addTextItem();
  itemCorreo
    .setTitle('Correo electrónico institucional o personal (obligatorio)')
    .setHelpText(
      'Enviaremos la confirmación, el enlace de acceso o ubicación y su certificado a esta dirección. Ejemplo: maria.gomez@universidad.edu.'
    )
    .setRequired(true);

  const validacionCorreo = FormApp.createTextValidation()
    .setHelpText(
      'El formato del correo electrónico no es válido. Incluya un nombre, el símbolo @ y un dominio (ejemplo: maria.gomez@universidad.edu).'
    )
    .requireTextIsEmail()
    .build();
  itemCorreo.setValidation(validacionCorreo);

  // Campo 3: Teléfono de contacto (Opcional)
  const itemTelefono = form.addTextItem();
  itemTelefono
    .setTitle('Teléfono de contacto (opcional)')
    .setHelpText(
      'Opcional. Solo se utilizará para avisos urgentes sobre cambios de horario o aula. Si lo incluye, ingrese entre 8 y 15 dígitos (puede usar prefijo +, espacios o guiones).'
    )
    .setRequired(false);

  const validacionTelefono = FormApp.createTextValidation()
    .setHelpText(
      'El número de teléfono debe tener entre 8 y 20 caracteres válidos (números, espacios, guiones, paréntesis o el signo +). Ejemplo: +506 8888-8888.'
    )
    .requireTextMatchesPattern('^[+0-9()\\s-]{8,20}$')
    .build();
  itemTelefono.setValidation(validacionTelefono);

  // =========================================================================
  // SECCIÓN 2: PERFIL ACADÉMICO Y PARTICIPACIÓN
  // =========================================================================
  form.addSectionHeaderItem()
    .setTitle('2. Perfil académico y participación')
    .setHelpText(
      'Esta información nos permite adaptar los ejemplos prácticos y reservar su cupo en la sesión seleccionada.'
    );

  // Campo 4: Perfil universitario (Obligatorio - Botones de opción)
  form.addMultipleChoiceItem()
    .setTitle('Perfil universitario (obligatorio)')
    .setHelpText('Seleccione la opción que mejor describa su vínculo actual con la universidad.')
    .setChoiceValues([
      'Estudiante de grado o licenciatura',
      'Estudiante de posgrado',
      'Docente o investigador(a)',
      'Personal administrativo o de apoyo',
      'Persona invitada externa',
    ])
    .setRequired(true);

  // Campo 5: Facultad, escuela o unidad académica (Obligatorio - Lista desplegable)
  form.addListItem()
    .setTitle('Facultad, escuela o unidad académica (obligatorio)')
    .setHelpText('Seleccione en la lista desplegable la facultad o unidad a la que pertenece.')
    .setChoiceValues([
      'Ingeniería y Tecnología',
      'Ciencias de la Educación',
      'Ciencias Sociales y Humanidades',
      'Ciencias de la Salud',
      'Ciencias Económicas y Empresariales',
      'Artes, Diseño y Comunicación',
      'Administración Central y Bienestar Universitario',
      'Otra unidad o institución externa',
    ])
    .setRequired(true);

  // Campo 6: Modalidad de asistencia preferida (Obligatorio - Botones de opción)
  form.addMultipleChoiceItem()
    .setTitle('Modalidad de asistencia preferida (obligatorio)')
    .setHelpText(
      'Ambas modalidades incluyen las mismas prácticas, materiales accesibles y certificado de participación.'
    )
    .setChoiceValues([
      'Presencial (Auditorio Central, acceso sin escalones y ascensor)',
      'Virtual en vivo (plataforma con subtítulos en tiempo real y transcripción)',
    ])
    .setRequired(true);

  // Campo 7: Sesión y horario preferido (Obligatorio - Lista desplegable)
  form.addListItem()
    .setTitle('Sesión y horario preferido (obligatorio)')
    .setHelpText('Elija la fecha y horario en los que desea asistir al taller.')
    .setChoiceValues([
      'Sesión 1: Martes 24 de noviembre, de 9:00 a 13:00',
      'Sesión 2: Jueves 26 de noviembre, de 14:00 a 18:00',
      'Sesión 3: Sábado 28 de noviembre, de 9:00 a 13:00',
    ])
    .setRequired(true);

  // =========================================================================
  // SECCIÓN 3: APOYOS DE ACCESIBILIDAD Y AJUSTES RAZONABLES
  // =========================================================================
  form.addSectionHeaderItem()
    .setTitle('3. Apoyos de accesibilidad y ajustes razonables')
    .setHelpText(
      'Esta sección es opcional. Indíquenos cualquier apoyo que facilite su plena participación en el taller.'
    );

  // Campo 8: Apoyos de accesibilidad (Opcional - Casillas de verificación)
  form.addCheckboxItem()
    .setTitle('¿Requiere algún apoyo o ajuste de accesibilidad para participar? (opcional)')
    .setHelpText('Marque todas las opciones que necesite.')
    .setChoiceValues([
      'Interpretación en Lengua de Señas',
      'Subtitulado en tiempo real (presencial o virtual)',
      'Materiales previos en formato accesible (HTML, Word estructurado o texto plano)',
      'Asiento reservado en primera fila o espacio para silla de ruedas',
      'Descansos breves adicionales o zona tranquila',
    ])
    .setRequired(false);

  // Campo 9: Comentarios adicionales (Opcional - Párrafo)
  const itemComentarios = form.addParagraphTextItem();
  itemComentarios
    .setTitle('Otros comentarios, consultas o necesidades específicas de apoyo (opcional)')
    .setHelpText(
      'Indique cualquier otro ajuste razonable, consulta o tema que le gustaría abordar durante el taller (máximo 500 caracteres).'
    )
    .setRequired(false);

  const validacionComentarios = FormApp.createParagraphTextValidation()
    .setHelpText(
      'El texto supera el máximo permitido de 500 caracteres. Resuma su consulta o necesidad de apoyo antes de enviar.'
    )
    .requireTextLengthLessThanOrEqualTo(500)
    .build();
  itemComentarios.setValidation(validacionComentarios);

  // =========================================================================
  // SECCIÓN 4: CONSENTIMIENTO Y ENVÍO
  // =========================================================================
  form.addSectionHeaderItem()
    .setTitle('4. Consentimiento y envío')
    .setHelpText(
      'Revise sus respuestas y confirme la autorización de uso de datos para finalizar su inscripción.'
    );

  // Campo 10: Autorización de uso de datos (Obligatorio - Casilla única)
  form.addCheckboxItem()
    .setTitle('Autorización de uso de datos para la gestión del taller (obligatorio)')
    .setHelpText(
      'Debe marcar esta casilla para completar y enviar su inscripción.'
    )
    .setChoiceValues([
      'Confirmo que los datos proporcionados son correctos y autorizo su uso exclusivo para gestionar mi inscripción, coordinar apoyos de accesibilidad y emitir el certificado del taller.',
    ])
    .setRequired(true);

  // =========================================================================
  // CONFIRMACIÓN DE ENVÍO ACCESIBLE
  // =========================================================================
  form.setConfirmationMessage(
    '¡Su inscripción al Taller Universitario de Accesibilidad e Inclusión Digital ha sido confirmada!\n\n' +
    'Próximos pasos:\n' +
    '• Recibirá un correo electrónico con los detalles de acceso o ubicación y los materiales previos.\n' +
    '• Si solicitó algún apoyo de accesibilidad, el equipo organizador coordinará con usted antes del inicio de la sesión.\n' +
    '• Si necesita modificar sus datos, escriba a accesibilidad@universidad.edu.'
  );

  const urlPublica = form.getPublishedUrl();
  const urlEdicion = form.getEditUrl();

  Logger.log('==============================================================');
  Logger.log('¡Formulario accesible creado con éxito en su Google Drive!');
  Logger.log('Enlace público para compartir/responder: ' + urlPublica);
  Logger.log('Enlace para editar el formulario:        ' + urlEdicion);
  Logger.log('==============================================================');
}
