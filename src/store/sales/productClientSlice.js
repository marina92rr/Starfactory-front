import { createSlice } from '@reduxjs/toolkit';

//---------Counter 10 + increment(+1) = 11
export const productClientSlice = createSlice({
  name: 'productClient',
  initialState: {
    productClients: [], // registros guardados
    isLoadingProduct: false,
    isLoadingProductsClientUnpaid: false,
    productsClientUnpaid: [],
    isLoadingProductsClientPaid: false,
    productsClientPaid: [],
    activeProductClient: null,
    selectedDate: null, // string 'YYYY-MM-DD'
    productsClientDate: [] // productos filtrados por fecha
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


    onLoadAllProductsClient: (state, { payload }) => {
      state.isLoadingProduct = false;
      state.productClients = payload; // ahora sí es un array directamente
    },

    onLoadProductsClient: (state, { payload }) => {
      state.isLoadingProduct = false;
      state.productClients = payload; // ahora sí es un array directamente
    },

    onLoadProductsClientPaid: (state, { payload }) => {
      state.isLoadingProductsClientPaid = false;
      state.productsClientPaid = payload; // ahora sí es un array directamente
    },

    onLoadProductsClientUnpaid: (state, { payload }) => {
      state.isLoadingProductsClientUnpaid = false;
      state.productsClientUnpaid = payload; // ahora sí es un array directamente
    },

    onUpdateProductClient: (state, { payload }) => {
      state.productsClientUnpaid = state.productsClientUnpaid.map(productClient => {      //Nuevo array del evento
        if (productClient.idProductClient === payload.idProductClient) {
          return payload;
        }
        return productClient;
      })
    },

    onDeleteProductClient: (state) => {
       if (state.activeProductClient) {
        state.productsClientUnpaid = state.productsClientUnpaid.filter(
          (productClient) =>
            productClient.idProductClient !== state.activeProductClient.idProductClient
        );
        state.activeProductClient = null;
      }
    },

    //Filtrar productos por Fecha
    onSetSelectedDate: (state, { payload }) => {
      state.selectedDate = payload; // string 'YYYY-MM-DD'
    },
    onLoadProductsByDate: (state, { payload }) => {
      state.isLoadingProduct = false;
      state.productsClientDate = payload;     // array de productClient
    },
  },
})
export const {
  onSetActiveProductClient,
  onLoadProductsClient,
  onLoadAllProductsClient,
  onLoadProductsClientPaid,
  onLoadProductsClientUnpaid,
  onAddNewProductClient,
  onUpdateProductClient,
  onDeleteProductClient,

  onSetSelectedDate,  
  onLoadProductsByDate
} = productClientSlice.actions; //accion