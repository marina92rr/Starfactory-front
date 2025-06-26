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

     // Modificar cliente por dni
    onUpdateProduct:(state, {payload})=>{
      state.products = state.products.map( product =>{      //Nuevo array del evento
        if( product.idProduct === payload.idProduct){
          return payload;
        }
        return product;
      })   
    },
    onDeleteProduct:(state) =>{
      state.products = state.products.filter(product => product.idProduct !== state.activeProduct.idProduct);
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
   onUpdateProduct,
   onDeleteProduct,
   onLoadProduct
   
} = productSlice.actions; //accion