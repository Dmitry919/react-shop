import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import axios from "axios";
import { RootState } from '../store';


type TFetchPizzasArgs = Record<string, string>

export const fetchPizzas = createAsyncThunk<TPizzaItems[], TFetchPizzasArgs>('pizza/fetchPizzasStatus', async (params) => {
    const {order, sortBy, category, search} = params

        const { data } = await axios.get<TPizzaItems[]>(`https://62fe2b2d41165d66bfba0da5.mockapi.io/items?${category}&sortBy=${sortBy}&order=${order}&${search}`)
        return data 
    }
  )

type TPizzaItems = {
    id: string;
    name: string;
    price: number;
    imageUrl: string;
    type: number[];
    size: number[];
}

enum Status {
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error'
}

interface IPizzaSliceState {
    items: TPizzaItems[];
    status: Status;
}

const initialState: IPizzaSliceState = {
    items: [],
    status: Status.LOADING
   
}

export const pizzaSlice = createSlice({
  name: 'pizza',
  initialState,
  reducers: {
    setItems(state, action: PayloadAction<TPizzaItems[]>) {
       state.items = action.payload
    },  
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPizzas.pending, (state) => {
        state.status = Status.LOADING
    })
    builder.addCase(fetchPizzas.fulfilled, (state, action) => {
        state.items = action.payload
        state.status = Status.SUCCESS
    })
    builder.addCase(fetchPizzas.rejected, (state) => {
        state.status = Status.ERROR
        state.items = []
    })
    // [fetchPizzas.pending]: (state) => {
    //     state.status = 'loading'
    // },
    // [fetchPizzas.fulfilled]: (state, action) => {
    //     state.items = action.payload
    //     state.status = 'success'
    // },
    // [fetchPizzas.rejected]: (state) => {
    //     state.status = 'error'
    //     state.items = []
    // }
  }
})

export const selectPizzaData = (state: RootState) => state.pizzaReduser
export const { setItems } = pizzaSlice.actions

export default pizzaSlice.reducer