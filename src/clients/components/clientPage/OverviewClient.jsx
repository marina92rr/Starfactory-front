
import React from 'react'

export const OverviewClient = () => {
  return (
    <>
       
              
          <h3 className="border rounded-top br-3 d-flex align-items-center p-3 bg-light m-0">Autocompras</h3>
          <table className='table'>
            <thead>
              <tr>
                <th className='py-3' scope='col'>Concepto</th>
                <th className='py-3' scope='col'>Fecha (Próxima compra)</th>
                <th className='py-3' scope='col'>Total</th>
                <th className='py-3' scope='col'>Método Pago</th>
                <th className='py-3' scope='col'>Caducidad</th>
              </tr>
            </thead>
            <tbody >
              <tr >
                <td className='py-3'>1 Sesión/semana (Media hora)</td>
                <td className='py-3'>30/04/2025</td>
                <td className='py-3'>25€</td>
                <td className='py-3'>Tarjeta</td>
                <td className='py-3'>Siempre</td>
              </tr>
            </tbody>
          </table>
        
    </>
  )
}
