import { useEffect } from 'react'
import { useForm } from '../../hooks/useForm';
import { useAuthStore } from '../../hooks/useAuthStore'
import Swal from 'sweetalert2';



const registerFormFields = {
    registerName: '',
    registerEmail: '',
    registerPassword: '',
    registerPassword2: ''
}

export const RegisterPage = () => {


    const { startRegister, errorMessage } = useAuthStore();


    const { registerName, registerEmail, registerPassword, registerPassword2, onInputChange: onRegisterInputChange } = useForm(registerFormFields);

    const registerSubmit = () => {
        event.preventDefault();     //Evitar que recarge la pagina
        //Validaciones de password
        if (registerPassword !== registerPassword2) {
            Swal.fire(' Error en registro', 'Las contraseñas no son iguales', 'error');
            return
        }

        startRegister({ name: registerName, email: registerEmail, password: registerPassword });
    }

    
    // Opcional: mostrar error del backend
    useEffect(() => {
        if (errorMessage) {
            Swal.fire('Error', errorMessage, 'error');
        }
    }, [errorMessage]);

    return (
        <div className='m-5'>
            <div className='pt-5 align-items-center'>
                <h1 className='mb-4'>Registrar Usuario</h1>
            </div>

            <div className="col-3 border rounded p-4 bg-light">

                <form onSubmit={registerSubmit}>
                    <div className="form-group mb-2">
                        <label
                            htmlFor="registerName"
                            className="form-label">Nombre:
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            name='registerName'
                            value={registerName}
                            onChange={onRegisterInputChange}
                        />
                    </div>
                    <div className="form-group mb-3">
                        <label
                            htmlFor="registerEmail"
                            className="form-label">Correo:
                        </label>
                        <input
                            type="email"
                            className="form-control"
                            name='registerEmail'
                            value={registerEmail}
                            onChange={onRegisterInputChange}
                        />
                    </div>
                    <div className="form-group mb-3">
                        <label
                            htmlFor="registerPassword"
                            className="form-label">Contraseña:
                        </label>
                        <input
                            type="password"
                            className="form-control"
                            name='registerPassword'
                            value={registerPassword}
                            onChange={onRegisterInputChange}
                        />
                    </div>

                    <div className="form-group mb-3">
                        <label
                            htmlFor="registerPassword2"
                            className="form-label">Repita la contraseña:
                        </label>
                        <input
                            type="password"
                            className="form-control"
                            name='registerPassword2'
                            value={registerPassword2}
                            onChange={onRegisterInputChange}
                        />
                    </div>

                    <div className="text-end mb-3">
                        <input
                            type="submit"
                            className="btn btn-primary"
                            value="Crear cuenta" />
                    </div>
                </form>
            </div>
        </div>

    )
}
