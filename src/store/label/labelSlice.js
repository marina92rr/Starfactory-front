

import { createSlice } from '@reduxjs/toolkit';

//---------Counter 10 + increment(+1) = 11
export const labelSlice = createSlice({
  name: 'labels',
  initialState:{
    labels: [],
    status: 'idle',    // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null
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
    }
  }
})
export const { 
  addLabel,
    loadLabelsRequest,
    loadLabelsSuccess,
    loadLabelsFailure,
    clearLabels
 } = labelSlice.actions; //accion