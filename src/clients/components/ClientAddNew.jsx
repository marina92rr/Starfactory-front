import { useDispatch } from "react-redux";
import { useClientsStore } from "../../hooks/useClientsStore";
import { useUiStore } from "../../hooks/useUiStore"


export const ClientAddNew = () => {
  const dispatch = useDispatch();
  const { openClientModal } = useUiStore(); // Abrir modal
  const { startClearingActiveClient } = useClientsStore();
  // Abrir modal y limpiar cliente activo
    const handleClickNew = () =>{
      startClearingActiveClient();
      openClientModal();
    }


  return (
    <button
        className="btn btn-primary mx-auto"
        onClick={handleClickNew}>
        Nuevo cliente
    </button>
  )
}

