import { useDispatch, useSelector } from "react-redux"
import { clientsApi } from "../api";
import { onAddNewRate, onLoadRate, onSetActiveRate } from "../store/rates/rateSlice";



export const useRateStore = () => {
 
    const dispatch = useDispatch();
    const { rates, activeRate} = useSelector( state => state.rate);


const setActiveRate = (rateData) =>{
    dispatch(onSetActiveRate(rateData))
}


// Nuevo cliente 
    const startSavingRate = async(rateSave) =>{
        try {
        
            const {data} = await clientsApi.post('rates', rateSave);
            dispatch( onAddNewRate(data));

        } catch (error) {
            console.log(error);
        }
    }

     //Lectura de categorias
        const starLoadingRates = async() =>{
    
            try {
                //const {data} = await axios.get('http://localhost:4001/api/store');
                const {data} = await clientsApi.get('rates');
                const rate = data.rates;
    
                dispatch(onLoadRate(rate));
                
            } catch (error) {
                console.log('Error al cargar los eventos');
                console.log(error);
            }
        };
        
             return{
            //*Propiedades
            rates,
            activeRate,

            //*Metodos
            setActiveRate,
            startSavingRate,
            starLoadingRates,
        }

    }