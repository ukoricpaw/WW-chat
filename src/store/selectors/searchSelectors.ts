import { createSelector } from '@reduxjs/toolkit';
import type { RootState } from '..';

const searchSelector = (state: RootState) => state.searchReducer;

export const searchValueSelector = createSelector(searchSelector, data => data.searchValue);
export const typeValueSelector = createSelector(searchSelector, data => data.typeOfResult);
