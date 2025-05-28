
import { useDispatch, useSelector } from "react-redux";
import { addLabel, onSetFilterLabel } from "../store/label/labelSlice";
import { clientsApi } from "../api";



export const useLabelsStore = () => {
  const dispatch = useDispatch();
  const { labels, filter, filteredList } = useSelector(state => state.labels);

  const startAddLabel = (label) => {
    dispatch(addLabel(label));
  };

  const createLabelAndAssign = async (labelData) => {
    try {
      const { data } = await clientsApi.post('labels/create-and-assign', labelData);
      dispatch(addLabel(data.label));
    } catch (error) {
      console.error('Error al crear y asignar etiqueta:', error);
    }
  };

  //Filtrar labels
  const startFilteringLabels = (searchTerm) => (dispatch) =>{
    dispatch(onSetFilterLabel(searchTerm));
  }



  

   return {
    //*Propiedades
    labels,
    filter,
    filteredList,
    //*Metodos
    startAddLabel,
    createLabelAndAssign ,
    startFilteringLabels
  };
};