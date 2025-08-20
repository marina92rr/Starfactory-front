import { useSuscriptionClientStore } from '../../../../hooks/useSuscriptionClientStore';

export const CancellationProduct = ({ suscription }) => {

    const { startDeleteSuscription } = useSuscriptionClientStore();
  const idInc = Number(suscription?.idSuscriptionClient);

  const handleDelete = async () => {
    const ok = window.confirm(`¿Seguro que deseas eliminar la suscripción #${idInc}?`);
    if (!ok) return;

    try {
      await startDeleteSuscription(idInc);
    } catch {
      alert('Hubo un problema. He recargado la lista por si se eliminó igualmente.');
    }
  };
  return (
     <button
      className='btn btn-outline-danger btn-sm'
      onClick={handleDelete}>
      Cancelar
    </button>
  )
}
