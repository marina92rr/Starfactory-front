

import { createSlice } from '@reduxjs/toolkit';
import { normalizeAllTextFields } from '../../helpers/normalizeText';

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

    addLabel: (state, {payload}) => {
      const normalized = normalizeAllTextFields(payload);
      state.labels.push(normalized);
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

    //Filtrar labels Busqueda
    onSetFilter: (state, action) => {
      state.filter = action.payload;

      const normalize = str => (str || '')
        .normalize('NFD')                         // Quita tildes
        .replace(/[\u0300-\u036f]/g, '')          // Elimina marcas de acento
        .toUpperCase()
        .trim();

      const filter = normalize(state.filter);

      state.filteredList = state.labels.filter(label => {
        const fullName = normalize(`${label.name}`);
        return fullName.includes(filter);
      });
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
  onDeleteLabel,
  onSetFilters
} = labelSlice.actions; //accion