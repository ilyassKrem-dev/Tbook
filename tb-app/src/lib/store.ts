
import { configureStore} from "@reduxjs/toolkit";
import convoRedux from "@/assets/redux/convoRedux";
import { persistStore, persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER, } from 'redux-persist';
import storage from "./storage/config";
import { ConvoType } from "@/lib/utils/types/convo";
type ConvoStateType = {
    convos:ConvoType[];
    sideConvos:ConvoType[]
}

const persistConfig = {
    key:"root",
    storage
}
const persistedReducer = persistReducer(persistConfig,convoRedux)
export const store = configureStore({
    reducer:{
        convo:persistedReducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
              },
        }),
})
export const persistor = persistStore(store);
export type RootState = {
    convo:ConvoStateType
}

export type AppDispatch = typeof store.dispatch