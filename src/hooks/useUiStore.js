import { useDispatch, useSelector } from "react-redux"
import { onCloseCategoryModal, onCloseClientModal, onCloseColorLabelModal, onCloseCreateLabelModal, onCloseLabelModal, onCloseProductModal, onCloseQuotaModal, onCloseRateModal, onCloseSaleModal, onOpenCategoryModal, onOpenClientModal, onOpenColorLabelModal, onOpenCreateLabelModal, onOpenLabelModal, onOpenProductModal, onOpenQuotaModal, onOpenRateModal, onOpenSaleModal } from "../store/ui/uiSlice";



export const useUiStore = () => {

    const dispatch = useDispatch();
    const { 
      isModalClientOpen,
      isModalLabelOpen,
      isModalCreateLabelOpen,
      isModalColorLabelOpen,
      isModalCategoryOpen,
      isModalProductOpen,
      isModalRateOpen,
      isModalQuotaOpen,
      isModalSaleOpen,
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

     //Abrir Create LabelModal
    const openCreateLabelModal = () =>{
        dispatch(onOpenCreateLabelModal());
    }

    //Cerrar Create LabelModal
    const closeCreateLabelModal = () =>{
        dispatch(onCloseCreateLabelModal());
    }

         //Abrir Color LabelModal
    const openColorLabelModal = () =>{
        dispatch(onOpenColorLabelModal());
    }

    //Cerrar Color LabelModal
    const closeColorLabelModal = () =>{
        dispatch(onCloseColorLabelModal());
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

     //*--------------------------------SaleModal--------------------------------

        //Abrir LabelModal
        const openSaleModal = () =>{
            dispatch(onOpenSaleModal());
        }
    
        //Cerrar LabelModal
        const closeSaleModal = () =>{
            dispatch(onCloseSaleModal());
        }


  return {
    //*Propiedades
    isModalClientOpen,
    isModalLabelOpen,
    isModalCreateLabelOpen,
    isModalColorLabelOpen,
    isModalCategoryOpen,
    isModalProductOpen,
    isModalRateOpen,
    isModalQuotaOpen,
    isModalSaleOpen,

    //*Metodos
    openClientModal,
    closeClientModal,
    
    openLabelModal,
    closeLabelModal,
    openCreateLabelModal,
    closeCreateLabelModal,
    openColorLabelModal,
    closeColorLabelModal,

    openCategoryModal,
    closeCategoryModal,

    openProductModal,
    closeProductModal,

    openRateModal,
    closeRateModal,

    openQuotaModal,
    closeQuotaModal,

    openSaleModal,
    closeSaleModal,
    
  }
}
