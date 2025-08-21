
import { BrowserRouter } from 'react-router-dom'
import { AppRoutes } from './router/AppRoutes'
import { Provider } from 'react-redux'
import { store } from "./store"
import { Sidebar } from './clients/components/Sidebar'
import { Navbar } from './clients/components/Navbar'



export const StarFactoryApp = () => {
  return (

   <Provider store={store}>
      <BrowserRouter>
        <Navbar />
        <div className="app-shell d-flex">
          <Sidebar />
          <div className="app-content">
            <AppRoutes />
          </div>
        </div>
      </BrowserRouter>
    </Provider>

  )
}
