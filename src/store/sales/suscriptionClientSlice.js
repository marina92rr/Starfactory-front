import { createSlice } from '@reduxjs/toolkit';

//---------Counter 10 + increment(+1) = 11
export const suscriptionClientSlice = createSlice({
  name: 'suscriptionClient',
  initialState: {
    activeSuscriptionClient: null,
    suscriptionClients: [], // registros guardados
    isLoadingSuscription: false,
  },
  reducers: {
    //Seleccion categoria
    onSetActiveSuscriptionClient: (state, { payload }) => {
      state.activeSuscriptionClient = payload;
    },

    onStartLoadingSuscriptions: (state) => {
      state.isLoadingSuscription = true;
    },

     // Modificar suscripcion por idSuscripcion
    onUpdateSuscriptionClient:(state, {payload})=>{
      state.suscriptionClients = state.suscriptionClients.map( suscription =>{      //Nuevo array del evento
        if( suscription.idSuscriptionClient === payload.idSuscriptionClient){
          return payload;
        }
        return suscription;
      })   
    },

    onDeleteSuscriptionClient: (state) => {
      if (state.activeSuscriptionClient) {
        state.suscriptionClients = state.suscriptionClients.filter(
          (suscriptionClient) =>
            suscriptionClient.idSuscriptionClient !== state.activeSuscriptionClient.idSuscriptionClient
        );
        state.activeSuscriptionClient = null;
      }
    },

    onLoadSuscriptionClient: (state, { payload }) => {
      state.isLoadingSuscription = false;
      state.suscriptionClients = payload; // ahora sí es un array directamente
    }

  },
})

export const { 
  onSetActiveSuscriptionClient, 
  onUpdateSuscriptionClient,
  onDeleteSuscriptionClient, 
  onLoadSuscriptionClient, 
  onStartLoadingSuscriptions 
} = suscriptionClientSlice.actions; //accion