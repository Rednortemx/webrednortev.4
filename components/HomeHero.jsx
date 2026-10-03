'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import HeroSearch from '@/components/HeroSearch';

export default function HomeHero({ metrics }) {
  const heroRef = useRef(null);

  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return undefined;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let frame = 0;

    const update = () => {
      frame = 0;
      const rect = hero.getBoundingClientRect();
      const distance = Math.max(hero.offsetHeight - window.innerHeight, 1);
      const progress = reduceMotion.matches
        ? 1
        : Math.min(1, Math.max(0, -rect.top / distance));

      const reveal = Math.min(1, Math.max(0, (progress - 0.42) / 0.38));

      hero.style.cssText = [
        `--hero-progress:${progress.toFixed(4)}`,
        `--hero-panel-shift:${(-104 * progress).toFixed(2)}%`,
        `--hero-image-inset:${(42 * (1 - progress)).toFixed(2)}%`,
        `--hero-image-scale:${(1.08 - (0.08 * progress)).toFixed(4)}`,
        `--hero-opening-opacity:${Math.max(0, 1 - (progress * 2.6)).toFixed(4)}`,
        `--hero-content-opacity:${reveal.toFixed(4)}`,
        `--hero-content-shift:${(48 * (1 - reveal)).toFixed(2)}px`,
      ].join(';');
      hero.classList.add('is-enhanced');
    };

    const requestUpdate = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', requestUpdate, { passive: true });
    window.addEventListener('resize', requestUpdate);
    reduceMotion.addEventListener?.('change', requestUpdate);

    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener('scroll', requestUpdate);
      window.removeEventListener('resize', requestUpdate);
      reduceMotion.removeEventListener?.('change', requestUpdate);
    };
  }, []);

  return (
    <section ref={heroRef} className="hero home-hero" aria-labelledby="home-hero-title">
      <div className="home-hero-sticky">
        <div className="home-hero-visual" aria-hidden="true">
          <Image
            src="/images/rednorte-monterrey-living.webp"
            alt=""
            fill
            priority
            sizes="100vw"
            className="home-hero-image"
          />
          <div className="home-hero-shade" />
        </div>

        <div className="home-hero-opening" aria-hidden="true">
          <div className="home-hero-opening-top">
            <span>Rednorte</span>
            <span>Inmobiliaria</span>
          </div>
          <p className="home-hero-statement">
            <span>Rednorte</span>
            <span>conoce</span>
            <span>Monterrey</span>
          </p>
          <div className="home-hero-opening-bottom">
            <span>Residencial</span>
            <span>Comercial</span>
            <span>Industrial</span>
          </div>
        </div>

        <div className="home-hero-content">
          <div className="home-hero-copy">
            <div className="hero-badge">Especialistas inmobiliarios en Monterrey</div>
            <h1 id="home-hero-title">Compra, vende, renta e invierte en Monterrey</h1>
            <p className="hero-highlight">Residencial, comercial e industrial en Nuevo León.</p>
            <p>Rednorte Inmobiliaria combina asesoría, datos y marketing para ayudarte a tomar mejores decisiones inmobiliarias.</p>
            <div className="hero-stats" aria-label="Datos de Rednorte">
              <div className="hero-stat">
                <div className="hero-stat-num">{metrics.activeProperties}</div>
                <div className="hero-stat-label">Propiedades activas</div>
              </div>
              <div className="hero-stat">
                <div className="hero-stat-num">{metrics.teamMembers}</div>
                <div className="hero-stat-label">Integrantes en el equipo</div>
              </div>
              <div className="hero-stat">
                <div className="hero-stat-num">Desde {metrics.since}</div>
                <div className="hero-stat-label">Operando en Nuevo León</div>
              </div>
            </div>
          </div>
          <HeroSearch />
        </div>

        <div className="home-hero-scroll" aria-hidden="true">
          <span>Descubre</span>
          <i />
        </div>
      </div>
    </section>
  );
}
