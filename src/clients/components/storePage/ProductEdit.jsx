import React from 'react'
import { useUiStore } from '../../../hooks/useUiStore'
import { useProductStore } from '../../../hooks/useProductStore';

export const ProductEdit= () => {

  const {openProductModal} = useUiStore();
  const {setActiveProduct, activeProduct} = useProductStore();

  const handleClickNew = () => {
    setActiveProduct(activeProduct);
    openProductModal();
  }
  return (
    <div>
        <button   
          className='btn btn-secondary mx-2'
          onClick={handleClickNew}>
          <i className="bi bi-pencil-square"></i>
        </button>
    </div>
  )
}
