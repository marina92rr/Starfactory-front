

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

     //Seleccion de cliente
    onSetActiveLabel :(state, {payload}) =>{
      state.activeLabel = payload;
    },

    addLabel: (state, action) => {
      state.labels.push(action.payload);
    },
    loadLabelsRequest(state) {
      state.status = 'loading'
      state.error = null
    },
    loadLabelsSuccess(state, action) {
      state.status = 'succeeded'
      state.labels = action.payload
    },
    loadLabelsFailure(state, action) {
      state.status = 'failed'
      state.error = action.payload
    },
    clearLabels(state) {
      state.labels = []
      state.status = 'idle'
      state.error = null
    },
    LoadLabelsForDni: (state, action) => {
      delete state.byDni[action.payload]
      delete state.loading[action.payload]
      delete state.error[action.payload]
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
  loadLabelsRequest,
  loadLabelsSuccess,
  loadLabelsFailure,
  clearLabels,
  LoadLabelsForDni,
  onSetFilterLabel,
  onLoadLabels
} = labelSlice.actions; //accion