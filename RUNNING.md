# Desarrollo local — Formulario Accesible de Inscripción al Taller

Aplicación estática (HTML5 + CSS + JavaScript nativo) sin dependencias de compilación ni backend, acompañada de un script de Google Apps Script (`google-forms/crear_formulario_google.gs`).

## Cómo abrir y probar localmente

1. Abre [`index.html`](index.html) directamente en Microsoft Edge, Chrome o Firefox.
2. O levanta un servidor local estático:
   ```powershell
   python -m http.server 8000 --bind 127.0.0.1
   ```
   y abre `http://127.0.0.1:8000`.
3. Sitio público en GitHub Pages: https://andrewjey.github.io/formulario-accesible-taller/

## Verificación automatizada (2026-11-19)

Con Node 22+:
```powershell
node --test tests/form.test.mjs
```

Las pruebas verifican estructura semántica WCAG 2.2 (enlace de salto, `h1`, `<main>`, etiquetas asociadas a cada control, región `role="alert"` de resumen de errores, `aria-live="polite"`, alternancia accesible de tema claro/oscuro con `aria-pressed` y persistencia sin FOUC, además de sintaxis válida de `script.js` y presencia del script de Google Forms).

<!-- improvements-20261119:start -->
## Mejoras y verificación funcional (2026-11-19)

- **Mejoras aplicadas:** Incorporación de documentación operativa (`RUNNING.md`), `.gitignore` y suite automatizada de verificación de accesibilidad WCAG 2.2 y sintaxis (`tests/form.test.mjs`).
- **Pruebas ejecutadas:** `node --test tests/form.test.mjs` (4/4 pruebas aprobadas: landmarks WCAG 2.2, etiquetas por control, modo oscuro/contraste y validación de scripts).
<!-- improvements-20261119:end -->
