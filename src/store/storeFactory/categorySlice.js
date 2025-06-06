import { createSlice } from '@reduxjs/toolkit';

//---------Counter 10 + increment(+1) = 11
export const categorySlice = createSlice({
  name: 'category',
  initialState:{
    isLoadingCategory: false,
    categories: [],
    activeCategory: null,
  },
  reducers: {
   
    //Seleccion categoria
    onSetActiveCategory: (state, {payload}) =>{
        state.activeCategory = payload;
    },

    //Añadir categoria
    onAddNewCategory: (state, {payload}) =>{
        state.category.push(payload);
        state.activeCategory = null;
    },

    onLoadCategory : (state, {payload}) =>{
        state.isLoadingCategory = false;
        state.categories = payload;

         payload.forEach( category =>{
        const exists = state.categories.some( dbCategory => dbCategory.id === category.id);
        if( !exists){
          state.clients.push(category)
        }
      })
    }

}
})
export const { 
    //*Metodos
    onSetActiveCategory, 
    onAddNewCategory, 
    onLoadCategory 
} = categorySlice.actions; //accion