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

    //Añadir cuota
    onAddNewQuota: (state, {payload}) =>{
        state.quotas.push(payload);
        state.activeQuota = null;
    },

    //Leer cuota
    onLoadQuota: (state, { payload }) => {
      state.isLoadingQuota = false;
      state.quotas = payload; // ahora sí es un array directamente
    }
}
})
export const { 
    //*Metodos
  onSetActiveQuota,
  onAddNewQuota,
  onLoadQuota
   
} = quotaSlice.actions; //accion