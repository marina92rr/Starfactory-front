import { Navigate, Route, Routes } from 'react-router-dom'
import { OverviewClient, ReservationsClient, SalesClient, ProfileClient} from '../clients/components/clientPage'
import { ClientPage, ClientsPage, StorePage,RatesPage } from '../clients/pages'
import { AddNewSales } from '../clients/components/clientPage/AddNewSales'
import { LabelsPage } from '../clients/pages/LabelsPage'
import { Suscriptions } from '../clients/components/clientPage/Suscriptions'


export const AppRoutes = () => {
  return (
    <Routes>
        {/* ----------------------Clientes---------------------- */}
        <Route path='/' element={<ClientsPage/>}/>

        {/* ----------------------Cliente---------------------- */}
        <Route path=":idClient" element={<ClientPage />}>
          {/* Ruta índice: /clients/:dni */}
           <Route index element={<Navigate to="overview" replace />} />
          {/* Vista general */}
          <Route path="overview" element={<OverviewClient />} />
           {/* suscripciones */}
          <Route path="subscriptions" element={<Suscriptions/>} />
          {/* Reservas */}
          <Route path="reservations" element={<ReservationsClient/>} />
          {/* Ventas */}
          <Route path="sales" element={<SalesClient/>} />
           {/* AddVentas */}
          <Route path="addSales" element={<AddNewSales/>} />
          {/* Perfil */}
          <Route path="profile" element={<ProfileClient />} />
        </Route>

        {/* ----------------------Tienda---------------------- */}
        <Route path='/store' element={<StorePage/>}/>
        
        {/* ----------------------Servicios---------------------- */}
        <Route path='/rates' element={<RatesPage/>}/>

         {/* ----------------------Etiquetas---------------------- */}
        <Route path='/labels' element={<LabelsPage/>}/>
        
    </Routes>
  )
}
