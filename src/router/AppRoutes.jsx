import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { ClientsPage } from '../clients'

export const AppRoutes = () => {
  return (
    <Routes>
        <Route path='/' element={<ClientsPage/>}/>
        
    </Routes>
  )
}
