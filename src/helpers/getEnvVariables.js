
//Desestructurar Variables de entorno .ENV
export const getEnvVariables = () =>{

    import.meta.env;        //Variables de entorno

    return {
        ...import.meta.env     
    }
}