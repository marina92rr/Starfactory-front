import { useClientsStore } from "../../hooks/useClientsStore";
import { useUiStore } from "../../hooks/useUiStore"


export const LabelAddNew = () => {

    const {openModal} = useUiStore();   //Abrir modal
    const {setActiveClient} = useClientsStore();

    const handleClickNew = () =>{
        setActiveClient({
            nameLabel: '',
            Description:'',
            color: '',
      
        })
        openModal();
    }

  return (
    <button
        className="btn btn-primary mx-auto"
        onClick={handleClickNew}>
        Etiqueta
    </button>
  )
}
