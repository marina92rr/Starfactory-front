import React from 'react'
import { useAuthStore } from '../../hooks/useAuthStore';


export const UserDelete = ({user}) => {


  const { startDeleteUser, startLoadingtUsers} = useAuthStore();
  
  const handleDelete = () => {
    const confirmDelete =  window.confirm(`¿Estás seguro de querer eliminar el usuario ${user.name}?`);
    if(!confirmDelete) return;
    
    startDeleteUser(user);    
  }
  
  return (
   
        <button 
          className='btn btn-danger'
          onClick={handleDelete}>
            <i className="bi bi-trash-fill"></i>
        </button>
  
  )
}
