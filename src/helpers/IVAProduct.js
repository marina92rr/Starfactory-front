// helpers/IVAProduct.js
export const IVAProduct = (precioConIVA) => {
    const tipoIVA = 0.21;
    const base = +(precioConIVA / (1 + tipoIVA)).toFixed(2);
    const iva = +(precioConIVA - base).toFixed(2);
  
    return {
      base,
      iva,
      total: precioConIVA
    };
  };