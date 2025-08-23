import React from 'react'
import { useDispatch, useSelector } from "react-redux"
import { clientsApi } from "../api";
import { onDeleteSuscriptionClient, onLoadSuscriptionClient, onStartLoadingSuscriptions, onSetActiveSuscriptionClient, onUpdateSuscriptionClient } from '../store/sales/suscriptionClientSlice';
import { normalizeAllTextFields } from '../helpers/normalizeText';


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
const startUpdateSuscription = async (suscription) => {
  try {
    const p = normalizeAllTextFields(suscription);
    const { data } = await clientsApi.put(`/suscriptions/${p.idSuscriptionClient}`, p);
    const updated = data?.suscription ?? data ?? p;
    dispatch(onUpdateSuscriptionClient(updated));
    return updated;
  } catch (e) {
    console.error('Error actualizando suscripción:', e);
    throw e;
  }
};


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
