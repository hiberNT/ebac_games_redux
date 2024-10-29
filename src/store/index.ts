import {
  combineReducers,
  configureStore,
  PreloadedState
} from '@reduxjs/toolkit'

import carrinhoReducer from './reducers/carrinho'

import api from '../services/api'

const rootReducer = combineReducers({
  //tem varios reducers e combine reune todos em 1 so
  carrinho: carrinhoReducer,
  [api.reducerPath]: api.reducer
})

export function configuraStore(preloadedState?: PreloadedState<RootState>) {
  //funçao para configurar a store e ser testada
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(api.middleware),
    preloadedState
  })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof configuraStore>
