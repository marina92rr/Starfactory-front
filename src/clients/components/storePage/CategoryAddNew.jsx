import { useCategoryStore } from "../../../hooks/useCategoryStore";
import { useUiStore } from "../../../hooks/useUiStore"


export const CategoryAddNew = () => {

  const {openCategoryModal} = useUiStore();
  const {setActiveCategory} = useCategoryStore();


  const handleClickNew = () =>{
        setActiveCategory({
            name: '',
        })
        openCategoryModal();
    }

  return (
    <button
      className="btn btn-success mx-auto"
      onClick={handleClickNew}>
      Añadir Categoría
    </button>
  )
}
