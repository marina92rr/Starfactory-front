import { useDispatch, useSelector } from "react-redux"
import { onCloseClientModal, onCloseLabelModal, onOpenClientModal, onOpenLabelModal } from "../store/ui/uiSlice";



export const useUiStore = () => {

    const dispatch = useDispatch();
    const { 
      isModalClientOpen,
      isModalLabelOpen
     } = useSelector( state => state.ui);


    //*--------------------------------ClientModal--------------------------------

    //Abrir ClientModal
    const openClientModal = () =>{
        dispatch(onOpenClientModal());
    }

    //Cerrar ClientModal
    const closeClientModal = () =>{
        dispatch(onCloseClientModal());
    }

    //Condicion ClientModal
    //const toggleClientModal = () =>{  (isModalClientOpen)?openClientModal():closeClientModal()}

    //*--------------------------------LabelModal--------------------------------

        //Abrir ClientModal
    const openLabelModal = () =>{
        dispatch(onOpenLabelModal());
    }

    //Cerrar ClientModal
    const closeLabelModal = () =>{
        dispatch(onCloseLabelModal());
    }

  


  return {
    //*Propiedades
    isModalClientOpen,
    isModalLabelOpen,

    //*Metodos
    openClientModal,
    closeClientModal,
    
    openLabelModal,
    closeLabelModal
    
  }
}
