
//Si el Modal esta abierto o cerrado
import { createSlice } from '@reduxjs/toolkit';

export const uiSlice = createSlice({
  name: 'ui',
  initialState:{
    isModalClientOpen: false,
    isModalLabelOpen: false

  },
  reducers: {
    
    //Abrir modal Cliente
    onOpenClientModal: (state) =>{ state.isModalClientOpen = true;},

    //Cerrar modal Cliente
    onCloseClientModal: (state) =>{ state.isModalClientOpen = false;},

     //Abrir modal Cliente
    onOpenLabelModal: (state) =>{ state.isModalLabelOpen = true;},

    //Cerrar modal Cliente
    onCloseLabelModal: (state) =>{ state.isModalLabelOpen = false;}



  },
})
export const { 
  //*Client
    onCloseClientModal,
    onOpenClientModal,
  //*Label
    onOpenLabelModal,
    onCloseLabelModal,
} = uiSlice.actions; //accion