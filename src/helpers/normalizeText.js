//  Quita tildes y pone en mayúsculas
export const normalizeText = (text) =>
  text?.normalize("NFD").replace(/[\u0300-\u036f]/g, '').toUpperCase() || '';

// Normaliza TODOS los campos string del objeto
export const normalizeAllTextFields = (obj) => {
  const normalized = { ...obj };

  Object.keys(normalized).forEach((key) => {
    if (typeof normalized[key] === 'string') {
      normalized[key] = normalizeText(normalized[key]);
    }
  });

  return normalized;
};
