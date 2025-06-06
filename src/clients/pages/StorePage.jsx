import React, { useEffect } from 'react'
import { StoreAddProduct } from '../components/storePage/StoreAddProduct'
import { CategoryAddNew } from '../components/storePage/CategoryAddNew'
import { CategoryModal } from '../components/storePage/CategoryModal'
import { useCategoryStore } from '../../hooks/useCategoryStore'

export const StorePage = () => {

  const { starLoadingCategories, categories } = useCategoryStore();

  useEffect(() => {
    starLoadingCategories();
  }, []);

  return (

    <div className='container-fluid col-8 mt-5'>
     <div className='py-5 d-flex justify-content-between'>
        <h1>Tienda</h1>
      </div>
      
      <div className=' d-flex'>
        <div className='col-3' >

          <div className="border rounded-top p-3 bg-light">
            <CategoryAddNew />
            <CategoryModal />
          </div>

            {categories.map((category, i) => {
              return (
                <div key={i} className="border py-3 text-start">
                  <div className='d-flex'>
                    <div className='text ps-3'>{category.name} </div>
                  </div>
                </div>
              );
            })}
          </div>
        


        <div className='col-7 ms-4' >
          <div className="border rounded-top br-3 d-flex align-items-center p-3 bg-light">
            <h4>Categorias</h4>
            <button className='btn btn-success ms-5'>Añadir</button>
          </div>

          <div className="d-flex flex-column border">
              <div className='d-flex justify-content-between p-3'>
                <strong>Nombre</strong>
                <strong>Precio</strong>
                <strong>IVA</strong>
                <strong>Cantidad Actual</strong>
              </div>
            {categories.map((category, i) => {
              return (
                <div key={i} className='d-flex justify-content-between p-3'>
                <div color=''>Nombre</div>
                
              </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>

  )
}
