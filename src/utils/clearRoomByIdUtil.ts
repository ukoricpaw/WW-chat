import { RoomsState } from '../types/roomTypes';

export const spliceRoomById = (rooms: number[], roomId: number): [number | undefined, number | null] => {
  let indexOfRoom: number | null = null;
  const room = rooms.find((room, index) => {
    if (room === roomId) {
      indexOfRoom = index;
      return true;
    }
    return false;
  });
  return [room, indexOfRoom];
};

const clearRoomByIdUtil = (state: RoomsState, roomId: number) => {
  const roomIdsInOwnRooms = state.rooms.map(room => room.roomId);
  const [room, indexOfRoom] = spliceRoomById(roomIdsInOwnRooms, roomId);
  if (room && indexOfRoom !== null) {
    if (!state.rooms[indexOfRoom].lastMessage) {
      state.rooms.splice(indexOfRoom, 1);
      const [, indexOfRoomId] = spliceRoomById(state.roomIds, roomId);
      if (indexOfRoomId !== null) {
        state.roomIds.splice(indexOfRoomId, 1);
      }
    }
  }
};
export default clearRoomByIdUtil;
