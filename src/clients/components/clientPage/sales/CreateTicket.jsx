// src/pages/sales/CreateTicket.jsx (ajusta la ruta real)
import React from 'react';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.vfs; // (si tu build usa pdfMake.vfs, deja así)

import { useClientsStore } from '../../../../hooks/useClientsStore';
import { getGmailAccessToken, sendPdfWithToken } from '../../../../helpers/gmailSendPdf';
import { getTicketBlob, printTicket } from '../../../../helpers/ticketPDF';
import { capitalizeFirstWord } from '../../../../helpers/capitalizeFirstWord';



export const CreateTicket = ({ venta }) => {
  const { activeClient } = useClientsStore();

  const handleSendEmail = async () => {
    const token = await getGmailAccessToken();
    const blob = await getTicketBlob(venta);
    await sendPdfWithToken(token, blob, activeClient.email);
    alert('Enviado por email ✅');
  };

  const handlePrint = () => {
    printTicket(venta);
  };

  const handleWhatsapp = async () => {
    // 1) Generar el PDF
    const blob = await getTicketBlob(venta);



    // 3) Abrir WhatsApp con el ticket formateado
    const to2 = (n) => Number(n).toFixed(2);
    const fecha = new Date(venta.fecha).toLocaleString();
      const discount = venta.items.reduce((s, i) => s + Number(i.discount || 0), 0);

    const subtotal = venta.total / 1.21;
    const iva = venta.total - subtotal;

    const ticketMsg = [
      '```',
      `Hola ${capitalizeFirstWord(activeClient.name)}, te envío tu ticket`,
      '',
      'STAR FACTORY SEVILLA',
      '___________________________________',
      `Fecha:   ${fecha}`,
      `Cliente: ${activeClient.name} ${activeClient.lastName}`,
      '------------------------------------',
      ...venta.items.map(i => {
        const name = String(i.name).slice(0, 18).padEnd(18, ' ');
        const price = `${to2(i.price)} €`.padStart(10, ' ');
        return `${name}${price}`;
      }),
      '------------------------------------',
      `Descuento: ${to2(discount)} €`,
      `Subtotal: ${to2(subtotal)} €`,
      `IVA 21%:  ${to2(iva)} €`,
      `TOTAL:    ${to2(venta.total)} €`,
      '',
      '¡Gracias por su compra!',
      '```'
    ].join('\n');

    const phone = activeClient.whatsappPhone; //tel cliente
    // 3) Abrir WhatsApp con web
   //window.open(`https://wa.me/${phone}?text=${encodeURIComponent(ticketMsg)}`, '_blank');

    // 3) Abrir Whatsapp con app
  window.location.href = `whatsapp://send?phone=${phone}&text=${encodeURIComponent(ticketMsg)}`;
  };

  
  return (

    <>
      <div className="btn-group">
        <button
          type="button"
          className="btn btn-outline-secondary btn-sm rounded py-0 px-1 fs-4 lh-1"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          ...
        </button>

        <ul className="dropdown-menu dropdown-menu-end">
          <li><button className="dropdown-item" onClick={handlePrint}>Imprimir</button></li>
          {/*
            <li><button className="dropdown-item" onClick={handleSendEmail}>Enviar email</button></li>
          */}
        
          <li><button className="dropdown-item" onClick={handleWhatsapp}>Enviar WhatsApp</button></li>
        </ul>
      </div>

    </>

  );
};
