import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store'

export enum SortPropertyEnum {
  RATING_DESC = 'rating',
  RATING_ASC = '-rating',
  PRICE_DESC = 'price',
  PRICE_ASC = '-price',
  TITLE_DESC = 'title',
  TITLE_ASC = '-title',
}

type TSort = {
  name: string;
  sortProperty: SortPropertyEnum
}

interface IFilterSliceState {
  searchValue: string;
  categoriesId: number;
  sort: TSort
}

const initialState: IFilterSliceState = {
  searchValue: '',
  categoriesId: 0,
  sort: {
    name: 'популярности',
    sortProperty: SortPropertyEnum.RATING_DESC
  }
}

export const filterSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setSearchValue: (state, action: PayloadAction<string>) => {
      state.searchValue = action.payload
    },
    setCategoriesId: (state, action: PayloadAction<number>) => {
      state.categoriesId = action.payload
    },

    setSort: (state, action: PayloadAction<TSort>) => {
      state.sort = action.payload
    },

    setFilters: (state, action: PayloadAction<IFilterSliceState>) => {
      state.categoriesId = Number(action.payload.categoriesId)
      state.sort = action.payload.sort
    }
  },
})

export const selectorSort = (state: RootState) => state.filterReduser

export const { setCategoriesId, setSort, setFilters, setSearchValue } = filterSlice.actions

export default filterSlice.reducer