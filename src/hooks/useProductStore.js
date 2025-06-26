import { useDispatch, useSelector } from "react-redux"
import { clientsApi } from "../api";
import { onAddNewProduct, onLoadProduct, onSetActiveProduct, onDeleteProduct, onUpdateProduct } from "../store/storeFactory/productSlice";



export const useProductStore = () => {
 
    const dispatch = useDispatch();
    const { products, activeProduct } = useSelector( state => state.product);

//Producto activo
const setActiveProduct = (productData) =>{
    dispatch(onSetActiveProduct(productData))
}


// Nuevo producto 
    const startSavingProduct = async(productSave,isEditMode) =>{
        try {
             if (isEditMode) {
                    const { data } = await clientsApi.put(`/products/${productSave.idProduct}`, productSave);
                    dispatch(onUpdateProduct(data));
                    return;
                  }
        
            const {data} = await clientsApi.post('/products', productSave);
            dispatch( onAddNewProduct(data));

        } catch (error) {
            console.log(error);
        }
    }

    const  startDeleteProduct = async(product)=>{
        const {data} = await clientsApi.delete(`/products/${product.idProduct}`);
        dispatch(onDeleteProduct(data));
    }


    //Lectura de productos por categorias
    const startLoadingProductsByCategory = async (idCategory) => {
        try {
          const { data } = await clientsApi.get(`/products/${idCategory}`);
          dispatch(onLoadProduct(data.products));
        } catch (error) {
          console.error('Error cargando productos por categoría:', error);
        }
      };
     //Lectura de productos
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
            startLoadingProductsByCategory,
            startDeleteProduct
        
        }

    }