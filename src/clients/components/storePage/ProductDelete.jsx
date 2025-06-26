import React from 'react'
import { useProductStore } from '../../../hooks/useProductStore';

export const ProductDelete = ({product}) => {

    const {startDeleteProduct} = useProductStore();

      const handleDelete = () => {
        startDeleteProduct(product);
  }
  
  return (
   
        <button 
          className='btn btn-danger'
          onClick={handleDelete}>
            <i className="bi bi-trash-fill"></i>
        </button>
  
  )
}
