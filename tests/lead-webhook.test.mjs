import test from 'node:test';
import assert from 'node:assert/strict';
import { validLeadWebhookUrl } from '../lib/leadWebhook.mjs';

test('accepts only a deployed HTTPS Google Apps Script URL', () => {
  const url = 'https://script.google.com/macros/s/AKfycb_example-123/exec';
  assert.equal(validLeadWebhookUrl(url), url);
  assert.equal(validLeadWebhookUrl(`${url}/`), `${url}/`);
});

test('rejects destinations that could turn the endpoint into a request proxy', () => {
  const invalid = [
    '',
    'http://script.google.com/macros/s/example/exec',
    'https://example.com/macros/s/example/exec',
    'https://script.google.com.example.com/macros/s/example/exec',
    'https://user:password@script.google.com/macros/s/example/exec',
    'https://script.google.com/macros/s/example/dev',
    'not-a-url',
  ];

  for (const value of invalid) assert.equal(validLeadWebhookUrl(value), null);
});
