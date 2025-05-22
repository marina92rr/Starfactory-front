import { Route, Routes } from 'react-router-dom'
import { OverviewClient, ReservationsClient, SalesClient, ProfileClient} from '../clients/components/clientPage'
import { ClientPage, ClientsPage, ServicesPage, StorePage } from '../clients/pages'


export const AppRoutes = () => {
  return (
    <Routes>
        {/* ----------------------Clientes---------------------- */}
        <Route path='/' element={<ClientsPage/>}/>

        {/* ----------------------Cliente---------------------- */}
        <Route path=":dni" element={<ClientPage />}>
          {/* Ruta índice: /clients/:dni */}
          <Route index element={<OverviewClient />} />
          {/* Vista general */}
          <Route path="overview" element={<OverviewClient />} />
          {/* Reservas */}
          <Route path="reservations" element={<ReservationsClient/>} />
          {/* Ventas */}
          <Route path="sales" element={<SalesClient/>} />
          {/* Perfil */}
          <Route path="profile" element={<ProfileClient />} />
        </Route>

        {/* ----------------------Tienda---------------------- */}
        <Route path='/store' element={<StorePage/>}/>
        
        {/* ----------------------Servicios---------------------- */}
        <Route path='/services' element={<ServicesPage/>}/>
        
    </Routes>
  )
}
