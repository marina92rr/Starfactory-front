
import React, { useMemo } from 'react'
import pdfMake from 'pdfmake/build/pdfmake'
import pdfFonts from 'pdfmake/build/vfs_fonts'
pdfMake.vfs = pdfFonts.vfs
import { useClientsStore } from '../../../../hooks/useClientsStore';


// ⚙️ variables públicas (Vite)
const PUB_KEY   = import.meta.env.VITE_EMAILJS_PUBLIC_KEY
const SERVICEID = import.meta.env.VITE_EMAILJS_SERVICE_ID
const TEMPLATE  = import.meta.env.VITE_EMAILJS_TEMPLATE_ID

export const CreateTicket = ({ idSalesClient, products}) => {

    const {activeClient} = useClientsStore()

const handleClick = () => {
    const group = products.filter(p => p.idSalesClient === idSalesClient)       //Productos
    const total = group.reduce((a, p) => a + (p.price - (p.discount || 0)), 0)  //Total
    const date = new Date(group[0].paymentDate).toLocaleString()              //Fecha compra
    const discount =  group.reduce((a, p) => a + (p.discount || 0), 0)         //Descuento
    const subtotal = total / 1.21
    const iva = total - subtotal
    const nameClient = activeClient.name;                               //Nombre cliente
    const lastName = activeClient.lastName;                             //Apellido cliente


    const doc = {
      pageSize: { width: 226.77, height: 'auto' },
      pageMargins: [10, 10, 10, 10],
      content: [
        { text: 'STAR FACTORY SEVILLA', alignment: 'center', bold: true, fontSize: 12 },
        { text: `Fecha: ${date}`, fontSize: 8 },
        { text: `Cliente: ${nameClient} ${lastName}`, fontSize: 8 },
        
        { text: '-----------------------------', alignment: 'center' },
        ...group.map(p => ({
          columns: [
            { text: p.name, width: '70%' },
            { text: `€${(p.price - (p.discount || 0)).toFixed(2)}`, width: '30%', alignment: 'right' }
          ]
        })),
        { text: '-----------------------------', alignment: 'center' },
        { columns: [{ text:'Descuento:' }, { text:`€${discount.toFixed(2)}`, alignment:'right' }] },
        { columns: [{ text:'Subtotal:' }, { text:`€${subtotal.toFixed(2)}`, alignment:'right' }] },
        { columns: [{ text:'IVA 21%:' }, { text:`€${iva.toFixed(2)}`, alignment:'right' }] },
        { columns: [{ text:'TOTAL:', bold:true }, { text:`€${total.toFixed(2)}`, bold:true, alignment:'right' }] },
        { text: '\n¡Gracias por su compra!', alignment: 'center', italics: true, fontSize: 9 }
      ],
      defaultStyle: { fontSize: 9 }
    }

    pdfMake.createPdf(doc).open()

    
  }


    return (
        <button
            className="btn btn-outline-secondary btn-sm"
            onClick={handleClick}
            title="Generar ticket"
        >
            <i className="bi bi-receipt"></i>
        </button>
    )
}
