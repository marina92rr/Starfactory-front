
//Acceder a las variables de entorno de ENV
export const getEnvVariables = () =>{
    import.meta.env;

    return {
        ...import.meta.env
    }
}