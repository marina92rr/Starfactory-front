import { useDispatch, useSelector } from "react-redux"
import { clientsApi } from "../api";
import { onAddNewRate, onDeleteRate, onLoadRate, onResetRate, onSetActiveRate, onUpdateRate } from "../store/rates/rateSlice";

import { normalizeAllTextFields } from "../helpers/normalizeText";
import { onResetQuota } from "../store/rates/quotaSlice";



export const useRateStore = () => {

    const dispatch = useDispatch();
    const { rates, activeRate } = useSelector(state => state.rate);



    const setActiveRate = (rateData) => {
        dispatch(onSetActiveRate(rateData))
    }

    const startResetRatesPage = () => {
        dispatch(onResetRate());
        dispatch(onResetQuota());
    
    }


    // Nuevo cliente 
    const startSavingRate = async (rateSave, isEditMode) => {
        try {
            const normalizedRate = normalizeAllTextFields(rateSave); //  normalizar todos los campos string

            if (isEditMode) {
                await clientsApi.put(`/rates/${normalizedRate.idRate}`, normalizedRate);
                dispatch(onUpdateRate(rateSave));
                return;
            }
            await clientsApi.post('rates', normalizedRate);
            dispatch(onAddNewRate(rateSave));

        } catch (error) {
            console.log(error);
        }
    }

    //Lectura de categorias
    const starLoadingRates = async () => {
        try {
            const { data } = await clientsApi.get('rates');
            const rate = data.rates;

            dispatch(onLoadRate(rate));

        } catch (error) {
            console.log('Error al cargar los eventos');
            console.log(error);
        }
    };

    const startDeleteRate = async () => {
        const { data } = await clientsApi.delete(`/rates/${activeRate.idRate}`);
        dispatch(onDeleteRate(data));
    }

    return {
        //*Propiedades
        rates,
        activeRate,

        //*Metodos
        setActiveRate,
        startResetRatesPage,
        startSavingRate,
        starLoadingRates,
        startDeleteRate
    }

}