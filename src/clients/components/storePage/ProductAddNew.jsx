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
      className="btn btn-ms"
       style={{ background: '#38b647', color: 'white' }}
      onClick={handleClickNew}>
      Añadir Producto
    </button>
  )
}
