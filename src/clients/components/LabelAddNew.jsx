import { useClientsStore } from "../../hooks/useClientsStore";
import { useLabelsStore } from "../../hooks/useLabelsStore";
import { useUiStore } from "../../hooks/useUiStore"


export const LabelAddNew = () => {

    const {openModal} = useUiStore();   //Abrir modal
    const {setActiveLabel} = useLabelsStore();

    const handleClickNew = () =>{
        setActiveLabel({
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
        Etiquetas
    </button>
  )
}
