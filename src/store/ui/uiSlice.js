
//Si el Modal esta abierto o cerrado
import { createSlice } from '@reduxjs/toolkit';

export const uiSlice = createSlice({
  name: 'ui',
  initialState: {
    //Clinte
    isModalClientOpen: false,
    //Etiqueta
    isModalLabelOpen: false,
    isModalCreateLabelOpen: false,
    isModalColorLabelOpen: false,
    isModalFilterClientsByLabelOpen: false,
    //Tienda
    isModalCategoryOpen: false,
    isModalProductOpen: false,
    //Tarifa
    isModalRateOpen: false,
    isModalQuotaOpen: false,
    isModalSaleOpen: false,
    //Cancellation
    isModalCancellationOpen: false,
    //SuscriptionClient / autocompras
    isModalSuscriptionClientOpen: false,
    //ProductClientUnpaid
    isModalProductClientUnpaidOpen: false,

  },
  reducers: {

    //Abrir modal Cliente
    onOpenClientModal: (state) => { state.isModalClientOpen = true; },
    //Cerrar modal Cliente
    onCloseClientModal: (state) => { state.isModalClientOpen = false; },

    //Abrir modal Label
    onOpenLabelModal: (state) => { state.isModalLabelOpen = true; },
    //Cerrar modal Label
    onCloseLabelModal: (state) => { state.isModalLabelOpen = false; },

    //Abrir modal Create Label
    onOpenCreateLabelModal: (state) => { state.isModalCreateLabelOpen = true; },
    //Cerrar modal Create Label
    onCloseCreateLabelModal: (state) => { state.isModalCreateLabelOpen = false; },

    //Abrir modal Color Label
    onOpenColorLabelModal: (state) => { state.isModalColorLabelOpen = true; },
    //Cerrar modal color Label
    onCloseColorLabelModal: (state) => { state.isModalColorLabelOpen = false; },

    //Abrir modal Filtrar clientes por etiqueta
    onOpenFilterClientsByLabelModal: (state) => { state.isModalFilterClientsByLabelOpen = true; },
    //Cerrar modal Filtrar clientes por etiqueta
    onCloseFilterClientsByLabelModal: (state) => { state.isModalFilterClientsByLabelOpen = false; },

    //Abrir modal Categoria
    onOpenCategoryModal: (state) => { state.isModalCategoryOpen = true; },
    //Cerrar modal Categoria
    onCloseCategoryModal: (state) => { state.isModalCategoryOpen = false; },

    //Abrir modal Producto
    onOpenProductModal: (state) => { state.isModalProductOpen = true; },
    //Cerrar modal Producto
    onCloseProductModal: (state) => { state.isModalProductOpen = false; },


    //Abrir modal Rate
    onOpenRateModal: (state) => { state.isModalRateOpen = true; },
    //Cerrar modal Rate
    onCloseRateModal: (state) => { state.isModalRateOpen = false; },
    //Abrir modal Rate
    onOpenQuotaModal: (state) => { state.isModalQuotaOpen = true; },
    //Cerrar modal Rate
    onCloseQuotaModal: (state) => { state.isModalQuotaOpen = false; },

    //Venta Modal
    onOpenSaleModal: (state) => { state.isModalSaleOpen = true; },
    //Cerrar modal Rate
    onCloseSaleModal: (state) => { state.isModalSaleOpen = false; },

    //Abrir modal Baja
    onOpenCancellationModal: (state) => { state.isModalCancellationOpen = true; },
    //Cerrar modal Baja
    onCloseCancellationModal: (state) => { state.isModalCancellationOpen = false; },

    //------------- SUSCRIPTION CLIENT ----------------
     //Abrir modal Cancellation
    onOpenSuscriptionClientModal: (state) => { state.isModalSuscriptionClientOpen = true; },
    //Cerrar modal Cancellation
    onCloseSuscriptionClientModal: (state) => { state.isModalSuscriptionClientOpen = false; },

        //------------- PRODUCTCLIENT ----------------
     //Abrir modal Cancellation
    onOpenProductClientUnpaidModal: (state) => { state.isModalProductClientUnpaidOpen = true; },
    //Cerrar modal Cancellation
    onCloseProductClientUnpaidModal: (state) => { state.isModalProductClientUnpaidOpen = false; },



  },
})
export const {
  //*Client
  onCloseClientModal,
  onOpenClientModal,

  //*Label
  onOpenLabelModal,
  onCloseLabelModal,
  //*Create Label
  onOpenCreateLabelModal,
  onCloseCreateLabelModal,
  //*Color Label
  onOpenColorLabelModal,
  onCloseColorLabelModal,
  //*Filter Clients by Label
  onOpenFilterClientsByLabelModal,
  onCloseFilterClientsByLabelModal,

  //*Category
  onOpenCategoryModal,
  onCloseCategoryModal,

  //*Product
  onOpenProductModal,
  onCloseProductModal
  //*Rate
  , onOpenRateModal,
  onCloseRateModal,
  //*Quota
  onOpenQuotaModal,
  onCloseQuotaModal,
  //*Venta
  onOpenSaleModal,
  onCloseSaleModal,
  //*Baja
  onOpenCancellationModal,
  onCloseCancellationModal,
  //*SuscriptionClient
  onOpenSuscriptionClientModal,
  onCloseSuscriptionClientModal,
  //*ProductClientUnpaid
  onOpenProductClientUnpaidModal,
  onCloseProductClientUnpaidModal,

} = uiSlice.actions; //accion