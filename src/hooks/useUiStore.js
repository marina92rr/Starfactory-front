import { useDispatch, useSelector } from "react-redux"
import { onCloseModal, onOpenModal } from "../store/ui/uiSlice";



export const useUiStore = () => {

    const dispatch = useDispatch();
    const { isModalOpen} = useSelector( state => state.ui);

    //Abrir modal
    const openModal = () =>{
        dispatch(onOpenModal());
    }

    //Cerrar modal
    const closeModal = () =>{
        dispatch(onCloseModal());
    }

    //Condicion
    const toggleModal = () =>{
        (isModalOpen)
        ?openModal()
        :closeModal()
    }

  return {
    //*Propiedades
    isModalOpen,

    //*Metodos
    openModal,
    closeModal,
    toggleModal
    
  }
}
