import React from 'react'
import { StoreAddCategory } from '../components/storePage/StoreAddCategory'
import { StoreAddProduct } from '../components/storePage/StoreAddProduct'

export const StorePage = () => {
  return (
     <div className="container-fluid col-7 mt-5 pt-5">
        <h1>Tienda</h1>

        <div className='d-flex'>
             <table className='table'>
            <thead>
              <tr>
                <th className='py-3' scope='col'><StoreAddCategory/></th>
              </tr>
            </thead>
            <tbody >
              <tr >
                <ul>
                  <li>Camisetas</li>
                  <li>Polos</li>
                </ul>
              </tr>
            </tbody>
          </table>

           <table className='table'>
            <thead>
              <tr>
                <th className='py-3' scope='col'>Nombre categoría</th>
              </tr>
              <tr>
               <th><StoreAddProduct/></th>
              </tr>
              <tr>
               <th className='py-3' scope='col'>Nombre</th>
               <th className='py-3' scope='col'>Precio (€)</th>
               <th className='py-3' scope='col'>IVA (%)</th>
               <th className='py-3' scope='col'>Cantidad Actual</th>
              </tr>
            </thead>
            <tbody >
              <tr >
                <td>Camiseta antigua</td>
                <td>25</td>
                <td>4,5</td>
                <td>0</td>
              </tr>
            </tbody>
          </table>
        </div>

       
     </div>
  )
}
