import pdfMake from 'pdfmake/build/pdfmake.js';
import pdfFonts from 'pdfmake/build/vfs_fonts.js';
import clientsApi from '../api/clientsApi';

pdfMake.vfs = pdfFonts.vfs;

export const generateAndSendTicket = async (venta, email) => {
  const subtotal = venta.total / 1.21;
  const iva = venta.total - subtotal;

  const docDefinition = {
    pageSize: { width: 226.77, height: 'auto' },
    pageMargins: [10, 10, 10, 10],
    content: [
      { text: 'STAR FACTORY SEVILLA', alignment: 'center', style: 'header' },
      { text: `Fecha: ${new Date(venta.fecha).toLocaleString()}`, style: 'small' },
      { text: `Cliente: ${venta.cliente}`, style: 'small' },
      { text: '-----------------------------', alignment: 'center' },
      ...venta.items.map(item => ({
        columns: [
          { text: `${item.name}`, width: '70%' },
          { text: `€${(item.price - item.discount).toFixed(2)}`, width: '30%', alignment: 'right' }
        ]
      })),
      { text: '-----------------------------', alignment: 'center' },
      {
        columns: [
          { text: 'Subtotal:' },
          { text: `€${subtotal.toFixed(2)}`, alignment: 'right' }
        ]
      },
      {
        columns: [
          { text: 'IVA 21%:' },
          { text: `€${iva.toFixed(2)}`, alignment: 'right' }
        ]
      },
      {
        columns: [
          { text: 'TOTAL:', bold: true },
          { text: `€${venta.total.toFixed(2)}`, bold: true, alignment: 'right' }
        ]
      },
      { text: '\n¡Gracias por su compra!', alignment: 'center', style: 'footer' }
    ],
    styles: {
      header: { fontSize: 12, bold: true },
      small: { fontSize: 8 },
      footer: { fontSize: 9, italics: true }
    },
    defaultStyle: {
      fontSize: 9
    }
  };

  // ✅ Imprimir directamente
  pdfMake.createPdf(docDefinition).print();
/*
  // ✅ Enviar por email si se quiere
  pdfMake.createPdf(docDefinition).getBase64(async (base64) => {
    try {
      await clientsApi.post('/ticket', {
        to: email,
        fileName: 'ticket.pdf',
        pdfBase64: base64
      });
      console.log('Ticket enviado por email');
    } catch (error) {
      console.error('Error enviando el ticket por email:', error);
    }
  });*/
};