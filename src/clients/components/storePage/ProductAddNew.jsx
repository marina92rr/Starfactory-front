import { useProductStore } from "../../../hooks/useProductStore";
import { useUiStore } from "../../../hooks/useUiStore"


export const ProductAddNew = () => {

  const {openProductModal} = useUiStore();
  const {setActiveProduct} = useProductStore();


  const handleClickNew = () =>{
        setActiveProduct({
            name: '',
        })
        openProductModal();
    }

  return (
    <button
      className="btn btn-success btn-ms"
      onClick={handleClickNew}>
      Añadir Producto
    </button>
  )
}
