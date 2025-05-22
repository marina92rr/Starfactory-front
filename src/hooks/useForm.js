
//Hooks Formulario

import { useEffect, useMemo, useState } from "react";



export const useForm = ( initialForm = {}, formValidations ={}) => {

    const [formState, setFormState] = useState(initialForm);    //valores form
    const [formValidation, setFormValidation] = useState({});   //Validar campos
    

    useEffect(() => {
        setFormState()
    }, [initialForm]);

    useEffect(() => {
        createValidators();
      }, [formState]);


      const isFormValid = useMemo(() => {
        return Object.values(formValidation).every((val) => val === null);
      }, [formValidation]);
    
      const onInputChange = ({ target }) => {
        const { name, type, checked, value } = target;
        setFormState((prev) => ({
          ...prev,
          [name]: type === 'checkbox' ? checked : value,
        }));
      };
    
      const onResetForm = () => setFormState(initialForm);
    
      const createValidators = () => {
        const validationResults = {};
        for (const field of Object.keys(formValidations)) {
          const [fn, errorMessage] = formValidations[field];
          validationResults[`${field}Valid`] =
            fn(formState[field]) ? null : errorMessage;
        }
        setFormValidation(validationResults);
      };
    
      return {
        ...formState,
        formState,
        onInputChange,
        onResetForm,
        ...formValidation,
        isFormValid,
      };
    };
    