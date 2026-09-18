function normalize(value) {
  return String(value || '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim()
    .toLowerCase();
}

function priceSimilarity(referencePrice, candidatePrice) {
  const reference = Number(referencePrice);
  const candidate = Number(candidatePrice);
  if (!(reference > 0) || !(candidate > 0)) return 0;

  const ratio = Math.abs(reference - candidate) / Math.max(reference, candidate);
  if (ratio <= 0.15) return 3;
  if (ratio <= 0.35) return 2;
  if (ratio <= 0.6) return 1;
  return 0;
}

export function getRelatedProperties(property, properties, limit = 6) {
  if (!property || !Array.isArray(properties) || limit <= 0) return [];

  const municipality = normalize(property.municipio);

  return properties
    .filter((candidate) => candidate?.id && candidate.id !== property.id)
    .map((candidate) => {
      const score =
        Number(municipality && normalize(candidate.municipio) === municipality) * 8
        + Number(candidate.type === property.type) * 6
        + Number(candidate.op === property.op) * 4
        + Number(candidate.category === property.category) * 2
        + priceSimilarity(property.rawPrice, candidate.rawPrice);

      return { candidate, score };
    })
    .sort((a, b) => b.score - a.score
      || String(a.candidate.id).localeCompare(String(b.candidate.id), 'es'))
    .slice(0, limit)
    .map(({ candidate }) => candidate);
}
