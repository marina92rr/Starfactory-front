

import React, { useEffect } from 'react'
import { useAuthStore } from '../../hooks/useAuthStore'
import { useForm } from '../../hooks/useForm'
import Swal from 'sweetalert2'

const logingFormFields = {
    loginEmail: '',
    loginPassword: ''
}



export const LoginPage = () => {

    const { startLogin, errorMessage } = useAuthStore();
    const { loginEmail, loginPassword, onInputChange: onLoginInputChange } = useForm(logingFormFields);

    const loginSubmit = () => {
        event.preventDefault();
        startLogin({ email: loginEmail, password: loginPassword });
    }

    useEffect(() => {

        if (errorMessage !== undefined) {
            Swal.fire('Error en la Autentificación', errorMessage, 'error');
        };
    }, [errorMessage])

    return (
        <div className='m-5'>
            <div className='pt-5 align-items-center'>
                <h1 className='mb-4'>Login</h1>
            </div>
            
                <div className="col-3 border rounded p-3 bg-light">
                    
                    <form onSubmit={loginSubmit}>
                        <div className="form-group mb-3">
                            <label 
                                className="form-label"
                                htmlFor="loginEmail">Correo</label>
                            <input
                                type="text"
                                className="form-control"
                                name="loginEmail"
                                value={loginEmail}
                                onChange={onLoginInputChange}
                            />
                        </div>
                        <div className="form-group mb-3">
                            <label 
                                htmlFor="loginPassword"
                                className="form-label"
                            >Contraseña</label>
                            <input
                                type="password"
                                className="form-control"
                                name="loginPassword"
                                value={loginPassword}
                                onChange={onLoginInputChange}
                            />
                        </div>
                        <div className="form-group mb-3">
                            <input
                                type="submit"
                                className="btn btn-primary"
                                value="Login"
                            />
                        </div>
                    </form>
                </div>
            
        </div>
    )
}
