

import { createSlice } from '@reduxjs/toolkit';

//---------Counter 10 + increment(+1) = 11
export const labelSlice = createSlice({
  name: 'labels',
  initialState:{
    labels: [],
    status: 'idle',    // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
    filter: '',
    filteredList :[],
  
  },
  reducers: {
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
    onSetFilterLabel : (state, {payload}) =>{
      state.filter = payload;
      const q = state.filter.trim().toUpperCase();
      state.filteredList = state.labels.filter(l =>{
        const full = `${l.name}`.toLocaleUpperCase();
        return full.includes(q);
      })
    }
  }
})
export const { 
  addLabel,
    loadLabelsRequest,
    loadLabelsSuccess,
    loadLabelsFailure,
    clearLabels,
    LoadLabelsForDni,
    onSetFilterLabel
 } = labelSlice.actions; //accion