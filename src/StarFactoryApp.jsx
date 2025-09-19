
import { BrowserRouter } from 'react-router-dom'
import { AppRoutes } from './router/AppRoutes'
import { Provider } from 'react-redux'
import { store } from "./store"
import { Sidebar } from './clients/components/Sidebar'
import { Navbar } from './clients/components/Navbar'
import { useAuthStore } from './hooks/useAuthStore'
import { useEffect } from 'react'



export const StarFactoryApp = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <AppWithAuth />
      </BrowserRouter>
    </Provider>
  );
};

//Condicion Barras navegacion si el status es authenticated 
const AppWithAuth = () => {
  const { status, checkAuthToken } = useAuthStore();

  useEffect(() => {
    checkAuthToken();
  }, []);

  if (status === 'checking') {
    return <div className="p-4">Cargando…</div>;
  }

  const isAuth = status === 'authenticated';

  return (
    <>
      {isAuth && <Navbar />}
      <div className={isAuth ? 'app-shell d-flex' : ''}>
        {isAuth && <Sidebar />}
        <div className="app-content">
          <AppRoutes />
        </div>
      </div>
    </>
  );
};
