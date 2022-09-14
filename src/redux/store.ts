import { configureStore } from '@reduxjs/toolkit'
import filterReduser from './Slices/filterSlice'
import cartReduser from './Slices/cartSlice'
import pizzaReduser from './Slices/pizzaSlice'
import { useDispatch } from 'react-redux'

export const store = configureStore({
  reducer: {
    filterReduser,
    cartReduser,
    pizzaReduser
  },
})

export type RootState = ReturnType<typeof store.getState>
type AppDispatch = typeof store.dispatch 

export const useAppDispatch: () => AppDispatch = useDispatch