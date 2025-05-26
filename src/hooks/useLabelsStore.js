
import { useDispatch, useSelector } from "react-redux";
import { addLabel } from "../store/label/labelSlice";
import { clientsApi } from "../api";



export const useLabelsStore = () => {
  const dispatch = useDispatch();
  const { labels } = useSelector(state => state.labels);

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

  

   return {
    labels,
    startAddLabel,
    createLabelAndAssign 
  };
};