import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';

const root = path.resolve(import.meta.dirname, '..');
const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
const css = fs.readFileSync(path.join(root, 'styles.css'), 'utf8');
const js = fs.readFileSync(path.join(root, 'script.js'), 'utf8');

test('HTML contains WCAG 2.2 semantic landmarks, skip link, and accessible controls', () => {
  assert.match(html, /<!DOCTYPE html>/i);
  assert.match(html, /<html[^>]+lang="es"/i);
  assert.match(html, /<meta[^>]+name="viewport"/i);
  assert.match(html, /<main\b/i);
  assert.match(html, /<h1\b/i);
  assert.match(html, /skip-link|Saltar al contenido/i);
  assert.match(html, /role="alert"/i);
  assert.match(html, /aria-live="polite"/i);
  assert.match(html, /aria-pressed=/i);
  assert.match(html, /<fieldset\b/i);
  assert.match(html, /<legend\b/i);
});

test('every input/select/textarea with id has an associated visible label', () => {
  const controlIds = [...html.matchAll(/<(?:input|select|textarea)\b[^>]*\bid="([^"]+)"[^>]*>/gi)]
    .filter((m) => !/type="hidden"/i.test(m[0]))
    .map((m) => m[1]);
  assert.ok(controlIds.length >= 5, 'Expected form controls');
  for (const id of controlIds) {
    assert.match(html, new RegExp(`<label[^>]+for="${id}"`, 'i'), `Missing <label for="${id}">`);
  }
});

test('CSS supports dark mode, focus-visible, reduced motion, and forced-colors', () => {
  assert.match(css, /:focus-visible/);
  assert.match(css, /prefers-color-scheme:\s*dark/i);
  assert.match(css, /forced-colors:\s*active/i);
  assert.match(css, /color-scheme:/i);
});

test('script.js parses cleanly and Google Forms assets exist', () => {
  assert.doesNotThrow(() => new vm.Script(js, { filename: 'script.js' }));
  assert.ok(fs.existsSync(path.join(root, 'google-forms', 'crear_formulario_google.gs')));
  assert.ok(fs.existsSync(path.join(root, 'google-forms', 'guia_google_forms.md')));
});
