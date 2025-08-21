import { useDispatch } from 'react-redux';
import { useSuscriptionClientStore } from '../../../../hooks/useSuscriptionClientStore';

export const DeleteSuscriptionClient = ({suscription}) => {

    const { startDeleteSuscriptionClient } = useSuscriptionClientStore();
   

  const handleDelete =  () => {
    const ok = window.confirm(`¿Seguro que deseas eliminar la suscripción #${suscription.name}?`);
    if (!ok) return;

    try {
      startDeleteSuscriptionClient(suscription); 
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
