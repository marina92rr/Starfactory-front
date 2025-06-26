
import { NavLink, useParams } from 'react-router-dom';
export const MenuClient = () => {
  // Opcional: si quieres mostrar el ID en cada enlace
  const { idClient } = useParams();

  // PATHS relativos, NUNCA empiezan por '/'.
  const links = [
    { name: 'Vista general', path: 'overview' },       // ruta índice: /clients/:id
    { name: 'Reservas', path: 'reservations' },
    { name: 'Ventas', path: 'sales' },
    { name: 'Perfil',        path: 'profile' } // /clients/:ID/profile
  ];

  return (
    <nav className="nav mb-4">
      {links.map(({ name, path }) => (
        <NavLink
          key={path}
          to={path}
          end={path === ''}    // para que solo active en /:id exacto
          className={({ isActive }) =>
            `nav-link ${isActive ? 'text-primary' : 'text-secondary'}`
          }
        >
          {name}
        </NavLink>
      ))}
    </nav>
  )
}
