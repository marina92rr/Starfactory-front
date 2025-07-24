
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { useClientsStore } from '../../hooks/useClientsStore';
import { useRateStore } from '../../hooks/useRateStore';
import { useCategoryStore } from '../../hooks/useCategoryStore';

const links = [
  { name: 'Clientes', path: '/' },
  { name: 'Tienda', path: '/store' },
  { name: 'Tarifas', path: '/rates' },
]

export const Sidebar = () => {

  const dispatch = useDispatch();
  const { startResetClientsPage } = useClientsStore();
  const { startResetRatesPage } = useRateStore();
  const { startResetStorePage } = useCategoryStore();

  return (


    <div
      className="bg-light mt-5" style={{ minWidth: '180px', maxWidth: '180px', height: '100vh' }}
    >
      <div className="bg-light mt-5"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '180px',
          height: '100vh',
          zIndex: 1000, // para que esté encima de otros elementos si hace falta
          overflowY: 'auto'
        }}>
        <h4 className='pt-5 p-2'
        >Star Factory</h4>
        <nav>
          {links.map(link => (
            <NavLink
              key={link.path}
              to={link.path}
              style={{ textDecoration: 'none' }}
              onClick={() => {
                if (link.name === 'Clientes') {
                  dispatch(startResetClientsPage());
                }
                if (link.name === 'Tienda') {
                  dispatch(startResetStorePage());
                }
                if (link.name === 'Tarifas') {
                  dispatch(startResetRatesPage());
                }
              }
              }
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


    </div>


  )
}
