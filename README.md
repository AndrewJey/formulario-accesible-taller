# Caso 4. Formularios y sitios web: De la interacción a la inclusión

Formulario de inscripción accesible para el **Taller Universitario de Accesibilidad e Inclusión Digital**, implementado en dos versiones complementarias:

1. **Versión Web accesible (HTML5 semántico + CSS + JavaScript):**  
   🔗 **Enlace público en vivo:** https://andrewjey.github.io/formulario-accesible-taller/
2. **Versión en Google Forms:**  
   - Script automático de creación (Google Apps Script): [`google-forms/crear_formulario_google.gs`](./google-forms/crear_formulario_google.gs)
   - Guía paso a paso y tabla completa de especificación: [`google-forms/guia_google_forms.md`](./google-forms/guia_google_forms.md)

---

## Criterios de accesibilidad implementados (WCAG 2.2 Nivel AA)

| Criterio del Caso 4 | Implementación aplicada |
|---|---|
| **Título descriptivo** | `<title>` único y dinámico (actualiza al detectar errores o confirmar envío) y encabezado principal `<h1>` claro. |
| **Instrucciones claras** | Panel inicial con propósito, tiempo estimado, convención de campos obligatorios/opcionales, guía desplegable de teclado y textos de ayuda persistentes por campo (`aria-describedby`). |
| **Etiquetas para los campos** | Todos los controles tienen `<label for="...">` visible y asociado; los grupos de opciones usan `<fieldset>` y `<legend>`. No se usan `placeholder` como única identificación. |
| **Identificación de campos obligatorios** | Explicada antes del formulario y marcada con asterisco (`*`), texto explícito `(obligatorio)` / `(opcional)` y atributo nativo `required` (sin depender solo del color). |
| **Mensajes de error comprensibles** | Resumen de errores en la parte superior (`role="alert"`) que recibe foco automático y ofrece enlaces directos a cada campo; mensajes inline específicos que explican cómo corregir el error (`aria-invalid="true"` + `aria-describedby`). |
| **Confirmación de envío** | Panel dedicado de confirmación con número de comprobante, próximos pasos, resumen semántico (`<dl>`) de los datos enviados, opción de imprimir comprobante, gestión de foco y anuncio mediante región viva (`aria-live="polite"`). |
| **Navegación mediante teclado** | Enlace *«Saltar al contenido principal»*, orden lógico de tabulación, controles HTML nativos (navegables con `Tab`, `Shift + Tab`, flechas, `Espacio` y `Enter`), indicador de foco de alto contraste (`:focus-visible`) y cero trampas de teclado. |

---

## Estructura del proyecto

```text
formulario-accesible-taller/
├── index.html                           # Formulario web semántico y accesible
├── styles.css                           # Estilos de alto contraste, foco visible, reflujo y soporte forced-colors
├── script.js                            # Validación accesible, resumen de errores y confirmación con gestión de foco
├── README.md                            # Documentación del proyecto
└── google-forms/
    ├── crear_formulario_google.gs       # Script de Google Apps Script para crear el Google Form automáticamente
    └── guia_google_forms.md             # Guía rápida (automática y manual) con especificación de campos y errores
```

---

## Cómo probar la accesibilidad con teclado y lector de pantalla

1. Abre la web y presiona `Tab`: debe aparecer el enlace **«Saltar al contenido principal»**.
2. Navega todo el formulario usando solo `Tab`, `Shift + Tab`, flechas `↑`/`↓`, `Espacio` y `Enter`.
3. Prueba enviarlo vacío o con un correo inválido (ej. `usuario@`) para verificar el **resumen de errores con foco automático** y los enlaces directos a cada campo.
4. Completa los campos obligatorios y envía el formulario para verificar el **panel de confirmación accesible**, el foco automático y el botón para imprimir/guardar el comprobante.
