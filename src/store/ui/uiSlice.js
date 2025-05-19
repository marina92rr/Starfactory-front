
//Si el Modal esta abierto o cerrado
import { createSlice } from '@reduxjs/toolkit';

export const uiSlice = createSlice({
  name: 'ui',
  initialState:{
   isModalOpen: false
  },
  reducers: {
    
    //Abrir modal
    onOpenModal: (state) =>{
        state.isModalOpen = true;
    },

    //Cerrar modal
    onCloseModal: (state) =>{
        state.isModalOpen = false;
    }
  },
})
export const { 
    onOpenModal,
    onCloseModal
} = uiSlice.actions; //accion