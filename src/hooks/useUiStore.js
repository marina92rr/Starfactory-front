import { useDispatch, useSelector } from "react-redux"
import { onCloseCategoryModal, onCloseClientModal, onCloseLabelModal, onCloseProductModal, onOpenCategoryModal, onOpenClientModal, onOpenLabelModal, onOpenProductModal } from "../store/ui/uiSlice";



export const useUiStore = () => {

    const dispatch = useDispatch();
    const { 
      isModalClientOpen,
      isModalLabelOpen,
      isModalCategoryOpen,
      isModalProductOpen
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

        //Abrir LabelModal
    const openLabelModal = () =>{
        dispatch(onOpenLabelModal());
    }

    //Cerrar LabelModal
    const closeLabelModal = () =>{
        dispatch(onCloseLabelModal());
    }

    //*--------------------------------CategoryModal--------------------------------

        //Abrir LabelModal
        const openCategoryModal = () =>{
            dispatch(onOpenCategoryModal());
        }
    
        //Cerrar LabelModal
        const closeCategoryModal = () =>{
            dispatch(onCloseCategoryModal());
        }

    //*--------------------------------ProductModal--------------------------------

        //Abrir LabelModal
        const openProductModal = () =>{
            dispatch(onOpenProductModal());
        }
    
        //Cerrar LabelModal
        const closeProductModal = () =>{
            dispatch(onCloseProductModal());
        }
  


  return {
    //*Propiedades
    isModalClientOpen,
    isModalLabelOpen,
    isModalCategoryOpen,
    isModalProductOpen,

    //*Metodos
    openClientModal,
    closeClientModal,
    
    openLabelModal,
    closeLabelModal,

    openCategoryModal,
    closeCategoryModal,

    openProductModal,
    closeProductModal
    
  }
}
