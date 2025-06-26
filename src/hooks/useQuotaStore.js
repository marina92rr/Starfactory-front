import { useDispatch, useSelector } from "react-redux"
import { clientsApi } from "../api";
import { onAddNewQuota, onDeleteQuota, onLoadQuota, onSetActiveQuota, onUpdateQuota } from "../store/rates/quotaSlice";



export const useQuotaStore = () => {
 
    const dispatch = useDispatch();
    const { quotas, activeQuota } = useSelector( state => state.quota);

    //cuota
const setActiveQuota = (quotaData) =>{
    dispatch(onSetActiveQuota(quotaData))
}

// Crear cuota 
    const startSavingQuota = async(quotaSave, isEditMode) =>{
       try {
        if (isEditMode) {
            const { data } = await clientsApi.put(`/quotas/${quotaSave.idQuota}`, quotaSave);
            dispatch(onUpdateQuota(data));
            return;
        }
        //Fuerza los datos numéricos del formulario, para que se envien como Number
        const preparedQuota = {
            ...quotaSave,       //Desglosa el objeto
            numSession: Number(quotaSave.numSession),       //Guardamos como Number
            numPeriods: Number(quotaSave.numPeriods),       //Guardamos como Number
            price: Number(quotaSave.price)                  //Guardamos como Number
        };

        const { data } = await clientsApi.post('/quotas', preparedQuota);
        dispatch(onAddNewQuota(data));
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
    const starLoadingQuotas = async() =>{
        try {
            //const {data} = await axios.get('http://localhost:4001/api/store');
            const {data} = await clientsApi.get('/quotas');
            const quota = data.quotas;
    
            dispatch(onLoadQuota(quota));
            
        } catch (error) {
            console.log('Error al cargar los eventos');
            console.log(error);
        }
    };
    const  startDeleteQuota = async(quota)=>{
        const {data} = await clientsApi.delete(`/quotas/${quota.idQuota}`);
        dispatch(onDeleteQuota(data));
    }
        
             return{
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