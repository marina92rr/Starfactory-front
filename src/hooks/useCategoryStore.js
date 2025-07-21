import { useDispatch, useSelector } from "react-redux"
import { onAddNewCategory, onDeleteCategory, onLoadCategory, onResetCategory, onSetActiveCategory, onUpdateCategory } from "../store/storeFactory/categorySlice";
import { clientsApi } from "../api";
import { normalizeAllTextFields } from "../helpers/normalizeText";
import { onResetProduct } from "../store/storeFactory/productSlice";



export const useCategoryStore = () => {
 
    const dispatch = useDispatch();
    const { categories, activeCategory} = useSelector( state => state.category);


const setActiveCategory = (categoryData) =>{
    dispatch(onSetActiveCategory(categoryData))
}

const startResetStorePage = () => {
    dispatch(onResetCategory());
    dispatch(onResetProduct());
}

// Actualizar o crear una categoria 
    const startSavingCategory = async(categorytSave, isEditMode) =>{
        try {
            const normalizedCategory = normalizeAllTextFields(categorytSave); //  normalizar todos los campos string
            
            if (isEditMode) {
                const { data } = await clientsApi.put(`/category/${normalizedCategory.idCategory}`, normalizedCategory);
                dispatch(onUpdateCategory(data));
            return;
            }
            const {data} = await clientsApi.post('category', normalizedCategory);
            dispatch( onAddNewCategory(data));

        } catch (error) {
            console.log(error);
        }
    }

     //Lectura de categorias
        const starLoadingCategories = async() =>{
    
            try {
                //const {data} = await axios.get('http://localhost:4001/api/store');
                const {data} = await clientsApi.get('category');
                const category = data.categories;
    
                dispatch(onLoadCategory(category));
                
            } catch (error) {
                console.log('Error al cargar los eventos');
                console.log(error);
            }
        };
        const  startDeleteCategory = async()=>{
            const {data} = await clientsApi.delete(`/category/${activeCategory.idCategory}`);
            dispatch(onDeleteCategory(data));
        }
        
             return{
            //*Propiedades
            categories,
            activeCategory,

            //*Metodos
            setActiveCategory,
            startResetStorePage,
            starLoadingCategories,
            startSavingCategory,
            startDeleteCategory
        
        }

    }