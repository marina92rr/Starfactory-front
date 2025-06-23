
//Si el Modal esta abierto o cerrado
import { createSlice } from '@reduxjs/toolkit';

export const uiSlice = createSlice({
  name: 'ui',
  initialState:{
    isModalClientOpen: false,
    isModalLabelOpen: false,
    isModalCategoryOpen: false,
    isModalProductOpen: false,
    isModalRateOpen: false,
    isModalQuotaOpen: false,

  },
  reducers: {
    
    //Abrir modal Cliente
    onOpenClientModal: (state) =>{ state.isModalClientOpen = true;},
    //Cerrar modal Cliente
    onCloseClientModal: (state) =>{ state.isModalClientOpen = false;},

     //Abrir modal Label
    onOpenLabelModal: (state) =>{ state.isModalLabelOpen = true;},
    //Cerrar modal Label
    onCloseLabelModal: (state) =>{ state.isModalLabelOpen = false;},
    
    //Abrir modal Categoria
    onOpenCategoryModal: (state) =>{ state.isModalCategoryOpen = true;},
    //Cerrar modal Categoria
    onCloseCategoryModal: (state) =>{ state.isModalCategoryOpen = false;},

    //Abrir modal Producto
    onOpenProductModal: (state) =>{ state.isModalProductOpen = true;},
    //Cerrar modal Producto
    onCloseProductModal: (state) =>{ state.isModalProductOpen = false;},


     //Abrir modal Rate
     onOpenRateModal: (state) =>{ state.isModalRateOpen = true;},
     //Cerrar modal Rate
     onCloseRateModal: (state) =>{ state.isModalRateOpen = false;},
     //Abrir modal Rate
     onOpenQuotaModal: (state) =>{ state.isModalQuotaOpen = true;},
     //Cerrar modal Rate
     onCloseQuotaModal: (state) =>{ state.isModalQuotaOpen = false;}


  },
})
export const { 
  //*Client
    onCloseClientModal,
    onOpenClientModal,
    
  //*Label
    onOpenLabelModal,
    onCloseLabelModal,

  //*Category
    onOpenCategoryModal,
    onCloseCategoryModal,

  //*Product
    onOpenProductModal,
    onCloseProductModal
  //*Rate
    ,onOpenRateModal,
    onCloseRateModal,
  //*Quota
    onOpenQuotaModal,
    onCloseQuotaModal
    
} = uiSlice.actions; //accion