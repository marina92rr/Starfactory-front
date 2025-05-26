import { configureStore } from "@reduxjs/toolkit"
import { clientSlice } from "./clients/clientSlice"
import { uiSlice } from "./ui/uiSlice"
import { labelSlice } from "./label/labelSlice"


export const store = configureStore({

    reducer:{
        client: clientSlice.reducer,
        ui: uiSlice.reducer,
        labels: labelSlice.reducer
    },

    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
          serializableCheck: false, // Desactiva la validación
        }),
})