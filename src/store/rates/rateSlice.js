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
    //Resetea tarifa
    onResetRate: (state) =>{
        state.activeRate = null;
        state.rates = [];
    },

    //Añadir tarifa
    onAddNewRate: (state, {payload}) =>{
        state.rates.push(payload);
        state.activeRate = payload;
    },

      // Modificar cliente por 
    onUpdateRate:(state, {payload})=>{
      state.rates = state.rates.map( rate =>{      //Nuevo array del evento
        if( rate.idRate === payload.idRate){
          return payload;
        }
        return rate;
      })   
    },
    //Leer categoria
    onLoadRate : (state, {payload}) =>{
        state.isLoadingRate = false;
        state.rates = payload;

         payload.forEach( rate =>{
        const exists = state.rates.some( dbRate => dbRate.id === rate.id);
        if(!exists){
          state.rates.push(rate)
        }
      })
    },
    onDeleteRate:(state) =>{
      state.rates = state.rates.filter(rate => rate.idRate !== state.activeRate.idRate);
      state.activeRate = null;
    },

}
})
export const { 
    //*Metodos
    onSetActiveRate,
    onResetRate,
    onAddNewRate,
    onUpdateRate,
    onLoadRate,
    onDeleteRate
} = rateSlice.actions; //accion