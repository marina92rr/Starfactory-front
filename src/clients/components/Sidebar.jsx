
import React from 'react'

export const Sidebar = () => {
  return (
       
    <div
      className="col-2 bg-light pt-5 m-0  "
      style={{ minHeight: '100vh', borderRight: '1px solid #ccc' }}
    >
          <ul className="nav flex-column">
            <li className="nav-item"><a className="" href="#">Dashboard</a></li>
            <li className="nav-item"><a className="nav-link" href="#">Perfil</a></li>
            <li className="nav-item"><a className="nav-link" href="#">Ajustes</a></li>
          </ul>
       
    </div>
    
    
  )
}
