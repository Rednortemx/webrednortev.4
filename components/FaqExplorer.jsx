'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';

function normalizeText(value = '') {
  return value
    .toLocaleLowerCase('es-MX')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim();
}

function trackEvent(event, data = {}) {
  if (typeof window === 'undefined') return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event, ...data });
}

export default function FaqExplorer({ categories, faqs }) {
  const [query, setQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [openId, setOpenId] = useState(null);

  const categoryCounts = useMemo(() => {
    return faqs.reduce((acc, faq) => {
      acc[faq.category] = (acc[faq.category] || 0) + 1;
      return acc;
    }, {});
  }, [faqs]);

  const featuredFaqs = useMemo(() => faqs.filter((faq) => faq.featured), [faqs]);

  const filteredFaqs = useMemo(() => {
    const normalizedQuery = normalizeText(query);
    return faqs.filter((faq) => {
      const matchesCategory = activeCategory === 'all' || faq.category === activeCategory;
      if (!matchesCategory) return false;
      if (!normalizedQuery) return true;
      return normalizeText(`${faq.question} ${faq.answer}`).includes(normalizedQuery);
    });
  }, [activeCategory, faqs, query]);

  const groupedFaqs = useMemo(() => {
    return categories
      .map((category) => ({
        ...category,
        items: filteredFaqs.filter((faq) => faq.category === category.id),
      }))
      .filter((category) => category.items.length > 0);
  }, [categories, filteredFaqs]);

  useEffect(() => {
    if (typeof window === 'undefined' || !window.location.hash) return;
    const id = window.location.hash.replace('#', '');
    if (faqs.some((faq) => faq.id === id)) {
      setOpenId(id);
      window.setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 100);
    }
  }, [faqs]);

  function selectCategory(categoryId) {
    setActiveCategory(categoryId);
    setOpenId(null);
    trackEvent('faq_category_select', { faq_category: categoryId });
  }

  function toggleQuestion(faq) {
    const nextId = openId === faq.id ? null : faq.id;
    setOpenId(nextId);
    if (nextId) {
      trackEvent('faq_expand', {
        faq_id: faq.id,
        faq_category: faq.category,
        faq_question: faq.question,
      });
    }
  }

  function openFeatured(faq) {
    setQuery('');
    setActiveCategory('all');
    setOpenId(faq.id);
    trackEvent('faq_featured_click', {
      faq_id: faq.id,
      faq_category: faq.category,
    });
    window.setTimeout(() => {
      document.getElementById(faq.id)?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      window.history.replaceState(null, '', `#${faq.id}`);
    }, 50);
  }

  return (
    <section className="faq-hub-explorer" id="explorar-preguntas">
      <div className="faq-hub-shell">
        <div className="faq-hub-explorer-heading">
          <p className="section-label">EXPLORA POR TEMA</p>
          <h2>Encuentra una respuesta</h2>
          <p>
            Escribe una palabra clave o selecciona una categoría. Las preguntas están conectadas
            con las páginas de servicio para que puedas profundizar cuando lo necesites.
          </p>
        </div>

        <div className="faq-hub-popular" aria-label="Preguntas más consultadas">
          <span>Más consultadas</span>
          <div>
            {featuredFaqs.map((faq) => (
              <button key={faq.id} type="button" onClick={() => openFeatured(faq)}>
                {faq.question}
              </button>
            ))}
          </div>
        </div>

        <div className="faq-hub-toolbar">
          <label className="faq-hub-search">
            <span className="faq-hub-sr-only">Buscar en las preguntas frecuentes</span>
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="m21 21-4.35-4.35m2.35-5.65a8 8 0 1 1-16 0 8 8 0 0 1 16 0Z" />
            </svg>
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Ej. comisión, avalúo, crédito, SRE, exclusiva..."
              autoComplete="off"
            />
            {query ? (
              <button type="button" onClick={() => setQuery('')} aria-label="Limpiar búsqueda">
                ×
              </button>
            ) : null}
          </label>

          <div className="faq-hub-result-count" aria-live="polite">
            {filteredFaqs.length} {filteredFaqs.length === 1 ? 'respuesta' : 'respuestas'}
          </div>
        </div>

        <div className="faq-hub-category-chips" role="group" aria-label="Filtrar por categoría">
          <button
            type="button"
            className={activeCategory === 'all' ? 'is-active' : ''}
            onClick={() => selectCategory('all')}
          >
            Todas <span>{faqs.length}</span>
          </button>
          {categories.map((category) => (
            <button
              key={category.id}
              type="button"
              className={activeCategory === category.id ? 'is-active' : ''}
              onClick={() => selectCategory(category.id)}
            >
              {category.shortLabel} <span>{categoryCounts[category.id] || 0}</span>
            </button>
          ))}
        </div>

        {groupedFaqs.length ? (
          <div className="faq-hub-groups">
            {groupedFaqs.map((category) => (
              <section className="faq-hub-category" key={category.id} id={`categoria-${category.id}`}>
                <div className="faq-hub-category-heading">
                  <div>
                    <p className="section-label">CATEGORÍA</p>
                    <h3>{category.label}</h3>
                    <p>{category.description}</p>
                  </div>
                  <Link href={category.href}>{category.cta} →</Link>
                </div>

                <div className="faq-hub-list">
                  {category.items.map((faq, index) => {
                    const isOpen = openId === faq.id;
                    return (
                      <article className={`faq-hub-item${isOpen ? ' is-open' : ''}`} id={faq.id} key={faq.id}>
                        <button
                          type="button"
                          className="faq-hub-question"
                          id={`${faq.id}-question`}
                          aria-expanded={isOpen}
                          aria-controls={`${faq.id}-answer`}
                          onClick={() => toggleQuestion(faq)}
                        >
                          <span className="faq-hub-question-number" aria-hidden="true">
                            {String(index + 1).padStart(2, '0')}
                          </span>
                          <span>{faq.question}</span>
                          <b aria-hidden="true">{isOpen ? '−' : '+'}</b>
                        </button>
                        <div
                          className="faq-hub-answer"
                          id={`${faq.id}-answer`}
                          role="region"
                          aria-labelledby={`${faq.id}-question`}
                          hidden={!isOpen}
                        >
                          <p>{faq.answer}</p>
                          {faq.external ? (
                            <a href={faq.href} target="_blank" rel="noopener noreferrer">
                              {faq.linkLabel} →
                            </a>
                          ) : (
                            <Link href={faq.href}>{faq.linkLabel} →</Link>
                          )}
                        </div>
                      </article>
                    );
                  })}
                </div>
              </section>
            ))}
          </div>
        ) : (
          <div className="faq-hub-empty">
            <strong>No encontramos una respuesta con esos términos.</strong>
            <p>Prueba otra palabra o cuéntanos tu caso para orientarte.</p>
            <div>
              <button
                type="button"
                onClick={() => {
                  setQuery('');
                  setActiveCategory('all');
                }}
              >
                Ver todas las preguntas
              </button>
              <Link href="/contacto">Contactar a Rednorte</Link>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
