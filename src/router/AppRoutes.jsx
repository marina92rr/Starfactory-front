import { Navigate, Route, Routes } from 'react-router-dom';
import { OverviewClient, ReservationsClient, SalesClient, ProfileClient } from '../clients/components/clientPage';
import { ClientPage, ClientsPage, StorePage, RatesPage } from '../clients/pages';
import { AddNewSales } from '../clients/components/clientPage/AddNewSales';
import { LabelsPage } from '../clients/pages/LabelsPage';
import { Accounting } from '../clients/pages/Accounting';
// Import the new monthly summary page
import { MonthlySummary } from '../clients/pages/MonthlySummary';
import { LoginPage } from '../auth/pages/LoginPage';
import { RegisterPage } from '../auth/pages/RegisterPage';
import { useAuthStore } from '../hooks/useAuthStore';
import { ProfileUserPage } from '../auth/pages/ProfileUserPage';

export const AppRoutes = () => {

  const { status } = useAuthStore();


  if (status === 'checking') {
    return (
      <h3>Cargando...</h3>
    );
  }

  return (
    <Routes>
      {
        (status === 'not-authenticated')
          ? (
            <>
              {/* ----------------------Login/Register---------------------- */}
              < Route path='/auth/login' element={<LoginPage />} />
              <Route path="/*" element={<Navigate to='/auth/login'/>}/>
              
            </>
          )
          :
          (
            <>
              {/* ----------------------Clientes---------------------- */}
              < Route path='/' element={<ClientsPage />} />
              <Route path="/*" element={<Navigate to='/'/>}/>
              {/* ----------------------Cliente---------------------- */}
              <Route path=':idClient' element={<ClientPage />}>
                {/* Ruta índice: /clients/ */}
                <Route index element={<Navigate to='overview' replace />} />
                {/* Vista general */}
                <Route path='overview' element={<OverviewClient />} />
                {/* Reservas */}
                <Route path='reservations' element={<ReservationsClient />} />
                {/* Ventas */}
                <Route path='sales' element={<SalesClient />} />
                {/* AddVentas */}
                <Route path='addSales' element={<AddNewSales />} />
                {/* Perfil */}
                <Route path='profile' element={<ProfileClient />} />
              </Route>

              {/* ----------------------Tienda---------------------- */}
              <Route path='/store' element={<StorePage />} />

              {/* ----------------------Servicios---------------------- */}
              <Route path='/rates' element={<RatesPage />} />

              {/* ----------------------Etiquetas---------------------- */}
              <Route path='/labels' element={<LabelsPage />} />

              {/* ----------------------Contabilidad---------------------- */}
              <Route path='/accounting' element={<Accounting />} />

              {/* ----------------------Resumen mensual---------------------- */}
              <Route path='/monthly-summary' element={<MonthlySummary />} />

             
                <>
                  {/* ----------------------Registro de usuarios (solo admin)---------------------- */}
                  <Route path='/register' element={<RegisterPage />} />
                </>

                 <>
                  {/* ----------------------Perfil de usuario---------------------- */}
                  <Route path='/profileUser' element={<ProfileUserPage />} />
                </>
             
            </>

          )
      }

    </Routes>
  );
};