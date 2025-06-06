

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
 
    onLoadLabels: (state, {payload}) =>{
      state.isLoadingLabels = false;
      state.labels = payload;
      payload.forEach( label =>{
        const exist = state.labels.some( dbLabel => dbLabel.id === label.id);
        if(!exist){
          state.labels.push(label)
        }
      })
    }
  }
})
export const { 
  onSetActiveLabel,
  addLabel,
  onSetFilterLabel,
  LoadLabelsForDni,
  onSetLabels,
  onLoadLabels,
  onLoadingLabels
} = labelSlice.actions; //accion