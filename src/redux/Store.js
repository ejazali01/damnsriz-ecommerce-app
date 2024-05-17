import { combineReducers, configureStore } from '@reduxjs/toolkit'
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import productSlice from './reducers/product/productSlice'
import userSlice from './reducers/user/userSlice'
import allUsersSlice from './reducers/admin/allUsersSlice'
import layoutSlice from './reducers/layoutSlice'
import productCategorySlice from './reducers/admin/allCategoriesSlice'


const rootReducer = combineReducers({
  users: userSlice,
  allUsers: allUsersSlice,
  products: productSlice,
  dashboardLayout : layoutSlice,
  categories : productCategorySlice,
})

const persistConfig = {
  key: 'root',
  version: 1,
  storage,
  whitelist: ['users', 'products'], // Whitelist only 'users' and 'products' for persistence
  blacklist: ['allUsers', 'dashboardLayout', 'categories']
}
const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
})

export const persistor = persistStore(store)