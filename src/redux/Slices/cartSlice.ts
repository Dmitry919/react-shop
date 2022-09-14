import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { calcTotalPrice } from '../../utils/calcTotalPrice';
import { getCartFromLS } from '../../utils/getCartFromLS';
import { RootState } from '../store';

export type TCartItems = {
    id: string;
    name: string;
    type: string;
    price: number;
    count: number;
    size: number;
    imageUrl: string;
}

interface ICartSliceState {
    totalPrice: number;
    items: TCartItems[]
}

const { items, totalPrice } = getCartFromLS()

const initialState: ICartSliceState = {
    totalPrice: totalPrice,
    items: items,
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    // addItems: (state, action) => {
    //     state.items.push(action.payload)
    //     state.totalPrice = state.items.reduce((sum, obj) => {
    //         return sum + obj.price
    //     }, 0)
    // },
    addItems(state, action: PayloadAction<TCartItems>) {
        const findItem = state.items.find(obj => obj.id === action.payload.id)

        if (findItem) {
            findItem.count++
        } else {
            state.items.push({
                ...action.payload,
                count: 1
            })
        }
        state.totalPrice = calcTotalPrice(state.items)
    },
    minusItem(state, action: PayloadAction<string>) {
        const findItem = state.items.find(obj => obj.id === action.payload)

        if (findItem && findItem.count > 0) {
            findItem.count--
            state.totalPrice -= findItem.price         
        }
    },
    removeItem(state, action: PayloadAction<string>) {
       
        const findItem = state.items.find(obj => obj.id === action.payload)
        if(findItem) {
        state.totalPrice -= findItem.price * findItem.count
        state.items = state.items.filter(obj => obj.id !== action.payload)
        }
    },
    clearItems(state) {
        state.items = []
        state.totalPrice = 0
    }
  },
})

export const selectCart = (state: RootState) => state.cartReduser
export const selectCartItemByID = (id: string) => (state: RootState) => state.cartReduser.items.find((obj) => obj.id === id)

export const { addItems, removeItem, clearItems, minusItem } = cartSlice.actions

export default cartSlice.reducer