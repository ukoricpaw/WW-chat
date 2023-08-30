import { RootState } from '..';
import { createSelector } from 'reselect';

export const userSelector = (state: RootState) => state.userReducer.data;

export const userIDSelector = createSelector(userSelector, data => data.id);
