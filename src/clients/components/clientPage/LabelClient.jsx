

import { useEffect } from 'react';
//import { useFilterLabels } from '../../../hooks/useFilterLabels';
import { useClientsStore } from '../../../hooks/useClientsStore';


export const LabelClient = ({ idClient }) => {

  const { filteredLabelsByClient, startLoadingFilteredLabels } = useClientsStore();

  useEffect(() => {
    startLoadingFilteredLabels(idClient);
  }, []); // Mejor añadir dependencias

  // ← Aquí usas el selector, SÓLO las etiquetas de este cliente
  const labels = filteredLabelsByClient[idClient] || [];

  return (
    <div className="d-flex flex-wrap mt-1 ms-2">
      <ul className="d-flex gap-2 list-unstyled m-0 p-0">
        {labels.map(label => (
          <li key={label.idLabel}>
            <span
              className="badge rounded-pill fw-semibold"
              style={{
                backgroundColor: label.color,
                color: '#222',
                fontSize: '1rem',
                padding: '8px 18px',
                minWidth: 'fit-content',
                letterSpacing: '0.02em'
              }}
            >
              {label.name}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );

}