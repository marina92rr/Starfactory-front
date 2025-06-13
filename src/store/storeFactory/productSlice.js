import { createSlice } from '@reduxjs/toolkit';

//---------Counter 10 + increment(+1) = 11
export const productSlice = createSlice({
  name: 'product',
  initialState:{
    isLoadingProduct: false,
    products: [],
    activeProduct: null,
  },
  reducers: {
   
    //Seleccion categoria
    onSetActiveProduct: (state, {payload}) =>{
        state.activeProduct = payload;
    },

    //Añadir categoria
    onAddNewProduct: (state, {payload}) =>{
        state.products.push(payload);
        state.activeProduct = null;
    },

    onLoadProduct: (state, { payload }) => {
      state.isLoadingProduct = false;
      state.products = payload; // ahora sí es un array directamente
    }

}
})
export const { 
    //*Metodos
   onSetActiveProduct,
   onAddNewProduct,
   onLoadProduct
   
} = productSlice.actions; //accion