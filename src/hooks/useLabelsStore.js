
import { useDispatch, useSelector } from "react-redux";
import { addLabel, onDeleteLabel, onLoadingLabels, onLoadLabels, onSetActiveLabel, onSetFilterLabel, onSetLabels, onUpdateLabel } from "../store/label/labelSlice";
import { clientsApi } from "../api";
import { useClientsStore } from "./useClientsStore";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { normalizeAllTextFields } from "../helpers/normalizeText";



export const useLabelsStore = () => {
  const dispatch = useDispatch();
  const { labels, filter, filteredList, activeLabel } = useSelector(state => state.labels);
  const {idClient} = useParams();

   //Activar cliente
    const setActiveLabel = (labelData) => {
      dispatch(onSetActiveLabel(labelData))
    }


  const starLoadingLabels = async() =>{
   try {
    
     const {data} = await clientsApi.get('labels');
    const label = data.labels;

    dispatch(onLoadLabels(label));
    
   } catch (error) {
    console.log('Error al cargar las etiquetas');
    console.log(error);
   }
  }

  const createLabelAndAssign = async (labelData, idClient) => {
    try {
      const normalizedLabelAssign = normalizeAllTextFields(labelData); //  normalizar todos los campos string
      
      const { data } = await clientsApi.post('/labels/assign', normalizedLabelAssign, idClient);
      dispatch(addLabel(data.label));
    } catch (error) {
      if (error.response?.status === 400 && error.response.data.errors?.name) {
      return error.response.data.errors; // devolvemos el objeto de errores
    }
    console.error('Error al crear etiqueta:', error);
    return { general: { msg: 'Error inesperado' } };
  
    }
  };

  const startFilterLabels = async () => {
    if (!idClient) return;
    try {
      const { data } = await clientsApi.get(`/clients/${idClient}/labels`);
      dispatch(onSetLabels(data.labels || []));
    } catch (error) {
      console.error('Error al cargar labels:', error);
    }
  };

  const startDeleteLabel = async(label)=>{
        const {data} = await clientsApi.delete(`/labels/${label.idLabel}`);
        dispatch(onDeleteLabel(data));
    }
   return {
    //*Propiedades
    labels,
    filter,
    filteredList,
    activeLabel,
    //*Metodos
    
    createLabelAndAssign ,
    starLoadingLabels,
    setActiveLabel,
    startFilterLabels,
    startDeleteLabel
  };
};