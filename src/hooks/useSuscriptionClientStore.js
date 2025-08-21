import React from 'react'
import { useDispatch, useSelector } from "react-redux"
import { clientsApi } from "../api";
import { onDeleteSuscriptionClient, onLoadSuscriptionClient, onStartLoadingSuscriptions, onSetActiveSuscriptionClient, onUpdateSuscriptionClient } from '../store/sales/suscriptionClientSlice';

export const useSuscriptionClientStore = () => {

  const dispatch = useDispatch();
  const { suscriptionClients, activeSuscriptionClient, isLoadingSuscription } = useSelector(state => state.suscriptionClient);


  const setActiveSuscriptionClient = (suscriptionClientData) => {
    dispatch(onSetActiveSuscriptionClient(suscriptionClientData))
  }

  const startLoadingSuscriptionsByClient = async (idClient) => {
    dispatch(onStartLoadingSuscriptions());

    try {
      const { data } = await clientsApi.get(`/suscriptions/${idClient}`);
      dispatch(onLoadSuscriptionClient(data.suscriptions));
    } catch (error) {
      console.error('Error al cargar suscripciones', error);
      dispatch(onLoadSuscriptionClient([])); // fallback vacío si falla
    }
  };

  //Actualizar suscripción
  // Nuevo cliente 
      const startUpdateSuscription = async (suscriptionClientSave, isEditMode) => {
          try {
              const normalizedRate = normalizeAllTextFields(rateSave); //  normalizar todos los campos string
  
              if (isEditMode) {
                  await clientsApi.put(`/suscriptions/${normalizedRate.idSuscriptionClient}`, normalizedRate);
                  dispatch(onUpdateSuscriptionClient(suscriptionClientSave));
                  return;
              }
             
          } catch (error) {
              console.log(error);
          }
      }
  const startDeleteSuscriptionClient = async (suscription) => {
    try {
      const { data } = await clientsApi.delete(`/suscriptions/${suscription.idSuscriptionClient}`);
      dispatch(onDeleteSuscriptionClient(data))
    } catch (err) {
      console.error('Error al eliminar suscripción', err)
    }
  }


  return {
    //* Propiedades
    suscriptionClients,
    activeSuscriptionClient,
    isLoadingSuscription,

    //* Métodos
    setActiveSuscriptionClient,
    startLoadingSuscriptionsByClient,
    startDeleteSuscriptionClient,
    startUpdateSuscription
  };


}
