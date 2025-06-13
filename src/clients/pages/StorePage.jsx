import React, { useEffect } from 'react'
import { CategoryAddNew } from '../components/storePage/CategoryAddNew'
import { CategoryModal } from '../components/storePage/CategoryModal'
import { useCategoryStore } from '../../hooks/useCategoryStore'
import { useProductStore } from '../../hooks/useProductStore'
import { ProductAddNew } from '../components/storePage/ProductAddNew'
import { ProductModal } from '../components/storePage/ProductModal'
import { IVAProduct } from '../../helpers/IVAProduct'

export const StorePage = () => {

  const { starLoadingCategories, categories, activeCategory, setActiveCategory } = useCategoryStore();
  const {products,activeProduct, startLoadingProductsByCategory} = useProductStore();


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

          <div className="border rounded-top p-3 bg-light text-end">
            <CategoryAddNew />
            <CategoryModal />
          </div>

            {categories.map((category, i) => {
              return (
                <div key={i} className=" text-start">
                  <div className='d-flex'>
                  <div
                    className='text p-2 w-100'
                    style={{ 
                      cursor: 'pointer', 
                      background: activeCategory?._id === category._id ? '#007bff' : 'none',
                      color: activeCategory?._id === category._id ? '#ffffff' : '#000000'

                    }}
                    onClick={() => {
                      if (activeCategory?._id === category._id) {
                        setActiveCategory(null);
                        dispatch(onLoadProduct([])); // limpiar productos
                      } else {
                        setActiveCategory(category);
                        startLoadingProductsByCategory(category._id);
                      }
                    }}
                  >
                        {category.name} 
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        
        <div className='col-9 ms-4' >
          <div className="border rounded-top br-3 d-flex align-items-center p-2 bg-light">
            <h4>Productos</h4>
            <div className='ms-auto'><ProductAddNew/><ProductModal/></div>

          </div>


          <div className="d-flex flex-column border">
              <div className='d-flex justify-content-between p-2 '>
                <strong className='col-4'>Nombre</strong>
                <strong className='col-2 text-end'>Precio</strong>
                <strong className='col-2 text-end'>IVA</strong>
                <strong className='col-1 text-end'>Stok</strong>
              </div>
              <hr />
              {products.length === 0 ? (
          <div className="p-3 text-muted col-9">No hay productos en esta categoría</div>
            ) : (
              products.map((product, i) => {
                const { base, iva, total } = IVAProduct(product.price);
              
                return (
                  <div key={i} className='d-flex justify-content-between p-3'>
                    <div className='col-4 text-primary'>{product.name.toUpperCase()}</div>
                    <div className='col-2 text-end'>{total}€</div>
                    <div className='col-2 text-end'>{iva}€</div>
                    <div className='col-1 text-end'>0</div>
                    {/* ...otros campos */}
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </div>

  )
}
