

import { createSlice } from '@reduxjs/toolkit';

//---------Counter 10 + increment(+1) = 11
export const labelSlice = createSlice({
  name: 'labels',
  initialState:{
    labels: [],
     activeLabel: null,
    status: 'idle',    // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
    filter: '',
    filteredList :[],
    isLoadingLabels: false
  
  },
  reducers: {

     //Carga una etiqueta
    onSetActiveLabel :(state, {payload}) =>{
      state.activeLabel = payload;
    },

    //Carga de todos los labels
    onSetLabels: (state, { payload }) => {
      state.labels = payload;
      state.isLoading = false;
    },

    onLoadingLabels: (state) => {
      state.isLoading = true;
      state.errorMessage = null;
    },

    addLabel: (state, action) => {
      state.labels.push(action.payload);
    },

      // Modificar cliente por idClient
    onUpdateLabel:(state, {payload})=>{
      state.labels = state.labels.map( label =>{      //Nuevo array del evento
        if( label.idLabel === payload.idLabel){
          return payload;
        }
        return label;
      })   
    },
 
    onLoadLabels: (state, {payload}) =>{
      state.isLoadingLabels = false;
      state.labels = payload;
      payload.forEach( label =>{
        const exist = state.labels.some( dbLabel => dbLabel.id === label.id);
        if(!exist){
          state.labels.push(label)
        }
      })
    },
    onDeleteLabel:(state) =>{
      state.labels = state.labels.filter(label => label.idLabel !== state.activeLabel.idLabel);
      state.activeLabel = null;
    },
  }
})
export const { 
  onSetActiveLabel,
  addLabel,
  onUpdateLabel,
  onSetFilterLabel,
  onSetLabels,
  onLoadLabels,
  onLoadingLabels,
  onDeleteLabel
} = labelSlice.actions; //accion