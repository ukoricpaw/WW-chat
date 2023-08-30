import { RootState } from '..';
import { createSelector } from 'reselect';

const roomSelector = (state: RootState) => state.roomReducer;

// export const roomIdSelector = createSelector(roomSelector, data => data.roomId);
// export const roomUserInfoSelector = createSelector(roomSelector, data => data.userInfo);
export const roomIsLoadingSelector = createSelector(roomSelector, data => data.isLoading);

export const roomIdSelectorByEmail = (state: RootState, email: string) =>
  state.roomReducer.rooms.find(room => room.userInfo?.email === email)?.roomId;

export const contactInfoSelectorById = (state: RootState, id: number) =>
  state.roomReducer.rooms.find(room => room.roomId === id)?.userInfo;

export const allRoomsSelector = (state: RootState) => state.roomReducer.rooms;

export const roomsIDsSelector = createSelector(roomSelector, data => data.roomIds);

export const roomDataSelectorById = (state: RootState, roomId: number) =>
  state.roomReducer.rooms.find(room => room.roomId === roomId);
