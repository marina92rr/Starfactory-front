import { useDispatch, useSelector } from "react-redux"
import { clientsApi } from "../api";
import { onAddNewProduct, onLoadProduct, onSetActiveProduct } from "../store/storeFactory/productSlice";



export const useProductStore = () => {
 
    const dispatch = useDispatch();
    const { products, activeProduct } = useSelector( state => state.product);


const setActiveProduct = (productData) =>{
    dispatch(onSetActiveProduct(productData))
}


// Nuevo cliente 
    const startSavingProduct = async(productSave) =>{
        try {
        
            const {data} = await clientsApi.post('/products', productSave);
            dispatch( onAddNewProduct(data));

        } catch (error) {
            console.log(error);
        }
    }

    const startLoadingProductsByCategory = async (idCategory) => {
        try {
          const { data } = await clientsApi.get(`/products/${idCategory}`);
          dispatch(onLoadProduct(data.products));
        } catch (error) {
          console.error('Error cargando productos por categoría:', error);
        }
      };
     //Lectura de categorias
        const starLoadingProducts = async() =>{
    
            try {
                //const {data} = await axios.get('http://localhost:4001/api/store');
                const {data} = await clientsApi.get('/products');
                const product = data.products;
    
                dispatch(onLoadProduct(product));
                
            } catch (error) {
                console.log('Error al cargar los eventos');
                console.log(error);
            }
        };
        
             return{
            //*Propiedades
            products,
            activeProduct,

            //*Metodos
            setActiveProduct,
            startSavingProduct,
            starLoadingProducts,
            startLoadingProductsByCategory
        
        }

    }