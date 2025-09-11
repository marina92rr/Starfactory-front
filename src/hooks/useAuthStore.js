
import { useDispatch, useSelector } from "react-redux"
import { onChecking, onLogin, onLogout, clearErrorMessage } from "../store/auth/authSlice";
import { clientsApi } from "../api";



//Interaccion del auth con nuestro store


export const useAuthStore = () =>{

    const { status, user, errorMessage} = useSelector( state => state.auth);
    const dispatch = useDispatch();

    //Proceso de login que llega al backend/ no es sincrono porque no se activa automaticamente

    const startLogin = async({email,password}) =>{
        dispatch( onChecking());
        try {
            const {data} = await calendarApi.post('auth', {email, password});  //Const de los datos de email y password

            localStorage.setItem('token', data.token);      //Almacenar token. Token: Codigo para saber si el registro existe
            localStorage.setItem('token-init-date', new Date().getTime() ); //Almacenar la fecha de creacion de token

            dispatch( onLogin({ name: data.name, uid: data.uid}));  //rescatamos name y uid

        } catch (error) {
            dispatch( onLogout('Credenciales incorrectas'));
            setTimeout( () =>{
                dispatch(clearErrorMessage());
            }, 10);
        }
    }

    const startRegister = async({ name, email, password}) =>{
        dispatch( onChecking());
        try {
            const {data} = await clientsApi.post('auth/register', {name, email, password});
            localStorage.setItem('token', data.token);      //Almacenar token. Token: Codigo para saber si el registro existe
            localStorage.setItem('token-init-date', new Date().getTime() ); //Almacenar la fecha de creacion de token
            dispatch( onLogin({ name: data.name, uid: data.uid}));  //rescatamos name y uid

        } catch (error) {
            dispatch( onLogout(error.response.data?.msg || '--'));
            setTimeout( () =>{
                dispatch(clearErrorMessage());
            }, 10);
        }
    }

    const checkAuthToken = async() =>{
        const token = localStorage.getItem('token');    //Geto.token

        if( !token) return dispatch( onLogout());     //Si no hay token se deslogea

        try {
            const {data} = await clientsApi.get('/auth/renew');
            localStorage.setItem('token', data.token);

            localStorage.setItem('token', data.token);      //Almacenar token. Token: Codigo para saber si el registro existe
            localStorage.setItem('token-init-date', new Date().getTime() ); //Almacenar la fecha de creacion de token
            dispatch( onLogin({ name: data.name, uid: data.uid}));  //rescatamos name y uid

        } catch (error) {
            localStorage.clear(); //Limpiamos los token de localstore
            dispatch( onLogout());     //Si no hay token se deslogea
            
        }
    }

    const startLogout = () =>{
        localStorage.clear();
       // dispatch(onLogoutCalendar());
        dispatch( onLogout());
    }

    return {
        //*Propiedades
        status, 
        user,
        errorMessage,

        //*Métodos
        startLogin,
        startRegister,
        checkAuthToken,
        startLogout

    }
}