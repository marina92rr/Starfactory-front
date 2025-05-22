
import React from 'react';
import { NavLink } from 'react-router-dom';

const links = [
  { name: 'Clientes', path: '/' },
  { name: 'Tienda', path: '/store' },
  { name: 'Servicios', path: '/services' },
]

export const Sidebar = () => {
  return (

    <div
      className="col-1 bg-light pt-5 px-0  "
      style={{ left: '0', position: 'fixed', minHeight: '100vh', borderRight: '1px solid #ccc' }}
    >
      <h4 className='p-3'>Star Factory</h4>
      <nav>
        {links.map(link => (
          <NavLink
            key={link.path}
            to={link.path}
            style={{ textDecoration: 'none' }}
          >
            {({ isActive }) => (
              <div className='p-3' style={{ background: isActive ? '#007bff' : 'none', color: isActive ? '#ffffff' : '#000000' }}>
                {/* Nombre siempre visible; activo en azul */}
                <span>
                  {link.name}
                </span>
              </div>
            )}
          </NavLink>
        ))}
      </nav>

    </div>


  )
}
