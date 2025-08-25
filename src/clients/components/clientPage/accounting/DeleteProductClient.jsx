
import React from 'react'
import { useProductClientStore } from '../../../../hooks/useProductClientStore';

export const DeleteProductClient = ({productClient}) => {
   const { startDeleteProductClient} = useProductClientStore();
     
  
    const handleDelete =  async() => {
      const ok = window.confirm(`¿Seguro que deseas eliminar la venta #${productClient.name}?`);
      if (!ok) return;
  
      try {
       await startDeleteProductClient(productClient); 
        window.location.reload(); // Reload the page to reflect changes
      } catch {
        alert('Hubo un problema. He recargado la lista por si se eliminó igualmente.');
      }
    };
    return (
       <button
        className='btn btn-outline-danger btn-sm'
        onClick={handleDelete}>
         <i className="bi bi-trash-fill"></i>
      </button>
    )
}
