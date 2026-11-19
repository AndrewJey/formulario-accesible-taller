# Guía para crear el formulario accesible en Google Forms

Este documento acompaña al archivo [`crear_formulario_google.gs`](./crear_formulario_google.gs) y ofrece dos formas de crear el formulario de inscripción accesible en **Google Forms**: automática (en menos de 1 minuto) o manual paso a paso.

---

## Opción A (Recomendada): Creación automática en 1 minuto

El script `crear_formulario_google.gs` genera el formulario completo en tu cuenta de Google Drive, incluyendo secciones, textos de ayuda, campos obligatorios, validaciones de respuesta con mensajes de error comprensibles y mensaje de confirmación.

1. Abre [https://script.google.com](https://script.google.com) con tu cuenta de Google.
2. Haz clic en **Nuevo proyecto**.
3. Borra el código que aparece por defecto en el editor (`function myFunction() {}`).
4. Copia y pega todo el contenido de [`crear_formulario_google.gs`](./crear_formulario_google.gs).
5. Haz clic en **Guardar** (ícono de disquete o `Ctrl + S`).
6. En la barra superior, asegúrate de que esté seleccionada la función `crearFormularioAccesibleTaller` y haz clic en **Ejecutar**.
7. Cuando Google pida autorización, haz clic en **Revisar permisos** → elige tu cuenta → **Configuración avanzada** → **Ir a Proyecto sin título (no seguro)** → **Permitir** (este aviso solo aparece porque es un script propio aún no publicado en la tienda).
8. En el **Registro de ejecución** inferior aparecerán:
   - **Enlace público para compartir/responder** (listo para enviar).
   - **Enlace de edición** (para ajustar el tema visual o revisar respuestas).

### Ajustes visuales de accesibilidad recomendados tras crear el formulario

En el enlace de edición del formulario, haz clic en **Personalizar tema** (ícono de paleta):
- **Tipografía:** usa **Roboto** o **Arial** (evita fuentes cursivas o decorativas).
- **Color del tema:** elige un color oscuro de alto contraste (por ejemplo, azul marino `#0B3954`) sobre fondo claro.
- **Imagen de encabezado:** si agregas una imagen, **no incluyas texto dentro de la imagen** (Google Forms no permite añadir texto alternativo al banner del encabezado).

---

## Opción B: Creación manual en `forms.new`

Si prefieres construirlo manualmente desde [https://forms.new](https://forms.new), utiliza esta especificación exacta:

### Título y descripción

- **Título:** `Inscripción al Taller Universitario de Accesibilidad e Inclusión Digital`
- **Descripción:**
  > Organiza: Dirección de Innovación Educativa y Bienestar Universitario  
  > Modalidad: Presencial y virtual en vivo (híbrida) | Duración: 4 horas | Gratuito con certificado.
  >
  > **Instrucciones antes de comenzar:**
  > - Tiempo estimado: 3 minutos.
  > - **Campos obligatorios:** todas las preguntas marcadas con un asterisco (\*) y la etiqueta «(obligatorio)» son necesarias para completar su inscripción. Las preguntas etiquetadas como «(opcional)» pueden dejarse en blanco.
  > - **Navegación por teclado:** puede completar este formulario usando Tab, Shift + Tab, teclas de flecha, Espacio y Enter.
  > - **Privacidad:** sus datos se usarán únicamente para gestionar su inscripción, coordinar apoyos de accesibilidad y emitir su certificado.

### Especificación completa de campos, ayudas y mensajes de error

> **Importante en Google Forms:** en cada pregunta, haz clic en el menú de los tres puntos (`⋮`) y activa **Descripción** (para las instrucciones del campo) y **Validación de respuestas** (donde corresponda) para escribir mensajes de error comprensibles.

| # | Sección | Etiqueta de la pregunta | Tipo en Google Forms | Obligatorio | Instrucción / Texto de ayuda | Validación y mensaje de error comprensible |
|---|---|---|---|---|---|---|
| 1 | 1. Datos personales | Nombre completo (obligatorio) | Respuesta corta | Sí | Escriba su nombre y apellidos tal como desea que aparezcan en su certificado de participación. Ejemplo: María Elena Gómez Morales. | Expresión regular → Coincide: `^\s*\S{2,}(\s+\S+)*\s+\S{2,}\s*$`<br>**Error:** *Escriba al menos un nombre y un apellido con mínimo dos letras cada uno (por ejemplo: María Gómez).* |
| 2 | 1. Datos personales | Correo electrónico institucional o personal (obligatorio) | Respuesta corta | Sí | Enviaremos la confirmación, el enlace de acceso o ubicación y su certificado a esta dirección. Ejemplo: maria.gomez@universidad.edu. | Texto → Correo electrónico<br>**Error:** *El formato del correo electrónico no es válido. Incluya un nombre, el símbolo @ y un dominio (ejemplo: maria.gomez@universidad.edu).* |
| 3 | 1. Datos personales | Teléfono de contacto (opcional) | Respuesta corta | No | Opcional. Solo se utilizará para avisos urgentes sobre cambios de horario o aula. Si lo incluye, ingrese entre 8 y 15 dígitos (puede usar prefijo +, espacios o guiones). | Expresión regular → Coincide: `^[+0-9()\s-]{8,20}$`<br>**Error:** *El número de teléfono debe tener entre 8 y 20 caracteres válidos (números, espacios, guiones, paréntesis o el signo +). Ejemplo: +506 8888-8888.* |
| 4 | 2. Perfil académico | Perfil universitario (obligatorio) | Varias opciones | Sí | Seleccione la opción que mejor describa su vínculo actual con la universidad. | Opciones: Estudiante de grado o licenciatura; Estudiante de posgrado; Docente o investigador(a); Personal administrativo o de apoyo; Persona invitada externa. |
| 5 | 2. Perfil académico | Facultad, escuela o unidad académica (obligatorio) | Desplegable | Sí | Seleccione en la lista desplegable la facultad o unidad a la que pertenece. | Opciones: Ingeniería y Tecnología; Ciencias de la Educación; Ciencias Sociales y Humanidades; Ciencias de la Salud; Ciencias Económicas y Empresariales; Artes, Diseño y Comunicación; Administración Central y Bienestar Universitario; Otra unidad o institución externa. |
| 6 | 2. Perfil académico | Modalidad de asistencia preferida (obligatorio) | Varias opciones | Sí | Ambas modalidades incluyen las mismas prácticas, materiales accesibles y certificado de participación. | Opciones: Presencial (Auditorio Central, acceso sin escalones y ascensor); Virtual en vivo (plataforma con subtítulos en tiempo real y transcripción). |
| 7 | 2. Perfil académico | Sesión y horario preferido (obligatorio) | Desplegable | Sí | Elija la fecha y horario en los que desea asistir al taller. | Opciones: Sesión 1 (Martes 24 nov, 9:00–13:00); Sesión 2 (Jueves 26 nov, 14:00–18:00); Sesión 3 (Sábado 28 nov, 9:00–13:00). |
| 8 | 3. Apoyos de accesibilidad | ¿Requiere algún apoyo o ajuste de accesibilidad para participar? (opcional) | Casillas | No | Marque todas las opciones que necesite. | Opciones: Interpretación en Lengua de Señas; Subtitulado en tiempo real; Materiales previos en formato accesible; Asiento reservado en primera fila o espacio para silla de ruedas; Descansos breves adicionales o zona tranquila. |
| 9 | 3. Apoyos de accesibilidad | Otros comentarios, consultas o necesidades específicas de apoyo (opcional) | Párrafo | No | Indique cualquier otro ajuste razonable, consulta o tema que le gustaría abordar durante el taller (máximo 500 caracteres). | Longitud → Número máximo de caracteres: `500`<br>**Error:** *El texto supera el máximo permitido de 500 caracteres. Resuma su consulta o necesidad de apoyo antes de enviar.* |
| 10 | 4. Consentimiento y envío | Autorización de uso de datos para la gestión del taller (obligatorio) | Casillas | Sí | Debe marcar esta casilla para completar y enviar su inscripción. | Opción única: *Confirmo que los datos proporcionados son correctos y autorizo su uso exclusivo para gestionar mi inscripción, coordinar apoyos de accesibilidad y emitir el certificado del taller.* |

### Mensaje de confirmación de envío

Ve a la pestaña **Configuración** → **Presentación** → **Mensaje de confirmación** → **Editar**, y escribe:

> ¡Su inscripción al Taller Universitario de Accesibilidad e Inclusión Digital ha sido confirmada!
>
> Próximos pasos:
> - Recibirá un correo electrónico con los detalles de acceso o ubicación y los materiales previos.
> - Si solicitó algún apoyo de accesibilidad, el equipo organizador coordinará con usted antes del inicio de la sesión.
> - Si necesita modificar sus datos, escriba a accesibilidad@universidad.edu.

---

## Lista de verificación de accesibilidad (Caso 4)

- [x] **Título descriptivo:** indica claramente el propósito del formulario y el nombre del taller.
- [x] **Instrucciones claras:** al inicio del formulario y en cada campo mediante descripciones persistentes (sin depender de marcadores de posición).
- [x] **Etiquetas para los campos:** cada campo tiene su pregunta/etiqueta visible y asociada.
- [x] **Identificación de campos obligatorios:** explicada en las instrucciones y marcada con asterisco (`*`) y texto explícito `(obligatorio)` / `(opcional)` para no depender solo del color.
- [x] **Mensajes de error comprensibles:** validaciones activas con mensajes específicos que explican qué corregir y dan un ejemplo.
- [x] **Confirmación de envío:** mensaje claro con próximos pasos tras enviar el formulario.
- [x] **Uso mediante teclado:** controles nativos navegables con `Tab`, `Shift + Tab`, flechas, `Espacio` y `Enter`.
