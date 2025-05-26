import React from 'react'

export const ProfileClient = () => {
  return (
    <div className='border'>
      <div className='d-flex'>
        <h3>Datos Personales</h3>

        <button type='button' className="btn btn-link">
          <i className="bi bi-pencil-square me-2"></i>
          Editar
        </button>
      </div>
      
      <div id='foto'>
        <h6>Foto</h6>
      </div>
      <div id='datos'>

      </div>
    </div>
  )
}
