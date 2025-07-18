import { useUiStore } from "../../../hooks/useUiStore";




export const FilterClientsByLabel = () => {

    const {openFilterClientByLabelModal} = useUiStore();
   

    const handleClickNew = () => {



       openFilterClientByLabelModal(); 
    }

  return (
    <button 
        className='btn btn-outline-secondary'
        onClick={handleClickNew}>
        <i className="bi bi-pencil-square me-2"></i>
        Filtrar por Etiqueta
    </button>
    
  )
}
