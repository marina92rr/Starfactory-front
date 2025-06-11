
import { useLabelsStore } from "../../hooks/useLabelsStore";
import { useUiStore } from "../../hooks/useUiStore"


export const LabelAddNew = () => {
    const {openLabelModal} = useUiStore();   //Abrir modal
    const {setActiveLabel} = useLabelsStore();

    const handleClickNew = () =>{
        setActiveLabel({
            nameLabel: '',
            Description:'',
            color: '',
        })
        openLabelModal();
    }

  return (
    <button
        className="btn btn-outline-dark btn-sm py-0"
        style={{ borderRadius: '25px', fontSize: '1rem' }}
        onClick={handleClickNew}>
        <i className="bi bi-pencil-square me-2"></i>
        Etiquetas
    </button>
  )
}
