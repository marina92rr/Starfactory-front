import { createSlice } from '@reduxjs/toolkit';

//---------Counter 10 + increment(+1) = 11
export const productClientSlice = createSlice({
  name: 'productClient',
  initialState:{
    productClients: [], // registros guardados
    isLoadingProduct: false,
    activeProductClient: null,
  },
  reducers: {
   //Seleccion categoria
    onSetActiveProductClient: (state, { payload }) => {
      state.activeProductClient = payload;
    },

    //Añadir categoria
    onAddNewProductClient: (state, { payload }) => {
      state.productClients.push(payload);
      state.activeProductClient = null;
    },

    // Modificar cliente por dni
    onUpdateProductClient: (state, { payload }) => {
      state.productClients = state.productClients.map(productClient => {      //Nuevo array del evento
        if (productClient.idProductClient === payload.idProductClient) {
          return payload;
        }
        return productClient;
      })
    },
    onDeleteProductClient: (state) => {
      if(state.activeProductClient){
        state.productClients = state.productClients.filter(productClient => productClient.idProductClient !== state.activeProductClient.idProductClient);
        state.activeProductClient = null;
      }
      
    },

    onLoadProductClient: (state, { payload }) => {
      state.isLoadingProduct = false;
      state.productClients = payload; // ahora sí es un array directamente
    }

  },
})
export const {onSetActiveProductClient, onAddNewProductClient, onUpdateProductClient, onDeleteProductClient, onLoadProductClient } = productClientSlice.actions; //accion