
//Hooks Formulario

import { useEffect, useMemo, useState } from "react"


export const useForm = ( initialForm = {}, formValidations ={}) => {

    const [formState, setFormState] = useState(initialForm);    //valores form
    const [formValidation, setFormValidation] = useState({});   //Validar campos
    


    useEffect(() => {
        createValidators()
    }, [formState]);

    useEffect(() => {
        setFormState()
    }, [initialForm]);


    const isFormValid = useMemo( () =>{
        for (const formValue of Object.keys( formValidation )) {
            if ( formValidation[formValue] !== null ) return false;
        }
        return true;
    }, [ formValidation ])

    //Actualizar Valor
    const onInputChange = ({target}) =>{
        const {name, value} = target;
        setFormState({
            ...formState,
            [ name ]: value
        });
    }

    //Convertir si/no en True/false

    const handleChange = e => {
        const { name, type, value } = e.target
        setFormState({ 
            ...formState, 
            [e.target.name]: e.target.value    
        });
      }
   
    //Resetear formulario
    const onResetForm = () =>{
        setFormState(initialForm);
    }



    //Validaciones
    const createValidators = () =>{ 
        const formCheckedValues = {};   
        for (const formField of Object.keys(formValidations)){
            const [fn, errorMessage] = formValidations[formField];  
            formCheckedValues[`${ formField }Valid`] = fn( formState[formField] ) ? null : errorMessage;
        }
        setFormValidation(formCheckedValues);
    }


  return {

    ...formState,
    formState,
    onInputChange,
    handleChange,
    onResetForm,
    createValidators,

    ...formValidation,
    isFormValid
    
  }
}
