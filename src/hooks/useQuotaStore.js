import { useDispatch, useSelector } from "react-redux"
import { clientsApi } from "../api";
import { onAddNewQuota, onDeleteQuota, onLoadQuota, onSetActiveQuota, onUpdateQuota } from "../store/rates/quotaSlice";
import { normalizeAllTextFields } from "../helpers/normalizeText";



export const useQuotaStore = () => {

    const dispatch = useDispatch();
    const { quotas, activeQuota } = useSelector(state => state.quota);

    //cuota
    const setActiveQuota = (quotaData) => {
        dispatch(onSetActiveQuota(quotaData))
    }
     

    // Crear cuota 
    const startSavingQuota = async (quotaSave, isEditMode) => {
        try {
            const normalizedQuota = normalizeAllTextFields(quotaSave); //  normalizar todos los campos string
            if (isEditMode) {
                const { data } = await clientsApi.put(`/quotas/${quotaSave.idQuota}`, normalizedQuota);
                dispatch(onUpdateQuota(data));
                return;
            } else {
                const { data } = await clientsApi.post('/quotas', normalizedQuota);
                dispatch(onAddNewQuota(data));
            }
        } catch (error) {
            console.log('Error al guardar la cuota:', error);
        }
    }

    //Leer cuotas de una tarifa
    const startLoadingQuotasByRate = async (idRate) => {
        try {
            const { data } = await clientsApi.get(`/quotas/${idRate}`);
            dispatch(onLoadQuota(data.quotas));
        } catch (error) {
            console.error('Error cargando cuotas por facturas:', error);
        }
    };
    //Lectura de cuotas
    const starLoadingQuotas = async () => {
        try {
            //const {data} = await axios.get('http://localhost:4001/api/store');
            const { data } = await clientsApi.get('/quotas');
            const quota = data.quotas;

            dispatch(onLoadQuota(quota));

        } catch (error) {
            console.log('Error al cargar los eventos');
            console.log(error);
        }
    };
    const startDeleteQuota = async (quota) => {
        try {
                   await clientsApi.delete(`/quotas/${quota.idQuota}`);
                   dispatch(onDeleteQuota());
                  
               } catch (error) {
                   console.error('Error al eliminar el producto:', error);
               }
    }

    return {
        //*Propiedades
        quotas,
        activeQuota,

        //*Metodos
        setActiveQuota,
        startSavingQuota,
        startLoadingQuotasByRate,
        starLoadingQuotas,
        startDeleteQuota
    }

}