
import React, { useState } from 'react'

export const DropdownLabel = () => {

   const [selectedLabels, setSelectedLabels] = useState([]);    //Array de labels seleccionados
   const [searchTerm, setSearchTerm] = useState("");

   const toggleLabel = (id) =>{
    setSelectedLabels((prev) =>{
        prev.includes(id)
        ? prev.filter((x) => x !== id)
        : [...prev, id]
    })
   }

   const filteredLabels = allLabels.filter(label =>
  label.name.toUpperCase().includes(searchTerm.toUpperCase())
);


  return (
    <div className="dropdown">
  <button
    className="btn btn-outline-secondary dropdown-toggle"
    type="button"
    id="dropdownLabels"
    data-bs-toggle="dropdown"
    aria-expanded="false"
  >
    Etiqueta
  </button>

  <ul className="dropdown-menu p-3" aria-labelledby="dropdownLabels" style={{ minWidth: '300px', maxHeight: '400px', overflowY: 'auto' }}>
    <li className="mb-2">
      <input
        type="text"
        className="form-control"
        placeholder="Buscar etiqueta"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </li>
    {filteredLabels.map(label => (
      <li key={label._id}>
        <label className="form-check-label d-flex align-items-center">
          <input
            type="checkbox"
            className="form-check-input me-2"
            checked={selectedLabels.includes(label._id)}
            onChange={() => toggleLabel(label._id)}
          />
          <span
            className="me-2"
            style={{
              backgroundColor: label.color.startsWith('#') ? label.color : `#${label.color}`,
              borderRadius: '50%',
              width: '12px',
              height: '12px',
              display: 'inline-block',
            }}
          ></span>
          {label.name}
        </label>
      </li>
    ))}
  </ul>
</div>
    
  )
}
