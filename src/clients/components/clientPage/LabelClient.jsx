
// src/components/clientPage/LabelClient.jsx
import React, { useState, useEffect } from 'react'
import { clientsApi } from '../../../api'

export const LabelClient = ({ dni, refreshKey  }) => {
  const [labels, setLabels] = useState([])

  useEffect(() => {
    clientsApi
      .get(`/clients/${dni}/labels`)
      .then(({ data }) => {
        setLabels(data.labels || [])
      })
      .catch(err => {
        console.error('Error al cargar labels:', err)
        setLabels([])
      })
  }, [dni, refreshKey])

  if (labels.length === 0) return null

  return (
    <div className="d-flex flex-wrap mt-1">
      {labels.map((label, i) => (
        <span
          key={i}
          className="badge"
          style={{
            fontSize: '0.9rem',
            backgroundColor: label.color,
            color: 'black',
            padding: '5px 10px',
            borderRadius: '25px',
            marginRight: '8px'
          }}
        >
          {label.name.toUpperCase()}
        </span>
      ))}
    </div>
  )
}