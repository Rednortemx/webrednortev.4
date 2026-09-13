'use client';

import usePrivacyConsent from './usePrivacyConsent';

export default function ExternalContentGate({ children, provider, description, externalHref, externalLabel }) {
  const { optional, allowOptional } = usePrivacyConsent();

  if (optional) return children;

  return (
    <div className="external-content-placeholder" role="region" aria-label={`Contenido externo de ${provider}`}>
      <strong>Contenido externo bloqueado</strong>
      <p>{description}</p>
      <div className="external-content-actions">
        <button type="button" onClick={allowOptional}>Permitir y cargar</button>
        {externalHref && (
          <a href={externalHref} target="_blank" rel="noopener noreferrer">{externalLabel}</a>
        )}
      </div>
    </div>
  );
}
