import { RootState } from '..';
import { createSelector } from '@reduxjs/toolkit';

const messageStateSelector = (state: RootState) => state.messagesReducer;
export const messagesSelector = (state: RootState) => state.messagesReducer.messages;
export const messageIsLoadingSelector = createSelector(messageStateSelector, messageState => messageState.isLoading);
