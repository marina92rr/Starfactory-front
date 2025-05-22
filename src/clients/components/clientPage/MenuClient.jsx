
import { NavLink, useParams } from 'react-router-dom';
export const MenuClient = () => {
  // Opcional: si quieres mostrar el DNI en cada enlace
  const { dni } = useParams();

  // PATHS relativos, NUNCA empiezan por '/'.
  const links = [
    { name: 'Vista general', path: 'overview' },       // ruta índice: /clients/:dni
    { name: 'Perfil',        path: 'profile' } // /clients/:dni/profile
  ];

  return (
    <nav className="nav mb-4">
      {links.map(({ name, path }) => (
        <NavLink
          key={path}
          to={path}
          end={path === ''}    // para que solo active en /:dni exacto
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
