
import { useEffect } from 'react';
import { useLabelsStore } from '../../../hooks/useLabelsStore';
import { useFilterLabels } from '../../../hooks/useFilterLabels';


export const LabelClient = ({ dni  }) => {

  const {startFilterLabels} =useLabelsStore();
  const labels = useFilterLabels({dni});

  //useEffect(() => {
  //  
  //  startFilterLabels(dni)
  //}, [dni]);
   // const labels = startFilterLabels({dni});


   if (!labels || labels.length === 0) return null;

  return (
    <div className="d-flex flex-wrap mt-1 ms-2">
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