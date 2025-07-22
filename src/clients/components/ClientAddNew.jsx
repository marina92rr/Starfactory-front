import { useClientsStore } from "../../hooks/useClientsStore";
import { useUiStore } from "../../hooks/useUiStore"


export const ClientAddNew = () => {
  const { openClientModal } = useUiStore(); // Abrir modal
  const { startClearingActiveClient } = useClientsStore();
  // Abrir modal y limpiar cliente activo
    const handleClickNew = () =>{
      startClearingActiveClient();
      openClientModal();
    }


  return (
    <button
        className="btn btn-primary ms-auto"
        onClick={handleClickNew}>
        Nuevo cliente
    </button>
  )
}

