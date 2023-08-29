import { RootState } from '..';

export const messagesSelector = (state: RootState) => state.messagesReducer.messages;
