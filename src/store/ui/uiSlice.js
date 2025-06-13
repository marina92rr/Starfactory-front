
//Si el Modal esta abierto o cerrado
import { createSlice } from '@reduxjs/toolkit';

export const uiSlice = createSlice({
  name: 'ui',
  initialState:{
    isModalClientOpen: false,
    isModalLabelOpen: false,
    isModalCategoryOpen: false,
    isModalProductOpen: false

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
     onCloseProductModal: (state) =>{ state.isModalProductOpen = false;}


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
} = uiSlice.actions; //accion