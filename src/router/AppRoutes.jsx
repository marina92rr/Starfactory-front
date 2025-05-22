import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { OverviewClient, ProfileClient } from '../clients/components/clientPage'
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
          {/* overview */}
          <Route path="overview" element={<OverviewClient />} />
          {/* profile */}
          <Route path="profile" element={<ProfileClient />} />
        </Route>

        {/* ----------------------Tienda---------------------- */}
        <Route path='/store' element={<StorePage/>}/>
        
        {/* ----------------------Servicios---------------------- */}
        <Route path='/services' element={<ServicesPage/>}/>
        
    </Routes>
  )
}
