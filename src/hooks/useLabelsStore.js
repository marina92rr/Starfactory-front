
import { useDispatch, useSelector } from "react-redux";
import { addLabel, onDeleteLabel, onLoadLabels, onSetActiveLabel, onSetFilterLabel, onSetLabels, setActiveFilterLabels, clearActiveFilterLabels } from "../store/label/labelSlice";
import { clientsApi } from "../api";
import { useParams } from "react-router-dom";
import { normalizeAllTextFields } from "../helpers/normalizeText";



export const useLabelsStore = () => {
  const dispatch = useDispatch();
  const { labels, filter, filteredList, activeLabel, activeFilterLabels } = useSelector(state => state.labels);
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

  //Guardar etiquetas activas
  const startActiveFilterLabels = (labels) =>{
    dispatch(setActiveFilterLabels(labels));
  }

  //Limpiar etiquetas activas
  const setClearActiveFilterLabels = (labels) => {
  dispatch(clearActiveFilterLabels(labels));
};
  
  // Filtrar labels Buscar...
  const startFindLabels = (searchTerm) => async (dispatch, getState) => {
    //const { label } = getState();
    try {
      const { data } = await clientsApi.get('labels');
      dispatch(onLoadLabels(data.labels));
    } catch (error) {
      console.error('Error al cargar todas las etiquetas', error);
    }
    dispatch(onSetFilterLabel(searchTerm));
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
    activeFilterLabels,
    //*Metodos
    
    createLabelAndAssign ,
    starLoadingLabels,
    setActiveLabel,
    startFilterLabels,
    startDeleteLabel,
    startFindLabels,
    startActiveFilterLabels,
    setClearActiveFilterLabels
  
  };
};