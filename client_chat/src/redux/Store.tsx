import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import rootSaga from "./rootSaga";
import getUserReducer from "./reducer/UserReducer";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import searchReducer from "./reducer/SearchReducer";

const sagaMiddleware = createSagaMiddleware()
const customizedMiddleware = getDefaultMiddleware({
    immutableCheck: false,
    serializableCheck: false,
}).concat(sagaMiddleware)
export const store = configureStore({
    reducer :{
        user: getUserReducer,
        search: searchReducer,
    },
    middleware: customizedMiddleware,
})
sagaMiddleware.run(rootSaga)
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector