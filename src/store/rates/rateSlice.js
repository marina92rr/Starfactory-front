import { createSlice } from '@reduxjs/toolkit';

export const rateSlice = createSlice({
  name: 'rate',
  initialState:{
    isLoadingRate: false,
    rates: [],
    activeRate: null,
  },
  reducers: {
   
    //Seleccion tarifa
    onSetActiveRate: (state, {payload}) =>{
        state.activeRate = payload;
    },

    //Añadir tarifa
    onAddNewRate: (state, {payload}) =>{
        state.rates.push(payload);
        state.activeRate = null;
    },

    //Leer categoria
    onLoadRate : (state, {payload}) =>{
        state.isLoadingRate = false;
        state.rates = payload;

         payload.forEach( rate =>{
        const exists = state.rates.some( dbRate => dbRate.id === rate.id);
        if( !exists){
          state.rates.push(rate)
        }
      })
    }

}
})
export const { 
    //*Metodos
    onSetActiveRate,
    onAddNewRate,
    onLoadRate
} = rateSlice.actions; //accion