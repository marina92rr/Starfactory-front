import { useDispatch, useSelector } from "react-redux"
import { clientsApi } from "../api";
import { onAddNewQuota, onLoadQuota, onSetActiveQuota } from "../store/rates/quotaSlice";



export const useQuotaStore = () => {
 
    const dispatch = useDispatch();
    const { quotas, activeQuota } = useSelector( state => state.quota);

    //cuota
const setActiveQuota = (quotaData) =>{
    dispatch(onSetActiveQuota(quotaData))
}

// Crear cuota 
    const startSavingQuota = async(quotaSave) =>{
       try {
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
        
             return{
            //*Propiedades
            quotas,
            activeQuota,

            //*Metodos
            setActiveQuota,
            startSavingQuota,
            startLoadingQuotasByRate,
            starLoadingQuotas,
        }

    }