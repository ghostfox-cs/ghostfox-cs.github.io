import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const html = await readFile(new URL('../index.html', import.meta.url), 'utf8').catch(() => '');

test('document has bilingual, accessible page landmarks', () => {
  assert.match(html, /<a class="skip-link" href="#main-content">/);
  assert.match(html, /<main id="main-content">/);
  assert.match(html, /id="language-toggle"/);
  assert.match(html, /data-i18n="hero.title"/);
  assert.match(html, /id="project-list"/);
});
