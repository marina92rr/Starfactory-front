
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';

// Bind robusto de fuentes (según el bundle puede venir en .vfs o .pdfMake.vfs)
const fonts = /** @type {any} */ (pdfFonts);
const vfs = (fonts.pdfMake && fonts.pdfMake.vfs) || fonts.vfs;
pdfMake.vfs = vfs;

// ---- doc ----
export const buildTicketDoc = (venta) => {
  const subtotal = venta.total / 1.21;
  const iva = venta.total - subtotal;

  return {
    pageSize: { width: 226.77, height: 'auto' },
    pageMargins: [10, 10, 10, 10],
    content: [
      { text: 'STAR FACTORY SEVILLA', alignment: 'center', bold: true, fontSize: 12 },
      { text: `Fecha: ${new Date(venta.fecha).toLocaleString()}`, fontSize: 8 },
      { text: `Cliente: ${venta.cliente}`, fontSize: 8 },
      { text: '-----------------------------', alignment: 'center' },
      ...venta.items.map(it => ({
        columns: [
          { text: it.name, width: '70%' },
          { text: `${Number(it.price).toFixed(2)} €`, width: '30%', alignment: 'right' }
        ]
      })),
      { text: '-----------------------------', alignment: 'center' },
      ...venta.items.map(it => ({
        columns: [
          { text: 'Descuento:' },
          { text: `${Number(it.discount || 0).toFixed(2)} €`, width: '30%', alignment: 'right' }
        ]
      })),
      { columns: [{ text: 'Subtotal:' }, { text: `${subtotal.toFixed(2)} €`, alignment: 'right' }] },
      { columns: [{ text: 'IVA 21%:' },  { text: `${iva.toFixed(2)} €`,       alignment: 'right' }] },
      { columns: [{ text: 'TOTAL:', bold: true }, { text: `${venta.total.toFixed(2)} €`, bold: true, alignment: 'right' }] },
      { text: '\n¡Gracias por su compra!', alignment: 'center', italics: true, fontSize: 9 }
    ],
    defaultStyle: { fontSize: 9 }
  };
};

// ---- imprimir ----
export const printTicket = (venta) => {
  pdfMake.createPdf(buildTicketDoc(venta)).print();
};

// ---- obtener Blob (para email/descarga) ----
export const getTicketBlob = (venta) =>
  new Promise((resolve) => {
    pdfMake.createPdf(buildTicketDoc(venta)).getBlob(resolve);
  });