import assert from 'node:assert/strict';
import test from 'node:test';

import {
  authors,
  getPublishedInsights,
  insights,
} from '../lib/insights.js';

test('publica seis Insights completos y relacionados de forma consistente', () => {
  const published = getPublishedInsights();
  const publishedSlugs = new Set(published.map((insight) => insight.slug));

  assert.equal(published.length, 6);
  assert.equal(publishedSlugs.size, published.length);

  for (const insight of published) {
    assert.ok(insight.title);
    assert.ok(insight.description);
    assert.ok(authors[insight.author]);
    assert.ok(insight.sections.length >= 10);
    assert.ok(insight.faqs.length >= 5);
    assert.ok(insight.sources.length >= 3);
    assert.match(insight.publishedAt, /^\d{4}-\d{2}-\d{2}$/);
    assert.match(insight.updatedAt, /^\d{4}-\d{2}-\d{2}$/);

    for (const relatedSlug of insight.related || []) {
      assert.ok(publishedSlugs.has(relatedSlug));
      assert.notEqual(relatedSlug, insight.slug);
    }

    for (const source of insight.sources) {
      if (source.url) assert.match(source.url, /^https:\/\//);
    }
  }
});

test('no conserva borradores dentro del catálogo público', () => {
  assert.deepEqual(insights, getPublishedInsights());
});
