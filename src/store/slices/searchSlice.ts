import { SearchState } from '../../types/searchTypes';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

const initialState: SearchState = {
  searchValue: '',
  typeOfResult: 'users',
};

const searchSlice = createSlice({
  name: 'searchSlice',
  initialState,
  reducers: {
    changeSearchValue(state, action: PayloadAction<string>) {
      state.searchValue = action.payload;
    },
    changeTypeOfResults(state, action: PayloadAction<SearchState['typeOfResult']>) {
      state.typeOfResult = action.payload;
    },
  },
});

export const { changeSearchValue, changeTypeOfResults } = searchSlice.actions;
export default searchSlice.reducer;
