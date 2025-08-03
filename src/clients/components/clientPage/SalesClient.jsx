
import React, { useEffect } from 'react'
import { generateAndSendTicket } from '../../../hooks/ticketGenerator'
import { useClientsStore } from '../../../hooks/useClientsStore';
import { useDispatch } from 'react-redux';
import { useProductClientStore } from '../../../hooks/useProductClientStore';
import { IVAProduct } from '../../../helpers/IVAProduct';
import { capitalizeFirstWord } from '../../../helpers/capitalizeFirstWord';
import { formatDate } from '../../../helpers/formatDate';



export const SalesClient = () => {


  const { activeClient, setActiveClient } = useClientsStore();
  const {productClients, startLoadingProductsByClient} = useProductClientStore();

  useEffect(() => {
    setActiveClient(activeClient);
    startLoadingProductsByClient(activeClient.idClient);
  }, [activeClient]);

  //const handleClick = async () => {
  //  const venta = {
  //    fecha: new Date(),
  //    cliente: 'Jesús',
  //    items: [
  //      { nombre: 'Clase Salsa', cantidad: 1, precio: 25 },
  //      { nombre: 'Clase Bachata', cantidad: 1, precio: 25 }
  //    ],
  //    total: 50
  //  };
//
//
  //  try {
  //    generateAndSendTicket(venta, activeClient.email);
  //    console.log('Ticket impreso y enviado por email');
  //  } catch (error) {
  //    console.error('Error en el proceso de ticket:', error);
  //  }
//
  //};


  return (

    <div>
      
      <div>
      <h4 className="border rounded-top br-3 d-flex align-items-center p-3 bg-light m-0">Ventas pagadas</h4>

      <table className="table border col-12">
            <thead >
              <tr >
                <th scope='col' className="p-3">Concepto</th>
                <th scope='col' className="p-3">Precio</th>
                <th scope='col' className="p-3">IVA</th>
                <th scope='col' className="p-3">Fecha</th>
                <th scope='col' className="p-3">Pago</th>
                <th scope='col' className="p-3">Método de pago</th>

              </tr>
            </thead>
            <tbody>
              {productClients.length === 0 ? (
                <tr>
                  <td colSpan={5} className="text-muted text-center">No hay Productos en esta categoría</td>
                </tr>
              ) : (
                productClients.map((products, i) => {
                  const { iva, total } = IVAProduct(products.price);
                  return (
                    <tr key={i}>
                      <td className='text-primary p-3'>{capitalizeFirstWord(products.name)}</td>
                      <td className="p-3">{total}€</td>
                      <td className="p-3">{iva}€</td>
                      <td className='p-3'>{formatDate(products.buyDate)}</td>
                      <td className='p-3'>{formatDate(products.paymentDate)}</td>
                      <td className='p-3'>{capitalizeFirstWord(products.paymentMethod)}</td>
                     

                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
      </div>
    </div>

  )
}
