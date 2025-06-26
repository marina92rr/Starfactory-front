import React from 'react'
import { useCategoryStore } from '../../../hooks/useCategoryStore';

export const CategoryDelete = () => {

    const {startDeleteCategory, activeCategory} = useCategoryStore();

      const handleDelete = () => {
        startDeleteCategory(activeCategory);
  }
  
  return (
   
        <button 
          className='btn btn-danger'
          onClick={handleDelete}>
            Eliminar
        </button>
  
  )
}
