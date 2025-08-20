
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
  const { productClients, startLoadingProductsByClient } = useProductClientStore();


  useEffect(() => {
    setActiveClient(activeClient);
    startLoadingProductsByClient(activeClient.idClient);
  }, [activeClient]);

 
  return (

    <div>
      <div className='pb-3'>
       <div className="border rounded-top p-3 d-flex align-items-center flex-wrap bg-light">
          <h4 className='mb-1 me-2'>
            Ventas pendientes de pago
          </h4>
          <span className="text-secondary" style={{ fontSize: '1rem' }}>
            -
          </span>
        </div>

        <table className="table border col-12">
          <thead >
            <tr >
              <th scope='col' className="p-3">Concepto</th>
              <th scope='col' className="p-3">Precio</th>
              <th scope='col' className="p-3">IVA</th>
              <th scope='col' className="p-3">Fecha</th>
              <th scope='col' className="p-3">Pago</th>
              <th scope='col' className="p-3">Método de pago</th>
              <th scope='col' className="p-3">Liquidar/ eliminar deuda</th>
            </tr>
          </thead>
          <tbody>
            {productClients.length === 0 ? (
              <tr>
                <td colSpan={5} className="text-muted">No hay productos pendientes de pago</td>
              </tr>
            ) : (
              productClients.map((products, i) => {
                const { iva, total } = IVAProduct(products.price);
                if (products.paid === false) {
                  return (

                  <tr key={i}>
                    <td className='text-primary p-3'>{capitalizeFirstWord(products.name)}</td>
                    <td className="p-3">{total}€</td>
                    <td className="p-3">{iva}€</td>
                    <td className='p-3'>{formatDate(products.buyDate)}</td>
                    <td className='p-3'>{formatDate(products.paymentDate)}</td>
                    <td className='p-3'></td>
                    <td></td>

                  </tr>
                  );
                }                
              })
            )}

          </tbody>
        </table>
      </div>

      <div>
        <div className="border rounded-top p-3 d-flex align-items-center flex-wrap bg-light ">
          <h4 className='mb-1 me-2'>
            Ventas realizadas
          </h4>
          <span className="text-secondary" style={{ fontSize: '1rem' }}>
            -
          </span>
        </div>

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
                <td colSpan={5} className="text-muted">No hay Productos en esta categoría</td>
              </tr>
            ) : (
              productClients.map((products, i) => {
                const { iva, total } = IVAProduct(products.price);
                if (products.paid === true) {
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
                }                
              })
            )}
          </tbody>
        </table>
      </div>
    </div>

  )
}
