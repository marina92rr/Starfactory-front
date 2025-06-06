
import { useDispatch, useSelector } from "react-redux";
import { addLabel, onLoadingLabels, onLoadLabels, onSetActiveLabel, onSetFilterLabel, onSetLabels } from "../store/label/labelSlice";
import { clientsApi } from "../api";
import { useClientsStore } from "./useClientsStore";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";



export const useLabelsStore = () => {
  const dispatch = useDispatch();
  const { labels, filter, filteredList, activeLabel, isLoadingLabels } = useSelector(state => state.labels);
  const {dni} = useParams();


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

  const createLabelAndAssign = async (labelData) => {
    try {
      const { data } = await clientsApi.post('labels/create-and-assign', labelData);
      dispatch(addLabel(data.label));
    } catch (error) {
      console.error('Error al crear y asignar etiqueta:', error);
    }
  };

  const startFilterLabels = async ({dni}) => {
    if (!dni) return;
    
    try {
      const { data } = await clientsApi.get(`/clients/${dni}/labels`);
      dispatch(onSetLabels(data.labels || []));
    } catch (error) {
      console.error('Error al cargar labels:', error);
    }
  };

  //const startFilterLabels = ({dni}) => {
  // // src/components/clientPage/LabelClient.jsx
//
  //  const [labels, setLabels] = useState([])
//
  //     useEffect(() => {
  //  if (!dni) return;
//
  //  clientsApi.get(`/clients/${dni}/labels`)
  //    .then(({ data }) => {
  //      setLabels(data.labels || []);
  //    })
  //    .catch(err => {
  //      console.error('Error al cargar labels:', err);
  //      setLabels([]);
  //    });
  //}, [dni]); // ✅ Solo se vuelve a ejecutar si cambia el dni
  //  return labels;
  //}
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
    startFilterLabels
  };
};