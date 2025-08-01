import React from 'react'
import { useCategoryStore } from '../../../hooks/useCategoryStore';

export const CategoryDelete = () => {

    const {startDeleteCategory, activeCategory} = useCategoryStore();

      const handleDelete = () => {
        const confirmDelete = window.confirm(`¿Estás seguro de querer eliminar La categoría ${activeCategory.name}?`);
        if(!confirmDelete) return;
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
