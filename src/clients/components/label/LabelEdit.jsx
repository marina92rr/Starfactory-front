import { useUiStore } from '../../../hooks/useUiStore'
import { useLabelsStore } from '../../../hooks/useLabelsStore';

export const LabelEdit= ({label}) => {

  const { openCreateLabelModal} = useUiStore();
  const {setActiveLabel} = useLabelsStore();

  const handleClickNew = () => {
    setActiveLabel(label);
    openCreateLabelModal();
  }
  return (
    <div>
        <button   
          className='btn btn-secondary mx-2'
          onClick={handleClickNew}>
          <i className="bi bi-pencil-square"></i>
        </button>
    </div>
  )
}
