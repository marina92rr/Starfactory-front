import React, { useEffect } from 'react'
import { generateAndSendTicket } from '../../../hooks/ticketGenerator'
import { useClientsStore } from '../../../hooks/useClientsStore'
import { useProductClientStore } from '../../../hooks/useProductClientStore'
import { IVAProduct } from '../../../helpers/IVAProduct'
import { capitalizeFirstWord } from '../../../helpers/capitalizeFirstWord'
import { formatDate } from '../../../helpers/formatDate'
import { DeleteProductClientUnpaid } from './sales/DeleteProductClientUnpaid'
import { LiquidateProductClient } from './sales/LiquidateProductClient'
import { LiquidateProductClientModal } from './sales/LiquidateProductClientModal'

export const SalesClient = () => {
  const { activeClient, setActiveClient } = useClientsStore()
  const {
    productsClientPaid,
    productsClientUnpaid,
    startLoadingProductsClientPaid,
    startLoadingProductsClientUnpaid,
  } = useProductClientStore()

  useEffect(() => {
    setActiveClient(activeClient)
    if (activeClient?.idClient) {
      startLoadingProductsClientPaid(activeClient.idClient)
      startLoadingProductsClientUnpaid(activeClient.idClient)
    }
  }, [activeClient])

  return (
    <div>
      {/* Pendientes */}
      <div className='pb-3'>
        <div className="border rounded-top p-3 d-flex align-items-center flex-wrap bg-light">
          <h4 className='mb-1 me-2'>Ventas pendientes de pago</h4>
          <span className="text-secondary" style={{ fontSize: '1rem' }}>
            {productsClientUnpaid.length}
          </span>
        </div>

        <table className="table border col-12">
          <thead>
            <tr>
              <th className="p-3">Concepto</th>
              <th className="p-3">Precio</th>
              <th className="p-3">IVA</th>
              <th className="p-3">Fecha</th>
              <th className="p-3">Deuda</th>
            </tr>
          </thead>
          <tbody>
            {productsClientUnpaid.length === 0 ? (
              <tr><td colSpan={5} className="text-muted">No hay productos pendientes de pago</td></tr>
            ) : (
              productsClientUnpaid.map((unpaid, i) => {
                const { iva, total } = IVAProduct(unpaid.price)
                return (
                  <tr key={i}>
                    <td className='text-primary p-3'>{capitalizeFirstWord(unpaid.name)}</td>
                    <td className="p-3">{total}€</td>
                    <td className="p-3">{iva}€</td>
                    <td className='p-3'>{formatDate(unpaid.buyDate)}</td>
                    <td className='p-3'>
                      <div className='d-flex align-items-center'>
                        <LiquidateProductClient unpaid={unpaid} />
                        <LiquidateProductClientModal unpaid={unpaid}/>
                        <DeleteProductClientUnpaid unpaid = {unpaid}/>
                      </div>
                      
                    </td>
                  </tr>
                )
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Realizadas */}
      <div>
        <div className="border rounded-top p-3 d-flex align-items-center flex-wrap bg-light">
          <h4 className='mb-1 me-2'>Ventas realizadas</h4>
          <span className="text-secondary" style={{ fontSize: '1rem' }}>
            {productsClientPaid.length}
          </span>
        </div>

        <table className="table border col-12">
          <thead>
            <tr>
              <th className="p-3">Concepto</th>
              <th className="p-3">Precio</th>
              <th className="p-3">IVA</th>
              <th className="p-3">Fecha</th>
              <th className="p-3">Pago</th>
              <th className="p-3">Método de pago</th>
            </tr>
          </thead>
          <tbody>
            {productsClientPaid.length === 0 ? (
              <tr><td colSpan={6} className="text-muted">No hay Productos en esta categoría</td></tr>
            ) : (
              productsClientPaid.map((p, i) => {
                const { iva, total } = IVAProduct(p.price)
                return (
                  <tr key={i}>
                    <td className='text-primary p-3'>{capitalizeFirstWord(p.name)}</td>
                    <td className="p-3">{total}€</td>
                    <td className="p-3">{iva}€</td>
                    <td className='p-3'>{formatDate(p.buyDate)}</td>
                    <td className='p-3'>{formatDate(p.paymentDate)}</td>
                    <td className='p-3'>{capitalizeFirstWord(p.paymentMethod)}</td>
                  </tr>
                )
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}