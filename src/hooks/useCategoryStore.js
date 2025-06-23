import { useDispatch, useSelector } from "react-redux"
import { onAddNewCategory, onLoadCategory, onSetActiveCategory } from "../store/storeFactory/categorySlice";
import { clientsApi } from "../api";



export const useCategoryStore = () => {
 
    const dispatch = useDispatch();
    const { categories, activeCategory} = useSelector( state => state.category);


const setActiveCategory = (categoryData) =>{
    dispatch(onSetActiveCategory(categoryData))
}


// Nuevo cliente 
    const startSavingCategory = async(categorytSave) =>{
        try {
        
            const {data} = await clientsApi.post('category', categorytSave);
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
        
             return{
            //*Propiedades
            categories,
            activeCategory,

            //*Metodos
            setActiveCategory,
            starLoadingCategories,
            startSavingCategory
        
        }

    }