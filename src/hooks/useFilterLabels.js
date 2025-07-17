
import React, { useState, useEffect } from 'react'
import { clientsApi } from '../api'


  export const useFilterLabels = ({idClient}) => {
 // src/components/clientPage/LabelClient.jsx

  const [labels, setLabels] = useState([]);

  useEffect(() => {
    clientsApi.get(`/clients/${idClient}/arraylabels`)
      .then(({ data }) => {
        setLabels(data.labels || [])
      })
      .catch(err => {
        console.error('Error al cargar labels:', err)
        setLabels([])
      })
  }, [])

  return labels;

}
  

