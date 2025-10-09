import { useDispatch, useSelector } from "react-redux"
import { onCloseCancellationModal, onCloseCancelSuscribeClientModal, onCloseCategoryModal, onCloseClientModal, onCloseColorLabelModal, onCloseCreateLabelModal, onCloseFilterClientsByLabelModal, onCloseLabelModal, onClosePasswordUserModal, onCloseProductClientAdminModal, onCloseProductClientModal, onCloseProductClientUnpaidModal, onCloseProductModal, onCloseQuotaModal, onCloseRateModal, onCloseSaleModal, onCloseSuscriptionClientModal, onCloseTotalProductClientModal, onCloseTotalProductClientUnpaidModal, onCloseUserModal, onOpenCancellationModal, onOpenCancelSuscribeClientModal, onOpenCategoryModal, onOpenClientModal, onOpenColorLabelModal, onOpenCreateLabelModal, onOpenFilterClientsByLabelModal, onOpenLabelModal, onOpenPasswordUserModal, onOpenProductClientAdminModal, onOpenProductClientModal, onOpenProductClientUnpaidModal, onOpenProductModal, onOpenQuotaModal, onOpenRateModal, onOpenSaleModal, onOpenSuscriptionClientModal, onOpenTotalProductClientModal, onOpenTotalProductClientUnpaidModal, onOpenUserModal } from "../store/ui/uiSlice";



export const useUiStore = () => {

    const dispatch = useDispatch();
    const { 
      isModalClientOpen,
      isModalLabelOpen,
      isModalCreateLabelOpen,
      isModalColorLabelOpen,
      isModalFilterClientsByLabelOpen,
      isModalCategoryOpen,
      isModalProductOpen,
      isModalRateOpen,
      isModalQuotaOpen,
      isModalSaleOpen,
      isModalCancelSuscribeClienOpen,
      isModalCancellationOpen,
      isModalSuscriptionClientOpen,
      isModalProductClientUnpaidOpen,
      isModalTotalProductClientUnpaidOpen,
      isModalProductClientOpen,
      isModalProductClientAdminOpen,
      isModalUserOpen,
      isModalPasswordUser
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

    //Abrir Filtro clientes por label LabelModal
    const openFilterClientByLabelModal = () =>{
        dispatch(onOpenFilterClientsByLabelModal());
    }

    //Cerrar Filtro clientes por label LabelModal
    const closeFilterClientByLabelModal = () =>{
        dispatch(onCloseFilterClientsByLabelModal());
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
    //*--------------------------------Baja--------------------------------

     //Abrir Baja
    const openCancelSuscribeClientModal = () =>{
        dispatch(onOpenCancelSuscribeClientModal());
    }

    //Cerrar Baja
    const closeCancelSuscribeClientModal = () =>{
        dispatch(onCloseCancelSuscribeClientModal());
    }

    //Abrir Baja programada
    const openCancellationModal = () =>{
        dispatch(onOpenCancellationModal());
    }

    //Cerrar Baja Programada
    const closeCancellationModal = () =>{
        dispatch(onCloseCancellationModal());
    }

    //*--------------------------------Suscripcion/autocompras--------------------------------

    //Abrir CancellationModal
    const openSuscriptionClientModal = () =>{
        dispatch(onOpenSuscriptionClientModal());
    }

    //Cerrar CancellationModal
    const closeSuscriptionClientModal = () =>{
        dispatch(onCloseSuscriptionClientModal());
    }

    
    //*--------------------------------ProductClient/Ventas--------------------------------

    //Abrir Unpaid
    const openProductClientUnpaidModal = () =>{
        dispatch(onOpenProductClientUnpaidModal());
    }

    //Cerrar Unpaid
    const closeProductClientUnpaidModal = () =>{
        dispatch(onCloseProductClientUnpaidModal());
    }

        //Abrir UnpaidTotal
    const openTotalProductClientUnpaidModal = () =>{
        dispatch(onOpenTotalProductClientUnpaidModal());
    }

    //Cerrar UnpaidTotal
    const closeTotalProductClientUnpaidModal = () =>{
        dispatch(onCloseTotalProductClientUnpaidModal());
    }
        //Abrir AllProductClient
    const openProductClientModal = () =>{
        dispatch(onOpenProductClientModal());
    }

    //Cerrar AllProductClient
    const closeProductClientModal = () =>{
        dispatch(onCloseProductClientModal());
    }

           //Abrir AllProductClient Admin
    const openProductClientAdminModal = () =>{
        dispatch(onOpenProductClientAdminModal());
    }

    //Cerrar AllProductClient Admin
    const closeProductClientAdminModal = () =>{
        dispatch(onCloseProductClientAdminModal());
    }

    //Abrir Usuario
    const openUserModal = () =>{
        dispatch(onOpenUserModal());
    }

    //Cerrar Usuario                
    const closeUserModal = () =>{
        dispatch(onCloseUserModal());
    }

    //Abrir Password Usuario
    const openPasswordUserModal = () =>{
        dispatch(onOpenPasswordUserModal());
    }

    //Cerrar Password Usuario
    const closePasswordUserModal = () =>{
        dispatch(onClosePasswordUserModal());
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
    isModalFilterClientsByLabelOpen,
    isModalCancelSuscribeClienOpen,
    isModalCancellationOpen,
    isModalSuscriptionClientOpen,
    isModalProductClientUnpaidOpen,
    isModalTotalProductClientUnpaidOpen,
    isModalProductClientOpen,
    isModalProductClientAdminOpen,
    isModalUserOpen,
    isModalPasswordUser,

    //*Metodos
    openClientModal,
    closeClientModal,
    
    openLabelModal,
    closeLabelModal,
    openCreateLabelModal,
    closeCreateLabelModal,
    openColorLabelModal,
    closeColorLabelModal,
    openFilterClientByLabelModal,
    closeFilterClientByLabelModal,

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

    openCancelSuscribeClientModal,
    closeCancelSuscribeClientModal,

    openCancellationModal,
    closeCancellationModal,

    openSuscriptionClientModal,
    closeSuscriptionClientModal,

    openProductClientUnpaidModal,
    closeProductClientUnpaidModal,

    openTotalProductClientUnpaidModal,
    closeTotalProductClientUnpaidModal,

    openProductClientModal,
    closeProductClientModal,

    openProductClientAdminModal,
    closeProductClientAdminModal,

    openUserModal,
    closeUserModal,

    openPasswordUserModal,
    closePasswordUserModal

  }
}
