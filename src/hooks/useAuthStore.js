
import { useDispatch, useSelector } from "react-redux"
import { onChecking, onLogin, onLogout, clearErrorMessage, onLoadUsers, onSetActiveUser, onUpdateUser, onRegisterUser } from "../store/auth/authSlice";
import { clientsApi } from "../api";
import { onLogoutClients, onSetActiveClient } from "../store/clients/clientSlice";



//Interaccion del auth con nuestro store


export const useAuthStore = () => {

    const { status, user, users, activeUser, errorMessage } = useSelector(state => state.auth);
    const dispatch = useDispatch();

    //Proceso de login que llega al backend/ no es sincrono porque no se activa automaticamente

    const startLogin = async ({ email, password }) => {
        dispatch(onChecking());
        try {
            const { data } = await clientsApi.post('auth/login', { email, password });  //Const de los datos de email y password
            console.log('LOGIN data =', data);

            localStorage.setItem('token', data.token);      //Almacenar token. Token: Codigo para saber si el registro existe
            localStorage.setItem('token-init-date', new Date().getTime()); //Almacenar la fecha de creacion de token

            dispatch(onLogin({ name: data.name, uid: data.uid, isAdmin: data.isAdmin, email: data.email }));  //rescatamos name y uid
           

        } catch (error) {
            //console.log('LOGIN ERROR:', error?.response?.status, error?.response?.data);
            const msg =
                error?.response?.status === 401
                    ? 'Credenciales incorrectas'
                    : error?.response?.data?.msg || 'Error al conectar con el servidor';

            dispatch(onLogout(msg));
            setTimeout(() => dispatch(clearErrorMessage()), 10);
        }
    }

    const startRegister = async ({ name, email, password }) => {
       
        try {
            const { data } = await clientsApi.post('auth/register', { name, email, password });
            // No tocar localStorage ni onLogin
            dispatch(onRegisterUser({
                uid: data.uid,
                name: data.name,
                email: data.email,
                isAdmin: !!data.isAdmin,
            }));
            // Si quieres refrescar la lista de usuarios:
            await startLoadingtUsers();
        } catch (error) {
            console.log('REGISTER ERROR:', error?.response?.data);
            setTimeout(() => dispatch(clearErrorMessage()), 10);
        }
    }

    //Eutentifica los datos del token
    const checkAuthToken = async () => {
        const token = localStorage.getItem('token');    //Geto.token

        if (!token) return dispatch(onLogout());     //Si no hay token se deslogea

        try {
            const { data } = await clientsApi.get('/auth/renew');
            localStorage.setItem('token', data.token);

            localStorage.setItem('token', data.token);      //Almacenar token. Token: Codigo para saber si el registro existe
            localStorage.setItem('token-init-date', new Date().getTime()); //Almacenar la fecha de creacion de token
            dispatch(onLogin({ name: data.name, uid: data.uid, isAdmin: data.isAdmin, email: data.email }));  //rescatamos name y uid

        } catch (error) {
            localStorage.clear(); //Limpiamos los token de localstore
            dispatch(onLogout());     //Si no hay token se deslogea

        }
    }

    const startLogout = () => {
        localStorage.clear();
        dispatch(onLogoutClients());
        dispatch(onLogout());
        console.log('Saliendo...');
    }

    const setActiveUser = (usersData) => {
        dispatch(onSetActiveUser(usersData));
    }


    const startLoadingtUsers = async () => {
        try {
            const { data } = await clientsApi.get('auth/users');
            const users = data.users;
            dispatch(onLoadUsers(users));
        } catch (error) {
            console.log('Error al cargar los usuarios');
            console.log(error);
        }
    };

    const starUpdateUser = async (userSave) => {

        try {
            const { data } = await clientsApi.put(`auth/${activeUser.idUser}`, userSave);
            dispatch(onUpdateUser(data));
            dispatch(startLoadingtUsers());

        } catch (error) {
            console.log('Error al actualizar el usuario');
            console.log(error);
        }
    };

    const startDeleteUser = async (activeUser) => {
        await clientsApi.delete(`auth/${activeUser.idUser}`);
        dispatch(onLoadUsers());
        dispatch(startLoadingtUsers());

    };

    const starEmailSend = async(email) => {

        try {
            await clientsApi.post('auth/resetPassword', {email: email.trim().toLowerCase()});
            dispatch(onEmailSend());
        } catch (error) {
             console.log('Error al reenviar el email');
            console.log(error);
        }
        
    }

    return {
        //*Propiedades
        status,
        user,
        errorMessage,
        isAdmin: !!user?.isAdmin,   // <- aquí lo expones listo para usar
        users,
        activeUser,

        //*Métodos
        startLogin,
        startRegister,
        checkAuthToken,
        startLogout,
        startLoadingtUsers,
        starUpdateUser,
        startDeleteUser,
        setActiveUser,
        starEmailSend

    }
}