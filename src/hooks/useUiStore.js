import { useDispatch, useSelector } from "react-redux"
import { onCloseCategoryModal, onCloseClientModal, onCloseLabelModal, onCloseProductModal, onCloseQuotaModal, onCloseRateModal, onOpenCategoryModal, onOpenClientModal, onOpenLabelModal, onOpenProductModal, onOpenQuotaModal, onOpenRateModal } from "../store/ui/uiSlice";



export const useUiStore = () => {

    const dispatch = useDispatch();
    const { 
      isModalClientOpen,
      isModalLabelOpen,
      isModalCategoryOpen,
      isModalProductOpen,
      isModalRateOpen,
      isModalQuotaOpen
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
    //*--------------------------------RateModal--------------------------------

        //Abrir LabelModal
        const openRateModal = () =>{
            dispatch(onOpenRateModal());
        }
    
        //Cerrar LabelModal
        const closeRateModal = () =>{
            dispatch(onCloseRateModal());
        }
    //*--------------------------------QuotaModal--------------------------------

        //Abrir LabelModal
        const openQuotaModal = () =>{
            dispatch(onOpenQuotaModal());
        }
    
        //Cerrar LabelModal
        const closeQuotaModal = () =>{
            dispatch(onCloseQuotaModal());
        }


  return {
    //*Propiedades
    isModalClientOpen,
    isModalLabelOpen,
    isModalCategoryOpen,
    isModalProductOpen,
    isModalRateOpen,
    isModalQuotaOpen,

    //*Metodos
    openClientModal,
    closeClientModal,
    
    openLabelModal,
    closeLabelModal,

    openCategoryModal,
    closeCategoryModal,

    openProductModal,
    closeProductModal,

    openRateModal,
    closeRateModal,

    openQuotaModal,
    closeQuotaModal
    
  }
}
