import { configureStore } from "@reduxjs/toolkit"
import { clientSlice } from "./clients/clientSlice"
import { uiSlice } from "./ui/uiSlice"
import { labelSlice } from "./label/labelSlice"
import { categorySlice } from "./storeFactory/categorySlice"
import { productSlice } from "./storeFactory/productSlice"
import { rateSlice } from "./rates/rateSlice"
import { quotaSlice } from "./rates/quotaSlice"


export const store = configureStore({

    reducer:{
        client: clientSlice.reducer,
        ui: uiSlice.reducer,
        labels: labelSlice.reducer,
        category: categorySlice.reducer,
        product: productSlice.reducer,
        rate: rateSlice.reducer,
        quota: quotaSlice.reducer,
    },

    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
          serializableCheck: false, // Desactiva la validación
        }),
})