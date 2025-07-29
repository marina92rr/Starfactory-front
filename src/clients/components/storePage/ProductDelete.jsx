import React from 'react'
import { useProductStore } from '../../../hooks/useProductStore';
import { useCategoryStore } from '../../../hooks/useCategoryStore';

export const ProductDelete = ({product}) => {

    const {startDeleteProduct, startLoadingProductsByCategory } = useProductStore();
    const {activeCategory} = useCategoryStore();

      const handleDelete = () => {
        startDeleteProduct(product);
        startLoadingProductsByCategory(activeCategory._id);    
        window.confirm(`¿Estás seguro de querer eliminar el producto ${product.name}?`);
       
  }
  
  return (
   
        <button 
          className='btn btn-danger'
          onClick={handleDelete}>
            <i className="bi bi-trash-fill"></i>
        </button>
  
  )
}
