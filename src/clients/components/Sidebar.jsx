
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
  const {startResetClientsPage} = useClientsStore();
  const {startResetRatesPage} = useRateStore();
  const {startResetStorePage} = useCategoryStore();

  return (

    <div
      className="bg-light" style={{ minWidth: '220px', maxWidth: '250px', height: '100vh' }}
    >
      <h4 className='p-3'>Star Factory</h4>
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


  )
}
