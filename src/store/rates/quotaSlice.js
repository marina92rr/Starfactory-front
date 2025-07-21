import { createSlice } from '@reduxjs/toolkit';

//---------Counter 10 + increment(+1) = 11
export const quotaSlice = createSlice({
  name: 'quota',
  initialState:{
    isLoadingQuota: false,
    quotas: [],
    activeQuota: null,
  },
  reducers: {
   
    //Seleccion Cuota
    onSetActiveQuota: (state, {payload}) =>{
        state.activeQuota = payload;
    },
    //Resetea cuota
    onResetQuota: (state) =>{
        state.activeQuota = null;
        state.quotas = [];
    },


    //Añadir cuota
    onAddNewQuota: (state, {payload}) =>{
        state.quotas.push(payload);
        state.activeQuota = null;
    },
      // Modificar cliente por dni
    onUpdateQuota:(state, {payload})=>{
      state.quotas = state.quotas.map( quota =>{      //Nuevo array del evento
        if( quota.idQuota === payload.idQuota){
          return payload;
        }
        return quota;
      })   
    },

    //Leer cuota
    onLoadQuota: (state, { payload }) => {
      state.isLoadingQuota = false;
      state.quotas = payload; // ahora sí es un array directamente
    },

    onDeleteQuota:(state) =>{
      if(state.activeQuota){
        state.quotas = state.quotas.filter(quota => quota.idQuota !== state.activeQuota.idQuota);
        state.activeQuota = null;
      }
    },
}
})
export const { 
    //*Metodos
  onSetActiveQuota,
  onResetQuota,
  onAddNewQuota,
  onUpdateQuota,
  onLoadQuota,
  onDeleteQuota

   
} = quotaSlice.actions; //accion