import { useCategoryStore } from "../../../hooks/useCategoryStore";
import { useUiStore } from "../../../hooks/useUiStore"


export const CategoryAddNew = () => {

  const {openModal} = useUiStore();
  const {setActiveCategory} = useCategoryStore();


  const handleClickNew = () =>{
        setActiveCategory({
            name: '',
        })
        openModal();
    }

  return (
    <button
      className="btn btn-success mx-auto"
      onClick={handleClickNew}>
      Añadir Categoría
    </button>
  )
}
