
import { BrowserRouter } from 'react-router-dom'
import { AppRoutes } from './router/AppRoutes'
import { Provider } from 'react-redux'
import {store} from "./store"

export const StarFactoryApp = () => {
  return (

    <Provider store={store}>
      <BrowserRouter>
        <AppRoutes/>
      </BrowserRouter>
    </Provider>
    
  )
}
