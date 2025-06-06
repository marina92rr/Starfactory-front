import { configureStore } from "@reduxjs/toolkit"
import { clientSlice } from "./clients/clientSlice"
import { uiSlice } from "./ui/uiSlice"
import { labelSlice } from "./label/labelSlice"
import { categorySlice } from "./storeFactory/categorySlice"


export const store = configureStore({

    reducer:{
        client: clientSlice.reducer,
        ui: uiSlice.reducer,
        labels: labelSlice.reducer,
        category: categorySlice.reducer
    },

    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
          serializableCheck: false, // Desactiva la validación
        }),
})